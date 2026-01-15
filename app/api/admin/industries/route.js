import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Industry from "@/app/models/Industry";

export async function GET() {
  try {
    await connectDB();
    const industries = await Industry.find().sort({ title: 1 });
    return NextResponse.json(industries);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch industries" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const industry = await Industry.create(body);
    return NextResponse.json(industry, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create industry" }, { status: 500 });
  }
}
