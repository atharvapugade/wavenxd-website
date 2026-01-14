import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
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

    if (!file) return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: "Only JPG, JPEG, PNG allowed" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const timestamp = Date.now();
    const ext = file.type.split("/")[1];
    const filename = `product-${timestamp}.${ext}`;
    const filepath = path.join(uploadDir, filename);

    const arrayBuffer = await file.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(arrayBuffer));

    return NextResponse.json({ success: true, path: `/uploads/${filename}` });
  } catch (err) {
    console.error("Upload Error:", err);
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
  }
};
