import React from 'react';
import { motion } from 'framer-motion';
const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
    <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full"
    />
    </div>
  );
};

export default Loader;