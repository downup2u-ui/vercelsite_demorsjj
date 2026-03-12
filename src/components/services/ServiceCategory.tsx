"use client";

import React from 'react';

export interface CategoryItem {
  id: string;
  name: string;
}

export interface ServiceCategoryProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

const ServiceCategory: React.FC<ServiceCategoryProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  className = "",
}) => {
  return (
    <div className={`flex flex-wrap justify-center ${className}`}>
      <div className="inline-flex rounded-md shadow-sm" role="group">
        {categories.map((category, index) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category.id
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } ${
              index === 0 ? 'rounded-l-lg' : ''
            } ${
              index === categories.length - 1 ? 'rounded-r-lg' : ''
            } border border-gray-200`}
            aria-current={selectedCategory === category.id ? 'page' : undefined}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategory; 