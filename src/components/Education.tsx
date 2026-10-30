import SectionHeader from './ui/SectionHeader';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const educationData = [
  {
    period: '2022 - 2024',
    degree: 'Master of Computer Applications',
    specialization: '(Cyber Security)',
    institution: 'JECRC University',
    details: 'Relevant Coursework: Network Security, Cryptography, Ethical Hacking, Digital Forensics, Secure Web Development'
  },
  {
    period: '2018 - 2021',
    degree: 'Bachelor of Computer Applications',
    specialization: '',
    institution: 'Aishwarya College of Education',
    details: 'Key Projects: Secure Chat Application, Network Packet Analyzer, E-Commerce Website'
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          badge="ACADEMIC FOUNDATION"
          badgeIcon={GraduationCap}
          title="Education"
          subtitle="Formal academic education in computer science, ethical hacking, network defense, and advanced web technologies."
        />

        <div className="relative border-l-2 border-white/10 ml-4 md:ml-0 md:border-none">
          {/* Desktop central line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>
          
          <div className="flex flex-col gap-12">
            {educationData.map((edu, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-21px] md:left-1/2 md:-translate-x-1/2 bg-[var(--bg)] p-1 rounded-full border border-cyan-500 z-10">
                  <div className="bg-cyan-500 w-3 h-3 rounded-full"></div>
                </div>

                {/* Content Card */}
                <div className={`pl-8 md:pl-0 w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="glass-card p-6 rounded-2xl hover:border-cyan-500/30 group">
                    <div className="flex items-center gap-3 mb-2 justify-start md:justify-normal" style={{ justifyContent: idx % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                      {idx % 2 !== 0 && <GraduationCap className="text-cyan-500 hidden md:block" size={24} />}
                      <span className="text-cyan-400 font-semibold tracking-wider text-sm">{edu.period}</span>
                      {idx % 2 === 0 && <GraduationCap className="text-cyan-500 hidden md:block" size={24} />}
                      <GraduationCap className="text-cyan-500 md:hidden" size={24} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-100 group-hover:text-cyan-300 transition-colors">
                      {edu.degree}
                    </h3>
                    {edu.specialization && (
                      <p className="text-cyan-500/80 text-sm mb-2">{edu.specialization}</p>
                    )}
                    
                    <p className="text-gray-300 font-medium mb-4">{edu.institution}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{edu.details}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
