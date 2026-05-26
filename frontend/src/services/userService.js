import api from './api';

export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const formData = new FormData();
    Object.keys(profileData).forEach(key => {
      if (profileData[key] !== undefined && profileData[key] !== null) {
        formData.append(key, profileData[key]);
      }
    });
    
    const response = await api.put('/users/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await api.post('/users/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  getUserRecipes: async (page = 1, limit = 10) => {
    const response = await api.get('/users/recipes', { params: { page, limit } });
    return response.data;
  },

  getFavorites: async (page = 1, limit = 20) => {
    const response = await api.get('/users/favorites', { params: { page, limit } });
    return response.data;
  },

  getNotifications: async (page = 1, limit = 20) => {
    const response = await api.get('/users/notifications', { params: { page, limit } });
    return response.data;
  },

  markNotificationRead: async (notificationId) => {
    const response = await api.put(`/users/notifications/${notificationId}`);
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await api.get('/users/dashboard/stats');
    return response.data;
  },
};

export default userService;