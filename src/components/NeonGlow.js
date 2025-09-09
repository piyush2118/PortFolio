import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Neon glow shader material
const NeonMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color('#00ffff'),
    glowColor: new THREE.Color('#0080ff'),
    intensity: 1.0,
  },
  // Vertex shader
  `
    uniform float time;
    uniform float intensity;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;
      
      vec3 pos = position;
      
      // Add subtle pulsing
      pos += normal * sin(time * 2.0) * 0.01 * intensity;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 color;
    uniform vec3 glowColor;
    uniform float intensity;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vec2 uv = vUv;
      
      // Create neon glow effect
      float glow = 1.0 - smoothstep(0.0, 0.1, min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y)));
      
      // Add pulsing effect
      float pulse = sin(time * 3.0) * 0.3 + 0.7;
      glow *= pulse * intensity;
      
      // Create inner glow
      float innerGlow = 1.0 - smoothstep(0.0, 0.3, min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y)));
      
      // Mix colors
      vec3 finalColor = mix(color, glowColor, glow);
      finalColor += innerGlow * 0.5;
      
      // Add scanline effect
      float scanline = sin(uv.y * 50.0 + time * 10.0) * 0.02 + 0.98;
      finalColor *= scanline;
      
      gl_FragColor = vec4(finalColor, glow);
    }
  `
);

extend({ NeonMaterial });

function NeonBox({ position, scale = 1, color = '#00ffff', glowColor = '#0080ff' }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <neonMaterial 
        ref={materialRef} 
        color={color}
        glowColor={glowColor}
      />
    </mesh>
  );
}

function NeonSphere({ position, scale = 1, color = '#ff00ff', glowColor = '#ff0080' }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <neonMaterial 
        ref={materialRef} 
        color={color}
        glowColor={glowColor}
      />
    </mesh>
  );
}

function NeonRing({ position, scale = 1, color = '#ffff00', glowColor = '#ff8000' }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.1, 16, 100]} />
      <neonMaterial 
        ref={materialRef} 
        color={color}
        glowColor={glowColor}
      />
    </mesh>
  );
}

function NeonText({ position, text, scale = 1, color = '#00ff00', glowColor = '#0080ff' }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[2, 0.5]} />
      <neonMaterial 
        ref={materialRef} 
        color={color}
        glowColor={glowColor}
      />
    </mesh>
  );
}

function NeonGrid() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  const gridLines = [];
  const gridSize = 10;
  const spacing = 0.5;
  
  // Create grid lines
  for (let i = -gridSize; i <= gridSize; i++) {
    // Horizontal lines
    gridLines.push(
      <line key={`h-${i}`}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([
              -gridSize * spacing, i * spacing, 0,
              gridSize * spacing, i * spacing, 0
            ])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00ffff" transparent opacity={0.3} />
      </line>
    );
    
    // Vertical lines
    gridLines.push(
      <line key={`v-${i}`}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([
              i * spacing, -gridSize * spacing, 0,
              i * spacing, gridSize * spacing, 0
            ])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00ffff" transparent opacity={0.3} />
      </line>
    );
  }

  return <group ref={groupRef}>{gridLines}</group>;
}

function NeonGlow() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  const neonElements = [
    { type: 'box', position: [2, 1, -1], scale: 0.8, color: '#00ffff', glowColor: '#0080ff' },
    { type: 'sphere', position: [-2, 0, -2], scale: 1.0, color: '#ff00ff', glowColor: '#ff0080' },
    { type: 'ring', position: [0, 2, -3], scale: 1.2, color: '#ffff00', glowColor: '#ff8000' },
    { type: 'box', position: [3, -1, -1], scale: 0.6, color: '#00ff00', glowColor: '#008000' },
    { type: 'sphere', position: [-3, 1, -2], scale: 0.9, color: '#ff8000', glowColor: '#ff4000' },
    { type: 'ring', position: [1, -2, -4], scale: 1.1, color: '#8000ff', glowColor: '#4000ff' },
  ];

  return (
    <group ref={groupRef}>
      {neonElements.map((element, index) => (
        element.type === 'box' ? (
          <NeonBox
            key={index}
            position={element.position}
            scale={element.scale}
            color={element.color}
            glowColor={element.glowColor}
          />
        ) : element.type === 'sphere' ? (
          <NeonSphere
            key={index}
            position={element.position}
            scale={element.scale}
            color={element.color}
            glowColor={element.glowColor}
          />
        ) : (
          <NeonRing
            key={index}
            position={element.position}
            scale={element.scale}
            color={element.color}
            glowColor={element.glowColor}
          />
        )
      ))}
      <NeonGrid />
    </group>
  );
}

export default NeonGlow;
