import { Transaction, User } from '../models/Users.js';

export const getTransactionHistory = async (req, res, next) => {
    try {
        // Extract user Id from request parameters
        const userId = req.params.id;
        console.log(userId);

        //Find the user document based on the provided user Id
       const user = await User.findOne({ Id: userId });
        console.log(user);
                 const hist= user._id.toString()
                 console.log(hist)
       if (!user) {
           return res.status(404).json({ error: 'User not found' });
        }

        // Fetch transaction history using the user's ObjectId
        const transactions = await Transaction.find({userId:hist}).exec();

        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ error: 'No transactions found for this user' });
        }

        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json(err);
    }
};
