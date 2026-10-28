import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionConfig {
  name: string;
  badge: string;
  accent: string;
  accentRgb: string;
  ringStyle: 'crosshair' | 'corners' | 'dashed' | 'shield' | 'terminal' | 'pulse';
}

const SECTION_CONFIGS: Record<string, SectionConfig> = {
  home: {
    name: 'Home',
    badge: '[SYS_NET]',
    accent: '#06b6d4',
    accentRgb: '6, 182, 212',
    ringStyle: 'crosshair',
  },
  about: {
    name: 'About',
    badge: '<DEV />',
    accent: '#10b981',
    accentRgb: '16, 185, 129',
    ringStyle: 'corners',
  },
  skills: {
    name: 'Skills',
    badge: '{ STACK }',
    accent: '#a855f7',
    accentRgb: '168, 85, 247',
    ringStyle: 'dashed',
  },
  'cyber-security': {
    name: 'Security',
    badge: '[SHIELD_VAPT]',
    accent: '#f43f5e',
    accentRgb: '244, 63, 94',
    ringStyle: 'shield',
  },
  tools: {
    name: 'Tools',
    badge: '>_ EXEC',
    accent: '#f59e0b',
    accentRgb: '245, 158, 11',
    ringStyle: 'terminal',
  },
  experience: {
    name: 'Experience',
    badge: '// CAREER',
    accent: '#0284c7',
    accentRgb: '2, 132, 199',
    ringStyle: 'crosshair',
  },
  projects: {
    name: 'Projects',
    badge: '[PROJECTS]',
    accent: '#ec4899',
    accentRgb: '236, 72, 153',
    ringStyle: 'corners',
  },
  certifications: {
    name: 'Certifications',
    badge: '★ VERIFIED',
    accent: '#eab308',
    accentRgb: '234, 179, 8',
    ringStyle: 'pulse',
  },
  education: {
    name: 'Education',
    badge: '[ACADEMIC]',
    accent: '#14b8a6',
    accentRgb: '20, 184, 166',
    ringStyle: 'dashed',
  },
  contact: {
    name: 'Contact',
    badge: '[CONNECT]',
    accent: '#6366f1',
    accentRgb: '99, 102, 241',
    ringStyle: 'pulse',
  },
};

