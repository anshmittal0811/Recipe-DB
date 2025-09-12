import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || 
             location.pathname.startsWith('/recipes') || 
             location.pathname.startsWith('/ingredients') ||
             location.pathname.startsWith('/category');
    }
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 shadow-lg bg-background z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 bg-background">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold">
                <span className="text-primary">Recipe</span>
                <span className="text-secondary">DB</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden md:block">
            <div className="bg-[#F1F1F1] rounded-full px-1 py-1 shadow-sm">
              <div className="flex items-center space-x-6">
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive('/') 
                      ? 'bg-white text-gray-900' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/how-to-use"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive('/how-to-use') 
                      ? 'bg-white text-gray-900' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  How To Use
                </Link>
                <Link
                  to="/receptors"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive('/receptors') 
                      ? 'bg-white text-gray-900' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Receptors
                </Link>
                <Link
                  to="/faq"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive('/faq') 
                      ? 'bg-white text-gray-900' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  FAQs
                </Link>
                <Link
                  to="/contact"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive('/contact') 
                      ? 'bg-white text-gray-900' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar; 