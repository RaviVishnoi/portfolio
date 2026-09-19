import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Network, Server, Lock, Search, FileText } from 'lucide-react';

const securityDomains = [
  {
    id: 'vapt',
    title: 'Vulnerability Assessment & Penetration Testing',
    icon: ShieldAlert,
    description: 'Systematic review of security weaknesses in an information system. Identifies vulnerabilities and provides actionable remediation strategies.',
    tools: ['Nessus', 'Nmap', 'Metasploit', 'Burp Suite']
  },
  {
    id: 'network',
    title: 'Network Security',
    icon: Network,
    description: 'Protecting the usability and integrity of network and data. Includes firewall policy verification and access control management.',
    tools: ['Wireshark', 'Firewalls', 'IDS/IPS']
  },
  {
    id: 'hardening',
    title: 'Security Hardening',
    icon: Server,
    description: 'Securing a system by reducing its surface of vulnerability. Involves disabling unnecessary services, and configuring secure policies.',
    tools: ['CIS Benchmarks', 'Group Policy', 'Linux Hardening']
  },
  {
    id: 'access',
    title: 'Access Control',
    icon: Lock,
    description: 'Ensuring that authenticated users access only what they are authorized to, enforcing the principle of least privilege.',
    tools: ['Active Directory', 'IAM', 'RBAC']
  },
  {
    id: 'monitoring',
    title: 'Security Monitoring',
    icon: Search,
    description: 'Continuous monitoring of endpoints and network traffic to detect anomalous behavior and potential security incidents.',
    tools: ['SIEM', 'EDR', 'Log Analysis']
  },
  {
    id: 'docs',
    title: 'Security Documentation',
    icon: FileText,
    description: 'Preparation of comprehensive security assessment reports, audit logs, and remediation guidelines for stakeholders.',
    tools: ['Audit Reports', 'Compliance Docs']
  }
];

export default function CyberSecurityFocus() {
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);

  return (
    <section id="cyber-security" className="py-24 relative overflow-hidden" style={{ background: 'var(--bg-section)' }}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-cyan-900/30 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/30 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 inline-block relative">
            <span className="text-gradient">Cyber Security Focus</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)]"></div>
          </h2>
          <p className="text-theme-muted mt-6 max-w-2xl mx-auto">
            Specialized domains of expertise in protecting critical infrastructure, identifying vulnerabilities, and enforcing robust security postures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityDomains.map((domain, index) => {
            const Icon = domain.icon;
            const isHovered = hoveredDomain === domain.id;
            
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredDomain(domain.id)}
                onMouseLeave={() => setHoveredDomain(null)}
                className="glass-card p-6 rounded-2xl relative overflow-hidden group cursor-default h-full flex flex-col transition-all duration-500 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)]"
                style={{ borderColor: isHovered ? 'var(--card-border-hover)' : 'var(--card-border)' }}
              >
                {/* Glow Effect */}
                <div 
                  className={`absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
                  style={{ zIndex: 0 }} 
                />

                <div className="relative z-10 flex-grow">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${isHovered ? 'bg-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-cyan-900/30 text-cyan-400'}`}>
                    <Icon size={28} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-theme-muted group-hover:text-white transition-colors">
                    {domain.title}
                  </h3>
                  
                  <p className="text-theme-muted mb-6 text-sm leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t" style={{ borderColor: 'var(--card-border)' }}>
                  <div className="flex flex-wrap gap-2">
                    {domain.tools.map((tool) => (
                      <span key={tool} className="text-xs font-mono px-2 py-1 rounded bg-[var(--bg)] text-cyan-400 border border-[var(--card-border)] shadow-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
