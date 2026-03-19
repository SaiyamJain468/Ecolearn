import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles, OrbitControls, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';

// Low-poly floating island representing a slice of nature
function FloatingIsland() {
  const islandRef = useRef();
  
  useFrame((state) => {
    if (islandRef.current) {
      islandRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={islandRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* The Earth Base */}
        <mesh position={[0, -2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[4, 2, 2, 8]} />
          <meshStandardMaterial color="#1C7C54" roughness={0.8} />
        </mesh>
        
        {/* Core Dirt */}
        <mesh position={[0, -3.5, 0]} receiveShadow>
          <cylinderGeometry args={[2, 0, 1.5, 8]} />
          <meshStandardMaterial color="#3E2C20" roughness={1} />
        </mesh>
        
        {/* Glowing Water Pool */}
        <mesh position={[1, -0.9, 1]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.5, 16]} />
          <meshStandardMaterial color="#00F5FF" transparent opacity={0.8} roughness={0.1} metalness={0.8} emissive="#00F5FF" emissiveIntensity={0.2} />
        </mesh>

        {/* Abstract Trees */}
        <Tree position={[-1.5, -1, -1]} scale={1.5} />
        <Tree position={[2, -1, -2]} scale={1.2} />
        <Tree position={[-2.5, -1, 1]} scale={0.8} />
        <Tree position={[0, -1, -2.5]} scale={1.8} />

      </Float>
    </group>
  );
}

// Low-poly tree
function Tree({ position, scale }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 1, 6]} />
        <meshStandardMaterial color="#3E2C20" roughness={0.9} />
      </mesh>
      {/* Leaves */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <dodecahedronGeometry args={[0.6]} />
        <meshStandardMaterial color="#38A366" roughness={0.6} />
      </mesh>
      <mesh position={[0.2, 1.5, -0.2]} castShadow scale={0.8}>
        <dodecahedronGeometry args={[0.6]} />
        <meshStandardMaterial color="#C8FF00" roughness={0.6} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

// Glowing ethereal particles representing seeds/pollen
function EtherealDust() {
  return (
    <>
      <Sparkles count={150} scale={15} size={3} speed={0.4} opacity={0.4} color="#C8FF00" noise={1} />
      <Sparkles count={50} scale={20} size={5} speed={0.2} opacity={0.2} color="#F4D06F" noise={2} />
    </>
  );
}

export default function SolarpunkScene() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-gradient-to-b from-[#0A1612] to-[#0D2418]">
      <Canvas shadows camera={{ position: [8, 4, 8], fov: 45 }}>
        {/* Soft, warm sunlight */}
        <ambientLight intensity={0.4} color="#FDF6EE" />
        <directionalLight 
          position={[10, 15, 10]} 
          intensity={1.2} 
          color="#FDF6EE" 
          castShadow 
          shadow-mapSize={1024} 
        />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#00F5FF" />
        
        {/* Environment reflection */}
        <Environment preset="forest" />

        {/* Scene Elements */}
        <FloatingIsland />
        <EtherealDust />

        {/* Cinematic controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.3} 
          maxPolarAngle={Math.PI / 2.2} 
          minPolarAngle={Math.PI / 3}
        />
        
        {/* Fog to blend the edges into the CSS background */}
        <fog attach="fog" args={['#0A1612', 10, 25]} />
      </Canvas>
    </div>
  );
}
