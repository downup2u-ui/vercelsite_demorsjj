"use client";

import Link from 'next/link';
// Removed: import DashboardLayout from '@/components/dashboard/DashboardLayout';

/**
 * EngineerDashboardPage component renders the personalized dashboard for Engineers.
 * It uses the DashboardGroupLayout for common structure through route groups.
 */
export default function EngineerDashboardPage() {
  const professionName = "研发工程师 (Engineer)";
  const pageTitle = `${professionName} Dashboard`;
  const welcomeMessage = "您的工程项目与技术创新中心，助力高效研发与协作。";

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
        <p className="mt-1 text-gray-500">{welcomeMessage}</p>
      </div>
      
      {/* Engineer-specific content starts here */}
      <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg min-h-[200px]">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">主要功能模块 (构想):</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
          <li><strong>当前项目概览:</strong> 跟踪项目进度、任务分配。</li>
          <li><strong>技术文档库:</strong> 个人或团队共享技术文档。</li>
          <li><strong>仿真/测试数据中心:</strong> 管理和分析实验数据。</li>
          <li><strong>问题追踪与解决:</strong> 记录和管理技术难题。</li>
          <li><strong>团队协作工具入口:</strong> 集成常用协作平台。</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">关键数据指标 (构想):</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>项目里程碑达成率</li>
          <li>缺陷修复率与响应时间</li>
          <li>资源利用率分析</li>
        </ul>
      </div>
      {/* Engineer-specific content ends here */}
    </>
  );
} 