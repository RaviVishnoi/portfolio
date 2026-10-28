import { motion } from 'framer-motion';

export default function Logo() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.a
      href="#home"
      onClick={handleScrollToTop}
      className="flex items-center gap-3 cursor-pointer select-none outline-none group"
    >
      {/* SVG Vector Logo Mark */}
      <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12">
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Hexagon Shield */}
          <polygon 
            points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" 
            fill="url(#logo-gradient)" 
            className="opacity-10 group-hover:opacity-30 transition-opacity duration-300"
          />
          <polygon 
            points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" 
            fill="none" 
            stroke="url(#logo-gradient)" 
            strokeWidth="4"
            filter="url(#glow)"
          />

          {/* Stylized RV */}
          <g stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text)' }}>
            {/* Letter R */}
            <path d="M 30 70 L 30 35 L 42 35 C 48 35 48 50 42 50 L 30 50 M 38 50 L 46 70" fill="none" />
            {/* Letter V */}
            <path d="M 54 35 L 64 70 L 74 35" fill="none" />
          </g>
        </svg>
      </div>

      {/* Text Section - Adaptive for Light/Dark Mode */}
      <div className="flex flex-col justify-center leading-tight">
        <span className="text-base md:text-[1.1rem] font-bold tracking-tight flex items-center gap-1.5" style={{ color: 'var(--text)' }}>
          Ravi
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 drop-shadow-sm">
            Vishnoi
          </span>
        </span>
        
        {/* Cyber Security Subtitle */}
        <div className="flex items-center gap-2 mt-0.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
          </span>
          <span className="text-[9px] md:text-[10.5px] tracking-[0.25em] font-mono uppercase font-semibold" style={{ color: 'var(--text-muted)' }}>
            Cyber Security
          </span>
        </div>
      </div>
    </motion.a>
  );
}