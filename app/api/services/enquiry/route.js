import connectDB from "./../../../lib/mongodb";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const {
      organizationName,
      organizationWebsite,
      contactName,
      contactEmail,
      contactPhone,
      message,
      service,
    } = await req.json();

    // 1️⃣ Connect to DB (optional – keep if needed later)
    await connectDB();

    // 2️⃣ Create transporter (same as Contact Us)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 3️⃣ Email content (Contact-style, clean)
    const mailOptions = {
      from: `"WaveNxD Website" <${process.env.SMTP_USER}>`,
      to: "atharvapugade83@gmail.com, info@wavenxd.com",
      subject: `New Service Enquiry – ${service}`,
      html: `
        <h3>New Service Enquiry</h3>

        <p><strong>Service:</strong> ${service}</p>

        <h4>Organization Details</h4>
        <p><strong>Name:</strong> ${organizationName}</p>
        <p><strong>Website:</strong> ${organizationWebsite || "N/A"}</p>

        <h4>Contact Person</h4>
        <p><strong>Name:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${contactEmail}</p>
        <p><strong>Phone:</strong> ${contactPhone}</p>

        <h4>Message</h4>
        <p>${message}</p>

        <p><strong>Source:</strong> Service Enquiry Form</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "Service enquiry submitted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Service Enquiry API Error:", err);
    return new Response(
      JSON.stringify({ message: "Error submitting service enquiry" }),
      { status: 500 }
    );
  }
}
