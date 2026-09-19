import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuButtonProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function MobileMenuButton({ isOpen, setIsOpen }: MobileMenuButtonProps) {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="md:hidden relative z-50 p-2 rounded-full border shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
      style={{ 
        background: 'var(--card-bg)', 
        borderColor: 'var(--card-border)',
        color: 'var(--text)'
      }}
      aria-label="Toggle navigation menu"
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <X size={24} className="text-cyan-400" />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <Menu size={24} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
