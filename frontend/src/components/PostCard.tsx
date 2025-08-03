import React from 'react';
import {  User } from 'lucide-react';
import { Post } from '../types';
import { useNavigate } from 'react-router-dom';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate()
  const onAuthorClick = (authorId:string)=>{
    navigate(`/profile/${authorId}`)
  }
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-md">
          <User size={20} className="text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <button
              onClick={() => onAuthorClick?.(post.authorId)}
              className="font-semibold text-gray-900 hover:text-cyan-600 transition-colors"
            >
              {post.authorName}
            </button>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-500 text-sm font-medium">{formatDate(post.createdAt)}</span>
          </div>
          
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {post.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;