import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Portal shader material
const PortalMaterial = shaderMaterial(
  {
    time: 0,
    color1: new THREE.Color('#ff0080'),
    color2: new THREE.Color('#8000ff'),
    color3: new THREE.Color('#0080ff'),
    portalIntensity: 1.0,
  },
  // Vertex shader
  `
    uniform float time;
    uniform float portalIntensity;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;
      
      vec3 pos = position;
      
      // Create portal distortion
      float portal1 = sin(pos.x * 6.0 + time * 2.5) * 0.2;
      float portal2 = cos(pos.y * 6.0 + time * 2.0) * 0.2;
      float portal3 = sin(pos.z * 6.0 + time * 1.8) * 0.2;
      
      pos.x += portal1 * portalIntensity;
      pos.y += portal2 * portalIntensity;
      pos.z += portal3 * portalIntensity;
      
      // Add portal vortex effect
      pos += normal * sin(time * 4.0 + pos.x * 3.0) * 0.1 * portalIntensity;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    uniform float portalIntensity;
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vec2 uv = vUv;
      
      // Create portal vortex
      vec2 center = vec2(0.5, 0.5);
      float distance = length(uv - center);
      float angle = atan(uv.y - center.y, uv.x - center.x);
      
      // Create spiral effect
      float spiral = sin(angle * 8.0 + time * 3.0 + distance * 10.0) * 0.5 + 0.5;
      
      // Create portal colors
      vec3 color = mix(color1, color2, spiral);
      color = mix(color, color3, sin(angle * 4.0 + time * 2.0) * 0.5 + 0.5);
      
      // Add portal energy
      float energy = sin(distance * 20.0 + time * 5.0) * 0.1 + 0.9;
      color *= energy;
      
      // Add portal glow
      float glow = 1.0 - smoothstep(0.0, 0.5, distance);
      color += glow * 0.3;
      
      // Add edge effect
      float edge = 1.0 - smoothstep(0.0, 0.1, min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y)));
      color += edge * 0.2;
      
      gl_FragColor = vec4(color, 0.9);
    }
  `
);

extend({ PortalMaterial });

function Portal({ position, scale = 1, portalIntensity = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Create portal rotation
      meshRef.current.rotation.x = time * 0.3 * portalIntensity;
      meshRef.current.rotation.y = time * 0.5 * portalIntensity;
      meshRef.current.rotation.z = time * 0.2 * portalIntensity;
      
      // Portal scaling
      const portalScale = 1 + Math.sin(time * 2) * 0.1 * portalIntensity;
      meshRef.current.scale.setScalar(scale * portalScale);
      
      // Portal position
      meshRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.2 * portalIntensity;
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      materialRef.current.portalIntensity = portalIntensity;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <circleGeometry args={[1, 64]} />
      <portalMaterial ref={materialRef} />
    </mesh>
  );
}

function PortalRing({ position, scale = 1, portalIntensity = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Create portal ring rotation
      meshRef.current.rotation.x = time * 0.2 * portalIntensity;
      meshRef.current.rotation.y = time * 0.4 * portalIntensity;
      meshRef.current.rotation.z = time * 0.1 * portalIntensity;
      
      // Portal ring scaling
      const portalScale = 1 + Math.sin(time * 2.5) * 0.15 * portalIntensity;
      meshRef.current.scale.setScalar(scale * portalScale);
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      materialRef.current.portalIntensity = portalIntensity;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <portalMaterial ref={materialRef} />
    </mesh>
  );
}

function PortalSphere({ position, scale = 1, portalIntensity = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Create portal sphere rotation
      meshRef.current.rotation.x = time * 0.25 * portalIntensity;
      meshRef.current.rotation.y = time * 0.35 * portalIntensity;
      meshRef.current.rotation.z = time * 0.15 * portalIntensity;
      
      // Portal sphere scaling
      const portalScale = 1 + Math.sin(time * 1.8) * 0.12 * portalIntensity;
      meshRef.current.scale.setScalar(scale * portalScale);
      
      // Portal sphere position
      meshRef.current.position.y = position[1] + Math.sin(time * 1.2) * 0.15 * portalIntensity;
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      materialRef.current.portalIntensity = portalIntensity;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <portalMaterial ref={materialRef} />
    </mesh>
  );
}

function PortalEffects() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.005;
    }
  });

  const portalElements = [
    { type: 'portal', position: [2, 1, -1], scale: 1.0, intensity: 1.0 },
    { type: 'ring', position: [-2, 0, -2], scale: 1.2, intensity: 1.5 },
    { type: 'sphere', position: [0, 2, -3], scale: 0.8, intensity: 0.8 },
    { type: 'portal', position: [3, -1, -1], scale: 0.6, intensity: 1.2 },
    { type: 'ring', position: [-3, 1, -2], scale: 0.9, intensity: 1.1 },
    { type: 'sphere', position: [1, -2, -4], scale: 1.3, intensity: 0.9 },
  ];

  return (
    <group ref={groupRef}>
      {portalElements.map((element, index) => (
        element.type === 'portal' ? (
          <Portal
            key={index}
            position={element.position}
            scale={element.scale}
            portalIntensity={element.intensity}
          />
        ) : element.type === 'ring' ? (
          <PortalRing
            key={index}
            position={element.position}
            scale={element.scale}
            portalIntensity={element.intensity}
          />
        ) : (
          <PortalSphere
            key={index}
            position={element.position}
            scale={element.scale}
            portalIntensity={element.intensity}
          />
        )
      ))}
    </group>
  );
}

export default PortalEffects;
