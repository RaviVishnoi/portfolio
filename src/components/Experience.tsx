import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Briefcase, ShieldAlert, ShieldCheck, Terminal, Search, ChevronDown, MapPin, Building2, Calendar } from 'lucide-react';

const experienceData = [
  {
    id: 'jecrc-consultant',
    period: 'Jan 2025 - Present',
    role: 'IT Security & Network Security Consultant',
    company: 'JECRC University',
    location: 'Jaipur, Rajasthan',
    icon: ShieldCheck,
    shortSummary: 'Leading internal security audits, ERP maintenance, and network hardening for university infrastructure.',
    tech: ['Cyber Security', 'VAPT', 'ERP', 'Networking', 'Nessus', 'Nmap'],
    responsibilities: [
      'Developed and maintained web applications and internal ERP portals.',
      'Provided ERP support and user training.',
      'Assisted with Internal Vulnerability Assessment and Penetration Testing (VAPT) using Nessus and Nmap. Identified and documented security vulnerabilities.',
      'Supported firewall policy verification, user access management, and network security operations.',
      'Collaborated with infrastructure teams to implement security hardening and secure configurations.',
      'Monitored endpoint security and system logs.',
      'Prepared security assessment reports and included recommendations for remediation to improve overall security.'
    ]
  },
  {
    id: 'jecrc-intern',
    period: 'Sept 2024 - Dec 2024',
    role: 'Internship',
    company: 'JECRC University',
    location: 'Jaipur, Rajasthan',
    icon: ShieldAlert,
    shortSummary: 'Hands-on training in vulnerability assessment and network security operations.',
    tech: ['VAPT', 'Nmap', 'Security Auditing'],
    responsibilities: [
      'Assisted with Internal Vulnerability Assessment and Penetration Testing (VAPT) using Nessus and Nmap. Identified and documented security vulnerabilities.',
      'Supported firewall policy verification, user access management, and network security operations.'
    ]
  },
  {
    id: 'cadd-trainer',
    period: 'July 2024 - Aug 2024',
    role: 'Cyber Security Trainer',
    company: 'CADD Centre Training Services',
    location: 'Jaipur, Rajasthan',
    icon: Terminal,
    shortSummary: 'Delivered comprehensive cyber security training to students and professionals at R-CAT.',
    tech: ['Mentoring', 'Cyber Security Concepts', 'Curriculum Design'],
    responsibilities: [
      'Delivered Cyber Security training at R-CAT Jaipur, conducting practical and theoretical sessions for students and professionals.',
      'Developed customized course material and assessments and supported learners in building strong hands-on cyber security skills.'
    ]
  },
  {
    id: 'trojan-forensic',
    period: 'Dec 2023 - June 2024',
    role: 'Digital Forensic Investigator',
    company: 'TrojanByte Labs Private Limited',
    location: 'Remote',
    icon: Search,
    shortSummary: 'Conducted digital forensic investigations and recovered data from compromised hardware.',
    tech: ['Digital Forensics', 'Tableau', 'Data Recovery', 'Falcon-NEO2'],
    responsibilities: [
      'Hands-on experience with hardware devices such as Tableau, Falcon-NEO2, etc.',
      'Recovering deleted data from hard drives, pendrives, and other storage media.'
    ]
  },
  {
    id: 'softech-exec',
    period: 'March 2022 - Aug 2022',
    role: 'Software Executive under PMMVY',
    company: 'Softech Multi Services',
    location: 'India',
    icon: Briefcase,
    shortSummary: 'Provided crucial technical and customer support services while managing daily IT operations.',
    tech: ['IT Support', 'Customer Service', 'Troubleshooting'],
    responsibilities: [
      'Provided technical and customer support services, collaborated with team members to deliver efficient solutions, resolved user issues, improved service quality and gained new skills.',
      'Supporting daily operations and client requirements.'
    ]
  }
];

