import { Layout, Card, StatusIndicator } from '../../components';
import { mockExperiments } from '../../lib/mockExperiments';
import { formatDate, timeAgo } from '../../lib/date';

export default function DeploymentsPage() {
  // Get all deployments from all experiments
  const allDeployments = mockExperiments.flatMap((exp) =>
    exp.deploymentHistory.map((deployment) => ({
      ...deployment,
      experimentName: exp.name,
      experimentId: exp.id,
      experimentCategory: exp.category,
    }))
  );

  // Sort by timestamp (newest first)
  const sortedDeployments = allDeployments.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Layout className="pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Deployment History
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View all deployments across experiments
        </p>
      </div>

      {sortedDeployments.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400">No deployments found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedDeployments.map((deployment) => (
            <Card key={deployment.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {deployment.experimentName}
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Category: {deployment.experimentCategory}
                  </div>
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
    </Layout>
  );
}
