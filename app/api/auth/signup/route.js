import bcrypt from "bcryptjs";
import connectDB from "../../db/connectdb";
import User from "../../models/user";
import generateOtp from "../../helper/generateOtp";
import redis from "../../helper/redis";
import { NextResponse } from "next/server";
import sendMail from "../../helper/sendMail";

export async function POST(request) {
  // if (request.method !== "POST") {
  //   return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  // }
  const { username, email, password } = await request.json();
  try {
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({
      $or: [{ "profile.email": email }, { "profile.username": username }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or username already exists." },
        { status: 409 }
      );
    }

    const StoredOtp = await generateOtp();
    await sendMail(
      email,
      "Your Verification Code",
      `<p>Your verification code is <b>${StoredOtp}</b>. It is valid for 5 minutes.</p>`
    );
    console.log("Your OTP",StoredOtp)
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await redis.json.set(`user:${email}`, '$', {
      email: email,
      username: username,
      hashedPassword: hashedPassword,
      StoredOtp: StoredOtp
    });
    await redis.expire(`user:${email}`, 300);
    

    return NextResponse.json(
      { message: "Please enter the OTP sent to your email." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
