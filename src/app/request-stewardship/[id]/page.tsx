import React from 'react';
import { MOCK_PROJECTS } from '@/data/mockProjects';
import { RequestStewardshipClient } from './RequestStewardshipClient';

export async function generateStaticParams() {
  return MOCK_PROJECTS.map((project) => ({
    id: project.id,
  }));
}

interface RequestStewardshipPageProps {
  params: {
    id: string;
  };
}

export default function RequestStewardshipPage({ params }: RequestStewardshipPageProps) {
  return <RequestStewardshipClient id={params.id} />;
}
