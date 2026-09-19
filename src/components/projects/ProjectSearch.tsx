import { Search } from 'lucide-react';

interface ProjectSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function ProjectSearch({ searchQuery, setSearchQuery }: ProjectSearchProps) {
  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-theme-muted" />
      </div>
      <input
        type="text"
        className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500 transition-colors shadow-sm"
        style={{ color: 'var(--text)' }}
        placeholder="Search repositories, technologies, or keywords..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
