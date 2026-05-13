const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { uploadSingle } = require('../middleware/uploadMiddleware');
const {
  getProfile,
  updateProfile,
  changePassword,
  getUserRecipes,
  getFavorites,
  getNotifications,
  markNotificationRead,
  getDashboardStats,
} = require('../controllers/userController');

const router = express.Router();

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', uploadSingle, updateProfile);
router.post('/change-password', changePassword);
router.get('/recipes', getUserRecipes);
router.get('/favorites', getFavorites);
router.get('/notifications', getNotifications);
router.put('/notifications/:id', markNotificationRead);
router.get('/dashboard/stats', getDashboardStats);

module.exports = router;