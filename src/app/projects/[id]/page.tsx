import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MOCK_PROJECTS } from '@/data/mockProjects';
import { RevivalScoreBadge } from '@/components/ui/RevivalScoreBadge';
import { AutopsyChart } from '@/components/ui/AutopsyChart';
import { CauseOfDeclineTags } from '@/components/ui/CauseOfDeclineTags';
import { ProvenanceTimeline } from '@/components/ui/ProvenanceTimeline';
import { ArrowLeft, GitFork, ExternalLink, MessageSquare, Sparkles } from 'lucide-react';

export async function generateStaticParams() {
  return MOCK_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

interface ProjectDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = MOCK_PROJECTS.find((p) => p.id === params.id || p.slug === params.id) || MOCK_PROJECTS[0];

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-10">
      {/* Back Link Nav */}
      <div className="flex items-center justify-between">
        <Link
          href="/browse"
          className="sketch-btn px-3 py-1.5 font-hand text-xl font-bold inline-flex items-center gap-2 hover:bg-paper-dark text-decoration-none"
        >
          <ArrowLeft className="w-5 h-5 text-ink" />
          <span>Back to Collections</span>
        </Link>

        <Link
          href={`/projects/${project.id}/discussions`}
          className="sketch-btn px-4 py-1.5 font-hand text-xl font-bold inline-flex items-center gap-2 hover:bg-paper-dark text-decoration-none"
        >
          <MessageSquare className="w-4 h-4 text-ink" />
          <span>Margin Notes & Curator Annotations</span>
        </Link>
      </div>

      {/* 1. Project Headstone (Identity Plaque) */}
      <section className="sketch-headstone p-8 bg-paper relative shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b-2 border-ink/10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="sketch-tag px-2.5 py-0.5 text-xs font-mono font-bold text-ink">
                {project.district}
              </span>
              <span className="sketch-tag px-2.5 py-0.5 text-xs font-mono text-ink">
                License: {project.license}
              </span>
              {project.isForkFriendly && (
                <span className="sketch-tag px-2.5 py-0.5 text-xs font-mono font-bold text-ink flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" />
                  <span>Fork-Friendly</span>
                </span>
              )}
            </div>

            <h1 className="font-hand text-5xl sm:text-6xl font-bold text-ink mb-2">{project.title}</h1>
            <p className="text-base sm:text-lg text-ink/80 max-w-2xl leading-relaxed">{project.tagline}</p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <Link
              href={`/request-stewardship/${project.id}`}
              className="sketch-btn-primary px-6 py-3 font-hand text-2xl font-bold flex items-center justify-center gap-2 text-decoration-none"
            >
              <Sparkles className="w-6 h-6" />
              <span>Request Stewardship Dossier</span>
            </Link>

            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sketch-btn px-4 py-3 font-hand text-2xl font-bold flex items-center justify-center gap-2 hover:bg-paper-dark text-decoration-none"
            >
              <ExternalLink className="w-5 h-5 text-ink" />
              <span>Source Repo</span>
            </a>
          </div>
        </div>

        {/* Headstone Identity Plaque Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-xs font-mono">
          <div>
            <span className="text-ink/60 uppercase block">Declared Inactive</span>
            <span className="font-bold text-sm text-ink">{project.declaredInactiveDate}</span>
          </div>

          <div>
            <span className="text-ink/60 uppercase block">Original Maintainer</span>
            <span className="font-bold text-sm text-ink">{project.owner.name}</span>
          </div>

          <div>
            <span className="text-ink/60 uppercase block">Excavation Depth</span>
            <span className="font-bold text-sm text-ink">{project.revivalScore.effortEstimate}</span>
          </div>

          <div>
            <span className="text-ink/60 uppercase block">Revival Score</span>
            <span className="font-bold text-sm text-ink">{project.revivalScore.overallScore} / 100</span>
          </div>
        </div>
      </section>

      {/* 2. Revival Score Dashboard */}
      <section>
        <RevivalScoreBadge score={project.revivalScore} />
      </section>

      {/* 3. Autopsy Report (Period-by-period bar chart & narrative) */}
      <section>
        <AutopsyChart report={project.autopsyReport} />
      </section>

      {/* 4. Cause of Decline Tags & Tech Stack */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="sketch-card-static p-6">
          <CauseOfDeclineTags tags={project.autopsyReport.causeOfDeclineTags} />
        </div>

        <div className="sketch-card-static p-6 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-ink/70 block">Tech Stack Blueprint</span>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.techStack.map((tech) => (
              <span key={tech} className="sketch-tag px-3 py-1 text-xs font-mono font-bold text-ink">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Disclosure & Assets Panel */}
      <section className="sketch-card-static p-6 space-y-4">
        <h3 className="font-hand text-2xl font-bold text-ink pb-2 border-b border-ink/10">
          Mandatory Asset Disclosure
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
          <div className="space-y-2">
            <span className="font-bold text-ink block">Included Assets:</span>
            <ul className="list-disc pl-4 space-y-1 text-ink/80">
              {project.disclosure.includedAssets.map((asset, i) => (
                <li key={i}>{asset}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-ink block">Known Regressions / Issues:</span>
            <ul className="list-disc pl-4 space-y-1 text-ink/80">
              {project.disclosure.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-3 border-t border-ink/10 flex justify-between text-xs font-mono text-ink/70">
          <span>Est. Monthly Hosting Cost: ${project.disclosure.hostingCostMonthlyUSD}/mo</span>
          <span>Repo License: {project.license}</span>
        </div>
      </section>

      {/* 6. Provenance Timeline */}
      <section>
        <ProvenanceTimeline nodes={project.provenance} />
      </section>
    </div>
  );
}
