import React from 'react';
import { MOCK_PROJECTS } from '@/data/mockProjects';
import { DiscussionsClient } from './DiscussionsClient';

export async function generateStaticParams() {
  return MOCK_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

interface DiscussionsPageProps {
  params: {
    id: string;
  };
}

export default function ProjectDiscussionsPage({ params }: DiscussionsPageProps) {
  return <DiscussionsClient id={params.id} />;
}
