import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Components
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';

const AppContainer = styled.div`
  position: relative;
  background: #f5f5f0;
  overflow-x: hidden;
  scroll-behavior: smooth;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const SectionWrapper = styled(motion.section)`
  position: relative;
  z-index: 2;
`;

const ScrollProgress = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.progress}%;
  height: 3px;
  background: #8b7355;
  z-index: 1001;
  transition: width 0.1s ease;
`;

const FloatingNav = styled(motion.div)`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1000;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const FloatingNavDot = styled(motion.div)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? '#8b7355' : 'rgba(139, 115, 85, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.active ? 'transparent' : 'rgba(139, 115, 85, 0.5)'};
  
  &:hover {
    transform: scale(1.2);
    background: #8b7355;
  }
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Scroll spy functionality and progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      // Calculate scroll progress
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / documentHeight) * 100;
      setScrollProgress(progress);

      // Update active section
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

  return (
    <AppContainer>
      <ScrollProgress progress={scrollProgress} />
      <FloatingNav
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        {sections.map((section) => (
          <FloatingNavDot
            key={section}
            active={activeSection === section}
            onClick={() => handleSectionChange(section)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </FloatingNav>
      
      <ContentContainer>
        <Navigation onSectionChange={handleSectionChange} activeSection={activeSection} />
        
        <SectionWrapper id="home">
          <HeroSection />
        </SectionWrapper>
        
        <SectionWrapper id="about">
          <AboutSection />
        </SectionWrapper>
        
        <SectionWrapper id="skills">
          <SkillsSection />
        </SectionWrapper>
        
        <SectionWrapper id="projects">
          <ProjectsSection />
        </SectionWrapper>
        
        <SectionWrapper id="experience">
          <ExperienceSection />
        </SectionWrapper>
        
        <SectionWrapper id="contact">
          <ContactSection />
        </SectionWrapper>
      </ContentContainer>
    </AppContainer>
  );
}

export default App;
