const express = require('express');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  updateUserStatus,
  getAllRecipes,
  moderateRecipe,
  getDashboardAnalytics,
  getAllReports,
  resolveReport,
  manageCategories,
  createCategory,
} = require('../controllers/adminController');

const router = express.Router();

router.use(protect, restrictTo('admin'));

router.get('/users', getAllUsers);
router.put('/users/:userId', updateUserStatus);
router.get('/recipes', getAllRecipes);
router.put('/recipes/:recipeId/moderate', moderateRecipe);
router.get('/analytics', getDashboardAnalytics);
router.get('/reports', getAllReports);
router.put('/reports/:reportId', resolveReport);
router.get('/categories', manageCategories);
router.post('/categories', createCategory);

module.exports = router;