import { motion } from 'framer-motion';

export default function FooterNavigation() {
  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Quick Links</h4>
      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
        {links.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="text-theme-muted hover:text-cyan-400 text-sm font-medium transition-colors flex items-center gap-2 group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500 transition-all duration-300"></span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
