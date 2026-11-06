'use client';

import React from 'react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState = ({ message = 'Loading...' }: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
      <p className="text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
};

export default LoadingState;
