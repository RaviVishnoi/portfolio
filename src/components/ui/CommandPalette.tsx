import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Command,
  ArrowRight,
  Download,
  Shield,
  Code,
  Terminal,
  FolderGit2,
  Award,
  GraduationCap,
  Mail,
  Sun,
  Moon,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { useTimeTheme } from '../../context/TimeThemeContext';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Navigation' | 'Actions' | 'Social' | 'Theme';
  icon: React.ComponentType<{ size?: number; className?: string }>;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { setMode } = useTimeTheme();

  // Scroll to target element with header offset
  const scrollTo = (hash: string) => {
    onClose();
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('ravivishnoi.sec@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCV = () => {
    onClose();
    const cvPath = `${import.meta.env.BASE_URL}Ravi_Vishnoi_CV.pdf`;
    window.open(cvPath, '_blank', 'noopener,noreferrer');
    const link = document.createElement('a');
    link.href = cvPath;
    link.setAttribute('download', 'Ravi_Vishnoi_CV.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-about',
      title: 'About Me & 3D Interactive Mascot',
      subtitle: 'Biography, 3D tilt avatar, and core competencies',
      category: 'Navigation',
      icon: Sparkles,
      action: () => scrollTo('#about'),
      keywords: ['about', 'bio', 'avatar', 'mascot', '3d', 'profile', 'ravi'],
    },
    {
      id: 'nav-skills',
      title: 'Technical Arsenal & Skills',
      subtitle: 'Forensics, cybersecurity, programming, and motion tools',
      category: 'Navigation',
      icon: Code,
      action: () => scrollTo('#skills'),
      keywords: ['skills', 'tools', 'languages', 'nmap', 'nessus', 'react', 'php'],
    },
    {
      id: 'nav-security',
      title: 'Cyber Security Focus',
      subtitle: 'VAPT, network defense, hardening, and monitoring',
      category: 'Navigation',
      icon: Shield,
      action: () => scrollTo('#cyber-security'),
      keywords: ['security', 'vapt', 'firewall', 'pentest', 'audit', 'defense'],
    },
    {
      id: 'nav-tools',
      title: 'Security & Web Tools Hub',
      subtitle: 'Interactive tools suite and live network utilities',
      category: 'Navigation',
      icon: Terminal,
      action: () => scrollTo('#tools'),
      keywords: ['tools', 'terminal', 'utilities', 'wireshark', 'metasploit'],
    },
    {
      id: 'nav-projects',
      title: 'Projects & Case Studies',
      subtitle: 'Web applications, security scripts, and live repos',
      category: 'Navigation',
      icon: FolderGit2,
      action: () => scrollTo('#projects'),
      keywords: ['projects', 'work', 'code', 'github', 'apps', 'portfolio'],
    },
    {
      id: 'nav-experience',
      title: 'Work Experience',
      subtitle: 'Career timeline, IT support, and consultant roles',
      category: 'Navigation',
      icon: ArrowRight,
      action: () => scrollTo('#experience'),
      keywords: ['experience', 'work', 'career', 'jobs', 'roles'],
    },
    {
      id: 'nav-certs',
      title: 'Certifications',
      subtitle: 'Google AI, CEH Master, CND, CyberOps & credentials',
      category: 'Navigation',
      icon: Award,
      action: () => scrollTo('#certifications'),
      keywords: ['certifications', 'google', 'ai', 'gemini', 'ceh', 'cnd', 'cyberops', 'credentials', 'certs'],
    },
    {
      id: 'nav-education',
      title: 'Education',
      subtitle: 'Academic background and specialized cyber training',
      category: 'Navigation',
      icon: GraduationCap,
      action: () => scrollTo('#education'),
      keywords: ['education', 'degree', 'college', 'studies'],
    },
    {
      id: 'nav-contact',
      title: 'Contact & Hire',
      subtitle: 'Get in touch for security consulting or web projects',
      category: 'Navigation',
      icon: Mail,
      action: () => scrollTo('#contact'),
      keywords: ['contact', 'hire', 'email', 'message', 'phone'],
    },

    // Actions
    {
      id: 'act-cv',
      title: 'Download Official CV',
      subtitle: 'Get Ravi Vishnoi PDF resume directly',
      category: 'Actions',
      icon: Download,
      action: downloadCV,
      keywords: ['cv', 'resume', 'download', 'pdf', 'bio'],
    },
    {
      id: 'act-email',
      title: copied ? 'Email Copied!' : 'Copy Direct Email Address',
      subtitle: 'ravivishnoi.sec@gmail.com',
      category: 'Actions',
      icon: copied ? Check : Copy,
      action: copyEmail,
      keywords: ['email', 'copy', 'mail', 'write', 'reach'],
    },

    // Themes
    {
      id: 'theme-night',
      title: 'Switch Theme: Night (Cyber Azure)',
      subtitle: 'Deep dark cyberpunk mode with neon cyan highlights',
      category: 'Theme',
      icon: Moon,
      action: () => {
        setMode('night');
        onClose();
      },
      keywords: ['theme', 'night', 'dark', 'azure', 'blue', 'cyber'],
    },
    {
      id: 'theme-morning',
      title: 'Switch Theme: Morning (Clean Sky)',
      subtitle: 'Bright, fresh daylight mode with electric blue contrast',
      category: 'Theme',
      icon: Sun,
      action: () => {
        setMode('morning');
        onClose();
      },
      keywords: ['theme', 'morning', 'light', 'white', 'day'],
    },
    {
      id: 'theme-evening',
      title: 'Switch Theme: Evening (Crimson Sunset)',
      subtitle: 'Atmospheric crimson and coral aesthetic',
      category: 'Theme',
      icon: Sparkles,
      action: () => {
        setMode('evening');
        onClose();
      },
      keywords: ['theme', 'evening', 'crimson', 'sunset', 'red'],
    },
  ];

  // Filter commands by search query
  const filtered = commands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    const titleMatch = cmd.title.toLowerCase().includes(q);
    const subtitleMatch = cmd.subtitle.toLowerCase().includes(q);
    const keywordMatch = cmd.keywords?.some((k) => k.toLowerCase().includes(q));
    return titleMatch || subtitleMatch || keywordMatch;
  });

  // Keep index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filtered, onClose]);

  // Scroll active item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const activeEl = list.children[selectedIndex] as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl glass-card rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(6,182,212,0.25)] border border-cyan-500/30 text-slate-100 z-10"
            style={{ background: 'var(--card-bg)' }}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-cyan-500/20 bg-slate-900/50">
              <Search size={18} className="text-cyan-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a section, skill, tool, or action..."
                className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
              />
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                ESC
              </span>
            </div>

            {/* Results List */}
            <div
              ref={listRef}
              className="max-h-[380px] overflow-y-auto p-2 divide-y divide-white/5 scrollbar-thin scrollbar-thumb-cyan-500/30"
            >
              {filtered.length === 0 ? (
                <div className="py-12 text-center text-sm text-theme-muted">
                  <p>No matching commands found for "{query}"</p>
                  <p className="text-xs text-slate-500 mt-1">Try searching for "security", "skills", "projects", or "cv"</p>
                </div>
              ) : (
                filtered.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/20 text-cyan-200 shadow-sm border border-cyan-500/30'
                          : 'text-slate-300 hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-cyan-500 text-slate-950 font-bold'
                              : 'bg-slate-800 text-cyan-400'
                          }`}
                        >
                          <Icon size={16} />
                        </div>
                        <div>
                          <div className="font-semibold text-xs sm:text-sm text-white">
                            {cmd.title}
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">
                            {cmd.subtitle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-white/5 text-slate-400 hidden sm:inline-block">
                          {cmd.category}
                        </span>
                        {isSelected && (
                          <ArrowRight size={14} className="text-cyan-400 animate-pulse" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Keyboard Hint Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-cyan-500/20 bg-slate-950/70 text-[11px] text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-mono">
                  <span className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">↑↓</span> Navigate
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <span className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">↵</span> Select
                </span>
              </div>
              <div className="text-cyan-400/90 font-mono text-[10px]">
                Command Center
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
