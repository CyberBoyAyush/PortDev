import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import CreatePortfolioButton from './components/CreatePortfolioButton';
import Footer from './components/Footer'; // Add this import

const App = () => {
  const location = useLocation();
  const isPortfolioPage = location.pathname.split('/').length === 2 
    && location.pathname !== '/' 
    && location.pathname !== '/login' 
    && location.pathname !== '/signup';

  return (
    <div className="min-h-screen flex flex-col"> {/* Added flex flex-col */}
      {/* Dynamic Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border-b border-white/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Always visible */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PortDev
              </span>
            </Link>

            {/* Conditional Navigation Items */}
            {isPortfolioPage ? (
              // Portfolio Page Navigation
              <div className="flex items-center space-x-4">
                <CreatePortfolioButton />
              </div>
            ) : (
              // Regular Navigation
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 
                           text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 
                           transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 flex-grow"> {/* Added flex-grow */}
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
      
    </div>
  );
};

export default App;
