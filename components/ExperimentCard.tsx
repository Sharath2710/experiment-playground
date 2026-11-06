'use client';

import React from 'react';
import Link from 'next/link';
import { Experiment } from '../lib/experiment';
import { timeAgo } from '../lib/date';
import { Button, Card, CardHeader, CardContent, CardFooter, StatusIndicator, TechStack } from '../components';

interface ExperimentCardProps {
  experiment: Experiment;
}

export default function ExperimentCard({ experiment }: ExperimentCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start mb-3">
          <StatusIndicator status={experiment.status} />
          <span className="text-xs text-gray-500">
            Updated {timeAgo(experiment.lastUpdated)}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {experiment.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {experiment.description}
        </p>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-4">
          <TechStack technologies={experiment.technologyStack} />
        </div>
        <div className="text-xs text-gray-500 mb-2">
          Category: {experiment.category}
        </div>
        <div className="text-xs text-gray-500">
          Created {timeAgo(experiment.createdAt)}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link href={`/experiments/${experiment.id}`} className="flex-1">
          <Button variant="primary" size="sm" className="w-full">
            View
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
