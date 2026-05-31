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
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-slate-950">

  {/* Background */}
  <div className="absolute inset-0">

    <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[180px]" />

    <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-amber-500/10 blur-[180px]" />

    <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" />
  </div>

  <div className="relative container mx-auto px-4 py-24 z-10">

    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-5xl mx-auto text-center"
    >

      {/* Badge */}
      <motion.div
        variants={fadeInUp}
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-orange-100
          dark:bg-orange-500/10
          px-4
          py-2
          text-orange-600
          dark:text-orange-400
          font-medium
          mb-8
        "
      >
        <Sparkles className="w-4 h-4" />
        Welcome to RecipeBook
      </motion.div>

      {/* Heading */}
      <motion.h1
        variants={fadeInUp}
        className="
          text-5xl
          md:text-7xl
          lg:text-8xl
          font-black
          leading-[0.95]
          tracking-tight
          mb-8
        "
      >
        <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">
          Discover &
          <br />
          Share
        </span>

        <br />

        <span className="text-slate-900 dark:text-white">
          Amazing Recipes
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={fadeInUp}
        className="
          max-w-3xl
          mx-auto
          text-lg
          md:text-xl
          text-slate-600
          dark:text-slate-400
          leading-relaxed
          mb-10
        "
      >
        Join thousands of food lovers, discover delicious recipes,
        save your favorites, and share your culinary creations
        with the world.
      </motion.p>

      {/* Buttons */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link
          to="/explore"
          className="
            inline-flex
            items-center
            justify-center
            rounded-2xl
            px-8
            py-4
            font-semibold
            text-white
            bg-gradient-to-r
            from-orange-500
            via-amber-500
            to-rose-500
            shadow-lg
            shadow-orange-500/20
            hover:scale-105
            transition-all
            duration-300
          "
        >
          Explore Recipes

          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>

        <Link
          to="/create-recipe"
          className="
            inline-flex
            items-center
            justify-center
            rounded-2xl
            px-8
            py-4
            font-semibold
            border
            border-slate-200
            dark:border-slate-700
            bg-white
            dark:bg-slate-900
            text-slate-900
            dark:text-white
            hover:shadow-lg
            transition-all
          "
        >
          Share Your Recipe
        </Link>
      </motion.div>
    </motion.div>
  </div>

  {/* Scroll Indicator */}
  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{
      repeat: Infinity,
      duration: 2,
    }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2"
  >
    <div className="w-6 h-10 rounded-full border-2 border-orange-300 dark:border-orange-500/30 flex justify-center">
      <div className="w-1 h-2 mt-2 rounded-full bg-orange-500 animate-pulse" />
    </div>
  </motion.div>

</section>

      {/* Benefits Strip */}
      <section className="py-24 bg-gradient-to-b from-orange-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
  <div className="container mx-auto px-4">

    <div className="text-center mb-16">
      <span className="inline-flex items-center rounded-full bg-orange-100 dark:bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-600 dark:text-orange-400">
        Why Choose RecipeBook
      </span>

      <h2 className="mt-5 text-4xl md:text-5xl font-black">
        <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">
          Everything You Need
        </span>
      </h2>

      <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg">
        Discover recipes, save your favorites, and become part of a growing food-loving community.
      </p>
    </div>

    <div className="grid gap-8 md:grid-cols-3">

      {[
        {
          title: "Instant Inspiration",
          description:
            "Browse curated recipe ideas in seconds and never run out of dinner plans.",
          icon: Zap,
        },
        {
          title: "Cook with Confidence",
          description:
            "Step-by-step recipes keep every meal easy, delicious, and stress-free.",
          icon: Heart,
        },
        {
          title: "Community Favorites",
          description:
            "Save, share, and discover trending dishes loved by home cooks.",
          icon: Share2,
        },
      ].map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{
            y: -8,
          }}
          className="
            group
            rounded-[32px]
            border
            border-orange-100
            dark:border-slate-800
            bg-white
            dark:bg-slate-900
            p-8
            shadow-sm
            hover:shadow-2xl
            transition-all
            duration-300
          "
        >
          <div
            className="
              mb-6
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-orange-500
              via-amber-500
              to-rose-500
              text-white
              shadow-lg
              shadow-orange-500/20
            "
          >
            <item.icon className="h-7 w-7" />
          </div>

          <h3 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
            {item.title}
          </h3>

          <p className="leading-relaxed text-slate-600 dark:text-slate-400">
            {item.description}
          </p>

          <div className="mt-6 h-1 w-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300 group-hover:w-24" />
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Stats Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
  <div className="container mx-auto px-4">

    <div className="text-center mb-16">
      <span
        className="
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
        Community Impact
      </span>

      <h2 className="mt-5 text-5xl md:text-6xl font-black">
        <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">
          Trusted By Thousands
        </span>
      </h2>

      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        Join one of the fastest growing recipe communities.
      </p>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          icon: ChefHat,
          label: "Recipes",
          value: "10,000+",
        },
        {
          icon: Users,
          label: "Active Chefs",
          value: "5,000+",
        },
        {
          icon: Clock,
          label: "Minutes Saved",
          value: "1M+",
        },
        {
          icon: Star,
          label: "5-Star Ratings",
          value: "50K+",
        },
      ].map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.1,
          }}
          viewport={{ once: true }}
          whileHover={{
            y: -5,
          }}
          className="
            rounded-[28px]
            border
            border-slate-200
            dark:border-slate-800
            bg-slate-50
            dark:bg-slate-900
            p-8
            text-center
            transition-all
            duration-300
            hover:shadow-xl
          "
        >
          <div
            className="
              mx-auto
              mb-5
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-orange-500
              via-amber-500
              to-rose-500
              text-white
              shadow-lg
              shadow-orange-500/20
            "
          >
            <stat.icon className="h-7 w-7" />
          </div>

          <h3
            className="
              text-4xl
              md:text-5xl
              font-black
              bg-gradient-to-r
              from-orange-500
              via-amber-500
              to-rose-500
              bg-clip-text
              text-transparent
            "
          >
            {stat.value}
          </h3>

          <p className="mt-2 text-slate-600 dark:text-slate-400 font-medium">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Categories Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
  <div className="container mx-auto px-4">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <span
        className="
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
        Browse Categories
      </span>

      <h2 className="mt-5 text-5xl md:text-6xl font-black">
        <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">
          Find Your Next Meal
        </span>
      </h2>

      <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
        Explore recipes by category and discover dishes you'll love to cook.
      </p>
    </motion.div>

    {/* Category Wrapper */}
    <div
      className="
        rounded-[40px]
        border
        border-slate-200
        dark:border-slate-800
        bg-slate-50
        dark:bg-slate-900
        p-6
        md:p-10
      "
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.slice(0, 8).map((category, index) => (
          <CategoryCard
            key={category._id}
            category={category}
            index={index}
          />
        ))}
      </div>
    </div>

  </div>
