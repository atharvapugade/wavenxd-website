// app/api/industries/route.js
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Industry from "@/app/models/Industry";

export async function GET() {
  await connectDB();
  const industries = await Industry.find();
  return NextResponse.json(industries);
}
