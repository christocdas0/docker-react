import React from 'react';

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Get to know more about my background, skills, and experience
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p>
              Hi! I'm Christo C, a passionate <strong>Full Stack Developer</strong> with over 3.7 years of experience 
              in building modern web applications. I specialize in creating exceptional digital experiences 
              using cutting-edge technologies.
            </p>
            
            <div className="info-item">
              <div className="info-label">Name</div>
              <div className="info-value">Christo C</div>
            </div>

            <div className="info-item">
              <div className="info-label">Age</div>
              <div className="info-value">27 Years</div>
            </div>

            <div className="info-item">
              <div className="info-label">Position</div>
              <div className="info-value">Software Engineer (Full Stack)</div>
            </div>

            <div className="info-item">
              <div className="info-label">Education</div>
              <div className="info-value">Master of Computer Application (MCA)</div>
            </div>

            <div className="info-item">
              <div className="info-label">Languages</div>
              <div className="info-value">Malayalam, English, Tamil</div>
            </div>

            <div className="info-item">
              <div className="info-label">Tech Stack</div>
              <div className="info-value">
                React.js, TypeScript, Next.js, Node.js, Python, FastAPI, MongoDB, PostgreSQL, Azure
              </div>
            </div>

            <a href="https://drive.google.com/file/d/1vnxrPVlWjlSglOGZWkIbKPlNoBQvoVmQ/view?usp=drive_link"
               target="_blank" rel="noopener noreferrer">
              <button className="btn btn-primary">
                Download Resume <i className="fas fa-download"></i>
              </button>
            </a>
          </div>

          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-icon">⚡</div>
              <div className="skill-name">3.7+ Years</div>
              <div className="skill-level">Experience</div>
            </div>

            <div className="skill-card">
              <div className="skill-icon">🚀</div>
              <div className="skill-name">14+ Projects</div>
              <div className="skill-level">Completed</div>
            </div>

            <div className="skill-card">
              <div className="skill-icon">😊</div>
              <div className="skill-name">12+ Clients</div>
              <div className="skill-level">Satisfied</div>
            </div>

            <div className="skill-card">
              <div className="skill-icon">🏆</div>
              <div className="skill-name">4 Awards</div>
              <div className="skill-level">Won</div>
            </div>

            <div className="skill-card">
              <div className="skill-icon">📦</div>
              <div className="skill-name">5+ Packages</div>
              <div className="skill-level">Published</div>
            </div>

            <div className="skill-card">
              <div className="skill-icon">💻</div>
              <div className="skill-name">Frontend</div>
              <div className="skill-level">Specialist</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
