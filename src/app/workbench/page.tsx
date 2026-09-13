'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProjects } from '@/context/ProjectContext';
import { TombstoneCard } from '@/components/ui/TombstoneCard';
import { BookOpen, FolderCheck, MessageSquare, Award, ArrowRight, PlusCircle, Sparkles } from 'lucide-react';

export default function ArchivistWorkbenchPage() {
  const { projects, user } = useProjects();
  const [activeSection, setActiveSection] = useState<'specimens' | 'annotations' | 'requests'>('specimens');

  const mySpecimens = projects.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b-2 border-ink/10 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-ink/60 block">CURATORIAL COMMAND CENTER</span>
          <h1 className="font-hand text-4xl sm:text-5xl font-bold text-ink">ARCHIVIST WORKBENCH</h1>
        </div>

        <Link
          href="/submit"
          className="sketch-btn-primary px-4 py-2 font-hand text-xl font-bold flex items-center gap-2 text-decoration-none"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Accession New Specimen</span>
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 font-hand text-2xl border-b-2 border-ink/10 pb-1">
        <button
          onClick={() => setActiveSection('specimens')}
          className={`px-4 py-1.5 rounded-t font-bold transition-colors ${
            activeSection === 'specimens' ? 'bg-ink text-paper' : 'hover:bg-paper-dark text-ink'
          }`}
        >
          Curated Specimens ({mySpecimens.length})
        </button>

        <button
          onClick={() => setActiveSection('annotations')}
          className={`px-4 py-1.5 rounded-t font-bold transition-colors ${
            activeSection === 'annotations' ? 'bg-ink text-paper' : 'hover:bg-paper-dark text-ink'
          }`}
        >
          Margin Notes & Annotations
        </button>

        <button
          onClick={() => setActiveSection('requests')}
          className={`px-4 py-1.5 rounded-t font-bold transition-colors ${
            activeSection === 'requests' ? 'bg-ink text-paper' : 'hover:bg-paper-dark text-ink'
          }`}
        >
          Pending Stewardship Dossiers
        </button>
      </div>

      {/* Section 1: Curated Specimens */}
      {activeSection === 'specimens' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mySpecimens.map((project) => (
              <TombstoneCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Section 2: Margin Notes & Annotations */}
      {activeSection === 'annotations' && (
        <div className="sketch-card-static p-6 space-y-4 bg-paper">
          <h3 className="font-hand text-3xl font-bold text-ink">Field Marginalia Transcript Log</h3>

          <div className="space-y-3 font-sans text-xs">
            <div className="sketch-card p-4 bg-paper space-y-1">
              <div className="flex justify-between font-mono text-[11px] text-ink/60">
                <span className="font-bold text-ink">LostSignal • Go Telemetry Probe</span>
                <span>Yesterday at 14:20</span>
              </div>
              <p className="text-ink/90">
                "Verified WAL mode configuration on SQLite database file. Write lock latency reduced by 85%."
              </p>
              <Link href="/projects/5c5e3aa0c2504188a053ae868522b2d4/discussions" className="font-mono text-ink underline inline-block pt-1">
                View Specimen Discussion →
              </Link>
            </div>

            <div className="sketch-card p-4 bg-paper space-y-1">
              <div className="flex justify-between font-mono text-[11px] text-ink/60">
                <span className="font-bold text-ink">PulseMail • PGP Email Service</span>
                <span>3 days ago</span>
              </div>
              <p className="text-ink/90">
                "Suggested decoupling transport provider layer to allow self-hosted SendGrid / Resend credentials."
              </p>
              <Link href="/projects/617c451507db439398bb75218f715bf0/discussions" className="font-mono text-ink underline inline-block pt-1">
                View Specimen Discussion →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Section 3: Pending Stewardship Dossiers */}
      {activeSection === 'requests' && (
        <div className="sketch-card-static p-6 space-y-4 bg-paper">
          <h3 className="font-hand text-3xl font-bold text-ink">Active Stewardship Dossiers</h3>

          <div className="sketch-card p-5 bg-paper flex items-center justify-between">
            <div>
              <span className="sketch-tag px-2.5 py-0.5 text-xs font-mono font-bold text-ink">
                PROJECT: LOSTSIGNAL
              </span>
              <h4 className="font-sans font-bold text-base text-ink mt-1">Stewardship Transfer Request from Priya Patel</h4>
              <p className="text-xs font-mono text-ink/70">Plan: Migrate Go binary to AWS Lambda serverless execution</p>
            </div>

            <Link
              href="/handover/5c5e3aa0c2504188a053ae868522b2d4"
              className="sketch-btn-primary px-4 py-2 font-hand text-xl font-bold text-decoration-none"
            >
              Open Transfer Vault
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
