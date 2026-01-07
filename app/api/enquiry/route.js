import { connectDB } from "@/app/lib/mongodb";
import Enquiry from "@/app/models/enquiry";
import { sendEnquiryMail } from "@/app/lib/mailer";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    // 1️⃣ Save to DB
    const savedEnquiry = await Enquiry.create(data);

    // 2️⃣ Send Email
    await sendEnquiryMail(data);

    return Response.json(
      { success: true, message: "Enquiry submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}
