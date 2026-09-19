import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const GithubIcon = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17a5.5 5.5 0 0 0-1.5-3.8c.16-.38.65-2.02-.14-4.75 0 0-1.1-.35-3.6 1.3a12.5 12.5 0 0 0-6.6 0c-2.5-1.65-3.6-1.3-3.6-1.3-.79 2.73-.3 4.37-.14 4.75a5.5 5.5 0 0 0-1.5 3.8c0 5.76 3.35 6.78 6.5 7.17a4.8 4.8 0 0 0-1 3.03V22"></path>
    <path d="M9 20c-5 1.5-5-2.5-7-3"></path>
  </svg>
);

const LinkedinIcon = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function SocialLinks() {
  const socials = [
    { name: 'GitHub', icon: GithubIcon, href: 'https://github.com/RaviVishnoi', color: 'hover:text-white hover:border-white hover:bg-white/10' },
    { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://linkedin.com/in/ravivishnoi', color: 'hover:text-[#0077b5] hover:border-[#0077b5] hover:bg-[#0077b5]/10' },
    { name: 'Email', icon: Mail, href: 'mailto:ravivishnoi57@gmail.com', color: 'hover:text-red-400 hover:border-red-400 hover:bg-red-400/10' },
  ];

  return (
    <div className="flex items-center gap-3 border-l pl-4 lg:pl-6" style={{ borderColor: 'var(--card-border)' }}>
      {socials.map((social) => (
        <motion.a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-full border border-transparent transition-all duration-300 ${social.color}`}
          style={{ color: 'var(--text-muted)' }}
          aria-label={social.name}
        >
          <social.icon size={18} />
        </motion.a>
      ))}
    </div>
  );
}
