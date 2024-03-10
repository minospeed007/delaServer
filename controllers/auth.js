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
      // check for existing email in the database
    const adminEmail= await Admin.findOne({ email: req.body.email });

    // check for existing username
    const adminUsername = await Admin.findOne({ username: req.body.username });
    if (adminUsername ) return  res.status(404).json({ message: 'Username already exist !' })

    // if there is noe existing email and username
      const salt=bcrypt.genSaltSync(10)
      const hash=bcrypt.hashSync(req.body.password,salt)
  const newUser= new Admin({
    ...req.body,
    password:hash,
    

  })
  await newUser.save()
  res.status(200).send(newUser)
  console.log("Admin created!",newUser);
    }catch(error){
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Email already exists !' });
    } else {
        // Handle other types of errors
        return res.status(500).json({ error: 'An error occurred' });
    }    }
}
// Admin login
export const AdminLogin = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ username: req.body.username });
    if (!admin) return next(createError(404, "No user found"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, admin.password);
    if (!isPasswordCorrect) return next(createError(400, "Wrong password or username"));

    const token = jwt.sign({
      id: admin._id,
      isAdmin: admin.isAdmin,
      username: admin.username 
    }, "#@%itsx#$%trong");

    // Exclude sensitive details from the response
    const { password, isAdmin, ...otherDetails } = admin._doc;

    // Send the token as a cookie to the client
    res.cookie("access_token", token, {
      httpOnly: true
    }).status(200).json({
      details: { ...otherDetails, username: admin.username }, 
      isAdmin
    });
    
    console.log('hello login');
  } catch (err) {
    next(err);
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