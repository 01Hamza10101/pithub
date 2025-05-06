
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "../../../db/connectdb";
import User from "../../../models/user";
import { verifyTokenFromRequest } from "../../../helper/VerifyToken";

export async function POST(req) {
  await connectToDatabase();

  const { oldPassword, newPassword } = await req.json();
  const token = await verifyTokenFromRequest(req);

  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findOne({ "profile.email": token.email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(oldPassword, user.security.password);

  if (!isMatch) {
    return NextResponse.json({ error: "Old password is incorrect" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.security.password = hashedPassword;
  await user.save();

  return NextResponse.json({ message: "Password updated successfully" });
}
