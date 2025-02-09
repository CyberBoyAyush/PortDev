import React from 'react';

const CardContainer = ({ children, className, title }) => {
  return (
    <div className={`group relative overflow-hidden backdrop-blur-2xl 
                     bg-gradient-to-br from-white/40 to-white/10 dark:from-gray-800/40 dark:to-gray-900/10
                     rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20
                     hover:shadow-3xl transition-all duration-500 ${className}`}>
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 translate-x-1/2 translate-y-1/2 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative p-8">
        {title && (
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default CardContainer;
