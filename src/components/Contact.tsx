import SectionHeader from './ui/SectionHeader';
import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call or Formspree integration
    setTimeout(() => {
      setFormStatus('success');
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative" style={{ background: 'var(--bg-section)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          badge="CONNECT & COLLABORATE"
          badgeIcon={Mail}
          title="Get In Touch"
          subtitle="I'm available for freelance work, security consulting, and full-time engineering roles. Let's discuss your next project."
        />

        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-5/12"
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>Let's discuss your project</h3>
            <p className="text-theme-muted mb-8 leading-relaxed">
              I'm available for freelance work and full-time positions. Reach out to discuss how I can help secure and build your next web application.
            </p>

            <div className="flex flex-col gap-6">
              {[
                { icon: Mail, label: 'Email', value: 'ravivishnoi57@gmail.com', link: 'mailto:ravivishnoi57@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+91 7240723262', link: 'tel:+917240723262' },
                { icon: MapPin, label: 'Location', value: 'Jaipur, Rajasthan, India', link: null }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 glass-card p-4 rounded-xl group transition-colors duration-300 hover:shadow-[0_10px_20px_rgba(6,182,212,0.1)]" style={{ border: '1px solid var(--card-border)' }}>
                  <div className="bg-cyan-500/10 p-3 rounded-lg text-cyan-500 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-colors duration-300">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-theme-muted">{item.label}</div>
                    {item.link ? (
                      <a href={item.link} className="font-medium hover:text-cyan-500 transition-colors" style={{ color: 'var(--text)' }}>
                        {item.value}
                      </a>
                    ) : (
                      <div className="font-medium" style={{ color: 'var(--text)' }}>{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-7/12"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl flex flex-col gap-6 relative" style={{ border: '1px solid var(--card-border)' }}>
              
              {formStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl backdrop-blur-md bg-[var(--bg-section)]/80"
                >
                  <div className="w-16 h-16 bg-cyan-500/20 text-cyan-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>Message Sent!</h3>
                  <p className="text-theme-muted">I'll get back to you as soon as possible.</p>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <input type="text" id="name" required className="w-full bg-transparent border-b-2 px-0 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors peer placeholder-transparent" style={{ borderColor: 'var(--card-border)', color: 'var(--text)' }} placeholder="John Doe" />
                  <label htmlFor="name" className="absolute left-0 top-3 text-sm font-medium transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyan-500 peer-valid:-top-4 peer-valid:text-xs text-theme-muted pointer-events-none">Your Name</label>
                </div>
                <div className="relative group">
                  <input type="email" id="email" required className="w-full bg-transparent border-b-2 px-0 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors peer placeholder-transparent" style={{ borderColor: 'var(--card-border)', color: 'var(--text)' }} placeholder="john@example.com" />
                  <label htmlFor="email" className="absolute left-0 top-3 text-sm font-medium transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyan-500 peer-valid:-top-4 peer-valid:text-xs text-theme-muted pointer-events-none">Your Email</label>
                </div>
              </div>
              <div className="relative group mt-4">
                <input type="text" id="subject" required className="w-full bg-transparent border-b-2 px-0 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors peer placeholder-transparent" style={{ borderColor: 'var(--card-border)', color: 'var(--text)' }} placeholder="Project Inquiry" />
                <label htmlFor="subject" className="absolute left-0 top-3 text-sm font-medium transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyan-500 peer-valid:-top-4 peer-valid:text-xs text-theme-muted pointer-events-none">Subject</label>
              </div>
              <div className="relative group mt-4">
                <textarea id="message" required rows={5} className="w-full bg-transparent border-b-2 px-0 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors peer placeholder-transparent resize-none" style={{ borderColor: 'var(--card-border)', color: 'var(--text)' }} placeholder="Tell me about your project..."></textarea>
                <label htmlFor="message" className="absolute left-0 top-3 text-sm font-medium transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-cyan-500 peer-valid:-top-4 peer-valid:text-xs text-theme-muted pointer-events-none">Message</label>
              </div>
              <button 
                type="submit" 
                disabled={formStatus !== 'idle'}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
              >
                {formStatus === 'idle' ? (
                  <>Send Message <Send size={18} className="transition-transform group-hover:translate-x-1" /></>
                ) : (
                  <span className="animate-pulse">Sending...</span>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
