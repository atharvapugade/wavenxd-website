import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Accessory from "@/app/models/Acessory";

export async function GET() {
  try {
    await connectDB();

    const accessoriesDocs = await Accessory.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    const accessories = accessoriesDocs.map((acc) => ({
      ...acc,
      _id: acc._id.toString(), // ✅ REQUIRED for client
      image: acc.image || "",  // ✅ safety
    }));

    return NextResponse.json(accessories);
  } catch (error) {
    console.error("Accessories API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch accessories" },
      { status: 500 }
    );
  }
}
