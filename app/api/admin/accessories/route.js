import connectDB from "@/app/lib/mongodb";
import Accessory from "./../../../models/Acessory";

export async function GET() {
  try {
    await connectDB();
    const accessories = await Accessory.find({})
      .sort({ createdAt: -1 })
      .lean(); // 🔴 IMPORTANT

    return Response.json(accessories);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const accessory = await Accessory.create(body);

    return Response.json({
      success: true,
      data: accessory.toObject(), // 🔴 convert to plain object
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
