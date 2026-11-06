import { notFound } from 'next/navigation';
import { getExperimentById } from '../../../lib/mockExperiments';
import { formatDate, timeAgo } from '../../../lib/date';
import {
  Button,
  StatusIndicator,
  TechStack,
  Card,
  Badge,
  Layout,
} from '../../../components';

export default async function ExperimentDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const experiment = getExperimentById(params.id);

  if (!experiment) {
    notFound();
  }

  return (
    <Layout className="pb-12">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/experiments">
            <svg
              className="w-4 h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Experiments
          </Link>
        </Button>
      </div>

      {/* Experiment Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {experiment.name}
            </h1>
            <div className="flex flex-wrap gap-2">
              <StatusIndicator status={experiment.status} />
              <Badge variant="info" className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {experiment.category}
              </Badge>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" onClick={() => alert('Run experiment clicked!')}>
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Run Experiment
            </Button>
            <Button
              variant="outline"
              onClick={() => alert('Deploy clicked!')}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Deploy
            </Button>
          </div>
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {experiment.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Technology Stack
            </div>
            <TechStack technologies={experiment.technologyStack} />
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Created
            </div>
            <div className="text-gray-900 dark:text-white">
              {formatDate(experiment.createdAt)}
            </div>
            <div className="text-xs text-gray-500">
              {timeAgo(experiment.createdAt)}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Last Updated
            </div>
            <div className="text-gray-900 dark:text-white">
              {formatDate(experiment.lastUpdated)}
            </div>
            <div className="text-xs text-gray-500">
              {timeAgo(experiment.lastUpdated)}
            </div>
          </Card>
        </div>
      </div>

      {/* Tags */}
      {experiment.tags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {experiment.tags.map((tag) => (
              <Badge key={tag} variant="info">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Deployment History */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Deployment History
        </h2>

        {experiment.deploymentHistory.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No deployments yet. Click the &quot;Deploy&quot; button to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {experiment.deploymentHistory.map((deployment) => (
              <Card key={deployment.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm text-gray-500">
                        {deployment.version}
                      </span>
                      <StatusIndicator
                        status={deployment.status}
                        type="deployment"
                      />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Deployed on {formatDate(deployment.timestamp)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {timeAgo(deployment.timestamp)}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {deployment.url && (
                      <a
                        href={deployment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium flex items-center"
                      >
                        View Live
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

import Link from 'next/link';
