import { motion } from 'framer-motion';
import { RiGithubFill, RiTwitterXFill, RiLinkedinBoxFill, RiHeart2Fill } from 'react-icons/ri';
import { HiSparkles } from 'react-icons/hi2';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { 
      icon: RiGithubFill, 
      label: "GitHub",
      href: "https://github.com/portdev",
      hoverColor: "hover:text-[#333]"
    },
    { 
      icon: RiTwitterXFill, 
      label: "Twitter",
      href: "https://twitter.com/portdev",
      hoverColor: "hover:text-[#1DA1F2]"
    },
    { 
      icon: RiLinkedinBoxFill, 
      label: "LinkedIn",
      href: "https://linkedin.com/company/portdev",
      hoverColor: "hover:text-[#0A66C2]"
    }
  ];

  return (
    <footer className="relative mt-auto">
      {/* Gradient Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Main Footer Content */}
      <div className="backdrop-blur-xl bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo and Tagline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="flex flex-col items-center md:items-start">
                <span className="text-2xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Port
                  </span>
                  <span className="text-white">Dev</span>
                </span>
                <span className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  Crafted with magic 
                  <HiSparkles className="text-yellow-500 animate-pulse" />
                </span>
              </div>
            </motion.div>

            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-end gap-6">
              {/* Social Links */}
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 text-gray-400 ${social.hoverColor} 
                             rounded-xl hover:bg-white/5 transform transition-all duration-200`}
                    aria-label={social.label}
                    whileHover={{ y: -2, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </motion.div>

              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-2 text-sm text-gray-500"
              >
                <RiHeart2Fill className="text-red-500 animate-pulse" />
                <span>
                  © {currentYear} PortDev. All rights reserved.
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
