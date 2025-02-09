import React from 'react';
import { useParams } from 'react-router-dom';
import { mockUsers } from '../data/data';
import ProfileCard from '../components/ProfileCard';
import SkillsCard from '../components/SkillsCard';
import ExperienceCard from '../components/ExperienceCard';
import AchievementCard from '../components/AchievementCard';
import ProjectCard from '../components/ProjectCard';

const Portfolio = () => {
  const { username } = useParams();
  const userData = mockUsers[username];

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center space-y-4 px-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            User not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The portfolio you're looking for doesn't exist
          </p>
        </div>
      </div>
    );
  }

  const { profile, experiences, achievements, skills, projects } = userData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Hero Section */}
        <section className="relative py-12 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProfileCard profile={profile} />
          </div>
        </section>

        {/* Main Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-12">
            {/* Experience and Skills Section */}
            <section className="scroll-mt-16" id="experience-skills">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto hide-scrollbar">
                  <ExperienceCard experiences={experiences} />
                </div>
                <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto hide-scrollbar">
                  <SkillsCard skills={skills} />
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section className="scroll-mt-16" id="projects">
              <ProjectCard projects={projects} />
            </section>

            {/* Achievements Section */}
            <section className="scroll-mt-16" id="achievements">
              <AchievementCard achievements={achievements} />
            </section>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
        }
        .hide-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
