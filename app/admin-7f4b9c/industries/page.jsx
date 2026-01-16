// app/admin-7f4b9c/industries/page.jsx
import Link from "next/link";
import connectDB from "./../../lib/mongodb"; // adjust path if needed
import Industry from "./../../models/Industry";

export const dynamic = "force-dynamic"; // always fetch fresh data

// Fetch industries directly from MongoDB (server-side)
async function getIndustries() {
  await connectDB();

  const industries = await Industry.find({}).lean();

  // Convert _id and Dates to strings for React
  return industries.map((ind) => ({
    ...ind,
    _id: ind._id.toString(),
    createdAt: ind.createdAt?.toISOString(),
    updatedAt: ind.updatedAt?.toISOString(),
  }));
}

// Server Component
export default async function IndustriesPage() {
  const industries = await getIndustries();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-green-600 mb-6">Select Industry</h1>

      <ul className="space-y-4">
        {industries.map((ind) => (
          <li
            key={ind._id}
            className="border rounded-lg p-4 hover:shadow-md transition"
          >
            <Link href={`/admin-7f4b9c/industries/${ind.slug}/applications`}>
              <h2 className="text-lg font-semibold text-green-700">{ind.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{ind.tagline}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
