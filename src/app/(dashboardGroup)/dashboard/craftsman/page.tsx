"use client";

import Link from 'next/link';
// Removed: import DashboardLayout from '@/components/dashboard/DashboardLayout';

/**
 * CraftsmanDashboardPage component renders the personalized dashboard for Craftsmen.
 * It utilizes the DashboardLayout for common structure and provides craftsman-specific content.
 */
export default function CraftsmanDashboardPage() {
  const professionName = "手工艺者 (Craftsman)";
  // const pageTitle = `${professionName} Dashboard`; // Handled by group layout
  const welcomeMessage = "管理您的手工作品、订单和客户，让匠心之作触达更多人。";

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">欢迎手工艺者, {professionName}!</h2>
        <p className="text-gray-500 mt-2 text-lg">{welcomeMessage}</p>
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg border-2 border-dashed border-gray-200 min-h-[200px]">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">主要功能模块 (构想):</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
          <li><strong>产品/作品陈列:</strong> 包含制作材料、工艺说明。</li>
          <li><strong>订单管理:</strong> 处理定制和现货订单。</li>
          <li><strong>材料库存预警:</strong> 及时补充所需材料。</li>
          <li><strong>客户沟通记录:</strong> 有效管理客户互动。</li>
          <li><strong>工艺技巧交流区:</strong> 与同行分享和学习。</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">关键数据指标 (构想):</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>订单量和销售额</li>
          <li>畅销作品排行</li>
          <li>平均制作周期和客户评价</li>
        </ul>
      </div>
    </>
  );
} 