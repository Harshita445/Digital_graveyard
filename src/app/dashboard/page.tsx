'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProjects } from '@/context/ProjectContext';
import { TombstoneCard } from '@/components/ui/TombstoneCard';
import { LayoutDashboard, Handshake, Award, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DashboardPage() {
  const { projects, user } = useProjects();
  const [activeTab, setActiveTab] = useState<'listings' | 'handovers' | 'reputation'>('listings');

  const myListingProjects = projects.filter((p) => p.owner.name === user.name || p.owner.name.includes('Alex'));
  const activeHandoverProjects = projects.filter((p) => p.status === 'in-handover' || p.listingType === 'seeking-team');

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b-2 border-ink/10 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-ink/60 block">ARCHAEOLOGIST CONTROLS</span>
          <h1 className="font-hand text-4xl sm:text-5xl font-bold text-ink">USER DASHBOARD</h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="sketch-tag px-3 py-1 text-xs font-mono font-bold text-ink">
            Role: {user.roleTitle}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 font-hand text-2xl border-b-2 border-ink/10 pb-1">
        <button
          onClick={() => setActiveTab('listings')}
          className={`px-4 py-1.5 rounded-t font-bold transition-colors ${
            activeTab === 'listings' ? 'bg-ink text-paper' : 'hover:bg-paper-dark text-ink'
          }`}
        >
          My Listings ({myListingProjects.length})
        </button>

        <button
          onClick={() => setActiveTab('handovers')}
          className={`px-4 py-1.5 rounded-t font-bold transition-colors ${
            activeTab === 'handovers' ? 'bg-ink text-paper' : 'hover:bg-paper-dark text-ink'
          }`}
        >
          Active Handovers ({activeHandoverProjects.length})
        </button>

        <button
          onClick={() => setActiveTab('reputation')}
          className={`px-4 py-1.5 rounded-t font-bold transition-colors ${
            activeTab === 'reputation' ? 'bg-ink text-paper' : 'hover:bg-paper-dark text-ink'
          }`}
        >
          My Reputation & Badges
        </button>
      </div>

      {/* Tab 1: My Listings */}
      {activeTab === 'listings' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myListingProjects.map((project) => (
              <TombstoneCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Active Handovers */}
      {activeTab === 'handovers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeHandoverProjects.map((project) => (
              <div key={project.id} className="sketch-card p-5 bg-paper space-y-4">
                <div className="flex items-center justify-between">
                  <span className="sketch-tag px-2.5 py-0.5 text-xs font-mono font-bold text-ink">
                    STATUS: {project.status.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-ink/70">Revival {project.revivalScore.overallScore}%</span>
                </div>

                <div>
                  <h3 className="font-hand text-2xl font-bold text-ink">{project.title}</h3>
                  <p className="text-xs text-ink/80 font-sans mt-1">{project.tagline}</p>
                </div>

                <div className="pt-3 border-t border-ink/10 flex justify-end">
                  <Link
                    href={`/handover/${project.id}`}
                    className="sketch-btn-primary px-4 py-2 font-hand text-xl font-bold flex items-center gap-2 text-decoration-none"
                  >
                    <span>Open Transfer Protocol</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Reputation */}
      {activeTab === 'reputation' && (
        <div className="sketch-card-static p-6 space-y-6 bg-paper">
          <h3 className="font-hand text-3xl font-bold text-ink">Archival Credentials & Achievements</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {user.achievements.map((ach) => (
              <div key={ach.id} className="sketch-card-static p-5 bg-paper-dark/30 flex items-start gap-4">
                <span className="text-3xl">{ach.icon}</span>
                <div>
                  <h4 className="font-sans font-bold text-base text-ink">{ach.title}</h4>
                  <p className="text-xs text-ink/80 leading-relaxed font-sans mt-0.5">{ach.description}</p>
                  <span className="text-[10px] font-mono text-ink/60 mt-2 block">Unlocked on {ach.unlockedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
