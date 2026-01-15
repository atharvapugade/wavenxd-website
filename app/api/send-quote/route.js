import nodemailer from "nodemailer";
import  connectDB  from "./../../lib/mongodb";
import Quote from "./../../models/Quote";

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, phone, company, product, quantity, details, source } = data;

    // 1️⃣ Connect to MongoDB
    await connectDB();

    // 2️⃣ Save to database
    const quote = await Quote.create({
      name,
      email,
      phone,
      company,
      product,
      quantity,
      details,
      source: source || "website",
    });

    // 3️⃣ Send Email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const message = {
      from: `"WaveNxD Website" <${process.env.SMTP_USER}>`,
      to: "atharvapuagade83@gmail.com, info@wavenxd.com",
      subject: "New Quote Request",
      html: `
        <h3>New Quote Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Quantity/Size:</strong> ${quantity}</p>
        <p><strong>Details:</strong> ${details}</p>
        <p><strong>Source:</strong> ${source || "website"}</p>
      `,
    };

    await transporter.sendMail(message);

    return new Response(JSON.stringify({ message: "Quote request sent successfully" }), { status: 200 });
  } catch (err) {
    console.error("Quote API Error:", err);
    return new Response(JSON.stringify({ message: "Error sending quote request" }), { status: 500 });
  }
}
