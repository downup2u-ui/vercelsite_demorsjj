"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  CheckBadgeIcon, 
  ArchiveBoxIcon, 
  FireIcon,
  TagIcon,
  ClockIcon,
  UserGroupIcon,
  ArrowPathIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

// 服务卡片组件
interface ServiceCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  href: string;
  isPopular?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  icon, 
  description, 
  href, 
  isPopular 
}) => {
  return (
    <Link href={href}>
      <div className={`bg-white rounded-lg shadow-md p-6 transition duration-300 hover:shadow-lg cursor-pointer relative
        ${isPopular ? 'border-2 border-indigo-500' : 'border border-gray-200 hover:border-indigo-300'}`}>
        {isPopular && (
          <span className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
            热门服务
          </span>
        )}
        <div className="flex items-center mb-4">
          <span className="p-2 rounded-lg bg-indigo-50 text-indigo-600 mr-4">{icon}</span>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="mt-auto">
          <span className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition">
            申请服务 &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
};

// 特性项组件
interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-50 text-indigo-600">
          {icon}
        </div>
      </div>
      <div className="ml-4">
        <h4 className="text-lg font-medium text-gray-900">{title}</h4>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default function SampleServicePage() {
  // 主要服务卡片数据
  const mainServices = [
    {
      title: "产品质检",
      icon: <CheckBadgeIcon className="h-6 w-6" />,
      description: "提供专业的产品质量检测服务，确保产品符合行业标准和客户需求。支持材料分析、耐久性测试、安全性评估等。",
      href: "/dashboard/designer/sample-service/quality-inspection",
      isPopular: true
    },
    {
      title: "产品包装",
      icon: <ArchiveBoxIcon className="h-6 w-6" />,
      description: "专业的产品包装设计与制作服务，提供定制化包装解决方案，确保产品安全、美观、符合品牌形象。",
      href: "/dashboard/designer/sample-service/packaging",
      isPopular: false
    }
  ];

  // 服务特性数据
  const features = [
    {
      icon: <FireIcon className="h-6 w-6" />,
      title: "专业品质",
      description: "我们拥有经验丰富的专业团队，确保每项服务都达到高水准。"
    },
    {
      icon: <TagIcon className="h-6 w-6" />,
      title: "合理定价",
      description: "透明的价格体系，为您提供高性价比的服务方案。"
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      title: "快速响应",
      description: "在收到申请后24小时内响应，并提供服务时间预估。"
    },
    {
      icon: <UserGroupIcon className="h-6 w-6" />,
      title: "专属顾问",
      description: "每个项目配备专属顾问，全程指导跟踪服务进度。"
    },
    {
      icon: <ArrowPathIcon className="h-6 w-6" />,
      title: "灵活调整",
      description: "根据反馈灵活调整服务内容，满足您的个性化需求。"
    },
    {
      icon: <QuestionMarkCircleIcon className="h-6 w-6" />,
      title: "全程咨询",
      description: "提供全方位咨询服务，解答您在服务过程中的任何疑问。"
    }
  ];

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">制样附加服务</h1>
        <p className="mt-2 text-sm text-gray-600">
          为您的产品制样提供专业的质检和包装服务，提升产品品质
        </p>
      </div>

      {/* 主要服务卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mainServices.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            icon={service.icon}
            description={service.description}
            href={service.href}
            isPopular={service.isPopular}
          />
        ))}
      </div>

      {/* 服务特性部分 */}
      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-8">我们的服务优势</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureItem
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      {/* 服务流程 */}
      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">服务申请流程</h2>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold mb-2">1</div>
            <h3 className="font-medium text-gray-800">提交申请</h3>
            <p className="text-sm text-gray-600 mt-1">选择服务类型并填写服务申请表单</p>
          </div>
          <div className="hidden md:block text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold mb-2">2</div>
            <h3 className="font-medium text-gray-800">确认需求</h3>
            <p className="text-sm text-gray-600 mt-1">服务顾问与您联系确认具体需求与报价</p>
          </div>
          <div className="hidden md:block text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold mb-2">3</div>
            <h3 className="font-medium text-gray-800">执行服务</h3>
            <p className="text-sm text-gray-600 mt-1">专业团队按计划执行服务并实时反馈进度</p>
          </div>
          <div className="hidden md:block text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold mb-2">4</div>
            <h3 className="font-medium text-gray-800">验收完成</h3>
            <p className="text-sm text-gray-600 mt-1">确认服务结果并完成验收评价</p>
          </div>
        </div>
      </div>

      {/* 服务记录摘要 */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">最近服务记录</h2>
          <Link href="/dashboard/designer/sample-service/records">
            <span className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition">
              查看全部 &rarr;
            </span>
          </Link>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">服务编号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">服务类型</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">申请日期</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">SS-2023-1210</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">产品质检</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-12-10</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">进行中</span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">SS-2023-1205</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">产品包装</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-12-05</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">等待材料</span>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">SS-2023-1115</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">产品质检</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-11-15</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">已完成</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 