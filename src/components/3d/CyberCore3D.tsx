import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface CyberCore3DProps {
  scale?: number;
  position?: [number, number, number];
  interactive?: boolean;
}

export const CyberCore3D: React.FC<CyberCore3DProps> = ({
  scale = 1.0,
  position = [0, 0, 0],
  interactive = true,
}) => {
  const outerGroupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const speedMultiplier = hovered ? 1.8 : 1.0;

    // Outer group gentle sway
    if (outerGroupRef.current) {
      outerGroupRef.current.rotation.y += delta * 0.25 * speedMultiplier;
      outerGroupRef.current.rotation.x = Math.sin(time * 0.4) * 0.12;
    }

    // Inner Quantum Torus Knot Core
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.45 * speedMultiplier;
      coreRef.current.rotation.y += delta * 0.65 * speedMultiplier;
      coreRef.current.rotation.z += delta * 0.2 * speedMultiplier;
    }

    // Outer Gimbal Ring 1
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.3 * speedMultiplier;
      ring1Ref.current.rotation.y += delta * 0.15;
    }

    // Outer Gimbal Ring 2
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.35 * speedMultiplier;
      ring2Ref.current.rotation.z += delta * 0.25;
    }

    // Horizontal Scanning Ring
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.4 * speedMultiplier;
      ring3Ref.current.position.y = Math.sin(time * 1.5) * 0.25;
    }
  });

  return (
    <Float
      speed={2.2}
      rotationIntensity={0.4}
      floatIntensity={0.6}
      position={position}
    >
      <group
        ref={outerGroupRef}
        scale={scale}
        onPointerOver={(e) => {
          if (!interactive) return;
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => {
          if (!interactive) return;
          setHovered(false);
        }}
      >
        {/* 1. Core Quantum Torus Knot */}
        <mesh ref={coreRef} castShadow receiveShadow>
          <torusKnotGeometry args={[0.9, 0.28, 128, 32, 2, 3]} />
          <meshStandardMaterial
            color={hovered ? '#38bdf8' : '#0284c7'}
            emissive={hovered ? '#06b6d4' : '#0369a1'}
            emissiveIntensity={hovered ? 0.85 : 0.45}
            roughness={0.18}
            metalness={0.88}
            wireframe={false}
          />
        </mesh>

        {/* 2. Outer Wireframe Protective Shield (Icosahedron) */}
        <mesh>
          <icosahedronGeometry args={[2.0, 1]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#06b6d4"
            emissiveIntensity={hovered ? 0.4 : 0.18}
            wireframe
            transparent
            opacity={hovered ? 0.75 : 0.4}
          />
        </mesh>

        {/* 3. Concentric Orbiting Ring 1 (Electric Purple) */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.35, 0.022, 16, 100]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* 4. Concentric Orbiting Ring 2 (Cyan) */}
        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.55, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#06b6d4"
            emissiveIntensity={0.7}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* 5. Scanning Radar Ring (Emerald / Cyan) */}
        <mesh ref={ring3Ref}>
          <torusGeometry args={[2.1, 0.018, 16, 64]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#10b981"
            emissiveIntensity={0.65}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* 6. Orbital Satellite Nodes */}
        {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => {
          const orbitR = 2.4;
          return (
            <mesh
              key={idx}
              position={[
                Math.cos(angle) * orbitR,
                Math.sin(angle * 1.5) * 0.6,
                Math.sin(angle) * orbitR,
              ]}
            >
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial
                color="#f43f5e"
                emissive="#f43f5e"
                emissiveIntensity={1.2}
              />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
};
