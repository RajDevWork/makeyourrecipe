const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/authMiddleware');
const { recipeLimiter } = require('../middleware/rateLimiter');
const { uploadMultiple } = require('../middleware/uploadMiddleware');
const validate = require('../middleware/validationMiddleware');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  likeRecipe,
  bookmarkRecipe,
  addComment,
  getComments,
  getTrendingRecipes,
  getFeaturedRecipes,
  recommendRecipe
} = require('../controllers/recipeController');

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/trending', getTrendingRecipes);
router.get('/featured', getFeaturedRecipes);
router.get('/:id', getRecipeById);
router.get('/:id/comments', getComments);
router.post('/recommend', recommendRecipe);
router.use(protect);

router.post('/',
  recipeLimiter,
  uploadMultiple,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('ingredients').isArray().withMessage('Ingredients must be an array'),
    body('steps').isArray().withMessage('Steps must be an array'),
  ],
  validate,
  createRecipe
);

router.put('/:id',
  uploadMultiple,
  updateRecipe
);

router.delete('/:id', deleteRecipe);
router.post('/:id/like', likeRecipe);
router.post('/:id/bookmark', bookmarkRecipe);
router.post('/:id/comments',
  [body('content').notEmpty().withMessage('Comment cannot be empty')],
  validate,
  addComment
);



module.exports = router;