import api from './api';

export const recipeService = {
  getAllRecipes: async (params = {}) => {
    const response = await api.get('/recipes', { params });
    return response.data;
  },

  getRecipeById: async (id) => {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  },

  getAIRecommendation: async(searchParams)=>{

    const response = await api.post(
        "/get-mcp-ai-recommendation",
        {
          difficulty:searchParams,
        }
      );

     return response

  },
  // createRecipe: async (recipeData) => {
  //   const formData = new FormData();
  //   Object.keys(recipeData).forEach(key => {
  //     if (key === 'images' && recipeData.images) {
  //       Array.from(recipeData.images).forEach(file => {
  //         formData.append('images', file);
  //       });
  //     } else if (typeof recipeData[key] === 'object' && recipeData[key] !== null) {
  //       if (key === 'ingredients' || key === 'steps' || key === 'tags') {
  //         formData.append(key, JSON.stringify(recipeData[key]));
  //       } else {
  //         Object.keys(recipeData[key]).forEach(subKey => {
  //           formData.append(`${key}[${subKey}]`, recipeData[key][subKey]);
  //         });
  //       }
  //     } else {
  //       formData.append(key, recipeData[key]);
  //     }
  //   });
  //   console.log("formData ====> ",formData)
  //   const response = await api.post('/recipes', formData, {
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //   });
  //   return response.data;
  // },
  createRecipe: async (recipeData) => {
    // recipeData is already FormData, just send it
    const response = await api.post('/recipes', recipeData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // updateRecipe: async (id, recipeData) => {
  //   const formData = new FormData();
  //   Object.keys(recipeData).forEach(key => {
  //     if (key === 'newImages' && recipeData.newImages) {
  //       Array.from(recipeData.newImages).forEach(file => {
  //         formData.append('images', file);
  //       });
  //     } else if (key === 'imagesToDelete') {
  //       formData.append('imagesToDelete', JSON.stringify(recipeData.imagesToDelete));
  //     } else if (typeof recipeData[key] === 'object' && recipeData[key] !== null) {
  //       if (key === 'ingredients' || key === 'steps' || key === 'tags') {
  //         formData.append(key, JSON.stringify(recipeData[key]));
  //       } else {
  //         Object.keys(recipeData[key]).forEach(subKey => {
  //           formData.append(`${key}[${subKey}]`, recipeData[key][subKey]);
  //         });
  //       }
  //     } else if (key !== 'images') {
  //       formData.append(key, recipeData[key]);
  //     }
  //   });
    
  //   const response = await api.put(`/recipes/${id}`, formData, {
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //   });
  //   return response.data;
  // },
  updateRecipe: async (id, recipeData) => {
    const response = await api.put(`/recipes/${id}`, recipeData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteRecipe: async (id) => {
    const response = await api.delete(`/recipes/${id}`);
    return response.data;
  },

  likeRecipe: async (id) => {
    const response = await api.post(`/recipes/${id}/like`);
    return response.data;
  },

  unlikeRecipe: async (id) => {
    const response = await api.post(`/recipes/${id}/like`);
    return response.data;
  },

  addBookmark: async (id) => {
    const response = await api.post(`/recipes/${id}/bookmark`);
    return response.data;
  },

  removeBookmark: async (id) => {
    const response = await api.post(`/recipes/${id}/bookmark`);
    return response.data;
  },

  addComment: async (id, content, parentComment = null) => {
    const response = await api.post(`/recipes/${id}/comments`, { content, parentComment });
    return response.data;
  },

  getComments: async (id, page = 1, limit = 20) => {
    const response = await api.get(`/recipes/${id}/comments`, { params: { page, limit } });
    return response.data;
  },

  getTrendingRecipes: async () => {
    const response = await api.get('/recipes/trending');
    return response.data;
  },

  getFeaturedRecipes: async () => {
    const response = await api.get('/recipes/featured');
    return response.data;
  },

  searchRecipes: async (query, filters = {}) => {
    const params = { search: query, ...filters };
    const response = await api.get('/recipes', { params });
    return response.data;
  },
};

export default recipeService;