import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Career from "@/app/models/Career";

export async function GET() {
  try {
    await connectDB();

    const careers = await Career.find({ isOpen: true }).sort({ createdAt: -1 }).lean();


    return NextResponse.json(careers);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch careers" },
      { status: 500 }
    );
  }
}
