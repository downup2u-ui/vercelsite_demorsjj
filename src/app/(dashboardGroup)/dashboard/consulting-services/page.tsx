"use client";

import Link from 'next/link';
// Removed: import DashboardLayout from '@/components/dashboard/DashboardLayout';

/**
 * ConsultingServicesDashboardPage component renders the personalized dashboard for Consulting Service experts.
 * It utilizes the DashboardLayout for common structure and provides consulting-specific content.
 */
export default function ConsultingServicesDashboardPage() {
  const professionName = "顾问服务 (Consulting Services)";
  // const pageTitle = `${professionName} Dashboard`; // Handled by group layout
  const welcomeMessage = "您的咨询项目管理平台，助力方案制定、客户沟通与成果交付。";

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">欢迎顾问, {professionName}!</h2>
        <p className="text-gray-500 mt-2 text-lg">{welcomeMessage}</p>
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg border-2 border-dashed border-gray-200 min-h-[200px]">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">主要功能模块 (构想):</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
          <li><strong>客户项目看板:</strong> 跟踪各咨询项目进展。</li>
          <li><strong>咨询方案库:</strong> 存储和复用咨询方案与模板。</li>
          <li><strong>行业研究报告:</strong> 整合与分析行业数据。</li>
          <li><strong>会议与访谈日程:</strong> 管理重要沟通安排。</li>
          <li><strong>成果交付管理:</strong> 跟踪咨询报告和交付物。</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">关键数据指标 (构想):</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>项目成功率与客户续约率</li>
          <li>客户反馈评分与推荐度</li>
          <li>知识贡献度与方案复用率</li>
        </ul>
      </div>
    </>
  );
} 