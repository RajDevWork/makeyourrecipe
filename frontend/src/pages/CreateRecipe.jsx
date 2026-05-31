import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, ChefHat } from "lucide-react";
import RecipeForm from "../components/recipes/RecipeForm";
import { recipeService } from "../services/recipeService";
import toast from "react-hot-toast";

const CreateRecipe = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const response = await recipeService.createRecipe(formData);

      toast.success("Recipe created successfully!");

      navigate(`/recipe/${response.data._id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create recipe"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8 max-w-7xl">

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

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/20
                  backdrop-blur-md
                "
              >
                <Plus className="h-7 w-7 text-white" />
              </div>

              <div>
                <h1 className="text-4xl md:text-6xl font-black">
                  Create Recipe
                </h1>

                <p className="mt-2 text-white/90">
                  Share your culinary creation with food lovers around the world.
                </p>
              </div>

            </div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white/20
                px-4
                py-2
                text-sm
                font-medium
                backdrop-blur-md
              "
            >
              <ChefHat className="h-4 w-4" />
              Publish Your Signature Dish
            </div>

          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="
            rounded-[32px]
            border
            border-slate-200
            dark:border-slate-800
            bg-white
            dark:bg-slate-900
            p-6
            md:p-10
            shadow-sm
          "
        >
          <div className="mb-8">

            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Recipe Details
            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Fill in the information below to create and publish your recipe.
            </p>

          </div>

          <RecipeForm onSubmit={handleSubmit} />
        </motion.div>

      </div>
    </div>
  );
};

export default CreateRecipe;