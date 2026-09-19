import { motion } from 'framer-motion';

export default function FooterStatus() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-lg mt-4 sm:mt-0"
      style={{ 
        background: 'var(--card-bg)', 
        borderColor: 'var(--card-border)'
      }}
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
      </span>
      <span className="text-sm font-semibold tracking-wide" style={{ color: 'var(--text)' }}>
        Available for Opportunities
      </span>
    </motion.div>
  );
}