const DEFAULT_CONFIG: SectionConfig = {
  name: 'Portfolio',
  badge: '[RV]',
  accent: '#06b6d4',
  accentRgb: '6, 182, 212',
  ringStyle: 'crosshair',
};

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isVisible, setIsVisible] = useState(false);

  const throttleRef = useRef<number>(0);

  useEffect(() => {
    // Only activate custom cursor on precision mouse devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const detectSection = (x: number, y: number) => {
      const now = Date.now();
      if (now - throttleRef.current < 40) return;
      throttleRef.current = now;

      const el = document.elementFromPoint(x, y);
      if (!el) return;

      const sectionEl = el.closest('section[id], [data-section-id]');
      if (sectionEl) {
        const id = sectionEl.getAttribute('data-section-id') || sectionEl.id;
        if (id && SECTION_CONFIGS[id] && id !== activeSection) {
          setActiveSection(id);
        }
      }
    };

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
      detectSection(e.clientX, e.clientY);
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest('a, button, input, textarea, select, [role="button"], .clickable, .glass-card');
      if (interactive) {
        setIsHovering(true);
        if (interactive.tagName.toLowerCase() === 'a') {
          setHoverText('OPEN ↗');
        } else if (interactive.tagName.toLowerCase() === 'button') {
          setHoverText('SELECT');
        } else {
          setHoverText('CLICK');
        }
      } else {
        setIsHovering(false);
        setHoverText(null);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', updateHoverState, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', updateHoverState);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, activeSection]);

  if (!isVisible) return null;

  const config = SECTION_CONFIGS[activeSection] || DEFAULT_CONFIG;
  const currentBadge = isHovering && hoverText ? hoverText : config.badge;

  return (
    <div className="custom-cursor-root pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* 1. Precision Center Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none"
        style={{
          backgroundColor: config.accent,
          boxShadow: `0 0 10px ${config.accent}`,
        }}
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.05 }}
      />

      {/* 2. Dynamic Section-Specific Reticle Frame */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.35 : 1,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.2 }}
        style={{ width: 40, height: 40 }}
      >
        {/* Style A: Crosshair (Home, Experience) */}
        {config.ringStyle === 'crosshair' && (
          <div
            className="w-full h-full rounded-full border relative transition-colors duration-300"
            style={{
              borderColor: `rgba(${config.accentRgb}, 0.65)`,
              boxShadow: `0 0 14px rgba(${config.accentRgb}, 0.25)`,
            }}
          >
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5" style={{ backgroundColor: config.accent }} />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5" style={{ backgroundColor: config.accent }} />
            <span className="absolute top-1/2 -left-1 -translate-y-1/2 h-0.5 w-1.5" style={{ backgroundColor: config.accent }} />
            <span className="absolute top-1/2 -right-1 -translate-y-1/2 h-0.5 w-1.5" style={{ backgroundColor: config.accent }} />
          </div>
        )}

        {/* Style B: HUD Corners (About, Projects) */}
        {config.ringStyle === 'corners' && (
          <div className="w-full h-full relative transition-colors duration-300">
            {/* Top-Left */}
            <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2" style={{ borderColor: config.accent }} />
            {/* Top-Right */}
            <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2" style={{ borderColor: config.accent }} />
            {/* Bottom-Left */}
            <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2" style={{ borderColor: config.accent }} />
            {/* Bottom-Right */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2" style={{ borderColor: config.accent }} />
          </div>
        )}

        {/* Style C: Dashed Spinning Ring (Skills, Education) */}
        {config.ringStyle === 'dashed' && (
          <div
            className="w-full h-full rounded-full border-2 border-dashed animate-spin transition-colors duration-300"
            style={{
              borderColor: config.accent,
              animationDuration: '9s',
              boxShadow: `0 0 12px rgba(${config.accentRgb}, 0.25)`,
            }}
          />
        )}

        {/* Style D: Tactical Shield Radar (Cyber Security) */}
        {config.ringStyle === 'shield' && (
          <div
            className="w-full h-full rounded-xl border-2 transition-colors duration-300 relative flex items-center justify-center rotate-45"
            style={{
              borderColor: config.accent,
              boxShadow: `0 0 16px rgba(${config.accentRgb}, 0.45)`,
              backgroundColor: `rgba(${config.accentRgb}, 0.08)`,
            }}
          >
            <div
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: config.accent }}
            />
          </div>
        )}

        {/* Style E: Terminal Pixel Prompt (Tools) */}
        {config.ringStyle === 'terminal' && (
          <div
            className="w-full h-full rounded-md border-2 transition-colors duration-300 flex items-center justify-center font-mono font-bold text-[10px]"
            style={{
              borderColor: config.accent,
              backgroundColor: `rgba(${config.accentRgb}, 0.12)`,
              color: config.accent,
              boxShadow: `0 0 12px rgba(${config.accentRgb}, 0.35)`,
            }}
          >
            &gt;_
          </div>
        )}

        {/* Style F: Credential Pulse Halo (Certifications, Contact) */}
        {config.ringStyle === 'pulse' && (
          <div className="w-full h-full relative flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full border-2 transition-colors duration-300 animate-ping opacity-35"
              style={{ borderColor: config.accent }}
            />
            <div
              className="w-7 h-7 rounded-full border transition-colors duration-300"
              style={{
                borderColor: config.accent,
                boxShadow: `0 0 16px rgba(${config.accentRgb}, 0.5)`,
              }}
            />
          </div>
        )}
      </motion.div>

      {/* 3. Section Floating Micro-Badge */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        animate={{
          x: mousePosition.x + 18,
          y: mousePosition.y - 12,
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 28, mass: 0.1 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeSection}-${isHovering}`}
            initial={{ opacity: 0, scale: 0.8, y: 3 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -3 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md shadow-lg border"
            style={{
              backgroundColor: isHovering ? `rgba(${config.accentRgb}, 0.22)` : 'rgba(10, 15, 24, 0.88)',
              borderColor: isHovering ? config.accent : `rgba(${config.accentRgb}, 0.45)`,
              color: isHovering ? '#ffffff' : config.accent,
              boxShadow: `0 2px 10px rgba(0, 0, 0, 0.4), 0 0 12px rgba(${config.accentRgb}, 0.25)`,
            }}
          >
            <span>{currentBadge}</span>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
