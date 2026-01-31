import { NextResponse } from "next/server";
import { sendEnquiryMail } from "./../../../lib/mailer";

export async function POST(req) {
  try {
    const data = await req.json();
    await sendEnquiryMail(data);

    return NextResponse.json(
      { success: true, message: "Enquiry sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Enquiry API Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send enquiry" },
      { status: 500 }
    );
  }
}
