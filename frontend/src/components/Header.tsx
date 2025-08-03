import React,{useState} from 'react';
import { User, LogOut, Home, UserCircle,Menu,X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg px-4 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1
            className="text-2xl font-bold text-white cursor-pointer hover:text-blue-100 transition-colors"
            onClick={() => navigate('/')}
          >
            Mini-LinkedIn
          </h1>

          {/* Mobile Menu Toggle */}
          <button
            className="text-white md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Nav Links */}
        <nav
          className={`flex-col md:flex-row md:flex md:items-center space-y-2 md:space-y-0 md:space-x-2 mt-4 md:mt-0 ${
            menuOpen ? 'flex' : 'hidden md:flex'
          }`}
        >
          <button
            onClick={() => {
              navigate('/');
              setMenuOpen(false);
            }}
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
            onClick={() => {
              navigate(`/profile/${user?.id}`);
              setMenuOpen(false);
            }}
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

        {/* Right Side: User Info & Logout */}
        <div className="hidden md:flex items-center space-x-4">
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

      {/* Mobile User Info & Logout */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 items-start px-2">
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
              setMenuOpen(false);
            }}
            className="flex items-center space-x-2 text-emerald-100 hover:text-white hover:bg-white/15 px-3 py-2 rounded-lg transition-all"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
