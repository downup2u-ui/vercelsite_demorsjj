"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  ChartBarIcon,
  CalendarIcon,
  CurrencyYenIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  FireIcon,
  ClockIcon,
  ChatBubbleLeftEllipsisIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

// 统计卡片组件
interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 border ${color === 'purple' ? 'border-purple-200' : color === 'blue' ? 'border-blue-200' : color === 'green' ? 'border-green-200' : color === 'orange' ? 'border-orange-200' : 'border-gray-200'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${
          color === 'purple' ? 'bg-purple-50 text-purple-600' :
          color === 'blue' ? 'bg-blue-50 text-blue-600' :
          color === 'green' ? 'bg-green-50 text-green-600' :
          color === 'orange' ? 'bg-orange-50 text-orange-600' :
          'bg-gray-50 text-gray-600'
        }`}>
          {icon}
        </div>
      </div>
      {change && (
        <div className="flex items-center text-sm">
          {change.isPositive ? (
            <ArrowUpIcon className="h-4 w-4 mr-1 text-green-500" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 mr-1 text-red-500" />
          )}
          <span className={change.isPositive ? 'text-green-600' : 'text-red-600'}>
            {change.value}
          </span>
          <span className="text-gray-500 ml-1">与上月相比</span>
        </div>
      )}
    </div>
  );
};

// 事件卡片组件
interface EventCardProps {
  title: string;
  date: string;
  description: string;
  type: 'deadline' | 'meeting' | 'task';
}

const EventCard: React.FC<EventCardProps> = ({ title, date, description, type }) => {
  const typeConfig = {
    deadline: {
      icon: <ClockIcon className="h-5 w-5 text-red-500" />,
      bg: 'bg-red-50',
      border: 'border-red-200'
    },
    meeting: {
      icon: <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-blue-500" />,
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    task: {
      icon: <ClipboardDocumentListIcon className="h-5 w-5 text-green-500" />,
      bg: 'bg-green-50',
      border: 'border-green-200'
    }
  };

  const config = typeConfig[type];

  return (
    <div className={`p-4 rounded-lg border ${config.border} ${config.bg}`}>
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">
          {config.icon}
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-500 mt-1">{date}</p>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

// 排行项组件
interface RankingItemProps {
  position: number;
  title: string;
  subtitle: string;
  value: string;
  imageSrc?: string;
}

const RankingItem: React.FC<RankingItemProps> = ({ position, title, subtitle, value, imageSrc }) => {
  return (
    <div className="flex items-center py-3 border-b border-gray-100 last:border-0">
      <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm font-medium ${
        position <= 3 
          ? 'bg-indigo-100 text-indigo-700' 
          : 'bg-gray-100 text-gray-700'
      }`}>
        {position}
      </span>
      {imageSrc && (
        <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden mr-3 flex-shrink-0">
          <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex-grow min-w-0">
        <p className="font-medium text-gray-900 truncate">{title}</p>
        <p className="text-xs text-gray-500 truncate">{subtitle}</p>
      </div>
      <div className="flex-shrink-0 font-medium text-gray-900">
        {value}
      </div>
    </div>
  );
};

