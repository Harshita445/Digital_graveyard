'use client';

import React from 'react';
import { useProjects } from '@/context/ProjectContext';
import { GraveyardMap } from '@/components/ui/GraveyardMap';

export default function CartographyMapPage() {
  const { projects } = useProjects();
  return (
    <div className="space-y-6">
      <GraveyardMap projects={projects} />
    </div>
  );
}
