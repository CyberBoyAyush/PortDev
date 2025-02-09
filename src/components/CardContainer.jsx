import React from 'react';

const CardContainer = ({ children, className }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 relative ${className}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl rounded-full -z-10"></div>
      {children}
    </div>
  );
};

export default CardContainer;
