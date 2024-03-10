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
                if (!Id || !phone) {
                    return res.status(400).json({ message: 'Id and phone are required fields' });
                }
                // check the length of phone number
                if (phone.length !== 10) {
                    return res.status(400).json({ message: 'Phone number must be 10 digits long' });
                }
                // Check if a user with the same ID already exists for the admin
                const existingId = await User.findOne({ Id, createdBy: username });
                if (existingId) {
                    return res.status(400).json({ message: 'User with the same ID already exists' });
                }

                // Check if a user with the same phone already exists for the admin
                const existingPhone = await User.findOne({ phone, createdBy: username });
                
                if (existingPhone ) {

                    return res.status(400).json({ message: 'User with the same phone number already exists' });
  
                }else{
console.log('success');
                }

                // If the ID and phone are unique, create the new customer
                const newCustomer = new User({
                    ...req.body,
                    createdBy: username
                });
                const savedCustomer = await newCustomer.save();

                res.status(200).json(savedCustomer);
                
            } catch (error) {
                if (error.code === 11000) {
                    console.error("Duplicate key error:", error);
                    return res.status(400).json({ error: 'User with the same number already exists!' });
                } else {
                    // Handle other types of errors
                    console.error("An error occurred:", error);
                    return res.status(500).json({ error: 'An error occurred' });
                }
              
            }
        });
    } catch (err) {
        console.error("An error occurred:", err);
        next(err);
    }
};
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" }); 
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" }); 
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" }); 
        }
        res.status(200).json("User has been deleted!");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" }); 
    }
};

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

