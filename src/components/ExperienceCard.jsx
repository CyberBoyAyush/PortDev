import React from 'react';
import CardContainer from './CardContainer';

const ExperienceCard = ({ experiences }) => {
  return (
    <CardContainer title="Experience">
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div 
            key={index}
            className="group relative bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 
                       rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300"
          >
            {/* Timeline Connector */}
            <div className="absolute -left-3 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 
                          group-hover:scale-y-110 origin-top transition-transform duration-300"></div>

            {/* Content */}
            <div className="space-y-4">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white 
                             group-hover:text-transparent group-hover:bg-clip-text 
                             group-hover:bg-gradient-to-r group-hover:from-blue-600 
                             group-hover:to-purple-600 transition-all duration-300">
                  {exp.role}
                </h3>
                <span className="px-4 py-1 text-sm rounded-full 
                               bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                               border border-blue-500/20 text-blue-700 dark:text-blue-300">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </span>
              </div>

              {/* Company */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                    <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      {exp.company[0]}
                    </span>
                  </div>
                </div>
                <span className="text-lg text-gray-700 dark:text-gray-300">
                  {exp.company}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {exp.description}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full 
                             bg-gradient-to-r from-gray-50 to-gray-100 
                             dark:from-gray-800 dark:to-gray-700
                             border border-gray-200 dark:border-gray-600
                             hover:border-blue-500/50 dark:hover:border-blue-500/50
                             hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10
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
    </CardContainer>
  );
};

export default ExperienceCard;
