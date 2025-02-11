import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import UserMenu from './components/UserMenu';
import Footer from './components/Footer';
import Logo from './components/Logo';
import { motion } from 'framer-motion';

const App = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="backdrop-blur-xl bg-gray-900/60 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0">
                <Logo />
              </Link>

              {/* Auth Buttons */}
              <div className="flex items-center gap-2 sm:gap-4">
                {currentUser ? (
                  <UserMenu />
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="text-gray-300 hover:text-white transition-colors px-3 py-2 text-sm"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
                               text-white text-sm font-medium 
                               hover:shadow-lg hover:shadow-blue-500/25 
                               transition-all duration-300"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Active Page Indicator */}
          <motion.div 
            className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
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
