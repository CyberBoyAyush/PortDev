import { motion } from 'framer-motion';
import { RiGithubFill, RiTwitterXFill, RiLinkedinBoxFill } from 'react-icons/ri';
import { HiSparkles } from 'react-icons/hi2';

const Footer = () => {
  const iconSize = 20;

  return (
    <footer className="border-t border-white/5 bg-gradient-to-b from-black/20 to-black/30 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-4 flex items-center justify-between">
          {/* Logo and Tagline */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight">
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Port
                </span>
                Dev
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                Made with magic <HiSparkles className="text-yellow-500" />
              </span>
            </div>
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center gap-1">
            {[
              { icon: RiGithubFill, label: "GitHub", href: "#" },
              { icon: RiTwitterXFill, label: "Twitter", href: "#" },
              { icon: RiLinkedinBoxFill, label: "LinkedIn", href: "#" }
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="p-2 text-gray-400 hover:text-white rounded-lg 
                         hover:bg-white/5 transition-all duration-200"
                aria-label={social.label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <social.icon size={iconSize} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-3 border-t border-white/5 flex justify-center">
          <motion.span 
            className="text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            © 2024 PortDev. All rights reserved.
          </motion.span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
