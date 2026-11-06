import { Experiment, DeploymentEntry } from '../lib/experiment';

// Helper function to generate mock deployment history
const generateDeploymentHistory = (count: number = 3): DeploymentEntry[] => {
  const statuses: Array<DeploymentEntry['status']> = ['success', 'success', 'failed', 'success'];
  return Array.from({ length: count }).map((_, i) => ({
    id: `dep-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000), // Spread across days
    status: statuses[Math.floor(Math.random() * statuses.length)],
    url: `https://experiment-${i}.exp-playground.vercel.app`,
    version: `v${1 + i}.0.${Math.floor(Math.random() * 100)}`,
  }));
};

// Mock experiments data
export const mockExperiments: Experiment[] = [
  {
    id: 'exp-001',
    name: 'AI Image Generator',
    description: 'Generate images using AI models with customizable parameters and styles',
    category: 'AI and machine learning',
    technologyStack: ['Python', 'React', 'Next.js', 'TypeScript'],
    status: 'deployed',
    lastUpdated: new Date('2024-10-28'),
    createdAt: new Date('2024-09-15'),
    author: 'sarath',
    tags: ['ai', 'image-generation', 'python', 'ml'],
    deploymentHistory: generateDeploymentHistory(4),
  },
  {
    id: 'exp-002',
    name: 'E-Commerce API Gateway',
    description: 'RESTful API gateway for e-commerce platform with authentication and rate limiting',
    category: 'API integration',
    technologyStack: ['Node.js', 'TypeScript', 'AWS'],
    status: 'deployed',
    lastUpdated: new Date('2024-10-30'),
    createdAt: new Date('2024-08-20'),
    author: 'sarath',
    tags: ['api', 'ecommerce', 'nodejs', 'aws'],
    deploymentHistory: generateDeploymentHistory(5),
  },
  {
    id: 'exp-003',
    name: 'Analytics Dashboard',
    description: 'Real-time data analytics dashboard with customizable widgets and charts',
    category: 'Data analytics',
    technologyStack: ['React', 'TypeScript', 'Next.js', 'Chart.js'],
    status: 'in-progress',
    lastUpdated: new Date('2024-11-01'),
    createdAt: new Date('2024-10-05'),
    author: 'sarath',
    tags: ['analytics', 'dashboard', 'data-viz'],
    deploymentHistory: generateDeploymentHistory(2),
  },
  {
    id: 'exp-004',
    name: 'Serverless Deployment Pipeline',
    description: 'Automated CI/CD pipeline for serverless applications using AWS Lambda',
    category: 'AWS cloud experiments',
    technologyStack: ['AWS', 'Node.js', 'TypeScript', 'Docker'],
    status: 'completed',
    lastUpdated: new Date('2024-10-25'),
    createdAt: new Date('2024-07-10'),
    author: 'sarath',
    tags: ['aws', 'serverless', 'cicd', 'lambda'],
    deploymentHistory: generateDeploymentHistory(6),
  },
  {
    id: 'exp-005',
    name: 'Social Media Dashboard',
    description: 'Unified dashboard for managing multiple social media accounts with analytics',
    category: 'Web application development',
    technologyStack: ['React', 'TypeScript', 'Next.js', 'Node.js'],
    status: 'draft',
    lastUpdated: new Date('2024-10-20'),
    createdAt: new Date('2024-10-15'),
    author: 'sarath',
    tags: ['social-media', 'dashboard', 'api-integration'],
    deploymentHistory: [],
  },
  {
    id: 'exp-006',
    name: 'Machine Learning Model Trainer',
    description: 'Web interface for training and evaluating ML models with different algorithms',
    category: 'AI and machine learning',
    technologyStack: ['Python', 'React', 'Node.js', 'TypeScript'],
    status: 'deployed',
    lastUpdated: new Date('2024-10-22'),
    createdAt: new Date('2024-06-01'),
    author: 'sarath',
    tags: ['ml', 'training', 'tensorflow', 'pytorch'],
    deploymentHistory: generateDeploymentHistory(3),
  },
];

// Function to get experiment by ID
export const getExperimentById = (id: string): Experiment | undefined => {
  return mockExperiments.find((exp) => exp.id === id);
};

// Function to get experiments by category
export const getExperimentsByCategory = (category: string): Experiment[] => {
  return mockExperiments.filter((exp) => exp.category === category);
};

// Function to get all unique categories
export const getAllCategories = (): string[] => {
  return [...new Set(mockExperiments.map((exp) => exp.category))];
};
