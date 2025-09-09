import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Quantum shader material
const QuantumMaterial = shaderMaterial(
  {
    time: 0,
    color1: new THREE.Color('#ff00ff'),
    color2: new THREE.Color('#00ffff'),
    color3: new THREE.Color('#ffff00'),
    quantumField: 1.0,
  },
  // Vertex shader
  `
    uniform float time;
    uniform float quantumField;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;
      
      vec3 pos = position;
      
      // Create quantum field distortion
      float quantum1 = sin(pos.x * 8.0 + time * 2.0) * 0.1;
      float quantum2 = cos(pos.y * 8.0 + time * 1.5) * 0.1;
      float quantum3 = sin(pos.z * 8.0 + time * 1.8) * 0.1;
      
      pos.x += quantum1 * quantumField;
      pos.y += quantum2 * quantumField;
      pos.z += quantum3 * quantumField;
      
      // Add quantum tunneling effect
      pos += normal * sin(time * 3.0 + pos.x * 5.0) * 0.05 * quantumField;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    uniform float quantumField;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vec2 uv = vUv;
      
      // Create quantum interference patterns
      float interference1 = sin(uv.x * 20.0 + time * 3.0) * 0.5 + 0.5;
      float interference2 = cos(uv.y * 20.0 + time * 2.5) * 0.5 + 0.5;
      float interference3 = sin((uv.x + uv.y) * 15.0 + time * 2.0) * 0.5 + 0.5;
      
      // Mix colors based on interference
      vec3 color = mix(color1, color2, interference1);
      color = mix(color, color3, interference2);
      
      // Add quantum tunneling effect
      float tunneling = sin(uv.x * 30.0 + time * 5.0) * 0.1 + 0.9;
      color *= tunneling;
      
      // Add quantum field effect
      float field = sin(uv.x * 10.0 + time * 2.0) * cos(uv.y * 10.0 + time * 1.5) * 0.2 + 0.8;
      color *= field;
      
      // Add edge glow
      float edge = 1.0 - smoothstep(0.0, 0.1, min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y)));
      color += edge * 0.4;
      
      gl_FragColor = vec4(color, 0.9);
    }
  `
);

extend({ QuantumMaterial });

function QuantumParticle({ position, scale = 1, quantumField = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Create quantum uncertainty
      meshRef.current.position.x = position[0] + Math.sin(time * 2 + position[0]) * 0.1 * quantumField;
      meshRef.current.position.y = position[1] + Math.cos(time * 1.5 + position[1]) * 0.1 * quantumField;
      meshRef.current.position.z = position[2] + Math.sin(time * 1.8 + position[2]) * 0.1 * quantumField;
      
      // Quantum rotation
      meshRef.current.rotation.x = time * 0.5 * quantumField;
      meshRef.current.rotation.y = time * 0.3 * quantumField;
      meshRef.current.rotation.z = time * 0.2 * quantumField;
      
      // Quantum scaling
      const quantumScale = 1 + Math.sin(time * 3) * 0.1 * quantumField;
      meshRef.current.scale.setScalar(scale * quantumScale);
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      materialRef.current.quantumField = quantumField;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <quantumMaterial ref={materialRef} />
    </mesh>
  );
}

function QuantumField({ position, scale = 1, quantumField = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Create quantum field morphing
      meshRef.current.scale.setScalar(
        scale + Math.sin(time * 2) * 0.1 * quantumField + Math.cos(time * 1.5) * 0.05 * quantumField
      );
      
      // Quantum rotation
      meshRef.current.rotation.x = time * 0.3 * quantumField;
      meshRef.current.rotation.y = time * 0.4 * quantumField;
      meshRef.current.rotation.z = time * 0.2 * quantumField;
      
      // Quantum position uncertainty
      meshRef.current.position.x = position[0] + Math.sin(time * 1.5) * 0.2 * quantumField;
      meshRef.current.position.y = position[1] + Math.cos(time * 1.2) * 0.2 * quantumField;
      meshRef.current.position.z = position[2] + Math.sin(time * 1.8) * 0.2 * quantumField;
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      materialRef.current.quantumField = quantumField;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <quantumMaterial ref={materialRef} />
    </mesh>
  );
}

function QuantumTunnel({ position, scale = 1, quantumField = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Create quantum tunnel effect
      meshRef.current.rotation.x = time * 0.2 * quantumField;
      meshRef.current.rotation.y = time * 0.5 * quantumField;
      meshRef.current.rotation.z = time * 0.1 * quantumField;
      
      // Quantum scaling
      const quantumScale = 1 + Math.sin(time * 2.5) * 0.15 * quantumField;
      meshRef.current.scale.setScalar(scale * quantumScale);
      
      // Quantum position
      meshRef.current.position.y = position[1] + Math.sin(time * 1.8) * 0.3 * quantumField;
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      materialRef.current.quantumField = quantumField;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.2, 16, 100]} />
      <quantumMaterial ref={materialRef} />
    </mesh>
  );
}

function QuantumEffects() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  const quantumElements = [
    { type: 'particle', position: [2, 1, -1], scale: 0.8, field: 1.0 },
    { type: 'field', position: [-2, 0, -2], scale: 1.2, field: 1.5 },
    { type: 'tunnel', position: [0, 2, -3], scale: 1.0, field: 0.8 },
    { type: 'particle', position: [3, -1, -1], scale: 0.6, field: 1.2 },
    { type: 'field', position: [-3, 1, -2], scale: 0.9, field: 1.1 },
    { type: 'tunnel', position: [1, -2, -4], scale: 1.3, field: 0.9 },
  ];

  return (
    <group ref={groupRef}>
      {quantumElements.map((element, index) => (
        element.type === 'particle' ? (
          <QuantumParticle
            key={index}
            position={element.position}
            scale={element.scale}
            quantumField={element.field}
          />
        ) : element.type === 'field' ? (
          <QuantumField
            key={index}
            position={element.position}
            scale={element.scale}
            quantumField={element.field}
          />
        ) : (
          <QuantumTunnel
            key={index}
            position={element.position}
            scale={element.scale}
            quantumField={element.field}
          />
        )
      ))}
    </group>
  );
}

export default QuantumEffects;
