import { NextResponse } from "next/server";
import cloudinary from "@/app/lib/cloudinary";
import { verifyAdminToken } from "@/app/middleware/adminAuth";

export const POST = async (req) => {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    const admin = verifyAdminToken(token);

    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: "Only JPG, JPEG, PNG allowed" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "products" }, // all images go to 'products' folder
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      success: true,
      path: uploadResult.secure_url, // 👈 This is the URL stored in your DB
    });

  } catch (err) {
    console.error("Upload Error:", err);
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
  }
};
