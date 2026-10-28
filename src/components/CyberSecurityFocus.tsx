import SectionHeader from './ui/SectionHeader';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Network,
  Server,
  Lock,
  Search,
  FileText,
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Activity,
  Zap,
} from 'lucide-react';

const securityDomains = [
  {
    id: 'vapt',
    title: 'Vulnerability Assessment & Penetration Testing',
    icon: ShieldAlert,
    description: 'Systematic review of security weaknesses in an information system. Identifies vulnerabilities and provides actionable remediation strategies.',
    tools: ['Nessus', 'Nmap', 'Metasploit', 'Burp Suite'],
  },
  {
    id: 'network',
    title: 'Network Security',
    icon: Network,
    description: 'Protecting the usability and integrity of network and data. Includes firewall policy verification and access control management.',
    tools: ['Wireshark', 'Firewalls', 'IDS/IPS'],
  },
  {
    id: 'hardening',
    title: 'Security Hardening',
    icon: Server,
    description: 'Securing a system by reducing its surface of vulnerability. Involves disabling unnecessary services, and configuring secure policies.',
    tools: ['CIS Benchmarks', 'Group Policy', 'Linux Hardening'],
  },
  {
    id: 'access',
    title: 'Access Control',
    icon: Lock,
    description: 'Ensuring that authenticated users access only what they are authorized to, enforcing the principle of least privilege.',
    tools: ['Active Directory', 'IAM', 'RBAC'],
  },
  {
    id: 'monitoring',
    title: 'Security Monitoring',
    icon: Search,
    description: 'Continuous monitoring of endpoints and network traffic to detect anomalous behavior and potential security incidents.',
    tools: ['SIEM', 'EDR', 'Log Analysis'],
  },
  {
    id: 'docs',
    title: 'Security Documentation',
    icon: FileText,
    description: 'Preparation of comprehensive security assessment reports, audit logs, and remediation guidelines for stakeholders.',
    tools: ['Audit Reports', 'Compliance Docs'],
  },
];

type AuditScenario = 'webapp' | 'network' | 'cloud';

interface AuditLog {
  stage: string;
  detail: string;
  status: 'info' | 'pass' | 'warn';
  time: string;
}

const AUDIT_SCENARIOS: Record<
  AuditScenario,
  { name: string; target: string; logs: AuditLog[] }
> = {
  webapp: {
    name: 'Web Application VAPT',
    target: 'https://client-portal.production.io',
    logs: [
      { stage: 'Reconnaissance', detail: 'DNS enumeration & reverse IP lookup complete. Subdomain mapping OK.', status: 'info', time: '0.12s' },
      { stage: 'Service Probe', detail: 'Port 443/TCP (HTTPS) detected. HTTP/2 & TLS 1.3 negotiated.', status: 'pass', time: '0.34s' },
      { stage: 'Header Hardening', detail: 'Strict-Transport-Security, X-Frame-Options: DENY, CSP v3 enforced.', status: 'pass', time: '0.65s' },
      { stage: 'OWASP Top 10', detail: 'No SQL injection, Stored XSS, or Insecure Direct Object References detected.', status: 'pass', time: '1.10s' },
      { stage: 'Authentication', detail: 'JWT signature verified with RS256 algorithm. Session fixation protected.', status: 'pass', time: '1.45s' },
      { stage: 'Final Summary', detail: 'Post-audit posture score: 100/100. Zero high or critical vulnerabilities.', status: 'pass', time: '1.80s' },
    ],
  },
  network: {
    name: 'Perimeter Defense Audit',
    target: '192.168.10.0/24 [Core Router & DMZ]',
    logs: [
      { stage: 'SYN Stealth Scan', detail: 'Scanned 1000 common ports across DMZ subnet. All non-essential ports filtered.', status: 'info', time: '0.18s' },
      { stage: 'Firewall Validation', detail: 'Stateful firewall rules validated. ICMP flood & spoofing drops active.', status: 'pass', time: '0.45s' },
      { stage: 'IDS / IPS Signature', detail: 'Suricata rule matches 0 malicious signatures. Anomaly engine active.', status: 'pass', time: '0.82s' },
      { stage: 'Cryptographic Check', detail: 'SSH v2 enforced with Ed25519 keys only. Telnet & FTP explicitly blocked.', status: 'pass', time: '1.20s' },
      { stage: 'Final Summary', detail: 'Subnet perimeter hardened. Zero unauthorized listener ports.', status: 'pass', time: '1.65s' },
    ],
  },
  cloud: {
    name: 'Cloud & IAM Policy Audit',
    target: 'Cloud Architecture & RBAC Matrix',
    logs: [
      { stage: 'IAM Inspection', detail: 'Enumerating role bindings across service accounts. Least privilege enforced.', status: 'info', time: '0.22s' },
      { stage: 'MFA Verification', detail: 'Multi-Factor Authentication enabled across 100% of privileged administrator accounts.', status: 'pass', time: '0.58s' },
      { stage: 'Storage Hardening', detail: 'Public bucket access prevention active. S3/GCS objects encrypted with AES-256.', status: 'pass', time: '0.94s' },
      { stage: 'Audit Logging', detail: 'Centralized SIEM ingestion active with tamper-evident retention policies.', status: 'pass', time: '1.38s' },
      { stage: 'Final Summary', detail: 'SOC2 & ISO/IEC 27001 baseline compliant. Security posture optimal.', status: 'pass', time: '1.75s' },
    ],
  },
};

