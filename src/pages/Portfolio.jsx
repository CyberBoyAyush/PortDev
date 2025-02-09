import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockUsers } from '../data/data';
import { HiMenu, HiX } from 'react-icons/hi';
import ProfileCard from '../components/ProfileCard';
import SkillsCard from '../components/SkillsCard';
import ExperienceCard from '../components/ExperienceCard';
import AchievementCard from '../components/AchievementCard';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username } = useParams();
  const userData = mockUsers[username];

  const sections = [
    { id: 'profile', label: 'Profile' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' }
  ];

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const viewHeight = window.innerHeight;
      const scrollPosition = window.scrollY + viewHeight / 2;
      const bottomPosition = window.scrollY + viewHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const isBottom = bottomPosition >= documentHeight - 100;

      if (isBottom) {
        setActiveSection('achievements');
        return;
      }

      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const sectionTop = offsetTop;
          const sectionBottom = offsetTop + offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-2xl p-8 max-w-md w-full text-center mx-4">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Portfolio Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            The portfolio you're looking for doesn't exist
          </p>
        </div>
      </div>
    );
  }

  const { profile, experiences, achievements, skills, projects } = userData;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Responsive Navigation */}
      <nav className="fixed top-[64px] left-0 right-0 z-40">
        {/* Mobile Menu Button */}
        <div className="lg:hidden absolute right-4 top-3 z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
          >
            {isMenuOpen ? (
              <HiX className="w-6 h-6 text-gray-800 dark:text-white" />
            ) : (
              <HiMenu className="w-6 h-6 text-gray-800 dark:text-white" />
            )}
          </button>
        </div>

        {/* Navigation Content */}
        <div className={`
          backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border-b border-white/20 dark:border-gray-700/20
          lg:block
          ${isMenuOpen ? 'block' : 'hidden'}
        `}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex lg:items-center lg:justify-center flex-col lg:flex-row py-4 lg:py-0">
              {sections.map(section => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => handleSectionClick(section.id)}
                  className={`
                    text-sm font-medium transition-all duration-300
                    px-4 py-2 my-1 lg:my-0 lg:mx-2 rounded-xl
                    block lg:inline-block text-center
                    ${activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400'
                    }
                  `}
                >
                  {section.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <main className="pt-32 relative z-10 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            <section id="profile" className="scroll-mt-32">
              <ProfileCard profile={profile} />
            </section>

            <section id="experience" className="scroll-mt-32">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="transform hover:scale-[1.02] transition-all duration-300">
                  <ExperienceCard experiences={experiences} />
                </div>
                <div id="skills" className="transform hover:scale-[1.02] transition-all duration-300">
                  <SkillsCard skills={skills} />
                </div>
              </div>
            </section>

            <section id="projects" className="scroll-mt-32">
              <ProjectCard projects={projects} />
            </section>

            <section 
              id="achievements" 
              className="scroll-mt-32 mb-24 min-h-[50vh]"
            >
              <AchievementCard achievements={achievements} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
