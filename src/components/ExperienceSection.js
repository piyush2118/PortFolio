import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ExperienceContainer = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 100px 0;
  background: #f5f5f0;
  position: relative;
  overflow: hidden;
`;

const ExperienceContent = styled.div`
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
  margin-bottom: 3rem;
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

const Timeline = styled(motion.div)`
  position: relative;
  padding-left: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #8b7355;
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;
  padding-left: 3rem;

  &::before {
    content: '';
    position: absolute;
    left: -1.5rem;
    top: 0;
    width: 12px;
    height: 12px;
    background: #8b7355;
    border-radius: 50%;
    border: 3px solid #f5f5f0;
    box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.3);
  }
`;

const ExperienceCard = styled(motion.div)`
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

const ExperienceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c2c2c;
  margin-bottom: 0.5rem;
`;

const CompanyName = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: #8b7355;
  margin-bottom: 0.5rem;
`;

const Duration = styled.span`
  color: #666666;
  font-size: 0.9rem;
  font-weight: 500;
  background: rgba(139, 115, 85, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  display: inline-block;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #666666;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const Responsibilities = styled.ul`
  list-style: none;
  padding: 0;
`;

const Responsibility = styled.li`
  color: #666666;
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.5;

  &::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: #8b7355;
    font-weight: bold;
  }
`;


const ExperienceSection = () => {
  const experiences = [
    {
      title: 'Applications Engineering Intern',
      company: 'Accenture, Bangalore',
      duration: '8 weeks',
      description: 'Oracle HCM Cloud',
      responsibilities: [
        'Streamlined onboarding checklists with 3 automations',
        'Automated task assignment using rule-based triggers',
        'Scheduled policy reports with parameterized templates',
        'Unified fragmented workflows and improved traceability'
      ]
    }
  ];

  return (
    <ExperienceContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <ExperienceContent>
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
            Experience
          </SectionTitle>

          <Timeline
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {experiences.map((exp, index) => (
              <TimelineItem
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
              >
                <ExperienceCard
                  whileHover={{ scale: 1.02 }}
                >
                  <ExperienceTitle>{exp.title}</ExperienceTitle>
                  <CompanyName>{exp.company}</CompanyName>
                  <Duration>{exp.duration}</Duration>
                  <Description>{exp.description}</Description>
                  <Responsibilities>
                    {exp.responsibilities.map((resp, respIndex) => (
                      <Responsibility key={respIndex}>
                        {resp}
                      </Responsibility>
                    ))}
                  </Responsibilities>
                </ExperienceCard>
              </TimelineItem>
            ))}
          </Timeline>
        </TextSection>

      </ExperienceContent>
    </ExperienceContainer>
  );
};

export default ExperienceSection;
