"use client";

interface Step {
  id: number;
  name: string;
}

interface KycProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: Step[];
}

const KycProgressBar: React.FC<KycProgressBarProps> = ({ currentStep, totalSteps, steps }) => {
  const progressPercentage = ((currentStep -1) / (totalSteps -1)) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={`w-1/${totalSteps} text-center px-1 ${currentStep >= step.id ? 'text-indigo-600 font-semibold' : 'text-gray-500'}`}
          >
            {step.id}. {step.name}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="text-right text-sm text-gray-600 mt-2">
        完成度: {Math.round(progressPercentage)}%
      </div>
    </div>
  );
};

export default KycProgressBar; 