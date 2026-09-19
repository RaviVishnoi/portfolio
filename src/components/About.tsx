import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, Code, Download } from 'lucide-react';

export default function About() {
  const [activeTab, setActiveTab] = useState<'development' | 'security'>('development');

  // 3D Tilt Effect for Profile Image
  const imgRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: 'var(--bg-section)' }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 inline-block relative">
            <span className="text-gradient">About Me</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)]"></div>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-5/12"
            style={{ perspective: 1000 }}
          >
            <motion.div 
              ref={imgRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative group mx-auto max-w-sm will-change-transform"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500" style={{ transform: "translateZ(-20px)" }}></div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] glass-card p-2" style={{ transform: "translateZ(30px)" }}>
                <img 
                  src="/img/ravi vishnoi.png" 
                  alt="Ravi Vishnoi" 
                  className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" 
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"; 
                  }}
                />
                {/* 3D Floating Element Overlay */}
                <div className="absolute bottom-6 right-6 bg-cyan-500/20 backdrop-blur-md p-3 rounded-xl border border-cyan-400/30 text-cyan-300 pointer-events-none shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110" style={{ transform: "translateZ(60px)" }}>
                  <ShieldCheck size={28} />
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-7/12 flex flex-col gap-8"
          >
            <p className="text-lg leading-relaxed text-theme-muted">
              I'm Ravi Vishnoi, an IT Security & Network Security Consultant with 3+ years of experience across Cyber Security, IT Support, Web Development, and ERP Support. Committed to delivering secure, efficient, and reliable IT and network security solutions through continuous learning.
            </p>

            <div>
              <div className="flex gap-4 mb-6 border-b pb-2" style={{ borderColor: 'var(--card-border)' }}>
                <button 
                  onClick={() => setActiveTab('security')}
                  className={`pb-2 px-2 text-lg font-medium transition-colors relative ${activeTab === 'security' ? 'text-cyan-500' : 'text-theme-muted hover:text-cyan-400'}`}
                >
                  <ShieldCheck className="inline mr-2" size={20} />
                  Security
                  {activeTab === 'security' && <motion.div layoutId="tabAbout" className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />}
                </button>
                <button 
                  onClick={() => setActiveTab('development')}
                  className={`pb-2 px-2 text-lg font-medium transition-colors relative ${activeTab === 'development' ? 'text-cyan-500' : 'text-theme-muted hover:text-cyan-400'}`}
                >
                  <Code className="inline mr-2" size={20} />
                  Development
                  {activeTab === 'development' && <motion.div layoutId="tabAbout" className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />}
                </button>
              </div>

              <div className="min-h-[100px]">
                {activeTab === 'security' ? (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="leading-relaxed text-theme-muted">
                    Skilled in Vulnerability Assessment and Penetration Testing (VAPT), firewall policy verification, user access management, endpoint security monitoring, and network security operations with hands-on use of Nmap, Nessus, and Metasploit.
                  </motion.p>
                ) : (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="leading-relaxed text-theme-muted">
                    With experience in web development, I have developed and maintained web applications and internal ERP portals, leveraging languages like PHP, HTML5, CSS3, JS, and SQL.
                  </motion.p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t" style={{ borderColor: 'var(--card-border)' }}>
              <div className="glass-card p-4 text-center rounded-xl group hover:-translate-y-1 transition-transform">
                <div className="text-3xl font-bold text-cyan-500 mb-1 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">3+</div>
                <div className="text-sm font-semibold text-theme-muted">Years Experience</div>
              </div>
              <div className="glass-card p-4 text-center rounded-xl group hover:-translate-y-1 transition-transform">
                <div className="text-3xl font-bold text-cyan-500 mb-1 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">5+</div>
                <div className="text-sm font-semibold text-theme-muted">Security Certs</div>
              </div>
              <div className="glass-card p-4 text-center rounded-xl group hover:-translate-y-1 transition-transform">
                <div className="text-3xl font-bold text-cyan-500 mb-1 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">100%</div>
                <div className="text-sm font-semibold text-theme-muted">Commitment</div>
              </div>
            </div>
            
            <div className="pt-6">
              <a href="/Ravi_Vishnoi_CV.pdf" download="Ravi_Vishnoi_CV.pdf" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-full transition-all group shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]">
                <Download size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
                Download Official CV
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
