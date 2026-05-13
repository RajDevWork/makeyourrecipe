const express = require('express');
const { body } = require('express-validator');
const { register, login, refresh, logout, forgotPassword, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');
const validate = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/register',
  authLimiter,
  [
    body('name').notEmpty().withMessage('Name is required').trim(),
    body('email').isEmail().withMessage('Please provide valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validate,
  register
);

router.post('/login',
  authLimiter,
  [
    body('email').isEmail().withMessage('Please provide valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  login
);

router.post('/refresh', refresh);
router.post('/logout', protect, logout);

router.post('/forgot-password',
  authLimiter,
  [body('email').isEmail().withMessage('Please provide valid email')],
  validate,
  forgotPassword
);

router.post('/reset-password',
  [
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validate,
  resetPassword
);

module.exports = router;