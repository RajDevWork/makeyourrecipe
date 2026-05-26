import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecipeChart from '../components/dashboard/RecipeChart';
import { userService } from '../services/userService';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [recentRecipes, setRecentRecipes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await userService.getDashboardStats();
      setStats(response.data);
      setChartData(response.data.chartData || []);
      setRecentRecipes(response.data.recentRecipes || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back! Here's your cooking journey overview
        </p>
      </motion.div>

      <DashboardStats stats={stats} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecipeChart data={chartData} title="Recipe Growth" />
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Recipes
          </h3>
          <div className="space-y-3">
            {recentRecipes.map((recipe) => (
              <div key={recipe._id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{recipe.title}</p>
                  <p className="text-sm text-gray-500">{recipe.stats?.views || 0} views</p>
                </div>
                <span className="text-sm text-orange-500">{recipe.createdAt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;