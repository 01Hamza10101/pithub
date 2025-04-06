import dbConnect from "../../db/connectdb";
import User from "../../models/user";
import { NextResponse } from "next/server";
import redis from "../../helper/redis";

export async function GET(request) {
  // if (request.method !== "GET") {
  //   return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  // }

  const { searchParams } = new URL(request.url);
  const otp = searchParams.get("otp");
  const email = searchParams.get("email");
  console.log(otp,email)
  if (!otp) {
    return NextResponse.json({ error: "otp is required" }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  try {
    await dbConnect();

    const {hashedPassword,username,StoredOtp} = await redis.json.get(`user:${email}`);
    
    if (!StoredOtp) {
      return NextResponse.json(
        { error: "OTP expired or does not exist" },
        { status: 404 }
      );
    }
    
    if (Number(otp) === Number(StoredOtp)) {
      const newUser = new User({
        profile: {
          url:'default.png',
          username,
          email,
        },
        security: {
          password: hashedPassword,
          sessions: [],
        },
        activity: {
          repositories: [],
          starred: [],
          socialLinks: [],
        },
      });

      await newUser.save();
      await redis.del(`user:${email}`);
      return NextResponse.json(
        { success: true, message: "OTP verified successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid OTP" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error checking otp:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
