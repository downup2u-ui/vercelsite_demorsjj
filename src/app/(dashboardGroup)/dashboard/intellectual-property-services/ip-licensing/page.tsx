"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 模拟IP授权与交易数据
const licensingData = [
  {
    id: 'LIC001',
    title: '品牌标识套件',
    type: '商标',
    licenseeType: '外部',
    licensee: '光影文化传媒有限公司',
    startDate: '2024-01-15',
    endDate: '2025-01-14',
    scope: '线上营销与宣传材料',
    status: '生效中',
    fee: {
      type: '固定费用',
      amount: 20000,
      currency: 'CNY',
      recurrence: '一次性'
    }
  },
  {
    id: 'LIC002',
    title: '界面互动组件库',
    type: '版权',
    licenseeType: '合作伙伴',
    licensee: '数字互动科技有限公司',
    startDate: '2023-11-10',
    endDate: '2024-11-09',
    scope: '软件产品集成',
    status: '生效中',
    fee: {
      type: '分成',
      amount: 8,
      currency: '%',
      recurrence: '季度结算'
    }
  },
  {
    id: 'LIC003',
    title: '用户界面交互设计专利',
    type: '专利',
    licenseeType: '外部',
    licensee: '未来创新科技有限公司',
    startDate: '2023-09-01',
    endDate: '2024-08-31',
    scope: '移动应用开发',
    status: '即将到期',
    fee: {
      type: '混合模式',
      amount: 30000,
      currency: 'CNY',
      recurrence: '首付+3%收益分成'
    }
  },
  {
    id: 'LIC004',
    title: '创意图形作品集',
    type: '版权',
    licenseeType: '内部',
    licensee: '市场营销部门',
    startDate: '2024-02-20',
    endDate: '2025-02-19',
    scope: '企业内部使用',
    status: '生效中',
    fee: {
      type: '内部授权',
      amount: 0,
      currency: 'CNY',
      recurrence: '无费用'
    }
  },
  {
    id: 'LIC005',
    title: '创新设计方法专利',
    type: '专利',
    licenseeType: '外部',
    licensee: '思维创新工作室',
    startDate: '2023-12-10',
    endDate: '2024-04-09',
    scope: '设计课程教学',
    status: '已到期',
    fee: {
      type: '固定费用',
      amount: 15000,
      currency: 'CNY',
      recurrence: '一次性'
    }
  },
  {
    id: 'LIC006',
    title: '数字艺术NFT系列',
    type: '版权',
    licenseeType: '平台',
    licensee: 'CryptoArt Gallery',
    startDate: '2024-03-15',
    endDate: '2025-03-14',
    scope: 'NFT销售与展示',
    status: '生效中',
    fee: {
      type: '分成',
      amount: 15,
      currency: '%',
      recurrence: '交易时'
    }
  },
];

// 模拟IP收益数据
const revenueData = [
  { month: '2024-01', licensing: 25000, sales: 5000, total: 30000 },
  { month: '2024-02', licensing: 22000, sales: 8000, total: 30000 },
  { month: '2024-03', licensing: 28000, sales: 7000, total: 35000 },
  { month: '2024-04', licensing: 30000, sales: 10000, total: 40000 },
  { month: '2024-05', licensing: 32000, sales: 12000, total: 44000 },
  { month: '2024-06', licensing: 35000, sales: 15000, total: 50000 },
];

