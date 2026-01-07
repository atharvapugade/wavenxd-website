import { connectDB } from "../lib/mongodb";
import Accessory from "../models/Acessory";
import Link from "next/link";
import Image from "next/image";

export default async function AccessoriesPage() {
  await connectDB();

  // Fetch all active accessories
  const accessoriesDocs = await Accessory.find({ isActive: true }).lean();

  // Convert _id to string
  const accessories = accessoriesDocs.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
  }));

  if (accessories.length === 0) {
    return <p className="p-10 text-center">No accessories available</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl md:text-4xl mb-8 text-green-600 text-left">
        Our Accessories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {accessories.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
          >
            <div>
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={220}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-700 mb-4 text-sm">{product.description}</p>

              <div className="text-gray-600 text-sm mb-4">
                {product.specifications?.map((spec, idx) => (
                  <p key={idx}>
                    <strong>{spec.label}:</strong> {spec.value}
                  </p>
                ))}
              </div>

              <p className="text-green-600 font-bold text-lg mb-4">
                ₹{product.price}
              </p>
            </div>

            <Link
              href={`/accessories/checkout/${product._id}`}
              className="mt-auto bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition-colors font-medium text-center"
            >
              Buy Now
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
