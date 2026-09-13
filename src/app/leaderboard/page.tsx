import React from 'react';
import Link from 'next/link';
import { Award, Trophy, UserCheck, Sparkles, ShieldCheck } from 'lucide-react';

export default function LeaderboardPage() {
  const leaderboards = [
    {
      rank: 1,
      name: 'Alex Mercer',
      handle: '@alex_archaeologist',
      role: 'Project Archaeologist',
      projectsRevived: 7,
      artifactsPreserved: 24,
      badges: ['🌱 First Revival', '🪨 Graveyard Keeper', '📜 Restoration Expert'],
    },
    {
      rank: 2,
      name: 'Elena Rostova',
      handle: '@elena_dev',
      role: 'Lead Reviver',
      projectsRevived: 5,
      artifactsPreserved: 18,
      badges: ['🌱 First Revival', '⚡ Fast Handover'],
    },
    {
      rank: 3,
      name: 'Dr. Marcus Vance',
      handle: '@marcus_vance',
      role: 'Graveyard Curator',
      projectsRevived: 4,
      artifactsPreserved: 15,
      badges: ['🪨 Graveyard Keeper'],
    },
    {
      rank: 4,
      name: 'Kenji Sato',
      handle: '@kenji_s',
      role: 'Project Archaeologist',
      projectsRevived: 3,
      artifactsPreserved: 12,
      badges: ['🌱 First Revival'],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b-2 border-ink/10 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-ink/60 block">Community Preservation Rankings</span>
          <h1 className="font-hand text-4xl sm:text-5xl font-bold text-ink">GRAVEYARD SHIFT LEADERBOARD</h1>
        </div>

        <span className="sketch-tag px-3 py-1 text-xs font-mono font-bold flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-ink" />
          <span>Top Project Archaeologists</span>
        </span>
      </div>

      {/* Leaderboard Table */}
      <div className="sketch-card-static p-6 bg-paper space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-ink text-xs font-mono text-ink uppercase">
                <th className="pb-3 px-2">Rank</th>
                <th className="pb-3 px-2">Archaeologist</th>
                <th className="pb-3 px-2">Role</th>
                <th className="pb-3 px-2 text-center">Revivals</th>
                <th className="pb-3 px-2 text-center">Preserved</th>
                <th className="pb-3 px-2">Key Badges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10 font-sans text-sm">
              {leaderboards.map((user) => (
                <tr key={user.rank} className="hover:bg-paper-dark/30 transition-colors">
                  <td className="py-4 px-2 font-mono font-bold text-base">
                    {user.rank === 1 ? '🥇 #1' : user.rank === 2 ? '🥈 #2' : user.rank === 3 ? '🥉 #3' : `#${user.rank}`}
                  </td>
                  <td className="py-4 px-2">
                    <Link href={`/profile/usr_alex_mercer`} className="font-bold text-ink hover:underline">
                      {user.name}
                    </Link>
                    <span className="text-xs font-mono text-ink/60 block">{user.handle}</span>
                  </td>
                  <td className="py-4 px-2 font-mono text-xs text-ink/80">{user.role}</td>
                  <td className="py-4 px-2 text-center font-bold text-ink">{user.projectsRevived}</td>
                  <td className="py-4 px-2 text-center font-bold text-ink">{user.artifactsPreserved}</td>
                  <td className="py-4 px-2">
                    <div className="flex flex-wrap gap-1">
                      {user.badges.map((badge, i) => (
                        <span key={i} className="sketch-tag px-2 py-0.5 text-[11px] font-mono">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
