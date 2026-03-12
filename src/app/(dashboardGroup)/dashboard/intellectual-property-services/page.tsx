"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 定义服务卡片组件
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  count?: number;
  status?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, path, count, status }) => {
  return (
    <Link href={path}>
      <div className="bg-white rounded-lg shadow p-6 transition-all hover:shadow-md hover:border-indigo-100 border border-transparent cursor-pointer h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="rounded-full bg-indigo-100 p-3">
            {icon}
          </div>
          {count !== undefined && (
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-sm">
              <span className="font-medium text-gray-700">{count}</span>
              {status && <span className="ml-1 text-xs text-gray-500">{status}</span>}
            </div>
          )}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
        <div className="flex justify-end mt-2">
          <span className="text-indigo-600 text-sm font-medium hover:text-indigo-800">进入 &rarr;</span>
        </div>
      </div>
    </Link>
  );
};

// 模拟统计数据
const statsData = {
  totalIpAssets: 124,
  trademarks: 48,
  patents: 23,
  copyrights: 53,
  pendingRequests: 12,
  upcomingExpiry: 8,
  revenueToday: 28460,
  revenuePeriod: "本月"
};

// 活动日志数据
const activityLogs = [
  { id: 1, type: '商标', action: '申请提交', name: '"创数智能"商标注册', time: '今天 09:23', user: '王知产', icon: '🔖' },
  { id: 2, type: '设计师请求', action: '回复', name: '网站UI设计版权咨询', time: '昨天 15:45', user: '王知产', icon: '✉️' },
  { id: 3, type: '版权登记', action: '完成登记', name: '数字插画作品集"未来城市"', time: '2天前', user: '李法务', icon: '📝' },
  { id: 4, type: '专利', action: '状态更新', name: '交互设计方法专利申请', time: '3天前', user: '系统', icon: '📋' },
  { id: 5, type: 'IP授权', action: '新协议', name: '与视觉艺术工作室的商标授权', time: '5天前', user: '张授权', icon: '📜' }
];

export default function IntellectualPropertyServicesPage() {
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter'>('month');

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">知识产权服务</h1>
        <p className="mt-1 text-gray-500">管理和保护您的设计资产，处理知识产权相关申请与咨询</p>
      </div>
      
      {/* 概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg shadow p-5 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-100 text-sm">知识产权资产总数</p>
              <p className="text-3xl font-bold mt-1">{statsData.totalIpAssets}</p>
            </div>
            <div className="bg-white/20 rounded-full p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 flex space-x-4 text-xs">
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-indigo-200 mr-1"></span>
              <span>商标: {statsData.trademarks}</span>
            </div>
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-indigo-200 mr-1"></span>
              <span>专利: {statsData.patents}</span>
            </div>
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-indigo-200 mr-1"></span>
              <span>版权: {statsData.copyrights}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">待处理请求</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{statsData.pendingRequests}</p>
            </div>
            <div className="bg-yellow-100 text-yellow-700 rounded-full p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Link href="/dashboard/intellectual-property-services/designer-requests" className="text-indigo-600 text-sm hover:text-indigo-800 font-medium">
              处理设计师请求
            </Link>
            <svg className="w-4 h-4 ml-1 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">即将到期</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{statsData.upcomingExpiry}</p>
            </div>
            <div className="bg-red-100 text-red-700 rounded-full p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Link href="/dashboard/intellectual-property-services/ip-licensing" className="text-indigo-600 text-sm hover:text-indigo-800 font-medium">
              查看到期提醒
            </Link>
            <svg className="w-4 h-4 ml-1 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">{statsData.revenuePeriod}收益</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">¥{statsData.revenueToday.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 text-green-700 rounded-full p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex space-x-2 text-xs text-gray-600">
              <button 
                onClick={() => setPeriod('week')} 
                className={`px-2 py-1 rounded ${period === 'week' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100'}`}
              >
                周
              </button>
              <button 
                onClick={() => setPeriod('month')} 
                className={`px-2 py-1 rounded ${period === 'month' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100'}`}
              >
                月
              </button>
              <button 
                onClick={() => setPeriod('quarter')} 
                className={`px-2 py-1 rounded ${period === 'quarter' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100'}`}
              >
                季度
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 服务卡片 */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">IP服务</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard 
            title="商标管理" 
            description="管理您的品牌商标资产，申请新商标，监控商标状态和处理续展。" 
            icon={
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            }
            path="/dashboard/intellectual-property-services/trademark-management"
            count={statsData.trademarks}
            status="活跃"
          />
          
          <ServiceCard 
            title="专利服务" 
            description="管理发明专利、实用新型专利和外观设计专利的申请和保护。" 
            icon={
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
            path="/dashboard/intellectual-property-services/patent-services"
            count={statsData.patents}
            status="活跃"
          />
          
          <ServiceCard 
            title="版权登记" 
            description="为设计作品、软件、文字和艺术创作等创意成果办理版权登记与保护。" 
            icon={
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            }
            path="/dashboard/intellectual-property-services/copyright-registration"
            count={statsData.copyrights}
            status="活跃"
          />
          
          <ServiceCard 
            title="设计师协作请求" 
            description="处理来自设计师的知识产权咨询、保护申请和服务请求。" 
            icon={
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            }
            path="/dashboard/intellectual-property-services/designer-requests"
            count={statsData.pendingRequests}
            status="待处理"
          />
          
          <ServiceCard 
            title="IP交易与授权" 
            description="管理知识产权授权协议、交易和收益，监控授权状态及到期提醒。" 
            icon={
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            path="/dashboard/intellectual-property-services/ip-licensing"
            count={statsData.upcomingExpiry}
            status="即将到期"
          />
          
          <ServiceCard 
            title="账户设置" 
            description="管理知识产权服务的个人资料、偏好设置、通知和账单计划。" 
            icon={
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            path="/dashboard/intellectual-property-services/settings"
          />
        </div>
      </div>
      
      {/* 活动日志 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">近期活动</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-800">查看所有活动</button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 space-y-6">
            {activityLogs.map((log) => (
              <div key={log.id} className="flex">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-xl">
                  {log.icon}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">{log.user}</span>
                    <span className="mx-1 text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{log.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-0.5">
                    <span className="font-medium">{log.action}</span> {log.type}：{log.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <button className="w-full text-center text-sm text-gray-700 hover:text-gray-900">
              加载更多
            </button>
          </div>
        </div>
      </div>
      
      {/* 知识产权资源 */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">IP资源与工具</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
            <h3 className="text-base font-medium text-gray-900 mb-2">商标检索工具</h3>
            <p className="text-sm text-gray-600 mb-4">使用我们的智能商标检索工具，快速识别潜在冲突。</p>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              开始检索 &rarr;
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <h3 className="text-base font-medium text-gray-900 mb-2">IP评估计算器</h3>
            <p className="text-sm text-gray-600 mb-4">评估您的知识产权资产价值，获取专业估值报告。</p>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              开始评估 &rarr;
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-amber-500">
            <h3 className="text-base font-medium text-gray-900 mb-2">IP保护指南</h3>
            <p className="text-sm text-gray-600 mb-4">获取关于设计作品保护的最佳实践和指南文档。</p>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              查看指南 &rarr;
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 