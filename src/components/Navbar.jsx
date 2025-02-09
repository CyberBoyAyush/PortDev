import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiLoginBoxLine } from 'react-icons/ri';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full backdrop-blur-xl bg-gradient-to-b from-black/20 to-black/10 border-b border-white/5 z-[100]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link to="/">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="group flex items-center gap-2"
            >
              {/* Logo */}
              <div className="relative">
                <span className="text-2xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 
                                 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                    Port
                  </span>
                  <span className="text-white/90">Dev</span>
                </span>
                <motion.div 
                  className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r 
                           from-purple-400 via-pink-500 to-blue-500 group-hover:w-full 
                           transition-all duration-300"
                />
              </div>
              
              {/* Beta Badge */}
              <div className="hidden sm:flex items-center px-2 py-0.5 text-[10px] font-semibold 
                          bg-white/5 rounded-full border border-white/10 text-gray-400
                          group-hover:border-purple-500/50 transition-colors duration-300">
                BETA
              </div>
            </motion.div>
          </Link>
          
          {/* Login Button */}
          <motion.div>
            <Link to="/login">
              <motion.button
                className="relative overflow-hidden px-6 py-2.5 rounded-lg font-medium
                         border border-white/10 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 
                              via-pink-500/50 to-blue-500/50 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300" />
                
                <div className="relative flex items-center gap-2 text-sm">
                  <RiLoginBoxLine className="text-lg" />
                  <span className="tracking-wide">Login</span>
                </div>
                
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r 
                           from-purple-400 via-pink-500 to-blue-500"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
