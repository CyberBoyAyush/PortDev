// Verify data structure
console.log("Initializing mock data") // Debug log

export const mockUsers = {
  "ayush": {
    profile: {
      name: "Ayush Sharma",
      title: "Full Stack Developer",
      bio: "Passionate developer with 5+ years of experience building web applications",
      avatar: "https://avatars.githubusercontent.com/u/69210117?v=4",
      links: [
        { name: "GitHub", url: "https://github.com/cyberboyayush" },
        { name: "LinkedIn", url: "https://linkedin.com/in/cyberboyayush" }
      ]
    },
    experiences: [
      {
        role: "Senior Developer",
        company: "Tech Corp",
        startDate: "2024",
        endDate: null,
        description: "Leading frontend development team and architecting solutions.",
        skills: ["React", "Node.js", "AWS"]
      },
      {
        role: "SDE 1",
        company: "Global Tech",
        startDate: "2020",
        endDate: 2022,
        description: "Ai Enginner.",
        skills: ["Python", "Tensorflow", "AWS"]
      }
    ],
    achievements: [
      {
        title: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2023",
        description: "Associate level certification for AWS development",
        url: "https://aws.amazon.com"
      }
    ],
    projects: [
      {
        title: "React portfolio",
        description: "A modern react portfolio for developers",
        image: "https://raw.githubusercontent.com/CyberBoyAyush/react-portfolio/refs/heads/main/src/assets/project1.png",
        technologies: ["React", "Tailwind", "Framer Motion"],
        github: "https://github.com/CyberBoyAyush/react-portfolio",
        demo: "https://cyberboyayush.in/"
      },
      {
        title: "Simple Portfolio",
        description: "SImple Deploy Portfolio for developers",
        image: "https://raw.githubusercontent.com/CyberBoyAyush/react-portfolio/refs/heads/main/src/assets/project3.png",
        technologies: ["React", "Tailwind", "Framer Motion"],
        github: "https://github.com/CyberBoyAyush/simple-portfolio",
        demo: "https://cyberboyayush.in/"
      }
    ],
    skills: [
      {
        category: "Frontend",
        items: [
          { name: "React", level: 90 },
          { name: "TypeScript", level: 85 },
          { name: "Tailwind CSS", level: 95 }
        ]
      },
      {
        category: "Backend",
        items: [
          { name: "Node.js", level: 88 },
          { name: "Python", level: 80 },
          { name: "PostgreSQL", level: 85 }
        ]
      }
    ]
  },
  "vranda": {
    profile: {
      name: "Vranda Garg",
      title: "Web Developer",
      bio: "Web developer with 1+ years of experience building web applications",
      avatar: "https://avatars.githubusercontent.com/u/166229165?v=4",
      links: [
        { name: "GitHub", url: "https://github.com/vrandaagarg" },
        { name: "LinkedIn", url: "https://linkedin.com/in/vrandaagarg" }
      ]
    },
    experiences: [
      {
        role: "Junior Developer",
        company: "Ai Mushup",
        startDate: "2024",
        endDate: null,
        description: "Leading frontend development team and architecting solutions.",
        skills: ["React", "Node.js", "AWS"]
      },
      {
        role: "Intern",
        company: "Cuda Inc",
        startDate: "2021",
        endDate: 2022,
        description: "Frontend Enginner.",
        skills: ["Python", "Tensorflow", "AWS"]
      }
    ],
    achievements: [
      {
        title: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2023",
        description: "Associate level certification for AWS development",
        url: "https://aws.amazon.com"
      }
    ],
    projects: [
      {
        title: "Twiggy",
        description: "A modern react portfolio for developers",
        image: "https://raw.githubusercontent.com/CyberBoyAyush/react-portfolio/refs/heads/main/src/assets/project1.png",
        technologies: ["React", "Tailwind", "Framer Motion"],
        github: "https://github.com/CyberBoyAyush/react-portfolio",
        demo: "https://cyberboyayush.in/"
      },
      {
        title: "Simple Portfolio",
        description: "SImple Deploy Portfolio for developers",
        image: "https://raw.githubusercontent.com/CyberBoyAyush/react-portfolio/refs/heads/main/src/assets/project3.png",
        technologies: ["React", "Tailwind", "Framer Motion"],
        github: "https://github.com/CyberBoyAyush/simple-portfolio",
        demo: "https://cyberboyayush.in/"
      }
    ],
    skills: [
      {
        category: "Frontend",
        items: [
          { name: "React", level: 80 },
          { name: "Javascipt", level: 100 },
          { name: "Tailwind CSS", level: 95 }
        ]
      },
      {
        category: "Backend",
        items: [
          { name: "Node.js", level: 88 },
          { name: "Python", level: 80 },
          { name: "MongoDB", level: 95 }
        ]
      }
    ]
  }
  // Add more users as needed
}

// Verify data export
console.log("Available users:", Object.keys(mockUsers)) // Debug log
