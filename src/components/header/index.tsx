import { useState, useEffect } from 'react';
import Logo from './Logo';
import DesktopNavigation, { navLinks } from './DesktopNavigation';
import SocialLinks from './SocialLinks';
import CVButton from './CVButton';
import MobileMenuButton from './MobileMenuButton';
import MobileNavigation from './MobileNavigation';
import ThemeController from '../ui/ThemeController';

export default function Header() {
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
    const observers = new Map();
    
    // Setup intersection observers for all nav targets
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Triggers when section is roughly in the middle
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
      <div 
        className={`max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-500 ease-in-out ${
          isScrolled ? 'w-[95%] lg:w-full' : 'w-full'
        }`}
      >
        <div 
          className={`relative flex items-center justify-between transition-all duration-500 ease-in-out ${
            isScrolled 
              ? 'px-6 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] border' 
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
            <div className="hidden md:flex items-center gap-6 lg:gap-8 h-full">
              <DesktopNavigation activeSection={activeSection} />
              <div className="flex items-center gap-4 lg:gap-6">
                <SocialLinks />
                <div className="border-l pl-4 lg:pl-6 flex items-center gap-4" style={{ borderColor: 'var(--card-border)' }}>
                  <ThemeController />
                  <CVButton />
                </div>
              </div>
            </div>

            {/* Mobile Navigation Toggle & Theme */}
            <div className="flex md:hidden items-center gap-3">
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
