'use client';

import React from 'react';
import { getDeploymentStatusColor, getDeploymentStatusLabel } from '../lib/constants';

interface DeploymentStatusProps {
  status: string;
}

export default function DeploymentStatus({ status }: DeploymentStatusProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDeploymentStatusColor(status)}`}>
      <span className={`w-2 h-2 rounded-full mr-2 ${
        status === 'pending' ? 'bg-yellow-500' :
        status === 'building' ? 'bg-blue-500' :
        status === 'deploying' ? 'bg-indigo-500' :
        status === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}></span>
      {getDeploymentStatusLabel(status)}
    </span>
  );
}
