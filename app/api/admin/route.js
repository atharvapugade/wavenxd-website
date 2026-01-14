import  connectDB  from "@/app/lib/mongodb";
import Admin from "@/app/models/admin";

export async function GET(req) {
  try {
    await connectDB();
    const exists = await Admin.findOne();
    return Response.json({ exists: !!exists }, { status: 200 });
  } catch (error) {
    console.error("Admin check error:", error);
    return Response.json({ exists: false, error: "Failed to check admin" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    const exists = await Admin.findOne();
    if (exists)
      return Response.json({ success: false, error: "Admin already exists" }, { status: 400 });

    // Hash password before saving
    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({ username, password: hashedPassword });

    return Response.json({ success: true, message: "Admin registered" }, { status: 201 });
  } catch (error) {
    console.error("Admin registration error:", error);
    return Response.json({ success: false, error: "Registration failed" }, { status: 500 });
  }
}
