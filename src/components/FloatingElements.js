import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

const FloatingElements = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating Box */}
      <Box
        position={[3, 2, -2]}
        args={[1, 1, 1]}
        rotation={[Math.PI / 4, Math.PI / 4, 0]}
      >
        <meshStandardMaterial
          color="#667eea"
          transparent
          opacity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </Box>

      {/* Floating Sphere */}
      <Sphere
        position={[-3, 1, -1]}
        args={[0.8]}
      >
        <meshStandardMaterial
          color="#764ba2"
          transparent
          opacity={0.7}
          metalness={0.9}
          roughness={0.1}
        />
      </Sphere>

      {/* Floating Torus */}
      <Torus
        position={[0, -2, -3]}
        args={[1, 0.3, 16, 32]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color="#fbbf24"
          transparent
          opacity={0.5}
          metalness={0.7}
          roughness={0.3}
        />
      </Torus>

      {/* Additional floating elements */}
      <Box
        position={[-2, -1, -4]}
        args={[0.5, 0.5, 0.5]}
        rotation={[Math.PI / 3, Math.PI / 6, 0]}
      >
        <meshStandardMaterial
          color="#10b981"
          transparent
          opacity={0.4}
          metalness={0.6}
          roughness={0.4}
        />
      </Box>

      <Sphere
        position={[4, -1, -2]}
        args={[0.6]}
      >
        <meshStandardMaterial
          color="#ef4444"
          transparent
          opacity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>
    </group>
  );
};

export default FloatingElements;