</section>

      {/* Featured Recipes */}
      <section className="py-24 bg-white dark:bg-slate-950">
  <div className="container mx-auto px-4">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <span
        className="
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
        Chef's Picks
      </span>

      <h2 className="mt-5 text-5xl md:text-6xl font-black">
        <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">
          Featured Recipes
        </span>
      </h2>

      <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
        Hand-picked recipes from our top chefs that you'll absolutely love.
      </p>
    </motion.div>

    {/* Recipes Container */}
    <div
      className="
        rounded-[40px]
        border
        border-slate-200
        dark:border-slate-800
        bg-slate-50
        dark:bg-slate-900
        p-6
        md:p-10
      "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredRecipes.map((recipe, index) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            index={index}
          />
        ))}
      </div>
    </div>

  </div>
</section>

      {/* Trending Recipes */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
  <div className="container mx-auto px-4">

    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">

      <div>
        <span
          className="
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
          Trending This Week
        </span>

        <h2 className="mt-5 text-5xl md:text-6xl font-black">
          <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">
            Trending Recipes
          </span>
        </h2>

        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Discover what food lovers are cooking right now.
        </p>
      </div>

      <Link
        to="/explore?sort=trending"
        className="
          inline-flex
          items-center
          gap-2
          font-semibold
          text-orange-500
          hover:text-orange-600
          transition-colors
        "
      >
        View All
        <ArrowRight className="w-5 h-5" />
      </Link>

    </div>

    {/* Recipes Wrapper */}
    <div
      className="
        rounded-[40px]
        border
        border-slate-200
        dark:border-slate-800
        bg-white
        dark:bg-slate-950
        p-6
        md:p-10
      "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trendingRecipes.map((recipe, index) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            index={index}
            variant="trending"
          />
        ))}
      </div>
    </div>

  </div>
