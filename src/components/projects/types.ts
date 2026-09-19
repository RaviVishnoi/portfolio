import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string | number;
  title: string;
  description: string;
  fullDescription?: string;
  category: string[]; // e.g. ['web', 'security', 'erp', 'tools', 'javascript', 'python']
  tech: string[];
  image?: string;
  githubUrl?: string;
  demoUrl?: string;
  stars?: number;
  forks?: number;
  language?: string;
  topics?: string[];
  featured?: boolean;
  source: 'github' | 'manual';
  created_at?: string;
  updated_at?: string;
  icon?: LucideIcon; // for manual projects primarily
}

// Fallback project data to combine with GitHub data
export const manualProjects: Project[] = [
  {
    id: 'manual-jecrc-back-result',
    title: 'JECRC Back Result Portal',
    category: ['web', 'erp'],
    description: 'Internal university portal for processing and managing student backlog results securely.',
    fullDescription: 'Designed and developed a secure portal for JECRC University to manage student back examination results. The system ensures data integrity, role-based access control for administrative staff, and a clean interface for rapid data entry and verification.',
    tech: ['PHP', 'MySQL', 'Web Development', 'Security'],
    source: 'manual',
    featured: true
  },
  {
    id: 'manual-secure-password-manager',
    title: 'Secure Password Manager',
    category: ['security', 'tools'],
    description: 'A locally encrypted password manager built to securely store credentials using AES-256 encryption.',
    fullDescription: 'A robust password management utility that utilizes AES-256 encryption to securely store and retrieve user credentials locally without relying on cloud synchronization. Built with a focus on zero-knowledge architecture principles.',
    tech: ['Python', 'Cryptography', 'Security'],
    source: 'manual',
    featured: false
  },
  {
    id: 'manual-password-budget-tracker',
    title: 'Password & Budget Tracker',
    category: ['web', 'tools'],
    description: 'Dual-purpose application combining secure credential storage with personal finance tracking.',
    fullDescription: 'A comprehensive personal management tool featuring two isolated modules: a secure vault for sensitive credentials and a budgeting dashboard to track expenses, income, and financial goals with visual analytics.',
    tech: ['React', 'Node.js', 'MongoDB'],
    source: 'manual',
    featured: false
  },
  {
    id: 'manual-jiamc-admin',
    title: 'JIAMC Admin Dashboard',
    category: ['web', 'admin dashboard'],
    description: 'Comprehensive administrative dashboard for JIAMC with analytics, user management, and reporting.',
    fullDescription: 'A full-stack administrative dashboard providing real-time analytics, user role management, and automated reporting generation. Features strict access controls and session management to prevent unauthorized access.',
    tech: ['React', 'Express', 'TailwindCSS'],
    source: 'manual',
    featured: true
  },
  {
    id: 'manual-cyber-vapt-toolkit',
    title: 'Cyber Security & VAPT Toolkit',
    category: ['security', 'vapt', 'tools'],
    description: 'Collection of automated scripts and configurations for streamlining vulnerability assessments.',
    fullDescription: 'A custom-built suite of automation tools designed to assist in Vulnerability Assessment and Penetration Testing (VAPT). The toolkit integrates with industry-standard tools to rapidly map attack surfaces and generate preliminary security reports.',
    tech: ['Bash', 'Python', 'Nmap', 'Nessus'],
    source: 'manual',
    featured: true
  },
  {
    id: 'manual-erp-support',
    title: 'ERP Support & Management Solutions',
    category: ['erp', 'tools'],
    description: 'Custom modules and scripts developed to optimize and troubleshoot enterprise resource planning systems.',
    fullDescription: 'A collection of optimization modules and database management scripts developed to maintain, troubleshoot, and enhance the performance of complex ERP deployments in an academic environment.',
    tech: ['SQL', 'PHP', 'System Admin'],
    source: 'manual',
    featured: false
  },
  {
    id: 'manual-network-vuln-scanner',
    title: 'Network Vulnerability Scanner',
    category: ['security', 'vapt', 'tools'],
    description: 'Automated security assessment tool built in Python that identifies security weaknesses in network infrastructure.',
    fullDescription: 'A custom Python-based tool that automates the reconnaissance and scanning phases of a penetration test. It integrates with Nmap and custom scripts to map network topologies, identify open ports, and cross-reference running services with known CVE databases.',
    tech: ['Python', 'Nmap', 'OWASP ZAP'],
    source: 'manual',
    featured: true
  }
];
