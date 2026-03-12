import React from 'react';

export interface NavItem {
  name: string;
  href: string;
  icon?: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & { title?: string | undefined; titleId?: string | undefined; } & React.RefAttributes<SVGSVGElement>>;
  current?: boolean; // Optional: active state can be determined by current path
  children?: NavItem[]; // For nested navigation
  role?: string[]; // Optional: to control visibility based on user role
} 