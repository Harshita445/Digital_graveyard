'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProjects } from '@/context/ProjectContext';
import { Github, PlusCircle, CheckCircle2, Loader2, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

export default function SubmitPage() {
  const { addProject } = useProjects();
  const [step, setStep] = useState<number>(1);
  const [isComputing, setIsComputing] = useState<boolean>(false);

  // Form State
  const [repoUrl, setRepoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [district, setDistrict] = useState('Abandoned SaaS');
  const [techStack, setTechStack] = useState('Next.js, TypeScript, PostgreSQL');
  const [declineReason, setDeclineReason] = useState('Graduation & maintainer transition to full-time work.');
  const [lessonsLearned, setLessonsLearned] = useState('Deploy on serverless architecture to reduce monthly hosting overhead.');

  const handleSimulatedScoreComputation = () => {
    setIsComputing(true);
    setTimeout(() => {
      addProject({
        title: title || 'New Archived Artifact',
        tagline: tagline || 'Community-submitted abandoned software project.',
        description: description || 'No detailed description provided.',
        district: district as any,
        techStack: techStack.split(',').map((s) => s.trim()),
        repoUrl: repoUrl || 'https://github.com/digital-graveyard/new-artifact',
        autopsyReport: {
          projectId: `proj_${Date.now()}`,
          activityTimeline: [],
          peakPeriod: 'Q2 2024',
          declinePattern: 'Gradual Decline',
          ownerStatedReason: declineReason,
          dataCorrelationNote: 'Activity dropped following transition.',
          causeOfDeclineTags: ['graduation'],
          lessonsLearned: lessonsLearned,
          recommendedRevivalPath: 'Redeploy on modern cloud platform.',
        },
      });

      setIsComputing(false);
      setStep(4);
    }, 1800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Title Header */}
      <div className="text-center space-y-2 border-b-2 border-ink/10 pb-6">
        <span className="sketch-tag px-3 py-1 text-xs font-mono font-bold text-ink inline-flex items-center gap-1.5">
          <PlusCircle className="w-3.5 h-3.5" />
          <span>PRESERVATION VAULT WIZARD</span>
        </span>
        <h1 className="font-hand text-4xl sm:text-5xl font-bold text-ink">SUBMIT ABANDONED ARTIFACT</h1>
        <p className="text-xs font-mono text-ink/70">
          Preserve your codebase, document lessons learned, and enable open revival
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between font-mono text-xs text-ink font-bold pb-2">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-ink' : 'text-ink/40'}`}>
          <span className="w-6 h-6 sketch-headstone flex items-center justify-center bg-paper">1</span>
          <span>Repo Connect</span>
        </div>
        <span>→</span>
        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-ink' : 'text-ink/40'}`}>
          <span className="w-6 h-6 sketch-headstone flex items-center justify-center bg-paper">2</span>
          <span>Info & Disclosure</span>
        </div>
        <span>→</span>
        <div className={`flex items-center gap-2 ${step >= 3 ? 'text-ink' : 'text-ink/40'}`}>
          <span className="w-6 h-6 sketch-headstone flex items-center justify-center bg-paper">3</span>
          <span>Autopsy & Health</span>
        </div>
        <span>→</span>
        <div className={`flex items-center gap-2 ${step >= 4 ? 'text-ink' : 'text-ink/40'}`}>
          <span className="w-6 h-6 sketch-headstone flex items-center justify-center bg-paper">4</span>
          <span>Preserved</span>
        </div>
      </div>

      {/* Step 1: Repo Connect */}
      {step === 1 && (
        <div className="sketch-card p-6 bg-paper space-y-6">
          <h3 className="font-hand text-2xl font-bold text-ink">Connect GitHub Repository</h3>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono font-bold text-ink block mb-1">GitHub Repository URL</label>
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/repository-name"
                className="w-full sketch-input px-3 py-2 text-sm font-sans text-ink focus:outline-none"
              />
            </div>

            <div className="p-4 sketch-card-static bg-paper-dark/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Github className="w-6 h-6 text-ink" />
                <div>
                  <p className="font-sans font-bold text-sm text-ink">Simulate OAuth Verification</p>
                  <p className="text-xs font-mono text-ink/70">Connect as @alex_archaeologist</p>
                </div>
              </div>

              <span className="sketch-tag px-3 py-1 text-xs font-mono font-bold text-ink bg-paper">
                Verified ✓
              </span>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="sketch-btn-primary px-6 py-2.5 font-hand text-xl font-bold flex items-center gap-2"
            >
              <span>Next: Artifact Info</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Info & Disclosure */}
      {step === 2 && (
        <div className="sketch-card p-6 bg-paper space-y-6">
          <h3 className="font-hand text-2xl font-bold text-ink">Artifact Information & Disclosure</h3>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <label className="font-bold text-ink block mb-1">Project Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. LostSignal"
                className="w-full sketch-input px-3 py-2 text-sm font-sans text-ink focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-ink block mb-1">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="One-line description of what the project accomplished"
                className="w-full sketch-input px-3 py-2 text-sm font-sans text-ink focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-ink block mb-1">District Category</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full sketch-input px-3 py-2 text-sm font-sans text-ink focus:outline-none bg-paper"
              >
                <option>Abandoned SaaS</option>
                <option>The Forgotten Web</option>
                <option>AI Graveyard</option>
                <option>Campus Graveyard</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-ink block mb-1">Tech Stack (comma separated)</label>
              <input
                type="text"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="Next.js, TypeScript, PostgreSQL"
                className="w-full sketch-input px-3 py-2 text-sm font-sans text-ink focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="sketch-btn px-4 py-2 font-hand text-xl font-bold flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setStep(3)}
              className="sketch-btn-primary px-6 py-2.5 font-hand text-xl font-bold flex items-center gap-2"
            >
              <span>Next: Autopsy Survey</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Autopsy Survey & Computing State */}
      {step === 3 && (
        <div className="sketch-card p-6 bg-paper space-y-6">
          <h3 className="font-hand text-2xl font-bold text-ink">Autopsy Survey & Revival Potential</h3>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <label className="font-bold text-ink block mb-1">Primary Reason for Abandonment</label>
              <textarea
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                rows={3}
                className="w-full sketch-input p-3 text-sm font-sans text-ink focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-ink block mb-1">Lessons Learned for Future Revivers</label>
              <textarea
                value={lessonsLearned}
                onChange={(e) => setLessonsLearned(e.target.value)}
                rows={3}
                className="w-full sketch-input p-3 text-sm font-sans text-ink focus:outline-none"
              />
            </div>
          </div>

          {isComputing ? (
            <div className="p-8 text-center sketch-card-static bg-paper-dark/30 space-y-3">
              <Loader2 className="w-8 h-8 text-ink animate-spin mx-auto" />
              <h4 className="font-hand text-2xl font-bold text-ink">Excavating Repository Telemetry...</h4>
              <p className="text-xs font-mono text-ink/70">Computing Code Health, Doc Quality, and Revival Potential Score</p>
            </div>
          ) : (
            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="sketch-btn px-4 py-2 font-hand text-xl font-bold flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>

              <button
                onClick={handleSimulatedScoreComputation}
                className="sketch-btn-primary px-6 py-2.5 font-hand text-xl font-bold flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Compute Revival Score & Publish</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 4: Submission Complete */}
      {step === 4 && (
        <div className="sketch-card p-8 bg-paper text-center space-y-6">
          <div className="w-16 h-16 sketch-headstone flex items-center justify-center bg-paper-dark mx-auto text-ink">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h2 className="font-hand text-4xl font-bold text-ink">Artifact Successfully Preserved!</h2>
            <p className="text-xs font-mono text-ink/70 max-w-md mx-auto mt-2">
              Computed Revival Score: <span className="font-bold text-ink">88 / 100</span> (Surface Dig).
              Published to project archive.
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Link
              href="/browse"
              className="sketch-btn-primary px-6 py-3 font-hand text-2xl font-bold text-decoration-none"
            >
              View Artifact in Archive
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
