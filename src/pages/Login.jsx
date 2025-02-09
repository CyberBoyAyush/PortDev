import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';
import { HiUser, HiLockClosed } from 'react-icons/hi';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // First, get the email associated with the username
      const usernameDoc = await getDoc(doc(db, 'usernames', username.toLowerCase()));
      
      if (!usernameDoc.exists()) {
        throw new Error('Username not found');
      }

      // Get the user document to find the email
      const userDoc = await getDoc(doc(db, 'users', usernameDoc.data().uid));
      
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }

      const email = userDoc.data().email;
      
      // Login with email and password
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-[50rem] h-[50rem] bg-blue-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-blob"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-[50rem] h-[50rem] bg-purple-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[1px]"></div>
      </div>

      {/* Login Container */}
      <div className="max-w-md w-full mx-auto space-y-8 relative z-10">
        {/* Logo and Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-2">
            Welcome back
          </h2>
          <p className="text-gray-400 text-sm">
            Enter your credentials to access your portfolio
          </p>
        </div>

        {/* Login Form Card */}
        <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl shadow-black/40">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username Input */}
            <div>
              <label className="text-sm font-medium text-gray-200 mb-1 block">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl
                           bg-gray-800/50 text-white placeholder-gray-400
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200"
                  placeholder="Your username"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="text-sm font-medium text-gray-200 mb-1 block">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiLockClosed className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl
                           bg-gray-800/50 text-white placeholder-gray-400
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200"
                  placeholder="Your password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-white font-medium
                     bg-gradient-to-r from-blue-600 to-purple-600
                     hover:from-blue-500 hover:to-purple-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     transform transition-all duration-200
                     hover:scale-[1.02] active:scale-[0.98]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-lg shadow-blue-500/25"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Built with{' '}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            ♥️
          </span>
          {' '}by PortDev
        </p>
      </div>
    </div>
  );
};

export default Login;
