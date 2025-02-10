import React from 'react';
import { motion } from 'framer-motion';
import { HiExternalLink, HiAcademicCap, HiCalendar, HiOfficeBuilding } from 'react-icons/hi';
import CardContainer from './CardContainer';

const AchievementCard = ({ achievements = [] }) => {
  return (
    <CardContainer title="Achievements">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br 
                     from-white/40 to-white/10 dark:from-gray-800/40 dark:to-gray-800/10 
                     border border-white/20 dark:border-gray-700/20 
                     hover:border-blue-500/20 dark:hover:border-blue-500/20
                     transition-all duration-300"
          >
            {/* Achievement Icon */}
            <div className="absolute top-4 right-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 
                           p-0.5 transform group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full rounded-xl bg-white dark:bg-gray-900 
                             flex items-center justify-center">
                  <HiAcademicCap className="w-6 h-6 text-transparent bg-clip-text 
                                        bg-gradient-to-br from-blue-500 to-purple-500" />
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Title */}
              <h3 className="pr-12 text-xl font-semibold text-gray-900 dark:text-white 
                           group-hover:text-transparent group-hover:bg-clip-text
                           group-hover:bg-gradient-to-r group-hover:from-blue-500 
                           group-hover:to-purple-500 transition-colors duration-300">
                {achievement.title}
              </h3>

              {/* Issuer and Date */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <HiOfficeBuilding className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{achievement.issuer}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <HiCalendar className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{achievement.date}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                {achievement.description}
              </p>

              {/* Certificate Link */}
              {achievement.url && (
                <motion.a
                  href={achievement.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                           bg-gradient-to-r from-blue-500 to-purple-500 
                           hover:from-blue-600 hover:to-purple-600
                           text-white text-sm font-medium shadow-lg shadow-blue-500/25 
                           transition-all duration-300"
                >
                  <span>View Certificate</span>
                  <HiExternalLink className="w-4 h-4" />
                </motion.a>
              )}

              {/* Decorative Elements */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r 
                           from-transparent via-blue-500/20 to-transparent 
                           group-hover:via-blue-500/40 transition-colors duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </CardContainer>
  );
};

export default AchievementCard;
