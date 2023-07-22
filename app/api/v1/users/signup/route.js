import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import  bcryptjs  from "bcryptjs";

connect();

export async function POST(req){
    try{
        const reqBody = await req.json();
        const {email, username, password} = reqBody;

        console.log(reqBody);
        console.log(email)

        //Check if user is exist or not

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User already exists"},{status:400})
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User ({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({message: "User created succesfully",success:true,},{status:200});

    }catch(error){
        return NextResponse.json({error: error.message},{status: 500});
    }
}