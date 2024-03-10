import { Withdrawal, User, Transaction } from '../models/Users.js';
import jwt from 'jsonwebtoken';

export const withdraw = async (req, res, next) => {
    const { userId, amount, description, FirstName, LastName, phone } = req.body;

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
                const user = await User.findOne({ Id: userId });

                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                const withdrawalAmount = parseFloat(amount);

                // Ensure user has sufficient balance
                if ((user.totalContributedAmount || 0) < withdrawalAmount) {
                    return res.status(400).json({ error: 'Insufficient balance' });
                }

                // Subtract the withdrawal amount from the total contributed amount
                user.totalContributedAmount -= withdrawalAmount;
                await user.save();

                // Create a new Withdrawal document
                const newWithdrawal = new Withdrawal({
                    userId: user._id,
                    date: new Date(),
                    amount: withdrawalAmount,
                    FirstName: FirstName,
                    LastName: LastName,
                    phone: phone,
                    description: description,
                    createdBy: username,
                });

                // Save the withdrawal document to the database
                const savedWithdrawal = await newWithdrawal.save();

                // Create a new Transaction document for the withdrawal
                const newTransaction = new Transaction({
                    userId: user._id,
                    amount: withdrawalAmount,
                    date: new Date(),
                    type: 'withdrawal',
                    FirstName: FirstName,
                    LastName: LastName,
                    phone: phone,
                    createdBy:username,
                });
                await newTransaction.save();

                // Send the updated totalContributedAmount along with the saved withdrawal
                return res.status(200).json({
                    withdrawal: savedWithdrawal,
                    balance: user.totalContributedAmount
                });
            } catch (error) {
                console.error('Withdrawal error:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    } catch (error) {
        console.error('Token verification error:', error);
        next(error);
    }
};
