import { Deposit, User, Transaction } from '../models/Users.js';
import jwt from 'jsonwebtoken'; // Import jwt library

export const deposit = async (req, res, next) => {
    const { userId, amount, description, FirstName, LastName, phone } = req.body;

    try {
        const token = req.cookies.access_token;
        console.log('token:'+token)
        
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }

        // Verify token and extract username
        jwt.verify(token, '#@%itsx#$%trong', async (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized: Invalid token' });
            } else {
                // Extract username from decoded token
                const username = decodedToken.username;
                console.log("username", username);

                const user = await User.findOne({ Id: userId });

                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                // Parse the amount to a number to ensure proper addition
                const depositAmount = parseFloat(amount);

                // Update the user's total contributed amount by summing up the amounts
                user.totalContributedAmount = (user.totalContributedAmount || 0) + depositAmount;
                await user.save();

                // Create a new Deposit document
                const newDeposit = new Deposit({
                    userId: user._id, 
                    date: new Date(),
                    amount: depositAmount,
                    description: description,
                    FirstName: FirstName,
                    LastName: LastName,
                    phone: phone,
                    createdBy: username, 
                });
                
                // Save the deposit document to the database
                const savedDeposit = await newDeposit.save();

                // Create a new Transaction document for the deposit
                const newTransaction = new Transaction({
                    userId: user._id,
                    amount: depositAmount,
                    date: new Date(),
                    type: 'deposit',
                    FirstName: FirstName,
                    LastName: LastName,
                    phone: phone,
                    createdBy:username, 
                });
                await newTransaction.save();

                res.status(200).json({
                    deposit: savedDeposit,
                    balance: user.totalContributedAmount
                });
                console.log(newTransaction);
            }
        });
    } catch (err) {
        next(err);
    }
};
