import jwt from 'jsonwebtoken';
import { Transaction } from '../models/Users.js';

export const getAllTransactionHistory = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        console.log('token:' + token);

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
            console.log("username", username);

            // Fetch transactions from the database
            const transactions = await Transaction.find({ createdBy: username }).exec();
            console.log('transaction route', transactions);

            // Send transactions to the client
            return res.status(200).json({ transactions });
        });
    } catch (err) {
        // Handle errors
        console.error('Error fetching transaction history:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
