'use client';

import React, { useState } from 'react';
import { Project, HandoverStep } from '@/types';
import { CheckCircle2, Circle, FileText, Send, Sparkles, Sprout, TreeDeciduous, ShieldAlert, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HandoverChecklistProps {
  project: Project;
}

export const HandoverChecklist: React.FC<HandoverChecklistProps> = ({ project }) => {
  const [steps, setSteps] = useState<HandoverStep[]>([
    {
      id: 'step_1',
      title: 'Repository Access & Ownership Transfer',
      description: 'Transfer GitHub admin permissions or invite adopter as primary maintainer.',
      ownerConfirmed: true,
      adopterConfirmed: true,
      completedAt: '2026-09-12T10:15:00Z',
    },
    {
      id: 'step_2',
      title: 'Domain & Hosting Credentials Handover',
      description: 'Transfer DNS records, Cloudflare project routing, and host configuration.',
      ownerConfirmed: true,
      adopterConfirmed: false,
    },
    {
      id: 'step_3',
      title: 'Environment Secrets & Deployment Pipeline',
      description: 'Provide API key templates, secrets manager references, and staging URLs.',
      ownerConfirmed: false,
      adopterConfirmed: false,
    },
    {
      id: 'step_4',
      title: 'Final Asset Stewardship Verification',
      description: 'Mutual sign-off confirming complete transfer and launching project revival.',
      ownerConfirmed: false,
      adopterConfirmed: false,
    },
  ]);

  const [messages, setMessages] = useState([
    { id: 'm1', sender: 'Alex Mercer (Original Creator)', text: 'Uploaded the updated secrets template to the transfer vault.', time: '10:15 AM' },
    { id: 'm2', sender: 'Priya Patel (Adopter)', text: 'Confirmed repo invite! Testing the local build setup now.', time: '10:30 AM' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [growthStage, setGrowthStage] = useState<'tombstone' | 'sapling' | 'tree'>('tombstone');

  const toggleStep = (stepId: string, role: 'ownerConfirmed' | 'adopterConfirmed') => {
    const updated = steps.map((step) => {
      if (step.id === stepId) {
        const nextStep = { ...step, [role]: !step[role] };
        if (nextStep.ownerConfirmed && nextStep.adopterConfirmed) {
          nextStep.completedAt = new Date().toISOString();
        }
        return nextStep;
      }
      return step;
    });
    setSteps(updated);

    // Check if all steps are completed
    const allDone = updated.every((s) => s.ownerConfirmed && s.adopterConfirmed);
    if (allDone && !isCompleted) {
      triggerRevivalCelebration();
    }
  };

  const triggerRevivalCelebration = () => {
    setIsCompleted(true);
    setGrowthStage('sapling');
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });

    setTimeout(() => {
      setGrowthStage('tree');
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 } });
    }, 1200);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now().toString(), sender: 'Priya Patel (Adopter)', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
    setNewMessage('');
  };

  return (
    <div className="space-y-8">
      {/* Signature Revival Growth Stage Animation Banner */}
      <div className="sketch-card p-6 text-center bg-paper relative overflow-hidden transition-all duration-700">
        <div className="flex flex-col items-center justify-center space-y-3">
          {/* Animated Graphic State */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            {growthStage === 'tombstone' && (
              <div className="animate-pulse">
                <svg className="w-20 h-24 text-ink fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 40 48">
                  <path d="M 8 45 L 8 18 C 8 8, 32 8, 32 18 L 32 45"></path>
                  <path d="M 4 45 L 36 45"></path>
                  <path d="M 16 26 L 24 26 M 20 22 L 20 34" strokeWidth="2"></path>
                </svg>
              </div>
            )}

            {growthStage === 'sapling' && (
              <div className="scale-110 transition-transform duration-500 text-ink">
                <Sprout className="w-20 h-20 stroke-[1.8] animate-bounce" />
              </div>
            )}

            {growthStage === 'tree' && (
              <div className="scale-125 transition-transform duration-700 text-ink">
                <TreeDeciduous className="w-24 h-24 stroke-[1.8]" />
              </div>
            )}
          </div>

          <div>
            <h2 className="font-hand text-3xl font-bold text-ink">
              {growthStage === 'tombstone' && 'Stewardship Transfer in Progress'}
              {growthStage === 'sapling' && 'Seeds of Revival Sprouting...'}
              {growthStage === 'tree' && '🌱 REVIVAL COMPLETE! Artifact Transformed.'}
            </h2>

            <p className="text-xs font-mono text-ink/70 max-w-xl mx-auto mt-1">
              {growthStage === 'tree'
                ? 'The tombstone has bloomed into a living open-source project. Provenance block recorded.'
                : 'Mutual sign-off required by both Original Creator and Adopter to complete stewardship transfer.'}
            </p>
          </div>

          {!isCompleted && (
            <button
              onClick={triggerRevivalCelebration}
              className="sketch-btn px-4 py-2 font-hand text-lg font-bold flex items-center gap-2 hover:bg-paper-dark"
            >
              <Sparkles className="w-4 h-4 text-ink" />
              <span>Simulate Full Handover Sign-Off</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Handover Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Checklist Steps Column */}
        <div className="lg:col-span-2 sketch-card-static p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b-2 border-ink/10">
            <div>
              <h3 className="font-hand text-2xl font-bold text-ink">Transfer Protocol Checklist</h3>
              <p className="text-xs font-mono text-ink/70">Dual-confirmation required per step</p>
            </div>

            <a
              href="#agreement"
              className="sketch-tag px-3 py-1 text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-paper-dark text-decoration-none"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Legal Agreement PDF</span>
            </a>
          </div>

          <div className="space-y-4">
            {steps.map((step, idx) => {
              const isDone = step.ownerConfirmed && step.adopterConfirmed;

              return (
                <div
                  key={step.id}
                  className={`sketch-card-static p-4 transition-colors ${
                    isDone ? 'bg-paper-dark/30' : 'bg-paper'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 sketch-headstone flex items-center justify-center font-mono font-bold text-xs shrink-0">
                        0{idx + 1}
                      </span>
                      <div>
                        <h4 className="font-sans font-bold text-base text-ink">{step.title}</h4>
                        <p className="text-xs text-ink/80 leading-relaxed mt-0.5">{step.description}</p>
                      </div>
                    </div>

                    {isDone && (
                      <span className="sketch-tag px-2 py-0.5 text-[10px] font-mono font-bold text-ink flex items-center gap-1 shrink-0">
                        <Award className="w-3 h-3" />
                        <span>VERIFIED</span>
                      </span>
                    )}
                  </div>

                  {/* Dual Confirm Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-ink/10 text-xs font-mono">
                    <div className="flex items-center gap-4">
                      {/* Owner Check */}
                      <button
                        onClick={() => toggleStep(step.id, 'ownerConfirmed')}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded border ${
                          step.ownerConfirmed ? 'bg-ink text-paper border-ink font-bold' : 'border-ink/40 text-ink/70 hover:border-ink'
                        }`}
                      >
                        {step.ownerConfirmed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                        <span>Owner Sign</span>
                      </button>

                      {/* Adopter Check */}
                      <button
                        onClick={() => toggleStep(step.id, 'adopterConfirmed')}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded border ${
                          step.adopterConfirmed ? 'bg-ink text-paper border-ink font-bold' : 'border-ink/40 text-ink/70 hover:border-ink'
                        }`}
                      >
                        {step.adopterConfirmed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                        <span>Adopter Sign</span>
                      </button>
                    </div>

                    {step.completedAt && (
                      <span className="text-[10px] text-ink/60">
                        Completed: {new Date(step.completedAt).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Messaging & Asset Log Column */}
        <div className="sketch-card-static p-6 flex flex-col justify-between h-full space-y-4">
          <div>
            <h3 className="font-hand text-2xl font-bold text-ink pb-2 border-b-2 border-ink/10 mb-4">
              Handover Telemetry Log
            </h3>

            {/* Message Thread */}
            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
              {messages.map((msg) => (
                <div key={msg.id} className="p-3 sketch-card-static bg-paper text-xs space-y-1">
                  <div className="flex items-center justify-between font-mono text-[10px] text-ink/60">
                    <span className="font-bold text-ink">{msg.sender}</span>
                    <span>{msg.time}</span>
                  </div>
                  <p className="font-sans text-ink/90 leading-snug">{msg.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Send Message Input */}
          <form onSubmit={sendMessage} className="flex items-center gap-2 pt-3 border-t border-ink/10">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Send transfer update..."
              className="flex-1 sketch-input px-3 py-1.5 text-xs font-sans text-ink focus:outline-none"
            />
            <button type="submit" className="sketch-btn p-2 hover:bg-paper-dark">
              <Send className="w-4 h-4 text-ink" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
