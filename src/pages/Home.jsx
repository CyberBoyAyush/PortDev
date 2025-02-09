import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-l from-purple-600/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-600/20 to-transparent blur-3xl" />
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-screen flex items-center justify-center px-4"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-10"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              Build Your
              <span className="block mt-2 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed">
              Create Your Developer Portfolio with PortDev. Super Fast Portfolio in Minutes.
            </p>

            <motion.div 
              className="flex flex-wrap items-center justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/signup"
                className="group relative px-10 py-5 bg-gradient-to-r from-purple-500 to-blue-500 
                         rounded-xl text-white font-medium hover:opacity-90 transition-all"
              >
                <span className="relative z-10">Start Building Now</span>
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 
                              group-hover:opacity-100 transition-opacity" />
              </Link>
              
              <Link
                to="/examples"
                className="px-10 py-5 bg-white/5 rounded-xl text-white font-medium 
                         hover:bg-white/10 backdrop-blur-sm transition-all 
                         border border-white/10"
              >
                View Examples
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
