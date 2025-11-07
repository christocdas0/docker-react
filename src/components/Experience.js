import React from 'react';

const Experience = () => {
  const experiences = [
    {
      date: 'May 2024 - Present',
      title: 'Software Engineer (Frontend)',
      company: 'MathCo',
      location: 'Bangalore (On-site)',
      type: 'Full-time',
      description: [
        'Proficient in utilizing technologies such as React.js, Redux.js, Material-UI (MUI), and Vite to build modern and scalable web applications.',
        'Developed two React-based web components using Vite for reusable and efficient integration across multiple projects.',
        'Skilled in creating dynamic and responsive user interfaces with a focus on UX.',
        'Skills: HTML, CSS, JavaScript, MUI, React.js, Redux.js, Python, FastAPI, Git, etc.'
      ]
    },
    {
      date: 'May 2022 - May 2024',
      title: 'Software Engineer (Frontend)',
      company: 'PointCross Life Science',
      location: 'Bangalore (Hybrid)',
      type: 'Full-time',
      description: [
        'Worked with technologies including HTML & CSS, JavaScript, React.js, Redux.js, MUI, Styled Components, D3.js, and DC.js for data visualization.',
        'Proficient in implementing RESTful operations: GET, POST, PUT, DELETE.',
        'Developed a custom React.js library and several reusable UI components.',
        'Skills: HTML, CSS, JavaScript, React.js, Redux.js, MUI, D3.js, DC.js.'
      ]
    },
    {
      date: 'Oct 2018 - May 2022',
      title: 'CNC Programmer Cum Operator',
      company: 'Frasco Advance Technology',
      location: 'Kochi, Kerala (On-site)',
      type: 'Full-time',
      description: [
        'Served as a Computer Numerical Control (CNC) system programmer.',
        'Responsible for creating 3D models and generating machine code (G-codes and M-codes).',
        'Proficient in using SolidWorks, Mastercam, and Solid Cam for modeling and programming.'
      ]
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            My professional journey and career milestones
          </p>
        </div>
        
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-content">
                <span className="timeline-date">{exp.date}</span>
                <h3 className="timeline-title">{exp.title}</h3>
                <div className="timeline-company">
                  {exp.company} • {exp.location} • {exp.type}
                </div>
                <ul className="timeline-description">
                  {exp.description.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
              <div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
