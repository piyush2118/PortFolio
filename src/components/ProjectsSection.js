import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const ProjectsContainer = styled(motion.section)`
  min-height: 100vh;
  padding: 100px 0;
  background: #f5f5f0;
  position: relative;
  overflow: hidden;
`;

const ProjectsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 4rem;
  color: #2c2c2c;
  position: relative;

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

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(139, 115, 85, 0.1);
  border: 1px solid rgba(139, 115, 85, 0.2);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(139, 115, 85, 0.3);
    border-color: rgba(139, 115, 85, 0.4);
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c2c2c;
  margin-bottom: 0.5rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ProjectLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(139, 115, 85, 0.2);
  border: 1px solid rgba(139, 115, 85, 0.3);
  border-radius: 10px;
  color: #8b7355;
  text-decoration: none;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background: #8b7355;
    color: white;
    transform: scale(1.1);
  }
`;

const ProjectDescription = styled.p`
  color: #666666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 1rem;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechTag = styled(motion.span)`
  background: #8b7355;
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ProjectMetrics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Metric = styled(motion.span)`
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  padding: 0.4rem 1rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid rgba(16, 185, 129, 0.3);
`;

const ProjectModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: #f5f5f0;
  border: 1px solid rgba(139, 115, 85, 0.3);
  border-radius: 20px;
  padding: 3rem;
  max-width: 800px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #2c2c2c;
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(139, 115, 85, 0.2);
    transform: scale(1.1);
  }
`;


const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  // const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Augustus AI Agent',
      description: 'Built for YouTube viewers: paste any public YouTube link and chat with the video; the agent fetches the transcript, embeds it in Pinecone, and answers follow-ups in natural language; a Next.js (TS) frontend streams grounded replies with citations.',
      tech: ['Python', 'FastAPI', 'LangChain', 'Pinecone', 'OAuth2', 'Postgres', 'Alembic', 'Next.js (TS)'],
      metrics: ['Dynamic tool selection', 'Session-aware memory'],
      color: '#667eea',
      github: '#',
      demo: 'https://chataugustus.com'
    },
    {
      id: 2,
      title: 'Auto-Tweet-Agent',
      description: '3-stage pipeline: parsed long articles, extracted fact-rich bullets, and synthesized hook-first Twitter threads with CTAs; shipped a one-click post flow to X with optional scheduling and draft previews.',
      tech: ['Python', 'HuggingFace Mistral', 'X API'],
      metrics: ['10x faster', 'One-click to X'],
      color: '#764ba2',
      github: '#',
      demo: 'https://ai-tweet-agent.onrender.com/'
    },
    {
      id: 3,
      title: 'Herald AI',
      description: 'Natural language scheduling: accepts plain English input for setting and following up meeting schedules. Adaptive negotiation: if invitee declines, proposes alternative times and verifies availability in Google Calendar.',
      tech: ['n8n', 'AI Agent', 'Google Calendar', 'Gmail'],
      metrics: ['Natural language scheduling', 'Auto-negotiation'],
      color: '#fbbf24',
      github: '#',
      demo: '#'
    },
    {
      id: 4,
      title: 'X-Reply Machine',
      description: 'End-to-end loop: automated context gathering by crawling target X pages with Apify/RSS, generated lead-with-numbers replies that preserve thread context and brand voice, and surfaced drafts for review when confidence dipped.',
      tech: ['n8n', 'Apify/RSS', 'Gmail'],
      metrics: ['90% time saved', 'Context-aware replies'],
      color: '#10b981',
      github: '#',
      demo: '#'
    },
    {
      id: 5,
      title: 'Two-Person Portrait via LoRA',
      description: '2 LoRAs: fine-tuned one model per subject on curated sets, then composed identity-conditioning prompts with controlled sampler/CFG sweeps to maintain consistent facial, hair, and skin features across poses.',
      tech: ['ComfyUI', 'LoRA', 'Flux Dev'],
      metrics: ['2 LoRA models', 'Photoreal output'],
      color: '#ef4444',
      github: '#',
      demo: '#'
    }
  ];

  return (
    <ProjectsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <ProjectsContent>
        <SectionTitle
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Featured Projects
        </SectionTitle>

        <ProjectsGrid
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => {}}
              onHoverEnd={() => {}}
              onClick={() => setSelectedProject(project)}
            >
              <ProjectHeader>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectLinks>
                  <ProjectLink
                    href={project.github}
                    target="_blank"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fab fa-github"></i>
                  </ProjectLink>
                  <ProjectLink
                    href={project.demo}
                    target="_blank"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </ProjectLink>
                </ProjectLinks>
              </ProjectHeader>

              <ProjectDescription>{project.description}</ProjectDescription>

              <ProjectTech>
                {project.tech.map((tech, techIndex) => (
                  <TechTag
                    key={techIndex}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </TechTag>
                ))}
              </ProjectTech>

              <ProjectMetrics>
                {project.metrics.map((metric, metricIndex) => (
                  <Metric
                    key={metricIndex}
                    whileHover={{ scale: 1.05 }}
                  >
                    {metric}
                  </Metric>
                ))}
              </ProjectMetrics>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ProjectsContent>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton
                onClick={() => setSelectedProject(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </CloseButton>
              
              <h2 style={{ color: '#2c2c2c', marginBottom: '1rem' }}>
                {selectedProject.title}
              </h2>
              
              <p style={{ color: '#666666', marginBottom: '2rem', lineHeight: 1.6 }}>
                {selectedProject.description}
              </p>
              
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#8b7355', marginBottom: '1rem' }}>Technologies Used:</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedProject.tech.map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 style={{ color: '#8b7355', marginBottom: '1rem' }}>Key Achievements:</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedProject.metrics.map((metric, index) => (
                    <Metric key={index}>{metric}</Metric>
                  ))}
                </div>
              </div>
            </ModalContent>
          </ProjectModal>
        )}
      </AnimatePresence>
    </ProjectsContainer>
  );
};

export default ProjectsSection;
