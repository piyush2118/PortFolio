import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Rainbow shader material
const RainbowMaterial = shaderMaterial(
  {
    time: 0,
    speed: 1.0,
  },
  // Vertex shader
  `
    uniform float time;
    uniform float speed;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      
      // Create wave motion
      pos.x += sin(pos.y * 3.0 + time * speed) * 0.1;
      pos.y += cos(pos.x * 3.0 + time * speed * 0.8) * 0.1;
      pos.z += sin(pos.x * 2.0 + pos.y * 2.0 + time * speed * 0.6) * 0.2;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform float speed;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vec2 uv = vUv;
      
      // Create rainbow color shifting
      float hue = (uv.x + uv.y + time * speed * 0.5) * 0.5;
      hue = mod(hue, 1.0);
      
      // Convert HSV to RGB
      vec3 color = vec3(
        abs(3.0 * hue - 1.5) - 0.5,
        1.0 - abs(3.0 * hue - 1.0),
        1.0 - abs(3.0 * hue - 2.0)
      );
      
      // Add pulsing effect
      float pulse = sin(time * speed * 2.0) * 0.3 + 0.7;
      color *= pulse;
      
      // Add edge glow
      float edge = 1.0 - smoothstep(0.0, 0.1, min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y)));
      color += edge * 0.5;
      
      gl_FragColor = vec4(color, 0.8);
    }
  `
);

extend({ RainbowMaterial });

function RainbowSphere({ position, scale = 1, speed = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.3;
    }
    
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      materialRef.current.speed = speed;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <rainbowMaterial ref={materialRef} />
    </mesh>
  );
}

function ColorShiftCube({ position, scale = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Rotate the cube
      meshRef.current.rotation.x = time * 0.4;
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.rotation.z = time * 0.2;
      
      // Scale pulsing
      const pulse = Math.sin(time * 2) * 0.1 + 1;
      meshRef.current.scale.setScalar(scale * pulse);
      
      // Color shifting
      const material = meshRef.current.material;
      if (material) {
        const hue = (time * 0.1) % 1;
        material.color.setHSL(hue, 1, 0.5);
        material.emissive.setHSL(hue, 1, 0.1);
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#ff0000"
        transparent
        opacity={0.8}
        emissive="#ff0000"
      />
    </mesh>
  );
}

function PrismEffect({ position, scale = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Rotate the prism
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.rotation.z = time * 0.1;
      
      // Color shifting for each face
      meshRef.current.children.forEach((child, index) => {
        if (child.material) {
          const hue = (time * 0.1 + index * 0.2) % 1;
          child.material.color.setHSL(hue, 1, 0.6);
          child.material.emissive.setHSL(hue, 1, 0.2);
        }
      });
    }
  });

  return (
    <group ref={meshRef} position={position} scale={scale}>
      {/* Create a prism-like shape with different colored faces */}
      <mesh>
        <coneGeometry args={[1, 2, 6]} />
        <meshStandardMaterial
          color="#ff0000"
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function RainbowParticles() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      groupRef.current.children.forEach((particle, index) => {
        // Floating motion
        particle.position.y = Math.sin(time * 2 + index * 0.5) * 0.5;
        particle.position.x = Math.cos(time * 1.5 + index * 0.3) * 0.3;
        particle.position.z = Math.sin(time * 1.2 + index * 0.4) * 0.2;
        
        // Rotation
        particle.rotation.x = time * 0.5 + index * 0.1;
        particle.rotation.y = time * 0.3 + index * 0.2;
        particle.rotation.z = time * 0.2 + index * 0.15;
        
        // Color shifting
        const material = particle.material;
        if (material) {
          const hue = (time * 0.2 + index * 0.1) % 1;
          material.color.setHSL(hue, 1, 0.6);
          material.emissive.setHSL(hue, 1, 0.2);
        }
      });
    }
  });

  const particles = Array.from({ length: 30 }, (_, i) => (
    <mesh
      key={i}
      position={[
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      ]}
      scale={Math.random() * 0.3 + 0.1}
    >
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial
        color={new THREE.Color().setHSL(i / 30, 1, 0.5)}
        transparent
        opacity={0.8}
        emissive={new THREE.Color().setHSL(i / 30, 1, 0.1)}
      />
    </mesh>
  ));

  return <group ref={groupRef}>{particles}</group>;
}

function RainbowBeams() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      groupRef.current.children.forEach((beam, index) => {
        // Rotate beams
        beam.rotation.y = time * 0.5 + index * 0.1;
        beam.rotation.z = Math.sin(time * 2 + index) * 0.1;
        
        // Scale pulsing
        const pulse = Math.sin(time * 3 + index * 0.5) * 0.2 + 1;
        beam.scale.setScalar(pulse);
        
        // Color shifting
        const material = beam.material;
        if (material) {
          const hue = (time * 0.3 + index * 0.1) % 1;
          material.color.setHSL(hue, 1, 0.7);
          material.emissive.setHSL(hue, 1, 0.3);
        }
      });
    }
  });

  const beams = Array.from({ length: 16 }, (_, i) => (
    <mesh
      key={i}
      position={[
        Math.cos(i / 16 * Math.PI * 2) * 2,
        Math.sin(i / 16 * Math.PI * 2) * 2,
        0
      ]}
      scale={[0.05, 3, 0.05]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={new THREE.Color().setHSL(i / 16, 1, 0.5)}
        transparent
        opacity={0.8}
        emissive={new THREE.Color().setHSL(i / 16, 1, 0.2)}
      />
    </mesh>
  ));

  return <group ref={groupRef}>{beams}</group>;
}

export { RainbowSphere, ColorShiftCube, PrismEffect, RainbowParticles, RainbowBeams };
