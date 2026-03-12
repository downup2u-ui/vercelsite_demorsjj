'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { orders } from '@/data/commerceData';

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [filter, setFilter] = useState('all'); // all, open, in_progress, completed

  // 根据筛选条件过滤订单
  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 筛选选项 */}
      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
        >
          全部需求
        </button>
        <button 
          onClick={() => setFilter('open')}
          className={`px-4 py-2 rounded-md ${filter === 'open' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
        >
          待接单
        </button>
        <button 
          onClick={() => setFilter('in_progress')}
          className={`px-4 py-2 rounded-md ${filter === 'in_progress' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
        >
          进行中
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
        >
          已完成
        </button>
      </div>

      {/* 订单列表 */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <Link href={`/orders/${order.id}`} key={order.id}>
            <div className="group bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold group-hover:text-gray-800 transition-colors">{order.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'open' ? 'bg-gray-100 text-gray-800' : 
                    order.status === 'in_progress' ? 'bg-gray-200 text-gray-800' : 
                    'bg-gray-800 text-white'
                  }`}>
                    {order.status === 'open' ? '待接单' : 
                     order.status === 'in_progress' ? '进行中' : 
                     '已完成'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-6 line-clamp-2">{order.description}</p>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">预算</p>
                    <p className="text-lg font-bold">{order.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">截止日期</p>
                    <p className="text-lg font-semibold">{order.deadline}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {order.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="bg-gray-50 text-gray-700 text-xs px-3 py-1 rounded-full border border-gray-100">
                      {skill}
                    </span>
                  ))}
                  {order.skills.length > 3 && (
                    <span className="bg-gray-50 text-gray-700 text-xs px-3 py-1 rounded-full border border-gray-100">
                      +{order.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center px-6 py-3 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-500">发布于 {order.createdAt}</span>
                </div>
                <span className="text-gray-800 text-sm font-medium group-hover:text-black transition-colors">查看详情 →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 合同模板与协议 */}
      <section className="mt-16 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">合同模板与协议</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="font-semibold">标准服务合同</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">适用于大多数设计服务项目的标准合同模板，包含服务范围、交付内容、时间节点等条款。</p>
            <button className="text-indigo-600 text-sm font-medium">下载模板</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="font-semibold">知识产权协议</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">明确设计作品的知识产权归属、使用范围、转让条件等内容，保护双方权益。</p>
            <button className="text-indigo-600 text-sm font-medium">下载模板</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="font-semibold">保密协议</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">适用于涉及商业机密的项目，明确保密义务、期限和违约责任。</p>
            <button className="text-indigo-600 text-sm font-medium">下载模板</button>
          </div>
        </div>
      </section>

      {/* 服务流程 */}
      <section className="mt-16 mb-12">
        <h2 className="text-2xl font-bold mb-8">服务流程</h2>
        <div className="relative">
          {/* 连接线 */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gray-200 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-800 text-white mr-3">
                  <span className="font-semibold">1</span>
                </div>
                <h3 className="font-semibold">需求发布</h3>
              </div>
              <p className="text-gray-600 text-sm ml-13 pl-3">详细描述您的项目需求、预算和时间要求</p>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-800 text-white mr-3">
                  <span className="font-semibold">2</span>
                </div>
                <h3 className="font-semibold">设计师接单</h3>
              </div>
              <p className="text-gray-600 text-sm ml-13 pl-3">合适的设计师会提交方案并报价，您可以选择最合适的合作伙伴</p>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-800 text-white mr-3">
                  <span className="font-semibold">3</span>
                </div>
                <h3 className="font-semibold">签订协议</h3>
              </div>
              <p className="text-gray-600 text-sm ml-13 pl-3">确认合作后签订服务协议，明确双方权利义务</p>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-800 text-white mr-3">
                  <span className="font-semibold">4</span>
                </div>
                <h3 className="font-semibold">项目执行</h3>
              </div>
              <p className="text-gray-600 text-sm ml-13 pl-3">在平台上跟踪项目进度，进行沟通和反馈，直至项目完成</p>
            </div>
          </div>
        </div>
      </section>

      {/* 相关功能链接 */}
      <section className="mt-16 mb-12 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">相关功能</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/exhibitions" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">展览平台</h3>
            <p className="text-gray-600 mb-4">浏览精彩展览，发现艺术灵感，参与艺术活动</p>
            <span className="text-indigo-600 font-medium flex items-center">
              前往展览平台
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>
          
          <Link href="/crm" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">客户关系管理</h3>
            <p className="text-gray-600 mb-4">管理客户关系，跟踪销售机会，提高客户满意度</p>
            <span className="text-indigo-600 font-medium flex items-center">
              前往CRM系统
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>
          
          <Link href="/auctions" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">艺术品拍卖</h3>
            <p className="text-gray-600 mb-4">参与线上拍卖，收藏珍贵艺术品，发现独特创意</p>
            <span className="text-indigo-600 font-medium flex items-center">
              前往拍卖系统
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
