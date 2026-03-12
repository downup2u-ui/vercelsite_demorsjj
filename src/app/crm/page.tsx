'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { clients } from '@/data/commerceData';

export default function CRMPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [filter, setFilter] = useState('all'); // all, lead, prospect, customer, inactive
  const [searchTerm, setSearchTerm] = useState('');

  // 检查用户是否为VIP会员
  const isVIP = user?.membershipType === 'vip';

  // 如果不是VIP会员，显示升级提示
  if (!isVIP) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h1 className="text-3xl font-bold mb-4">VIP会员专享功能</h1>
          <p className="text-gray-600 mb-8">CRM系统是VIP会员的专属功能，升级为VIP会员即可使用客户管理、销售漏斗、工单系统等高级功能。</p>
          <button 
            onClick={() => router.push('/membership')}
            className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition"
          >
            升级为VIP会员
          </button>
        </div>
      </div>
    );
  }

  // 根据筛选条件和搜索词过滤客户
  const filteredClients = clients.filter(client => {
    const matchesFilter = filter === 'all' || client.status === filter;
    const matchesSearch = searchTerm === '' || 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 搜索和筛选 */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索客户名称或公司..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
            >
              全部
            </button>
            <button 
              onClick={() => setFilter('lead')}
              className={`px-4 py-2 rounded-md ${filter === 'lead' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
            >
              潜在客户
            </button>
            <button 
              onClick={() => setFilter('prospect')}
              className={`px-4 py-2 rounded-md ${filter === 'prospect' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
            >
              意向客户
            </button>
            <button 
              onClick={() => setFilter('customer')}
              className={`px-4 py-2 rounded-md ${filter === 'customer' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
            >
              正式客户
            </button>
            <button 
              onClick={() => setFilter('inactive')}
              className={`px-4 py-2 rounded-md ${filter === 'inactive' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
            >
              不活跃
            </button>
          </div>
        </div>
      </div>

      {/* 客户列表 */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                客户
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                联系方式
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                标签
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                最近联系
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                项目数
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">操作</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {client.avatar ? (
                        <Image
                          className="h-10 w-10 rounded-full"
                          src={client.avatar}
                          alt={client.name}
                          width={40}
                          height={40}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 font-medium">{client.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500">{client.company || '个人客户'}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    client.status === 'lead' ? 'bg-blue-100 text-blue-800' : 
                    client.status === 'prospect' ? 'bg-yellow-100 text-yellow-800' : 
                    client.status === 'customer' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {client.status === 'lead' ? '潜在客户' : 
                     client.status === 'prospect' ? '意向客户' : 
                     client.status === 'customer' ? '正式客户' : 
                     '不活跃'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{client.email}</div>
                  <div className="text-sm text-gray-500">{client.phone || '未提供'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {client.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.lastContact}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {client.projects.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/crm/clients/${client.id}`} className="text-indigo-600 hover:text-indigo-900">
                    详情
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 销售漏斗 */}
      <section className="mt-16 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">销售漏斗</h2>
        <div className="relative h-64 max-w-3xl mx-auto">
          {/* 漏斗图形 */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-blue-500 rounded-t-lg flex items-center justify-center">
            <span className="text-white font-medium">潜在客户 ({clients.filter(c => c.status === 'lead').length})</span>
          </div>
          <div className="absolute top-16 left-8 right-8 h-16 bg-yellow-500 flex items-center justify-center">
            <span className="text-white font-medium">意向客户 ({clients.filter(c => c.status === 'prospect').length})</span>
          </div>
          <div className="absolute top-32 left-16 right-16 h-16 bg-green-500 flex items-center justify-center">
            <span className="text-white font-medium">正式客户 ({clients.filter(c => c.status === 'customer').length})</span>
          </div>
          <div className="absolute top-48 left-24 right-24 h-16 bg-purple-500 rounded-b-lg flex items-center justify-center">
            <span className="text-white font-medium">忠诚客户 ({Math.floor(clients.filter(c => c.status === 'customer').length * 0.6)})</span>
          </div>
        </div>
      </section>

      {/* 客户服务与工单系统 */}
      <section className="mt-16 mb-12">
        <h2 className="text-2xl font-bold mb-6">客户服务与工单系统</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">待处理工单</h3>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">3</span>
            </div>
            <ul className="space-y-3">
              <li className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">设计修改请求</span>
                  <span className="text-xs text-gray-500">2小时前</span>
                </div>
                <p className="text-sm text-gray-600">客户要求修改Logo颜色方案</p>
              </li>
              <li className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">文件格式问题</span>
                  <span className="text-xs text-gray-500">5小时前</span>
                </div>
                <p className="text-sm text-gray-600">客户无法打开发送的设计文件</p>
              </li>
              <li className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">项目进度咨询</span>
                  <span className="text-xs text-gray-500">昨天</span>
                </div>
                <p className="text-sm text-gray-600">客户询问项目当前进度</p>
              </li>
            </ul>
            <button className="mt-4 text-indigo-600 text-sm font-medium">查看全部</button>
          </div>
          
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">处理中工单</h3>
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">2</span>
            </div>
            <ul className="space-y-3">
              <li className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">合同条款咨询</span>
                  <span className="text-xs text-gray-500">1天前</span>
                </div>
                <p className="text-sm text-gray-600">客户对知识产权条款有疑问</p>
              </li>
              <li className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">额外需求评估</span>
                  <span className="text-xs text-gray-500">2天前</span>
                </div>
                <p className="text-sm text-gray-600">客户提出新的功能需求，需要评估</p>
              </li>
            </ul>
            <button className="mt-4 text-indigo-600 text-sm font-medium">查看全部</button>
          </div>
          
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">已解决工单</h3>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">12</span>
            </div>
            <ul className="space-y-3">
              <li className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">发票请求</span>
                  <span className="text-xs text-gray-500">3天前</span>
                </div>
                <p className="text-sm text-gray-600">已提供电子发票</p>
              </li>
              <li className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">源文件请求</span>
                  <span className="text-xs text-gray-500">5天前</span>
                </div>
                <p className="text-sm text-gray-600">已发送设计源文件</p>
              </li>
              <li className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">技术支持</span>
                  <span className="text-xs text-gray-500">1周前</span>
                </div>
                <p className="text-sm text-gray-600">解决了客户的技术问题</p>
              </li>
            </ul>
            <button className="mt-4 text-indigo-600 text-sm font-medium">查看全部</button>
          </div>
        </div>
      </section>

      {/* 客户关系维护策略 */}
      <section className="mt-16 mb-12">
        <h2 className="text-2xl font-bold mb-6">客户关系维护策略</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">定期跟进计划</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">新客户跟进</p>
                  <p className="text-sm text-gray-600">首次合作后7天内进行满意度回访</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">常规客户维护</p>
                  <p className="text-sm text-gray-600">每月发送行业资讯和设计趋势简报</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">重要客户关怀</p>
                  <p className="text-sm text-gray-600">季度业务回顾会议，了解需求变化</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">流失客户挽回</p>
                  <p className="text-sm text-gray-600">针对3个月未合作客户提供专属优惠</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">客户忠诚度计划</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">客户生日/节日关怀</p>
                  <p className="text-sm text-gray-600">重要节日发送电子贺卡或小礼品</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">长期合作优惠</p>
                  <p className="text-sm text-gray-600">连续合作满1年的客户享受服务费9折优惠</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">客户专属活动</p>
                  <p className="text-sm text-gray-600">邀请重要客户参加行业研讨会和设计分享会</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium">推荐奖励计划</p>
                  <p className="text-sm text-gray-600">成功推荐新客户可获得服务抵用券</p>
                </div>
              </li>
            </ul>
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
          
          <Link href="/orders" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">订单管理</h3>
            <p className="text-gray-600 mb-4">管理您的订单，跟踪进度，查看详情</p>
            <span className="text-indigo-600 font-medium flex items-center">
              前往订单管理
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
