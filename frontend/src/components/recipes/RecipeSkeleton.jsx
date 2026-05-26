import React from 'react';

const RecipeSkeleton = () => {
  return (
    <div className="glass-card overflow-hidden">
      <div className="h-56 bg-gray-200 dark:bg-gray-700 skeleton"></div>
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
        </div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded skeleton w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton w-2/3"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
        </div>
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 skeleton"></div>
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
          </div>
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSkeleton;