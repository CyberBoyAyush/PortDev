import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiSparkles } from 'react-icons/hi2';

const Home = () => {
  const features = [
    { title: "Modern Design", description: "Build beautiful, responsive portfolios that stand out" },
    { title: "Easy to Use", description: "Set up your portfolio in minutes, no coding required" },
    { title: "Customizable", description: "Personalize every aspect to match your style" },
    { title: "SEO Optimized", description: "Get discovered by recruiters and clients" }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[1000px] h-[1000px] -top-[400px] -right-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl animate-blob" />
        </div>
        <div className="absolute w-[1000px] h-[1000px] -bottom-[400px] -left-[400px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl animate-blob animation-delay-2000" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-20 lg:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8 max-w-4xl mx-auto"
          >
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Create Your
              <span className="block mt-2 relative">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                  Developer Portfolio
                </span>
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -right-8 -top-2"
                >
                  <HiSparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                </motion.span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Showcase your skills and projects with a beautiful portfolio website in minutes.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 pt-4"
            >
              <Link
                to="/signup"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 
                         rounded-xl text-white font-medium overflow-hidden transition-all duration-300
                         hover:shadow-lg hover:shadow-purple-500/25"
              >
                <span className="relative z-10 flex items-center">
                  Get Started Free
                  <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 
                              group-hover:opacity-100 transition-opacity" />
              </Link>
              
              <Link
                to="/examples"
                className="inline-flex items-center px-8 py-4 bg-white/5 rounded-xl text-white 
                         font-medium hover:bg-white/10 backdrop-blur-sm transition-all duration-300
                         border border-white/10"
              >
                View Examples
              </Link>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="group p-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10
                         hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
