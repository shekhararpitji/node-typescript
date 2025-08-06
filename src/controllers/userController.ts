import {
  loginService,
  registerService,
  listService,
} from "../services/user.services.js";
import bcrypt from 'bcryptjs'
import  { client }  from "../config/redis.config.js";
import  { User }  from "../models/user.js";
import  { validateToken, createToken }  from "../utils/authUtil.js";
import  { emails }  from "../utils/emailUtil.js";
import JWT from 'jsonwebtoken'
import { Request,Response } from "express";

exports.registerCtrl = async (req:Request, res:Response) => {
  try {
    await registerService(req,res);
    await emails({
      to:req.body.email,
      link:"",
      message:"registered successfully",
      subject:"User registration"
    })
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const loginCtrl = async (req:Request, res:Response) => {
  try {
    const { access_token, refreshToken } = await loginService(req, res);
    res.cookie("refreshToken", refreshToken, { secure: true, httpOnly: true });
    res.status(200).json({ jwt: access_token, refreshToken: refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const getAllCtrl = async (req:Request, res:Response) => {
  try {
    const user = await User.findAll({ include: "addresses" });
    if (!user) {
      return res.status(400).send({ message: "user not found" });
    }
    res.status(200).send({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const listController = async (req:Request, res:Response) => {
  try {
    const printUsers = await listService(req);
    res.status(200).json({ users: printUsers });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const deleteCtrl = async (req:Request, res:Response) => {
  try {
    const access_token =await validateToken(req);
    const user = await User.destroy({ where: { id: access_token.id } });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(400).send("Server Error");
  }
};

export const refresh = async (req:Request, res:Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const value = await client.get(refreshToken);

    res.status(200).send({ value });
  } catch (error:any) {
    console.error(error.message);
    res.status(400).send({ message: "invalid refreshToken" });
  }
};

export const forgotPassword=async(req:Request,res:Response)=>{
  try {
    const email=req.body.email;
    const existingUser = await User.findOne({where:{email}})
    if(!existingUser) return res.status(403).send({message:"user not found"})
    const newToken = createToken(existingUser);
    await emails({
      to:req.body.email,
      link:`http://localhost/user/reset-password/${newToken}`,
      message:"token for forgot password",
      subject:"Forgot Password"
    })
    res.status(201).send({message:"new token genrated successfully", token:newToken})
  } catch (error) {
console.error(error)  }
}

export const resetPassword=async(req:Request,res:Response)=>{
    const token=req.params.token;
    const payload = await JWT.verify(token, process.env.SECRET);
    if(!payload){
      return res.status(401).send({message:"invalid token"})
    }
    const {password,confirmPassword}=req.body;
    if(password!==confirmPassword){
      return res.status(401).send({message:"password and confirm password do not match"});
    }
    const user=await User.findOne({
      where: {
        email: payload.email,
      },
    });
    if (!user) {
     return res.status(404).send({message:'Record not found.'});
    
    }
    
    const salt = 10;
    const hashpassword = await bcrypt.hash(password, salt);
    const updatedRecord = await user.update({password:hashpassword});


return res.status(200).send({updatedRecord})
  }
  //lamda genericstype class interface 
