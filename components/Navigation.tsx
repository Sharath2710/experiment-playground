'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col sm:flex-row gap-2">
      <Link
        href="/"
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          pathname === '/'
            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        }`}
      >
        Dashboard
      </Link>
      <Link
        href="/experiments"
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          pathname === '/experiments' || pathname.startsWith('/experiments/')
            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        }`}
      >
        Experiments
      </Link>
      <Link
        href="/deployments"
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          pathname === '/deployments' || pathname.startsWith('/deployments/')
            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        }`}
      >
        Deployments
      </Link>
    </nav>
  );
};

export default Navigation;
