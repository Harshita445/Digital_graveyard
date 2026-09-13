'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProjects } from '@/context/ProjectContext';
import { TombstoneCard } from '@/components/ui/TombstoneCard';
import { Filter, Search, RotateCcw, Compass, Loader2 } from 'lucide-react';

function BrowseContent() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const { projects, campusMode } = useProjects();

  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedDepth, setSelectedDepth] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>(urlQuery);
  const [forkOnly, setForkOnly] = useState<boolean>(false);

  useEffect(() => {
    if (urlQuery) setSearchQuery(urlQuery);
  }, [urlQuery]);

  const districts = ['All', 'The Forgotten Web', 'AI Graveyard', 'Abandoned SaaS', 'Campus Graveyard'];
  const depths = ['All', 'Surface Dig', 'Moderate Excavation', 'Deep Excavation'];

  const filteredProjects = projects.filter((project) => {
    if (campusMode && project.district !== 'Campus Graveyard') return false;
    if (selectedDistrict !== 'All' && project.district !== selectedDistrict) return false;
    if (selectedDepth !== 'All' && project.revivalScore.effortEstimate !== selectedDepth) return false;
    if (selectedType !== 'All' && project.listingType !== selectedType) return false;
    if (forkOnly && !project.isForkFriendly) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchDesc = project.description.toLowerCase().includes(q);
      const matchTech = project.techStack.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTech) return false;
    }
    return true;
  });

  const resetFilters = () => {
    setSelectedDistrict('All');
    setSelectedDepth('All');
    setSelectedType('All');
    setSearchQuery('');
    setForkOnly(false);
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b-2 border-ink/10 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-ink/60 block">Catalog Archive</span>
          <h1 className="font-hand text-4xl sm:text-5xl font-bold text-ink">
            {campusMode ? 'CAMPUS GRAVEYARD DISTRICT' : 'GRAVEYARD DISTRICTS'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="sketch-tag px-3 py-1 text-xs font-mono font-bold text-ink">
            {filteredProjects.length} Artifact(s) Preserved
          </span>
        </div>
      </div>

      {/* Main Filter & Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <aside className="sketch-card-static p-6 space-y-6 lg:col-span-1 h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-ink/10">
            <h3 className="font-hand text-2xl font-bold text-ink flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </h3>

            <button
              onClick={resetFilters}
              className="text-xs font-mono text-ink/70 hover:text-ink flex items-center gap-1"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-ink block">Search Keywords</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Go, React, AI..."
                className="w-full pl-9 pr-3 py-1.5 sketch-input text-xs font-sans text-ink focus:outline-none"
              />
            </div>
          </div>

          {/* Districts Filter */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-ink block">District</label>
            <div className="space-y-1">
              {districts.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDistrict(d)}
                  className={`w-full text-left px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                    selectedDistrict === d ? 'bg-ink text-paper font-bold' : 'hover:bg-paper-dark text-ink'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Excavation Depth Filter */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-ink block">Excavation Depth</label>
            <div className="space-y-1">
              {depths.map((depth) => (
                <button
                  key={depth}
                  onClick={() => setSelectedDepth(depth)}
                  className={`w-full text-left px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                    selectedDepth === depth ? 'bg-ink text-paper font-bold' : 'hover:bg-paper-dark text-ink'
                  }`}
                >
                  {depth}
                </button>
              ))}
            </div>
          </div>

          {/* Fork-Friendly Toggle */}
          <div className="pt-2 border-t border-ink/10">
            <label className="flex items-center gap-2 text-xs font-mono font-bold text-ink cursor-pointer">
              <input
                type="checkbox"
                checked={forkOnly}
                onChange={(e) => setForkOnly(e.target.checked)}
                className="rounded text-ink focus:ring-ink"
              />
              <span>Fork-Friendly License Only</span>
            </label>
          </div>
        </aside>

        {/* Project Grid */}
        <main className="lg:col-span-3">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <TombstoneCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="sketch-card p-12 text-center text-ink/70">
              <Compass className="w-12 h-12 mx-auto mb-3 stroke-1" />
              <h3 className="font-hand text-3xl font-bold text-ink">No artifacts matched your search filters.</h3>
              <p className="text-xs font-mono mt-2">Try adjusting your excavation depth or search keywords.</p>
              <button
                onClick={resetFilters}
                className="sketch-btn px-4 py-2 font-hand text-lg font-bold mt-4 hover:bg-paper-dark inline-block"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center sketch-card-static bg-paper font-hand text-2xl flex items-center justify-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-ink" />
          <span>Loading Graveyard Districts...</span>
        </div>
      }
    >
      <BrowseContent />
    </Suspense>
  );
}
