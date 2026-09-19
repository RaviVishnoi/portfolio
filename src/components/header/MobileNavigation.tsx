import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import CVButton from './CVButton';
import { navLinks } from './DesktopNavigation';

const GithubIcon = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17a5.5 5.5 0 0 0-1.5-3.8c.16-.38.65-2.02-.14-4.75 0 0-1.1-.35-3.6 1.3a12.5 12.5 0 0 0-6.6 0c-2.5-1.65-3.6-1.3-3.6-1.3-.79 2.73-.3 4.37-.14 4.75a5.5 5.5 0 0 0-1.5 3.8c0 5.76 3.35 6.78 6.5 7.17a4.8 4.8 0 0 0-1 3.03V22"></path><path d="M9 20c-5 1.5-5-2.5-7-3"></path></svg>
);
const LinkedinIcon = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

interface MobileNavigationProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeSection: string;
}

export default function MobileNavigation({ isOpen, setIsOpen, activeSection }: MobileNavigationProps) {
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150); // slight delay to allow menu to close smoothly before scrolling
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20, scaleY: 0.95 }}
          animate={{ opacity: 1, y: 0, scaleY: 1 }}
          exit={{ opacity: 0, y: -20, scaleY: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="md:hidden absolute top-full left-0 w-full overflow-hidden origin-top shadow-[0_20px_40px_rgba(0,0,0,0.5)] border-b rounded-b-2xl"
          style={{ 
            background: 'var(--card-bg)', 
            backdropFilter: 'blur(16px)',
            borderColor: 'var(--card-border)' 
          }}
          id="mobile-navigation"
        >
          <div className="px-6 py-8 flex flex-col gap-6">
            
            {/* Links */}
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a 
                      href={link.href} 
                      onClick={(e) => handleClick(e, link.href)}
                      className={`block py-3 px-4 rounded-xl text-lg font-bold transition-all ${
                        isActive ? 'bg-cyan-500/10 text-cyan-400' : 'hover:bg-[var(--card-bg-hover)]'
                      }`}
                      style={{ color: isActive ? 'var(--accent)' : 'var(--text)' }}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
            
            <div className="h-px w-full" style={{ background: 'var(--card-border)' }}></div>

            {/* Socials & CV */}
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <a href="https://github.com/RaviVishnoi" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[var(--bg)] border transition-colors hover:text-white" style={{ borderColor: 'var(--card-border)', color: 'var(--text-muted)' }} aria-label="GitHub">
                  <GithubIcon size={20} />
                </a>
                <a href="https://linkedin.com/in/ravivishnoi" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[var(--bg)] border transition-colors hover:text-[#0077b5]" style={{ borderColor: 'var(--card-border)', color: 'var(--text-muted)' }} aria-label="LinkedIn">
                  <LinkedinIcon size={20} />
                </a>
                <a href="mailto:ravivishnoi57@gmail.com" className="p-3 rounded-full bg-[var(--bg)] border transition-colors hover:text-red-400" style={{ borderColor: 'var(--card-border)', color: 'var(--text-muted)' }} aria-label="Email">
                  <Mail size={20} />
                </a>
              </div>
              
              <CVButton />
            </div>

          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
