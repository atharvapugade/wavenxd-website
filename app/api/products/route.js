import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Product from "@/app/models/Product";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({ isActive: true }).sort({
      createdAt: -1,
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
