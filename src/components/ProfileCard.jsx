import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

const getSocialIcon = (name) => {
  if (!name) return null;
  switch (name.toLowerCase()) {
    case 'github':
      return <FaGithub className="w-5 h-5" />;
    case 'linkedin':
      return <FaLinkedin className="w-5 h-5" />;
    case 'twitter':
      return <FaTwitter className="w-5 h-5" />;
    case 'website':
      return <FaGlobe className="w-5 h-5" />;
    case 'email':
      return <HiMail className="w-5 h-5" />;
    default:
      return null;
  }
};

const ProfileCard = ({ profile }) => {
  if (!profile) {
    return null;
  }

  const {
    name = 'User',
    title = '',
    bio = '',
    avatar = '',
    links = []
  } = profile;

  return (
    <div className="relative overflow-hidden backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 -translate-x-1/2 translate-y-1/2 rounded-full blur-3xl"></div>
      </div>

      {/* Content Container */}
      <div className="relative p-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          {/* Avatar Container */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
            <div className="relative">
              <img 
                src={avatar || `https://ui-avatars.com/api/?name=${name}`} 
                alt={name}
                className="w-40 h-40 rounded-full object-cover border-4 border-white dark:border-gray-800 transform group-hover:scale-105 transition duration-300" 
              />
            </div>
          </div>

          {/* Info Container */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            {/* Name and Title */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {name || 'Anonymous User'}
              </h1>
              {title && <p className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                {title}
              </p>}
            </div>

            {/* Bio */}
            {bio && <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-2xl">
              {bio}
            </p>}

            {/* Social Links */}
            {Array.isArray(links) && links.length > 0 && (
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                {links.map((link, index) => (
                  link && link.url && link.name && (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-4 py-2 rounded-xl
                               bg-gradient-to-r from-gray-50 to-gray-100 
                               dark:from-gray-700 dark:to-gray-800
                               hover:from-blue-500 hover:to-purple-500
                               border border-gray-200 dark:border-gray-600
                               text-gray-700 dark:text-gray-300 hover:text-white
                               transform hover:scale-105 hover:shadow-lg
                               transition-all duration-300"
                    >
                      {getSocialIcon(link.name)}
                      <span className="font-medium">{link.name}</span>
                    </a>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
    </div>
  );
};

export default ProfileCard;
