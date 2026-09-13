'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Project } from '@/types';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

interface GraveyardMapProps {
  projects: Project[];
}

export const GraveyardMap: React.FC<GraveyardMapProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0] || null);

  return (
    <div className="sketch-card-static p-6 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-6 border-b-2 border-ink/10 gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-ink/60 block">Excavation Cartography</span>
          <h2 className="font-hand text-3xl font-bold text-ink">GRAVEYARD QUADRANT MAP</h2>
        </div>

        <div className="text-xs font-mono text-ink/80 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-ink" />
          <span>Click any marker to inspect artifact details</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive 2D Scatter Chart */}
        <div className="lg:col-span-2 relative aspect-square sm:aspect-[4/3] bg-paper border-2 border-ink sketch-card-static p-6 flex flex-col justify-between overflow-hidden">
          {/* Quadrant Labels Background */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none opacity-20">
            <div className="border-r border-b border-ink/40 p-4 font-hand text-2xl font-bold text-ink/60">
              Hidden Gem
            </div>
            <div className="border-b border-ink/40 p-4 font-hand text-2xl font-bold text-ink text-right bg-paper-dark/30">
              Gold Mine 🌟
            </div>
            <div className="border-r border-ink/40 p-4 font-hand text-2xl font-bold text-ink/60 flex items-end">
              Lost Cause
            </div>
            <div className="p-4 font-hand text-2xl font-bold text-ink/60 flex items-end justify-end">
              High Risk
            </div>
          </div>

          {/* Axes Lines */}
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-ink/30 pointer-events-none" />
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-ink/30 pointer-events-none" />

          {/* Axis Labels */}
          <div className="absolute left-3 top-2 text-[11px] font-mono font-bold text-ink z-10">
            ▲ High Revival Potential (100)
          </div>
          <div className="absolute left-3 bottom-2 text-[11px] font-mono font-bold text-ink z-10">
            ▼ Low Potential (0)
          </div>
          <div className="absolute left-3 top-1/2 -translate-y-6 text-[11px] font-mono font-bold text-ink z-10">
            ◀ Low Effort (Surface Dig)
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-6 text-[11px] font-mono font-bold text-ink text-right z-10">
            High Effort (Deep Excavation) ▶
          </div>

          {/* Project Markers */}
          <div className="absolute inset-12">
            {projects.map((project) => {
              const coords = project.quadrantCoordinates || { effort: 50, potential: 50 };
              const isSelected = selectedProject?.id === project.id;

              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  style={{
                    left: `${coords.effort}%`,
                    bottom: `${coords.potential}%`,
                  }}
                  className={`absolute -translate-x-1/2 translate-y-1/2 group focus:outline-none transition-transform z-20 ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                  title={`${project.title} (${project.revivalScore.effortEstimate})`}
                >
                  <div
                    className={`w-9 h-10 sketch-headstone flex items-center justify-center text-xs font-bold font-mono transition-colors shadow-md ${
                      isSelected ? 'bg-ink text-paper' : 'bg-paper text-ink border-2 border-ink hover:bg-paper-dark'
                    }`}
                  >
                    {project.revivalScore.overallScore}
                  </div>

                  {/* Hover Marker Tag */}
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 bg-ink text-paper text-[10px] font-mono px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
                    {project.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Project Detail Drawer */}
        {selectedProject ? (
          <div className="sketch-card p-6 flex flex-col justify-between h-full bg-paper">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="sketch-tag px-2.5 py-0.5 text-xs font-mono font-bold text-ink">
                  {selectedProject.district}
                </span>
                <span className="text-xs font-mono text-ink/70">
                  Revival {selectedProject.revivalScore.overallScore}%
                </span>
              </div>

              <h3 className="font-hand text-3xl font-bold text-ink mb-2">{selectedProject.title}</h3>
              <p className="text-sm text-ink/80 mb-4 leading-relaxed">{selectedProject.description}</p>

              <div className="space-y-3 pt-3 border-t border-ink/10 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-ink/60">Excavation Depth:</span>
                  <span className="font-bold">{selectedProject.revivalScore.effortEstimate}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-ink/60">Declared Inactive:</span>
                  <span className="font-bold">{selectedProject.declaredInactiveDate}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-ink/60">License:</span>
                  <span className="font-bold">{selectedProject.license}</span>
                </div>

                <div>
                  <span className="text-ink/60 block mb-1">Required Tech Stack:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedProject.techStack.map((tech) => (
                      <span key={tech} className="sketch-tag px-2 py-0.5 text-[11px] font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href={`/projects/${selectedProject.id}`}
                className="sketch-btn-primary w-full py-2.5 px-4 font-hand text-xl font-bold flex items-center justify-center gap-2 group text-decoration-none"
              >
                <span>Inspect Full Record</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="sketch-card p-6 flex flex-col items-center justify-center text-center text-ink/60">
            <Compass className="w-12 h-12 mb-3 stroke-1" />
            <p className="font-hand text-xl">Select a tombstone marker to view artifact summary.</p>
          </div>
        )}
      </div>
    </div>
  );
};
