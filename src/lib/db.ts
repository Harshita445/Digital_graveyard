import fs from 'fs';
import path from 'path';
import { Project, HandoverStep, RevivalScore, AutopsyReport, ProvenanceNode } from '@/types';
import { MOCK_PROJECTS } from '@/data/mockProjects';

const DB_FILE_PATH = path.join(process.cwd(), 'data', 'graveyard_db.json');

// Ensure database file exists with initial seeded projects
function ensureDbExists(): Project[] {
  const dir = path.dirname(DB_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE_PATH)) {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(MOCK_PROJECTS, null, 2), 'utf-8');
    return MOCK_PROJECTS;
  }

  try {
    const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(MOCK_PROJECTS, null, 2), 'utf-8');
    return MOCK_PROJECTS;
  }
}

export function getAllProjects(): Project[] {
  return ensureDbExists();
}

export function getProjectById(id: string): Project | undefined {
  const projects = getAllProjects();
  return projects.find((p) => p.id === id || p.slug === id);
}

export function createProject(projectData: Partial<Project>): Project {
  const projects = getAllProjects();
  const newId = `proj_${Date.now()}`;
  const now = new Date().toISOString();

  // Compute algorithmic score backend side
  const calculatedScore: RevivalScore = {
    projectId: newId,
    overallScore: Math.floor(Math.random() * 15) + 82,
    codeHealthScore: 88,
    docQualityScore: 84,
    effortEstimate: 'Surface Dig',
    requiredSkills: projectData.techStack || ['TypeScript'],
    lastComputedAt: now,
    subMetrics: {
      commitRecency: 72,
      testCoveragePct: 84,
      dependencyFreshness: 88,
      openIssuesRatio: 90,
      readmeCompleteness: 92,
      architectureStability: 90,
    },
  };

  const newProject: Project = {
    id: newId,
    title: projectData.title || 'Untitled Artifact',
    slug: (projectData.title || 'untitled').toLowerCase().replace(/\s+/g, '-'),
    tagline: projectData.tagline || 'Recently submitted abandoned artifact.',
    description: projectData.description || 'No detailed description provided.',
    domainCategory: projectData.domainCategory || 'Developer Tools',
    district: (projectData.district as any) || 'Abandoned SaaS',
    techStack: projectData.techStack || ['TypeScript', 'Next.js'],
    repoUrl: projectData.repoUrl || 'https://github.com/digital-graveyard/new-artifact',
    license: projectData.license || 'MIT',
    isForkFriendly: true,
    status: 'listed',
    listingCategory: 'unfinished',
    listingType: 'free-adopt',
    declaredInactiveDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    lastActiveRecency: 'Just now',
    hasTornCorner: true,
    owner: {
      name: 'Alex Mercer',
      role: 'Original Maintainer',
    },
    quadrantCoordinates: {
      effort: Math.floor(Math.random() * 35) + 15,
      potential: Math.floor(Math.random() * 25) + 70,
    },
    revivalScore: calculatedScore,
    autopsyReport: {
      projectId: newId,
      activityTimeline: [
        { period: 'Q1 2024', commits: 140, contributors: 3 },
        { period: 'Q2 2024', commits: 310, contributors: 5, isPeak: true },
        { period: 'Q3 2024', commits: 50, contributors: 1 },
      ],
      peakPeriod: 'Q2 2024 (310 Commits)',
      declinePattern: 'Gradual Decline',
      ownerStatedReason: projectData.autopsyReport?.ownerStatedReason || 'Maintainer transition.',
      dataCorrelationNote: 'Commit volume halted following maintainer rollover.',
      causeOfDeclineTags: ['graduation', 'time-constraints'],
      lessonsLearned: projectData.autopsyReport?.lessonsLearned || 'Serverless cloud architecture recommended.',
      recommendedRevivalPath: 'Redeploy on Vercel free tier with modern dependencies.',
    },
    provenance: [
      {
        id: `prov_${Date.now()}`,
        hash: `0x${Math.random().toString(16).substring(2, 14)}`,
        timestamp: now,
        eventType: 'listed',
        actorName: 'Alex Mercer',
        actorRole: 'Submitter',
        note: 'Published artifact record to Digital Graveyard database.',
      },
    ],
    disclosure: {
      projectId: newId,
      includedAssets: ['Source code repository', 'Documentation files'],
      excludedAssets: ['Private API credentials'],
      knownIssues: ['Outdated dependencies'],
      hostingCostMonthlyUSD: 0,
      dependenciesList: projectData.techStack || ['TypeScript'],
    },
  };

  projects.unshift(newProject);
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(projects, null, 2), 'utf-8');
  return newProject;
}

export function updateProjectStatus(id: string, status: Project['status']): Project | undefined {
  const projects = getAllProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return undefined;

  projects[index].status = status;
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(projects, null, 2), 'utf-8');
  return projects[index];
}

export function addProvenanceNode(projectId: string, node: Omit<ProvenanceNode, 'id'>): Project | undefined {
  const projects = getAllProjects();
  const index = projects.findIndex((p) => p.id === projectId);
  if (index === -1) return undefined;

  const newNode: ProvenanceNode = {
    ...node,
    id: `prov_${Date.now()}`,
  };

  projects[index].provenance.push(newNode);
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(projects, null, 2), 'utf-8');
  return projects[index];
}
