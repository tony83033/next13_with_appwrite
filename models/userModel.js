import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please providea password"],
        
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    isVerfied:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    varifyTokenExpiry: Date,
})

const User = mongoose.model.users || mongoose.model('User',userSchema)

export default User;