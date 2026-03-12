"use client";

import Link from 'next/link';
import { EventCreationPlaceholder } from '@/components/ui/placeholders';

export default function DesignerEventCreationPage() {
  const pageFeatureTitle = "活动发起";
  const welcomeMessage = "创建、管理和推广您的设计活动、工作坊和展览。";

  return (
    <>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-3xl font-semibold text-gray-800">{pageFeatureTitle}</h2>
            <Link href="/dashboard/designer" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              返回设计师仪表盘
            </Link>
        </div>
        <p className="text-gray-500 mt-1 text-lg">{welcomeMessage}</p>
      </div>
      
      {/* 使用活动发起占位符组件 */}
      <EventCreationPlaceholder eventCount={3} withFilters={true} />
    </>
  );
} 
