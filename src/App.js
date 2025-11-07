import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import './stunning-portfolio.css';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Always use dark theme
    setTheme('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  const toggleTheme = () => {
    // Theme toggle disabled - always dark
  };

  return (
    <div className="App">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Home />
      <About />
      <Experience />
      <Projects />
      <Services />
      <Contact />
      <footer className="footer">
        <p>&copy; 2024 CC Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
