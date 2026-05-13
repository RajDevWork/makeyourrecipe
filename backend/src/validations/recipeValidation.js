const { body } = require('express-validator');

const createRecipeValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('category')
    .notEmpty().withMessage('Category is required'),
  body('ingredients')
    .isArray({ min: 1 }).withMessage('At least one ingredient is required'),
  body('steps')
    .isArray({ min: 1 }).withMessage('At least one step is required'),
  body('cookingTime.total')
    .optional()
    .isInt({ min: 1 }).withMessage('Cooking time must be a positive number'),
  body('servings')
    .isInt({ min: 1 }).withMessage('Servings must be at least 1'),
  body('difficulty')
    .optional()
    .isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty level'),
];

const updateRecipeValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
];

const commentValidation = [
  body('content')
    .trim()
    .notEmpty().withMessage('Comment cannot be empty')
    .isLength({ max: 1000 }).withMessage('Comment cannot exceed 1000 characters'),
];

module.exports = {
  createRecipeValidation,
  updateRecipeValidation,
  commentValidation,
};