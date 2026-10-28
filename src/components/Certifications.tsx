import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface Certificate {
  name: string;
  org: string;
  year: string;
  img: string;
  verifyUrl?: string;
  badge?: string;
  description?: string;
}

const certs: Certificate[] = [
  {
    name: 'Google AI Educator Series for India',
    org: 'Google for Education',
    year: '2026',
    img: 'img/google-ai-educator.jpg',
    verifyUrl: 'https://lnkd.in/p/gyzxDp7R',
    badge: 'Google AI',
    description: 'Generative AI and prompt engineering, Gemini for Education, AI-powered interactive learning experiences, Gemini Notebook and Canvas, and responsible AI adoption in education.'
  },
  {
    name: 'Certified Ethical Hacker Master (CEH Master)',
    org: 'EC-Council',
    year: '2024',
    img: 'img/CEH.jpg',
    verifyUrl: 'https://www.eccouncil.org/',
    badge: 'Master',
    description: 'Advanced hands-on penetration testing, exploit development, and comprehensive multi-vector vulnerability assessments.'
  },
  {
    name: 'Cybersecurity Mentor',
    org: 'EC-Council',
    year: '2024',
    img: 'img/Cybersecurity mentor.jpg',
    verifyUrl: 'https://www.eccouncil.org/',
    badge: 'Mentor',
    description: 'Mentoring cybersecurity professionals, leading offensive & defensive security labs, and curriculum guidance.'
  },
  {
    name: 'Certified Ethical Hacker Practical',
    org: 'EC-Council',
    year: '2024',
    img: 'img/CEHpractical.jpg',
    verifyUrl: 'https://www.eccouncil.org/',
    badge: 'Practical',
    description: 'Rigorous 6-hour practical examination testing real-world network infrastructure penetration testing and system exploitation.'
  },
  {
    name: 'Certified Ethical Hacker',
    org: 'EC-Council',
    year: '2023',
    img: 'img/CEH.jpg',
    verifyUrl: 'https://www.eccouncil.org/',
    badge: 'Core',
    description: 'Ethical hacking methodologies, reconnaissance, malware threats, cloud security, and network infrastructure auditing.'
  },
  {
    name: 'Certified Network Defender',
    org: 'EC-Council',
    year: '2023',
    img: 'img/CND.jpg',
    verifyUrl: 'https://www.eccouncil.org/',
    badge: 'Defense',
    description: 'Network perimeter defense, firewall/IDS/IPS configurations, traffic telemetry analysis, and incident containment.'
  },
  {
    name: 'Cisco CyberOps Associate',
    org: 'Cisco',
    year: '2023',
    img: 'img/CyberOps.jpg',
    verifyUrl: 'https://www.cisco.com/',
    badge: 'SOC / Net',
    description: 'Security Operations Center (SOC) monitoring, threat detection, SIEM telemetry, digital forensics, and incident response.'
  },
];

