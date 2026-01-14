import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/Product";
import { verifyAdminToken } from "@/app/middleware/adminAuth";

// DELETE product
export async function DELETE(req, context) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const admin = verifyAdminToken(token);

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  // ✅ Unwrap params properly
  const { id } = await context.params;

  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) {
    return NextResponse.json(
      { success: false, error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}

// PUT product (EDIT)
export async function PUT(req, context) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const admin = verifyAdminToken(token);

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { id } = await context.params;
  const body = await req.json();

  const updated = await Product.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return NextResponse.json(
      { success: false, error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, product: updated });
}

// GET single product (for edit form)
export async function GET(req, context) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  const admin = verifyAdminToken(token);

  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { id } = await context.params;

  const product = await Product.findById(id);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
