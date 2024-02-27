import {User} from '../models/Users.js';

export const createCustomer = async (req, res, next) => {
    const { Id, phone } = req.body;
  
    try {
      // Check if the Id or phone number already exist in the database
      const existingCustomer = await User.findOne({ $or: [{ Id }, { phone }] });
  
      if (existingCustomer) {
        // If Id or phone number already exists, send an error message
        return res.status(400).json({ message: 'Id or phone number already exists' });
      }
  
      // If Id and phone number are unique, create the new customer
      const newCustomer = new User(req.body);
      const savedCustomer = await newCustomer.save();
  
      res.status(200).json(savedCustomer);
    } catch (err) {
      next(err);
    }
  };
export const updateUser= async (req,res,next)=>{
    try{
        const updatedUser= await User.findByIdAndUpdate(req.params.id, {$set:req.body},
            {new:true}) 
        res.status(200).json(updatedUser)
        }catch(err){
            next(err)
        }
}
export const deleteUser= async (req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.params.id) 
        res.status(200).json("User has been deleted!")
        console.log("User has been deleted!")
        }catch(err){
            next(err)
        }
}
export const getUser= async (req,res,next)=>{
    try{
        const user = await User.findOne({ phone: req.params.phone }); 
        res.status(200).json(user)
        }catch(err){
            res.status(500).json(err)
        }
}
export const getUsers= async (req,res,next)=>{
    try{
        const users= await User.find()
        res.status(200).json(users)
        }catch(err){
            next(err)
        }
}