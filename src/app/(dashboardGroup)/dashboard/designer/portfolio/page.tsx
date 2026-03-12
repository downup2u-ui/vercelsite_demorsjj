"use client";

import Link from 'next/link';
import { PortfolioGridPlaceholder } from '@/components/ui/placeholders';
// Removed: import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function DesignerPortfolioPage() {
  const professionName = "设计师 (Designer)";
  const pageFeatureTitle = "我的作品集";
  // const pageFullTitle = `${pageFeatureTitle} - ${professionName} Dashboard`; // Handled by group layout
  const welcomeMessage = `展示和管理您的最佳设计作品，吸引潜在客户与合作机会。`;

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">{pageFeatureTitle}</h2>
          <p className="text-gray-500 mt-1">{welcomeMessage}</p>
        </div>
        <Link href="/dashboard/designer" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          返回设计师仪表盘
        </Link>
      </div>

      <div className="text-gray-600 mb-6">
        这里是您展示设计才华的空间。您可以上传、分类和编辑您的作品，生成可分享的链接，并查看作品的浏览数据。
      </div>

      {/* 使用新的占位符组件替代旧的占位符 */}
      <PortfolioGridPlaceholder itemCount={6} withUploadButton={true} withFilters={true} />
    </>
  );
} 
