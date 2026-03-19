import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, OrbitControls } from '@react-three/drei';

const CyberGlobe = () => {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial 
          color="#E8573A" 
          wireframe={true} 
          transparent 
          opacity={0.15} 
        />
      </mesh>
      <mesh scale={0.98}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial 
          color="#1F120C" 
          transparent={true}
          opacity={0.9}
        />
      </mesh>
    </group>
  );
};

const ParticleRing = () => {
    const ringRef = useRef();
    
    useFrame(({ clock }) => {
      if (ringRef.current) {
        ringRef.current.rotation.z = clock.getElapsedTime() * 0.1;
        ringRef.current.rotation.x = 1.2;
      }
    });

    return (
        <group ref={ringRef}>
            <Sparkles count={400} scale={10} size={2} speed={0.4} opacity={0.5} color="#F4A07A" />
        </group>
    )
}

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#E8573A" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#F4A07A" />
      
      <CyberGlobe />
      <ParticleRing />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5} 
        maxPolarAngle={Math.PI / 2} 
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
};

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
