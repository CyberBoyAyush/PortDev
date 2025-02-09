import React from 'react';

const ExperienceCard = ({ experiences }) => {
  return (
    <div className="relative backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/10 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 translate-x-1/2 translate-y-1/2 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative mb-10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Experience
        </h2>
      </div>

      {/* Experience Items */}
      <div className="relative space-y-8">
        {experiences.map((exp, index) => (
          <div 
            key={index}
            className="group relative bg-white/40 dark:bg-gray-800/40 rounded-xl p-6 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300"
          >
            {/* Company Logo or Icon Placeholder */}
            <div className="absolute -left-3 top-6 w-6 h-6">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[2px] animate-pulse">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900"></div>
              </div>
            </div>

            <div className="ml-6 space-y-4">
              {/* Role and Duration */}
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {exp.role}
                </h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 dark:text-blue-300">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </span>
              </div>

              {/* Company Name */}
              <div className="flex items-center">
                <span className="text-lg text-gray-700 dark:text-gray-300">
                  {exp.company}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {exp.description}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {exp.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full border border-blue-500/20 
                             bg-gradient-to-r from-blue-500/5 to-purple-500/5 
                             hover:from-blue-500/10 hover:to-purple-500/10
                             text-gray-700 dark:text-gray-300
                             transform hover:scale-105 transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceCard;
