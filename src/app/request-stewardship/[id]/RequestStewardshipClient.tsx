'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_PROJECTS } from '@/data/mockProjects';
import { ArrowLeft, Sparkles, CheckCircle2, FileText } from 'lucide-react';

interface RequestStewardshipClientProps {
  id: string;
}

export function RequestStewardshipClient({ id }: RequestStewardshipClientProps) {
  const project = MOCK_PROJECTS.find((p) => p.id === id || p.slug === id) || MOCK_PROJECTS[0];

  const [reviverName, setReviverName] = useState('Alex Mercer');
  const [reviverEmail, setReviverEmail] = useState('alex.mercer@archaeology.io');
  const [githubHandle, setGithubHandle] = useState('alexmercer-dev');
  const [revivalPlan, setRevivalPlan] = useState('Migrate backend to AWS Lambda serverless execution and issue v2.0 release on GitHub.');
  const [teamSize, setTeamSize] = useState('2-4 Engineers');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Navigation */}
      <div>
        <Link
          href={`/projects/${project.id}`}
          className="sketch-btn px-3 py-1.5 font-hand text-xl font-bold inline-flex items-center gap-2 hover:bg-paper-dark text-decoration-none"
        >
          <ArrowLeft className="w-5 h-5 text-ink" />
          <span>Back to Specimen Record ({project.title})</span>
        </Link>
      </div>

      {/* Title */}
      <div className="text-center space-y-2 border-b-2 border-ink/10 pb-6">
        <span className="sketch-tag px-3 py-1 text-xs font-mono font-bold text-ink inline-flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" />
          <span>OFFICIAL ACCESSION FORM</span>
        </span>
        <h1 className="font-hand text-4xl sm:text-5xl font-bold text-ink">REQUEST STEWARDSHIP DOSSIER</h1>
        <p className="text-xs font-mono text-ink/70">
          Formal request for transfer of repository ownership and specimen governance for {project.title}
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="sketch-card p-8 bg-paper space-y-6">
          <div className="space-y-4 text-xs font-mono">
            <h3 className="font-hand text-2xl font-bold text-ink border-b border-ink/10 pb-2">
              1. Reviver Identity & Credentials
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-ink block mb-1">Full Name</label>
                <input
                  type="text"
                  value={reviverName}
                  onChange={(e) => setReviverName(e.target.value)}
                  className="w-full sketch-input px-3 py-2 text-sm font-sans text-ink focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-ink block mb-1">GitHub Handle</label>
                <input
                  type="text"
                  value={githubHandle}
                  onChange={(e) => setGithubHandle(e.target.value)}
                  className="w-full sketch-input px-3 py-2 text-sm font-sans text-ink focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-ink block mb-1">Email Address</label>
              <input
                type="email"
                value={reviverEmail}
                onChange={(e) => setReviverEmail(e.target.value)}
                className="w-full sketch-input px-3 py-2 text-sm font-sans text-ink focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <h3 className="font-hand text-2xl font-bold text-ink border-b border-ink/10 pb-2">
              2. Revival Strategy & Infrastructure Plan
            </h3>

            <div>
              <label className="font-bold text-ink block mb-1">Planned Architecture & Refactoring Roadmap</label>
              <textarea
                value={revivalPlan}
                onChange={(e) => setRevivalPlan(e.target.value)}
                rows={4}
                className="w-full sketch-input p-3 text-sm font-sans text-ink focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="font-bold text-ink block mb-1">Resource & Team Commitment</label>
              <select
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                className="w-full sketch-input px-3 py-2 text-sm font-sans text-ink focus:outline-none bg-paper"
              >
                <option>Solo Archaeologist</option>
                <option>2-4 Engineers</option>
                <option>University Student Chapter</option>
                <option>Open Source Collective</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t-2 border-ink/10 flex justify-end">
            <button
              type="submit"
              className="sketch-btn-primary px-6 py-3 font-hand text-2xl font-bold flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Submit Stewardship Request Dossier</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="sketch-card p-8 bg-paper text-center space-y-6">
          <div className="w-16 h-16 sketch-headstone flex items-center justify-center bg-paper-dark mx-auto text-ink">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h2 className="font-hand text-4xl font-bold text-ink">Stewardship Dossier Submitted!</h2>
            <p className="text-xs font-mono text-ink/70 max-w-md mx-auto mt-2">
              Your request for <span className="font-bold text-ink">{project.title}</span> has been registered in the transfer ledger. The original maintainer and curatorial council have been notified.
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Link
              href={`/handover/${project.id}`}
              className="sketch-btn-primary px-6 py-3 font-hand text-2xl font-bold text-decoration-none"
            >
              Proceed to Handover Vault
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
