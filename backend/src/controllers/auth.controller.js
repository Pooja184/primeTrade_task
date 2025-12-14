import Auth from "../models/auth.model.js";
import bcrypt from "bcrypt";
import { tokenGenerator } from "../utils/tokenGenerator.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password do not match" });
    }

    if(password.length<6){
      return res.status(400).json({
        success:false,
        message:"Password is too short"
      })
    }
    const existingUser = await Auth.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Auth.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = tokenGenerator(newUser._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure:true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message});
  }
};

export const login=async(req,res)=>{
 try {
   const {email,password}=req.body;
   if(!email || !password){
     return res.status(400).json({
       success:false,
       message:"All fields are required"
     })
   }

   const user=await Auth.findOne({email});
   if(!user){
    return res.status(400).json({
      success:false,
      message:"Email not exist"
    })
   }

   const passMatch=await bcrypt.compare(password,user.password);

   if(!passMatch){
    return res.status(400).json({
      success:false,
      message:"Invalid Password"
    })
   }

   const token=tokenGenerator(user._id.toString());

   res.cookie("token",token,{
    httpOnly:true,
    secure:true,
    sameSite:"lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
   })

   console.log(user.email,"Login")
   return res.status(200).json({
    success:true,
    token,
    message:"Login Successful",
    user:{
      name:user.name,
      email:user.email
    }
   })
 } catch (error) {
     res
      .status(500)
      .json({ success: false, message: error.message});
  
 }
}

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: false,
    });

    return res.json({
      success: true,
      message: "Logout successful",
    });

  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during logout",
    });
  }
};

export const getCurrentUser=async(req,res)=>{
  try {
    const userId=req.userId;

    const isUserExist=await Auth.findById(userId);
    if(!isUserExist){
      return res.status(400).json({
        success:false,
        message:"User doesn't exist"
      })
    }

    return res.status(201).json({
      success:true,
      message:"User Profile",
      user:{
        name:isUserExist.name,
        email:isUserExist.email,
      }
    })
  } catch (error) {
      console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during logout",
    });
  
  }
}