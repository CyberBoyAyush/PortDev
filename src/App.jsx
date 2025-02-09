import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import UserMenu from './components/UserMenu';
import Footer from './components/Footer';

const App = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border-b border-white/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PortDev
              </span>
            </Link>

            {/* Navigation Items */}
            <div className="flex items-center gap-2 sm:gap-4">
              {currentUser ? (
                <UserMenu />
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 
                             transition-colors px-2 sm:px-3 py-2 text-sm"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup"
                    className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 
                             text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 
                             transition-all duration-300 whitespace-nowrap"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16 flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default App;
