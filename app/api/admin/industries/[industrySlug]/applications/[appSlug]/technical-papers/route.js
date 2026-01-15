import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Industry from "@/app/models/Industry";

/* ================= GET ================= */
export async function GET(req, { params }) {
  const { industrySlug, appSlug } = await params; // ✅

  await connectDB();

  const industry = await Industry.findOne({ slug: industrySlug });
  if (!industry) {
    return new Response("Industry not found", { status: 404 });
  }

  const application = industry.applications.find(
    (a) => a.slug === appSlug
  );

  if (!application) {
    return new Response("Application not found", { status: 404 });
  }

  return Response.json(application.technicalPapers || []);
}


/* ================= POST ================= */
export async function POST(req, { params }) {
  try {
    await connectDB();

    const { industrySlug, appSlug } = await params;
    const { title, link } = await req.json();

    const industry = await Industry.findOne({ slug: industrySlug });
    const app = industry?.applications.find(a => a.slug === appSlug);

    if (!industry || !app) {
      return NextResponse.json({ message: "Invalid route" }, { status: 404 });
    }

    app.technicalPapers.push({ title, link });
    await industry.save();

    return NextResponse.json({
      success: true,
      technicalPapers: app.technicalPapers
    });
  } catch (err) {
    console.error("POST ERROR:", err);
    return NextResponse.json({ message: "Add failed" }, { status: 500 });
  }
}

/* ================= PUT ================= */
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { industrySlug, appSlug } = await params;
    const { index, title, link } = await req.json();

    const industry = await Industry.findOne({ slug: industrySlug });
    const app = industry?.applications.find(a => a.slug === appSlug);

    if (!app || !app.technicalPapers[index]) {
      return NextResponse.json({ message: "Paper not found" }, { status: 404 });
    }

    app.technicalPapers[index] = { title, link };
    await industry.save();

    return NextResponse.json({
      success: true,
      technicalPapers: app.technicalPapers
    });
  } catch (err) {
    console.error("PUT ERROR:", err);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}

/* ================= DELETE ================= */
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { industrySlug, appSlug } = await params;
    const { index } = await req.json();

    const industry = await Industry.findOne({ slug: industrySlug });
    const app = industry?.applications.find(a => a.slug === appSlug);

    if (!app || !app.technicalPapers[index]) {
      return NextResponse.json({ message: "Paper not found" }, { status: 404 });
    }

    app.technicalPapers.splice(index, 1);
    await industry.save();

    return NextResponse.json({
      success: true,
      technicalPapers: app.technicalPapers
    });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
