export const DIFFICULTY_LEVELS = [
  { value: 'easy', label: 'Easy', color: 'bg-green-100 text-green-700' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'hard', label: 'Hard', color: 'bg-red-100 text-red-700' },
];

export const COOKING_TIMES = [
  { value: '0-15', label: 'Under 15 mins' },
  { value: '15-30', label: '15-30 mins' },
  { value: '30-60', label: '30-60 mins' },
  { value: '60-120', label: '1-2 hours' },
  { value: '120+', label: '2+ hours' },
];

export const SORT_OPTIONS = [
  { value: '-createdAt', label: 'Newest First' },
  { value: 'createdAt', label: 'Oldest First' },
  { value: '-stats.views', label: 'Most Viewed' },
  { value: '-stats.likes', label: 'Most Liked' },
  { value: '-stats.saves', label: 'Most Saved' },
];

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  RECIPES: {
    BASE: '/recipes',
    TRENDING: '/recipes/trending',
    FEATURED: '/recipes/featured',
    LIKE: (id) => `/recipes/${id}/like`,
    BOOKMARK: (id) => `/recipes/${id}/bookmark`,
    COMMENTS: (id) => `/recipes/${id}/comments`,
  },
  USERS: {
    PROFILE: '/users/profile',
    RECIPES: '/users/recipes',
    FAVORITES: '/users/favorites',
    NOTIFICATIONS: '/users/notifications',
    DASHBOARD: '/users/dashboard/stats',
  },
  CATEGORIES: '/categories',
  ADMIN: {
    USERS: '/admin/users',
    RECIPES: '/admin/recipes',
    ANALYTICS: '/admin/analytics',
  },
};