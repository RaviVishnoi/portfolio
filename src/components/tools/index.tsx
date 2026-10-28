import SectionHeader from '../ui/SectionHeader';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Shield, Globe, Network, Search, Sparkles } from 'lucide-react';
import { allTools } from './toolsData';
import { ToolItem, ToolCategory } from './types';
import { ToolCard } from './ToolCard';
import { ToolModal } from './ToolModal';

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Utilities', icon: Sparkles, count: allTools.length },
    { id: 'cybersecurity', label: 'Cybersecurity & VAPT', icon: Shield, count: allTools.filter((t) => t.category === 'cybersecurity').length },
    { id: 'web', label: 'Web Development', icon: Globe, count: allTools.filter((t) => t.category === 'web').length },
    { id: 'network', label: 'Network Utilities', icon: Network, count: allTools.filter((t) => t.category === 'network').length },
  ];

  const filteredTools = useMemo(() => {
    return allTools.filter((tool) => {
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="tools" className="py-24 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Ambient background glow matching portfolio */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge="INTERACTIVE SECURITY & DEV SUITE"
          badgeIcon={Wrench}
          title="Cyber & Dev Toolkit"
          subtitle="A battle-tested collection of interactive utilities for security auditors, network engineers, and full-stack developers. Fast, zero-leak, client-side processing."
        />

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500 text-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'glass-card text-theme-muted hover:text-cyan-400 border-transparent hover:border-cyan-500/30'
                  }`}
                >
                  <Icon size={14} />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-slate-900/20 text-slate-900' : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools or tags..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-slate-950/80 border text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              style={{ borderColor: 'var(--card-border)' }}
            />
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onOpen={setSelectedTool} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl glass-card border border-white/5 my-8">
            <Search size={36} className="text-slate-600 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-300 mb-1">No tools found</h4>
            <p className="text-xs text-slate-500">
              No matching tools found for "{searchQuery}". Try a different keyword or category.
            </p>
          </div>
        )}

        {/* Selected Tool Modal */}
        <ToolModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
      </div>
    </section>
  );
}
