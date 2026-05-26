import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onClick={() => navigate(`/explore?category=${category._id}`)}
      className="glass-card p-6 text-center cursor-pointer group"
    >
      <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
        {category.icon || '🍽️'}
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{category.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{category.recipeCount || 0} recipes</p>
    </motion.div>
  );
};

export default CategoryCard;