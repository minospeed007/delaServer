import { Deposit, User, Transaction } from '../models/Users.js';

export const deposit = async (req, res, next) => {
    const { userId, amount, description, FirstName, LastName, phone } = req.body;

    try {
        const user = await User.findOne({ Id: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
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
        });
        await newTransaction.save();

        res.status(200).json({
            deposit: savedDeposit,
            balance: user.totalContributedAmount

        });
    } catch (err) {
        next(err);
    }
};
