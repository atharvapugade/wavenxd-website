import { NextResponse } from "next/server";
import  connectDB  from "./../../../lib/mongodb";
import Industry from "./../../../models/Industry";

export async function GET(req, context) {
  try {
    await connectDB();

    const params = await context.params; // ✅ FIX
    const { slug } = params;

    const industry = await Industry.findOne({
      slug,
      isActive: true,
    });

    if (!industry) {
      return NextResponse.json(
        { message: "Industry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(industry);
  } catch (error) {
    console.error("Industry slug API error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
