import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Eye, Bookmark } from 'lucide-react';

const DashboardStats = ({ stats }) => {
  const statItems = [
    { label: 'Total Recipes', value: stats.totalRecipes, icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Likes', value: stats.totalLikes, icon: Heart, color: 'from-red-500 to-pink-500' },
    { label: 'Total Views', value: stats.totalViews, icon: Eye, color: 'from-green-500 to-emerald-500' },
    { label: 'Saved Recipes', value: stats.bookmarks, icon: Bookmark, color: 'from-orange-500 to-yellow-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center`}>
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{item.value}</span>
          </div>
          <h3 className="text-gray-600 dark:text-gray-400">{item.label}</h3>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;