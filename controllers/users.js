import { User } from '../models/Users.js';
import jwt from 'jsonwebtoken';

export const createCustomer = async (req, res, next) => {
    const { Id, phone } = req.body;

    try {
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        // Verify token and extract username
        jwt.verify(token, '#@%itsx#$%trong', async (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized: Invalid token' });
            }

            // Extract username from decoded token
            const username = decodedToken.username;

            try {
                // Check if the Id or phone number already exist in the database
                const existingCustomer = await User.findOne({ $or: [{ Id }, { phone }] });

                if (existingCustomer) {
                    // If Id or phone number already exists, send an error message
                    return res.status(400).json({ message: 'Id or phone number already exists' });
                }

                // If Id and phone number are unique, create the new customer
                const newCustomer = new User({
                    ...req.body,
                    createdBy: username
                });
                const savedCustomer = await newCustomer.save();

                res.status(200).json(savedCustomer);
                console.log(savedCustomer)
            } catch (error) {
                // Handle any database or other errors here
                return res.status(500).json({ error: 'An error occurred while creating the customer' });
            }
        });
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

export const getUser = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        // Verify token and extract username
        jwt.verify(token, '#@%itsx#$%trong', async (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized: Invalid token' });
            }

            // Extract username from decoded token
            const username = decodedToken.username;

            // Fetch user based on phone number and createdBy field matching the username
            const user = await User.findOne({ phone: req.params.phone, createdBy: username }); 
            
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
    
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }
        // Verify token and extract username
        jwt.verify(token, '#@%itsx#$%trong', async (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized: Invalid token' });
            }

            // Extract username from decoded token
            const username = decodedToken.username;
            console.log(username)

            // Fetch users from the database where createdBy matches the username
            const users = await User.find({ createdBy: username });

            res.status(200).json(users);
        });
    } catch (err) {
        next(err);
    }
};