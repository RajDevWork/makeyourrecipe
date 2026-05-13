const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { redisClient } = require('../config/redis');
const AppError = require('../utils/AppError');

const verifyEmail = async (token) => {
  const userId = await redisClient.get(`verify_${token}`);
  if (!userId) {
    throw new AppError('Invalid or expired verification token', 400);
  }

  await User.findByIdAndUpdate(userId, { isEmailVerified: true });
  await redisClient.del(`verify_${token}`);
  
  return true;
};

const resendVerificationEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user.isEmailVerified) {
    throw new AppError('Email already verified', 400);
  }

  const verificationToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  await redisClient.setex(`verify_${verificationToken}`, 86400, user._id.toString());
  
  // Send email logic here
  return verificationToken;
};

module.exports = {
  verifyEmail,
  resendVerificationEmail,
};