import { useState, useEffect } from 'react';
import CyberNetworkHero from './ui/cyber-network-hero';
import { useTimeTheme } from '../context/TimeThemeContext';

export function TokyoSkylineHero() {
  const { activePeriod } = useTimeTheme();

  // Map our dynamic time periods to the existing CyberNetworkHero palettes
  const getHeroTheme = () => {
    switch (activePeriod) {
      case 'morning': return 'light';
      case 'afternoon': return 'light';
      case 'evening': return 'crimson';
      case 'night': return 'azure';
      default: return 'azure';
    }
  };

  return (
    <>
      <CyberNetworkHero
        eyebrow="RAVI_VISHNOI"
        title="Secure & Scalable Web Solutions"
        subtitle="Building robust applications with a security-first approach."
        theme={getHeroTheme()}
        primaryCta={{ label: 'View Projects', href: '#projects' }}
        secondaryCta={{ label: 'Contact Me', href: '#contact' }}
        style={{ background: 'transparent' }} // Let DynamicEnvironment show through
      />
    </>
  );
}