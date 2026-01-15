import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Career from "@/app/models/Career";

export async function GET() {
  try {
    await connectDB();
    const careers = await Career.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(careers);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const career = await Career.create(body);
    return NextResponse.json({ success: true, career });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
