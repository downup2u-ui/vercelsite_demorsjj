import React from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action
}) => {
  return (
    <div className="text-center py-12">
      {icon && (
        <div className="flex justify-center mb-4">
          {icon}
        </div>
      )}
      <p className="text-gray-500 font-medium">{title}</p>
      {description && (
        <p className="mt-2 text-gray-400 text-sm max-w-md mx-auto">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState; 