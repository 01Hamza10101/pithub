import bcrypt from "bcryptjs";
import connectToDatabase from "../../db/connectdb";
import User from "../../models/user";
import generateOtp from "../../helper/generateOtp";
import { NextResponse } from "next/server";
import redis from "../../helper/redis";
import sendmail from "../../helper/sendMail";


function generatePassword(length = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}

export async function POST(request) {
  const { email, code, newPasswordRequest } = await request.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const user = await User.findOne({ "profile.email": email });
    if (!user) {
      return NextResponse.json(
        { error: "No user found with this email." },
        { status: 404 }
      );
    }

    if (!code && !newPasswordRequest) {
      const storedOtp = await generateOtp();
      await redis.json.set(`user_pass_reset:${email}`, '$', {storedOtp});
      await redis.expire(`user_pass_reset:${email}`, 300);

      await sendmail(email,"Your Verification Code",`<p>Your verification code is <b>${storedOtp}</b>. It is valid for 10 minutes.</p>`)

      return NextResponse.json(
        { message: "Verification code sent to your email.",sent: true },
        { status: 200 }
      );
    }

    if (code) {
      const {storedOtp} = await redis.json.get(`user_pass_reset:${email}`);

      if (!storedOtp || storedOtp !== code) {
        return NextResponse.json(
          { error: "Invalid or expired verification code." },
          { status: 400 }
        );
      }

      await redis.del(`user_pass_reset:${email}`);

      if (newPasswordRequest) {
        const newPassword = generatePassword(8);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.security.password = hashedPassword;
        await user.save();

        await sendmail(email,"Your New Password",`<p>Your new password is <b>${newPassword}</b>. Please change it after logging in.</p>`)

        return NextResponse.json(
          { message: "New password has been sent to your email." },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { message: "Verification successful." },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}