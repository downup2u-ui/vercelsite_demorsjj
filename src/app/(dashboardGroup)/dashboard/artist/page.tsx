"use client";

import Link from 'next/link';
// Removed: import DashboardLayout from '@/components/dashboard/DashboardLayout';

/**
 * ArtistDashboardPage component renders the personalized dashboard for Artists.
 * It utilizes the DashboardLayout for common structure and provides artist-specific content.
 */
export default function ArtistDashboardPage() {
  const professionName = "艺术家 (Artist)";
  // const pageTitle = `${professionName} Dashboard`; // Handled by group layout
  const welcomeMessage = "这里是您的艺术创作与展示空间，助您管理作品、连接世界。";

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">欢迎艺术家, {professionName}!</h2>
        <p className="text-gray-500 mt-2 text-lg">{welcomeMessage}</p>
      </div>
      
      <div className="bg-white p-6 shadow-md rounded-lg border-2 border-dashed border-gray-200 min-h-[200px]">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">主要功能模块 (构想):</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
          <li><strong>个人作品画廊:</strong> 分类展示您的艺术作品。</li>
          <li><strong>展览日历与提醒:</strong> 管理重要展览和活动。</li>
          <li><strong>艺术品销售/询价管理:</strong> 跟踪销售机会和客户咨询。</li>
          <li><strong>创作灵感/素材库:</strong> 收集和整理创作资源。</li>
          <li><strong>行业资讯:</strong> 获取艺术界最新动态。</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">关键数据指标 (构想):</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>作品浏览量与互动数据</li>
          <li>关注者增长趋势</li>
          <li>参展申请状态与反馈</li>
        </ul>
      </div>
    </>
  );
} 