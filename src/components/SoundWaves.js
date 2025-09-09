import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SoundWaves() {
  const groupRef = useRef();
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  
  useEffect(() => {
    // Create audio context and analyser
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = 256;
    const bufferLength = analyserNode.frequencyBinCount;
    const data = new Uint8Array(bufferLength);
    
    setAudioContext(audioCtx);
    setAnalyser(analyserNode);
    setDataArray(data);
    
    // Get microphone access
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyserNode);
      })
      .catch(err => console.log('Audio access denied:', err));
    
    return () => {
      if (audioCtx) {
        audioCtx.close();
      }
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current && analyser && dataArray) {
      analyser.getByteFrequencyData(dataArray);
      
      groupRef.current.children.forEach((wave, index) => {
        if (index < dataArray.length) {
          const frequency = dataArray[index] / 255;
          wave.scale.y = frequency * 2 + 0.1;
          wave.position.y = frequency * 2 - 1;
          
          // Color based on frequency
          const material = wave.material;
          if (material) {
            material.color.setHSL(frequency, 1, 0.5);
          }
        }
      });
    }
  });

  const waves = Array.from({ length: 64 }, (_, i) => (
    <mesh
      key={i}
      position={[i * 0.1 - 3.2, 0, 0]}
      scale={[0.05, 0.1, 0.05]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={new THREE.Color().setHSL(i / 64, 1, 0.5)}
        transparent
        opacity={0.8}
        emissive={new THREE.Color().setHSL(i / 64, 1, 0.2)}
      />
    </mesh>
  ));

  return <group ref={groupRef}>{waves}</group>;
}

function AudioVisualizer() {
  const groupRef = useRef();
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  
  useEffect(() => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = 512;
    const bufferLength = analyserNode.frequencyBinCount;
    const data = new Uint8Array(bufferLength);
    
    setAudioContext(audioCtx);
    setAnalyser(analyserNode);
    setDataArray(data);
    
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyserNode);
      })
      .catch(err => console.log('Audio access denied:', err));
    
    return () => {
      if (audioCtx) {
        audioCtx.close();
      }
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current && analyser && dataArray) {
      analyser.getByteFrequencyData(dataArray);
      
      groupRef.current.children.forEach((bar, index) => {
        if (index < dataArray.length) {
          const frequency = dataArray[index] / 255;
          bar.scale.y = frequency * 3 + 0.1;
          bar.position.y = frequency * 1.5;
          
          // Rotate based on frequency
          bar.rotation.z = frequency * Math.PI;
          
          // Color and opacity
          const material = bar.material;
          if (material) {
            material.color.setHSL(frequency, 1, 0.6);
            material.opacity = frequency * 0.8 + 0.2;
          }
        }
      });
    }
  });

  const bars = Array.from({ length: 32 }, (_, i) => (
    <mesh
      key={i}
      position={[i * 0.2 - 3.1, 0, 0]}
      scale={[0.1, 0.1, 0.1]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={new THREE.Color().setHSL(i / 32, 1, 0.5)}
        transparent
        opacity={0.7}
        emissive={new THREE.Color().setHSL(i / 32, 1, 0.1)}
      />
    </mesh>
  ));

  return <group ref={groupRef}>{bars}</group>;
}

function BeatDetector() {
  const groupRef = useRef();
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [dataArray, setDataArray] = useState(null);
  const [beatDetected, setBeatDetected] = useState(false);
  
  useEffect(() => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = 256;
    const bufferLength = analyserNode.frequencyBinCount;
    const data = new Uint8Array(bufferLength);
    
    setAudioContext(audioCtx);
    setAnalyser(analyserNode);
    setDataArray(data);
    
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyserNode);
      })
      .catch(err => console.log('Audio access denied:', err));
    
    return () => {
      if (audioCtx) {
        audioCtx.close();
      }
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current && analyser && dataArray) {
      analyser.getByteFrequencyData(dataArray);
      
      // Simple beat detection
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      const isBeat = average > 50;
      
      if (isBeat && !beatDetected) {
        setBeatDetected(true);
        setTimeout(() => setBeatDetected(false), 200);
      }
      
      groupRef.current.children.forEach((particle, index) => {
        const frequency = dataArray[index] / 255;
        
        if (beatDetected) {
          particle.scale.setScalar(frequency * 2 + 0.5);
          particle.position.y = Math.sin(state.clock.elapsedTime * 10 + index) * 2;
        } else {
          particle.scale.setScalar(frequency * 0.5 + 0.1);
          particle.position.y = Math.sin(state.clock.elapsedTime * 2 + index) * 0.5;
        }
        
        // Color based on beat
        const material = particle.material;
        if (material) {
          if (beatDetected) {
            material.color.setHSL(0, 1, 0.8);
          } else {
            material.color.setHSL(frequency, 1, 0.5);
          }
        }
      });
    }
  });

  const particles = Array.from({ length: 20 }, (_, i) => (
    <mesh
      key={i}
      position={[
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      ]}
      scale={0.1}
    >
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshStandardMaterial
        color={new THREE.Color().setHSL(i / 20, 1, 0.5)}
        transparent
        opacity={0.8}
        emissive={new THREE.Color().setHSL(i / 20, 1, 0.2)}
      />
    </mesh>
  ));

  return <group ref={groupRef}>{particles}</group>;
}

export { SoundWaves, AudioVisualizer, BeatDetector };
