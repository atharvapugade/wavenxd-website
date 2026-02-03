import connectDB from "../lib/mongodb";
import Accessory from "../models/Acessory";
import AccessoriesClient from "./AccessoriesClient";

export const dynamic = "force-dynamic"; // 🔥 REQUIRED
export const revalidate = 0;             // 🔥 DISABLE ISR CACHE

export default async function AccessoriesPage() {
  await connectDB();

  const accessoriesDocs = await Accessory.find({ isActive: true })
    .sort({ createdAt: -1 })
    .lean();

  const accessories = accessoriesDocs.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
  }));

  if (!accessories.length) {
    return <p className="p-10 text-center">No accessories available</p>;
  }

  return <AccessoriesClient accessories={accessories} />;
}
