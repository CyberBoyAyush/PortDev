import React from 'react';

const SkillsCard = ({ skills = [] }) => {
  const getSkillLevel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 60) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div className="relative backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 -translate-x-1/2 translate-y-1/2 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          Skills
        </h2>

        <div className="space-y-8">
          {skills.map((category, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {category.category}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((skill, index) => (
                  <div
                    key={index}
                    className="group relative bg-white/40 dark:bg-gray-800/40 rounded-xl p-4 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {getSkillLevel(skill.level)}
                      </span>
                    </div>
                    
                  <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-500/25"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full opacity-50 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.2)_2px,rgba(255,255,255,0.2)_4px)]"></div>
                    </div>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute inset-0 rounded-xl border-2 border-blue-500/0 group-hover:border-blue-500/50 transition-all duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsCard;
