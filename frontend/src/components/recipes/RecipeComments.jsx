import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { recipeService } from '../../services/recipeService';

const RecipeComments = ({ recipeId, comments: initialComments }) => {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to comment');
      return;
    }
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const response = await recipeService.addComment(recipeId, newComment);
      setComments([response.data, ...comments]);
      setNewComment('');
      toast.success('Comment added!');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        Comments ({comments.length})
      </h3>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="flex gap-3">
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=f97316&color=fff`}
            alt={user?.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={isAuthenticated ? "Share your thoughts..." : "Please login to comment"}
              disabled={!isAuthenticated}
              rows="3"
              className="input-primary resize-none"
            />
            <button
              type="submit"
              disabled={!isAuthenticated || !newComment.trim() || loading}
              className="btn-primary mt-2 px-4 py-2 text-sm flex items-center gap-2"
            >
              {loading ? 'Posting...' : 'Post Comment'}
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <motion.div
            key={comment._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
          >
            <img
              src={comment.user?.avatar || `https://ui-avatars.com/api/?name=${comment.user?.name}&background=f97316&color=fff`}
              alt={comment.user?.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {comment.user?.name}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
              <div className="flex items-center gap-4 mt-2">
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>{comment.likes?.length || 0}</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecipeComments;