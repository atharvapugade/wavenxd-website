"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function EnquiryCard({ enquiry, index, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

 const handleDelete = async () => {
  if (!confirm("Are you sure you want to delete this enquiry?")) return;

  const token = localStorage.getItem("adminToken");
  if (!token) {
    alert("Unauthorized. Please login again.");
    return;
  }

  setIsDeleting(true);

  try {
    const res = await fetch(`/api/enquiry/${enquiry._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // ✅ DO NOT call res.json() blindly
    if (!res.ok) {
      alert("Failed to delete enquiry");
      return;
    }

    // ✅ SUCCESS
    onDelete(enquiry._id);

  } catch (err) {
    console.error(err);
    alert("Error deleting enquiry");
  } finally {
    setIsDeleting(false);
  }
};


  return (
    <div className="relative bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        title="Delete Enquiry"
        className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition"
      >
        <Trash2 size={20} />
      </button>

      {/* Enquiry Header */}
      <h2 className="text-sm font-semibold text-white bg-green-600 rounded-full px-4 py-1 w-fit mx-auto">
        Enquiry #{index}
      </h2>

      <Section title="General Information" data={{
        "Organization Name": enquiry.organizationName,
        "Website": enquiry.organizationWebsite,
        "GST Number": enquiry.gstNumber,
        "Address": enquiry.address,
        "Organization Type": enquiry.organizationType,
        "Quotation Number": enquiry.quotationNumber,
        "SPOC Name": enquiry.spocName,
        "SPOC Email": enquiry.spocEmail,
        "SPOC Phone": enquiry.spocPhone
      }} />

      <Section title="Application Information" data={{
        "Purpose": enquiry.purpose,
        "Nozzle Frequency": enquiry.nozzleFrequency,
        "Nozzle Tip": enquiry.nozzleTip,
        "Flow Rate": enquiry.flowRate,
        "Viscosity": enquiry.viscosity,
        "Solvent": enquiry.solvent,
        "Solute": enquiry.solute,
        "Solution %": enquiry.solutionPercentage,
        "Suspended Particles": enquiry.suspendedParticles,
        "Particle Size": enquiry.particleSize,
        "Application Nature": enquiry.applicationNature,
        "Substrate Type": enquiry.substrateType,
        "Operating Temp": enquiry.operatingTemperature,
        "Storage Temp": enquiry.storageTemperature,
        "Air Shaping Required": enquiry.airShapingRequired
      }} />

      <Section title="Desired Outcome" data={{
        "Avg Particle Size": enquiry.avgParticleSize,
        "Particle Yield": enquiry.particleYield,
        "Coating Thickness": enquiry.coatingThickness,
        "Coating Uniformity": enquiry.coatingUniformity,
        "Coat Adherence": enquiry.coatAdherence
      }} />

      <Section title="Additional Notes" data={{
        "Support Required": enquiry.supportRequired
      }} />

      <p className="text-center text-xs text-gray-500 pt-2">
        Enquiry submitted successfully
      </p>
    </div>
  );
}

function Section({ title, data }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(data).map(([label, value]) => (
          <Field key={label} label={label} value={value || "-"} />
        ))}
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">
        {label}
      </label>
      <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm">
        {value}
      </div>
    </div>
  );
}
