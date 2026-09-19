import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
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
          >
            <h2 className="text-4xl font-bold inline-block relative">
              <span className="text-gradient">Featured Projects</span>
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)]"></div>
            </h2>
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
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                      <ProjectCard 
                        key={project.id} 
                        project={project} 
                        onClick={setSelectedProject} 
                      />
                    ))}
                  </AnimatePresence>
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
