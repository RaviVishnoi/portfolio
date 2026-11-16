import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface InteractiveShield3DProps {
  status?: 'secure' | 'scanning' | 'alert';
}

export const InteractiveShield3D: React.FC<InteractiveShield3DProps> = ({
  status = 'secure',
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [clicked, setClicked] = useState(false);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.25;
      groupRef.current.rotation.x = Math.cos(time * 0.4) * 0.1;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.5;
    }
  });

  const getStatusColor = () => {
    switch (status) {
      case 'alert':
        return { main: '#f43f5e', glow: '#e11d48' };
      case 'scanning':
        return { main: '#fbbf24', glow: '#f59e0b' };
      default:
        return { main: '#10b981', glow: '#059669' };
    }
  };

  const colors = getStatusColor();

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group
        ref={groupRef}
        scale={clicked ? 1.1 : 1.0}
        onClick={() => {
          setClicked(true);
          setTimeout(() => setClicked(false), 600);
        }}
      >
        {/* Central Hexagonal Cyber Shield Core */}
        <mesh>
          <cylinderGeometry args={[1.4, 1.4, 0.2, 6]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.2}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>

        {/* Shield Wireframe Overlay */}
        <mesh>
          <cylinderGeometry args={[1.42, 1.42, 0.22, 6]} />
          <meshStandardMaterial
            color={colors.main}
            emissive={colors.glow}
            emissiveIntensity={0.6}
            wireframe
          />
        </mesh>

        {/* Outer Orbital Firewall Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[1.85, 0.025, 16, 64]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#0891b2"
            emissiveIntensity={0.9}
          />
        </mesh>

        {/* Status Indicator Spheres */}
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const angle = (idx * Math.PI) / 3;
          const r = 1.45;
          return (
            <mesh
              key={idx}
              position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}
            >
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshStandardMaterial
                color={colors.main}
                emissive={colors.glow}
                emissiveIntensity={1.0}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
};
