'use client';

import Link from 'next/link';
import { mockExperiments } from '../../lib/mockExperiments';
import { timeAgo } from '../../lib/date';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  StatusIndicator,
  TechStack,
  EmptyState,
  Layout,
} from '../../components';

import { EXPERIMENT_CATEGORIES } from '../../lib/constants';

export default function ExperimentsPage({
  searchParams,
}: {
  searchParams?: { category?: string; search?: string };
}) {
  const category = searchParams?.category;
  const searchQuery = searchParams?.search;

  // Filter experiments based on search params
  let filteredExperiments = mockExperiments;

  if (category) {
    filteredExperiments = filteredExperiments.filter(
      (exp) => exp.category === category
    );
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredExperiments = filteredExperiments.filter(
      (exp) =>
        exp.name.toLowerCase().includes(query) ||
        exp.description.toLowerCase().includes(query) ||
        exp.technologyStack.some((tech) => tech.toLowerCase().includes(query))
    );
  }

  return (
    <Layout className="pb-12">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Experiments
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse and manage all your experiments
          </p>
        </div>
        <Link href="/experiments/new">
          <Button variant="primary">
            Create Experiment
          </Button>
        </Link>
      </div>

      {/* Filters Section */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search experiments..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
            defaultValue={searchQuery}
          />
          <div className="absolute right-3 top-3 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={category === undefined ? 'primary' : 'outline'}
            size="sm"
            asChild
          >
            <Link href="/experiments">All</Link>
          </Button>
          {EXPERIMENT_CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? 'primary' : 'outline'}
              size="sm"
              asChild
            >
              <Link href={`/experiments?category=${encodeURIComponent(cat)}`}>
                {cat}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      {/* Experiments Grid */}
      {filteredExperiments.length === 0 ? (
        <EmptyState
          title="No experiments found"
          description={
            searchQuery
              ? "We couldn't find any experiments matching your search."
              : category
              ? `No experiments found in the ${category} category.`
              : "There are no experiments yet. Create your first experiment today!"
          }
          icon={searchQuery ? '🔍' : '🧪'}
          action={
            !searchQuery && !category && (
              <Link href="/experiments/new">
                <Button variant="primary">Create Experiment</Button>
              </Link>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiments.map((exp) => (
            <Card key={exp.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-3">
                  <StatusIndicator status={exp.status} />
                  <span className="text-xs text-gray-500">
                    Updated {timeAgo(exp.lastUpdated)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {exp.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {exp.description}
                </p>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-4">
                  <TechStack technologies={exp.technologyStack} />
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  Category: {exp.category}
                </div>
                <div className="text-xs text-gray-500">
                  Created {timeAgo(exp.createdAt)}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Link href={`/experiments/${exp.id}`} className="flex-1">
                  <Button variant="primary" size="sm" className="w-full">
                    View
                  </Button>
                </Link>
                <Link href={`/experiments/${exp.id}/edit`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    Edit
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
}
