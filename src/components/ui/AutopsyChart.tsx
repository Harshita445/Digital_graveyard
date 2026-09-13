import React from 'react';
import { AutopsyReport } from '@/types';
import { Activity, AlertTriangle, Lightbulb } from 'lucide-react';

interface AutopsyChartProps {
  report: AutopsyReport;
}

export const AutopsyChart: React.FC<AutopsyChartProps> = ({ report }) => {
  const maxCommits = Math.max(...report.activityTimeline.map((item) => item.commits), 1);

  return (
    <div className="sketch-card-static p-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-6 border-b-2 border-ink/10 gap-3">
        <div>
          <span className="text-xs font-mono tracking-widest text-ink/60 uppercase block">Signature Diagnostic</span>
          <h3 className="font-hand text-3xl font-bold text-ink">AUTOPSY REPORT</h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="sketch-tag px-3 py-1 text-xs font-mono font-bold text-ink flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-ink" />
            <span>Pattern: {report.declinePattern}</span>
          </span>
        </div>
      </div>

      {/* ASCII/Bar-style Activity Chart */}
      <div className="mb-6">
        <div className="text-xs font-mono text-ink/70 mb-3 flex items-center justify-between">
          <span>Historical Activity Timeline (Commits / Period)</span>
          <span className="font-bold">Peak: {report.peakPeriod}</span>
        </div>

        <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-4 border-b-2 border-l-2 border-ink bg-paper-dark/30 rounded-br-lg">
          {report.activityTimeline.map((item) => {
            const heightPct = Math.round((item.commits / maxCommits) * 100);

            return (
              <div key={item.period} className="flex-1 flex flex-col items-center gap-1 group relative">
                {/* Tooltip on hover */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-ink text-paper text-[10px] font-mono px-2 py-1 rounded shadow pointer-events-none whitespace-nowrap z-10">
                  {item.commits} commits • {item.contributors} dev(s)
                </div>

                {/* Peak Marker Badge */}
                {item.isPeak && (
                  <span className="text-[10px] font-mono font-bold text-ink bg-paper sketch-tag px-1.5 py-0.2 mb-1">
                    PEAK
                  </span>
                )}

                {/* Bar */}
                <div className="w-full max-w-[48px] bg-paper border-2 border-ink rounded-t relative overflow-hidden flex items-end justify-center" style={{ height: `${Math.max(heightPct, 8)}%` }}>
                  <div className={`w-full ${item.isPeak ? 'bg-ink' : 'bg-ink/70'} transition-all`} style={{ height: '100%' }} />
                </div>

                {/* Period Label */}
                <span className="text-[11px] font-mono text-ink/80 truncate w-full text-center mt-1">
                  {item.period}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Narrative Section */}
      <div className="space-y-4 font-sans text-sm">
        <div className="bg-paper p-4 sketch-card-static">
          <h4 className="font-hand text-xl font-bold text-ink mb-1">Owner Postmortem</h4>
          <p className="text-ink/80 leading-relaxed">{report.ownerStatedReason}</p>
        </div>

        <div className="bg-paper-dark/40 p-4 border-l-4 border-ink">
          <h4 className="font-mono text-xs font-bold text-ink uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-ink" />
            <span>Forensic Data Correlation</span>
          </h4>
          <p className="text-xs text-ink/80 leading-relaxed font-mono">{report.dataCorrelationNote}</p>
        </div>

        <div className="bg-paper p-4 sketch-card-static flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-ink shrink-0 mt-0.5" />
          <div>
            <h4 className="font-hand text-lg font-bold text-ink">Recommended Revival Path</h4>
            <p className="text-xs text-ink/80 leading-relaxed">{report.recommendedRevivalPath}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
