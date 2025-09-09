import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: ${props => props.scrolled ? 'rgba(245, 245, 240, 0.95)' : 'rgba(245, 245, 240, 0.9)'};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(139, 115, 85, 0.2);
  z-index: 1000;
  padding: 1rem 0;
  transition: all 0.3s ease;
  box-shadow: ${props => props.scrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 700;
  color: #8b7355;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    color: #6b5b47;
  }
`;

const NavLinks = styled(motion.div)`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 2rem;
    transform: ${props => props.isOpen ? 'translateY(-100%)' : 'translateY(0)'};
    transition: transform 0.3s ease;
    border-top: 1px solid rgba(102, 126, 234, 0.2);
  }
`;

const NavLink = styled(motion.a)`
  color: ${props => props.active ? '#8b7355' : '#2c2c2c'};
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  background: ${props => props.active ? 'rgba(139, 115, 85, 0.1)' : 'transparent'};

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.active ? '80%' : '0'};
    height: 2px;
    background: #8b7355;
    transition: width 0.3s ease;
    border-radius: 1px;
  }

  &:hover {
    color: #8b7355;
    background: rgba(139, 115, 85, 0.1);
    transform: translateY(-2px);
  }

  &:hover::after {
    width: 80%;
  }
`;

const Hamburger = styled(motion.div)`
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const HamburgerLine = styled(motion.span)`
  width: 25px;
  height: 3px;
  background: #2c2c2c;
  border-radius: 2px;
  transition: all 0.3s ease;
`;

const Navigation = ({ onSectionChange, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (section) => {
    onSectionChange(section);
    setIsOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <NavContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      scrolled={scrolled}
    >
      <NavContent>
        <Logo
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleLinkClick('home')}
        >
          Piyush Modi
        </Logo>

        <NavLinks isOpen={isOpen}>
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              active={activeSection === item.id}
              onClick={() => handleLinkClick(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>

        <Hamburger
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <HamburgerLine
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 7 : 0
            }}
          />
          <HamburgerLine
            animate={{
              opacity: isOpen ? 0 : 1
            }}
          />
          <HamburgerLine
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -7 : 0
            }}
          />
        </Hamburger>
      </NavContent>
    </NavContainer>
  );
};

export default Navigation;
