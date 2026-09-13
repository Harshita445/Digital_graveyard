export type ExcavationDepth = 'Surface Dig' | 'Moderate Excavation' | 'Deep Excavation';
export type ListingCategory = 'unfinished' | 'dead_but_had_traction' | 'abandoned_asset';
export type ListingType = 'for-sale' | 'free-adopt' | 'seeking-team' | 'showcase';
export type ProjectStatus = 'listed' | 'in-handover' | 'adopted' | 'archived' | 'unconfirmed';
export type CauseOfDecline = 
  | 'funding' 
  | 'graduation' 
  | 'team-separation' 
  | 'time-constraints' 
  | 'loss-of-interest' 
  | 'technical-debt'
  | 'market-shift';

export interface User {
  id: string;
  name: string;
  handle: string;
  avatarUrl?: string;
  email: string;
  githubHandle: string;
  roleTitle: 'Project Archaeologist' | 'Graveyard Curator' | 'Lead Reviver';
  projectsRevived: number;
  artifactsPreserved: number;
  achievements: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: string;
  }[];
}

export interface SubMetrics {
  commitRecency: number; // 0-100
  testCoveragePct: number; // 0-100
  dependencyFreshness: number; // 0-100
  openIssuesRatio: number; // 0-100
  readmeCompleteness: number; // 0-100
  architectureStability: number; // 0-100
}

export interface RevivalScore {
  projectId: string;
  overallScore: number; // 0-100
  codeHealthScore: number;
  docQualityScore: number;
  effortEstimate: ExcavationDepth;
  requiredSkills: string[];
  lastComputedAt: string;
  subMetrics: SubMetrics;
}

export interface ActivityTimelineItem {
  period: string; // e.g. "Q1 2022"
  commits: number;
  contributors: number;
  isPeak?: boolean;
}

export interface AutopsyReport {
  projectId: string;
  activityTimeline: ActivityTimelineItem[];
  peakPeriod: string;
  declinePattern: 'Gradual Decline' | 'Abrupt Cliff' | 'Stagnant Dormancy';
  ownerStatedReason: string;
  dataCorrelationNote: string;
  causeOfDeclineTags: CauseOfDecline[];
  lessonsLearned: string;
  recommendedRevivalPath: string;
}

export interface ProvenanceNode {
  id: string;
  hash: string;
  timestamp: string;
  eventType: 'created' | 'listed' | 'archived' | 'adopted' | 'revived' | 'fork-relaunch';
  actorName: string;
  actorRole: string;
  note: string;
  priorHashRef?: string;
}

export interface Disclosure {
  projectId: string;
  includedAssets: string[];
  excludedAssets: string[];
  knownIssues: string[];
  hostingCostMonthlyUSD: number;
  dependenciesList: string[];
}

export interface HandoverStep {
  id: string;
  title: string;
  description: string;
  ownerConfirmed: boolean;
  adopterConfirmed: boolean;
  completedAt?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  domainCategory: string; // e.g. "Developer Tools", "AI & Data", "Productivity"
  district: 'The Forgotten Web' | 'AI Graveyard' | 'Abandoned SaaS' | 'Campus Graveyard';
  techStack: string[];
  repoUrl: string;
  license: string;
  isForkFriendly: boolean;
  status: ProjectStatus;
  listingCategory: ListingCategory;
  listingType: ListingType;
  priceUSD?: number;
  declaredInactiveDate: string;
  lastActiveRecency: string; // e.g. "2 years ago"
  owner: {
    name: string;
    avatar?: string;
    role: string;
  };
  revivalScore: RevivalScore;
  autopsyReport: AutopsyReport;
  provenance: ProvenanceNode[];
  disclosure: Disclosure;
  hasTornCorner?: boolean;
  quadrantCoordinates?: {
    effort: number; // 0-100 (X-axis)
    potential: number; // 0-100 (Y-axis)
  };
  beforeAfterShowcase?: {
    beforeDesc: string;
    afterDesc: string;
    restoredBy: string;
    restorationDate: string;
  };
}
