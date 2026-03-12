"use client";

import Link from 'next/link';
// Removed: import DashboardLayout from '@/components/dashboard/DashboardLayout';

/**
 * TechnicalSupportDashboardPage component renders the personalized dashboard for Technical Support staff.
 * It uses the DashboardGroupLayout for common structure through route groups.
 */
export default function TechnicalSupportDashboardPage() {
  const professionName = "技术支持 (Technical Support)";
  const pageTitle = `${professionName} Dashboard`;
  const welcomeMessage = "您的技术支持工作中心，提供高效问题解决与用户帮助。";

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
        <p className="mt-1 text-gray-500">{welcomeMessage}</p>
      </div>
      
      {/* Technical support-specific content starts here */}
      <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg min-h-[200px]">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">主要功能模块 (构想):</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
          <li><strong>工单管理系统:</strong> 查看和处理用户提交的技术问题。</li>
          <li><strong>实时客服系统:</strong> 提供即时技术支持与沟通。</li>
          <li><strong>知识库管理:</strong> 维护常见问题解决方案的资料库。</li>
          <li><strong>用户反馈追踪:</strong> 记录和分析用户反馈与建议。</li>
          <li><strong>技术培训资源:</strong> 为用户提供培训材料与教程。</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">关键数据指标 (构想):</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>平均解决时间</li>
          <li>首次响应速度</li>
          <li>用户满意度评分</li>
        </ul>
      </div>
      {/* Technical support-specific content ends here */}
    </>
  );
} 