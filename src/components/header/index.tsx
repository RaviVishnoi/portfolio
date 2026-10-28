import { useState, useEffect } from 'react';
import Logo from './Logo';
import DesktopNavigation, { navLinks } from './DesktopNavigation';
import SocialLinks from './SocialLinks';
import CVButton from './CVButton';
import MobileMenuButton from './MobileMenuButton';
import MobileNavigation from './MobileNavigation';
import ThemeController from '../ui/ThemeController';
import { Search } from 'lucide-react';

interface HeaderProps {
  onOpenPalette?: () => void;
}

export default function Header({ onOpenPalette }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle Scroll and active section spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', ...navLinks.map(l => l.href.substring(1))];
    
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out ${
        isScrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 w-full">
        <div 
          className={`relative flex items-center justify-between transition-all duration-500 ease-in-out ${
            isScrolled 
              ? 'px-4 lg:px-6 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] border' 
              : 'px-0 py-0 border-transparent'
          }`}
          style={isScrolled ? {
            background: 'var(--card-bg)',
            backdropFilter: 'blur(16px)',
            borderColor: 'var(--card-border)'
          } : {}}
        >
          {/* Subtle Inner Glow on Scroll */}
          {isScrolled && (
            <div className="absolute inset-0 rounded-2xl bg-cyan-500/5 pointer-events-none mix-blend-overlay"></div>
          )}

          <div className="relative z-10 flex items-center w-full justify-between">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-3 h-full ml-auto">
              <DesktopNavigation activeSection={activeSection} />
              <div className="flex items-center gap-2 lg:gap-4 ml-1">
                <SocialLinks />
                <div className="border-l pl-2 lg:pl-4 flex items-center gap-2" style={{ borderColor: 'var(--card-border)' }}>
                  {/* Quick Search / Command Palette trigger */}
                  <button
                    onClick={onOpenPalette}
                    title="Search & Commands (Ctrl + K)"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono font-medium glass-card border border-cyan-500/25 text-theme-muted hover:text-cyan-400 hover:border-cyan-400/50 transition-all cursor-pointer shadow-sm group"
                  >
                    <Search size={13} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span className="hidden xl:inline text-[10px] opacity-75 font-semibold">Ctrl+K</span>
                  </button>

                  <ThemeController />
                  <CVButton />
                </div>
              </div>
            </div>

            {/* Mobile Navigation Toggle & Theme */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={onOpenPalette}
                title="Search & Commands"
                className="p-2 rounded-xl text-theme-muted hover:text-cyan-400 glass-card border border-cyan-500/25 cursor-pointer"
              >
                <Search size={16} className="text-cyan-400" />
              </button>
              <ThemeController />
              <MobileMenuButton isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />
            </div>
          </div>
          
          {/* Mobile Navigation Dropdown */}
          <MobileNavigation isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} activeSection={activeSection} />
          
        </div>
      </div>
    </header>
  );
}

