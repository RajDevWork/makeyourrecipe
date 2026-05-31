import React from 'react';

const Select = ({ label, options, error, className = '', ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <select
        className={`w-full
rounded-2xl
border
border-slate-200
dark:border-slate-700
bg-white
dark:bg-slate-800
px-4
py-3
text-slate-900
dark:text-white
outline-none
focus:border-orange-500
focus:ring-4
focus:ring-orange-500/10
transition-all focus:ring-orange-500/20 focus:border-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
          error ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default Select;