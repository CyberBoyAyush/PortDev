import React from 'react';

const AchievementCard = ({ achievements = [] }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Achievements</h2>
      <div className="grid gap-6">
        {achievements.map((achievement, index) => (
          <div 
            key={index} 
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-2xl rounded-full transform group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {achievement.title}
              </h3>
              <p className="text-blue-500 dark:text-blue-400 font-medium">{achievement.issuer}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{achievement.date}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{achievement.description}</p>
              {achievement.url && (
                <a
                  href={achievement.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                >
                  View Certificate
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementCard;
