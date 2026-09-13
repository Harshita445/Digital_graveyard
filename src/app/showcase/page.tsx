import React from 'react';
import Link from 'next/link';
import { MOCK_PROJECTS } from '@/data/mockProjects';
import { Award, ArrowRight, TreeDeciduous, CheckCircle, ExternalLink } from 'lucide-react';

export default function ShowcasePage() {
  const revivedProjects = [
    {
      title: 'LostSignal → CloudSignal',
      district: 'Abandoned SaaS',
      restoredBy: 'Priya Patel & Team',
      restorationDate: 'August 2025',
      before: {
        status: 'Abandoned (Go 1.20)',
        health: '65% Code Health',
        issue: 'Founders graduated; hosting server shut down due to AWS costs.',
      },
      after: {
        status: 'Active & Serverless (Go 1.22 + Lambda)',
        health: '94% Code Health',
        outcome: 'Restored as open-source web monitor serving 3,400 daily ping requests.',
      },
      repoUrl: 'https://github.com/digital-graveyard/lostsignal',
    },
    {
      title: 'OpenMentor → Thapar ACM MentorNet',
      district: 'Campus Graveyard',
      restoredBy: 'Thapar ACM Student Chapter',
      restorationDate: 'January 2026',
      before: {
        status: 'Dormant (Graduated Execs)',
        health: '70% Code Health',
        issue: 'Student leadership changed; email SMTP tokens expired.',
      },
      after: {
        status: 'Active Campus Hub',
        health: '98% Code Health',
        outcome: 'Adopted by new executive committee; connected 220 student code reviewers.',
      },
      repoUrl: 'https://github.com/digital-graveyard/openmentor-campus',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b-2 border-ink/10 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-ink/60 block">Restoration Hall of Fame</span>
          <h1 className="font-hand text-4xl sm:text-5xl font-bold text-ink">BEFORE & AFTER REVIVAL SHOWCASE</h1>
        </div>

        <span className="sketch-tag px-3 py-1 text-xs font-mono font-bold text-ink flex items-center gap-1.5">
          <TreeDeciduous className="w-4 h-4 text-ink" />
          <span>Restored Artifacts</span>
        </span>
      </div>

      {/* Side-by-Side Comparison Panels */}
      <div className="space-y-8">
        {revivedProjects.map((item, idx) => (
          <div key={idx} className="sketch-card p-6 bg-paper space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-ink/10">
              <div>
                <span className="sketch-tag px-2.5 py-0.5 text-xs font-mono font-bold text-ink mb-1 inline-block">
                  {item.district}
                </span>
                <h3 className="font-hand text-3xl font-bold text-ink">{item.title}</h3>
                <p className="text-xs font-mono text-ink/70">
                  Restored by <span className="font-bold text-ink">{item.restoredBy}</span> • {item.restorationDate}
                </p>
              </div>

              <a
                href={item.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sketch-btn px-4 py-2 font-hand text-xl font-bold flex items-center gap-2 hover:bg-paper-dark text-decoration-none"
              >
                <ExternalLink className="w-4 h-4 text-ink" />
                <span>View Restored Repo</span>
              </a>
            </div>

            {/* Side-by-side comparison grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before Panel */}
              <div className="sketch-card-static p-5 bg-paper-dark/30 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="sketch-tag px-2.5 py-0.5 text-xs font-mono font-bold text-ink">
                    🪨 BEFORE (ABANDONED)
                  </span>
                  <span className="text-xs font-mono text-ink/60">{item.before.health}</span>
                </div>

                <div className="space-y-1 text-xs font-mono">
                  <p className="font-bold text-ink">Status: {item.before.status}</p>
                  <p className="text-ink/80 leading-relaxed font-sans text-xs pt-1">{item.before.issue}</p>
                </div>
              </div>

              {/* After Panel */}
              <div className="sketch-card-static p-5 bg-paper border-2 border-ink space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="sketch-tag px-2.5 py-0.5 text-xs font-mono font-bold text-ink bg-paper-dark">
                    🌱 AFTER (REVIVED)
                  </span>
                  <span className="text-xs font-mono font-bold text-ink">{item.after.health}</span>
                </div>

                <div className="space-y-1 text-xs font-mono">
                  <p className="font-bold text-ink flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-ink" />
                    <span>Status: {item.after.status}</span>
                  </p>
                  <p className="text-ink/90 leading-relaxed font-sans text-xs pt-1">{item.after.outcome}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
