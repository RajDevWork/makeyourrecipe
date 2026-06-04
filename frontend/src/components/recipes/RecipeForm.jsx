import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Upload, X, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { categoryService } from '../../services/categoryService';
import { recipeService } from '../../services/recipeService';

const RecipeForm = ({ initialData, isEdit = false }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'medium',
    servings: 4,
    prepTime: 0,
    cookTime: 0,
    totalTime: 0,
    ingredients: [{ name: '', amount: '', unit: '' }],
    steps: [{ order: 1, description: '' }],
    tags: '',
    status: 'published',
  });

  useEffect(() => {
    fetchCategories();
    if (initialData) {
      loadInitialData();
    }
  }, [initialData]);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const loadInitialData = () => {
    setFormData({
      title: initialData.title || '',
      description: initialData.description || '',
      category: initialData.category?._id || initialData.category || '',
      difficulty: initialData.difficulty || 'medium',
      servings: initialData.servings || 4,
      prepTime: initialData.cookingTime?.prep || 0,
      cookTime: initialData.cookingTime?.cook || 0,
      totalTime: initialData.cookingTime?.total || 0,
      ingredients: initialData.ingredients?.length ? initialData.ingredients : [{ name: '', amount: '', unit: '' }],
      steps: initialData.steps?.length ? initialData.steps : [{ order: 1, description: '' }],
      tags: initialData.tags?.join(', ') || '',
      status: initialData.status || 'published',
    });
    if (initialData.images?.length) {
      setImagePreviews(initialData.images);
    }
  };

  const calculateTotalTime = (prep, cook) => {
    const prepNum = parseInt(prep) || 0;
    const cookNum = parseInt(cook) || 0;
    return prepNum + cookNum;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'prepTime') {
      const prep = parseInt(value) || 0;
      setFormData(prev => ({ 
        ...prev, 
        prepTime: prep,
        totalTime: calculateTotalTime(prep, prev.cookTime)
      }));
    } else if (name === 'cookTime') {
      const cook = parseInt(value) || 0;
      setFormData(prev => ({ 
        ...prev, 
        cookTime: cook,
        totalTime: calculateTotalTime(prev.prepTime, cook)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    const newArray = [...formData[arrayName]];
    newArray[index] = { ...newArray[index], [field]: value };
    setFormData(prev => ({ ...prev, [arrayName]: newArray }));
  };

  const addArrayItem = (arrayName, newItem) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], newItem]
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    const newArray = formData[arrayName].filter((_, i) => i !== index);
    if (arrayName === 'steps') {
      newArray.forEach((step, idx) => {
        step.order = idx + 1;
      });
    }
    setFormData(prev => ({ ...prev, [arrayName]: newArray }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
    setFormData(prev => ({ ...prev, newImages: [...(prev.newImages || []), ...files] }));
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    if (formData.newImages) {
      const newImages = formData.newImages.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, newImages }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Filter out empty ingredients and steps
      const validIngredients = formData.ingredients.filter(ing => ing.name.trim() !== '');
      const validSteps = formData.steps.filter(step => step.description.trim() !== '');
      
      // Create FormData
      const submitData = new FormData();
      
      // Basic fields
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('difficulty', formData.difficulty);
      submitData.append('servings', formData.servings.toString());
      submitData.append('status', formData.status);
      
      // Cooking time - send as individual fields
      submitData.append('cookingTime[prep]', formData.prepTime.toString());
      submitData.append('cookingTime[cook]', formData.cookTime.toString());
      submitData.append('cookingTime[total]', formData.totalTime.toString());
      
      // Tags - send as array
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      tagsArray.forEach(tag => {
        submitData.append('tags[]', tag);
      });
      
      // Ingredients - send as array of objects (using dot notation)
      validIngredients.forEach((ingredient, index) => {
        submitData.append(`ingredients[${index}][name]`, ingredient.name);
        submitData.append(`ingredients[${index}][amount]`, ingredient.amount);
        submitData.append(`ingredients[${index}][unit]`, ingredient.unit || '');
      });
      
      // Steps - send as array of objects (using dot notation)
      validSteps.forEach((step, index) => {
        submitData.append(`steps[${index}][order]`, step.order.toString());
        submitData.append(`steps[${index}][description]`, step.description);
      });
      
      // Images
      if (formData.newImages && formData.newImages.length > 0) {
        formData.newImages.forEach((image) => {
          submitData.append('images', image);
        });
      }
      
      // For edit mode, send existing images to keep
      if (isEdit && imagePreviews.length > 0 && !formData.newImages) {
        submitData.append('existingImages', JSON.stringify(imagePreviews));
      }
      
      let response;
      if (isEdit && initialData?._id) {
        response = await recipeService.updateRecipe(initialData._id, submitData);
        toast.success('Recipe updated successfully!');
      } else {
        response = await recipeService.createRecipe(submitData);
        toast.success('Recipe created successfully!');
      }
      
      navigate(`/recipe/${response.data._id}`);
    } catch (error) {
      console.error('Error saving recipe:', error);
      toast.error(error.response?.data?.message || 'Failed to save recipe');
    } finally {
      setLoading(false);
    }
  };

  const addStep = () => {
    addArrayItem('steps', { order: formData.steps.length + 1, description: '' });
  };

  const addIngredient = () => {
    addArrayItem('ingredients', { name: '', amount: '', unit: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          Basic Information
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Recipe Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              placeholder="e.g., Classic Spaghetti Carbonara"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition resize-none"
              placeholder="Describe your recipe..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Difficulty Level
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              >
                <option value="easy">Easy - Beginner Friendly</option>
                <option value="medium">Medium - Some Experience</option>
                <option value="hard">Hard - Advanced Skills</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Servings
              </label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              >
                <option value="draft">Draft - Save for later</option>
                <option value="published">Published - Share with everyone</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Cooking Time Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-500" />
          Cooking Time
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Prep Time (minutes)
            </label>
            <input
              type="number"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              placeholder="e.g., 15"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cook Time (minutes)
            </label>
            <input
              type="number"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              placeholder="e.g., 30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Total Time (minutes)
            </label>
            <input
              type="number"
              value={formData.totalTime}
              disabled
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              placeholder="Auto-calculated"
            />
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          Recipe Images
        </h3>
        
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {imagePreviews.map((img, idx) => (
              <div key={idx} className="relative group">
                <img 
                  src={typeof img === 'string' ? img : URL.createObjectURL(img)} 
                  alt={`Preview ${idx + 1}`} 
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-orange-500 transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer inline-flex flex-col items-center gap-2"
          >
            <Upload className="w-12 h-12 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">Click to upload images</span>
            <span className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</span>
          </label>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ingredients</h3>
          <button
            type="button"
            onClick={addIngredient}
            className="px-3 py-1.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Ingredient
          </button>
        </div>

        <div className="space-y-3">
          {formData.ingredients.map((ingredient, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Ingredient name"
                  value={ingredient.name}
                  onChange={(e) => handleArrayChange('ingredients', idx, 'name', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                />
              </div>
              <div className="w-32">
                <input
                  type="text"
                  placeholder="Amount"
                  value={ingredient.amount}
                  onChange={(e) => handleArrayChange('ingredients', idx, 'amount', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                />
              </div>
              <div className="w-32">
                <input
                  type="text"
                  placeholder="Unit"
                  value={ingredient.unit}
                  onChange={(e) => handleArrayChange('ingredients', idx, 'unit', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                />
              </div>
              <button
                type="button"
                onClick={() => removeArrayItem('ingredients', idx)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                disabled={formData.ingredients.length === 1}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Instructions</h3>
          <button
            type="button"
            onClick={addStep}
            className="px-3 py-1.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Step
          </button>
        </div>

        <div className="space-y-4">
          {formData.steps.map((step, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center font-semibold">
                {step.order}
              </div>
              <div className="flex-1">
                <textarea
                  placeholder={`Step ${step.order} description...`}
                  value={step.description}
                  onChange={(e) => handleArrayChange('steps', idx, 'description', e.target.value)}
                  rows="2"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition resize-none"
                />
              </div>
              <button
                type="button"
                onClick={() => removeArrayItem('steps', idx)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                disabled={formData.steps.length === 1}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tags Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          Tags
        </h3>
        
        <div>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            placeholder="e.g., Italian, Pasta, Quick, Healthy"
          />
          <p className="text-xs text-gray-500 mt-1">Separate tags with commas for better discoverability</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex-1 px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : (isEdit ? 'Update Recipe' : 'Create Recipe')}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;