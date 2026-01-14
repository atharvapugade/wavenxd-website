"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const router = useRouter();

  // Main product fields
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Arrays for documents, specs, details
  const [documents, setDocuments] = useState([{ label: "", link: "" }]);
  const [specs, setSpecs] = useState([{ label: "", value: "" }]);
  const [details, setDetails] = useState([{ label: "", value: "" }]);

  // Applications (Map of arrays)
  const [applications, setApplications] = useState({});

  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  // Functions to handle dynamic array fields
  const handleArrayChange = (setter, index, field, value) => {
    setter((prev) => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const addArrayItem = (setter, newItem) => setter((prev) => [...prev, newItem]);

  const removeArrayItem = (setter, index) => setter((prev) => prev.filter((_, i) => i !== index));

  const handleAppChange = (key, values) => {
    setApplications((prev) => ({ ...prev, [key]: values }));
  };

  // Upload image from computer
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Restrict file types
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setError("Only JPG, JPEG, PNG files are allowed");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/admin/products/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      // Check HTTP status
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Upload failed");
      }

      // Parse JSON safely
      let data = {};
      try {
        data = await res.json();
      } catch {
        throw new Error("Server did not return valid JSON");
      }

      if (!data.success) throw new Error(data.error || "Upload failed");

      // Update image state
      setImage(data.path);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const token = localStorage.getItem("adminToken");
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        slug,
        title,
        subtitle,
        description,
        image,
        isActive,
        documents,
        specs,
        details,
        applications,
      }),
    });

    // Safe JSON parsing
    let data = {};
    try {
      data = await res.json();
    } catch (jsonErr) {
      throw new Error("Server did not return valid JSON");
    }

    if (!data.success) throw new Error(data.error || "Failed to add product");

    router.push("/admin-7f4b9c/products");
  } catch (err) {
    console.error(err);
    setError(err.message);
  }
};



  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-green-600">Add Product</h1>
      {error && <p className="text-red-600">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
          <input type="text" placeholder="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />
          <input type="text" placeholder="Slug (unique URL)" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />

          {/* Image Upload */}
          <div className="flex flex-col">
            <input type="file" accept=".jpg,.jpeg,.png" onChange={handleImageUpload} className="w-full" required />
            {uploading && <span className="text-sm text-gray-500 mt-1">Uploading...</span>}
            {image && <img src={image} alt="Uploaded" className="mt-2 w-full h-40 object-contain rounded border" />}
          </div>
        </div>

        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required />

        {/* Documents */}
        <div>
          <h3 className="font-semibold mb-2">Documents</h3>
          {documents.map((doc, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input type="text" placeholder="Label" value={doc.label} onChange={(e) => handleArrayChange(setDocuments, i, "label", e.target.value)} className="px-2 py-1 border rounded w-1/2" />
              <input type="text" placeholder="Link" value={doc.link} onChange={(e) => handleArrayChange(setDocuments, i, "link", e.target.value)} className="px-2 py-1 border rounded w-1/2" />
              <button type="button" onClick={() => removeArrayItem(setDocuments, i)} className="text-red-600 font-bold">X</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem(setDocuments, { label: "", link: "" })} className="text-green-600 font-medium mt-1">+ Add Document</button>
        </div>

        {/* Specs */}
        <div>
          <h3 className="font-semibold mb-2">Specifications</h3>
          {specs.map((spec, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input type="text" placeholder="Label" value={spec.label} onChange={(e) => handleArrayChange(setSpecs, i, "label", e.target.value)} className="px-2 py-1 border rounded w-1/2" />
              <input type="text" placeholder="Value" value={spec.value} onChange={(e) => handleArrayChange(setSpecs, i, "value", e.target.value)} className="px-2 py-1 border rounded w-1/2" />
              <button type="button" onClick={() => removeArrayItem(setSpecs, i)} className="text-red-600 font-bold">X</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem(setSpecs, { label: "", value: "" })} className="text-green-600 font-medium mt-1">+ Add Spec</button>
        </div>

        {/* Details */}
        <div>
          <h3 className="font-semibold mb-2">Details</h3>
          {details.map((det, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input type="text" placeholder="Label" value={det.label} onChange={(e) => handleArrayChange(setDetails, i, "label", e.target.value)} className="px-2 py-1 border rounded w-1/2" />
              <input type="text" placeholder="Value" value={det.value} onChange={(e) => handleArrayChange(setDetails, i, "value", e.target.value)} className="px-2 py-1 border rounded w-1/2" />
              <button type="button" onClick={() => removeArrayItem(setDetails, i)} className="text-red-600 font-bold">X</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem(setDetails, { label: "", value: "" })} className="text-green-600 font-medium mt-1">+ Add Detail</button>
        </div>

        {/* Applications */}
        <div>
          <h3 className="font-semibold mb-2">Applications</h3>
          {Object.entries(applications).map(([key, values]) => (
            <div key={key} className="mb-2">
              <input type="text" placeholder="Application Name" value={key} disabled className="px-2 py-1 border rounded w-1/2" />
              <input type="text" placeholder="Comma-separated values" value={values.join(",")} onChange={(e) => handleAppChange(key, e.target.value.split(","))} className="px-2 py-1 border rounded w-1/2" />
              <button type="button" onClick={() => { const copy = { ...applications }; delete copy[key]; setApplications(copy); }} className="text-red-600 font-bold ml-2">X</button>
            </div>
          ))}
          <button type="button" onClick={() => { const newKey = prompt("Enter application name:"); if (newKey) handleAppChange(newKey, []); }} className="text-green-600 font-medium mt-1">+ Add Application</button>
        </div>

        {/* Active Checkbox */}
        <div>
          <label className="inline-flex items-center gap-2 mt-2">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded" />
            <span>Active</span>
          </label>
        </div>

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-4">Add Product</button>
      </form>
    </div>
  );
}
