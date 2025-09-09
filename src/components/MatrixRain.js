import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Matrix rain shader material
const MatrixMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color('#00ff00'),
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
      
      // Create falling effect
      pos.y += time * 2.0;
      pos.y = mod(pos.y, 10.0) - 5.0;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vec2 uv = vUv;
      
      // Create matrix-style characters
      float char = sin(uv.x * 20.0 + time * 5.0) * 0.5 + 0.5;
      char *= sin(uv.y * 30.0 + time * 8.0) * 0.5 + 0.5;
      
      // Create falling effect
      float fall = step(0.0, sin(uv.y * 10.0 + time * 3.0));
      
      // Create fade effect
      float fade = 1.0 - smoothstep(0.0, 1.0, uv.y);
      
      vec3 finalColor = color * char * fall * fade;
      
      gl_FragColor = vec4(finalColor, finalColor.g);
    }
  `
);

extend({ MatrixMaterial });

function MatrixRain() {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} scale={[10, 10, 1]}>
      <planeGeometry args={[1, 1]} />
      <matrixMaterial ref={materialRef} />
    </mesh>
  );
}

function FloatingCode() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const codeSnippets = useMemo(() => [
    { text: 'const ai = "future";', position: [2, 1, -1], color: '#00ff00' },
    { text: 'function innovate() {', position: [-2, 0, -2], color: '#0080ff' },
    { text: '  return "amazing";', position: [0, 2, -3], color: '#ff8000' },
    { text: '}', position: [3, -1, -1], color: '#ff0080' },
    { text: 'AI.learn();', position: [-3, 1, -2], color: '#8000ff' },
  ], []);

  return (
    <group ref={groupRef}>
      {codeSnippets.map((snippet, index) => (
        <mesh key={index} position={snippet.position}>
          <planeGeometry args={[2, 0.5]} />
          <meshBasicMaterial
            color={snippet.color}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function DataStreams() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      groupRef.current.children.forEach((stream, index) => {
        // Create flowing data effect
        stream.position.y = Math.sin(time * 2 + index * 0.5) * 2;
        stream.rotation.z = Math.sin(time * 1.5 + index * 0.3) * 0.1;
        
        // Color shifting
        const material = stream.material;
        if (material) {
          material.color.setHSL((time * 0.1 + index * 0.2) % 1, 1, 0.5);
        }
      });
    }
  });

  const streams = Array.from({ length: 12 }, (_, i) => (
    <mesh
      key={i}
      position={[
        Math.cos(i / 12 * Math.PI * 2) * 3,
        Math.sin(i / 12 * Math.PI * 2) * 3,
        -2
      ]}
      scale={[0.1, 3, 0.1]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={new THREE.Color().setHSL(i / 12, 1, 0.5)}
        transparent
        opacity={0.8}
        emissive={new THREE.Color().setHSL(i / 12, 1, 0.2)}
      />
    </mesh>
  ));

  return <group ref={groupRef}>{streams}</group>;
}

function CyberGrid() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const gridLines = useMemo(() => {
    const lines = [];
    const gridSize = 20;
    const spacing = 0.5;
    
    // Create grid lines
    for (let i = -gridSize; i <= gridSize; i++) {
      // Horizontal lines
      lines.push(
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
          <lineBasicMaterial color="#00ff00" transparent opacity={0.3} />
        </line>
      );
      
      // Vertical lines
      lines.push(
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
          <lineBasicMaterial color="#00ff00" transparent opacity={0.3} />
        </line>
      );
    }
    
    return lines;
  }, []);

  return <group ref={groupRef}>{gridLines}</group>;
}

export { MatrixRain, FloatingCode, DataStreams, CyberGrid };
