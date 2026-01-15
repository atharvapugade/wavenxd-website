// app/api/enquiry/route.js
import { NextResponse } from "next/server";
import connectDB from "./../../lib/mongodb"; // your mongoose connection
import Enquiry from "./../../models/enquiry"; // your model
import { sendEnquiryMail } from "./../../lib/mailer";

export async function POST(req) {
  try {
    const data = await req.json();

    // 1️⃣ Connect to DB
    await connectDB();

    // 2️⃣ Save to MongoDB using Mongoose model
    const enquiry = new Enquiry({
      organizationName: data.organizationName,
      organizationWebsite: data.organizationWebsite,
      gstNumber: data.gstNumber,
      address: data.address,
      organizationType: data.organizationType,
      quotationNumber: data.poNumber, // match your model field
      spocName: data.spocName,
      spocEmail: data.spocEmail,
      spocPhone: data.spocPhone,

      purpose: data.purpose,
      nozzleFrequency: data.nozzleFrequency,
      nozzleTip: data.nozzleTip,
      flowRate: data.flowRate,
      viscosity: data.viscosity,
      solvent: data.solvent,
      solute: data.solute,
      solutionPercentage: data.solutionPercentage,
      suspendedParticles: data.suspendedParticles,
      particleSize: data.particleSize,
      applicationNature: data.applicationNature,
      substrateType: data.substrateType,
      operatingTemperature: data.operatingTemperature,
      storageTemperature: data.storageTemperature,
      airShapingRequired: data.airShaping,

      avgParticleSize: data.avgParticleSize,
      particleYield: data.particleYield,
      coatingThickness: data.coatingThickness,
      coatingUniformity: data.coatingUniformity,
      coatAdherence: data.coatAdherence,

      supportRequired: data.supportRequired,
    });

    await enquiry.save();

    // 3️⃣ Send email
    await sendEnquiryMail(data);

    // 4️⃣ Return success
    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully!",
      id: enquiry._id,
    });
  } catch (err) {
    console.error("Error in /api/enquiry:", err);
    return NextResponse.json(
      { success: false, error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}
