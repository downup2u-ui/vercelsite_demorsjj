"use client";

import Link from 'next/link';
import { PortfolioPublishingPlaceholder } from '@/components/ui/placeholders';

export default function DesignerPortfolioPublishingPage() {
  const pageFeatureTitle = "作品集发布";
  const welcomeMessage = "创建、编辑和分享您的设计作品，展示您的专业才华。";

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
      
      {/* 使用作品集发布占位符组件 */}
      <PortfolioPublishingPlaceholder workCount={4} withFilters={true} />
    </>
  );
} 
