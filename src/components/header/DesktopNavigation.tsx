import { motion } from 'framer-motion';

export const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

interface DesktopNavigationProps {
  activeSection: string;
}

export default function DesktopNavigation({ activeSection }: DesktopNavigationProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      // Offset for fixed header
      const y = target.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <ul className="flex items-center gap-6 lg:gap-8 text-sm font-medium h-full">
      {navLinks.map((link) => {
        const isActive = activeSection === link.href.substring(1);
        return (
          <li key={link.name} className="h-full flex items-center">
            <motion.a 
              href={link.href} 
              onClick={(e) => handleClick(e, link.href)}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative px-2 py-1 transition-colors duration-300 ${
                isActive ? 'text-cyan-400' : 'text-theme-muted hover:text-white'
              }`}
              style={{ color: isActive ? 'var(--accent)' : '' }}
            >
              {link.name}
              
              {/* Active Indicator / Hover Effect */}
              <span className={`absolute -bottom-1.5 left-0 h-[2px] transition-all duration-300 rounded-full ${
                isActive 
                  ? 'w-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]' 
                  : 'w-0 bg-cyan-500/50 hover:w-full'
              }`}></span>
            </motion.a>
          </li>
        );
      })}
    </ul>
  );
}
