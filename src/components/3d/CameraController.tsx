import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraControllerProps {
  intensity?: number;
  enableScrollDolly?: boolean;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  intensity = 0.5,
  enableScrollDolly = true,
}) => {
  const { camera, size, pointer } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 7.5));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useFrame((state, delta) => {
    if (prefersReducedMotion) return;

    // Responsive base distance: pull camera back on mobile screens for comfortable FOV
    const isMobile = size.width < 768;
    const baseZ = isMobile ? 9.5 : 7.2;

    // Calculate subtle mouse parallax
    const targetX = pointer.x * intensity * (isMobile ? 0.3 : 1.0);
    const targetY = pointer.y * intensity * (isMobile ? 0.3 : 0.8);

    // Scroll parallax factor
    let scrollOffset = 0;
    if (enableScrollDolly && typeof window !== 'undefined') {
      const scrollY = window.scrollY;
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollPct = scrollY / docHeight;
      scrollOffset = scrollPct * 1.5;
    }

    targetPos.current.set(
      targetX,
      targetY - scrollOffset * 0.4,
      baseZ + scrollOffset * 0.5
    );

    // Smooth camera damping using delta time
    const dampSpeed = Math.min(1, delta * 3.5);
    camera.position.lerp(targetPos.current, dampSpeed);
    targetLook.current.set(targetX * 0.3, targetY * 0.3, 0);
    camera.lookAt(targetLook.current);
  });

  return null;
};
