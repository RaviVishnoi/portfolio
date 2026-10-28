import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Project, manualProjects } from './types';
import { fetchGitHubProjects } from './GitHubProjectService';
import ProjectStats from './ProjectStats';
import ProjectSearch from './ProjectSearch';
import ProjectFilters from './ProjectFilters';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import GitHubProjectLoader from './GitHubProjectLoader';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(manualProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const loadProjects = async (forceRefresh = false) => {
    try {
      if (forceRefresh) setIsRefreshing(true);
      setError(false);
      const ghProjects = await fetchGitHubProjects(forceRefresh);
      
      // Merge unique projects (prevent duplicates if manual project has same name as github repo)
      const ghNames = ghProjects.map(p => p.title.toLowerCase());
      const filteredManual = manualProjects.filter(mp => !ghNames.includes(mp.title.toLowerCase()));
      
      setProjects([...ghProjects, ...filteredManual]);
    } catch (err) {
      console.error(err);
      setError(true);
      // fallback is just manual projects which is already initial state or whatever we had
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      // Category filter
      const matchesFilter = filter === 'all' 
        || (filter === 'github' && p.source === 'github')
        || (filter === 'manual' && p.source === 'manual')
        || p.category.includes(filter);

      // Search filter
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q 
        || p.title.toLowerCase().includes(q)
        || p.description.toLowerCase().includes(q)
        || (p.language && p.language.toLowerCase().includes(q))
        || p.tech.some(t => t.toLowerCase().includes(q));

      return matchesFilter && matchesSearch;
    });
  }, [projects, filter, searchQuery]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header & Refresh */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start"
          >
            <div className="mb-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-slate-900/85 dark:bg-black/75 border border-cyan-500/40 text-cyan-400 dark:text-cyan-300 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
              <span>FEATURED SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              <span className="text-gradient">Featured Projects</span>
            </h2>
            <div className="h-1 w-20 mt-3 rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]"></div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => loadProjects(true)}
            disabled={isRefreshing || loading}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] hover:bg-cyan-500/10 text-theme-muted hover:text-cyan-400 hover:border-cyan-500/30 transition-all text-sm font-medium"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin text-cyan-500' : ''} />
            {isRefreshing ? 'Syncing...' : 'Sync GitHub'}
          </motion.button>
        </div>

        {/* Error Fallback Notice */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center justify-center text-sm">
            GitHub projects temporarily unavailable. Showing manual portfolio projects.
          </div>
        )}

        {/* Dynamic Statistics */}
        {!loading && projects.length > 0 && (
          <ProjectStats projects={projects} />
        )}

        {/* Search & Filters */}
        <ProjectSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ProjectFilters activeFilter={filter} setFilter={setFilter} />

        {/* Projects Grid */}
        <div className="relative min-h-[400px]">
          {loading ? (
            <GitHubProjectLoader />
          ) : (
            <>
              {filteredProjects.length === 0 ? (
                <div className="text-center py-20 text-theme-muted">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold mb-2 text-[var(--text)]">No projects found</h3>
                  <p>Try adjusting your search or filters.</p>
                </div>
              ) : (
                <motion.div layout className="w-full relative pb-12">
                  <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    spaceBetween={32}
                    slidesPerView={1}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    navigation={{
                      nextEl: '.project-swiper-next',
                      prevEl: '.project-swiper-prev',
                    }}
                    autoplay={{ delay: 5000, disableOnInteraction: true }}
                    breakpoints={{
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                    }}
                    className="projects-swiper !pb-14 pt-4 px-2"
                  >
                    {filteredProjects.map((project) => (
                      <SwiperSlide key={project.id} className="h-auto">
                        <div className="h-full">
                          <ProjectCard 
                            project={project} 
                            onClick={setSelectedProject} 
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  
                  {/* Custom Navigation Buttons (positioned appropriately) */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-[-16px] md:left-[-24px] z-10">
                    <button className="project-swiper-prev flex items-center justify-center w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all shadow-lg hover:shadow-cyan-500/30 group">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-[-16px] md:right-[-24px] z-10">
                    <button className="project-swiper-next flex items-center justify-center w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all shadow-lg hover:shadow-cyan-500/30 group">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  </div>

                  <style>{`
                    .projects-swiper .swiper-pagination-bullet {
                      background: var(--text-muted);
                      opacity: 0.5;
                    }
                    .projects-swiper .swiper-pagination-bullet-active {
                      background: var(--accent);
                      opacity: 1;
                    }
                    /* Hide custom nav on very small screens to save space */
                    @media (max-width: 640px) {
                      .project-swiper-prev, .project-swiper-next {
                        display: none !important;
                      }
                    }
                  `}</style>
                </motion.div>
              )}
            </>
          )}
        </div>

      </div>

      {/* Project Details Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

    </section>
  );
}
