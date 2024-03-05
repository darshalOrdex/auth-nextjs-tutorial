import mongoose from "mongoose";

const UserSchema = new  mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please Provide a Username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Please Provide a Email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please Provide a Password"]
    },
    isVerified: {
        type: Boolean,
        default : false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifiedToken: String,
    verifiedTokenExpiry: Date,
});

mongoose.models = {};
export default mongoose.model("User", UserSchema);