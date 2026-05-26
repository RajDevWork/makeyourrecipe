import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Edit } from 'lucide-react';
import RecipeForm from '../components/recipes/RecipeForm';
import { recipeService } from '../services/recipeService';
import toast from 'react-hot-toast';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await recipeService.getRecipeById(id);
      setRecipe(response.data);
    } catch (error) {
      toast.error('Failed to load recipe');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await recipeService.updateRecipe(id, formData);
      toast.success('Recipe updated successfully!');
      navigate(`/recipe/${response.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update recipe');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500">
            <Edit className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Edit Recipe</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Update your recipe details
            </p>
          </div>
        </div>
      </motion.div>

      <div className="glass-card p-6 md:p-8">
        <RecipeForm onSubmit={handleSubmit} initialData={recipe} isEdit />
      </div>
    </div>
  );
};

export default EditRecipe;