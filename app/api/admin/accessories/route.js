import connectDB from "@/app/lib/mongodb";
import Accessory from "@/app/models/Acessory";

export async function GET() {
  await connectDB();
  const accessories = await Accessory.find({ isActive: true })
    .sort({ createdAt: -1 })
    .lean();
  return Response.json(accessories);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const accessory = await Accessory.create(body);

  return Response.json({
    success: true,
    data: accessory.toObject(),
  });
}
