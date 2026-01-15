import connectDB from "@/app/lib/mongodb";
import Career from "@/app/models/Career";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    const career = await Career.findById(id).lean();
    if (!career) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    return NextResponse.json(career);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await req.json();

    const updated = await Career.findByIdAndUpdate(id, body, {
      new: true,
    }).lean();

    if (!updated) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    const deleted = await Career.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
