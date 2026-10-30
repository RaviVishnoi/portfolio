import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GitBranch, ExternalLink, Star, GitFork, Monitor, Shield, Database, FolderGit2 } from 'lucide-react';
import { Project } from './types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt state
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    x.set(0);
    y.set(0);
  };

  // Resolve Image
  const getFallbackImage = () => {
    if (project.category.includes('web')) return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';
    if (project.category.includes('security')) return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop';
    if (project.category.includes('erp')) return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop';
    return 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop'; // default tech abstract
  };
  const imgSource = project.image || getFallbackImage();

  // Resolve Icon
  const Icon = project.icon || (project.source === 'github' ? FolderGit2 : (project.category.includes('web') ? Monitor : (project.category.includes('security') ? Shield : Database)));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d",
        border: '1px solid var(--card-border)',
        borderColor: isHovering ? 'var(--accent)' : 'var(--card-border)'
      }}
      className="glass-card rounded-2xl overflow-hidden group flex flex-col cursor-pointer transition-colors duration-500 hover:shadow-[0_15px_30px_rgba(6,182,212,0.15)] relative min-h-[420px]"
    >
      <div className="relative aspect-video overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
        <div className="absolute inset-0 bg-cyan-900/40 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay"></div>
        <img 
          src={imgSource} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
          onError={(e) => { e.currentTarget.src = getFallbackImage(); }}
        />
        
        {/* Source Badge */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          {project.source === 'github' && (
            <div className="bg-black/80 backdrop-blur-md px-2 py-1 rounded text-xs font-semibold border border-white/10 flex items-center gap-1 text-gray-300">
              <GitBranch size={12} /> GitHub
            </div>
          )}
        </div>

        {/* Icon Floating */}
        <motion.div 
          style={{ transform: isHovering ? "translateZ(30px)" : "translateZ(0px)" }}
          className="absolute top-4 right-4 z-20 bg-[var(--card-bg)] backdrop-blur-md p-2 rounded-full border border-white/10 group-hover:border-cyan-500/50 transition-all duration-300 shadow-lg"
        >
          <Icon className="text-cyan-400" size={18} />
        </motion.div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow relative z-10" style={{ transformStyle: "preserve-3d" }}>
        
        <motion.h3 
          style={{ transform: isHovering ? "translateZ(20px)" : "translateZ(0px)" }}
          className="text-xl font-bold mb-2 group-hover:text-cyan-500 transition-colors duration-300"
        >
          {project.title}
        </motion.h3>
        
        <motion.p 
          style={{ transform: isHovering ? "translateZ(10px)" : "translateZ(0px)" }}
          className="text-theme-muted text-sm mb-4 flex-grow line-clamp-3 transition-transform duration-300"
        >
          {project.description}
        </motion.p>
        
        {/* Badges */}
        <motion.div 
          style={{ transform: isHovering ? "translateZ(15px)" : "translateZ(0px)" }}
          className="flex flex-wrap gap-2 mb-4 transition-transform duration-300"
        >
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded border shadow-sm truncate max-w-[120px]" style={{ color: 'var(--accent)', borderColor: 'var(--card-border)', background: 'var(--card-bg)' }}>
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-xs px-2 py-1 rounded border text-theme-muted" style={{ borderColor: 'var(--card-border)', background: 'var(--bg)' }}>
              +{project.tech.length - 3}
            </span>
          )}
        </motion.div>

        {/* Footer Stats / Link */}
        <motion.div 
          style={{ 
            transform: isHovering ? "translateZ(25px)" : "translateZ(0px)",
            borderColor: 'var(--card-border)' 
          }}
          className="mt-auto pt-4 border-t flex items-center justify-between transition-transform duration-300"
        >
          <div className="flex items-center gap-3 text-xs text-theme-muted font-medium">
            {project.stars !== undefined && (
              <span className="flex items-center gap-1 hover:text-yellow-400 transition-colors"><Star size={14} /> {project.stars}</span>
            )}
            {project.forks !== undefined && (
              <span className="flex items-center gap-1 hover:text-blue-400 transition-colors"><GitFork size={14} /> {project.forks}</span>
            )}
            {project.language && (
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-500"></span> {project.language}</span>
            )}
          </div>
          
          <div className="text-cyan-500 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
            View Details <span className="text-lg leading-none">&rarr;</span>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
