import React from 'react';
import { CauseOfDecline } from '@/types';

interface CauseOfDeclineTagsProps {
  tags: CauseOfDecline[];
}

export const CauseOfDeclineTags: React.FC<CauseOfDeclineTagsProps> = ({ tags }) => {
  const getLabelAndIcon = (tag: CauseOfDecline) => {
    switch (tag) {
      case 'funding':
        return { label: 'Funding Exhaustion', icon: '💸' };
      case 'graduation':
        return { label: 'Academic Graduation', icon: '🎓' };
      case 'team-separation':
        return { label: 'Team Separation', icon: '👥' };
      case 'time-constraints':
        return { label: 'Time Constraints', icon: '⌛' };
      case 'loss-of-interest':
        return { label: 'Loss of Interest', icon: '🕯️' };
      case 'technical-debt':
        return { label: 'Technical Debt', icon: '🧱' };
      case 'market-shift':
        return { label: 'Market Dynamics', icon: '📉' };
      default:
        return { label: tag, icon: '🪨' };
    }
  };

  return (
    <div className="space-y-2">
      <span className="text-xs font-mono uppercase tracking-wider text-ink/70 block">Primary Cause of Decline</span>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const { label, icon } = getLabelAndIcon(tag);
          return (
            <span
              key={tag}
              className="sketch-tag px-3 py-1 text-xs font-mono font-medium text-ink flex items-center gap-1.5 hover:bg-paper-dark transition-colors"
            >
              <span>{icon}</span>
              <span>{label}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};
