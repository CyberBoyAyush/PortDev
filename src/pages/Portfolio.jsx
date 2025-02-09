import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';  // Make sure this path is correct
import { HiMenu, HiX } from 'react-icons/hi';
import ProfileCard from '../components/ProfileCard';
import SkillsCard from '../components/SkillsCard';
import ExperienceCard from '../components/ExperienceCard';
import AchievementCard from '../components/AchievementCard';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';

const Portfolio = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  // Initialize userData with default empty values
  const [userData, setUserData] = useState({
    profile: {
      name: '',
      title: '',
      bio: '',
      avatar: '',
      links: []
    },
    experiences: [],
    skills: [],
    projects: [],
    achievements: []
  });

  // Destructure userData with default values
  const {
    profile,
    experiences,
    skills,
    projects,
    achievements
  } = userData || {};

  // Initialize sections state
  const [sections, setSections] = useState([
    { id: 'profile', label: 'Profile' }
  ]);

  // Update sections based on available data
  useEffect(() => {
    const availableSections = [
      { id: 'profile', label: 'Profile' }
    ];

    if (userData.experiences?.length > 0) {
      availableSections.push({ id: 'experience', label: 'Experience' });
    }
    if (userData.skills?.length > 0) {
      availableSections.push({ id: 'skills', label: 'Skills' });
    }
    if (userData.projects?.length > 0) {
      availableSections.push({ id: 'projects', label: 'Projects' });
    }
    if (userData.achievements?.length > 0) {
      availableSections.push({ id: 'achievements', label: 'Achievements' });
    }

    setSections(availableSections);
  }, [userData]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Get UID from username
        const usernameDoc = await getDoc(doc(db, 'usernames', username.toLowerCase()));
        
        if (!usernameDoc.exists()) {
          throw new Error('Portfolio not found');
        }

        // Get portfolio data using UID
        const uid = usernameDoc.data().uid;
        const portfolioDoc = await getDoc(doc(db, 'portfolios', uid));
        
        if (portfolioDoc.exists()) {
          const data = portfolioDoc.data();
          setUserData({
            profile: {
              name: data.profile?.name || '',
              title: data.profile?.title || '',
              bio: data.profile?.bio || '',
              avatar: data.profile?.avatar || '',
              links: Array.isArray(data.profile?.links) ? data.profile.links : []
            },
            experiences: Array.isArray(data.experiences) ? data.experiences : [],
            skills: Array.isArray(data.skills) ? data.skills : [],
            projects: Array.isArray(data.projects) ? data.projects : [],
            achievements: Array.isArray(data.achievements) ? data.achievements : []
          });
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  const renderNavLinks = () => {
    return sections.map(section => (
      <a
        key={section.id}
        href={`#${section.id}`}
        onClick={() => {
          setActiveSection(section.id);
          setIsMenuOpen(false);
        }}
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
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-8 max-w-md w-full text-center mx-4">
          <h1 className="text-4xl font-bold text-white mb-4">
            Portfolio Not Found
          </h1>
          <p className="text-gray-400">
            {error || "The portfolio you're looking for doesn't exist"}
          </p>
        </div>
      </div>
    );
  }

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
              {renderNavLinks()}
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
              <ProfileCard profile={profile || {}} />
            </section>

            {experiences?.length > 0 && (
              <section id="experience" className="scroll-mt-32">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="transform hover:scale-[1.02] transition-all duration-300">
                    <ExperienceCard experiences={experiences} />
                  </div>
                  {skills?.length > 0 && (
                    <div id="skills" className="transform hover:scale-[1.02] transition-all duration-300">
                      <SkillsCard skills={skills} />
                    </div>
                  )}
                </div>
              </section>
            )}

            {projects?.length > 0 && (
              <section id="projects" className="scroll-mt-32">
                <ProjectCard projects={projects} />
              </section>
            )}

            {achievements?.length > 0 && (
              <section id="achievements" className="scroll-mt-32 mb-24 min-h-[50vh]">
                <AchievementCard achievements={achievements} />
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
