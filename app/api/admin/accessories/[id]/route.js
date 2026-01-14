import connectDB from "@/app/lib/mongodb";
import Accessory from "./../../../../models/Acessory";

export async function GET(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    const accessory = await Accessory.findById(id).lean();
    if (!accessory) {
      return Response.json({ error: "Accessory not found" }, { status: 404 });
    }

    return Response.json(accessory);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await req.json();

    const updated = await Accessory.findByIdAndUpdate(
      id,
      body,
      { new: true }
    ).lean();

    if (!updated) {
      return Response.json({ error: "Accessory not found" }, { status: 404 });
    }

    return Response.json({ success: true, data: updated });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    const deleted = await Accessory.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json({ error: "Accessory not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
