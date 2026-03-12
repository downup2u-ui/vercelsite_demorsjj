"use client";

import Link from 'next/link';
import { ServiceListPlaceholder } from '@/components/ui/placeholders';

export default function DesignerServicesPage() {
  const pageFeatureTitle = "服务市场";
  const welcomeMessage = `发现和连接平面打印、3D打印、3D扫描、材料供应商等配套服务商。`;

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
        在这里，您可以浏览和搜索各类与设计实现相关的服务提供商，例如高质量打印、3D建模与扫描、原型制作、材料采购等。
      </div>

      {/* 使用新的占位符组件替代旧的占位符 */}
      <ServiceListPlaceholder itemCount={4} withFilters={true} />
    </>
  );
} 
