import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ToolItem } from './types';

interface ToolCardProps {
  tool: ToolItem;
  onOpen: (tool: ToolItem) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onOpen }) => {
  const Icon = tool.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={() => onOpen(tool)}
      className="group relative flex flex-col justify-between p-6 rounded-2xl glass-card transition-all duration-300 border hover:border-cyan-500/50 cursor-pointer overflow-hidden shadow-sm hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)]"
      style={{
        background: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
      }}
    >
      {/* Subtle hover gradient bloom */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/5 group-hover:to-cyan-500/10 transition-colors duration-300 pointer-events-none" />

      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-slate-900 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300">
            <Icon size={24} />
          </div>

          <div className="flex items-center gap-2">
            {tool.badge && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {tool.badge}
              </span>
            )}
            <div className="p-1.5 rounded-lg text-theme-muted group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>

        <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
          {tool.title}
        </h4>

        <p className="text-xs text-theme-muted leading-relaxed line-clamp-3 mb-4">
          {tool.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-slate-400 group-hover:text-slate-300 transition-colors"
          >
            #{tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
