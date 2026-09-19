import { motion } from 'framer-motion';

export default function Logo() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div 
      className="flex flex-col group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <a href="#home" onClick={handleScrollToTop} className="text-2xl font-bold tracking-tighter relative">
        <span className="text-cyan-500 group-hover:text-cyan-400 transition-colors drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">&lt;</span>
        <span style={{ color: 'var(--text)' }} className="transition-colors group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">RAVI_VISHNOI</span>
        <span className="text-cyan-500 group-hover:text-cyan-400 transition-colors drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">/&gt;</span>
      </a>
      <span className="text-[10px] sm:text-xs text-cyan-500/80 mt-1 uppercase tracking-widest hidden sm:block font-medium drop-shadow-sm group-hover:text-cyan-400 transition-colors">
        IT Security &amp; Network Security Consultant
      </span>
    </motion.div>
  );
}
