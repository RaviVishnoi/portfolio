import { motion } from 'framer-motion';
import { GitBranch, Briefcase, Mail } from 'lucide-react';

export default function FooterSocials() {
  const socials = [
    { name: 'GitHub', icon: GitBranch, href: 'https://github.com/RaviVishnoi', color: 'hover:text-white hover:border-white hover:bg-white/10' },
    { name: 'LinkedIn', icon: Briefcase, href: '#', color: 'hover:text-blue-500 hover:border-blue-500 hover:bg-blue-500/10' },
    { name: 'Email', icon: Mail, href: 'mailto:ravivishnoi@example.com', color: 'hover:text-red-400 hover:border-red-400 hover:bg-red-400/10' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Connect</h4>
      <div className="flex gap-3">
        {socials.map((social, i) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
            className={`p-3 rounded-xl border flex items-center justify-center transition-all duration-300 group shadow-lg ${social.color}`}
            style={{ 
              background: 'var(--card-bg)', 
              borderColor: 'var(--card-border)',
              color: 'var(--text-muted)'
            }}
            aria-label={social.name}
          >
            <social.icon size={20} className="group-hover:scale-110 transition-transform duration-300" />
          </motion.a>
        ))}
      </div>
    </div>
  );
}
