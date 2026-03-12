"use client";

import Link from 'next/link';
import { IPCollaborationPlaceholder } from '@/components/ui/placeholders';

export default function DesignerIpCollaborationPage() {
  const pageFeatureTitle = "知识产权服务协同";
  const welcomeMessage = "管理您的知识产权服务请求，与专业团队高效协作保护您的创意成果。";

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
      
      <div className="flex justify-end mb-6">
        <Link
          href="/dashboard/designer/ip-collaboration/new-request"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-150 text-sm"
        >
          + 发起新IP服务请求
        </Link>
      </div>

      {/* 使用IP协作占位符组件 */}
      <IPCollaborationPlaceholder projectCount={3} withFilters={true} />
    </>
  );
} 
