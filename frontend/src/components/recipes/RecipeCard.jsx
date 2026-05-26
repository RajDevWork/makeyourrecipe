import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, Bookmark, Clock, Star, Share2, Eye, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { recipeService } from '../../services/recipeService';
import { setLikedRecipe, setBookmarkedRecipe } from '../../store/slices/recipeSlice';

const RecipeCard = ({ recipe, variant = 'default', index = 0 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isLiked, setIsLiked] = useState(recipe.isLiked || false);
  const [isBookmarked, setIsBookmarked] = useState(recipe.isBookmarked || false);
  const [likesCount, setLikesCount] = useState(recipe.stats?.likes || 0);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please login to like recipes');
      navigate('/login');
      return;
    }

    try {
      if (isLiked) {
        await recipeService.unlikeRecipe(recipe._id);
        setLikesCount(prev => prev - 1);
        toast.success('Removed like');
      } else {
        await recipeService.likeRecipe(recipe._id);
        setLikesCount(prev => prev + 1);
        toast.success('Liked!');
      }
      setIsLiked(!isLiked);
      dispatch(setLikedRecipe({ id: recipe._id, liked: !isLiked }));
    } catch (error) {
      toast.error('Failed to update like');
    }
  };

  const handleBookmark = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please login to bookmark recipes');
      navigate('/login');
      return;
    }

    try {
      if (isBookmarked) {
        await recipeService.removeBookmark(recipe._id);
        toast.success('Removed from favorites');
      } else {
        await recipeService.addBookmark(recipe._id);
        toast.success('Added to favorites');
      }
      setIsBookmarked(!isBookmarked);
      dispatch(setBookmarkedRecipe({ id: recipe._id, bookmarked: !isBookmarked }));
    } catch (error) {
      toast.error('Failed to update bookmark');
    }
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/recipe/${recipe._id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: recipe.title,
          text: recipe.description,
          url: url
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'hard': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: index * 0.1 }
    },
    hover: { 
      y: -8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => navigate(`/recipe/${recipe._id}`)}
      className="relative cursor-pointer"
    >
      <div className="glass-card overflow-hidden group">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={recipe.images?.[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
            alt={recipe.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty?.toUpperCase()}
            </span>
            {variant === 'trending' && (
              <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Trending
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-all shadow-lg"
            >
              <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleBookmark}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-all shadow-lg"
            >
              <Bookmark className={`w-5 h-5 transition-colors ${isBookmarked ? 'fill-orange-500 text-orange-500' : 'text-gray-600 dark:text-gray-400'}`} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-all shadow-lg"
            >
              <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </motion.button>
          </div>

          {/* Stats Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-3 text-white">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{recipe.cookingTime?.total || 30} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span className="text-sm">{recipe.stats?.views || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <img
                src={recipe.author?.avatar || `https://ui-avatars.com/api/?name=${recipe.author?.name}&background=f97316&color=fff`}
                alt={recipe.author?.name}
                className="w-6 h-6 rounded-full ring-2 ring-orange-500/20"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {recipe.author?.name}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {(recipe.averageRating || 4.5).toFixed(1)}
              </span>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white line-clamp-1">
            {recipe.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {recipe.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {recipe.tags?.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{likesCount} likes</span>
            </div>
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{recipe.stats?.saves || 0} saves</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;