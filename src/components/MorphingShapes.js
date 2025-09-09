import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Custom shader material for morphing liquid effects
const MorphingMaterial = shaderMaterial(
  {
    time: 0,
    color1: new THREE.Color('#667eea'),
    color2: new THREE.Color('#764ba2'),
    color3: new THREE.Color('#fbbf24'),
  },
  // Vertex shader
  `
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      
      // Create morphing wave effect
      pos.x += sin(pos.y * 3.0 + time * 2.0) * 0.1;
      pos.y += cos(pos.x * 3.0 + time * 1.5) * 0.1;
      pos.z += sin(pos.x * 2.0 + pos.y * 2.0 + time * 1.0) * 0.2;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vec2 uv = vUv;
      
      // Create flowing color patterns
      float noise1 = sin(uv.x * 10.0 + time * 2.0) * 0.5 + 0.5;
      float noise2 = sin(uv.y * 8.0 + time * 1.5) * 0.5 + 0.5;
      float noise3 = sin((uv.x + uv.y) * 6.0 + time * 1.0) * 0.5 + 0.5;
      
      // Mix colors based on noise patterns
      vec3 color = mix(color1, color2, noise1);
      color = mix(color, color3, noise2);
      
      // Add holographic effect
      float hologram = sin(uv.x * 20.0 + time * 5.0) * 0.1 + 0.9;
      color *= hologram;
      
      // Add edge glow
      float edge = 1.0 - smoothstep(0.0, 0.1, min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y)));
      color += edge * 0.5;
      
      gl_FragColor = vec4(color, 0.8);
    }
  `
);

extend({ MorphingMaterial });

function MorphingSphere({ position, scale = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <morphingMaterial ref={materialRef} />
    </mesh>
  );
}

function LiquidBlob({ position, scale = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Create liquid-like morphing
      const time = state.clock.elapsedTime;
      meshRef.current.scale.setScalar(
        scale + Math.sin(time * 2) * 0.1 + Math.cos(time * 1.5) * 0.05
      );
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
      meshRef.current.rotation.z = time * 0.05;
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <dodecahedronGeometry args={[1, 0]} />
      <morphingMaterial ref={materialRef} />
    </mesh>
  );
}

function MorphingShapes() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const shapes = useMemo(() => [
    { type: 'sphere', position: [3, 2, -2], scale: 1.2 },
    { type: 'blob', position: [-3, 1, -1], scale: 0.8 },
    { type: 'sphere', position: [0, -2, -3], scale: 1.5 },
    { type: 'blob', position: [4, 0, -2], scale: 1.0 },
    { type: 'sphere', position: [-2, -1, -4], scale: 0.6 },
  ], []);

  return (
    <group ref={groupRef}>
      {shapes.map((shape, index) => (
        shape.type === 'sphere' ? (
          <MorphingSphere
            key={index}
            position={shape.position}
            scale={shape.scale}
          />
        ) : (
          <LiquidBlob
            key={index}
            position={shape.position}
            scale={shape.scale}
          />
        )
      ))}
    </group>
  );
}

export default MorphingShapes;
