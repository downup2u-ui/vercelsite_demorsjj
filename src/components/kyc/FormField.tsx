"use client";

import React from 'react';

/**
 * FormFieldProps defines the props for the FormField component.
 */
interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  isTextarea?: boolean;
  options?: string[];
  value?: string; // Added for controlled components if needed later
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void; // Added for controlled components
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

/**
 * FormField is a reusable helper component for rendering various types of form inputs,
 * including text inputs, textareas, and select dropdowns.
 * It standardizes the layout and styling for form fields across KYC pages.
 */
const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  id, 
  type = "text", 
  placeholder, 
  isTextarea = false, 
  options, 
  value, 
  onChange,
  className = "mb-6",
  labelClassName = "block text-sm font-medium text-gray-700 mb-1",
  inputClassName = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          name={id}
          rows={3}
          className={inputClassName}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : type === "select" && options ? (
        <select
          id={id}
          name={id}
          className={inputClassName}
          value={value}
          onChange={onChange}
        >
          <option value="">{placeholder || `请选择 ${label}`}</option>
          {options.map(option => <option key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>{option}</option>)}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          className={inputClassName}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default FormField; 