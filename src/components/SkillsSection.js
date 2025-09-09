import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const SkillsContainer = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 100px 0;
  background: #f5f5f0;
  position: relative;
  overflow: hidden;
`;

const SkillsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TextSection = styled(motion.div)`
  z-index: 2;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: #2c2c2c;
  position: relative;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: #8b7355;
    border-radius: 2px;
  }
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
`;

const SkillCategory = styled(motion.div)`
  background: rgba(139, 115, 85, 0.1);
  border: 1px solid rgba(139, 115, 85, 0.2);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(139, 115, 85, 0.2);
    border-color: rgba(139, 115, 85, 0.4);
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #8b7355;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SkillTag = styled(motion.div)`
  background: #8b7355;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 20px rgba(139, 115, 85, 0.3);
    background: #6b5b47;
  }
`;


const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: '💻',
      skills: ['Python', 'C++', 'JavaScript', 'TypeScript']
    },
    {
      title: 'Frameworks & Libraries',
      icon: '⚡',
      skills: ['FastAPI', 'LangChain', 'React', 'OpenAI', 'TensorFlow']
    },
    {
      title: 'Databases',
      icon: '🗄️',
      skills: ['Pinecone', 'SQL', 'MongoDB', 'PostgreSQL']
    },
    {
      title: 'Automation Tools',
      icon: '🤖',
      skills: ['n8n', 'ComfyUI', 'MCP', 'Docker', 'Kubernetes']
    },
    {
      title: 'Core Concepts',
      icon: '🧠',
      skills: ['OOP', 'RAG', 'AI Agents', 'GIS', 'Machine Learning']
    }
  ];

  return (
    <SkillsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <SkillsContent>
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
            Technical Skills
          </SectionTitle>

          <SkillsGrid
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {skillCategories.map((category, index) => (
              <SkillCategory
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <CategoryTitle>
                  <span>{category.icon}</span>
                  {category.title}
                </CategoryTitle>
                <SkillTags>
                  {category.skills.map((skill, skillIndex) => (
                    <SkillTag
                      key={skillIndex}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </SkillTag>
                  ))}
                </SkillTags>
              </SkillCategory>
            ))}
          </SkillsGrid>
        </TextSection>

      </SkillsContent>
    </SkillsContainer>
  );
};

export default SkillsSection;
