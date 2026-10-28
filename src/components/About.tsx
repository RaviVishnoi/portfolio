import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Code,
  Download,
  Film,
  Terminal,
  ExternalLink,
  Lock,
  Cpu,
  Radio,
  CheckCircle2,
} from 'lucide-react';

const TOKENS = [
  { char: '+', bg: '#9d5bd2', text: '#ffffff' },
  { char: '>', bg: '#2da44e', text: '#ffffff' },
  { char: '}', bg: '#d4a72c', text: '#3d2703' },
  { char: '*', bg: '#a371f7', text: '#ffffff' },
  { char: '{', bg: '#f47067', text: '#ffffff' },
  { char: '/', bg: '#f0883e', text: '#ffffff' },
];

export default function About() {
  const [activeTab, setActiveTab] = useState<'security' | 'development' | 'motion'>('security');
  const [personaMode, setPersonaMode] = useState<'security' | 'developer'>('security');

  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tokenRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 3D Tilt Motion Values with smooth physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 22 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['18deg', '-18deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-18deg', '18deg']);
  const translateBadgeX = useTransform(mouseXSpring, [-0.5, 0.5], [-18, 18]);
  const translateBadgeY = useTransform(mouseYSpring, [-0.5, 0.5], [-18, 18]);
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ['20%', '80%']);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ['20%', '80%']);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const xPct = clientX / rect.width - 0.5;
    const yPct = clientY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleCardMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Automatically sync visual persona when tab changes
  const handleTabChange = (tab: 'security' | 'development' | 'motion') => {
    setActiveTab(tab);
    if (tab === 'development') {
      setPersonaMode('developer');
    } else if (tab === 'security') {
      setPersonaMode('security');
    }
  };

  // Section-Scoped Cursor Kinetic Badges - strictly absolute inside container
  useEffect(() => {
    const NUM_TOKENS = TOKENS.length;
    const BADGE_SPACING = 21;
    const IDLE_DELAY = 120;
    const STAGGER_INTERVAL = 30;

    let mouse = { x: -500, y: -500 };
    let headingAngle = 0;
    let lastMoveTime = 0;
    let isInside = false;
    let animFrameId: number;

    const nodes = Array.from({ length: NUM_TOKENS }, () => ({
      x: -500,
      y: -500,
      opacity: 0,
      scale: 0,
    }));

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const insideSection =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      isInside = insideSection;

      if (insideSection) {
        // Position relative to section container
        const localX = clientX - rect.left;
        const localY = clientY - rect.top;

        const dx = localX - mouse.x;
        const dy = localY - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 1) {
          headingAngle = Math.atan2(dy, dx);
        }

        // Snap initial jump so tokens don't fly across screen
        if (mouse.x < 0) {
          nodes.forEach((n) => {
            n.x = localX;
            n.y = localY;
          });
        }

        mouse.x = localX;
        mouse.y = localY;
        lastMoveTime = performance.now();
      }
    };

    const onPointerLeave = () => {
      isInside = false;
      lastMoveTime = 0;
    };

    const animate = () => {
      const now = performance.now();
      const timeSinceMove = now - lastMoveTime;

      for (let i = 0; i < NUM_TOKENS; i++) {
        const node = nodes[i];
        const el = tokenRefs.current[i];

        if (!isInside) {
          node.opacity = 0;
          node.scale = 0;
          if (el) {
            el.style.display = 'none';
            el.style.opacity = '0';
          }
          continue;
        }

        let targetX: number;
        let targetY: number;

        if (i === 0) {
          const cursorOffset = 18;
          targetX = mouse.x - Math.cos(headingAngle) * cursorOffset;
          targetY = mouse.y - Math.sin(headingAngle) * cursorOffset;
        } else {
          const prev = nodes[i - 1];
          const segDx = node.x - prev.x;
          const segDy = node.y - prev.y;
          const segDist = Math.hypot(segDx, segDy);
          const segAngle =
            segDist > 0.001 ? Math.atan2(segDy, segDx) : headingAngle + Math.PI;

          targetX = prev.x + Math.cos(segAngle) * BADGE_SPACING;
          targetY = prev.y + Math.sin(segAngle) * BADGE_SPACING;
        }

        const lerpFactor = i === 0 ? 0.45 : 0.42;
        node.x += (targetX - node.x) * lerpFactor;
        node.y += (targetY - node.y) * lerpFactor;

        const vanishDelay = IDLE_DELAY + (NUM_TOKENS - 1 - i) * STAGGER_INTERVAL;

        if (timeSinceMove > vanishDelay) {
          node.opacity = Math.max(0, node.opacity - 0.16);
          node.scale = Math.max(0, node.scale - 0.14);
        } else {
          node.opacity = Math.min(1, node.opacity + 0.35);
          node.scale = Math.min(1, node.scale + 0.28);
        }

        if (el) {
          if (node.opacity <= 0.01) {
            el.style.display = 'none';
          } else {
            el.style.display = 'flex';
            el.style.opacity = node.opacity.toFixed(3);
            el.style.transform = `translate3d(${node.x - 10}px, ${node.y - 10}px, 0px) scale(${node.scale.toFixed(3)})`;
          }
        }
      }

      animFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 relative overflow-hidden transition-colors duration-500 cursor-default select-none border-y"
      style={{
        background: 'var(--bg-section)',
        borderColor: 'var(--card-border)',
      }}
    >
      {/* Primer Grid Pattern Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundSize: '32px 32px',
          backgroundImage:
            'linear-gradient(to right, rgba(56, 189, 248, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.12) 1px, transparent 1px)',
        }}
      />

      {/* 6 Cursor Token Badges - Strictly ABSOLUTE inside this container */}
      <div className="absolute inset-0 pointer-events-none z-[50] overflow-hidden">
        {TOKENS.map((token, i) => (
          <div
            key={i}
            ref={(el) => {
              tokenRefs.current[i] = el;
            }}
            className="absolute top-0 left-0 w-5 h-5 rounded-[4px] items-center justify-center font-mono font-bold text-[12px] leading-none pointer-events-none shadow-md will-change-transform"
            style={{
              backgroundColor: token.bg,
              color: token.text,
              opacity: 0,
              display: 'none',
              transform: 'translate3d(-500px, -500px, 0) scale(0)',
            }}
          >
            {token.char}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header Badges & Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Interactive 3D Profile Experience
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 backdrop-blur-md font-mono">
              Kinetic Tokens: <span className="text-emerald-400 font-bold">ACTIVE</span>
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black mb-3 inline-block relative tracking-tight">
            <span className="text-gradient">About Me</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-cyan-500 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
          </h2>
          <p className="text-base sm:text-lg text-theme-muted max-w-2xl mt-3">
            Bridging resilient cybersecurity infrastructure with modern, interactive web engineering.
          </p>
        </div>

        {/* 2-Column Unified Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: True 3D Interactive Mascot / Character */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="relative w-full max-w-[360px] sm:max-w-[420px] md:max-w-[460px] aspect-square flex items-center justify-center cursor-pointer"
              style={{ perspective: 1200 }}
            >
              {/* Main 3D Tilted Card Body */}
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative w-full h-full flex items-center justify-center will-change-transform"
              >
                {/* 3D Dynamic Ambient Glow */}
                <motion.div
                  className={`absolute inset-4 rounded-3xl blur-2xl pointer-events-none -z-10 transition-colors duration-500 ${
                    personaMode === 'security'
                      ? 'bg-gradient-to-tr from-cyan-500/30 via-blue-600/25 to-teal-400/20'
                      : 'bg-gradient-to-tr from-cyan-500/30 via-indigo-500/20 to-emerald-400/20'
                  }`}
                  style={{
                    transform: 'translateZ(-50px)',
                    left: glowX,
                    top: glowY,
                  }}
                />

                {/* 3D Floor Shadow */}
                <div
                  className="absolute bottom-4 w-3/4 h-8 bg-black/45 blur-xl rounded-full pointer-events-none"
                  style={{ transform: 'translateZ(-30px) scaleY(0.4)' }}
                />

                {/* Persona Rendering */}
                <AnimatePresence mode="wait">
                  {personaMode === 'developer' ? (
                    <motion.div
                      key="dev-mascot"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full flex items-center justify-center"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Central Cutout Mascot Image in 3D */}
                      <img
                        src={`${import.meta.env.BASE_URL}img/web-developer-avatar.png`}
                        alt="Ravi Vishnoi - Web Developer Mascot"
                        className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)] select-none pointer-events-none"
                        style={{ transform: 'translateZ(35px)' }}
                      />

                      {/* Floating 3D Badge 1: <head> tag */}
                      <motion.div
                        style={{
                          transform: 'translateZ(85px)',
                          x: translateBadgeX,
                          y: translateBadgeY,
                        }}
                        className="absolute top-10 left-6 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-yellow-400/40 text-yellow-300 font-mono text-xs font-bold shadow-xl shadow-yellow-950/40 pointer-events-none flex items-center gap-1.5"
                      >
                        <Code size={13} className="text-yellow-400" />
                        &lt;head&gt;
                      </motion.div>

                      {/* Floating 3D Badge 2: JS Badge */}
                      <motion.div
                        style={{
                          transform: 'translateZ(95px)',
                          x: translateBadgeX,
                          y: translateBadgeY,
                        }}
                        className="absolute top-24 left-10 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-md font-mono text-xs font-black shadow-lg shadow-amber-950/50 pointer-events-none flex items-center gap-1"
                      >
                        <span className="text-[10px]">⚡</span> JS
                      </motion.div>

                      {/* Floating 3D Badge 3: Code Terminal Hologram */}
                      <motion.div
                        style={{
                          transform: 'translateZ(75px)',
                          x: translateBadgeX,
                          y: translateBadgeY,
                        }}
                        className="absolute bottom-8 right-6 bg-cyan-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold shadow-2xl shadow-cyan-950/60 pointer-events-none flex items-center gap-2"
                      >
                        <Terminal size={14} className="text-cyan-400" />
                        &lt;/&gt; Web Dev
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sec-photo"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full flex items-center justify-center"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Holographic Cyber Defense Grid Backdrop */}
                      <div
                        className="absolute w-72 h-72 rounded-full border border-cyan-500/20 bg-cyan-950/10 pointer-events-none animate-pulse -z-10"
                        style={{ transform: 'translateZ(-15px)' }}
                      />

                      {/* Central Transparent Security Pro Cutout in 3D */}
                      <img
                        src={`${import.meta.env.BASE_URL}img/ravi-vishnoi-cutout.png`}
                        alt="Ravi Vishnoi - Security Consultant"
                        className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.65)] select-none pointer-events-none"
                        style={{ transform: 'translateZ(35px)' }}
                      />

                      {/* Floating 3D Security Shield Badge (Top Left) */}
                      <motion.div
                        style={{
                          transform: 'translateZ(90px)',
                          x: translateBadgeX,
                          y: translateBadgeY,
                        }}
                        className="absolute top-10 left-6 bg-slate-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold shadow-xl shadow-cyan-950/50 pointer-events-none flex items-center gap-2"
                      >
                        <ShieldCheck size={14} className="text-cyan-400 animate-pulse" />
                        VAPT / Defense
                      </motion.div>

                      {/* Floating 3D Firewall / 256-bit AES Badge (Top Right) */}
                      <motion.div
                        style={{
                          transform: 'translateZ(80px)',
                          x: translateBadgeX,
                          y: translateBadgeY,
                        }}
                        className="absolute top-24 right-4 bg-emerald-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-400/40 text-emerald-300 font-mono text-xs font-bold shadow-lg shadow-emerald-950/40 pointer-events-none flex items-center gap-1.5"
                      >
                        <Lock size={12} className="text-emerald-400" />
                        Firewall / Telemetry
                      </motion.div>

                      {/* Floating 3D Security Consultant Terminal Badge (Bottom Right) */}
                      <motion.div
                        style={{
                          transform: 'translateZ(95px)',
                          x: translateBadgeX,
                          y: translateBadgeY,
                        }}
                        className="absolute bottom-6 right-6 bg-cyan-950/90 backdrop-blur-md px-4 py-2 rounded-xl border border-cyan-400/50 text-cyan-200 font-semibold text-xs shadow-2xl shadow-cyan-950/70 pointer-events-none flex items-center gap-2"
                      >
                        <Radio size={14} className="text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                        Security Consultant
                      </motion.div>

                      {/* Floating 3D Status Pill (Bottom Left) */}
                      <motion.div
                        style={{
                          transform: 'translateZ(75px)',
                          x: translateBadgeX,
                          y: translateBadgeY,
                        }}
                        className="absolute bottom-8 left-6 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-teal-400/30 text-teal-300 font-mono text-[11px] font-bold shadow-md pointer-events-none flex items-center gap-1.5"
                      >
                        <CheckCircle2 size={11} className="text-teal-400" />
                        Secured
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Persona Switch Pills */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setPersonaMode('security');
                  setActiveTab('security');
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  personaMode === 'security'
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-105'
                    : 'glass-card text-theme-muted hover:text-white border border-cyan-500/20'
                }`}
              >
                <ShieldCheck size={14} /> Security Pro
              </button>
              <button
                onClick={() => {
                  setPersonaMode('developer');
                  setActiveTab('development');
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  personaMode === 'developer'
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-105'
                    : 'glass-card text-theme-muted hover:text-white border border-cyan-500/20'
                }`}
              >
                <Code size={14} /> Web Dev Mascot
              </button>
            </div>

            <p className="text-xs text-theme-muted/80 mt-3 text-center">
              Hover &amp; move cursor over avatar to experience true 3D perspective tilt.
            </p>
          </div>

          {/* Right Column: Professional Narrative & Specializations */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <p className="text-lg leading-relaxed text-theme-muted">
              I'm <strong className="text-theme-heading font-semibold">Ravi Vishnoi</strong>, an IT Security &amp; Network Security Consultant and Full-Stack Developer with <strong className="text-cyan-400 font-semibold">3+ years of experience</strong> spanning cyber defense, web application architecture, ERP systems, and cloud infrastructure. Dedicated to building bulletproof, scalable digital experiences.
            </p>

            {/* Interactive Domain Tabs */}
            <div>
              <div className="flex gap-4 mb-6 border-b pb-2" style={{ borderColor: 'var(--card-border)' }}>
                <button
                  onClick={() => handleTabChange('security')}
                  className={`pb-2 px-2 text-base sm:text-lg font-medium transition-colors relative cursor-pointer ${
                    activeTab === 'security' ? 'text-cyan-400' : 'text-theme-muted hover:text-cyan-300'
                  }`}
                >
                  <ShieldCheck className="inline mr-2" size={19} />
                  Security Defense
                  {activeTab === 'security' && (
                    <motion.div
                      layoutId="tabAboutMerged"
                      className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                    />
                  )}
                </button>
                <button
                  onClick={() => handleTabChange('development')}
                  className={`pb-2 px-2 text-base sm:text-lg font-medium transition-colors relative cursor-pointer ${
                    activeTab === 'development' ? 'text-cyan-400' : 'text-theme-muted hover:text-cyan-300'
                  }`}
                >
                  <Code className="inline mr-2" size={19} />
                  Web Development
                  {activeTab === 'development' && (
                    <motion.div
                      layoutId="tabAboutMerged"
                      className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                    />
                  )}
                </button>
                <button
                  onClick={() => handleTabChange('motion')}
                  className={`pb-2 px-2 text-base sm:text-lg font-medium transition-colors relative cursor-pointer ${
                    activeTab === 'motion' ? 'text-cyan-400' : 'text-theme-muted hover:text-cyan-300'
                  }`}
                >
                  <Film className="inline mr-2" size={19} />
                  Motion Graphics
                  {activeTab === 'motion' && (
                    <motion.div
                      layoutId="tabAboutMerged"
                      className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                    />
                  )}
                </button>
              </div>

              {/* Dynamic Tab Content */}
              <div className="min-h-[90px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'security' && (
                    <motion.p
                      key="sec"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="leading-relaxed text-theme-muted"
                    >
                      Specialized in Vulnerability Assessment and Penetration Testing (VAPT), firewall rule hardening, user access governance, endpoint security monitoring, and network telemetry analysis using Nmap, Nessus, and Metasploit.
                    </motion.p>
                  )}
                  {activeTab === 'development' && (
                    <motion.p
                      key="dev"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="leading-relaxed text-theme-muted"
                    >
                      Building robust, high-performance web applications and internal ERP systems. Proficient in React, modern JavaScript/TypeScript, PHP, REST APIs, Tailwind CSS, and secure database architecture.
                    </motion.p>
                  )}
                  {activeTab === 'motion' && (
                    <motion.p
                      key="mot"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="leading-relaxed text-theme-muted"
                    >
                      Crafting delightful UI animations, interactive 3D elements, kinetic typography, and tech product walkthroughs using Framer Motion, Figma, After Effects, and Premiere Pro.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Stat Counters Grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t"
              style={{ borderColor: 'var(--card-border)' }}
            >
              <div className="glass-card p-4 text-center rounded-xl group hover:-translate-y-1 transition-transform">
                <div className="text-3xl font-bold text-cyan-400 mb-1 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                  3+
                </div>
                <div className="text-sm font-semibold text-theme-muted">Years Experience</div>
              </div>
              <div className="glass-card p-4 text-center rounded-xl group hover:-translate-y-1 transition-transform">
                <div className="text-3xl font-bold text-cyan-400 mb-1 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                  7+
                </div>
                <div className="text-sm font-semibold text-theme-muted">Industry Certs</div>
              </div>
              <div className="glass-card p-4 text-center rounded-xl group hover:-translate-y-1 transition-transform">
                <div className="text-3xl font-bold text-cyan-400 mb-1 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                  100%
                </div>
                <div className="text-sm font-semibold text-theme-muted">Commitment</div>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`${import.meta.env.BASE_URL}Ravi_Vishnoi_CV.pdf`}
                onClick={(e) => {
                  e.preventDefault();
                  const cvPath = `${import.meta.env.BASE_URL}Ravi_Vishnoi_CV.pdf`;
                  window.open(cvPath, '_blank', 'noopener,noreferrer');
                  const link = document.createElement('a');
                  link.href = cvPath;
                  link.setAttribute('download', 'Ravi_Vishnoi_CV.pdf');
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-all group shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] cursor-pointer"
              >
                <Download size={18} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
                Download CV
              </a>

              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-950/40 transition-all cursor-pointer"
              >
                View Projects <ExternalLink size={15} />
              </a>

              <a
                href="#tools"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 transition-all cursor-pointer"
              >
                <Terminal size={15} /> Security Tools
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
