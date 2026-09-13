import React from 'react';
import Link from 'next/link';
import { MOCK_PROJECTS } from '@/data/mockProjects';
import { HandoverChecklist } from '@/components/ui/HandoverChecklist';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export async function generateStaticParams() {
  return MOCK_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

interface HandoverPageProps {
  params: {
    id: string;
  };
}

export default function HandoverPage({ params }: HandoverPageProps) {
  const project = MOCK_PROJECTS.find((p) => p.id === params.id || p.slug === params.id) || MOCK_PROJECTS[0];

  return (
    <div className="space-y-8">
      <div>
        <Link
          href={`/projects/${project.id}`}
          className="sketch-btn px-3 py-1.5 font-hand text-xl font-bold inline-flex items-center gap-2 hover:bg-paper-dark text-decoration-none"
        >
          <ArrowLeft className="w-5 h-5 text-ink" />
          <span>Back to Artifact Record ({project.title})</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b-2 border-ink/10 gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-ink/60 block">Stewardship Protocol</span>
          <h1 className="font-hand text-4xl sm:text-5xl font-bold text-ink">HANDOVER TRANSFER VAULT</h1>
        </div>

        <span className="sketch-tag px-3 py-1 text-xs font-mono font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-ink" />
          <span>Artifact: {project.title}</span>
        </span>
      </div>

      <HandoverChecklist project={project} />
    </div>
  );
}
