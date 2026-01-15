import { NextResponse } from "next/server";
import connectDB from "./../../../lib/mongodb";
import Enquiry from "./../../../models/enquiry";
import { verifyAdminToken } from "./../../../middleware/adminAuth";

export async function GET(req) {
  const auth = req.headers.get("authorization");
  const token = auth?.split(" ")[1];

  const admin = verifyAdminToken(token);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const enquiries = await Enquiry.find().sort({ createdAt: -1 });

  return NextResponse.json({ success: true, enquiries });
}
