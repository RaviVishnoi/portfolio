import SectionHeader from './ui/SectionHeader';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Shield, Code2, Brain, Search, Film } from 'lucide-react';

const skillsData = [
  {
    category: 'Digital Forensic Tools',
    icon: Search,
    skills: [
      { name: 'Cellebrite UFED', desc: 'Mobile device forensics tool for advanced data extraction.' },
      { name: 'MSAB XRY', desc: 'Mobile forensics solution for extracting and decoding digital data.' },
      { name: 'EnCase', desc: 'Industry-standard digital forensics and investigation software.' },
      { name: 'Autopsy', desc: 'Open-source digital forensics platform for hard drive investigation.' },
      { name: 'FTK Imager', desc: 'Data preview and imaging tool for acquiring digital evidence.' },
      { name: 'Oxygen Forensics', desc: 'Advanced mobile and cloud forensics software for deep analysis.' },
      { name: 'DVR Examiner', desc: 'Tool for recovering video and data from CCTV DVR systems.' }
    ]
  },
  {
    category: 'Cybersecurity Tools',
    icon: Shield,
    skills: [
      { name: 'Nmap', desc: 'Network discovery and security auditing utility.' },
      { name: 'Nessus', desc: 'Comprehensive vulnerability scanning program.' },
      { name: 'Metasploit', desc: 'Penetration testing framework for developing and executing exploit code.' },
      { name: 'Burp Suite', desc: 'Integrated platform for performing security testing of web applications.' },
      { name: 'Wireshark', desc: 'Network protocol analyzer for deep inspection of data traffic.' },
      { name: 'Kali Linux', desc: 'Advanced Penetration Testing and Ethical Hacking Linux distribution.' },
      { name: 'VAPT', desc: 'Vulnerability Assessment and Penetration Testing methodologies.' }
    ]
  },
  {
    category: 'Programming & Web',
    icon: Code2,
    skills: [
      { name: 'PHP', desc: 'Server-side scripting language primarily used for web development.' },
      { name: 'SQL', desc: 'Language used to manage, query, and manipulate relational databases.' },
      { name: 'HTML5', desc: 'The standard markup language for creating structured web pages.' },
      { name: 'CSS3', desc: 'Style sheet language used for describing the presentation of a document.' },
      { name: 'JavaScript', desc: 'Programming language that enables interactive and dynamic web pages.' },
      { name: 'React', desc: 'JavaScript library for building modern, responsive user interfaces.' },
      { name: 'Node.js', desc: 'JavaScript runtime environment for executing code server-side.' },
      { name: 'Tailwind CSS', desc: 'Utility-first CSS framework for rapid and customized UI development.' }
    ]
  },
  {
    category: 'Motion Graphics & Design',
    icon: Film,
    skills: [
      { name: 'Adobe After Effects', desc: 'Industry-standard motion graphics, VFX, title animation, and dynamic visual compositing.' },
      { name: 'Adobe Premiere Pro', desc: 'Timeline-based video editing, color grading, sound mixing, and pacing for commercial media.' },
      { name: 'Figma', desc: 'UI/UX interface prototyping, vector design systems, micro-interactions, and component architecture.' },
      { name: 'Framer Motion', desc: 'Production-ready React animations, gestural physics, layout transitions, and interactive motion.' },
      { name: 'Blender 3D', desc: '3D modeling, texturing, scene lighting, and procedural motion elements.' },
      { name: 'Photoshop & Illustrator', desc: 'Vector asset creation, brand identity, thumbnail engineering, and digital matte painting.' }
    ]
  },
  {
    category: 'Core Strengths',
    icon: Brain,
    skills: [
      { name: 'Practical Problem Solving', desc: 'Ability to analyze complex issues and develop effective solutions.' },
      { name: 'Critical Thinking', desc: 'Objective analysis and evaluation of an issue to form a judgment.' },
      { name: 'Creative Visual Storytelling', desc: 'Translating complex cyber/tech workflows into engaging motion narratives and visuals.' },
      { name: 'Team Management', desc: 'Coordinating and leading a group of individuals to achieve goals.' },
      { name: 'Communication Skills', desc: 'Clearly conveying ideas to technical and non-technical audiences.' },
      { name: 'Incident Response', desc: 'Structured approach to handling and managing cybersecurity breaches.' }
    ]
  }
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillsData[0].category);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  // Reset expanded skill when tab changes
  const handleTabChange = (category: string) => {
    setActiveTab(category);
    setExpandedSkill(null);
  };

  return (
    <section id="skills" className="py-24 relative" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="CORE COMPETENCIES & STACK"
          badgeIcon={Cpu}
          title="Technical Arsenal"
          subtitle="Tools, technologies, and core competencies I utilize to secure networks and build robust applications. Click on any skill to learn more."
        />

        {/* Custom Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {skillsData.map((category) => (
            <button
              key={category.category}
              onClick={() => handleTabChange(category.category)}
              className={`px-6 py-2.5 rounded-full font-medium flex items-center gap-2 transition-all duration-300 relative ${
                activeTab === category.category 
                  ? 'text-slate-900 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]' 
                  : 'text-theme-muted hover:text-cyan-400 glass-card'
              }`}
            >
              <category.icon size={18} />
              {category.category}
            </button>
          ))}
        </div>

        {/* Skill Badges Display */}
        <div className="min-h-[350px] flex items-start justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap justify-center items-start gap-4 max-w-5xl mx-auto"
            >
              {skillsData.find(d => d.category === activeTab)?.skills.map((skillObj, index) => {
                const ActiveIcon = skillsData.find(d => d.category === activeTab)?.icon || Cpu;
                const isExpanded = expandedSkill === skillObj.name;
                
                return (
                  <motion.div
                    key={skillObj.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setExpandedSkill(isExpanded ? null : skillObj.name)}
                    className={`glass-card rounded-xl text-base md:text-lg cursor-pointer transition-all duration-300 transform ${
                      isExpanded 
                        ? 'border-cyan-400 bg-cyan-900/20 shadow-[0_10px_20px_rgba(6,182,212,0.15)] -translate-y-1 w-full max-w-sm' 
                        : 'hover:border-cyan-400/50 hover:bg-cyan-900/10 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(6,182,212,0.1)] max-w-sm'
                    }`}
                  >
                    <div className="px-5 py-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 font-semibold text-theme-muted group-hover:text-cyan-400">
                        <ActiveIcon size={18} className="text-cyan-500/70" />
                        <span className={isExpanded ? 'text-cyan-400' : ''}>{skillObj.name}</span>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-4 text-sm text-gray-400 border-t border-white/5 pt-3 mt-1">
                            {skillObj.desc}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