export default function OverviewPage() {
  // 统计数据
  const stats = [
    {
      title: "本月收入",
      value: "¥32,500",
      change: { value: "12%", isPositive: true },
      icon: <CurrencyYenIcon className="h-6 w-6" />,
      color: "purple"
    },
    {
      title: "进行中项目",
      value: "8",
      change: { value: "2", isPositive: true },
      icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
      color: "blue"
    },
    {
      title: "客户数量",
      value: "42",
      change: { value: "5", isPositive: true },
      icon: <UserGroupIcon className="h-6 w-6" />,
      color: "green"
    },
    {
      title: "订单数量",
      value: "65",
      change: { value: "7%", isPositive: true },
      icon: <ShoppingCartIcon className="h-6 w-6" />,
      color: "orange"
    }
  ];

  // 近期事件
  const upcomingEvents = [
    {
      title: "办公空间设计方案提交",
      date: "今天 16:00",
      description: "需要完成最终设计方案提交给上海创新科技有限公司。",
      type: "deadline" as const
    },
    {
      title: "客户需求讨论会议",
      date: "明天 10:30",
      description: "与李女士讨论家居设计的需求和预算细节。",
      type: "meeting" as const
    },
    {
      title: "产品样品检查",
      date: "后天 14:00",
      description: "检查新家具样品的制作质量，确认是否需要修改。",
      type: "task" as const
    }
  ];

  // 热门作品
  const popularWorks = [
    {
      position: 1,
      title: "极简主义办公桌",
      subtitle: "家具设计",
      value: "2,356 浏览",
      imageSrc: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
    },
    {
      position: 2,
      title: "现代公寓客厅设计",
      subtitle: "空间设计",
      value: "1,845 浏览",
      imageSrc: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
    },
    {
      position: 3,
      title: "环保餐厨用品系列",
      subtitle: "产品设计",
      value: "1,526 浏览",
      imageSrc: "https://images.unsplash.com/photo-1606114175460-31ba3a2e5129?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
    },
    {
      position: 4,
      title: "城市绿洲景观设计",
      subtitle: "景观设计",
      value: "952 浏览",
      imageSrc: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
    }
  ];

  // 热门客户
  const topClients = [
    {
      position: 1,
      title: "上海创新科技有限公司",
      subtitle: "企业客户 · 12个项目",
      value: "¥125,800"
    },
    {
      position: 2,
      title: "北京艺术学院",
      subtitle: "教育机构 · 8个项目",
      value: "¥98,500"
    },
    {
      position: 3,
      title: "李女士",
      subtitle: "个人客户 · 5个项目",
      value: "¥56,200"
    },
    {
      position: 4,
      title: "广州时尚家居有限公司",
      subtitle: "企业客户 · 3个项目",
      value: "¥42,000"
    }
  ];

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">仪表盘总览</h1>
        <p className="mt-2 text-sm text-gray-600">
          欢迎回来，查看您的设计业务概况和最新动态
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* 活动与通知区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 近期事件 */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">近期事件</h2>
            <Link href="/dashboard/designer/calendar">
              <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                查看日历
              </button>
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event, idx) => (
              <EventCard
                key={idx}
                title={event.title}
                date={event.date}
                description={event.description}
                type={event.type}
              />
            ))}
          </div>
        </div>

        {/* 绩效指标 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">绩效指标</h2>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">项目完成率</span>
                <span className="text-sm font-medium text-gray-900">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">客户满意度</span>
                <span className="text-sm font-medium text-gray-900">94%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">收入目标达成</span>
                <span className="text-sm font-medium text-gray-900">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">作品曝光增长</span>
                <span className="text-sm font-medium text-gray-900">62%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 热门数据区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 热门作品 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">热门作品</h2>
            <Link href="/dashboard/designer/project/portfolio">
              <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
                查看全部
              </button>
            </Link>
          </div>
          <div>
            {popularWorks.map((work) => (
              <RankingItem
                key={work.position}
                position={work.position}
                title={work.title}
                subtitle={work.subtitle}
                value={work.value}
                imageSrc={work.imageSrc}
              />
            ))}
          </div>
        </div>

        {/* 热门客户 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">热门客户</h2>
            <Link href="/dashboard/designer/sales/clients">
              <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
                查看全部
              </button>
            </Link>
          </div>
          <div>
            {topClients.map((client) => (
              <RankingItem
                key={client.position}
                position={client.position}
                title={client.title}
                subtitle={client.subtitle}
                value={client.value}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 快速访问区域 */}
      <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
        <div className="flex items-center mb-5">
          <SparklesIcon className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-lg font-semibold text-indigo-800">快速访问</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/dashboard/designer/project/new">
            <div className="bg-white p-4 rounded-lg border border-indigo-200 hover:shadow-md transition-shadow flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 mr-3">
                <ClipboardDocumentListIcon className="h-5 w-5" />
              </div>
              <span className="font-medium text-gray-800">创建新项目</span>
            </div>
          </Link>
          <Link href="/dashboard/designer/sales/new-client">
            <div className="bg-white p-4 rounded-lg border border-indigo-200 hover:shadow-md transition-shadow flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 mr-3">
                <UserGroupIcon className="h-5 w-5" />
              </div>
              <span className="font-medium text-gray-800">添加新客户</span>
            </div>
          </Link>
          <Link href="/dashboard/designer/project/portfolio/upload">
            <div className="bg-white p-4 rounded-lg border border-indigo-200 hover:shadow-md transition-shadow flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 mr-3">
                <SparklesIcon className="h-5 w-5" />
              </div>
              <span className="font-medium text-gray-800">上传作品</span>
            </div>
          </Link>
          <Link href="/dashboard/designer/analytics">
            <div className="bg-white p-4 rounded-lg border border-indigo-200 hover:shadow-md transition-shadow flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 mr-3">
                <ChartBarIcon className="h-5 w-5" />
              </div>
              <span className="font-medium text-gray-800">查看分析报告</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 