import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import styled from 'styled-components';

const CyberpunkContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
  font-family: 'Courier New', monospace;
`;

const DataStream = styled.div`
  position: absolute;
  color: #00ff00;
  font-size: 12px;
  opacity: 0.7;
  animation: ${props => `glitch${props.index}`} ${props => 2 + Math.random() * 3}s linear infinite;
  
  @keyframes glitch${props => props.index} {
    0% { transform: translateY(-100vh); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0; }
  }
`;

const HUD = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #00ff00;
  font-size: 14px;
  text-shadow: 0 0 10px #00ff00;
  border: 1px solid #00ff00;
  padding: 10px;
  background: rgba(0, 255, 0, 0.1);
  backdrop-filter: blur(5px);
`;

const ScanLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00ff00, transparent);
  animation: scan 3s linear infinite;
  
  @keyframes scan {
    0% { transform: translateY(-100vh); }
    100% { transform: translateY(100vh); }
  }
`;

function CyberpunkUI() {
  const [dataStreams, setDataStreams] = useState([]);
  
  useEffect(() => {
    const generateDataStream = () => {
      const stream = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        content: generateRandomCode(),
        index: Math.floor(Math.random() * 10)
      };
      
      setDataStreams(prev => [...prev.slice(-5), stream]);
    };
    
    const interval = setInterval(generateDataStream, 1000);
    return () => clearInterval(interval);
  }, []);
  
  const generateRandomCode = () => {
    const codeSnippets = [
      'const ai = "future";',
      'function innovate() { return "amazing"; }',
      'AI.learn(); AI.create(); AI.inspire();',
      'while(true) { dream(); build(); repeat(); }',
      'if (passion && skills) { success = true; }',
      'let creativity = infinity;',
      'for(let i = 0; i < possibilities; i++) { explore(); }',
      'class Developer { constructor() { this.passion = "unlimited"; } }',
      'async function buildFuture() { await innovate(); }',
      'const portfolio = { creativity: 100, innovation: 100 };'
    ];
    
    return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
  };
  
  return (
    <CyberpunkContainer>
      <ScanLine />
      
      <HUD>
        <div>SYSTEM STATUS: ONLINE</div>
        <div>CREATIVITY LEVEL: 100%</div>
        <div>INNOVATION: ACTIVE</div>
        <div>PORTFOLIO: LOADED</div>
      </HUD>
      
      {dataStreams.map(stream => (
        <DataStream
          key={stream.id}
          index={stream.index}
          style={{ left: stream.x }}
        >
          {stream.content}
        </DataStream>
      ))}
    </CyberpunkContainer>
  );
}

function FloatingCode3D() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });
  
  const codeSnippets = [
    'AI', 'ML', 'React', 'Python', 'FastAPI', 'Three.js',
    'Innovation', 'Creativity', 'Future', 'Tech', 'Code', 'Build'
  ];
  
  return (
    <group ref={groupRef}>
      {codeSnippets.map((code, index) => (
        <Text
          key={index}
          position={[
            Math.cos(index / codeSnippets.length * Math.PI * 2) * 3,
            Math.sin(index / codeSnippets.length * Math.PI * 2) * 3,
            -2
          ]}
          fontSize={0.3}
          color="#00ff00"
          anchorX="center"
          anchorY="middle"
          font="/fonts/courier.woff"
        >
          {code}
        </Text>
      ))}
    </group>
  );
}

function GlitchEffect() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Create glitch effect
      if (Math.random() > 0.95) {
        meshRef.current.position.x += (Math.random() - 0.5) * 0.1;
        meshRef.current.position.y += (Math.random() - 0.5) * 0.1;
        meshRef.current.rotation.z += (Math.random() - 0.5) * 0.1;
      }
      
      // Reset position
      if (Math.random() > 0.98) {
        meshRef.current.position.set(0, 0, 0);
        meshRef.current.rotation.set(0, 0, 0);
      }
    }
  });
  
  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial
        color="#00ff00"
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export { CyberpunkUI, FloatingCode3D, GlitchEffect };
