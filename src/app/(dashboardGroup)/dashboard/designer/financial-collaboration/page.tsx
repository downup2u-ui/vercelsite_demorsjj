"use client";

import Link from 'next/link';
import { FinancialCollaborationPlaceholder } from '@/components/ui/placeholders';

export default function DesignerFinancialCollaborationPage() {
  const pageFeatureTitle = "财务服务协同";
  const welcomeMessage = "管理您的财务服务请求，与专业财务团队高效协作。";

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
          href="/dashboard/designer/financial-collaboration/new-request"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-150 text-sm"
        >
          + 发起新财务服务请求
        </Link>
      </div>

      {/* 使用财务协作占位符组件 */}
      <FinancialCollaborationPlaceholder requestCount={3} withFilters={true} />
    </>
  );
} 
