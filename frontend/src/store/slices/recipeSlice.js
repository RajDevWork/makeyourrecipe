import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recipes: [],
  currentRecipe: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    difficulty: '',
    cookingTime: '',
    sort: '-createdAt',
  },
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    setCurrentRecipe: (state, action) => {
      state.currentRecipe = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLikedRecipe: (state, action) => {
      const recipe = state.recipes.find(r => r._id === action.payload.id);
      if (recipe) {
        recipe.isLiked = action.payload.liked;
        recipe.stats.likes += action.payload.liked ? 1 : -1;
      }
    },
    setBookmarkedRecipe: (state, action) => {
      const recipe = state.recipes.find(r => r._id === action.payload.id);
      if (recipe) {
        recipe.isBookmarked = action.payload.bookmarked;
        recipe.stats.saves += action.payload.bookmarked ? 1 : -1;
      }
    },
  },
});

export const {
  setRecipes,
  setCurrentRecipe,
  setLoading,
  setError,
  setFilters,
  setLikedRecipe,
  setBookmarkedRecipe,
} = recipeSlice.actions;
export default recipeSlice.reducer;