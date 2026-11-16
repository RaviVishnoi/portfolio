import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleField3DProps {
  count?: number;
  radius?: number;
  color?: string;
}

export const ParticleField3D: React.FC<ParticleField3DProps> = ({
  count = 1400,
  radius = 16,
  color = '#38bdf8',
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Responsive particle density
  const actualCount = useMemo(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return Math.floor(count * 0.4); // 40% on mobile for solid 60 FPS
    }
    return count;
  }, [count]);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(actualCount * 3);
    const scl = new Float32Array(actualCount);

    for (let i = 0; i < actualCount; i++) {
      // Cylindrical / spherical random distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * radius;

      const sinPhi = Math.sin(phi);
      pos[i * 3] = r * sinPhi * Math.cos(theta);
      pos[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      scl[i] = Math.random() * 0.8 + 0.2;
    }

    return [pos, scl];
  }, [actualCount, radius]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    // Slow planetary ambient rotation
    pointsRef.current.rotation.y += delta * 0.035;
    pointsRef.current.rotation.x += delta * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color={color}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
