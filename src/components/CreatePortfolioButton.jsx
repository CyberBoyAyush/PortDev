import React from 'react';
import { Link } from 'react-router-dom';

const CreatePortfolioButton = () => {
  return (
    <Link
      to="/signup"
      className="inline-flex items-center px-4 py-2 rounded-xl
                 bg-gradient-to-r from-blue-500 to-purple-500 
                 text-white font-medium
                 hover:shadow-lg hover:shadow-blue-500/25 
                 transition-all duration-300"
    >
      Create Your Portfolio
      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  );
};

export default CreatePortfolioButton;
