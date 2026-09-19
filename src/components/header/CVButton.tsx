import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

export default function CVButton() {
  return (
    <motion.a 
      href="/Ravi_Vishnoi_CV.pdf" 
      download="Ravi_Vishnoi_CV.pdf"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full overflow-hidden shadow-sm transition-shadow hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--accent)',
      }}
    >
      {/* Glow Effect Background */}
      <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors duration-300"></div>
      
      <span className="relative z-10 flex items-center gap-2">
        <Download size={16} className="text-cyan-500 group-hover:-translate-y-0.5 transition-transform duration-300 hidden sm:block" />
        <span className="hidden sm:inline font-bold tracking-wide text-cyan-400">
          Resume
        </span>
        <span className="sm:hidden font-bold tracking-wide text-xs text-cyan-400">
          Resume
        </span>
      </span>
    </motion.a>
  );
}
