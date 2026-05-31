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
    <div
  className="
    rounded-[32px]
    border
    border-slate-800
    bg-slate-900
    p-6
    md:p-8
  "
>
      {!isAuthenticated && (
        <div
          className="
            mb-4
            rounded-2xl
            border
            border-amber-500/20
            bg-amber-500/10
            px-4
            py-3
            text-sm
            text-amber-300
          "
        >
          Login to join the conversation and share your thoughts.
        </div>
      )}


      <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
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
              className="
w-full
resize-none
rounded-2xl
border
border-slate-700
bg-slate-800
text-white
placeholder:text-slate-400
px-4
py-3
outline-none
focus:border-orange-500
focus:ring-4
focus:ring-orange-500/10
"
            />
            <button
              type="submit"
              disabled={!isAuthenticated || !newComment.trim() || loading}
              className="mt-3
inline-flex
items-center
gap-2
rounded-2xl
bg-gradient-to-r
from-orange-500
via-amber-500
to-rose-500
px-5
py-3
text-sm
font-semibold
text-white
disabled:opacity-50"
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
            className="flex
gap-3
p-5
rounded-2xl
border
border-slate-800
bg-slate-800/60"
          >
            <img
              src={comment.user?.avatar || `https://ui-avatars.com/api/?name=${comment.user?.name}&background=f97316&color=fff`}
              alt={comment.user?.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-white">
                  {comment.user?.name}
                </span>
                <span className="text-xs text-slate-400">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </span>
              </div>
              <p className="text-slate-300">{comment.content}</p>
              <div className="flex items-center gap-4 mt-2">
                <button className="flex
items-center
gap-1
text-sm
text-slate-400
hover:text-rose-400
transition-colors">
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