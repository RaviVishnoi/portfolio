import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimeTheme, ThemeMode, TimePeriod } from '../../context/TimeThemeContext';
import { Sun, CloudSun, Sunset, Moon, Clock } from 'lucide-react';

const options: { value: ThemeMode; label: string; icon: React.FC<{size:number, className?:string}> }[] = [
  { value: 'auto', label: 'Auto (Time)', icon: Clock },
  { value: 'morning', label: 'Morning', icon: Sun },
  { value: 'afternoon', label: 'Afternoon', icon: CloudSun },
  { value: 'evening', label: 'Sunset', icon: Sunset },
  { value: 'night', label: 'Night', icon: Moon },
];

export default function ThemeController() {
  const { mode, activePeriod, setMode } = useTimeTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getActiveIcon = () => {
    if (mode === 'auto') {
      return options.find(o => o.value === activePeriod)?.icon || Clock;
    }
    return options.find(o => o.value === mode)?.icon || Clock;
  };

  const ActiveIcon = getActiveIcon();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group p-2 sm:p-2.5 rounded-full border transition-all duration-300"
        style={{
          background: 'var(--bg)',
          color: 'var(--text-muted)',
          borderColor: isOpen ? 'var(--accent)' : 'var(--card-border)',
        }}
        aria-label="Change Theme Environment"
      >
        <ActiveIcon size={18} className="group-hover:text-[var(--accent)] transition-colors" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-40 rounded-xl overflow-hidden shadow-2xl border"
            style={{
              background: 'var(--card-bg)',
              borderColor: 'var(--card-border)',
              backdropFilter: 'blur(16px)'
            }}
          >
            <div className="flex flex-col py-1">
              {options.map((opt) => {
                const isSelected = mode === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setMode(opt.value);
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors text-left"
                    style={{
                      color: isSelected ? 'var(--accent)' : 'var(--text)',
                      background: isSelected ? 'var(--card-bg-hover)' : 'transparent',
                    }}
                  >
                    <opt.icon size={16} />
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
