import { motion } from 'framer-motion';

export default function FooterBrand() {
  return (
    <div className="flex flex-col gap-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <a href="#home" className="text-3xl font-black tracking-tighter hover:text-cyan-400 transition-colors inline-flex flex-col">
          <span className="flex items-center gap-1">
            <span className="text-cyan-500">&lt;</span>
            <span style={{ color: 'var(--text)' }}>RAVI_VISHNOI</span>
            <span className="text-cyan-500">/&gt;</span>
          </span>
          <div className="h-[2px] w-1/3 bg-cyan-500 rounded-full mt-1"></div>
        </a>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <p className="text-sm font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase">
          Cyber Security | VAPT | Full Stack Development
        </p>
        <p className="mt-2 text-sm text-theme-muted max-w-sm leading-relaxed">
          Building secure, scalable, and interactive digital experiences.
        </p>
      </motion.div>
    </div>
  );
}
