'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_PROJECTS } from '@/data/mockProjects';
import { ArrowLeft, MessageSquare, Send, Sparkles } from 'lucide-react';

interface DiscussionsClientProps {
  id: string;
}

export function DiscussionsClient({ id }: DiscussionsClientProps) {
  const project = MOCK_PROJECTS.find((p) => p.id === id || p.slug === id) || MOCK_PROJECTS[0];

  const [annotations, setAnnotations] = useState([
    {
      id: 'ann_1',
      author: 'Dr. Marcus Vance',
      role: 'Principal Curator',
      timestamp: 'October 18, 2024 • 14:20 UTC',
      text: 'Inspected the Go telemetry binary. Clean architecture; the TLS handshake monitoring module is completely stateless. Would require minimal refactoring to deploy on AWS Lambda.',
      lineRef: 'src/telemetry/probe.go#L42',
    },
    {
      id: 'ann_2',
      author: 'Elena Rostova',
      role: 'Infrastructure Lead',
      timestamp: 'November 02, 2024 • 09:15 UTC',
      text: 'Question regarding the SQLite storage layer: was the high write-lock latency caused by unindexed JSON columns, or WAL mode configuration?',
    },
    {
      id: 'ann_3',
      author: 'Alex Mercer (Original Creator)',
      role: 'Original Maintainer',
      timestamp: 'November 02, 2024 • 11:40 UTC',
      text: 'Re: Elena — yes! WAL mode was not enabled in the default Docker container environment. Enabling PRAGMA journal_mode=WAL instantly fixes the write lock contention under load.',
    },
  ]);

  const [newNote, setNewNote] = useState('');

  const handleAddAnnotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setAnnotations([
      ...annotations,
      {
        id: `ann_${Date.now()}`,
        author: 'Alex Mercer',
        role: 'Project Archaeologist',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: newNote,
      },
    ]);
    setNewNote('');
  };

  return (
    <div className="space-y-8">
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

      {/* Header Banner */}
      <div className="sketch-card-static p-6 bg-paper space-y-3">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink/70 uppercase">
          <span className="sketch-tag px-2 py-0.5 font-bold bg-paper-dark">DOSSIER MARGINALIA</span>
          <span>[FOLIO #01-404-LS // {project.title.toUpperCase()} // ANNOTATED ARCHIVE RECORD]</span>
        </div>

        <h1 className="font-hand text-4xl sm:text-5xl font-bold text-ink">
          Margin Notes & Curator Annotations: {project.title}
        </h1>

        <p className="text-sm font-sans text-ink/80 max-w-2xl leading-relaxed">
          Preserved community memory, technical autopsy inquiries, and revival council notes transcribed prior to official stewardship transfer.
        </p>
      </div>

      {/* Main Grid: Discussion Thread & Specimen Docket Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Margin Notes List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="sketch-card-static p-6 bg-paper space-y-6">
            <div className="flex items-center justify-between pb-3 border-b-2 border-ink/10">
              <h3 className="font-hand text-2xl font-bold text-ink flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span>Transcript Log & Technical Marginalia</span>
              </h3>
              <span className="text-xs font-mono text-ink/70">{annotations.length} Annotations</span>
            </div>

            {/* Annotations List */}
            <div className="space-y-4">
              {annotations.map((ann) => (
                <div key={ann.id} className="sketch-card p-4 bg-paper space-y-2 relative">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink">{ann.author}</span>
                      <span className="sketch-tag px-2 py-0.2 text-[10px] uppercase text-ink/70">{ann.role}</span>
                    </div>
                    <span className="text-ink/60 text-[11px]">{ann.timestamp}</span>
                  </div>

                  <p className="text-xs font-sans text-ink/90 leading-relaxed pt-1">{ann.text}</p>

                  {ann.lineRef && (
                    <div className="pt-2">
                      <code className="text-[11px] font-mono bg-paper-dark px-2 py-0.5 rounded border border-ink/20 text-ink/80">
                        Reference: {ann.lineRef}
                      </code>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Annotation Input */}
            <form onSubmit={handleAddAnnotation} className="pt-4 border-t-2 border-ink/10 space-y-3">
              <label className="text-xs font-mono font-bold text-ink block">Add Curatorial Note or Marginalia</label>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={3}
                placeholder="Transcribe technical insight, codebase inquiry, or architectural notes..."
                className="w-full sketch-input p-3 text-xs font-sans text-ink focus:outline-none"
              />
              <div className="flex justify-end">
                <button type="submit" className="sketch-btn-primary px-5 py-2 font-hand text-lg font-bold flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  <span>Transcribe Note</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Specimen Docket Sidebar */}
        <div className="sketch-card p-6 bg-paper space-y-4 h-fit">
          <div className="flex items-center justify-between pb-3 border-b-2 border-ink/10">
            <div>
              <span className="text-[10px] font-mono uppercase text-ink/60 block">SPECIMEN DOCKET</span>
              <h3 className="font-hand text-2xl font-bold text-ink">{project.title}</h3>
            </div>
            <div className="w-9 h-11 sketch-headstone flex items-center justify-center font-mono font-bold text-xs bg-paper-dark">
              LS
            </div>
          </div>

          <div className="space-y-3 text-xs font-mono text-ink/80">
            <div className="flex justify-between border-b border-ink/10 pb-2">
              <span className="text-ink/60">Status:</span>
              <span className="font-bold">{project.status.toUpperCase()}</span>
            </div>

            <div className="flex justify-between border-b border-ink/10 pb-2">
              <span className="text-ink/60">Excavation Depth:</span>
              <span className="font-bold">{project.revivalScore.effortEstimate}</span>
            </div>

            <div className="flex justify-between border-b border-ink/10 pb-2">
              <span className="text-ink/60">Revival Score:</span>
              <span className="font-bold">{project.revivalScore.overallScore}%</span>
            </div>

            <div>
              <span className="text-ink/60 block mb-1">Declared Inactive:</span>
              <span className="font-bold">{project.declaredInactiveDate}</span>
            </div>
          </div>

          <div className="pt-4 border-t-2 border-ink/10 space-y-2">
            <Link
              href={`/request-stewardship/${project.id}`}
              className="sketch-btn-primary w-full py-2.5 px-4 font-hand text-xl font-bold flex items-center justify-center gap-2 text-decoration-none"
            >
              <Sparkles className="w-5 h-5" />
              <span>Request Stewardship</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
