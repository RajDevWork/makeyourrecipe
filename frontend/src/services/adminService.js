import api from './api';

export const adminService = {
  getAnalytics: async () => {
    const response = await api.get('/admin/analytics');
    return response.data;
  },

  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  updateUserStatus: async (userId, data) => {
    const response = await api.put(`/admin/users/${userId}`, data);
    return response.data;
  },

  getAllRecipes: async (params = {}) => {
    const response = await api.get('/admin/recipes', { params });
    return response.data;
  },

  moderateRecipe: async (recipeId, status) => {
    const response = await api.put(`/admin/recipes/${recipeId}/moderate`, { status });
    return response.data;
  },

  getReports: async (params = {}) => {
    const response = await api.get('/admin/reports', { params });
    return response.data;
  },

  resolveReport: async (reportId, status, adminNote) => {
    const response = await api.put(`/admin/reports/${reportId}`, { status, adminNote });
    return response.data;
  },
};

export default adminService;