import React from 'react';
import Link from 'next/link';
import { MOCK_USER, MOCK_PROJECTS } from '@/data/mockProjects';
import { TombstoneCard } from '@/components/ui/TombstoneCard';
import { User, Award, BookOpen, GitCommit, Sparkles } from 'lucide-react';

export async function generateStaticParams() {
  return [
    { id: 'usr_alex_mercer' },
    { id: 'alex_mercer' },
  ];
}

export default function ProfilePage() {
  const user = MOCK_USER;
  const userProjects = MOCK_PROJECTS;

  return (
    <div className="space-y-10">
      {/* Archaeologist Identity Header Plaque */}
      <section className="sketch-card-static p-8 bg-paper relative">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b-2 border-ink/10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-20 sketch-headstone flex items-center justify-center bg-paper-dark text-2xl font-bold font-mono text-ink shrink-0">
              <User className="w-10 h-10 text-ink" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="sketch-tag px-2.5 py-0.5 text-xs font-mono font-bold text-ink flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{user.roleTitle}</span>
                </span>
                <span className="text-xs font-mono text-ink/60">{user.handle}</span>
              </div>

              <h1 className="font-hand text-4xl sm:text-5xl font-bold text-ink">{user.name}</h1>
              <p className="text-xs font-mono text-ink/70">GitHub: {user.githubHandle} • Field Journal #8402</p>
            </div>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-4">
            <div className="sketch-card-static p-3 text-center bg-paper-dark/30 min-w-[110px]">
              <span className="font-sans font-bold text-2xl text-ink block">{user.projectsRevived}</span>
              <span className="text-[10px] font-mono text-ink/70 uppercase">Projects Revived</span>
            </div>

            <div className="sketch-card-static p-3 text-center bg-paper-dark/30 min-w-[110px]">
              <span className="font-sans font-bold text-2xl text-ink block">{user.artifactsPreserved}</span>
              <span className="text-[10px] font-mono text-ink/70 uppercase">Artifacts Preserved</span>
            </div>
          </div>
        </div>

        {/* Achievements Row */}
        <div className="pt-6 space-y-3">
          <h3 className="font-hand text-2xl font-bold text-ink flex items-center gap-2">
            <Award className="w-5 h-5 text-ink" />
            <span>Archaeological Achievements</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {user.achievements.map((ach) => (
              <div key={ach.id} className="sketch-card-static p-4 flex items-start gap-3 bg-paper">
                <span className="text-2xl">{ach.icon}</span>
                <div>
                  <h4 className="font-sans font-bold text-sm text-ink">{ach.title}</h4>
                  <p className="text-xs text-ink/80 leading-snug">{ach.description}</p>
                  <span className="text-[10px] font-mono text-ink/60 mt-1 block">Unlocked {ach.unlockedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Field Journal Notes & Preserved Projects */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b-2 border-ink/10">
          <div>
            <h2 className="font-hand text-3xl font-bold text-ink">Field Journal & Stewardship Ledger</h2>
            <p className="text-xs font-mono text-ink/70">Artifacts curated or adopted by Alex Mercer</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userProjects.map((project) => (
            <TombstoneCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
