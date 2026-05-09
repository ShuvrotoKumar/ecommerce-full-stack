const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/user.model');
require('dotenv').config();

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shop-swift');
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    if (existingUser) {
      console.log('Test user already exists');
      console.log('Email: test@example.com');
      console.log('Password: password123');
      process.exit(0);
    }
    
    // Create test user
    const hashedPassword = await bcrypt.hash('password123', 8);
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      role: 'user',
      isEmailVerified: true,
    });
    
    console.log('Test user created successfully');
    console.log('Email: test@example.com');
    console.log('Password: password123');
    console.log('User ID:', user._id);
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

createTestUser();
