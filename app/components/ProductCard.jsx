"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const router = useRouter();

  return (
    <div className="rounded-xl p-4 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-[520px] bg-white">
      
      <div className="relative h-[200px] w-full rounded-lg overflow-hidden mb-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
      <p className="text-gray-600 mb-3 line-clamp-3">{product.description}</p>

      <div className="text-sm text-gray-700 flex-1 overflow-auto space-y-1">
        {product.specs.map((item, i) => (
          <p key={i}>
            <strong>{item.label}:</strong> {item.value}
          </p>
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        <button className="flex-1 bg-green-600 text-white py-2 rounded-lg">
          Request Quote
        </button>

        <button
          onClick={() => router.push(`/products/${product.slug}`)}
          className="flex-1 bg-gray-200 py-2 rounded-lg"
        >
          View More
        </button>
      </div>
    </div>
  );
}
