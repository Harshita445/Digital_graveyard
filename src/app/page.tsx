import React from 'react';
import Link from 'next/link';
import { MOCK_PROJECTS } from '@/data/mockProjects';
import { TombstoneCard } from '@/components/ui/TombstoneCard';
import { ArrowRight, Compass, Sparkles, ShieldCheck, GitFork, BookOpen, Layers } from 'lucide-react';

export default function HomePage() {
  const featuredProjects = MOCK_PROJECTS.slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2 pb-6" data-purpose="hero-section">
        {/* Left Column: Headlines & Action CTAs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 sketch-tag px-3 py-1 text-xs font-mono font-bold text-ink">
            <Sparkles className="w-3.5 h-3.5 text-ink" />
            <span>OPEN ARCHIVAL PRESERVATION LIBRARY</span>
          </div>

          <h1 className="font-hand text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink leading-[1.05]">
            Every abandoned project has a story.
          </h1>

          <div className="space-y-2">
            <h2 className="font-hand text-2xl sm:text-3xl text-ink/90 font-bold">
              Preserve. Understand. Revive.
            </h2>
            <p className="text-base sm:text-lg text-ink/80 max-w-xl leading-relaxed font-sans">
              Digital Graveyard is a digital archive of forgotten software ideas. We document historical autopsy reports, compute code health scores, and facilitate structured stewardship transfers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/browse"
              className="sketch-btn-primary px-6 py-3 font-hand text-2xl font-bold flex items-center gap-2 group text-decoration-none"
            >
              <span>Explore the Graveyard</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/browse/map"
              className="sketch-btn px-6 py-3 font-hand text-2xl font-bold flex items-center gap-2 hover:bg-paper-dark text-decoration-none"
            >
              <Compass className="w-5 h-5 text-ink" />
              <span>Graveyard Map</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Hand-Drawn Sketch Illustration */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="sketch-card p-6 bg-paper relative w-full max-w-[420px] shadow-lg text-center">
            {/* Organic Line Art SVG Graphic */}
            <svg className="w-full h-64 text-ink fill-none stroke-current mx-auto" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 320 240">
              {/* Sun & Clouds */}
              <circle cx="260" cy="50" r="18" strokeDasharray="3 3"></circle>
              <path d="M 230 45 C 240 35, 270 35, 280 45"></path>
              <path d="M 40 40 Q 60 25 80 40 Q 100 25 120 40 Z"></path>

              {/* Bare Tree */}
              <path d="M 50 200 L 50 120 M 50 160 L 25 130 M 50 140 L 75 110 M 50 180 L 30 165"></path>

              {/* Central Main Tombstone */}
              <path d="M 110 200 L 110 90 C 110 50, 210 50, 210 90 L 210 200 Z" strokeWidth="2.5" fill="#fdfbf7"></path>
              {/* Base Line */}
              <path d="M 80 200 L 240 200" strokeWidth="3"></path>

              {/* Inked Motto on Stone */}
              <text x="160" y="115" textAnchor="middle" className="font-hand text-base fill-current font-bold" stroke="none">
                Not forgotten.
              </text>
              <text x="160" y="140" textAnchor="middle" className="font-hand text-base fill-current font-bold" stroke="none">
                Just waiting.
              </text>
              <path d="M 140 155 L 180 155" strokeWidth="1.2"></path>

              {/* Side Tombstones & Grass Doodles */}
              <path d="M 85 200 L 85 160 C 85 140, 105 140, 105 160 L 105 200"></path>
              <path d="M 215 200 L 215 150 C 215 130, 235 130, 235 150 L 235 200"></path>
              <path d="M 20 200 Q 35 185 40 200 M 100 200 Q 115 190 120 200 M 240 200 Q 255 185 260 200"></path>
            </svg>

            <p className="font-hand text-xl font-bold text-ink mt-2">
              Digital Preservation Vault
            </p>
            <p className="text-xs font-mono text-ink/70">
              Preserving technical lineage & ownership provenance
            </p>
          </div>
        </div>
      </section>

      {/* Lifecycle Timeline Banner */}
      <section className="sketch-card-static p-6 bg-paper-dark/30">
        <div className="text-center mb-4">
          <h3 className="font-hand text-2xl font-bold text-ink">The Software Lifecycle Timeline</h3>
          <p className="text-xs font-mono text-ink/70">Every project passes through archival stages</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-ink font-bold">
          <span className="sketch-tag px-3 py-1 bg-paper">1. Idea</span>
          <span>→</span>
          <span className="sketch-tag px-3 py-1 bg-paper">2. Prototype</span>
          <span>→</span>
          <span className="sketch-tag px-3 py-1 bg-paper">3. Launch</span>
          <span>→</span>
          <span className="sketch-tag px-3 py-1 bg-paper">4. Peak</span>
          <span>→</span>
          <span className="sketch-tag px-3 py-1 bg-paper">5. Decline</span>
          <span>→</span>
          <span className="sketch-tag px-3 py-1 bg-paper">6. Archive</span>
          <span>→</span>
          <span className="sketch-tag px-3 py-1 bg-ink text-paper flex items-center gap-1">
            🌱 7. Revival?
          </span>
        </div>
      </section>

      {/* Organic Hand-Drawn Divider */}
      <div className="sketch-divider" />

      {/* Featured Projects Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-hand text-4xl font-bold text-ink">Featured Preserved Artifacts</h2>
            <p className="text-xs font-mono text-ink/70">Inspected by Project Archaeologists</p>
          </div>

          <Link
            href="/browse"
            className="font-hand text-2xl font-bold text-ink hover:underline flex items-center gap-1"
          >
            <span>View all artifacts</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((project) => (
            <TombstoneCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Philosophy & Transparency Principles Banner */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="sketch-card-static p-5 bg-paper">
          <BookOpen className="w-8 h-8 text-ink mb-3 stroke-[1.8]" />
          <h3 className="font-hand text-2xl font-bold text-ink mb-1">Archival Autopsy</h3>
          <p className="text-xs text-ink/80 leading-relaxed font-sans">
            Detailed postmortems analyze peak commit activity, maintainer turnover, and exact decline reasons so future builders don't repeat mistakes.
          </p>
        </div>

        <div className="sketch-card-static p-5 bg-paper">
          <ShieldCheck className="w-8 h-8 text-ink mb-3 stroke-[1.8]" />
          <h3 className="font-hand text-2xl font-bold text-ink mb-1">Immutable Provenance</h3>
          <p className="text-xs text-ink/80 leading-relaxed font-sans">
            Every listing records an append-only cryptographic ownership chain tracing original creators, curators, and new adopters.
          </p>
        </div>

        <div className="sketch-card-static p-5 bg-paper">
          <GitFork className="w-8 h-8 text-ink mb-3 stroke-[1.8]" />
          <h3 className="font-hand text-2xl font-bold text-ink mb-1">Fork-Friendly License</h3>
          <p className="text-xs text-ink/80 leading-relaxed font-sans">
            Permissively licensed codebases (MIT/Apache/BSD) allow instant forks without transfer friction. Build on top of proven ideas.
          </p>
        </div>
      </section>
    </div>
  );
}
