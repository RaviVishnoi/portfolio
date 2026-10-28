import { useEffect, useState } from 'react';

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-all duration-75 ease-out relative"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Glowing Leading Head Dot */}
        {scrollProgress > 1 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_14px_#38bdf8]" />
        )}
      </div>
    </div>
  );
}

