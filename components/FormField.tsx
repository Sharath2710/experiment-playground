'use client';

import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
  error?: string;
  type?: 'text' | 'textarea' | 'select' | 'checkbox' | 'multiselect';
  placeholder?: string;
  options?: { value: string; label: string }[];
  multiline?: boolean;
  required?: boolean;
  className?: string;
}

const FormField = ({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  options = [],
  multiline = false,
  required = false,
  className = '',
}: FormFieldProps) => {
  const baseClasses = 'mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white';
  const errorClasses = 'border-red-300 focus:border-red-500 focus:ring-red-500';
  const successClasses = 'border-green-300 focus:border-green-500 focus:ring-green-500';

  const inputClasses = `${baseClasses} ${error ? errorClasses : successClasses} px-3 py-2 ${className}`;

  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={multiline ? 4 : 3}
          className={inputClasses}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'multiselect' ? (
        <div className="flex flex-wrap gap-2">
          {options.map((option) => {
            const isSelected = Array.isArray(value) && value.includes(option.value);
            return (
              <div
                key={option.value}
                onClick={() => {
                  if (Array.isArray(value)) {
                    if (isSelected) {
                      const newValue = value.filter((v) => v !== option.value);
                      onChange(newValue as string[]);
                    } else {
                      const newValue = [...value, option.value];
                      onChange(newValue as string[]);
                    }
                  }
                }}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;
