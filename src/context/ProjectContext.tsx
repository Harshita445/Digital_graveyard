'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Project, User } from '@/types';
import { MOCK_PROJECTS, MOCK_USER } from '@/data/mockProjects';

interface ProjectContextType {
  projects: Project[];
  user: User;
  campusMode: boolean;
  setCampusMode: (enabled: boolean) => void;
  addProject: (newProj: Partial<Project>) => void;
  updateProjectStatus: (id: string, status: Project['status']) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [user, setUser] = useState<User>(MOCK_USER);
  const [campusMode, setCampusMode] = useState<boolean>(false);

  const addProject = (newProj: Partial<Project>) => {
    const created: Project = {
      id: `proj_${Date.now()}`,
      title: newProj.title || 'Untitled Artifact',
      slug: (newProj.title || 'untitled').toLowerCase().replace(/\s+/g, '-'),
      tagline: newProj.tagline || 'Recently submitted abandoned project.',
      description: newProj.description || 'No detailed description provided.',
      domainCategory: 'Developer Tools',
      district: (newProj.district as any) || 'Abandoned SaaS',
      techStack: newProj.techStack || ['TypeScript', 'Next.js'],
      repoUrl: newProj.repoUrl || 'https://github.com/digital-graveyard/submitted-project',
      license: 'MIT',
      isForkFriendly: true,
      status: 'listed',
      listingCategory: 'unfinished',
      listingType: 'free-adopt',
      declaredInactiveDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      lastActiveRecency: 'Recently archived',
      hasTornCorner: true,
      owner: {
        name: user.name,
        role: 'Original Maintainer',
      },
      quadrantCoordinates: {
        effort: Math.floor(Math.random() * 40) + 15,
        potential: Math.floor(Math.random() * 30) + 65,
      },
      revivalScore: {
        projectId: `proj_${Date.now()}`,
        overallScore: Math.floor(Math.random() * 15) + 80,
        codeHealthScore: 88,
        docQualityScore: 82,
        effortEstimate: 'Surface Dig',
        requiredSkills: newProj.techStack || ['TypeScript'],
        lastComputedAt: new Date().toISOString(),
        subMetrics: {
          commitRecency: 70,
          testCoveragePct: 80,
          dependencyFreshness: 85,
          openIssuesRatio: 90,
          readmeCompleteness: 90,
          architectureStability: 88,
        },
      },
      autopsyReport: {
        projectId: `proj_${Date.now()}`,
        activityTimeline: [
          { period: 'Q1 2024', commits: 120, contributors: 3 },
          { period: 'Q2 2024', commits: 280, contributors: 4, isPeak: true },
          { period: 'Q3 2024', commits: 40, contributors: 1 },
          { period: 'Q4 2024', commits: 0, contributors: 0 },
        ],
        peakPeriod: 'Q2 2024 (280 Commits)',
        declinePattern: 'Gradual Decline',
        ownerStatedReason: newProj.autopsyReport?.ownerStatedReason || 'Graduation & maintainer transition.',
        dataCorrelationNote: 'Commit activity halted following graduation.',
        causeOfDeclineTags: ['graduation', 'time-constraints'],
        lessonsLearned: newProj.autopsyReport?.lessonsLearned || 'Serverless architecture recommended.',
        recommendedRevivalPath: 'Redeploy on Vercel free tier with modern dependencies.',
      },
      provenance: [
        {
          id: `prov_${Date.now()}`,
          hash: `0x${Math.random().toString(16).substring(2, 12)}`,
          timestamp: new Date().toISOString(),
          eventType: 'listed',
          actorName: user.name,
          actorRole: 'Submitter',
          note: 'Published artifact to Digital Graveyard archive.',
        },
      ],
      disclosure: {
        projectId: `proj_${Date.now()}`,
        includedAssets: ['Source code repository', 'Documentation files'],
        excludedAssets: ['Private API tokens'],
        knownIssues: ['Outdated dependencies'],
        hostingCostMonthlyUSD: 0,
        dependenciesList: newProj.techStack || ['TypeScript'],
      },
    };

    setProjects((prev) => [created, ...prev]);
  };

  const updateProjectStatus = (id: string, status: Project['status']) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        user,
        campusMode,
        setCampusMode,
        addProject,
        updateProjectStatus,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProjects must be used within ProjectProvider');
  return ctx;
};
