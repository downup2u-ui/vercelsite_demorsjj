"use client";

import Link from 'next/link';
import { ResourcesManagerPlaceholder } from '@/components/ui/placeholders';

export default function DesignerResourcesPage() {
  // const professionName = "设计师 (Designer)"; // Not needed for page-level welcome if handled globally or differently
  const pageFeatureTitle = "设计资源库";
  const welcomeMessage = `访问和管理您的常用设计工具、素材库、灵感来源和学习资料。`;

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
        这里汇集了对您有用的设计资源。您可以收藏链接、整理素材、记录灵感笔记，并发现新的工具和教程。
      </div>

      {/* 使用新的占位符组件替代旧的占位符 */}
      <ResourcesManagerPlaceholder withSidebar={true} itemCount={8} />
    </>
  );
} 