export default function Certifications() {
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const resolveImg = (path: string) => {
    if (path.startsWith('http')) return path;
    const clean = path.replace(/^\//, '');
    return `${import.meta.env.BASE_URL}${clean}`;
  };

  return (
    <section id="certifications" className="py-24 relative bg-[#05070a]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <CheckCircle2 size={13} />
            Verified Credentials & Accreditations
          </div>
          <h2 className="text-4xl font-bold mb-4 inline-block relative">
            <span className="text-gradient">Certifications</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-cyan-500 rounded-full"></div>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base mt-2">
            Industry-recognized credentials spanning Offensive & Defensive Cybersecurity, SOC Operations, and Generative AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, idx) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => {
                setSelectedCertIndex(idx);
                setActiveSlideIndex(idx);
              }}
              className="glass-card rounded-2xl overflow-hidden group block hover:-translate-y-2 transition-transform duration-300 cursor-pointer relative border border-white/10 hover:border-cyan-500/40"
            >
              <div className="aspect-[4/3] overflow-hidden relative bg-black/40">
                <div className="absolute inset-0 bg-cyan-950/30 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                
                {/* Org & Year Badge */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                  {cert.badge && (
                    <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                      {cert.badge}
                    </span>
                  )}
                  <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-black/60 text-gray-300 backdrop-blur-md border border-white/10">
                    {cert.year}
                  </span>
                </div>

                <img 
                  src={resolveImg(cert.img)} 
                  alt={cert.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>

              <div className="p-5 flex items-start gap-4">
                <div className="bg-cyan-500/10 p-2.5 rounded-xl text-cyan-400 shrink-0 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                  <Award size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors line-clamp-2 text-base">
                    {cert.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400 mt-2">
                    <span className="truncate">{cert.org}</span>
                    {cert.verifyUrl && (
                      <span className="text-cyan-400/80 group-hover:text-cyan-300 flex items-center gap-1 text-xs shrink-0 ml-2">
                        View <ExternalLink size={12} />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Glassmorphic Swiper Modal */}
      <AnimatePresence>
        {selectedCertIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedCertIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#0c1017]/95 border border-cyan-500/20 rounded-3xl shadow-2xl shadow-cyan-950/40"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}
            >
              <button
                onClick={() => setSelectedCertIndex(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[110] flex items-center justify-center w-10 h-10 bg-black/50 border border-white/10 rounded-full text-white hover:bg-white/10 hover:text-cyan-400 transition-all backdrop-blur-md"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="p-6 sm:p-8 md:p-10 border-b border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pr-10">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                      {certs[activeSlideIndex]?.name || 'My Certifications'}
                    </h2>
                    <div className="flex gap-2 sm:gap-3 flex-wrap items-center">
                      <span className="px-3 py-1 text-xs sm:text-sm font-medium bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300">
                        {certs[activeSlideIndex]?.org || 'Organization'}
                      </span>
                      <span className="px-3 py-1 text-xs sm:text-sm font-medium bg-white/5 border border-white/10 rounded-full text-gray-300 font-mono">
                        Year: {certs[activeSlideIndex]?.year || '2026'}
                      </span>
                      {certs[activeSlideIndex]?.badge && (
                        <span className="px-3 py-1 text-xs sm:text-sm font-semibold rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                          {certs[activeSlideIndex]?.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {certs[activeSlideIndex]?.verifyUrl && (
                    <a
                      href={certs[activeSlideIndex]?.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 shrink-0 self-start sm:self-center"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6 sm:p-8 md:p-10">
                <div className="w-full rounded-2xl overflow-hidden shadow-2xl relative mb-8 group bg-black/60 border border-white/10">
                  <Swiper
                    modules={[Navigation, Pagination, EffectFade, Keyboard]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    navigation
                    pagination={{ clickable: true }}
                    keyboard={{ enabled: true, onlyInViewport: true }}
                    loop={true}
                    initialSlide={selectedCertIndex}
                    onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
                    className="w-full rounded-2xl"
                  >
                    {certs.map((cert) => (
                      <SwiperSlide key={cert.name}>
                        <div className="bg-black/60 w-full flex items-center justify-center p-2 sm:p-4">
                          <img
                            src={resolveImg(cert.img)}
                            alt={cert.name}
                            className="w-full h-auto max-h-[62vh] object-contain rounded-lg"
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop";
                            }}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  
                  {/* Custom global Swiper styles directly injected */}
                  <style>{`
                    .swiper-button-next, .swiper-button-prev {
                      color: #fff !important;
                      background: rgba(0,0,0,0.6);
                      backdrop-filter: blur(6px);
                      width: 44px !important;
                      height: 44px !important;
                      border-radius: 50%;
                      border: 1px solid rgba(255,255,255,0.15);
                      opacity: 0;
                      transition: all 0.3s ease !important;
                    }
                    .swiper:hover .swiper-button-next, .swiper:hover .swiper-button-prev {
                      opacity: 1;
                    }
                    .swiper-button-next:after, .swiper-button-prev:after {
                      font-size: 1.1rem !important;
                    }
                    .swiper-button-next:hover, .swiper-button-prev:hover {
                      background: #06b6d4 !important; /* cyan-500 */
                      border-color: #06b6d4;
                    }
                    .swiper-pagination-bullet {
                      background: #fff !important;
                      opacity: 0.4;
                    }
                    .swiper-pagination-bullet-active {
                      opacity: 1;
                      background: #06b6d4 !important;
                    }
                  `}</style>
                </div>

                <div className="text-gray-300 leading-relaxed text-base sm:text-lg bg-white/[0.03] p-5 sm:p-6 rounded-2xl border border-white/5 space-y-3">
                  <p>
                    Official certificate for <strong className="text-white">{certs[activeSlideIndex]?.name}</strong>, issued by <span className="text-cyan-400 font-semibold">{certs[activeSlideIndex]?.org}</span> ({certs[activeSlideIndex]?.year}).
                  </p>
                  {certs[activeSlideIndex]?.description && (
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                      {certs[activeSlideIndex]?.description}
                    </p>
                  )}
                  {certs[activeSlideIndex]?.verifyUrl && (
                    <div className="pt-2">
                      <a 
                        href={certs[activeSlideIndex]?.verifyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                      >
                        <span>View original credential verification link on LinkedIn / Official Authority</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
