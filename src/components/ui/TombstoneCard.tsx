import React from 'react';
import Link from 'next/link';
import { Project } from '@/types';
import { Clock, Activity, GitFork, ArrowRight, ShieldCheck } from 'lucide-react';

interface TombstoneCardProps {
  project: Project;
}

export const TombstoneCard: React.FC<TombstoneCardProps> = ({ project }) => {
  const getDomainIcon = (category: string) => {
    switch (category) {
      case 'Developer Tools':
        return (
          <svg className="w-6 h-6 text-ink stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        );
      case 'AI & Data':
        return (
          <svg className="w-6 h-6 text-ink stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
          </svg>
        );
      case 'Infrastructure':
        return (
          <svg className="w-6 h-6 text-ink stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
          </svg>
        );
      case 'Education':
        return (
          <svg className="w-6 h-6 text-ink stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-ink stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 8v4l3 3"></path>
          </svg>
        );
    }
  };

  return (
    <div className="sketch-card p-5 relative flex flex-col justify-between group transition-all">
      {/* Torn Corner Detail (incidental wear) */}
      {project.hasTornCorner && (
        <svg className="crack-corner" viewBox="0 0 20 20" fill="none">
          <path d="M 0 0 L 20 0 L 20 20 Z" fill="#ede9df" stroke="#141414" strokeWidth="1.5" />
          <line x1="2" y1="18" x2="18" y2="2" stroke="#141414" strokeWidth="1.2" />
        </svg>
      )}

      <div>
        {/* Card Header: Tombstone Frame Icon + Title & Badges */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {/* Tombstone Icon Frame */}
            <div className="w-10 h-12 sketch-headstone flex items-center justify-center shrink-0">
              {getDomainIcon(project.domainCategory)}
            </div>

            <div>
              <Link 
                href={`/projects/${project.id}`}
                className="font-sans font-bold text-lg text-ink group-hover:underline flex items-center gap-1.5"
              >
                <span>{project.title}</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <span className="text-xs font-mono text-ink/70 block">
                {project.district}
              </span>
            </div>
          </div>

          {/* Fork Friendly / License Badge */}
          {project.isForkFriendly && (
            <span 
              className="sketch-tag px-2 py-0.5 text-[10px] font-mono flex items-center gap-1 shrink-0" 
              title="Fork-friendly permissive license"
            >
              <GitFork className="w-3 h-3" />
              <span>{project.license}</span>
            </span>
          )}
        </div>

        {/* Tagline / Description */}
        <p className="text-sm text-ink/80 mb-4 line-clamp-2 leading-snug">
          {project.tagline}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech) => (
            <span key={tech} className="sketch-tag px-2 py-0.5 text-xs font-mono text-ink/80">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Info Row */}
      <div className="pt-3 border-t-2 border-ink/10 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-1 text-ink/70" title="Last active date">
          <Clock className="w-3.5 h-3.5" />
          <span>{project.lastActiveRecency}</span>
        </div>

        <div className="flex items-center gap-1 font-bold text-ink" title="Computed Revival Health Score">
          <Activity className="w-3.5 h-3.5 text-ink" />
          <span>Revival {project.revivalScore.overallScore}%</span>
        </div>
      </div>
    </div>
  );
};
