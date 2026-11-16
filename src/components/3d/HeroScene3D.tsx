import React from 'react';
import { SceneCanvas } from './SceneCanvas';
import { CyberCore3D } from './CyberCore3D';

interface HeroScene3DProps {
  className?: string;
}

export const HeroScene3D: React.FC<HeroScene3DProps> = ({
  className = '',
}) => {
  return (
    <div className={`relative w-full h-[360px] sm:h-[440px] md:h-[500px] flex items-center justify-center ${className}`}>
      <SceneCanvas enableCameraControls enableParticles>
        <CyberCore3D scale={1.15} position={[0, 0, 0]} interactive />
      </SceneCanvas>
    </div>
  );
};
