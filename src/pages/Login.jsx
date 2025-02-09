import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const Login = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>
      
      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-xl border border-white/10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to continue to PortDev</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-4 mb-6">
              <motion.button
                whileHover={{ y: -2 }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 
                         bg-white/5 hover:bg-white/10 text-white rounded-lg 
                         border border-white/10"
              >
                <FaGithub className="text-xl" />
                Continue with GitHub
              </motion.button>
              
              <motion.button
                whileHover={{ y: -2 }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 
                         bg-white/5 hover:bg-white/10 text-white rounded-lg 
                         border border-white/10"
              >
                <FaGoogle className="text-xl" />
                Continue with Google
              </motion.button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#0A0A0F] text-gray-400">Or continue with</span>
              </div>
            </div>

            <form className="space-y-4 mt-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                         text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                         text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
              
              <motion.button
                whileHover={{ y: -2 }}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 
                         text-white rounded-lg font-medium"
              >
                Sign In
              </motion.button>
            </form>
          </div>

          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-500 hover:text-purple-400">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
