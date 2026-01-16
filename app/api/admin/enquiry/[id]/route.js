import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Enquiry from "../../../../models/enquiry";
import { verifyAdminToken } from "../../../../middleware/adminAuth";

export async function DELETE(req, { params }) {
  try {
    // ✅ REQUIRED in new Next.js
    const { id } = await params;

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    const admin = verifyAdminToken(token);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const deleted = await Enquiry.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Delete enquiry error:", error);
    return NextResponse.json(
      { error: "Failed to delete enquiry" },
      { status: 500 }
    );
  }
}
