import React from 'react';
import { SceneCanvas } from './SceneCanvas';
import { InteractiveShield3D } from './InteractiveShield3D';

interface ShieldScene3DProps {
  status?: 'secure' | 'scanning' | 'alert';
  className?: string;
}

export const ShieldScene3D: React.FC<ShieldScene3DProps> = ({
  status = 'secure',
  className = '',
}) => {
  return (
    <div className={`relative w-full h-[240px] sm:h-[280px] flex items-center justify-center ${className}`}>
      <SceneCanvas enableCameraControls={true} enableParticles={false}>
        <InteractiveShield3D status={status} />
      </SceneCanvas>
    </div>
  );
};
