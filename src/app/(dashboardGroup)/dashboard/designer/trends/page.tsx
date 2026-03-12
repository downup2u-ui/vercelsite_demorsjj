"use client";

import Link from 'next/link';
import { TrendsDisplayPlaceholder } from '@/components/ui/placeholders';

export default function DesignerTrendsPage() {
  const pageFeatureTitle = "行业趋势";
  const welcomeMessage = `了解最新设计趋势和市场动态，助您创作更符合市场需求的作品。`;

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
        探索设计行业的最新趋势、数据和市场洞察。了解流行风格、消费者偏好变化和新兴技术，帮助您设计出更具市场竞争力的作品。
      </div>

      {/* 使用新的占位符组件替代旧的占位符 */}
      <TrendsDisplayPlaceholder withCharts={true} withNewsCards={true} />
    </>
  );
} 
