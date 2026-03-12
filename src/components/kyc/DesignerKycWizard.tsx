"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import KycProgressBar from './KycProgressBar';
import PersonalInformationStep from './steps/PersonalInformationStep';
import ProfessionalInformationStep from './steps/ProfessionalInformationStep';
// import AccountSecurityStep from './steps/AccountSecurityStep';

const STEPS = [
  { id: 1, name: '个人信息' },
  { id: 2, name: '专业资讯' },
  { id: 3, name: '账户安全' },
];

export default function DesignerKycWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle final form submission
    console.log('Form submitted:', formData);
    router.push('/dashboard/designer');
  };
  
  const totalSteps = STEPS.length;

  return (
    <div className="w-full">
      <KycProgressBar currentStep={currentStep} totalSteps={totalSteps} steps={STEPS} />

      <div className="mt-8 p-4 md:p-6 bg-white rounded-lg ">
        {/* Render current step component based on currentStep */}
        {currentStep === 1 && <PersonalInformationStep /> /* <PersonalInformationStep formData={formData} setFormData={setFormData} /> */}
        {currentStep === 2 && <ProfessionalInformationStep /> /* <ProfessionalInformationStep formData={formData} setFormData={setFormData} /> */}
        {currentStep === 3 && <p>账户安全表单字段将在此处 (AccountSecurityStep placeholder)</p>/* <AccountSecurityStep formData={formData} setFormData={setFormData} /> */}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 pt-5 border-t border-gray-200">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
          >
            上一步
          </button>
          {currentStep < STEPS.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-150"
            >
              下一步
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-150"
            >
              提交
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 