import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bookmark, Heart } from "lucide-react";
import RecipeCard from "../components/recipes/RecipeCard";
import SkeletonCard from "../components/common/SkeletonCard";
import { userService } from "../services/userService";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);

    try {
      const response = await userService.getFavorites();
      setFavorites(response.data || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

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

          <div className="relative z-10 px-8 py-14 md:px-12 text-white">

            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                <Heart className="h-7 w-7 text-white" />
              </div>

              <div>
                <h1 className="text-4xl md:text-6xl font-black">
                  My Favorites
                </h1>

                <p className="mt-2 text-white/90">
                  Your personal collection of saved recipes
                </p>
              </div>
            </div>

            {!loading && (
              <div
                className="
                  inline-flex
                  items-center
                  rounded-full
                  bg-white/20
                  px-4
                  py-2
                  text-sm
                  font-medium
                  backdrop-blur-md
                "
              >
                ❤️ {favorites.length} Saved Recipes
              </div>
            )}
          </div>
        </motion.div>

        {/* Content Area */}
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

          {/* Loading */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <SkeletonCard />
                </motion.div>
              ))}
            </div>
          ) : favorites.length === 0 ? (

            /* Empty State */
            <div className="py-24 text-center">

              <div
                className="
                  mx-auto
                  mb-6
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-3xl
                  bg-orange-100
                  dark:bg-orange-500/10
                "
              >
                <Bookmark className="h-10 w-10 text-orange-500" />
              </div>

              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
                No Favorites Yet
              </h3>

              <p className="max-w-md mx-auto text-slate-500 dark:text-slate-400 leading-relaxed">
                Start building your recipe collection by bookmarking dishes
                you love. Your saved recipes will appear here.
              </p>

            </div>

          ) : (

            /* Recipe Grid */
            <>
              <div className="flex items-center justify-between mb-8">

                <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                    Saved Recipes
                  </h2>

                  <p className="mt-2 text-slate-500 dark:text-slate-400">
                    All your favorite recipes in one place
                  </p>
                </div>

                <div
                  className="
                    hidden
                    md:inline-flex
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
                  {favorites.length} Recipes
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {favorites.map((recipe, index) => (
                  <RecipeCard
                    key={recipe._id}
                    recipe={recipe}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;