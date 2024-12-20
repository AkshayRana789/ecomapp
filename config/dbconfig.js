const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB is connected ${mongoose.connection.host}`);
        
    } catch (error) {
        console.log(`MongoDB Error is ${error}`)
    }
}

module.exports = connectDB;