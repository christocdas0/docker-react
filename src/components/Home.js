import React from 'react';

const Home = () => {
  return (
    <section className="home" id="home">
      <div className="home-content">
        <div className="home-text">
          <div className="home-greeting">
            Hey there! I'm
          </div>
          <h1>Christo C</h1>
          <h2>Full Stack Developer</h2>
          <p className="home-description">
            I craft exceptional digital experiences with modern web technologies. 
            Specialized in building responsive applications, reusable components, 
            and solving complex UI challenges with React.js, TypeScript, Node.js, 
            and Python.
          </p>
          
          <div className="home-buttons">
            <button className="btn btn-primary" onClick={() => {
              const element = document.getElementById('projects');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}>
              View My Work <i className="fas fa-arrow-right"></i>
            </button>
            
            <button className="btn btn-outline" onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}>
              Get In Touch <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>

        <div className="home-visual">
          <div className="hero-image">
            <div className="avatar-main">CC</div>
          </div>
        </div>
      </div>

      <div className="home-stats">
        <div className="stat-card">
          <span className="stat-number">3.7+</span>
          <span className="stat-label">Years Experience</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">14+</span>
          <span className="stat-label">Projects Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">5+</span>
          <span className="stat-label">NPM Packages</span>
        </div>
      </div>
    </section>
  );
};

export default Home;
