import { motion } from 'framer-motion';

export default function GitHubProjectLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
          className="glass-card rounded-2xl overflow-hidden flex flex-col min-h-[380px]"
          style={{ border: '1px solid var(--card-border)' }}
        >
          {/* Skeleton Image Area */}
          <div className="relative aspect-video bg-[var(--card-border)]/50 animate-pulse"></div>
          
          <div className="p-6 flex flex-col flex-grow gap-4">
            {/* Title Skeleton */}
            <div className="h-6 bg-[var(--card-border)] rounded w-3/4 animate-pulse"></div>
            
            {/* Description Skeleton */}
            <div className="space-y-2 flex-grow">
              <div className="h-4 bg-[var(--card-border)]/50 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-[var(--card-border)]/50 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-[var(--card-border)]/50 rounded w-4/6 animate-pulse"></div>
            </div>
            
            {/* Badges Skeleton */}
            <div className="flex gap-2">
              <div className="h-6 bg-[var(--card-border)]/50 rounded w-16 animate-pulse"></div>
              <div className="h-6 bg-[var(--card-border)]/50 rounded w-16 animate-pulse"></div>
            </div>
            
            {/* Footer Skeleton */}
            <div className="h-8 bg-[var(--card-border)]/50 rounded w-32 mt-auto animate-pulse"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
