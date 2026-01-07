// app/components/ProductsGrid.jsx
import Link from "next/link";
import Image from "next/image";
import { connectDB } from "../lib/mongodb";
import Product from "../models/Product";

export default async function ProductsGrid() {
  // Connect to MongoDB
  await connectDB();

  // Fetch all active products
  const products = await Product.find({ isActive: true }).lean();

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-600 py-10">
        No products available
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
        >
          {/* IMAGE */}
          <div className="relative w-full h-56">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-4"
            />
          </div>

          {/* INFO */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.description || product.subtitle}</p>

            {/* SPECS PREVIEW */}
            {product.specs?.length > 0 && (
              <div className="mb-4 text-sm text-gray-700 space-y-1">
                {product.specs.slice(0, 3).map((spec, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-gray-500">{spec.label}:</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* VIEW DETAILS BUTTON */}
            <Link
              href={`/products/${product.slug}`}
              className="inline-block w-full text-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
