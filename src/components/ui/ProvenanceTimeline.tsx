'use client';

import React, { useState } from 'react';
import { ProvenanceNode } from '@/types';
import { GitCommit, ShieldCheck, ChevronDown, ChevronUp, Link as LinkIcon } from 'lucide-react';

interface ProvenanceTimelineProps {
  nodes: ProvenanceNode[];
}

export const ProvenanceTimeline: React.FC<ProvenanceTimelineProps> = ({ nodes }) => {
  const [expandedNodeId, setExpandedNodeId] = useState<string | null>(nodes[nodes.length - 1]?.id || null);

  const toggleNode = (id: string) => {
    setExpandedNodeId(expandedNodeId === id ? null : id);
  };

  return (
    <div className="sketch-card-static p-6">
      <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-ink/10">
        <div>
          <h3 className="font-hand text-2xl font-bold text-ink">Provenance Timeline</h3>
          <p className="text-xs font-mono text-ink/70">
            Append-only ownership chain & cryptographic hashes
          </p>
        </div>

        <span className="sketch-tag px-3 py-1 text-xs font-mono flex items-center gap-1 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-ink" />
          <span>Verified Ledger</span>
        </span>
      </div>

      {/* Vertical Chain */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-ink">
        {nodes.map((node, index) => {
          const isExpanded = expandedNodeId === node.id;
          const isLast = index === nodes.length - 1;

          return (
            <div key={node.id} className="relative">
              {/* Chain Node Marker */}
              <div 
                className={`absolute -left-[31px] top-1.5 w-6 h-6 rounded-full border-2 border-ink flex items-center justify-center ${
                  isLast ? 'bg-ink text-paper' : 'bg-paper text-ink'
                }`}
              >
                <GitCommit className="w-3.5 h-3.5" />
              </div>

              {/* Node Card */}
              <div className="sketch-card-static p-4 hover:bg-paper-dark/30 transition-colors">
                <button
                  onClick={() => toggleNode(node.id)}
                  className="w-full flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="sketch-tag px-2 py-0.5 text-[10px] font-mono uppercase font-bold text-ink">
                      {node.eventType}
                    </span>
                    <span className="font-sans font-bold text-sm text-ink">{node.actorName}</span>
                    <span className="text-xs font-mono text-ink/60">({node.actorRole})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-ink/70">
                      {new Date(node.timestamp).toLocaleDateString()}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expanded Hash & Details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-ink/10 space-y-2 text-xs font-mono">
                    <div className="flex items-center gap-2 text-ink/80">
                      <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-bold">Hash:</span>
                      <code className="bg-paper-dark px-1.5 py-0.5 rounded border border-ink/20 font-mono text-[11px]">
                        {node.hash}
                      </code>
                    </div>

                    <p className="text-ink/90 font-sans text-xs pt-1">{node.note}</p>

                    {node.priorHashRef && (
                      <p className="text-[10px] text-ink/60 pt-1">
                        Parent Ref: <span className="font-mono">{node.priorHashRef}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
