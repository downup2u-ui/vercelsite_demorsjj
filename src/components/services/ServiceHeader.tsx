"use client";

import React from 'react';

export interface ServiceHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  title,
  description = "我们提供全方位的服务，助力创意从概念到实现",
  className = "",
}) => {
  return (
    <div className={`text-center max-w-3xl mx-auto px-4 sm:px-6 ${className}`}>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
      <div className="w-24 h-1 bg-indigo-600 mx-auto my-6"></div>
      {description && (
        <p className="mt-4 text-xl leading-8 text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
};

export default ServiceHeader; 