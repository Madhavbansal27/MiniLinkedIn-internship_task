import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { Post } from '../types';
import PostCreator from './PostCreator';
import PostCard from './PostCard';
import axios from "axios"
const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts(){
      try {
        const response = await axios.get("https://minilinkedin-internship-task.onrender.com/api/post/get-all-posts",{
          headers : {
              Authorization :"Bearer " + localStorage.getItem("token")
          }
        })
        setPosts(response.data.posts)
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    }
    fetchPosts()
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <PostCreator setPosts={setPosts}/>
      <div>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-slate-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={32} className="text-white" />
            </div>
            <p className="text-gray-600 text-lg">
              No posts yet. Be the first to share something!
            </p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard
              key={post._id}
              post={post}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
