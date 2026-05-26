import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Bookmark, PlusCircle, MessageCircle } from 'lucide-react';

const ActivityTimeline = ({ activities }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'like': return <Heart className="w-4 h-4 text-red-500" />;
      case 'bookmark': return <Bookmark className="w-4 h-4 text-orange-500" />;
      case 'create': return <PlusCircle className="w-4 h-4 text-green-500" />;
      case 'comment': return <MessageCircle className="w-4 h-4 text-blue-500" />;
      default: return <Heart className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <motion.div
            key={activity._id || index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-3"
          >
            <div className="mt-1">{getIcon(activity.type)}</div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-300">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;