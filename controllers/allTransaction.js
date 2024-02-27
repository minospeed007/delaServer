import { Transaction} from '../models/Users.js';

export const getAllTransactionHistory = async (req, res, next) => {
    try {

        
        // Fetch all transaction history 
        const transactions = await Transaction.find().exec();

        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ error: 'No transactions found ' });
        }

        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json(err);
    }
};
