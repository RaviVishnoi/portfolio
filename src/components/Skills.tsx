import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skillsData = [
  {
    category: 'Digital Forensic Tools',
    skills: [
      'Cellebrite UFED', 'MSAB XRY', 'EnCase', 'Autopsy', 'FTK Imager', 'Oxygen Forensics', 'DVR Examiner'
    ]
  },
  {
    category: 'Cybersecurity Tools',
    skills: [
      'Nmap', 'Nessus', 'Metasploit', 'Burp Suite', 'Wireshark', 'Kali Linux', 'VAPT'
    ]
  },
  {
    category: 'Programming & Web',
    skills: [
      'PHP', 'SQL', 'HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Tailwind CSS'
    ]
  },
  {
    category: 'Core Strengths',
    skills: [
      'Practical Problem Solving', 'Critical Thinking', 'Team Management', 'Leadership', 'Communication Skills', 'Incident Response'
    ]
  }
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillsData[0].category);

  return (
    <section id="skills" className="py-24 relative" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 inline-block relative">
            <span className="text-gradient">Technical Arsenal</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)]"></div>
          </h2>
          <p className="text-theme-muted mt-6 max-w-2xl mx-auto">
            Tools, technologies, and core competencies I utilize to secure networks and build robust applications.
          </p>
        </motion.div>

        {/* Custom Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {skillsData.map((category) => (
            <button
              key={category.category}
              onClick={() => setActiveTab(category.category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 relative ${
                activeTab === category.category 
                  ? 'text-slate-900 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]' 
                  : 'text-theme-muted hover:text-cyan-400 glass-card'
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* Skill Badges Display */}
        <div className="min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
            >
              {skillsData.find(d => d.category === activeTab)?.skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-5 py-3 glass-card rounded-xl text-lg font-semibold text-theme-muted hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-900/10 cursor-default transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(6,182,212,0.1)]"
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
