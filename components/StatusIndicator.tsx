'use client';

import React from 'react';
import { getStatusColor, getStatusLabel, getDeploymentStatusColor, getDeploymentStatusLabel } from '../lib/constants';

interface StatusIndicatorProps {
  status: string;
  type?: 'experiment' | 'deployment';
}

const StatusIndicator = ({ status, type = 'experiment' }: StatusIndicatorProps) => {
  const getStatusStyles = () => {
    if (type === 'experiment') {
      return getStatusColor(status);
    }
    return getDeploymentStatusColor(status);
  };

  const getStatusText = () => {
    if (type === 'experiment') {
      return getStatusLabel(status);
    }
    return getDeploymentStatusLabel(status);
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      <span className={`w-2 h-2 rounded-full mr-2 ${
        type === 'experiment' ? getExperimentStatusDotColor(status) : getDeploymentStatusDotColor(status)
      }`}></span>
      {getStatusText()}
    </span>
  );
};

// Helper function to get status dot color
const getExperimentStatusDotColor = (status: string): string => {
  const colors: Record<string, string> = {
    draft: 'bg-gray-400',
    'in-progress': 'bg-blue-500',
    completed: 'bg-green-500',
    deployed: 'bg-purple-500',
    archived: 'bg-red-500',
  };
  return colors[status] || colors.draft;
};

const getDeploymentStatusDotColor = (status: string): string => {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-500',
    building: 'bg-blue-500',
    deploying: 'bg-indigo-500',
    success: 'bg-green-500',
    failed: 'bg-red-500',
  };
  return colors[status] || colors.pending;
};

export default StatusIndicator;
