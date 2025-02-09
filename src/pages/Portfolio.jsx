import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockUsers } from '../data/data';
import ProfileCard from '../components/ProfileCard';
import SkillsCard from '../components/SkillsCard';
import ExperienceCard from '../components/ExperienceCard';
import AchievementCard from '../components/AchievementCard';
import ProjectCard from '../components/ProjectCard';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const { username } = useParams();
  const userData = mockUsers[username];

  const sections = [
    { id: 'profile', label: 'Profile' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="p-8 backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border-b border-white/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16 gap-8">
            {sections.map(section => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-40 w-80 h-80 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
          <section id="profile" className="scroll-mt-16">
            <ProfileCard profile={profile} />
          </section>

          <section id="experience" className="scroll-mt-16">
            <ExperienceCard experiences={experiences} />
          </section>

          <section id="skills" className="scroll-mt-16">
            <SkillsCard skills={skills} />
          </section>

          <section id="projects" className="scroll-mt-16">
            <ProjectCard projects={projects} />
          </section>

          <section id="achievements" className="scroll-mt-16">
            <AchievementCard achievements={achievements} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
