import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function MouseTrails() {
  const groupRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const trailRefs = useRef([]);
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Update trail positions based on mouse
      groupRef.current.position.x = mousePosition.x * 2;
      groupRef.current.position.y = mousePosition.y * 2;
      
      // Animate trail particles
      trailRefs.current.forEach((trail, index) => {
        if (trail) {
          const time = state.clock.elapsedTime;
          trail.rotation.x = time * 0.5 + index * 0.1;
          trail.rotation.y = time * 0.3 + index * 0.2;
          trail.rotation.z = time * 0.2 + index * 0.15;
          
          // Create wave motion
          trail.position.y += Math.sin(time * 2 + index) * 0.01;
          trail.position.x += Math.cos(time * 1.5 + index) * 0.01;
        }
      });
    }
  });

  const trailParticles = Array.from({ length: 20 }, (_, i) => (
    <mesh
      key={i}
      ref={(el) => (trailRefs.current[i] = el)}
      position={[
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      ]}
      scale={Math.random() * 0.5 + 0.1}
    >
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial
        color={new THREE.Color().setHSL(i / 20, 1, 0.5)}
        transparent
        opacity={0.6}
        emissive={new THREE.Color().setHSL(i / 20, 1, 0.2)}
      />
    </mesh>
  ));

  return <group ref={groupRef}>{trailParticles}</group>;
}

function InteractiveParticles() {
  const groupRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      // Create particle swarm effect
      groupRef.current.children.forEach((particle, index) => {
        const distance = Math.sqrt(
          Math.pow(particle.position.x - mousePosition.x * 3, 2) +
          Math.pow(particle.position.y - mousePosition.y * 3, 2)
        );
        
        // Attract particles to mouse
        if (distance > 0.5) {
          particle.position.x += (mousePosition.x * 3 - particle.position.x) * 0.02;
          particle.position.y += (mousePosition.y * 3 - particle.position.y) * 0.02;
        }
        
        // Add floating motion
        particle.position.z = Math.sin(time + index * 0.5) * 0.5;
        particle.rotation.x = time * 0.5 + index * 0.1;
        particle.rotation.y = time * 0.3 + index * 0.2;
      });
    }
  });

  const particles = Array.from({ length: 50 }, (_, i) => (
    <mesh
      key={i}
      position={[
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ]}
      scale={Math.random() * 0.3 + 0.1}
    >
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial
        color={new THREE.Color().setHSL(i / 50, 1, 0.6)}
        transparent
        opacity={0.7}
        emissive={new THREE.Color().setHSL(i / 50, 1, 0.1)}
      />
    </mesh>
  ));

  return <group ref={groupRef}>{particles}</group>;
}

function EnergyBeams() {
  const groupRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      groupRef.current.children.forEach((beam, index) => {
        // Create energy beam effect
        beam.rotation.z = Math.atan2(
          mousePosition.y * 3 - beam.position.y,
          mousePosition.x * 3 - beam.position.x
        );
        
        // Pulsing effect
        beam.scale.setScalar(1 + Math.sin(time * 3 + index) * 0.2);
        
        // Color shifting
        const material = beam.material;
        if (material) {
          material.color.setHSL((time * 0.1 + index * 0.1) % 1, 1, 0.5);
        }
      });
    }
  });

  const beams = Array.from({ length: 8 }, (_, i) => (
    <mesh
      key={i}
      position={[
        Math.cos(i / 8 * Math.PI * 2) * 2,
        Math.sin(i / 8 * Math.PI * 2) * 2,
        0
      ]}
      scale={[0.05, 2, 0.05]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={new THREE.Color().setHSL(i / 8, 1, 0.5)}
        transparent
        opacity={0.8}
        emissive={new THREE.Color().setHSL(i / 8, 1, 0.2)}
      />
    </mesh>
  ));

  return <group ref={groupRef}>{beams}</group>;
}

export { MouseTrails, InteractiveParticles, EnergyBeams };
