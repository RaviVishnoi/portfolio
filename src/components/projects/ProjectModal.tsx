import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, GitBranch, Star, GitFork, Calendar, Clock, FolderGit2, Monitor, Shield, Database } from 'lucide-react';
import { Project } from './types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getFallbackImage = () => {
    if (project.category.includes('web')) return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';
    if (project.category.includes('security')) return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop';
    if (project.category.includes('erp')) return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop';
    return 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop';
  };
  const imgSource = project.image || getFallbackImage();
  const Icon = project.icon || (project.source === 'github' ? FolderGit2 : (project.category.includes('web') ? Monitor : (project.category.includes('security') ? Shield : Database)));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl overflow-hidden rounded-2xl flex flex-col shadow-2xl my-auto z-10"
          style={{ background: 'var(--bg)', border: '1px solid var(--card-border)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image */}
          <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-black">
            <img src={imgSource} alt={project.title} className="w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent" />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black p-2 rounded-full text-white transition-colors backdrop-blur-md border border-white/20 z-20"
            >
              <X size={20} />
            </button>
            <div className="absolute bottom-4 left-6 sm:left-8 flex items-end gap-4 z-20">
              <div className="p-3 bg-cyan-500/20 backdrop-blur-md rounded-xl border border-cyan-500/30 text-cyan-400 shadow-lg">
                <Icon size={32} />
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white drop-shadow-md pb-1">{project.title}</h3>
            </div>
          </div>
          
          <div className="p-6 sm:p-8">
            
            {/* GitHub Stats Row */}
            {project.source === 'github' && (
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 p-4 rounded-xl bg-[var(--card-bg)] border" style={{ borderColor: 'var(--card-border)' }}>
                {project.language && (
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></span>
                    <span style={{ color: 'var(--text)' }}>{project.language}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-sm font-semibold text-yellow-500">
                  <Star size={16} /> {project.stars || 0} Stars
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-blue-400">
                  <GitFork size={16} /> {project.forks || 0} Forks
                </div>
                {project.updated_at && (
                  <div className="flex items-center gap-1.5 text-sm text-theme-muted ml-auto">
                    <Clock size={14} /> Updated: {formatDate(project.updated_at)}
                  </div>
                )}
              </div>
            )}

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span key={t} className="text-sm px-3 py-1 rounded-full border shadow-sm" style={{ color: 'var(--text)', borderColor: 'var(--card-border)', background: 'var(--card-bg)' }}>
                  {t}
                </span>
              ))}
            </div>
            
            {/* Description */}
            <div className="text-theme-muted leading-relaxed mb-8 space-y-4">
              <p className="text-lg font-medium" style={{ color: 'var(--text)' }}>{project.description}</p>
              <p>{project.fullDescription}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-6 border-t" style={{ borderColor: 'var(--card-border)' }}>
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-full transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  <ExternalLink size={18} /> Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-2.5 glass-card hover:bg-white/5 rounded-full transition-all font-medium border" style={{ color: 'var(--text)', borderColor: 'var(--card-border)' }}>
                  <GitBranch size={18} /> View Repository
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
