import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Holographic shader material
const HolographicMaterial = shaderMaterial(
  {
    time: 0,
    color1: new THREE.Color('#00ffff'),
    color2: new THREE.Color('#ff00ff'),
    color3: new THREE.Color('#ffff00'),
    opacity: 0.8,
  },
  // Vertex shader
  `
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;
      
      vec3 pos = position;
      
      // Create holographic distortion
      pos.x += sin(pos.y * 5.0 + time * 3.0) * 0.05;
      pos.y += cos(pos.x * 5.0 + time * 2.0) * 0.05;
      pos.z += sin(pos.x * 3.0 + pos.y * 3.0 + time * 1.5) * 0.1;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    uniform float opacity;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vec2 uv = vUv;
      
      // Create scanline effect
      float scanline = sin(uv.y * 100.0 + time * 10.0) * 0.02 + 0.98;
      
      // Create holographic color shifting
      float hueShift = sin(time * 2.0 + uv.x * 10.0) * 0.5 + 0.5;
      vec3 color = mix(color1, color2, hueShift);
      color = mix(color, color3, sin(time * 1.5 + uv.y * 8.0) * 0.5 + 0.5);
      
      // Add glitch effect
      float glitch = step(0.98, sin(time * 20.0 + uv.x * 50.0));
      color += glitch * vec3(1.0, 0.0, 0.0);
      
      // Add edge glow
      float edge = 1.0 - smoothstep(0.0, 0.1, min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y)));
      color += edge * 0.3;
      
      // Apply scanlines
      color *= scanline;
      
      gl_FragColor = vec4(color, opacity);
    }
  `
);

extend({ HolographicMaterial });

function HolographicCube({ position, scale = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <holographicMaterial ref={materialRef} />
    </mesh>
  );
}

function NeonRing({ position, scale = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.1, 16, 100]} />
      <holographicMaterial ref={materialRef} />
    </mesh>
  );
}

function DataStream({ position, scale = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
      <holographicMaterial ref={materialRef} />
    </mesh>
  );
}

function HolographicEffects() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  const effects = useMemo(() => [
    { type: 'cube', position: [2, 1, -1], scale: 0.8 },
    { type: 'ring', position: [-2, 0, -2], scale: 1.2 },
    { type: 'stream', position: [0, 2, -3], scale: 1.0 },
    { type: 'cube', position: [3, -1, -1], scale: 0.6 },
    { type: 'ring', position: [-3, 1, -2], scale: 0.9 },
    { type: 'stream', position: [1, -2, -4], scale: 1.5 },
  ], []);

  return (
    <group ref={groupRef}>
      {effects.map((effect, index) => (
        effect.type === 'cube' ? (
          <HolographicCube
            key={index}
            position={effect.position}
            scale={effect.scale}
          />
        ) : effect.type === 'ring' ? (
          <NeonRing
            key={index}
            position={effect.position}
            scale={effect.scale}
          />
        ) : (
          <DataStream
            key={index}
            position={effect.position}
            scale={effect.scale}
          />
        )
      ))}
    </group>
  );
}

export default HolographicEffects;
