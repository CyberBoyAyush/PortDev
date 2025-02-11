import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiSparkles, HiCube, HiCog, HiLightningBolt, HiTemplate } from 'react-icons/hi';

const Home = () => {
  const features = [
    { 
      icon: HiTemplate,
      title: "Modern Design",
      description: "Beautiful, responsive portfolios that stand out",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: HiLightningBolt,
      title: "Easy to Use",
      description: "Set up your portfolio in minutes, no coding required",
      gradient: "from-orange-500 to-pink-500"
    },
    {
      icon: HiCube,
      title: "Customizable",
      description: "Personalize every aspect to match your style",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: HiCog,
      title: "SEO Optimized",
      description: "Get discovered by recruiters and clients",
      gradient: "from-purple-500 to-indigo-500"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[1000px] h-[1000px] -top-[400px] -right-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-3xl animate-blob" />
        </div>
        <div className="absolute w-[1000px] h-[1000px] -bottom-[400px] -left-[400px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
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
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <span className="text-sm text-gray-300 flex items-center gap-2">
                Welcome to PortDev <HiSparkles className="text-yellow-500 animate-pulse" />
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
              Create Your
              <span className="block mt-2 relative">
                <span className="relative">
                  <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 blur-lg opacity-25"></span>
                  <span className="relative bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                    Developer Portfolio
                  </span>
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Showcase your skills and projects with a beautiful portfolio website in minutes.
            </p>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 pt-4"
            >
              <Link
                to="/signup"
                className="group relative inline-flex items-center px-8 py-4 rounded-xl 
                         overflow-hidden backdrop-blur-sm transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-70
                              group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center text-white font-medium">
                  Get Started Free
                  <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link
                to="/examples"
                className="group inline-flex items-center px-8 py-4 rounded-xl text-white 
                         font-medium border border-white/10 hover:bg-white/5 backdrop-blur-sm 
                         transition-all duration-300"
              >
                View Examples
                <HiArrowRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 
                                     group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Enhanced Features Grid */}
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
                className="group relative p-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10
                         hover:bg-white/10 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 
                              group-hover:opacity-5 transition-opacity rounded-2xl`} />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-white/5 to-white/10 
                               flex items-center justify-center mb-4">
                    <feature.icon className={`w-6 h-6 bg-gradient-to-r ${feature.gradient} 
                                         bg-clip-text text-transparent`} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent 
                             group-hover:bg-clip-text group-hover:bg-gradient-to-r 
                             group-hover:from-purple-400 group-hover:to-pink-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
