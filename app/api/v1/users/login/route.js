import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import  bcryptjs  from "bcryptjs";
import  Jwt  from "jsonwebtoken";

connect();

export async function POST(req){
    try{
        const reqBody = await req.json()
        const {email,password} = reqBody;

        // check if user exist
        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400});
        }else{
            //check if password is correct
            const validPassword = await bcryptjs.compare(password,user.password);
            if(!validPassword){
                return NextResponse.json({error:"Invalid password"},{status:400});
            }else{
                // user varified
                // create token
                const tokenData ={
                    id: user._id,
                    username: user.username,
                    email:user.email
                }

                const token = await Jwt.sign(tokenData,process.env.TOKEN_SECRET)

                const response = NextResponse.json({message:"Login successfull",sussess:true})
                response.cookies.set("token",token,{
                    httpOnly:true,
                })

                return response;
            }
        }
    }catch{
        return NextResponse.json({error:error.message},{status:500})
    }
}