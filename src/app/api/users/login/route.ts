import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error : "User Does Not Exists"},{status : 400});
        }
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
          return NextResponse.json({ error: "Invalid Credentials" }, { status: 400 });
        }
        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }
        const token = await jwt.sign(tokenData,"nextjstutorial", {expiresIn : "1d"});
        const response = NextResponse.json({ message: "Login Successful",success : true});
        response.cookies.set("token",token,{httpOnly : true})
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}