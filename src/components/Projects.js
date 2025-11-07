import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: "E-commerce Website",
      techs: "React.js, MUI, Styled Components",
      icon: "🛒",
      description: "Modern e-commerce platform with cart functionality",
      link: "https://buzcrizwebsite.netlify.app/",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=500"
    },
    {
      title: "Restaurant Website",
      techs: "HTML, CSS",
      icon: "🍽️",
      description: "Elegant restaurant website with menu display",
      link: "https://christocdas0.github.io/Restaurant/",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500"
    },
    {
      title: "Nuuk Website",
      techs: "HTML, CSS, JavaScript",
      icon: "🌐",
      description: "Creative landing page with animations",
      link: "https://christocdas0.github.io/Nuuk/",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500"
    },
    {
      title: "Nike Shop",
      techs: "HTML, CSS, JavaScript",
      icon: "👟",
      description: "E-commerce shop for Nike products",
      link: "https://christocdas0.github.io/Nike-Shop/",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
      title: "EdYoda Stories",
      techs: "HTML, CSS, JavaScript",
      icon: "📚",
      description: "Blog platform for educational stories",
      link: "https://christocdas0.github.io/EdYoda-Stories/",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500"
    },
    {
      title: "Admin Panel",
      techs: "React.js",
      icon: "📊",
      description: "Dashboard for managing application data",
      link: "https://christocdas0.github.io/Admin-Panel/",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500"
    },
    {
      title: "Video Player",
      techs: "JavaScript",
      icon: "▶️",
      description: "Custom video player with controls",
      link: "https://christocdas0.github.io/Video-Player/",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500"
    },
    {
      title: "Movie Search Engine",
      techs: "JavaScript",
      icon: "🎬",
      description: "Search and browse movies with API integration",
      link: "https://christocdas0.github.io/Movie-Search-Engine/",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500"
    }
  ];

  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">
            Showcasing my best work and creative solutions
          </p>
        </div>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-body">
                <div className="project-icon">{project.icon}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-tech">{project.techs}</p>
                <p className="project-description">{project.description}</p>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Project <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
