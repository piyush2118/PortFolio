import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ContactContainer = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 100px 0;
  background: #f5f5f0;
  position: relative;
  overflow: hidden;
`;

const ContactContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
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

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: #8b7355;
    border-radius: 2px;
  }
`;

const ContactInfo = styled(motion.div)`
  margin-bottom: 3rem;
`;

const ContactTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c2c2c;
  margin-bottom: 1rem;
`;

const ContactDescription = styled.p`
  color: #666666;
  margin-bottom: 2rem;
  line-height: 1.7;
  font-size: 1.1rem;
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(139, 115, 85, 0.1);
  border: 1px solid rgba(139, 115, 85, 0.2);
  border-radius: 15px;
  color: #2c2c2c;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(10px);
    box-shadow: 0 10px 20px rgba(139, 115, 85, 0.2);
    border-color: rgba(139, 115, 85, 0.4);
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background: #8b7355;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
`;

const ContactText = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  font-weight: 600;
  margin-bottom: 0.2rem;
`;

const ContactValue = styled.div`
  color: #666666;
  font-size: 0.9rem;
`;

const FormSection = styled(motion.div)`
  background: rgba(139, 115, 85, 0.1);
  border: 1px solid rgba(139, 115, 85, 0.2);
  border-radius: 20px;
  padding: 3rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #2c2c2c;
  font-weight: 600;
  font-size: 0.9rem;
`;

const Input = styled(motion.input)`
  padding: 1rem;
  border: 1px solid rgba(139, 115, 85, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  color: #2c2c2c;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #8b7355;
    box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1);
  }

  &::placeholder {
    color: #666666;
  }
`;

const TextArea = styled(motion.textarea)`
  padding: 1rem;
  border: 1px solid rgba(139, 115, 85, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  color: #2c2c2c;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #8b7355;
    box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1);
  }

  &::placeholder {
    color: #666666;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: #8b7355;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(139, 115, 85, 0.3);
    background: #6b5b47;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;


const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      alert('Thank you for your message! I\'ll get back to you soon.');
    }, 2000);
  };

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'piyushmodi2118@gmail.com',
      href: 'mailto:piyushmodi2118@gmail.com'
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '+91 77350 70821',
      href: 'tel:+917735070821'
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/piyushmodi2118',
      href: 'https://linkedin.com/in/piyushmodi2118'
    },
    {
      icon: '💻',
      label: 'GitHub',
      value: 'github.com/piyush2118',
      href: 'https://github.com/piyush2118'
    }
  ];

  return (
    <ContactContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <ContactContent>
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
            Get In Touch
          </SectionTitle>

          <ContactInfo
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <ContactTitle>Let's Connect</ContactTitle>
            <ContactDescription>
              I'm always interested in new opportunities and exciting projects. 
              Feel free to reach out and let's discuss how we can work together!
            </ContactDescription>

            <ContactDetails>
              {contactInfo.map((info, index) => (
                <ContactItem
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : '_self'}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <ContactIcon>{info.icon}</ContactIcon>
                  <ContactText>
                    <ContactLabel>{info.label}</ContactLabel>
                    <ContactValue>{info.value}</ContactValue>
                  </ContactText>
                </ContactItem>
              ))}
            </ContactDetails>
          </ContactInfo>
        </TextSection>

        <FormSection
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Form onSubmit={handleSubmit}>
            <FormGroup
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                whileFocus={{ scale: 1.02 }}
              />
            </FormGroup>

            <FormGroup
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
                whileFocus={{ scale: 1.02 }}
              />
            </FormGroup>

            <FormGroup
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What's this about?"
                required
                whileFocus={{ scale: 1.02 }}
              />
            </FormGroup>

            <FormGroup
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project or idea..."
                required
                whileFocus={{ scale: 1.02 }}
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
          </Form>
        </FormSection>

      </ContactContent>
    </ContactContainer>
  );
};

export default ContactSection;
