import React from 'react';

const Services = () => {
  const services = [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Creating modern, responsive websites and web applications using the latest technologies and best practices.'
    },
    {
      icon: '📱',
      title: 'Mobile App Development',
      description: 'Building cross-platform mobile applications with React Native and Flutter for iOS and Android.'
    },
    {
      icon: '🛠️',
      title: 'Backend Development',
      description: 'Developing robust APIs and server-side applications using Node.js, Python, and various databases.'
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Deploying and managing applications on cloud platforms like AWS, Azure, and Google Cloud.'
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Designing intuitive and engaging user interfaces that provide excellent user experiences.'
    },
    {
      icon: '🔧',
      title: 'Maintenance & Support',
      description: 'Providing ongoing maintenance, updates, and technical support for existing applications.'
    }
  ];

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">My Services</h2>
          <p className="section-subtitle">
            What I can do for you and your business
          </p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
