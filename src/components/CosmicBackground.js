import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Cosmic shader material
const CosmicMaterial = shaderMaterial(
  {
    time: 0,
    color1: new THREE.Color('#ff0080'),
    color2: new THREE.Color('#8000ff'),
    color3: new THREE.Color('#0080ff'),
    nebulaIntensity: 1.0,
  },
  // Vertex shader
  `
    uniform float time;
    uniform float nebulaIntensity;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      
      // Create nebula distortion
      float nebula1 = sin(pos.x * 2.0 + time * 0.5) * 0.3;
      float nebula2 = cos(pos.y * 2.0 + time * 0.3) * 0.3;
      float nebula3 = sin(pos.z * 2.0 + time * 0.4) * 0.3;
      
      pos.x += nebula1 * nebulaIntensity;
      pos.y += nebula2 * nebulaIntensity;
      pos.z += nebula3 * nebulaIntensity;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    uniform float nebulaIntensity;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vec2 uv = vUv;
      
      // Create nebula patterns
      float nebula1 = sin(uv.x * 3.0 + time * 0.5) * 0.5 + 0.5;
      float nebula2 = cos(uv.y * 3.0 + time * 0.3) * 0.5 + 0.5;
      float nebula3 = sin((uv.x + uv.y) * 2.0 + time * 0.4) * 0.5 + 0.5;
      
      // Mix nebula colors
      vec3 color = mix(color1, color2, nebula1);
      color = mix(color, color3, nebula2);
      
      // Add nebula glow
      float glow = sin(uv.x * 10.0 + time * 2.0) * 0.1 + 0.9;
      color *= glow;
      
      // Add cosmic dust
      float dust = sin(uv.x * 20.0 + time * 3.0) * 0.05 + 0.95;
      color *= dust;
      
      // Add edge fade
      float edge = 1.0 - smoothstep(0.0, 0.3, min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y)));
      color *= edge;
      
      gl_FragColor = vec4(color, 0.6);
    }
  `
);

extend({ CosmicMaterial });

function Nebula({ position, scale = 1, nebulaIntensity = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Create nebula rotation
      meshRef.current.rotation.x = time * 0.1 * nebulaIntensity;
      meshRef.current.rotation.y = time * 0.15 * nebulaIntensity;
      meshRef.current.rotation.z = time * 0.05 * nebulaIntensity;
      
      // Nebula scaling
      const nebulaScale = 1 + Math.sin(time * 0.5) * 0.1 * nebulaIntensity;
      meshRef.current.scale.setScalar(scale * nebulaScale);
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      materialRef.current.nebulaIntensity = nebulaIntensity;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[4, 4]} />
      <cosmicMaterial ref={materialRef} />
    </mesh>
  );
}

function StarField() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  const stars = useMemo(() => {
    const starCount = 1000;
    const positions = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    
    return positions;
  }, []);

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={stars.length / 3}
            array={stars}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#ffffff"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function CosmicDust() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.005;
    }
  });

  const dustParticles = useMemo(() => {
    const dustCount = 500;
    const positions = new Float32Array(dustCount * 3);
    
    for (let i = 0; i < dustCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    
    return positions;
  }, []);

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustParticles.length / 3}
            array={dustParticles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#888888"
          transparent
          opacity={0.3}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function CosmicBackground() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.002;
    }
  });

  const nebulas = [
    { position: [0, 0, -50], scale: 20, intensity: 1.0 },
    { position: [30, 20, -40], scale: 15, intensity: 0.8 },
    { position: [-30, -20, -60], scale: 18, intensity: 0.9 },
    { position: [20, -30, -45], scale: 12, intensity: 0.7 },
    { position: [-20, 30, -55], scale: 16, intensity: 0.85 },
  ];

  return (
    <group ref={groupRef}>
      <StarField />
      <CosmicDust />
      {nebulas.map((nebula, index) => (
        <Nebula
          key={index}
          position={nebula.position}
          scale={nebula.scale}
          nebulaIntensity={nebula.intensity}
        />
      ))}
    </group>
  );
}

export default CosmicBackground;
