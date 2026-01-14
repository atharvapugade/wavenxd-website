"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    slug: "",
    description: "",
    image: "",
    isActive: true,
    documents: [{ label: "", link: "" }],
    specs: [{ label: "", value: "" }],
    details: [{ label: "", value: "" }],
    applications: {},
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch(`/api/admin/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch product");
        setForm(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleArrayChange = (field, index, key, value) => {
    const copy = [...form[field]];
    copy[index][key] = value;
    setForm({ ...form, [field]: copy });
  };

  const addArrayItem = (field, newItem) => {
    setForm({ ...form, [field]: [...form[field], newItem] });
  };

  const removeArrayItem = (field, index) => {
    const copy = [...form[field]];
    copy.splice(index, 1);
    setForm({ ...form, [field]: copy });
  };

  const handleAppChange = (key, values) => {
    setForm({ ...form, applications: { ...form.applications, [key]: values } });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("/api/admin/products/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Upload failed");
      setForm({ ...form, image: data.path });
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
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      router.push("/admin-7f4b9c/products");
    } catch (err) {
      setError(err.message || "Update failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-green-600">Edit Product</h1>
      {error && <p className="text-red-600">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full px-4 py-2 border rounded-lg" required />
          <input type="text" name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Subtitle" className="w-full px-4 py-2 border rounded-lg" required />
          <input type="text" name="slug" value={form.slug} onChange={handleChange} placeholder="Slug" className="w-full px-4 py-2 border rounded-lg" required />

          {/* Image Upload */}
          <div className="flex flex-col">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
            {uploading && <span className="text-sm text-gray-500 mt-1">Uploading...</span>}
            {form.image && <img src={form.image} alt="Uploaded" className="mt-2 w-full h-40 object-contain rounded border" />}
          </div>
        </div>

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full px-4 py-2 border rounded-lg" required />

        {/* Documents */}
        <div>
          <h3 className="font-semibold mb-2">Documents</h3>
          {form.documents.map((doc, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input type="text" placeholder="Label" value={doc.label} onChange={(e) => handleArrayChange("documents", i, "label", e.target.value)} className="px-2 py-1 border rounded w-1/2" />
              <input type="text" placeholder="Link" value={doc.link} onChange={(e) => handleArrayChange("documents", i, "link", e.target.value)} className="px-2 py-1 border rounded w-1/2" />
              <button type="button" onClick={() => removeArrayItem("documents", i)} className="text-red-600 font-bold">X</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("documents", { label: "", link: "" })} className="text-green-600 font-medium mt-1">+ Add Document</button>
        </div>

        {/* Specs */}
        <div>
          <h3 className="font-semibold mb-2">Specifications</h3>
          {form.specs.map((spec, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input type="text" placeholder="Label" value={spec.label} onChange={(e) => handleArrayChange("specs", i, "label", e.target.value)} className="px-2 py-1 border rounded w-1/2" />
              <input type="text" placeholder="Value" value={spec.value} onChange={(e) => handleArrayChange("specs", i, "value", e.target.value)} className="px-2 py-1 border rounded w-1/2" />
              <button type="button" onClick={() => removeArrayItem("specs", i)} className="text-red-600 font-bold">X</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("specs", { label: "", value: "" })} className="text-green-600 font-medium mt-1">+ Add Spec</button>
        </div>

        {/* Details */}
        <div>
          <h3 className="font-semibold mb-2">Details</h3>
          {form.details.map((det, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input type="text" placeholder="Label" value={det.label} onChange={(e) => handleArrayChange("details", i, "label", e.target.value)} className="px-2 py-1 border rounded w-1/2" />
              <input type="text" placeholder="Value" value={det.value} onChange={(e) => handleArrayChange("details", i, "value", e.target.value)} className="px-2 py-1 border rounded w-1/2" />
              <button type="button" onClick={() => removeArrayItem("details", i)} className="text-red-600 font-bold">X</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("details", { label: "", value: "" })} className="text-green-600 font-medium mt-1">+ Add Detail</button>
        </div>

        {/* Applications */}
        <div>
          <h3 className="font-semibold mb-2">Applications</h3>
          {Object.entries(form.applications).map(([key, values]) => (
            <div key={key} className="mb-2 flex gap-2 items-center">
              <input type="text" value={key} disabled className="px-2 py-1 border rounded w-1/3" />
              <input
                type="text"
                value={values.join(",")}
                onChange={(e) => handleAppChange(key, e.target.value.split(","))}
                className="px-2 py-1 border rounded w-2/3"
              />
              <button
                type="button"
                onClick={() => {
                  const copy = { ...form.applications };
                  delete copy[key];
                  setForm({ ...form, applications: copy });
                }}
                className="text-red-600 font-bold ml-2"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const newKey = prompt("Enter application name:");
              if (newKey) handleAppChange(newKey, []);
            }}
            className="text-green-600 font-medium mt-1"
          >
            + Add Application
          </button>
        </div>

        {/* Active */}
        <div>
          <label className="inline-flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="rounded"
            />
            <span>Active</span>
          </label>
        </div>

        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-4">Update Product</button>
      </form>
    </div>
  );
}
