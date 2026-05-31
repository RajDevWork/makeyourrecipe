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

  if (loading && recipes.length === 0) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8">

        {/* Hero Skeleton */}
        <div
          className="
            h-[220px]
            rounded-[40px]
            mb-10
            animate-pulse
            bg-slate-200
            dark:bg-slate-900
          "
        />

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">

          {/* Sidebar Skeleton */}
          <div
            className="
              rounded-[32px]
              border
              border-slate-200
              dark:border-slate-800
              bg-white
              dark:bg-slate-900
              p-6
            "
          >
            <div className="space-y-5">

              <div className="h-6 w-32 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />

              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-3" />

                  <div className="h-12 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Recipes Skeleton */}
          <div
            className="
              rounded-[32px]
              border
              border-slate-200
              dark:border-slate-800
              bg-white
              dark:bg-slate-900
              p-6
            "
          >
            {/* Header */}
            <div className="flex justify-between mb-8">

              <div>
                <div className="h-8 w-48 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mb-3" />

                <div className="h-4 w-64 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
              </div>

              <div className="h-10 w-36 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
            </div>

            {/* Recipe Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

  return (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

    <div className="container mx-auto px-4 py-8">

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[40px] mb-10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500" />

        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 px-8 py-14 md:px-12 md:py-16 text-white">
          <h1 className="text-4xl md:text-6xl font-black">
            Explore Recipes
          </h1>

          {loading ? (
            <div className="mt-4 h-6 w-80 rounded-full bg-white/20 animate-pulse" />
          ) : (
            <p className="mt-4 text-lg text-white/90 max-w-2xl">
              Discover {pagination.total} delicious recipes from talented chefs
              and food lovers around the world.
            </p>
          )}
        </div>
      </motion.div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">

        {/* Sidebar */}
        <div>
          <div
            className="
              sticky
              top-24
              rounded-[32px]
              border
              border-slate-200
              dark:border-slate-800
              bg-white
              dark:bg-slate-900
              p-6
              shadow-sm
            "
          >
            <RecipeFilters />
          </div>
        </div>

        {/* Recipes Section */}
        <div
          className="
            rounded-[32px]
            border
            border-slate-200
            dark:border-slate-800
            bg-white
            dark:bg-slate-900
            p-6
            md:p-8
          "
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                All Recipes
              </h2>

              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Browse our growing collection of recipes
              </p>
            </div>

            {loading ? (
              <div className="mt-4 md:mt-0 h-10 w-40 rounded-full bg-orange-100 dark:bg-orange-500/10 animate-pulse" />
            ) : (
              <div
                className="
                  mt-4
                  md:mt-0
                  inline-flex
                  items-center
                  rounded-full
                  bg-orange-100
                  dark:bg-orange-500/10
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-orange-600
                  dark:text-orange-400
                "
              >
                {pagination.total} Recipes Found
              </div>
            )}
          </div>

          {/* Loading */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : recipes.length === 0 ? (

            /* Empty State */
            <div className="py-24 text-center">

              <div
                className="
                  mx-auto
                  mb-6
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-3xl
                  bg-orange-100
                  dark:bg-orange-500/10
                  text-3xl
                "
              >
                🍽️
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                No Recipes Found
              </h3>

              <p className="mt-3 text-slate-500 dark:text-slate-400">
                Try adjusting your filters or search criteria.
              </p>

            </div>

          ) : (

            /* Recipes Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {recipes.map((recipe, index) => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  index={index}
                />
              ))}
            </div>

          )}
        </div>

      </div>
    </div>
  </div>
);
};

export default Explore;