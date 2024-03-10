import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    Email: {
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
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique:true,
    },
    isAdmin: {
        type: Boolean,
        default: true, 
    },
    
}, {
    timestamps: true,
});

export default mongoose.model("Admin", UserSchema);