</section>

      {/* Features Section */}
      <section className="relative py-28 overflow-hidden">

  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
    }}
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/65" />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/70" />

  <div className="container mx-auto px-4 relative z-10">

    <div className="max-w-3xl mx-auto text-center mb-16">

      <span
        className="
          inline-flex
          items-center
          rounded-full
          bg-orange-500/15
          px-4
          py-2
          text-orange-300
          text-sm
          font-medium
          backdrop-blur-lg
        "
      >
        Why Food Lovers Choose Us
      </span>

      <h2 className="mt-6 text-5xl md:text-6xl font-black text-white">
        Cook Better,
        <span className="block bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 bg-clip-text text-transparent">
          Every Single Day
        </span>
      </h2>

      <p className="mt-5 text-lg text-slate-300">
        Discover recipes, save favorites, and become part of a thriving cooking community.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">

      {[
        {
          icon: Zap,
          title: "Quick & Easy",
          description:
            "Find recipes that perfectly fit your busy schedule.",
        },
        {
          icon: Heart,
          title: "Save Favorites",
          description:
            "Build your personal collection of must-try recipes.",
        },
        {
          icon: Share2,
          title: "Share & Inspire",
          description:
            "Showcase your creations and inspire home chefs.",
        },
      ].map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{
            y: -8,
          }}
          className="
            rounded-[32px]
            border
            border-white/10
            bg-white/10
            backdrop-blur-xl
            p-8
            text-center
            transition-all
            duration-300
          "
        >
          <div
            className="
              mx-auto
              mb-6
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-orange-500
              via-amber-500
              to-rose-500
              text-white
            "
          >
            <feature.icon className="h-8 w-8" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-3">
            {feature.title}
          </h3>

          <p className="text-slate-300 leading-relaxed">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-28 bg-slate-50 dark:bg-slate-900">
  <div className="container mx-auto px-4">

    <div
      className="
        relative
        overflow-hidden
        rounded-[48px]
        min-h-[550px]
        flex
        items-center
        justify-center
        shadow-2xl
      "
    >
      {/* Background Image */}
      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          scale-110
        "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70" />

      {/* Floating Blur Effects */}
      <div className="absolute top-10 left-10 h-48 w-48 rounded-full bg-orange-500/20 blur-[120px]" />
      <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-amber-500/20 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 text-center text-white">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          {/* Icon */}
          <div
            className="
              mx-auto
              mb-8
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-3xl
              bg-gradient-to-br
              from-orange-500
              via-amber-500
              to-rose-500
              shadow-xl
              shadow-orange-500/30
            "
          >
            <BookOpen className="h-10 w-10 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            Ready to Share
            <span className="block bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 bg-clip-text text-transparent">
              Your Culinary Creations?
            </span>
          </h2>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
            Join thousands of passionate food lovers, publish your favorite recipes,
            and inspire home chefs around the world.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <Link
              to="/register"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-orange-500
                via-amber-500
                to-rose-500
                px-8
                py-4
                font-semibold
                text-white
                shadow-xl
                shadow-orange-500/30
                hover:scale-105
                transition-all
                duration-300
              "
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/explore"
              className="
                inline-flex
                items-center
                justify-center
                rounded-2xl
                border
                border-white/20
                bg-white/10
                backdrop-blur-xl
                px-8
                py-4
                font-semibold
                text-white
                hover:bg-white/20
                transition-all
                duration-300
              "
            >
              Explore Recipes
            </Link>

          </div>

        </motion.div>
      </div>
    </div>

  </div>
</section>
    </div>
  );
};

export default Home;