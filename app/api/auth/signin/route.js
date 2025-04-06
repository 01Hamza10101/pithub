import bcrypt from "bcryptjs";
import connectToDatabase from "../../db/connectdb";
import User from "../../models/user";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const { userid, password } = await request.json();
  if (!userid || !password) {
    return NextResponse.json({ error: "Username/email and password are required." }, { status: 400 });
  }

  try {
    await connectToDatabase();

    // Search for user by email or username
    const user = await User.findOne({
      $or: [
        { "profile.email": userid },
        { "profile.username": userid },
      ],
    });
    console.log(user);
    
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.security.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.profile.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Record session details
    const ipAddress = (request.headers.get("x-forwarded-for") || request.socket.remoteAddress || "").split(",")[0].trim();
    const session = {
      ip: ipAddress,
      location: "Unknown", // You can integrate a geolocation API for better accuracy
    };
    user.security.sessions.push(session);
    await user.save();

    return NextResponse.json(
      {
        message: "Signin successful.",
        token,
        user: {
          id: user.id,
          profile: user.profile,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
