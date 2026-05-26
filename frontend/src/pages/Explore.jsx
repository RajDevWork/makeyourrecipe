import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import RecipeCard from '../components/recipes/RecipeCard';
import RecipeFilters from '../components/recipes/RecipeFilters';
import SkeletonCard from '../components/common/SkeletonCard';
import { recipeService } from '../services/recipeService';

const Explore = () => {
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 0 });

  useEffect(() => {
    fetchRecipes();
  }, [searchParams]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(searchParams);
      const response = await recipeService.getAllRecipes(params);
      setRecipes(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-80">
          <RecipeFilters />
        </div>

        {/* Recipes Grid */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold gradient-text">Explore Recipes</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Discover {pagination.total} amazing recipes
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : recipes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400">No recipes found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe, index) => (
                <RecipeCard key={recipe._id} recipe={recipe} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;