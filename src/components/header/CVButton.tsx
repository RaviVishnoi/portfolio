import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

export default function CVButton() {
  const cvPath = `${import.meta.env.BASE_URL}Ravi_Vishnoi_CV.pdf`;

  const handleDownloadAndOpen = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // 1. Open PDF in a new tab
    window.open(cvPath, '_blank', 'noopener,noreferrer');

    // 2. Trigger direct download
    const link = document.createElement('a');
    link.href = cvPath;
    link.setAttribute('download', 'Ravi_Vishnoi_CV.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.a
      href={cvPath}
      onClick={handleDownloadAndOpen}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full overflow-hidden shadow-sm transition-shadow hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--accent)',
      }}
    >
      {/* Glow Effect Background */}
      <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors duration-300"></div>

      <span className="relative z-10 flex items-center gap-2">
        <Download size={16} className="text-cyan-500 group-hover:-translate-y-0.5 transition-transform duration-300 hidden sm:block" />
        <span className="hidden sm:inline font-bold tracking-wide text-cyan-400">
          CV
        </span>
        <span className="sm:hidden font-bold tracking-wide text-xs text-cyan-400">
          CV
        </span>
      </span>
    </motion.a>
  );
}
