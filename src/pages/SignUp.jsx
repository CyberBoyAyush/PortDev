import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [checkingUsername, setCheckingUsername] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_]{3,20}$/;
    return regex.test(username);
  };

  const checkUsernameAvailability = async (username) => {
    if (!validateUsername(username)) {
      return false;
    }
    const userDoc = doc(db, 'usernames', username.toLowerCase());
    const docSnap = await getDoc(userDoc);
    return !docSnap.exists();
  };

  const handleUsernameChange = async (e) => {
    const newUsername = e.target.value.toLowerCase();
    setUsername(newUsername);
    
    if (newUsername.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      return;
    }

    if (!validateUsername(newUsername)) {
      setUsernameError('Username can only contain letters, numbers, and underscores');
      return;
    }

    setCheckingUsername(true);
    try {
      const isAvailable = await checkUsernameAvailability(newUsername);
      setUsernameError(isAvailable ? '' : 'Username is already taken');
    } catch (err) {
      setUsernameError('Error checking username');
    }
    setCheckingUsername(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (!username || usernameError) {
      return setError('Please choose a valid username');
    }

    try {
      setError('');
      setLoading(true);
      const userCredential = await signup(email, password);
      
      // Store user data in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        username,
        createdAt: new Date().toISOString(),
        displayName: '',
        photoURL: '',
        bio: ''
      });

      // Reserve username
      await setDoc(doc(db, 'usernames', username), {
        uid: userCredential.user.uid,
        createdAt: new Date().toISOString()
      });

      navigate('/');
    } catch (error) {
      setError('Failed to create an account. ' + error.message);
      console.error('Signup error:', error);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-blue-500/20" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>
      
      {/* Sign Up Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-xl border border-white/10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400 flex items-center justify-center gap-2">
              Join the PortDev community <HiSparkles className="text-yellow-500" />
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-4 mb-6">
              <motion.button
                whileHover={{ y: -2 }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 
                         bg-white/5 hover:bg-white/10 text-white rounded-lg 
                         border border-white/10 transition-all duration-200"
              >
                <FaGithub className="text-xl" />
                Continue with GitHub
              </motion.button>
              
              <motion.button
                whileHover={{ y: -2 }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 
                         bg-white/5 hover:bg-white/10 text-white rounded-lg 
                         border border-white/10 transition-all duration-200"
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
                <span className="px-2 bg-[#0A0A0F] text-gray-400">Or continue with email</span>
              </div>
            </div>

            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                           text-white placeholder-gray-500 focus:outline-none focus:border-purple-500
                           transition-colors duration-200"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                           text-white placeholder-gray-500 focus:outline-none focus:border-purple-500
                           transition-colors duration-200"
                />
              </div>
              <input
                type="text"
                placeholder="Choose a username"
                className={`w-full px-4 py-3 bg-white/5 border ${
                  usernameError ? 'border-red-500' : 'border-white/10'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500
                transition-colors duration-200`}
                value={username}
                onChange={handleUsernameChange}
              />
              {usernameError && (
                <p className="text-sm text-red-500 mt-1">{usernameError}</p>
              )}
              {checkingUsername && (
                <p className="text-sm text-yellow-500 mt-1">Checking username availability...</p>
              )}
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                         text-white placeholder-gray-500 focus:outline-none focus:border-purple-500
                         transition-colors duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                         text-white placeholder-gray-500 focus:outline-none focus:border-purple-500
                         transition-colors duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                         text-white placeholder-gray-500 focus:outline-none focus:border-purple-500
                         transition-colors duration-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              
              <motion.button
                whileHover={{ y: -2 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 
                         text-white rounded-lg font-medium hover:opacity-90
                         transition-opacity duration-200"
              >
                Create Account
              </motion.button>
            </form>
          </div>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-500 hover:text-purple-400">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
