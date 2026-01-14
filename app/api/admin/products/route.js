// app/api/admin/products/route.js
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/Product";
import { verifyAdminToken } from "@/app/middleware/adminAuth";

// POST: add new product
export const POST = async (req) => {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const admin = verifyAdminToken(token);

    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const {
      slug, title, subtitle, description, image,
      isActive = true, documents = [], specs = [],
      details = [], applications = {}
    } = body;

    if (!slug || !title || !subtitle || !description || !image) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    const product = new Product({
      slug, title, subtitle, description, image,
      isActive, documents, specs, details, applications
    });

    await product.save();

    return NextResponse.json({ success: true, product });
  } catch (err) {
    console.error("Add Product Error:", err);

    let errorMsg = "Failed to add product";
    if (err.code === 11000 && err.keyPattern?.slug) errorMsg = "Slug must be unique";

    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
};

// GET: fetch all products
export const GET = async (req) => {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const admin = verifyAdminToken(token);

    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const products = await Product.find().sort({ createdAt: -1 });

    return NextResponse.json(products); // valid JSON
  } catch (err) {
    console.error("Fetch Products Error:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
};
// PUT: update product
export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    const token = req.headers.get("authorization")?.split(" ")[1];
    const admin = verifyAdminToken(token);

    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      body,
      { new: true } // return the updated document
    );

    if (!updatedProduct) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (err) {
    console.error("Update Product Error:", err);
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 });
  }
};
