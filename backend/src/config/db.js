const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async (retries = 5, delay = 5000) => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (retries === 0) {
      logger.error(`Could not connect to MongoDB after multiple attempts: ${error.message}`);
      process.exit(1);
    }
    logger.warn(`MongoDB connection failed. Retrying in ${delay / 1000} seconds... (${retries} retries left)`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return connectDB(retries - 1, delay * 2); // Exponential backoff
  }
};

module.exports = connectDB;
