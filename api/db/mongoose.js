const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI
    
    if (!mongoURI) {
      throw new Error('MongoDB connection string not found in environment variables. Please set MONGODB_URI');
    }

    const conn = await mongoose.connect(mongoURI);
    
    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
