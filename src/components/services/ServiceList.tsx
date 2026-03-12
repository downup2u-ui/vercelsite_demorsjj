"use client";

import React from 'react';
import ServiceCard, { ServiceFeature } from './ServiceCard';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  features: ServiceFeature[];
  detailUrl?: string;
}

export interface ServiceListProps {
  services: ServiceItem[];
  className?: string;
}

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 ${className}`}>
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          id={service.id}
          title={service.title}
          description={service.description}
          icon={service.icon}
          features={service.features}
          detailUrl={service.detailUrl || `/services/${service.category}/${service.id}`}
        />
      ))}
    </div>
  );
};

export default ServiceList; 