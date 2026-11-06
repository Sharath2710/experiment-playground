// Export types
export type ExperimentStatus = 'draft' | 'in-progress' | 'completed' | 'deployed' | 'archived';
export type DeploymentStatus = 'pending' | 'building' | 'deploying' | 'success' | 'failed';
export type TechnologyStack = 'Next.js' | 'React' | 'TypeScript' | 'Node.js' | 'Python' | 'Go' | 'AWS' | 'Docker' | 'Kubernetes' | 'Other' | 'Chart.js';

// Export interfaces
export interface DeploymentEntry {
  id: string;
  timestamp: Date;
  status: DeploymentStatus;
  url?: string;
  version: string;
}

export interface Experiment {
  id: string;
  name: string;
  description: string;
  category: string;
  technologyStack: TechnologyStack[];
  status: ExperimentStatus;
  lastUpdated: Date;
  createdAt: Date;
  author: string;
  deploymentHistory: DeploymentEntry[];
  tags: string[];
}

export interface NewExperimentFormData {
  name: string;
  description: string;
  category: string;
  technologyStack: TechnologyStack[];
  tags: string[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Export mock data
export { mockExperiments, getExperimentById, getExperimentsByCategory, getAllCategories } from './mockExperiments';
