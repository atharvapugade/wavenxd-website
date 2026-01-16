// app/api/accessories/route.js
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Accessory from "./../../models/Acessory";

export async function GET() {
  await connectDB();
  const accessories = await Accessory.find({ isActive: true });
  return NextResponse.json(accessories);
}
