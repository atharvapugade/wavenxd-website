import  connectDB  from "@/app/lib/mongodb";
import Admin from "@/app/models/admin";

export async function POST(req) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    const exists = await Admin.findOne({ username });
    if (exists) return Response.json({ success: false, error: "Admin already exists" }, { status: 400 });

    const admin = await Admin.create({ username, password });

    return Response.json({ success: true, message: "Admin registered" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: "Registration failed" }, { status: 500 });
  }
}
