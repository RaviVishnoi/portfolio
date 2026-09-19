import { motion } from 'framer-motion';
import { manualProjects } from '../projects/types';

export default function FooterProjects() {
  // Select a few specific projects based on the user's instructions
  const featuredTitles = ['StoreToDoor', 'JECRC Back Result Portal', 'Network Vulnerability Scanner', 'Secure Password Manager'];
  
  const footerProjects = manualProjects
    .filter(p => featuredTitles.includes(p.title) || p.featured)
    .slice(0, 5); // Limit to 5

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Featured Work</h4>
      <div className="flex flex-col gap-2">
        {footerProjects.map((project, i) => (
          <motion.a
            key={project.id}
            href="#projects"
            onClick={handleClick}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group flex items-center gap-3 text-theme-muted hover:text-cyan-400 text-sm font-medium transition-colors"
          >
            <span className="text-[10px] text-cyan-500/50 group-hover:text-cyan-400 transition-colors">▶</span>
            <span className="truncate group-hover:translate-x-1 transition-transform duration-300">{project.title}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
