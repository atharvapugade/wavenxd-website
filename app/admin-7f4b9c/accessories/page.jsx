"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AccessoriesList() {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all accessories
  useEffect(() => {
    async function fetchAccessories() {
      try {
        const res = await fetch("/api/admin/accessories");
        const data = await res.json();
        setAccessories(data || []);
      } catch (err) {
        console.error("Failed to fetch accessories:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAccessories();
  }, []);

  // Delete accessory
  const handleDelete = async (id) => {
    if (!confirm("Delete this accessory?")) return;

    try {
      const res = await fetch(`/api/admin/accessories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setAccessories(accessories.filter((a) => a._id !== id));
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while deleting.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading accessories...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Accessories</h1>

      <Link
        href="/admin-7f4b9c/accessories/add"
        className="text-white bg-green-600 px-4 py-2 rounded mb-4 inline-block"
      >
        + Add Accessory
      </Link>

      {accessories.length === 0 ? (
        <p className="text-gray-600 mt-4">No accessories found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {accessories.map((acc) => (
            <div key={acc._id} className="border p-4 rounded shadow flex flex-col items-center">
              {/* Safe Image */}
              {acc.image ? (
                <img
                  src={acc.image}
                  alt={acc.title}
                  className="w-full h-32 object-contain mb-2"
                />
              ) : (
                <div className="w-full h-32 bg-gray-100 flex items-center justify-center mb-2 text-gray-400 text-sm">
                  No Image
                </div>
              )}

              <h2 className="font-bold text-center">{acc.title}</h2>
              <p className="text-green-600 font-semibold">${acc.price || 0}</p>

              <div className="flex gap-2 mt-2">
                <Link
                  href={`/admin-7f4b9c/accessories/edit/${acc._id}`}
                  className="text-blue-600 font-semibold"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(acc._id)}
                  className="text-red-600 font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
