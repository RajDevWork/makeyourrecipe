import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChefHat, Clock, Users, Star, TrendingUp, BookOpen, ArrowRight,
  Sparkles, Zap, Heart, Share2 
} from 'lucide-react';
import RecipeCard from '../components/recipes/RecipeCard';
import CategoryCard from '../components/categories/CategoryCard';
import { recipeService } from '../services/recipeService';
import { categoryService } from '../services/categoryService';

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [featured, trending, cats] = await Promise.all([
        recipeService.getFeaturedRecipes(),
        recipeService.getTrendingRecipes(),
        categoryService.getAllCategories()
      ]);
      setFeaturedRecipes(featured.data || featured || []);
      setTrendingRecipes(trending.data || trending || []);
      setCategories(cats.data || cats || []);
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float-delayed"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                Welcome to RecipeBook
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            >
              <span className="gradient-text">Discover & Share</span>
              <br />
              <span className="text-gray-900 dark:text-white">Amazing Recipes</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto"
            >
              Join our community of food lovers and explore thousands of delicious recipes 
              from around the world. Share your culinary creations and get inspired!
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/explore" className="btn-primary group">
                Explore Recipes
                <ArrowRight className="w-5 h-5 inline ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/create-recipe" className="btn-secondary">
                Share Your Recipe
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: ChefHat, label: 'Recipes', value: '10,000+', color: 'from-orange-500 to-red-500' },
              { icon: Users, label: 'Active Chefs', value: '5,000+', color: 'from-blue-500 to-cyan-500' },
              { icon: Clock, label: 'Minutes Saved', value: '1M+', color: 'from-green-500 to-emerald-500' },
              { icon: Star, label: '5-Star Ratings', value: '50K+', color: 'from-yellow-500 to-orange-500' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-4 inline-block">
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                  <div className="relative w-20 h-20 mx-auto bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className={`w-10 h-10 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Popular Categories</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Explore recipes by category and find your next favorite dish
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category, index) => (
              <CategoryCard key={category._id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Featured Recipes</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Hand-picked recipes from our top chefs that you'll love
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe, index) => (
              <RecipeCard key={recipe._id} recipe={recipe} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Recipes */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="gradient-text">Trending Now</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Most popular recipes this week
              </p>
            </div>
            <Link to="/explore?sort=trending" className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingRecipes.map((recipe, index) => (
              <RecipeCard key={recipe._id} recipe={recipe} index={index} variant="trending" />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Quick & Easy',
                description: 'Find recipes that fit your schedule with our quick and easy options'
              },
              {
                icon: Heart,
                title: 'Save Favorites',
                description: 'Bookmark your favorite recipes and create your personal collection'
              },
              {
                icon: Share2,
                title: 'Share & Inspire',
                description: 'Share your creations with the community and inspire others'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all duration-300"
              >
                <feature.icon className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-pink-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490645935967-10de6ba17061')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <BookOpen className="w-20 h-20 mx-auto mb-6 animate-float" />
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Ready to Share Your Culinary Creations?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of food enthusiasts and showcase your recipes to the world
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;