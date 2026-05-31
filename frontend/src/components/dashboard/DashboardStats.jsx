import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Heart,
  Eye,
  Bookmark,
} from "lucide-react";

const DashboardStats = ({ stats }) => {
  const statItems = [
    {
      label: "Total Recipes",
      value: stats.totalRecipes,
      icon: BookOpen,
    },
    {
      label: "Total Likes",
      value: stats.totalLikes,
      icon: Heart,
    },
    {
      label: "Total Views",
      value: stats.totalViews,
      icon: Eye,
    },
    {
      label: "Saved Recipes",
      value: stats.bookmarks,
      icon: Bookmark,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.08,
          }}
          whileHover={{
            y: -5,
          }}
          className="
            rounded-[28px]
            border
            border-slate-200
            dark:border-slate-800
            bg-white
            dark:bg-slate-900
            p-6
            transition-all
            duration-300
            hover:shadow-xl
          "
        >
          <div className="flex items-start justify-between">

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-orange-500
                via-amber-500
                to-rose-500
                shadow-lg
                shadow-orange-500/20
              "
            >
              <item.icon className="h-7 w-7 text-white" />
            </div>

            <div className="text-right">
              <h3
                className="
                  text-3xl
                  md:text-4xl
                  font-black
                  bg-gradient-to-r
                  from-orange-500
                  via-amber-500
                  to-rose-500
                  bg-clip-text
                  text-transparent
                "
              >
                {item.value}
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {item.label}
              </p>
            </div>

          </div>

          {/* Bottom Progress Accent */}
          <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="
                h-full
                w-2/3
                rounded-full
                bg-gradient-to-r
                from-orange-500
                via-amber-500
                to-rose-500
              "
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;