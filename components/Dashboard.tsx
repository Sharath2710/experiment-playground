'use client';

import React from 'react';
import Link from 'next/link';
import { mockExperiments } from '../lib/mockExperiments';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  StatusIndicator,
  TechStack,
  Layout,
} from '../components';

const EXPERIMENT_CATEGORIES = [
  'AI and machine learning',
  'Web application development',
  'API integration',
  'Data analytics',
  'AWS cloud experiments',
] as const;

export default async function Dashboard() {
  // Get recent experiments (last 5 updated)
  const recentExperiments = [...mockExperiments]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 5);

  const categories = [...new Set(mockExperiments.map((exp) => exp.category))];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Welcome to the Experiment Playground
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Create, manage, and deploy your experiments in a professional dashboard environment.
            Explore our collection of experiments or start your own journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/experiments">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Explore Experiments
              </Button>
            </Link>
            <Link href="/experiments/new">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Create Experiment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              {mockExperiments.length}
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Experiments
            </div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {mockExperiments.filter((e) => e.status === 'deployed').length}
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Deployed
            </div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {categories.length}
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Categories
            </div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {mockExperiments.reduce((acc, exp) => acc + exp.deploymentHistory.length, 0)}
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Deployments
            </div>
          </Card>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Explore by Category
          </h2>
          <Link href="/experiments">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {EXPERIMENT_CATEGORIES.map((category) => {
            const experiments = mockExperiments.filter(
              (exp) => exp.category === category
            );
            return (
              <Link key={category} href={`/experiments?category=${encodeURIComponent(category)}`}>
                <Card className="h-full p-6 hover:border-indigo-500 transition-colors cursor-pointer">
                  <div className="text-3xl mb-4">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {category}
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {experiments.length} experiment{experiments.length !== 1 ? 's' : ''}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Experiments Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Recent Experiments
          </h2>
          <Link href="/experiments">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentExperiments.map((exp) => (
            <Card key={exp.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-3">
                  <StatusIndicator status={exp.status} />
                  <span className="text-xs text-gray-500">
                    Updated {exp.lastUpdated.toLocaleDateString()}
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
                <div className="text-xs text-gray-500">
                  Category: {exp.category}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/experiments/${exp.id}`}>
                  <Button variant="primary" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
}

// Helper function to get category icon
function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'AI and machine learning': '🤖',
    'Web application development': '🌐',
    'API integration': '🔌',
    'Data analytics': '📊',
    'AWS cloud experiments': '☁️',
  };
  return icons[category] || 'Experiment';
}
