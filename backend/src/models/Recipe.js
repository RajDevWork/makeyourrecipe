const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
  unit: String,
  note: String
});

const stepSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  description: { type: String, required: true },
  image: String
});

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide recipe title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  ingredients: [ingredientSchema],
  steps: [stepSchema],
  images: [String],
  cookingTime: {
    prep: Number,
    cook: Number,
    total: Number
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  servings: {
    type: Number,
    required: true,
    min: 1
  },
  tags: [String],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  stats: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: { type: Number, default: 0 }
  },
  seo: {
    slug: { type: String, unique: true },
    metaTitle: String,
    metaDescription: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate for comments
recipeSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'recipe',
  options: { sort: { createdAt: -1 } }
});

// Indexes
recipeSchema.index({ title: 'text', description: 'text', tags: 'text' });
recipeSchema.index({ 'stats.views': -1 });
recipeSchema.index({ createdAt: -1 });
recipeSchema.index({ author: 1, createdAt: -1 });
recipeSchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('Recipe', recipeSchema);