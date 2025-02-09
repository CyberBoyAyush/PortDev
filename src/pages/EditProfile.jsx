import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';
import { HiPlus, HiTrash } from 'react-icons/hi';

const EditProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  // Initialize form data with all required sections
  const [formData, setFormData] = useState({
    profile: {
      name: '',
      title: '',
      bio: '',
      avatar: '',
      links: []
    },
    skills: [
      {
        category: 'Frontend',
        items: [{ name: '', level: 80 }]
      }
    ],
    experiences: [
      {
        role: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
        skills: []
      }
    ],
    projects: [
      {
        title: '',
        description: '',
        image: '',
        technologies: [],
        github: '',
        demo: ''
      }
    ],
    achievements: [
      {
        title: '',
        issuer: '',
        date: '',
        description: '',
        url: ''
      }
    ]
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser?.uid) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        
        // Get username from users collection
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          throw new Error('User profile not found');
        }
        
        setUsername(userSnap.data().username);

        // Get portfolio data
        const portfolioRef = doc(db, 'portfolios', currentUser.uid);
        const portfolioSnap = await getDoc(portfolioRef);
        
        if (portfolioSnap.exists()) {
          setFormData(portfolioSnap.data());
        }
        
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    try {
      setLoading(true);
      
      // Validate required fields
      if (!formData.profile.name || !formData.profile.title) {
        throw new Error('Name and title are required');
      }

      // Save to portfolios collection
      const portfolioRef = doc(db, 'portfolios', currentUser.uid);
      await setDoc(portfolioRef, {
        ...formData,
        updatedAt: new Date().toISOString()
      });

      // Update username document
      const usernameRef = doc(db, 'usernames', username);
      await setDoc(usernameRef, {
        uid: currentUser.uid,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      toast.success('Portfolio saved successfully!');
      navigate(`/${username}`);
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error.message || 'Failed to save portfolio');
    } finally {
      setLoading(false);
    }
  };

  // Add new items to arrays
  const addItem = (section, item) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], item]
    }));
  };

  // Remove items from arrays
  const removeItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  // Add technology to project
  const addTechnology = (projectIndex) => {
    const newProjects = [...formData.projects];
    newProjects[projectIndex].technologies.push('');
    setFormData({ ...formData, projects: newProjects });
  };

  // Add skill to experience
  const addSkill = (expIndex) => {
    const newExperiences = [...formData.experiences];
    newExperiences[expIndex].skills.push('');
    setFormData({ ...formData, experiences: newExperiences });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <h1 className="text-3xl font-bold mb-8 text-white">Edit Portfolio</h1>

        <div className="space-y-8">
          {/* Profile Section */}
          <section className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6">
            <h2 className="text-xl font-semibold mb-6 text-white">Profile</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Full Name</label>
                <input
                  type="text"
                  value={formData.profile.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    profile: { ...formData.profile, name: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white
                           placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Professional Title</label>
                <input
                  type="text"
                  value={formData.profile.title}
                  onChange={(e) => setFormData({
                    ...formData,
                    profile: { ...formData.profile, title: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white
                           placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g., Full Stack Developer"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Bio</label>
                <textarea
                  value={formData.profile.bio}
                  onChange={(e) => setFormData({
                    ...formData,
                    profile: { ...formData.profile, bio: e.target.value }
                  })}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white
                           placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Tell us about yourself"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Avatar URL</label>
                <input
                  type="url"
                  value={formData.profile.avatar}
                  onChange={(e) => setFormData({
                    ...formData,
                    profile: { ...formData.profile, avatar: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white
                           placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="https://example.com/your-image.jpg"
                />
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-300">Social Links</label>
                  <button
                    onClick={() => addItem('profile.links', { name: '', url: '' })}
                    className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors text-blue-400 hover:text-blue-300"
                  >
                    <HiPlus className="w-5 h-5" />
                  </button>
                </div>

                {formData.profile.links.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Platform"
                      value={link.name}
                      onChange={(e) => {
                        const newLinks = [...formData.profile.links];
                        newLinks[index] = { ...link, name: e.target.value };
                        setFormData({
                          ...formData,
                          profile: { ...formData.profile, links: newLinks }
                        });
                      }}
                      className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white
                               placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <input
                      type="url"
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...formData.profile.links];
                        newLinks[index] = { ...link, url: e.target.value };
                        setFormData({
                          ...formData,
                          profile: { ...formData.profile, links: newLinks }
                        });
                      }}
                      className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white
                               placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <button
                      onClick={() => removeItem('profile.links', index)}
                      className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors text-red-400 hover:text-red-300"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Experiences Section */}
          <section className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Experiences</h2>
              <button
                onClick={() => addItem('experiences', {
                  role: '',
                  company: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                  skills: []
                })}
                className="p-2 hover:bg-gray-800/50 rounded-lg text-blue-400"
              >
                <HiPlus className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              {formData.experiences.map((exp, index) => (
                <div key={index} className="space-y-4 p-4 bg-gray-800/30 rounded-lg">
                  <input
                    type="text"
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) => {
                      const newExp = [...formData.experiences];
                      newExp[index] = { ...exp, role: e.target.value };
                      setFormData({ ...formData, experiences: newExp });
                    }}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => {
                      const newExp = [...formData.experiences];
                      newExp[index] = { ...exp, company: e.target.value };
                      setFormData({ ...formData, experiences: newExp });
                    }}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Start Date"
                      value={exp.startDate}
                      onChange={(e) => {
                        const newExp = [...formData.experiences];
                        newExp[index] = { ...exp, startDate: e.target.value };
                        setFormData({ ...formData, experiences: newExp });
                      }}
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white"
                    />
                    <input
                      type="text"
                      placeholder="End Date"
                      value={exp.endDate}
                      onChange={(e) => {
                        const newExp = [...formData.experiences];
                        newExp[index] = { ...exp, endDate: e.target.value };
                        setFormData({ ...formData, experiences: newExp });
                      }}
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white"
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) => {
                      const newExp = [...formData.experiences];
                      newExp[index] = { ...exp, description: e.target.value };
                      setFormData({ ...formData, experiences: newExp });
                    }}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white"
                  />
                  <button
                    onClick={() => removeItem('experiences', index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove Experience
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Skills</h2>
              <button
                onClick={() => addItem('skills', {
                  category: '',
                  items: [{ name: '', level: 80 }]
                })}
                className="text-blue-400 hover:text-blue-300"
              >
                <HiPlus className="w-5 h-5" />
              </button>
            </div>

            {formData.skills.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-6 p-4 bg-gray-800/30 rounded-lg">
                <input
                  type="text"
                  placeholder="Category Name (e.g., Frontend, Backend)"
                  value={category.category}
                  onChange={(e) => {
                    const newSkills = [...formData.skills];
                    newSkills[categoryIndex].category = e.target.value;
                    setFormData({ ...formData, skills: newSkills });
                  }}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white mb-4"
                />

                {category.items.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Skill Name"
                      value={skill.name}
                      onChange={(e) => {
                        const newSkills = [...formData.skills];
                        newSkills[categoryIndex].items[skillIndex].name = e.target.value;
                        setFormData({ ...formData, skills: newSkills });
                      }}
                      className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white"
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Level"
                      value={skill.level}
                      onChange={(e) => {
                        const newSkills = [...formData.skills];
                        newSkills[categoryIndex].items[skillIndex].level = parseInt(e.target.value);
                        setFormData({ ...formData, skills: newSkills });
                      }}
                      className="w-24 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white"
                    />
                    <button
                      onClick={() => {
                        const newSkills = [...formData.skills];
                        newSkills[categoryIndex].items = newSkills[categoryIndex].items.filter((_, i) => i !== skillIndex);
                        setFormData({ ...formData, skills: newSkills });
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => {
                      const newSkills = [...formData.skills];
                      newSkills[categoryIndex].items.push({ name: '', level: 80 });
                      setFormData({ ...formData, skills: newSkills });
                    }}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <HiPlus className="w-4 h-4" />
                    Add Skill
                  </button>

                  <button
                    onClick={() => removeItem('skills', categoryIndex)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove Category
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Projects Section */}
          <section className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Projects</h2>
              <button
                onClick={() => addItem('projects', {
                  title: '',
                  description: '',
                  image: '',
                  technologies: [],
                  github: '',
                  demo: ''
                })}
                className="text-blue-400 hover:text-blue-300"
              >
                <HiPlus className="w-5 h-5" />
              </button>
            </div>

            {formData.projects.map((project, projectIndex) => (
              <div key={projectIndex} className="mb-6 p-4 bg-gray-800/30 rounded-lg">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) => {
                    const newProjects = [...formData.projects];
                    newProjects[projectIndex].title = e.target.value;
                    setFormData({ ...formData, projects: newProjects });
                  }}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white mb-4"
                />
                <textarea
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = [...formData.projects];
                    newProjects[projectIndex].description = e.target.value;
                    setFormData({ ...formData, projects: newProjects });
                  }}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white mb-4"
                />
                <input
                  type="url"
                  placeholder="Project Image URL"
                  value={project.image}
                  onChange={(e) => {
                    const newProjects = [...formData.projects];
                    newProjects[projectIndex].image = e.target.value;
                    setFormData({ ...formData, projects: newProjects });
                  }}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white mb-4"
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Technologies</label>
                  {project.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Technology"
                        value={tech}
                        onChange={(e) => {
                          const newProjects = [...formData.projects];
                          newProjects[projectIndex].technologies[techIndex] = e.target.value;
                          setFormData({ ...formData, projects: newProjects });
                        }}
                        className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white"
                      />
                      <button
                        onClick={() => {
                          const newProjects = [...formData.projects];
                          newProjects[projectIndex].technologies.splice(techIndex, 1);
                          setFormData({ ...formData, projects: newProjects });
                        }}
                        className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors text-red-400 hover:text-red-300"
                      >
                        <HiTrash className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addTechnology(projectIndex)}
                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <HiPlus className="w-4 h-4" />
                    Add Technology
                  </button>
                </div>
                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={project.github}
                  onChange={(e) => {
                    const newProjects = [...formData.projects];
                    newProjects[projectIndex].github = e.target.value;
                    setFormData({ ...formData, projects: newProjects });
                  }}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white mb-4"
                />
                <input
                  type="url"
                  placeholder="Demo URL"
                  value={project.demo}
                  onChange={(e) => {
                    const newProjects = [...formData.projects];
                    newProjects[projectIndex].demo = e.target.value;
                    setFormData({ ...formData, projects: newProjects });
                  }}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white mb-4"
                />
                <button
                  onClick={() => removeItem('projects', projectIndex)}
                  className="text-red-400 hover:text-red-300"
                >
                  Remove Project
                </button>
              </div>
            ))}
          </section>

          {/* Achievements Section */}
          <section className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Achievements</h2>
              <button
                onClick={() => addItem('achievements', {
                  title: '',
                  issuer: '',
                  date: '',
                  description: '',
                  url: ''
                })}
                className="text-blue-400 hover:text-blue-300"
              >
                <HiPlus className="w-5 h-5" />
              </button>
            </div>

            {formData.achievements.map((achievement, achievementIndex) => (
              <div key={achievementIndex} className="mb-6 p-4 bg-gray-800/30 rounded-lg">
                <input
                  type="text"
                  placeholder="Achievement Title"
                  value={achievement.title}
                  onChange={(e) => {
                    const newAchievements = [...formData.achievements];
                    newAchievements[achievementIndex].title = e.target.value;
                    setFormData({ ...formData, achievements: newAchievements });
                  }}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white mb-4"
                />
                <input
                  type="text"
                  placeholder="Issuer"
                  value={achievement.issuer}
                  onChange={(e) => {
                    const newAchievements = [...formData.achievements];
                    newAchievements[achievementIndex].issuer = e.target.value;
                    setFormData({ ...formData, achievements: newAchievements });
                  }}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white mb-4"
                />
                <input
                  type="date"
                  placeholder="Date"
                  value={achievement.date}
                  onChange={(e) => {
                    const newAchievements = [...formData.achievements];
                    newAchievements[achievementIndex].date = e.target.value;
                    setFormData({ ...formData, achievements: newAchievements });
                  }}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white mb-4"
                />
                <textarea
                  placeholder="Description"
                  value={achievement.description}
                  onChange={(e) => {
                    const newAchievements = [...formData.achievements];
                    newAchievements[achievementIndex].description = e.target.value;
                    setFormData({ ...formData, achievements: newAchievements });
                  }}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white mb-4"
                />
                <input
                  type="url"
                  placeholder="URL"
                  value={achievement.url}
                  onChange={(e) => {
                    const newAchievements = [...formData.achievements];
                    newAchievements[achievementIndex].url = e.target.value;
                    setFormData({ ...formData, achievements: newAchievements });
                  }}
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white mb-4"
                />
                <button
                  onClick={() => removeItem('achievements', achievementIndex)}
                  className="text-red-400 hover:text-red-300"
                >
                  Remove Achievement
                </button>
              </div>
            ))}
          </section>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => navigate(`/${username}`)}
              className="px-6 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800/50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium 
                       hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Portfolio'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;