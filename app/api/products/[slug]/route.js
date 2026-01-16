import  connectDB  from "../../../lib/mongodb";
import Product from "../../../models/Product";

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const product = await Product.findOne({
      slug: params.slug,
      isActive: true,
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