const ExperienceCard = ({ exp, isVisible }: { exp: typeof experienceData[0], isVisible: boolean }) => {
  const Icon = exp.icon;
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt state
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse follow glow state
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Set 3D tilt
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);

    // Set glow position
    glowX.set(mouseX);
    glowY.set(mouseY);
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative z-10 w-full mb-20 last:mb-0 pl-12 md:pl-24" id={`exp-${exp.id}`}>
      
      {/* Animated Timeline Node */}
      <div className="absolute left-0 top-8 md:top-12 -translate-x-1/2 flex items-center justify-center">
        <motion.div 
          animate={{ 
            scale: isVisible ? [1, 1.3, 1] : 1, 
            opacity: isVisible ? 1 : 0.3 
          }}
          transition={{ duration: 2, repeat: isVisible ? Infinity : 0 }}
          className={`absolute w-8 h-8 rounded-full blur-[8px] transition-colors duration-500 ${isVisible ? 'bg-cyan-500' : 'bg-transparent'}`}
        />
        <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 relative z-10 ${isVisible ? 'border-cyan-400 bg-cyan-900 shadow-[0_0_15px_rgba(6,182,212,0.8)]' : 'border-white/20 bg-[var(--bg-section)]'}`} />
      </div>

      <motion.div 
        ref={cardRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d",
          borderColor: isHovering ? 'var(--accent)' : 'var(--card-border)'
        }}
        className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden transition-colors duration-500"
      >
        {/* Dynamic Mouse Follow Glow */}
        <motion.div 
          className="absolute rounded-full pointer-events-none mix-blend-screen opacity-0 transition-opacity duration-300"
          animate={{ opacity: isHovering ? 0.6 : 0 }}
          style={{
            x: glowX,
            y: glowY,
            width: '400px',
            height: '400px',
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(0,0,0,0) 70%)',
            zIndex: 0
          }}
        />

        <div className="relative z-10" style={{ transformStyle: "preserve-3d" }}>
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <motion.div 
                style={{ transform: isHovering ? "translateZ(40px)" : "translateZ(0px)" }}
                className="w-14 h-14 rounded-xl flex items-center justify-center bg-cyan-500/10 text-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-transform duration-300"
              >
                <Icon size={28} />
              </motion.div>
              <div>
                <motion.h3 
                  style={{ 
                    transform: isHovering ? "translateZ(30px)" : "translateZ(0px)",
                    color: 'var(--text)' 
                  }}
                  className="text-2xl font-bold transition-transform duration-300"
                >
                  {exp.role}
                </motion.h3>
                <div className="flex items-center gap-2 mt-1 text-theme-muted font-medium">
                  <Building2 size={16} />
                  <span>{exp.company}</span>
                </div>
              </div>
            </div>

            <motion.div 
              style={{ transform: isHovering ? "translateZ(20px)" : "translateZ(0px)" }}
              className="flex flex-col items-start md:items-end gap-1 transition-transform duration-300"
            >
              <div className="flex items-center gap-2 text-cyan-500 font-semibold bg-cyan-500/10 px-3 py-1 rounded-full text-sm shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                <Calendar size={14} />
                {exp.period}
              </div>
              <div className="flex items-center gap-1 text-sm text-theme-muted mt-1">
                <MapPin size={14} />
                {exp.location}
              </div>
            </motion.div>
          </div>

          {/* Short Summary */}
          <motion.p 
            style={{ transform: isHovering ? "translateZ(15px)" : "translateZ(0px)" }}
            className="text-theme-muted text-lg leading-relaxed mb-6 transition-transform duration-300"
          >
            {exp.shortSummary}
          </motion.p>

          {/* Tech Badges */}
          <motion.div 
            style={{ transform: isHovering ? "translateZ(25px)" : "translateZ(0px)" }}
            className="flex flex-wrap gap-2 mb-6 transition-transform duration-300"
          >
            {exp.tech.map((t, i) => (
              <span 
                key={i} 
                className="text-xs font-mono px-3 py-1.5 rounded bg-[var(--bg)] border border-[var(--card-border)] text-cyan-400 shadow-sm"
              >
                {t}
              </span>
            ))}
          </motion.div>

          {/* Expandable Details */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-6 border-t border-[var(--card-border)] mt-4">
                  <h4 className="text-cyan-500 font-bold mb-4 uppercase tracking-wider text-sm">Key Responsibilities</h4>
                  <ul className="space-y-3">
                    {exp.responsibilities.map((resp, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 text-theme-muted leading-relaxed"
                      >
                        <span className="text-cyan-500 mt-1 shrink-0">❖</span>
                        <span className="hover:text-cyan-400 transition-colors cursor-default">{resp}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Expand Button */}
          <div className="mt-4 flex justify-start">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors py-2 group"
            >
              {isExpanded ? 'Hide Details' : 'Explore Role'}
              <ChevronDown size={16} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'group-hover:translate-y-1'}`} />
            </button>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleExpId, setVisibleExpId] = useState<string>(experienceData[0].id);

  // Track scroll for the connecting timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Set up intersection observers to track which experience card is active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('exp-', '');
            setVisibleExpId(id);
          }
        });
      },
      { rootMargin: '-30% 0px -50% 0px' } // Trigger when card hits middle of screen
    );

    experienceData.forEach((exp) => {
      const el = document.getElementById(`exp-${exp.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Career progression text logic based on scroll
  const progressText = useTransform(scrollYProgress, (pos) => {
    if (pos < 0.25) return 'START' as string;
    if (pos < 0.5) return 'GROWTH' as string;
    if (pos < 0.75) return 'EXPERIENCE' as string;
    return 'EXPERTISE' as string;
  });

  return (
    <section id="experience" className="py-32 relative" style={{ background: 'var(--bg-section)', transition: 'background 0.4s ease' }}>
      
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>


      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b pb-8" style={{ borderColor: 'var(--card-border)' }}>
          <div className="flex flex-col items-start">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight"
            >
              <span className="text-gradient">Career Journey</span>
            </motion.h2>
            <div className="h-1 w-20 mt-3 mb-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md shadow-md border section-header-badge mb-3">
              <span className="badge-text">CAREER TIMELINE</span>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-cyan-500 font-bold tracking-widest uppercase text-xs sm:text-sm"
            >
              <span>PATH:</span>
              <motion.span>{progressText}</motion.span>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 bg-[var(--card-bg)] border px-6 py-4 rounded-2xl shadow-lg"
            style={{ borderColor: 'var(--card-border)' }}
          >
            <div className="text-4xl font-black text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">03+</div>
            <div className="text-sm font-semibold text-theme-muted leading-tight">
              Years<br/>Experience
            </div>
          </motion.div>
        </div>

        {/* Interactive Timeline Container */}
        <div ref={containerRef} className="relative ml-4 md:ml-12 lg:ml-24">
          
          {/* Animated Connecting Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px -translate-x-1/2 rounded-full" style={{ backgroundColor: 'var(--card-border)' }}>
            <motion.div 
              style={{ height: lineHeight }} 
              className="w-full bg-gradient-to-b from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,1)]"
            />
          </div>
          
          {/* Render Experience Cards */}
          <div className="pt-12 pb-24">
            {experienceData.map((exp) => (
              <ExperienceCard 
                key={exp.id} 
                exp={exp} 
                isVisible={visibleExpId === exp.id} 
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
