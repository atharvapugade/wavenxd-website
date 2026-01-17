"use client";

import { useState } from "react";

export default function ServiceEnquiryModal({ service, onClose }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = Object.fromEntries(new FormData(e.target));

    const res = await fetch("/api/services/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, service }),
    });

    setLoading(false);
    if (res.ok) setSuccess(true);
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-gray-200">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-green-700">
              Service Enquiry – {service}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {success ? (
              <div className="text-center py-12">
                <p className="text-green-600 text-lg font-semibold">
                  ✅ Enquiry submitted successfully
                </p>
                <p className="text-gray-600 mt-2">
                  Our team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                
                {/* Organization */}
                <input name="organizationName" required placeholder="Organization Name" className="input-light" />
                <input name="organizationWebsite" placeholder="Organization Website" className="input-light" />
                <input name="gstNumber" placeholder="GST Number" className="input-light" />
                <input name="organizationType" required placeholder="Organization Type" className="input-light" />
                <input name="address" required placeholder="Address" className="input-light sm:col-span-2" />

                {/* SPOC */}
                <input name="spocName" required placeholder="SPoC Name" className="input-light" />
                <input name="spocEmail" required type="email" placeholder="SPoC Email" className="input-light" />
                <input name="spocPhone" required placeholder="SPoC Phone" className="input-light" />

                {/* Application */}
                <textarea
                  name="purpose"
                  placeholder="Purpose of Application"
                  className="input-light sm:col-span-2"
                  rows={3}
                />

                {/* Submit */}
                <div className="sm:col-span-2 flex justify-end mt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg text-white font-medium transition"
                  >
                    {loading ? "Submitting..." : "Submit Enquiry"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
