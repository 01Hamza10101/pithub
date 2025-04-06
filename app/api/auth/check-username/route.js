import dbConnect from "../../db/connectdb";
import User from "../../models/user";
import { NextResponse } from "next/server";

export async function GET(request) {
    if (request.method !== "GET") {
        return NextResponse.json(
            { error: "Method not allowed" },
            { status: 405 }
        );
    }

    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
        return NextResponse.json(
            { error: "Username is required" },
            { status: 400 }
        );
    }

    try {
        await dbConnect();

        const existingUser = await User.findOne({ "profile.username": username });
        if (existingUser) {
            return NextResponse.json(
                { isUnique: false },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { isUnique: true },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error checking username:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}