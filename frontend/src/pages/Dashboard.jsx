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
    <div className="min-h-screen bg-slate-950 dark:bg-slate-950">
      <div className="mx-auto px-4 py-8">

        <div className="h-52 rounded-[40px] bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 animate-pulse mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="
                h-32
                rounded-[32px]
                bg-white
                dark:bg-slate-900
                animate-pulse
              "
            />
          ))}
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="mx-auto px-4 py-8 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[40px] mb-10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500" />

        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 px-8 py-14 md:px-12 text-white">

          <h1 className="text-4xl md:text-6xl font-black">
            Dashboard
          </h1>

          <p className="mt-4 text-lg text-white/90">
            Welcome back! Here's your cooking journey overview.
          </p>

        </div>
      </motion.div>

      <div
        className="
          rounded-[32px]
          border
          border-slate-200
          dark:border-slate-800
          bg-white
          dark:bg-slate-900
          p-6
          md:p-8
        "
      >
        <DashboardStats stats={stats} />
      </div>

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div
          className="
            rounded-[32px]
            border
            border-slate-200
            dark:border-slate-800
            bg-white
            dark:bg-slate-900
            p-6
          "
        >
          <RecipeChart
            data={chartData}
            title="Recipe Growth This Month"
          />
        </div>
        <div
          className="
            rounded-[32px]
            border
            border-slate-200
            dark:border-slate-800
            bg-white
            dark:bg-slate-900
            p-6
          "
        >
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
            Recent Recipes
          </h3>
          <div className="space-y-3">
            {recentRecipes.map((recipe) => (
              <div key={recipe._id} className=" flex
  items-center
  justify-between
  rounded-2xl
  border
  border-slate-200
  dark:border-slate-800
  p-4">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{recipe.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{recipe.stats?.views || 0} views</p>
                </div>
                <span className=" rounded-full
  bg-orange-100
  dark:bg-orange-500/10
  px-3
  py-1
  text-xs
  font-medium
  text-orange-600
  dark:text-orange-400">{new Date(recipe.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;