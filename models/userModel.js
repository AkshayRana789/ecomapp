const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already taken'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLenght: [6, 'Password must be at least 6 characters'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    city: {
        type: String,
        required: [true, 'City is required'],
    },
    contry: {
        type: String,
        required: [true, 'Contry is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
    },
    profilePic: {
        type: String,
    }
}, { timestamps: true });

export const User = mongoose.model("Users",userSchema)