export default function IPLicensingPage() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLicense, setSelectedLicense] = useState<string | null>(null);
  
  // 过滤数据
  const filteredData = licensingData.filter(item => {
    // 状态筛选
    if (filter !== 'all' && item.status !== filter) return false;
    
    // 搜索筛选
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchLower) ||
        item.licensee.toLowerCase().includes(searchLower) ||
        item.type.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  // 获取选中授权详情
  const licenseDetail = selectedLicense 
    ? licensingData.find(license => license.id === selectedLicense) 
    : null;
  
  // 统计数据
  const statsData = {
    total: licensingData.length,
    active: licensingData.filter(item => item.status === '生效中').length,
    expiring: licensingData.filter(item => item.status === '即将到期').length,
    expired: licensingData.filter(item => item.status === '已到期').length
  };
  
  // 返回状态对应的样式类
  const getStatusClass = (status: string) => {
    switch (status) {
      case '生效中':
        return 'bg-green-100 text-green-800';
      case '即将到期':
        return 'bg-yellow-100 text-yellow-800';
      case '已到期':
        return 'bg-red-100 text-red-800';
      case '草稿':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">IP交易与授权</h1>
        <p className="mt-1 text-gray-500">管理知识产权的授权、许可和交易</p>
      </div>
      
      {/* 概览统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">全部授权</p>
              <p className="text-xl font-bold text-gray-900">{statsData.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">生效中</p>
              <p className="text-xl font-bold text-gray-900">{statsData.active}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">即将到期</p>
              <p className="text-xl font-bold text-gray-900">{statsData.expiring}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">已到期</p>
              <p className="text-xl font-bold text-gray-900">{statsData.expired}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 收益概览 */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">IP收益概览</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 收益图表 - 这里只模拟，实际应使用Chart.js等库 */}
          <div className="lg:col-span-3 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="h-56 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p>此处将显示IP收益趋势图表</p>
                <p className="text-sm mt-1">实际项目中集成Chart.js或其他图表库</p>
              </div>
            </div>
          </div>
          
          {/* 最近月份收益 */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-medium text-gray-700 mb-3">最近收益（元）</h3>
            <div className="space-y-4">
              {revenueData.slice(-3).map((data, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{data.month}</span>
                    <span className="text-sm font-medium text-gray-900">¥{data.total.toLocaleString()}</span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">授权收入：</span>
                      <span className="text-green-600">¥{data.licensing.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">销售收入：</span>
                      <span className="text-blue-600">¥{data.sales.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="w-full py-2 text-center text-sm text-indigo-600 hover:text-indigo-800">
                查看完整财务报告
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：授权列表和筛选 */}
        <div className="lg:col-span-1 space-y-6">
          {/* 操作栏和搜索 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                创建新授权协议
              </button>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索授权..."
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              
              {/* 状态过滤按钮 */}
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">按状态筛选</div>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${filter === 'all' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilter('all')}
                  >
                    全部
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${filter === '生效中' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilter('生效中')}
                  >
                    生效中
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${filter === '即将到期' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilter('即将到期')}
                  >
                    即将到期
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${filter === '已到期' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilter('已到期')}
                  >
                    已到期
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 授权列表 */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">授权列表</h3>
            </div>
            
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {filteredData.length > 0 ? (
                filteredData.map((license) => (
                  <div 
                    key={license.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedLicense === license.id ? 'bg-indigo-50' : ''}`}
                    onClick={() => setSelectedLicense(license.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{license.title}</h4>
                        <p className="text-sm text-gray-500 mt-0.5">{license.type}</p>
                      </div>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(license.status)}`}>
                        {license.status}
                      </span>
                    </div>
                    
                    <div className="mt-2 text-sm text-gray-600">
                      <p>授权给: {license.licensee}</p>
                      <div className="mt-1 flex justify-between text-xs text-gray-500">
                        <span>
                          {license.startDate} - {license.endDate}
                        </span>
                        <span className="font-medium">
                          {license.fee.type === '固定费用' && `¥${license.fee.amount.toLocaleString()}`}
                          {license.fee.type === '分成' && `${license.fee.amount}%`}
                          {license.fee.type === '混合模式' && '混合模式'}
                          {license.fee.type === '内部授权' && '免费'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  未找到匹配的授权记录
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 右侧：授权详情 */}
        <div className="lg:col-span-2">
          {licenseDetail ? (
            <div className="bg-white rounded-lg shadow">
              {/* 授权标题和状态 */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{licenseDetail.title}</h2>
                    <div className="mt-1 flex items-center">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(licenseDetail.status)}`}>
                        {licenseDetail.status}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="text-sm text-gray-500">{licenseDetail.type}</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm text-gray-500">授权ID: {licenseDetail.id}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {licenseDetail.status === '已到期' ? (
                      <button className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
                        续签协议
                      </button>
                    ) : (
                      <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm">
                        查看协议文件
                      </button>
                    )}
                    
                    <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm">
                      编辑授权
                    </button>
                  </div>
                </div>
              </div>
              
              {/* 授权详情信息 */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-base font-medium text-gray-900 mb-4">授权详情</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">授权方</p>
                        <p className="text-base text-gray-900">您的公司/工作室</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500">被授权方</p>
                        <p className="text-base text-gray-900">{licenseDetail.licensee}</p>
                        <p className="text-sm text-gray-500">{licenseDetail.licenseeType}许可</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500">授权范围</p>
                        <p className="text-base text-gray-900">{licenseDetail.scope}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">授权期限</p>
                        <p className="text-base text-gray-900">{licenseDetail.startDate} 至 {licenseDetail.endDate}</p>
                        {licenseDetail.status === '即将到期' && (
                          <p className="text-sm text-yellow-600 font-medium">将在30天内到期</p>
                        )}
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500">授权费用</p>
                        <p className="text-base text-gray-900">
                          {licenseDetail.fee.type === '固定费用' && `¥${licenseDetail.fee.amount.toLocaleString()} (${licenseDetail.fee.recurrence})`}
                          {licenseDetail.fee.type === '分成' && `${licenseDetail.fee.amount}% (${licenseDetail.fee.recurrence})`}
                          {licenseDetail.fee.type === '混合模式' && `¥${licenseDetail.fee.amount.toLocaleString()} ${licenseDetail.fee.recurrence}`}
                          {licenseDetail.fee.type === '内部授权' && '免费内部授权'}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500">最近付款</p>
                        <p className="text-base text-gray-900">
                          {licenseDetail.fee.type === '内部授权' ? 
                            '不适用' : 
                            licenseDetail.status === '已到期' ? 
                              '2023-12-10' : 
                              '2024-05-15'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 授权收益履历 */}
              {licenseDetail.fee.type !== '内部授权' && licenseDetail.status !== '已到期' && (
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-base font-medium text-gray-900 mb-4">授权收益履历</h3>
                  
                  <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            结算周期
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            金额
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            状态
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            付款日期
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            2024年Q2
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {licenseDetail.fee.type === '固定费用' ? 
                              `¥${licenseDetail.fee.amount.toLocaleString()}` : 
                              licenseDetail.fee.type === '分成' ? 
                                '¥8,456' : 
                                '¥12,240'
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              已收款
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            2024-05-15
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            2024年Q1
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {licenseDetail.fee.type === '固定费用' ? 
                              `¥${licenseDetail.fee.amount.toLocaleString()}` : 
                              licenseDetail.fee.type === '分成' ? 
                                '¥7,230' : 
                                '¥10,890'
                            }
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              已收款
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            2024-02-12
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* 授权条款摘要 */}
              <div className="p-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">授权条款摘要</h3>
                
                <div className="space-y-4 text-sm text-gray-700">
                  <p>1. <span className="font-medium">授权范围：</span>被授权方可在{licenseDetail.scope}中使用授权IP，未经书面同意不得扩展使用范围。</p>
                  <p>2. <span className="font-medium">使用限制：</span>被授权方不得以任何方式修改、改编授权IP的核心元素，除非得到明确书面授权。</p>
                  <p>3. <span className="font-medium">地域限制：</span>仅限中国大陆地区使用（港澳台除外），国际使用需另行授权。</p>
                  <p>4. <span className="font-medium">保密条款：</span>被授权方需对授权IP的相关技术细节和商业信息保密，期限为协议终止后2年。</p>
                  <p>5. <span className="font-medium">终止条款：</span>任何一方严重违反协议条款，另一方有权提前30天书面通知终止协议。</p>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    查看完整协议
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center text-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">选择授权查看详情</h3>
              <p className="mt-1 text-gray-500 max-w-md">
                从左侧列表选择一个IP授权协议查看其详细信息、收益和条款。
              </p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => {setFilter('all'); setSearchTerm('');}}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  查看所有授权
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  创建新授权协议
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 