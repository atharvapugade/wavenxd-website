import  connectDB  from "../../lib/mongodb";
import Industry from "../../models/Industry";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const industries = await Industry.find({ isActive: true }).lean();
  return NextResponse.json(industries);
}
