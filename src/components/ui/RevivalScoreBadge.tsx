import React from 'react';
import { RevivalScore } from '@/types';
import { Shield, Code, FileText, Layers, RefreshCw } from 'lucide-react';

interface RevivalScoreBadgeProps {
  score: RevivalScore;
}

export const RevivalScoreBadge: React.FC<RevivalScoreBadgeProps> = ({ score }) => {
  const metrics = [
    {
      label: 'Code Health',
      value: score.codeHealthScore,
      icon: Code,
      desc: 'Lint, test pass rate & clean architecture',
    },
    {
      label: 'Doc Quality',
      value: score.docQualityScore,
      icon: FileText,
      desc: 'README, API specs & setup guide',
    },
    {
      label: 'Dependency Freshness',
      value: score.subMetrics.dependencyFreshness,
      icon: RefreshCw,
      desc: 'NPM/Go module vulnerability freshness',
    },
    {
      label: 'Architecture Stability',
      value: score.subMetrics.architectureStability,
      icon: Layers,
      desc: 'Decoupled services & modular design',
    },
  ];

  return (
    <div className="sketch-card-static p-6 relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-6 border-b-2 border-ink/10">
        <div>
          <h3 className="font-hand text-2xl font-bold text-ink">Revival Score Dashboard</h3>
          <p className="text-xs font-mono text-ink/70">
            System-generated health analysis • Computed {new Date(score.lastComputedAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-14 h-14 sketch-headstone flex flex-col items-center justify-center bg-paper-dark">
            <span className="font-sans font-bold text-xl leading-none text-ink">{score.overallScore}</span>
            <span className="text-[9px] font-mono uppercase text-ink/70">/ 100</span>
          </div>

          <div className="text-left">
            <span className="text-xs font-mono text-ink/60 uppercase block">Excavation Depth</span>
            <span className="sketch-tag px-2 py-0.5 text-xs font-mono font-bold text-ink inline-block">
              ⛏️ {score.effortEstimate}
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 font-bold text-ink">
                  <Icon className="w-4 h-4 text-ink" />
                  {metric.label}
                </span>
                <span className="font-bold">{metric.value}%</span>
              </div>

              {/* Hand-drawn style segmented bar */}
              <div className="w-full h-3 border-2 border-ink bg-paper rounded-full overflow-hidden p-0.5 relative">
                <div
                  className="h-full bg-ink rounded-full transition-all duration-700"
                  style={{ width: `${metric.value}%` }}
                />
              </div>

              <p className="text-[11px] text-ink/70 font-sans">{metric.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
