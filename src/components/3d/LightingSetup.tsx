import React from 'react';

export const LightingSetup: React.FC = () => {
  return (
    <>
      {/* Deep ambient base - prevents pitch black shadows */}
      <ambientLight intensity={0.4} color="#0b172a" />

      {/* Main Key Light: High-tech Electric Cyan */}
      <directionalLight
        position={[8, 10, 6]}
        intensity={2.2}
        color="#06b6d4"
      />

      {/* Rim / Backlight: Electric Violet / Magenta for cinematic edge silhouette */}
      <directionalLight
        position={[-8, -6, -6]}
        intensity={2.8}
        color="#a855f7"
      />

      {/* Top Accent Light: Pure cool white for specular reflections */}
      <directionalLight
        position={[0, 12, 2]}
        intensity={1.0}
        color="#e0f2fe"
      />

      {/* Dynamic Core Point Light: Glowing Turquoise */}
      <pointLight
        position={[0, 0, 0]}
        intensity={3.5}
        distance={12}
        color="#22d3ee"
        decay={2}
      />
    </>
  );
};
