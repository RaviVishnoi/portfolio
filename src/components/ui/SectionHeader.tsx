import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: LucideIcon;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  className = '',
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-14 sm:mb-16 px-4 ${className}`}
    >
      {/* 1. Main Heading (Upar) */}
      <div className="flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight transition-colors">
          <span className="text-gradient drop-shadow-sm">{title}</span>
        </h2>
        {/* Centered Glowing Accent Bar */}
        <div className="h-1 w-16 sm:w-20 mt-3 rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
      </div>

      {/* 2. Badge (Heading ke Niche) */}
      {badge && (
        <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md shadow-md border transition-all section-header-badge">
          {BadgeIcon && <BadgeIcon size={14} className="shrink-0 badge-icon" />}
          <span className="badge-text">{badge}</span>
        </div>
      )}

      {/* 3. Subtitle / Description (Sabse Niche) */}
      {subtitle && (
        <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed section-header-subtitle font-medium">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
