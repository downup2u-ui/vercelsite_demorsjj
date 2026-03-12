"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: ServiceFeature[];
  detailUrl?: string;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  icon,
  features,
  detailUrl,
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <h3 className="ml-4 text-xl font-bold text-gray-900">{title}</h3>
        </div>
        
        <p className="text-gray-600 mb-5">
          {description}
        </p>
        
        <h4 className="font-medium text-gray-800 mb-3">核心服务：</h4>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-2 text-gray-600">{feature.title}</span>
            </li>
          ))}
        </ul>
        
        {detailUrl && (
          <Link
            href={detailUrl}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
          >
            了解更多
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ServiceCard; 