interface ProjectFiltersProps {
  activeFilter: string;
  setFilter: (filter: string) => void;
}

export default function ProjectFilters({ activeFilter, setFilter }: ProjectFiltersProps) {
  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'github', label: 'GitHub' },
    { id: 'manual', label: 'Manual Projects' },
    { id: 'web', label: 'Web' },
    { id: 'security', label: 'Security' },
    { id: 'erp', label: 'ERP' },
    { id: 'tools', label: 'Tools' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => setFilter(f.id)}
          className={`px-5 py-2 rounded-full border transition-all duration-300 font-medium text-sm ${
            activeFilter === f.id 
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
              : 'text-theme-muted hover:text-cyan-400 glass-card border-transparent'
          }`}
          style={{ borderColor: activeFilter === f.id ? 'var(--accent)' : 'var(--card-border)' }}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
