import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async({email, emailType, userId} : any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {verifiedToken: hashedToken, verifiedTokenExpiry: Date.now() + 360000})
        } else if(emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 360000 })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "3a1cfa93dd87b4",
            pass: "d526a6a4a484cc"
            }
        });
        const mailOptions = {
            from:'admin@example.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: `<p>Click <a href="http://localhost:3000/verifyemail?token=${hashedToken}">Here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
        }
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error : any) {
        throw new Error(error.message);
    }
}