export default function CyberSecurityFocus() {
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);

  // VAPT Simulator State
  const [scenario, setScenario] = useState<AuditScenario>('webapp');
  const [isAuditing, setIsAuditing] = useState(false);
  const [activeLogIndex, setActiveLogIndex] = useState(-1);
  const [auditComplete, setAuditComplete] = useState(false);

  const runAudit = () => {
    setIsAuditing(true);
    setActiveLogIndex(0);
    setAuditComplete(false);
  };

  const currentScenario = AUDIT_SCENARIOS[scenario];

  useEffect(() => {
    if (!isAuditing) return;

    if (activeLogIndex < currentScenario.logs.length - 1) {
      const timer = setTimeout(() => {
        setActiveLogIndex((prev) => prev + 1);
      }, 550);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsAuditing(false);
        setAuditComplete(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isAuditing, activeLogIndex, currentScenario]);

  const resetAudit = () => {
    setIsAuditing(false);
    setActiveLogIndex(-1);
    setAuditComplete(false);
  };

  return (
    <section id="cyber-security" className="py-24 relative overflow-hidden" style={{ background: 'var(--bg-section)' }}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-cyan-900/30 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/30 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          badge="SECURITY DEFENSE & VAPT"
          badgeIcon={ShieldAlert}
          title="Cyber Security Focus"
          subtitle="Specialized domains of expertise in protecting critical infrastructure, identifying vulnerabilities, and enforcing robust security postures."
        />

        {/* 6 Core Security Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {securityDomains.map((domain, index) => {
            const Icon = domain.icon;
            const isHovered = hoveredDomain === domain.id;
            
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
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

        {/* Live VAPT Security Audit Simulator Console */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl relative"
        >
          {/* Top Console Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-slate-950/70 border-b border-cyan-500/20">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="font-mono text-xs font-bold text-cyan-400 flex items-center gap-2 ml-2">
                <Terminal size={14} /> LIVE VAPT AUDIT SIMULATOR
              </span>
            </div>

            {/* Scenario Tabs */}
            <div className="flex items-center gap-2">
              {(['webapp', 'network', 'cloud'] as AuditScenario[]).map((key) => (
                <button
                  key={key}
                  disabled={isAuditing}
                  onClick={() => {
                    setScenario(key);
                    resetAudit();
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    scenario === key
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white bg-white/5'
                  }`}
                >
                  {AUDIT_SCENARIOS[key].name}
                </button>
              ))}
            </div>
          </div>

          {/* Console Target & Trigger Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5 bg-slate-900/40 border-b border-white/5">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="text-cyan-400 font-bold">TARGET:</span>
              <span className="px-2 py-0.5 rounded bg-slate-950 text-emerald-300 border border-emerald-500/30">
                {currentScenario.target}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {auditComplete ? (
                <button
                  onClick={resetAudit}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all cursor-pointer"
                >
                  <RotateCcw size={13} /> Reset Audit
                </button>
              ) : (
                <button
                  onClick={runAudit}
                  disabled={isAuditing}
                  className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isAuditing
                      ? 'bg-cyan-500/40 text-cyan-200 cursor-wait'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]'
                  }`}
                >
                  {isAuditing ? (
                    <>
                      <Activity size={14} className="animate-spin" /> Auditing System...
                    </>
                  ) : (
                    <>
                      <Play size={13} fill="currentColor" /> Run Live VAPT Scan
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Log Streaming Window */}
          <div className="p-6 font-mono text-xs space-y-3 min-h-[260px] bg-slate-950/90 text-slate-300">
            {activeLogIndex === -1 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
                <ShieldCheck size={36} className="text-cyan-500/40 mb-3" />
                <p className="text-slate-400 font-semibold">Ready to test cybersecurity posture.</p>
                <p className="text-xs text-slate-500 mt-1">
                  Click <span className="text-cyan-400 font-bold">"Run Live VAPT Scan"</span> above to simulate an automated penetration testing cycle.
                </p>
              </div>
            ) : (
              currentScenario.logs.slice(0, activeLogIndex + 1).map((log, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3 py-1 border-b border-white/5 last:border-none"
                >
                  <span className="text-slate-500 select-none">{log.time}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                    {log.stage}
                  </span>
                  <span className="flex-1 text-slate-200">{log.detail}</span>
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                    <CheckCircle2 size={13} /> PASS
                  </span>
                </motion.div>
              ))
            )}

            {/* Audit Complete Banner */}
            {auditComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    A+
                  </div>
                  <div>
                    <div className="font-bold text-sm text-emerald-300">Hardened Security Posture Confirmed</div>
                    <div className="text-[11px] text-slate-400">All automated vulnerability vectors &amp; access matrices cleared.</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-md bg-emerald-500 text-slate-950">
                    0 Vulnerabilities
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
