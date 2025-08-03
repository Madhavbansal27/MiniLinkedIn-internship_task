import React from 'react';
import { User, LogOut, Home, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg px-4 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1
            className="text-2xl font-bold text-white cursor-pointer hover:text-blue-100 transition-colors"
            onClick={() => navigate('/')}
          >
            Mini-LinkedIn
          </h1>

          <nav className="flex space-x-2">
            <button
              onClick={() => navigate('/')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/') 
                  ? 'bg-white/25 text-white shadow-md' 
                  : 'text-emerald-100 hover:text-white hover:bg-white/15'
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </button>

            <button
              onClick={() => navigate(`/profile/${user?.id}`)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPath.startsWith('/profile') 
                  ? 'bg-white/25 text-white shadow-md' 
                  : 'text-emerald-100 hover:text-white hover:bg-white/15'
              }`}
            >
              <UserCircle size={18} />
              <span>Profile</span>
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 bg-white/15 rounded-lg px-3 py-2">
            <div className="w-8 h-8 bg-white/25 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-white font-medium">{user?.name}</span>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex items-center space-x-2 text-emerald-100 hover:text-white hover:bg-white/15 px-3 py-2 rounded-lg transition-all"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
