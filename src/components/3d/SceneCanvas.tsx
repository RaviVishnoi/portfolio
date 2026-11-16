import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { LightingSetup } from './LightingSetup';
import { CameraController } from './CameraController';
import { ParticleField3D } from './ParticleField3D';

interface SceneCanvasProps {
  children?: React.ReactNode;
  className?: string;
  enableCameraControls?: boolean;
  enableParticles?: boolean;
  cameraFov?: number;
}

export const SceneCanvas: React.FC<SceneCanvasProps> = ({
  children,
  className = '',
  enableCameraControls = true,
  enableParticles = true,
  cameraFov = 45,
}) => {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  // Check WebGL availability safely
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    // Graceful 2D/CSS fallback if WebGL is unsupported
    return (
      <div className={`relative flex items-center justify-center overflow-hidden bg-radial from-cyan-950/20 to-transparent ${className}`}>
        <div className="w-48 h-48 rounded-full border border-cyan-500/30 animate-pulse bg-cyan-950/10" />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full pointer-events-auto ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: cameraFov }}
        dpr={[1, 1.5]}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          alpha: true,
        }}
      >
        <Suspense fallback={null}>
          <LightingSetup />
          {enableCameraControls && <CameraController />}
          {enableParticles && <ParticleField3D />}
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};
