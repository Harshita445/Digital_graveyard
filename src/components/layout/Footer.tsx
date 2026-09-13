import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 pt-8 border-t-2 border-ink/20 text-ink">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sketch-btn flex items-center justify-center font-hand font-bold text-lg">
            DG
          </div>
          <div>
            <p className="font-hand text-xl font-bold">Digital Graveyard Archive</p>
            <p className="text-xs font-mono text-ink/60">Preservation Library • Est. 2024</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 font-hand text-lg">
          <Link href="/browse" className="hover:underline">Explore Districts</Link>
          <Link href="/browse/map" className="hover:underline">Cartography Map</Link>
          <Link href="/submit" className="hover:underline">Submit Artifact</Link>
          <Link href="/showcase" className="hover:underline">Revival Showcase</Link>
          <Link href="/profile/usr_alex_mercer" className="hover:underline">Archaeologist Journal</Link>
        </div>
      </div>

      <div className="sketch-divider my-6 opacity-30" />

      <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-ink/70 gap-2 pb-2">
        <p>A non-morbid preservation library for abandoned software ideas and open provenance records.</p>
        <p className="italic font-hand text-sm text-ink">"Not forgotten. Just waiting."</p>
      </div>
    </footer>
  );
};
