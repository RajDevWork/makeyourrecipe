import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import RecipeForm from '../components/recipes/RecipeForm';
import { recipeService } from '../services/recipeService';
import toast from 'react-hot-toast';

const CreateRecipe = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const response = await recipeService.createRecipe(formData);
      toast.success('Recipe created successfully!');
      navigate(`/recipe/${response.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create recipe');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Create Recipe</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Share your culinary creation with the world
            </p>
          </div>
        </div>
      </motion.div>

      <div className="glass-card p-6 md:p-8">
        <RecipeForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateRecipe;