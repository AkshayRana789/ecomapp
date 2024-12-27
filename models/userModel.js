const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

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
        minLength: [6, 'Password must be at least 6 characters'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    city: {
        type: String,
        required: [true, 'City is required'],
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
    },
    profilePic: {
        type: String,
    }
}, { timestamps: true });

//Hasing
userSchema.pre("save",async function(){
    this.password = await bcrypt.hash(this.password,10);
});

//Comparing Password
userSchema.methods.comparePasswords = async function(plainPassword){
    return await bcrypt.compare(plainPassword,this.password);
}

//JsonWebToken create

userSchema.methods.createToken = function() {
    return JWT.sign({_id:this._id},process.env.JWT_KEY,{expiresIn:"7d"})
}

module.exports = mongoose.model("Users",userSchema)