import mongoose from 'mongoose';

// User Schema
const UserSchema = new mongoose.Schema({
    Id: {
        type: String,
        required: true,
        unique: true,
    },
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique:true
    },
    totalContributedAmount: {
        type: Number,
        default: 0  
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", UserSchema);

// Deposit Schema
const DepositSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

const Deposit = mongoose.model("Deposit", DepositSchema);

// Withdrawal Schema
const WithdrawalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

const Withdrawal = mongoose.model("Withdrawal", WithdrawalSchema);

// Transaction Schema
const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ['deposit', 'withdrawal'],
        required: true
    },
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        
    },
}, {
    timestamps: true
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export { User, Deposit, Withdrawal, Transaction };
