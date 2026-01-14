import  connectDB  from "@/app/lib/mongodb";
import Admin from "@/app/models/admin";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function POST(req) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    const admin = await Admin.findOne({ username });
    if (!admin) return Response.json({ success: false, error: "Invalid credentials" }, { status: 401 });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return Response.json({ success: false, error: "Invalid credentials" }, { status: 401 });

    const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: "2h" });

    return Response.json({ success: true, token }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: "Login failed" }, { status: 500 });
  }
}
