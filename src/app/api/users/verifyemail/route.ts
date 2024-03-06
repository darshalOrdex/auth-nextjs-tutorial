import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);
    const user = await User.findOne({ verifiedToken: token, verifiedTokenExpiry: { $gt: Date.now() } });
    if (!user) {
        return NextResponse.json("Invalid Token", { status: 401 });
    }
    console.log(user);
    user.isVerified = true;
    user.verifiedToken = undefined;
    user.verifiedTokenExpiry = undefined;
    await user.save();
    try {
        return NextResponse.json({ message: "Email Verified", success: true});
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}