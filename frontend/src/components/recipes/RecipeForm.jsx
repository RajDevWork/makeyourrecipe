import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { categoryService } from '../../services/categoryService';
import { DIFFICULTY_LEVELS } from '../../utils/constants';
import toast from 'react-hot-toast';

const RecipeForm = ({ onSubmit, initialData, isEdit = false }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category?._id || '',
    difficulty: initialData?.difficulty || 'medium',
    servings: initialData?.servings || 4,
    cookingTime: {
      prep: initialData?.cookingTime?.prep || 0,
      cook: initialData?.cookingTime?.cook || 0,
      total: initialData?.cookingTime?.total || 0,
    },
    ingredients: initialData?.ingredients || [{ name: '', amount: '', unit: '' }],
    steps: initialData?.steps || [{ order: 1, description: '' }],
    tags: initialData?.tags?.join(', ') || '',
    status: initialData?.status || 'published',
    images: [],
    existingImages: initialData?.images || [],
  });
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState(initialData?.images || []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response.data || []);
    } catch (error) {
      toast.error('Failed to load categories');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
        cookingTime: {
          ...prev.cookingTime,
          total: parent === 'cookingTime' && child === 'prep' || child === 'cook'
            ? (child === 'prep' ? parseInt(value) + (prev.cookingTime.cook || 0) : (prev.cookingTime.prep || 0) + parseInt(value))
            : prev.cookingTime.total
        }
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
    setFormData(prev => ({ ...prev, [arrayName]: newArray }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...previewImages];
    const newFormImages = [...(formData.images || [])];
    
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      newImages.push(url);
      newFormImages.push(file);
    });
    
    setPreviewImages(newImages);
    setFormData(prev => ({ ...prev, images: newFormImages }));
  };

  const removeImage = (index) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      existingImages: prev.existingImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('category', formData.category);
    submitData.append('difficulty', formData.difficulty);
    submitData.append('servings', formData.servings);
    submitData.append('cookingTime[prep]', formData.cookingTime.prep);
    submitData.append('cookingTime[cook]', formData.cookingTime.cook);
    submitData.append('cookingTime[total]', formData.cookingTime.total);
    submitData.append('tags', formData.tags.split(',').map(t => t.trim()));
    submitData.append('status', formData.status);
    
    formData.ingredients.forEach((ing, idx) => {
      submitData.append(`ingredients[${idx}][name]`, ing.name);
      submitData.append(`ingredients[${idx}][amount]`, ing.amount);
      submitData.append(`ingredients[${idx}][unit]`, ing.unit);
    });
    
    formData.steps.forEach((step, idx) => {
      submitData.append(`steps[${idx}][order]`, step.order);
      submitData.append(`steps[${idx}][description]`, step.description);
    });
    
    formData.images.forEach((image, idx) => {
      submitData.append('images', image);
    });
    
    await onSubmit(submitData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Recipe Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={categories.map(c => ({ value: c._id, label: c.name }))}
            required
          />
          <Select
            label="Difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            options={DIFFICULTY_LEVELS}
          />
          <Input
            label="Servings"
            name="servings"
            type="number"
            value={formData.servings}
            onChange={handleChange}
            min="1"
          />
          <Input
            label="Prep Time (minutes)"
            name="cookingTime.prep"
            type="number"
            value={formData.cookingTime.prep}
            onChange={handleChange}
          />
          <Input
            label="Cook Time (minutes)"
            name="cookingTime.cook"
            type="number"
            value={formData.cookingTime.cook}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            as="textarea"
            rows="4"
          />
        </div>
      </div>

      {/* Images */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recipe Images</h3>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
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
          </label>
        </div>
        {previewImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {previewImages.map((img, idx) => (
              <div key={idx} className="relative group">
                <img src={img} alt={`Preview ${idx}`} className="w-full h-32 object-cover rounded-lg" />
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
      </div>

      {/* Ingredients */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ingredients</h3>
        {formData.ingredients.map((ingredient, idx) => (
          <div key={idx} className="flex gap-3 mb-3">
            <Input
              placeholder="Ingredient name"
              value={ingredient.name}
              onChange={(e) => handleArrayChange('ingredients', idx, 'name', e.target.value)}
              className="flex-2"
            />
            <Input
              placeholder="Amount"
              value={ingredient.amount}
              onChange={(e) => handleArrayChange('ingredients', idx, 'amount', e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Unit"
              value={ingredient.unit}
              onChange={(e) => handleArrayChange('ingredients', idx, 'unit', e.target.value)}
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('ingredients', idx)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('ingredients', { name: '', amount: '', unit: '' })}
          className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add Ingredient
        </button>
      </div>

      {/* Steps */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Instructions</h3>
        {formData.steps.map((step, idx) => (
          <div key={idx} className="flex gap-3 mb-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center font-semibold">
              {step.order}
            </div>
            <Input
              placeholder="Step description"
              value={step.description}
              onChange={(e) => handleArrayChange('steps', idx, 'description', e.target.value)}
              className="flex-1"
            />
            <button
              type="button"
              onClick={() => removeArrayItem('steps', idx)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('steps', { order: formData.steps.length + 1, description: '' })}
          className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add Step
        </button>
      </div>

      {/* Tags */}
      <div>
        <Input
          label="Tags (comma-separated)"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="e.g., pasta, italian, dinner"
        />
      </div>

      {/* Status */}
      <div>
        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: 'draft', label: 'Draft' },
            { value: 'published', label: 'Published' },
          ]}
        />
      </div>

      <Button type="submit" loading={loading} className="w-full">
        {isEdit ? 'Update Recipe' : 'Create Recipe'}
      </Button>
    </form>
  );
};

export default RecipeForm;