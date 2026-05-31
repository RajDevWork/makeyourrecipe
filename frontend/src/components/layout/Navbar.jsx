import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChefHat, Menu, X, Sun, Moon, User, LogOut, Settings, Heart,
  PlusCircle, LayoutDashboard, Bell, Search
} from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import { toggleDarkMode } from '../../store/slices/themeSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);
  const { unreadCount } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
  ];

  const authenticatedLinks = [
    { name: 'Create Recipe', path: '/create-recipe', icon: PlusCircle },
    { name: 'Favorites', path: '/favorites', icon: Heart },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  return (
    <nav
  className={`fixed top-0 w-full z-50 transition-all duration-500 ${
    scrolled
        ? `
          bg-white/80
          dark:bg-slate-950/80
          backdrop-blur-2xl
          border-b
          border-slate-200/50
          dark:border-slate-800/50
          shadow-[0_8px_30px_rgb(0,0,0,0.08)]
        `
        : 'bg-white dark:bg-slate-950'
    }`}
  >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
  to="/"
  className="flex items-center gap-3 group"
>
  <motion.div
    whileHover={{
      rotate: 12,
      scale: 1.05,
    }}
    className="
      h-10
      w-10
      rounded-2xl
      bg-gradient-to-br
      from-orange-500
      via-amber-500
      to-rose-500
      flex
      items-center
      justify-center
      shadow-lg
      shadow-orange-500/20
    "
  >
    <ChefHat className="w-5 h-5 text-white" />
  </motion.div>

  <span
    className="
      text-2xl
      font-black
      bg-gradient-to-r
      from-orange-500
      via-amber-500
      to-rose-500
      bg-clip-text
      text-transparent
    "
  >
    RecipeBook
  </span>
</Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div
                  className="
                    relative
                    rounded-2xl
                    border
                    border-slate-200
                    dark:border-slate-700
                    bg-white/70
                    dark:bg-slate-900/70
                    backdrop-blur-xl
                    overflow-hidden
                  "
                >
                <Search
  className="
    absolute
    left-3
    top-1/2
    -translate-y-1/2
    w-4
    h-4
    text-orange-500
  "
/>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search recipes..."
                  className="w-full text-white dark:text-gray-300
pl-10
pr-4
py-3
bg-transparent
outline-none
text-sm
placeholder:text-slate-400"
                />
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative
font-medium
text-slate-700
dark:text-slate-300
hover:text-orange-500
transition-colors
after:absolute
after:left-0
after:-bottom-1
after:h-[2px]
after:w-0
after:bg-orange-500
after:transition-all
hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated && authenticatedLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200 font-medium flex items-center gap-1"
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4 md:ml-3">
            {/* Theme Toggle */}
            {/* <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button> */}

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Link to="/dashboard?tab=notifications" className="relative">
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Link>

                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 focus:outline-none">
                    <img
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=f97316&color=fff`}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-500/20"
                    />
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                      <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                      <hr className="my-1 border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-5
py-2.5
rounded-xl
font-semibold
text-white
bg-gradient-to-r
from-orange-500
via-amber-500
to-rose-500
hover:scale-105
transition-all
duration-300
shadow-lg
shadow-orange-500/20"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5
py-2.5
rounded-xl
font-semibold
text-white
bg-gradient-to-r
from-orange-500
via-amber-500
to-rose-500
hover:scale-105
transition-all
duration-300
shadow-lg
shadow-orange-500/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card rounded-none"
          >
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search recipes..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                  />
                </div>
              </form>
              
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              {isAuthenticated && authenticatedLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
                >
                  <link.icon className="w-4 h-4 inline mr-2" />
                  {link.name}
                </Link>
              ))}
              
              <hr className="my-2 border-gray-200 dark:border-gray-700" />
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4 inline mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4 inline mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-center text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-center btn-primary"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;