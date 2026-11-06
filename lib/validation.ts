import { NewExperimentFormData, ValidationResult } from '../lib/experiment';

/**
 * Validate experiment form data
 * @param data - The form data to validate
 * @returns Validation result with isValid flag and errors
 */
export const validateExperimentForm = (data: NewExperimentFormData): ValidationResult => {
  const errors: Record<string, string> = {};

  // Validate name
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Experiment name is required';
  } else if (data.name.length < 3) {
    errors.name = 'Experiment name must be at least 3 characters';
  } else if (data.name.length > 100) {
    errors.name = 'Experiment name must be less than 100 characters';
  }

  // Validate description
  if (!data.description || data.description.trim().length === 0) {
    errors.description = 'Description is required';
  } else if (data.description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  } else if (data.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }

  // Validate category
  if (!data.category || data.category.trim().length === 0) {
    errors.category = 'Category is required';
  }

  // Validate technology stack
  if (!data.technologyStack || data.technologyStack.length === 0) {
    errors.technologyStack = 'At least one technology is required';
  }

  // Validate tags (optional but must be less than 20 characters each if provided)
  if (data.tags && data.tags.length > 0) {
    const invalidTags = data.tags.filter((tag) => tag.length > 20);
    if (invalidTags.length > 0) {
      errors.tags = 'Tags must be less than 20 characters each';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate experiment name uniqueness (mock implementation)
 * @returns true if name is unique
 */
export const validateNameUniqueness = (): boolean => {
  // This would normally call an API to check uniqueness
  // For now, we just check against the mock data
  return true;
};
