import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Post } from '../types';
interface PostCreatorProps {
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}
const PostCreator: React.FC<PostCreatorProps> =({ setPosts }) => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuth();
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || !user) return;
    const response = await axios.post("http://localhost:3000/api/post/newpost",{
      content
    },{
      headers:{
        Authorization : "Bearer "+localStorage.getItem("token")
      }
    })
    const newPost = response.data.newPost
    setPosts(prev => [newPost, ...prev]);
    setContent('');
    setIsExpanded(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
            <MessageSquare size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="What's on your mind?"
              rows={isExpanded ? 4 : 2}
            />
            
            {isExpanded && (
              <div className="flex justify-end space-x-2 mt-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false);
                    setContent('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!content.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  Post
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostCreator;