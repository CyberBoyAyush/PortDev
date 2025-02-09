import React from 'react';
import { useParams } from 'react-router-dom';
import { mockUsers } from '../data/data';
import ProfileCard from '../components/ProfileCard';
import SkillsCard from '../components/SkillsCard';
import ExperienceCard from '../components/ExperienceCard';
import AchievementCard from '../components/AchievementCard';
import ProjectCard from '../components/ProjectCard';
import CardContainer from '../components/CardContainer';

const Portfolio = () => {
  const { username } = useParams();
  const userData = mockUsers[username];

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-gray-800 dark:text-white">User not found</h1>
      </div>
    );
  }

  const { profile, experiences, achievements, skills, projects } = userData;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <CardContainer>
        <div className="space-y-8">
          <ProfileCard profile={profile} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExperienceCard experiences={experiences} />
            <SkillsCard skills={skills} />
          </div>
          
          <ProjectCard projects={projects} />
          <AchievementCard achievements={achievements} />
        </div>
      </CardContainer>
    </div>
  );
};

export default Portfolio;
