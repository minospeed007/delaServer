import {User} from '../models/Users.js';
import Admin from '../models/Admin.js'

import {createError} from '../utils/error.js'
import jwt from 'jsonwebtoken'

import bcrypt from "bcryptjs"
export const register= async (req,res,next)=>{
    try{
      const salt=bcrypt.genSaltSync(10)
      const hash=bcrypt.hashSync(req.body.password,salt)
  const newUser= new User({
    ...req.body,
    password:hash,
    

  })
  await newUser.save()
  res.status(200).send(newUser)
  console.log("user created!")
    }catch(err){
next(err)
    }
}
export const registerAdmin= async (req,res,next)=>{
    try{
      const salt=bcrypt.genSaltSync(10)
      const hash=bcrypt.hashSync(req.body.password,salt)
  const newUser= new Admin({
    ...req.body,
    password:hash,
    

  })
  await newUser.save()
  res.status(200).send(newUser)
  console.log("Admin created!")
    }catch(err){
next(err)
    }
}
// Admin login

export const AdminLogin= async(req,res,next)=>{
  try{
const admin= await Admin.findOne({username:req.body.username})
if(!admin) return next(createError(404, "No user  found"));
const isPasswordCorrect= await bcrypt.compare(req.body.password, admin.password)
if(!isPasswordCorrect) return next(createError(400, "Wrong password or username"));
const token= jwt.sign({id:admin._id, isAdmin: admin.isAdmin}, "#@%itsx#$%trong")

const {password, isAdmin, ...otherDetails}=admin._doc
res.cookie("access_token",token,{
  httpOnly:true
}).status(200).json({details:{...otherDetails},isAdmin})

  }catch(err){
    next(err)
  }
}

export const login= async(req,res,next)=>{
  try{
const user= await User.findOne({username:req.body.username})
if(!user) return next(createError(404, "user not found"));
const isPasswordCorrect= await bcrypt.compare(req.body.password, user.password)
if(!isPasswordCorrect) return next(createError(400, "wrong password or username"));
const token= jwt.sign({id:user._id, isAdmin: user.isAdmin}, "#@%itsx#$%trong")

const {password, isAdmin, ...otherDetails}=user._doc
res.cookie("access_token",token,{
  httpOnly:true
}).status(200).json({details:{...otherDetails},isAdmin})

  }catch(err){
    next(err)
  }
}