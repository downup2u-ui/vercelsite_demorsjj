"use client";

import React, { useState, ReactNode, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

export interface Step {
  id: number;
  name: string;
  component: ReactNode;
  validator?: (data: any) => boolean | { valid: boolean; message?: string };
}

interface MultiStepFormProps {
  steps: Step[];
  initialData?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
  onSaveDraft?: (data: Record<string, any>) => void;
  className?: string;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  initialData = {},
  onSubmit,
  onSaveDraft,
  className = '',
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    // 如果有localStorage中保存的草稿数据，加载它
    const savedData = localStorage.getItem('patentApplicationDraft');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Failed to parse saved draft data');
      }
    }
  }, []);

  const updateFormData = (stepData: Record<string, any>) => {
    const newFormData = { ...formData, ...stepData };
    setFormData(newFormData);
    
    // 自动保存草稿到localStorage
    localStorage.setItem('patentApplicationDraft', JSON.stringify(newFormData));
  };

  const validateStep = (stepIndex: number): { valid: boolean; message?: string } => {
    const step = steps[stepIndex];
    if (!step.validator) return { valid: true };

    const result = step.validator(formData);
    if (typeof result === 'boolean') {
      return { valid: result };
    }
    return result;
  };

  const goToNextStep = () => {
    const validation = validateStep(currentStep);
    if (validation.valid) {
      setValidationError(null);
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(prevStep => Math.min(prevStep + 1, steps.length - 1));
    } else {
      setValidationError(validation.message || '请完成所有必填字段后再继续');
    }
  };

  const goToPreviousStep = () => {
    setValidationError(null);
    setCurrentStep(prevStep => Math.max(prevStep - 1, 0));
  };

  const goToStep = (stepIndex: number) => {
    // 只能跳转到已完成的步骤或当前步骤的下一步
    if (stepIndex <= currentStep || completedSteps.includes(stepIndex - 1)) {
      setCurrentStep(stepIndex);
      setValidationError(null);
    }
  };

  const handleSubmit = () => {
    const validation = validateStep(currentStep);
    if (validation.valid) {
      setValidationError(null);
      onSubmit(formData);
    } else {
      setValidationError(validation.message || '请完成所有必填字段后再提交');
    }
  };

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft(formData);
    }
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className={`w-full ${className}`}>
      {/* 步骤进度指示器 */}
      <div className="mb-8">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, index) => (
              <li key={step.id} className={`relative ${index > 0 ? 'pl-6 sm:pl-10' : ''} ${index < steps.length - 1 ? 'pr-8 sm:pr-12 flex-grow' : ''}`}>
                <div className="flex items-center">
                  {index > 0 && (
                    <div 
                      className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 ${
                        index <= currentStep || completedSteps.includes(index - 1)
                          ? 'bg-blue-600' 
                          : 'bg-gray-200'
                      }`} 
                      aria-hidden="true" 
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => goToStep(index)}
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                      index < currentStep || completedSteps.includes(index)
                        ? 'bg-blue-600' 
                        : index === currentStep
                        ? 'bg-blue-600 border-2 border-blue-600' 
                        : 'bg-white border-2 border-gray-300'
                    } ${
                      index > currentStep && !completedSteps.includes(index - 1)
                        ? 'cursor-not-allowed'
                        : 'hover:bg-blue-700'
                    }`}
                    disabled={index > currentStep && !completedSteps.includes(index - 1)}
                    aria-current={index === currentStep ? 'step' : undefined}
                  >
                    {index < currentStep || completedSteps.includes(index) ? (
                      <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    ) : (
                      <span 
                        className={`${
                          index === currentStep ? 'text-white' : 'text-gray-500'
                        } text-sm font-medium`}
                      >
                        {index + 1}
                      </span>
                    )}
                  </button>
                </div>
                <div className={`mt-2 text-center text-sm ${
                  index <= currentStep ? 'font-medium text-blue-600' : 'text-gray-500'
                }`}>
                  {step.name}
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* 表单内容 */}
      <div className="mb-6">
        {steps[currentStep].component}
      </div>

      {/* 验证错误显示 */}
      {validationError && (
        <div className="mb-6 p-4 bg-red-50 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {validationError}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* 导航按钮 */}
      <div className="flex flex-wrap justify-between mt-8">
        <div>
          {currentStep > 0 && (
            <button
              type="button"
              onClick={goToPreviousStep}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              上一步
            </button>
          )}
        </div>
        <div className="flex space-x-3">
          {onSaveDraft && (
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              保存草稿
            </button>
          )}
          {isLastStep ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              提交申请
            </button>
          ) : (
            <button
              type="button"
              onClick={goToNextStep}
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              下一步
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 