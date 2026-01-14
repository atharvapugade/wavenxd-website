import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Career from "@/app/models/Career";

export async function GET(request, context) {
  try {
    await connectDB();

    const { id } = await context.params;

    const career = await Career.findById(id).lean();

    if (!career) {
      return NextResponse.json(
        { message: "Career not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(career);
  } catch (error) {
    console.error("Career API error:", error);
    return NextResponse.json(
      { message: "Failed to fetch career" },
      { status: 500 }
    );
  }
}
