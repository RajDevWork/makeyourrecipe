import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import Select from '../ui/Select';
import { categoryService } from '../../services/categoryService';
import { DIFFICULTY_LEVELS, COOKING_TIMES, SORT_OPTIONS } from '../../utils/constants';

const RecipeFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    difficulty: searchParams.get('difficulty') || '',
    cookingTime: searchParams.get('cookingTime') || '',
    sort: searchParams.get('sort') || '-createdAt',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) params.set(key, val);
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      difficulty: '',
      cookingTime: '',
      sort: '-createdAt',
    });
    setSearchParams({});
  };

  const hasActiveFilters = Object.values(filters).some(v => v);

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full btn-secondary flex items-center justify-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters {hasActiveFilters && '(Active)'}
        </button>
      </div>

      {/* Filter Panel */}
      <div className={`${isOpen ? 'fixed inset-0 z-50' : 'hidden lg:block'} lg:relative lg:z-auto`}>
        {isOpen && (
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
        )}
        
        <div className={`relative bg-white dark:bg-gray-800 w-full max-w-sm h-full lg:h-auto lg:max-w-none overflow-y-auto p-6 ${isOpen ? 'fixed right-0 top-0' : 'lg:static'}`}>
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h3 className="text-xl font-semibold">Filters</h3>
            <button onClick={() => setIsOpen(false)} className="p-2">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <Select
              label="Category"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              options={[
                { value: '', label: 'All Categories' },
                ...categories.map(c => ({ value: c._id, label: c.name }))
              ]}
            />

            <Select
              label="Difficulty"
              value={filters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              options={[
                { value: '', label: 'All Difficulties' },
                ...DIFFICULTY_LEVELS
              ]}
            />

            <Select
              label="Cooking Time"
              value={filters.cookingTime}
              onChange={(e) => handleFilterChange('cookingTime', e.target.value)}
              options={[
                { value: '', label: 'Any Time' },
                ...COOKING_TIMES
              ]}
            />

            <Select
              label="Sort By"
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              options={SORT_OPTIONS}
            />

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-orange-500 hover:text-orange-600 mt-4"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeFilters;