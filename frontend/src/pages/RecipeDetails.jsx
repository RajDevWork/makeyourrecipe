import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Clock, Users, Star, Heart, Bookmark, Share2, Printer, 
  ArrowLeft, ChefHat, Clock as ClockIcon, ExternalLink, Link as LinkIcon, CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { recipeService } from '../services/recipeService';
import RecipeComments from '../components/recipes/RecipeComments';
import RecipeCard from '../components/recipes/RecipeCard';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [recipe, setRecipe] = useState(null);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    setLoading(true);
    try {
      const response = await recipeService.getRecipeById(id);
      setRecipe(response.data);
      setSimilarRecipes(response.similar || []);
      setIsLiked(response.data.isLiked || false);
      setIsBookmarked(response.data.isBookmarked || false);
      setLikesCount(response.data.stats?.likes || 0);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      toast.error('Recipe not found');
      navigate('/explore');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to like recipes');
      navigate('/login');
      return;
    }

    try {
      if (isLiked) {
        await recipeService.unlikeRecipe(id);
        setLikesCount(prev => prev - 1);
        toast.success('Removed like');
      } else {
        await recipeService.likeRecipe(id);
        setLikesCount(prev => prev + 1);
        toast.success('Liked!');
      }
      setIsLiked(!isLiked);
    } catch (error) {
      toast.error('Failed to update like');
    }
  };

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to bookmark recipes');
      navigate('/login');
      return;
    }

    try {
      if (isBookmarked) {
        await recipeService.removeBookmark(id);
        toast.success('Removed from favorites');
      } else {
        await recipeService.addBookmark(id);
        toast.success('Added to favorites');
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      toast.error('Failed to update bookmark');
    }
  };

  const handleShare = async (platform) => {
    const url = window.location.href;
    const title = recipe.title;
    const text = `Check out this amazing recipe: ${recipe.title}`;

    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
        break;
    }
    setShowShareMenu(false);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recipe not found</h2>
        <Link to="/explore" className="text-orange-500 mt-4 inline-block">Browse Recipes</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={recipe.images?.[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="mb-4 inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{recipe.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <img
                  src={recipe.author?.avatar || `https://ui-avatars.com/api/?name=${recipe.author?.name}&background=f97316&color=fff`}
                  alt={recipe.author?.name}
                  className="w-8 h-8 rounded-full"
                />
                <span>By {recipe.author?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{recipe.cookingTime?.total || 30} mins</span>
              </div>
              <div className="flex items-group gap-2">
                <Users className="w-4 h-4" />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{recipe.averageRating || '4.5'} (50 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="glass-card p-6 md:p-8">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-white' : ''}`} />
              <span>{likesCount} Likes</span>
            </button>
            
            <button
              onClick={handleBookmark}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isBookmarked 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-white' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
              
              {showShareMenu && (
                <div className="absolute top-full mt-2 left-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 z-20 min-w-[160px]">
                  <button onClick={() => handleShare('facebook')} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-blue-600" /> Facebook
                  </button>
                  <button onClick={() => handleShare('twitter')} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-sky-400" /> Twitter
                  </button>
                  <button onClick={() => handleShare('linkedin')} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-blue-700" /> LinkedIn
                  </button>
                  <button onClick={() => handleShare('copy')} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" /> Copy Link
                  </button>
                </div>
              )}
            </div>
            
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              <Printer className="w-5 h-5" />
              <span>Print</span>
            </button>
            
            {user?._id === recipe.author?._id && (
              <Link
                to={`/edit-recipe/${recipe._id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all"
              >
                Edit Recipe
              </Link>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Description</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{recipe.description}</p>
          </div>

          {/* Ingredients & Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients?.map((ingredient, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                      {ingredient.note && <span className="text-gray-500 text-sm ml-1">({ingredient.note})</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Instructions</h2>
              <div className="space-y-4">
                {recipe.steps?.map((step, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center font-semibold">
                      {step.order}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 flex-1">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nutritional Info */}
          {recipe.nutritionalInfo && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Nutritional Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(recipe.nutritionalInfo).map(([key, value]) => (
                  <div key={key} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-bold text-orange-500">{value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {recipe.tags?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, idx) => (
                  <Link
                    key={idx}
                    to={`/explore?tags=${tag}`}
                    className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <RecipeComments recipeId={recipe._id} comments={recipe.comments || []} />
        </div>

        {/* Similar Recipes */}
        {similarRecipes.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarRecipes.map((similar, index) => (
                <RecipeCard key={similar._id} recipe={similar} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;