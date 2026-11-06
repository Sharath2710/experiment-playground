// Experiment Categories
export const EXPERIMENT_CATEGORIES = [
  'AI and machine learning',
  'Web application development',
  'API integration',
  'Data analytics',
  'AWS cloud experiments',
] as const;

export type ExperimentCategory = typeof EXPERIMENT_CATEGORIES[number];

// Technology Stack Options
export const TECHNOLOGY_STACK_OPTIONS = [
  'Next.js',
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'Go',
  'AWS',
  'Docker',
  'Kubernetes',
  'Other',
  'Chart.js',
] as const;

// Helper function to get category icon based on category name
export const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    'AI and machine learning': '🤖',
    'Web application development': '🌐',
    'API integration': '🔌',
    'Data analytics': '📊',
    'AWS cloud experiments': '☁️',
    default: 'Experiment',
  };
  return icons[category] || icons.default;
};

// Helper function to get status badge color
export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    deployed: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    archived: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };
  return colors[status] || colors.draft;
};

// Helper function to get deployment status color
export const getDeploymentStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    building: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    deploying: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };
  return colors[status] || colors.pending;
};

// Helper function to get status label
export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    draft: 'Draft',
    'in-progress': 'In Progress',
    completed: 'Completed',
    deployed: 'Deployed',
    archived: 'Archived',
  };
  return labels[status] || status;
};

// Helper function to get deployment status label
export const getDeploymentStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: 'Pending',
    building: 'Building',
    deploying: 'Deploying',
    success: 'Success',
    failed: 'Failed',
  };
  return labels[status] || status;
};

// Helper function to generate a mock deployment URL
export const generateDeploymentUrl = (experimentName: string): string => {
  const safeName = experimentName.toLowerCase().replace(/\s+/g, '-');
  return `https://${safeName}.exp-playground.vercel.app`;
};
