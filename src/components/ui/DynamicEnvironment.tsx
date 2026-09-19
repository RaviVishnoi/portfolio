import { motion, AnimatePresence } from 'framer-motion';
import { useTimeTheme } from '../../context/TimeThemeContext';
import { useEffect, useState } from 'react';

export default function DynamicEnvironment() {
  const { activePeriod } = useTimeTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden" style={{ background: 'var(--sky-gradient)', transition: 'background 1.5s ease-in-out' }}>
      
      {/* ─── Night Sky / Stars ─── */}
      <AnimatePresence>
        {activePeriod === 'night' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '80px 80px', opacity: 0.15 }}></div>
            {/* Subtle neon glow */}
            <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-blue-500/10 blur-[120px] rounded-full"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Evening / Sunset ─── */}
      <AnimatePresence>
        {activePeriod === 'evening' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            {/* Warm Sunlight Flare */}
            <div className="absolute top-[20%] left-[15%] w-[40vw] h-[40vw] rounded-full bg-orange-500/10 blur-[120px]"></div>
            {/* Warm City Reflection / Skyline Base */}
            <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-orange-600/15 via-pink-600/5 to-transparent"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Afternoon (Bright & Energetic) ─── */}
      <AnimatePresence>
        {activePeriod === 'afternoon' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            {/* Strong Sunlight */}
            <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-white/40 blur-[140px]"></div>
            {/* Turquoise Ambient Glow */}
            <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#14B8A6]/10 blur-[150px]"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Morning (Soft & Calm) ─── */}
      <AnimatePresence>
        {activePeriod === 'morning' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            {/* Soft Pale Yellow Sunlight */}
            <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#FDE68A]/15 blur-[120px]"></div>
            
            {/* Subtle floating "clouds" (blurred white ellipses) */}
            <motion.div 
              animate={{ x: [0, 50, 0] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-[15%] right-[10%] w-[40vw] h-[15vw] rounded-full bg-white/20 blur-[80px]"
            ></motion.div>
            <motion.div 
              animate={{ x: [0, -40, 0] }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute top-[30%] left-[5%] w-[50vw] h-[20vw] rounded-full bg-white/10 blur-[100px]"
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
