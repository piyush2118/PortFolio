import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Liquid morphing shader material
const LiquidMaterial = shaderMaterial(
  {
    time: 0,
    color1: new THREE.Color('#667eea'),
    color2: new THREE.Color('#764ba2'),
    color3: new THREE.Color('#fbbf24'),
    morphSpeed: 1.0,
  },
  // Vertex shader
  `
    uniform float time;
    uniform float morphSpeed;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;
      
      vec3 pos = position;
      
      // Create liquid morphing effect
      float wave1 = sin(pos.x * 4.0 + time * morphSpeed) * 0.1;
      float wave2 = cos(pos.y * 4.0 + time * morphSpeed * 0.8) * 0.1;
      float wave3 = sin(pos.z * 4.0 + time * morphSpeed * 0.6) * 0.1;
      
      pos.x += wave1;
      pos.y += wave2;
      pos.z += wave3;
      
      // Add secondary waves
      pos.x += sin(pos.y * 2.0 + pos.z * 2.0 + time * morphSpeed * 1.5) * 0.05;
      pos.y += cos(pos.x * 2.0 + pos.z * 2.0 + time * morphSpeed * 1.2) * 0.05;
      pos.z += sin(pos.x * 2.0 + pos.y * 2.0 + time * morphSpeed * 1.8) * 0.05;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    uniform float morphSpeed;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vec2 uv = vUv;
      
      // Create flowing liquid patterns
      float flow1 = sin(uv.x * 8.0 + time * morphSpeed * 2.0) * 0.5 + 0.5;
      float flow2 = cos(uv.y * 8.0 + time * morphSpeed * 1.5) * 0.5 + 0.5;
      float flow3 = sin((uv.x + uv.y) * 6.0 + time * morphSpeed * 1.8) * 0.5 + 0.5;
      
      // Mix colors based on flow patterns
      vec3 color = mix(color1, color2, flow1);
      color = mix(color, color3, flow2);
      
      // Add liquid surface effect
      float surface = sin(uv.x * 20.0 + time * morphSpeed * 5.0) * 0.02 + 0.98;
      color *= surface;
      
      // Add caustics effect
      float caustics = sin(uv.x * 15.0 + time * morphSpeed * 3.0) * 
                      cos(uv.y * 15.0 + time * morphSpeed * 2.5) * 0.1 + 0.9;
      color *= caustics;
      
      // Add edge glow
      float edge = 1.0 - smoothstep(0.0, 0.1, min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y)));
      color += edge * 0.3;
      
      gl_FragColor = vec4(color, 0.9);
    }
  `
);

extend({ LiquidMaterial });

function LiquidBlob({ position, scale = 1, morphSpeed = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Create liquid-like morphing
      meshRef.current.scale.setScalar(
        scale + Math.sin(time * morphSpeed) * 0.1 + Math.cos(time * morphSpeed * 0.7) * 0.05
      );
      
      // Add rotation
      meshRef.current.rotation.x = time * morphSpeed * 0.1;
      meshRef.current.rotation.y = time * morphSpeed * 0.15;
      meshRef.current.rotation.z = time * morphSpeed * 0.05;
      
      // Add floating motion
      meshRef.current.position.y = position[1] + Math.sin(time * morphSpeed + position[0]) * 0.2;
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      materialRef.current.morphSpeed = morphSpeed;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <liquidMaterial ref={materialRef} />
    </mesh>
  );
}

function LiquidCube({ position, scale = 1, morphSpeed = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Create liquid cube morphing
      meshRef.current.scale.setScalar(
        scale + Math.sin(time * morphSpeed * 1.5) * 0.08 + Math.cos(time * morphSpeed * 0.9) * 0.04
      );
      
      // Add rotation
      meshRef.current.rotation.x = time * morphSpeed * 0.2;
      meshRef.current.rotation.y = time * morphSpeed * 0.25;
      meshRef.current.rotation.z = time * morphSpeed * 0.1;
      
      // Add floating motion
      meshRef.current.position.y = position[1] + Math.sin(time * morphSpeed * 0.8 + position[0]) * 0.15;
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      materialRef.current.morphSpeed = morphSpeed;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <liquidMaterial ref={materialRef} />
    </mesh>
  );
}

function LiquidTorus({ position, scale = 1, morphSpeed = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Create liquid torus morphing
      meshRef.current.scale.setScalar(
        scale + Math.sin(time * morphSpeed * 1.2) * 0.06 + Math.cos(time * morphSpeed * 0.8) * 0.03
      );
      
      // Add rotation
      meshRef.current.rotation.x = time * morphSpeed * 0.15;
      meshRef.current.rotation.y = time * morphSpeed * 0.3;
      meshRef.current.rotation.z = time * morphSpeed * 0.08;
      
      // Add floating motion
      meshRef.current.position.y = position[1] + Math.sin(time * morphSpeed * 0.6 + position[0]) * 0.1;
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      materialRef.current.morphSpeed = morphSpeed;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <liquidMaterial ref={materialRef} />
    </mesh>
  );
}

function LiquidMorphing() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  const liquidShapes = [
    { type: 'blob', position: [2, 1, -1], scale: 1.2, speed: 1.0 },
    { type: 'cube', position: [-2, 0, -2], scale: 0.8, speed: 1.5 },
    { type: 'torus', position: [0, 2, -3], scale: 1.0, speed: 0.8 },
    { type: 'blob', position: [3, -1, -1], scale: 0.6, speed: 1.2 },
    { type: 'cube', position: [-3, 1, -2], scale: 1.1, speed: 0.9 },
    { type: 'torus', position: [1, -2, -4], scale: 1.3, speed: 1.1 },
  ];

  return (
    <group ref={groupRef}>
      {liquidShapes.map((shape, index) => (
        shape.type === 'blob' ? (
          <LiquidBlob
            key={index}
            position={shape.position}
            scale={shape.scale}
            morphSpeed={shape.speed}
          />
        ) : shape.type === 'cube' ? (
          <LiquidCube
            key={index}
            position={shape.position}
            scale={shape.scale}
            morphSpeed={shape.speed}
          />
        ) : (
          <LiquidTorus
            key={index}
            position={shape.position}
            scale={shape.scale}
            morphSpeed={shape.speed}
          />
        )
      ))}
    </group>
  );
}

export default LiquidMorphing;
