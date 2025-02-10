import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiCode, 
  HiDatabase, 
  HiChip, 
  HiColorSwatch,
  HiTerminal,
  HiTemplate,
  HiCloud,
  HiPuzzle,
  HiSparkles
} from 'react-icons/hi';

const SkillsCard = ({ skills = [] }) => {
  const getCategoryIcon = (category) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('front')) return HiTemplate;
    if (categoryLower.includes('back')) return HiDatabase;
    if (categoryLower.includes('mobile')) return HiChip;
    if (categoryLower.includes('design')) return HiColorSwatch;
    if (categoryLower.includes('devops')) return HiCloud;
    if (categoryLower.includes('tool')) return HiTerminal;
    if (categoryLower.includes('frame')) return HiPuzzle;
    if (categoryLower.includes('language')) return HiCode;
    return HiSparkles;
  };

  const getSkillInfo = (level) => {
    if (level >= 90) return {
      text: 'Expert',
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/50'
    };
    if (level >= 75) return {
      text: 'Advanced',
      color: 'from-blue-500 to-purple-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/50'
    };
    if (level >= 60) return {
      text: 'Intermediate',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/50'
    };
    return {
      text: 'Learning',
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/50'
    };
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

        <div className="space-y-12">
          {skills.map((category, idx) => {
            const CategoryIcon = getCategoryIcon(category.category);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-4"
              >
                {/* Category Header with Enhanced Icon */}
                <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="relative w-12 h-12"
                  >
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl 
                                  animate-pulse opacity-50" />
                    
                    {/* Icon Container */}
                    <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-0.5">
                      <div className="w-full h-full rounded-xl bg-white dark:bg-gray-900 
                                   flex items-center justify-center overflow-hidden">
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                                      opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        {/* Icon - Updated styling */}
                        <CategoryIcon className="w-6 h-6 text-blue-500 dark:text-blue-400
                                              transform transition-transform duration-300
                                              hover:scale-110" />
                      </div>
                    </div>
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {category.category}
                  </h3>
                </div>
                
                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((skill, index) => {
                    const skillInfo = getSkillInfo(skill.level);
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className={`group relative rounded-xl p-4 
                                 ${skillInfo.bgColor} border ${skillInfo.borderColor}
                                 transition-all duration-300`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {skill.name}
                          </span>
                          <span className={`px-2.5 py-1 text-xs font-medium rounded-full 
                                       bg-gradient-to-r ${skillInfo.color} text-white`}>
                            {skillInfo.text}
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="relative h-2.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`absolute inset-y-0 left-0 rounded-full 
                                     bg-gradient-to-r ${skillInfo.color}`}
                          />
                          <div className="absolute inset-0 w-full h-full opacity-50 
                                       bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_4px)]" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillsCard;
