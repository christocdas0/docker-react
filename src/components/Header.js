import React, { useState, useEffect } from 'react';

const Header = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={isScrolled ? 'scrolled' : ''}>
        <div className="header-container">
          <a href="#home" className="logo" onClick={() => handleNavClick('home')}>
            <div className="logo-icon">CC</div>
            <span>Christo C</span>
          </a>

          <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><a href="#home" onClick={() => handleNavClick('home')}>Home</a></li>
              <li><a href="#about" onClick={() => handleNavClick('about')}>About</a></li>
              <li><a href="#experience" onClick={() => handleNavClick('experience')}>Experience</a></li>
              <li><a href="#projects" onClick={() => handleNavClick('projects')}>Projects</a></li>
              <li><a href="#services" onClick={() => handleNavClick('services')}>Services</a></li>
              <li><a href="#contact" onClick={() => handleNavClick('contact')}>Contact</a></li>
            </ul>
          </nav>

          <div className="nav-actions">
            {/* Theme toggle removed - dark theme only */}
            <button id="menu" onClick={toggleMenu} aria-label="Toggle menu">
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </header>

      {showScrollTop && (
        <div className="top" onClick={scrollToTop}>
          <i className="fas fa-arrow-up"></i>
        </div>
      )}
    </>
  );
};

export default Header;
