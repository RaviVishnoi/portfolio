
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const certs = [
  { name: 'Certified Ethical Hacker Master (CEH Master)', org: 'EC-Council', year: '2024', img: '/img/CEHMaster.jpg' },
  { name: 'Cybersecurity Mentor', org: 'EC-Council', year: '2024', img: '/img/Cybersecurity mentor.jpg' },
  { name: 'Certified Ethical Hacker Practical', org: 'EC-Council', year: '2024', img: '/img/CEHpractical.jpg' },
  { name: 'Certified Ethical Hacker', org: 'EC-Council', year: '2023', img: '/img/CEH.jpg' },
  { name: 'Certified Network Defender', org: 'EC-Council', year: '2023', img: '/img/CND.jpg' },
  { name: 'Cisco CyberOps Associate', org: 'Cisco', year: '2023', img: '/img/CyberOps.jpg' },
];

export default function Certifications() {
  return (
    <section className="py-24 relative bg-[#05070a]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 inline-block relative">
            <span className="text-gradient">Certifications</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-cyan-500 rounded-full"></div>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, idx) => (
            <motion.a
              href={cert.img}
              target="_blank"
              rel="noopener noreferrer"
              key={cert.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden group block hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <div className="absolute inset-0 bg-cyan-900/40 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                <img 
                  src={cert.img} 
                  alt={cert.name} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>
              <div className="p-5 flex items-start gap-4">
                <div className="bg-cyan-500/10 p-2 rounded-lg text-cyan-400 shrink-0">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors">{cert.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{cert.org} | {cert.year}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
