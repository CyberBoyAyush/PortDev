import React from 'react';
import { Link } from 'react-router-dom';
import { mockUsers } from '../data/data';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi2';

const Examples = () => {
  const users = Object.entries(mockUsers);

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Portfolio Examples
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
          Explore beautiful portfolios created with PortDev. Get inspired and create your own portfolio today.
        </p>
      </div>

      {/* Portfolio Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map(([username, data]) => (
          <motion.div
            key={username}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={`/${username}`} className="block">
              <div className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border border-white/20 dark:border-gray-700/20 p-6 hover:shadow-xl transition-all duration-300">
                {/* Background Gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
                </div>

                {/* Content */}
                <div className="relative space-y-4">
                  {/* Profile Header */}
                  <div className="flex items-center gap-4">
                    <img
                      src={data.profile.avatar}
                      alt={data.profile.name}
                      className="w-16 h-16 rounded-full border-2 border-white dark:border-gray-700"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {data.profile.name}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400">
                        {data.profile.title}
                      </p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 py-4">
                    {[
                      { label: 'Projects', value: data.projects.length },
                      { label: 'Experience', value: `${data.experiences.length}+` },
                      { label: 'Skills', value: data.skills.reduce((acc, curr) => acc + curr.items.length, 0) }
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* View Button */}
                  <div className="flex items-center justify-end">
                    <span className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform duration-300">
                      View Portfolio
                      <HiArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <Link
          to="/signup"
          className="inline-flex items-center px-6 py-3 rounded-xl
                     bg-gradient-to-r from-blue-500 to-purple-500 
                     text-white font-medium
                     hover:shadow-lg hover:shadow-blue-500/25 
                     transform hover:scale-105
                     transition-all duration-300"
        >
          Create Your Portfolio
          <HiArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default Examples;
