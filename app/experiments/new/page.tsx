'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockExperiments } from '../../../lib/mockExperiments';
import { TECHNOLOGY_STACK_OPTIONS, EXPERIMENT_CATEGORIES } from '../../../lib/constants';
import { validateExperimentForm } from '../../../lib/validation';
import { NewExperimentFormData, TechnologyStack } from '../../../lib/experiment';
import {
  Button,
  FormField,
  Modal,
  Layout,
} from '../../../components';

export default function NewExperimentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<NewExperimentFormData>({
    name: '',
    description: '',
    category: '',
    technologyStack: [],
    tags: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (name: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (tech: string) => {
    const techStack = formData.technologyStack;
    const updatedTechStack = techStack.includes(tech as TechnologyStack)
      ? techStack.filter((t) => t !== tech as TechnologyStack)
      : [...techStack, tech as TechnologyStack];
    setFormData((prev) => ({
      ...prev,
      technologyStack: updatedTechStack,
    }));
  };

  const handleTagChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: value.split(',').map((tag) => tag.trim()).filter((tag) => tag.length > 0) as NewExperimentFormData['tags'],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateExperimentForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Create new experiment
    const newExperiment = {
      id: `exp-${mockExperiments.length + 1}`,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      technologyStack: formData.technologyStack,
      status: 'draft' as const,
      lastUpdated: new Date(),
      createdAt: new Date(),
      author: 'sarath',
      tags: formData.tags,
      deploymentHistory: [],
    };

    // Add to mock data (in real app, this would be an API call)
    mockExperiments.push(newExperiment);

    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    router.push('/experiments');
  };

  return (
    <Layout className="pb-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create New Experiment
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Start a new experiment to track your development work
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div className="space-y-6">
            {/* Name */}
            <div>
              <FormField
                label="Experiment Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(value) => handleChange('name', value)}
                error={errors.name}
                placeholder="e.g., AI Image Generator"
                required
              />
            </div>

            {/* Description */}
            <div>
              <FormField
                label="Description"
                name="description"
                type="textarea"
                value={formData.description}
                onChange={(value) => handleChange('description', value)}
                error={errors.description}
                placeholder="Describe your experiment in detail..."
                multiline
                required
              />
            </div>

            {/* Category */}
            <div>
              <FormField
                label="Category"
                name="category"
                type="select"
                value={formData.category}
                onChange={(value) => handleChange('category', value)}
                error={errors.category}
                options={EXPERIMENT_CATEGORIES.map((cat) => ({
                  value: cat,
                  label: cat,
                }))}
                required
              />
            </div>

            {/* Technology Stack */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Technology Stack <span className="text-red-500">*</span>
              </label>
              {errors.technologyStack && (
                <p className="mt-1 text-sm text-red-600">{errors.technologyStack}</p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                {TECHNOLOGY_STACK_OPTIONS.map((tech) => (
                  <label
                    key={tech}
                    className={`flex items-center p-2 rounded-lg border cursor-pointer transition-all ${
                      formData.technologyStack.includes(tech)
                        ? 'bg-indigo-50 border-indigo-500 dark:bg-indigo-900/30'
                        : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="technologyStack"
                      value={tech}
                      checked={formData.technologyStack.includes(tech)}
                      onChange={() => handleCheckboxChange(tech)}
                      className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-900 dark:text-white">
                      {tech}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <FormField
                label="Tags"
                name="tags"
                type="text"
                value={formData.tags.join(', ')}
                onChange={(value) => handleTagChange(value as string)}
                error={errors.tags}
                placeholder="Separate tags with commas"
                required={false}
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter comma-separated tags for easy searching
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/experiments')}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              className="flex-1"
            >
              Create Experiment
            </Button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <Modal
          isOpen={showSuccessModal}
          onClose={handleCloseModal}
          title="Experiment Created Successfully"
          size="md"
          footer={
            <>
              <Button variant="outline" onClick={handleCloseModal}>
                Close
              </Button>
            </>
          }
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your experiment has been created successfully. You can now add more details and deploy it.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-left text-sm">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Name:</span>
                <span className="font-medium text-gray-900 dark:text-white">{formData.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Category:</span>
                <span className="font-medium text-gray-900 dark:text-white">{formData.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="font-medium text-green-600">Draft</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  );
}
