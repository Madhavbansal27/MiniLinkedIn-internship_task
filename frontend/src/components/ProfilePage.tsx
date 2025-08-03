import React, { useState, useEffect } from 'react';
import { User, Edit3, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from "axios"
import { Post, User as UserType } from '../types';
import PostCard from './PostCard';
import { useParams } from 'react-router-dom';


const ProfilePage: React.FC = () => {
  const { userId } = useParams();
  const { user: currentUser, updateProfile } = useAuth();
  const [profileUser, setProfileUser] = useState<UserType | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');

  const isOwnProfile = !userId || userId === currentUser?.id;
  const displayUser = isOwnProfile ? currentUser : profileUser;

  useEffect(() => {
    if (isOwnProfile) {
      setProfileUser(currentUser);
    } else if (userId) {
      async function getUserProfile(userId:string){
        const response = await axios.get(`https://minilinkedin-internship-task.onrender.com/api/user/getProfile/${userId}`,{
          headers : {
            Authorization : "Bearer " + localStorage.getItem("token") 
          }
        })
        setProfileUser(response.data.user)
      }
      getUserProfile(userId)
    }
  }, [userId, currentUser, isOwnProfile]);

  useEffect(() => {
    const fetchUserPosts = async (targetUserId: string) => {
      try {
        const response = await axios.get(`https://minilinkedin-internship-task.onrender.com/api/post/get-user-posts/${targetUserId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setUserPosts(response.data.posts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    if (!userId || userId === currentUser?.id) {
      // Own profile
      if (currentUser?.id) {
        fetchUserPosts(currentUser.id);
      }
    } else {
      // Someone else's profile
      if (profileUser?.id) {
        fetchUserPosts(profileUser.id);
      }
    }
  }, [userId, currentUser, profileUser]);

  const handleEditProfile = () => {
    if (displayUser) {
      setEditName(displayUser.name);
      setEditBio(displayUser.bio);
      setIsEditing(true);
    }
  };

  const handleSaveProfile = async () => {
    if (editName.trim()) {
      await updateProfile(editName.trim(), editBio.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditName('');
    setEditBio('');
  };

  if (!displayUser) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="text-center py-8">
          <p className="text-gray-500">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <User size={36} className="text-white" />
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="text-2xl font-bold text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder="Your name"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-900">{displayUser.name}</h1>
              )}
              <p className="text-gray-500 text-sm font-medium">{displayUser.email}</p>
            </div>
          </div>

          {isOwnProfile && (
            <div>
              {isEditing ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-lg hover:from-rose-700 hover:to-pink-700 text-sm font-semibold transition-all shadow-md"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEditProfile}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all shadow-sm hover:shadow-md"
                >
                  <Edit3 size={14} />
                  <span>Edit</span>
                </button>
              )}
            </div>
          )}
        </div>

        <div>
          {isEditing ? (
            <textarea
              value={editBio}
              onChange={(e) => setEditBio(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
              rows={3}
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">
              {displayUser.bio || 'No bio available.'}
            </p>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">
            {userPosts.length} {userPosts.length === 1 ? 'post' : 'posts'}
          </span>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {isOwnProfile ? 'Your Posts' : `${displayUser.name}'s Posts`}
        </h2>

        {userPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-slate-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={32} className="text-white" />
            </div>
            <p className="text-gray-600 text-lg">
              {isOwnProfile ? "You haven't posted anything yet." : "This user hasn't posted anything yet."}
            </p>
          </div>
        ) : (
          userPosts.map(post => (
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

export default ProfilePage;
