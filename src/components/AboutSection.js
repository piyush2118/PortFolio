import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AboutContainer = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 100px 0;
  background: #f5f5f0;
  position: relative;
`;

const AboutContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextSection = styled(motion.div)`
  z-index: 2;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #2c2c2c;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: #8b7355;
    border-radius: 2px;
  }
`;

const AboutText = styled(motion.div)`
  margin-bottom: 3rem;
`;

const Paragraph = styled(motion.p)`
  font-size: 1.1rem;
  color: #666666;
  margin-bottom: 1.5rem;
  line-height: 1.8;
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatCard = styled(motion.div)`
  background: rgba(139, 115, 85, 0.1);
  border: 1px solid rgba(139, 115, 85, 0.2);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(139, 115, 85, 0.2);
    border-color: rgba(139, 115, 85, 0.4);
  }
`;

const StatNumber = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  color: #8b7355;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.p`
  color: #666666;
  font-weight: 500;
  font-size: 1rem;
`;


const AboutSection = () => {
  return (
    <AboutContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <AboutContent>
        <TextSection
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionTitle
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            About Me
          </SectionTitle>

          <AboutText>
            <Paragraph
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              I'm a Computer Science student at Birla Institute of Technology, Mesra, specializing in 
              AI agents, RAG systems, and automation workflows. My expertise spans from building intelligent 
              conversational agents with LangChain to creating end-to-end automation solutions.
            </Paragraph>
            
            <Paragraph
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              I specialize in Python, FastAPI, LangChain, and have hands-on experience with vector databases 
              like Pinecone. I'm passionate about building AI agents that can research, recall, and synthesize 
              information, along with creating automation workflows using n8n and fine-tuning models with ComfyUI.
            </Paragraph>
          </AboutText>

          <StatsContainer
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <StatCard
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <StatNumber>8.6/10</StatNumber>
              <StatLabel>CGPA</StatLabel>
            </StatCard>
            
            <StatCard
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <StatNumber>5</StatNumber>
              <StatLabel>Projects</StatLabel>
            </StatCard>
            
            <StatCard
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <StatNumber>1</StatNumber>
              <StatLabel>Internship</StatLabel>
            </StatCard>
          </StatsContainer>
        </TextSection>

      </AboutContent>
    </AboutContainer>
  );
};

export default AboutSection;
