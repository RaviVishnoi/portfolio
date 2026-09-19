import { Project } from './types';
import { GitBranch, Globe, Shield, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectStatsProps {
  projects: Project[];
}

export default function ProjectStats({ projects }: ProjectStatsProps) {
  const total = projects.length;
  const github = projects.filter(p => p.source === 'github').length;
  const web = projects.filter(p => p.category.includes('web')).length;
  const security = projects.filter(p => p.category.includes('security') || p.category.includes('vapt')).length;

  const stats = [
    { label: 'Total Projects', value: total, icon: Code2, color: 'text-cyan-400' },
    { label: 'GitHub Repos', value: github, icon: GitBranch, color: 'text-gray-300' },
    { label: 'Web Apps', value: web, icon: Globe, color: 'text-blue-400' },
    { label: 'Security Tools', value: security, icon: Shield, color: 'text-red-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass-card p-4 rounded-xl flex items-center gap-4 transition-transform hover:-translate-y-1"
          style={{ border: '1px solid var(--card-border)' }}
        >
          <div className={`p-3 rounded-lg bg-[var(--bg)] border ${stat.color} shadow-sm`} style={{ borderColor: 'var(--card-border)' }}>
            <stat.icon size={24} />
          </div>
          <div>
            <div className="text-2xl font-black" style={{ color: 'var(--text)' }}>
              {stat.value}
            </div>
            <div className="text-xs font-semibold text-theme-muted uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
