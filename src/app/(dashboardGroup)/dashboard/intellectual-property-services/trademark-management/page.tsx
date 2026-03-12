"use client";

import { useState } from 'react';
import Link from 'next/link';

// 模拟商标数据
const trademarkData = [
  { 
    id: 'TM001', 
    name: '创新科技', 
    logo: '/images/trademarks/tm1.svg', // 示例路径
    category: '第9类 - 电子产品', 
    applyDate: '2024-02-15', 
    regNumber: 'CN12345678',
    status: '已注册', 
    expiryDate: '2034-02-15'
  },
  { 
    id: 'TM002', 
    name: 'DesignFlow', 
    logo: '/images/trademarks/tm2.svg', 
    category: '第42类 - 设计服务', 
    applyDate: '2024-03-21', 
    regNumber: 'CN23456789',
    status: '已注册',
    expiryDate: '2034-03-21'
  },
  { 
    id: 'TM003', 
    name: '数字创意', 
    logo: '/images/trademarks/tm3.svg', 
    category: '第41类 - 教育培训', 
    applyDate: '2024-05-10', 
    regNumber: 'CN34567890',
    status: '已注册',
    expiryDate: '2034-05-10'
  },
  { 
    id: 'TM004', 
    name: 'ArtVision', 
    logo: '/images/trademarks/tm4.svg', 
    category: '第35类 - 广告业务', 
    applyDate: '2024-06-05', 
    regNumber: null,
    status: '审查中',
    expiryDate: null
  },
  { 
    id: 'TM005', 
    name: '未来空间', 
    logo: '/images/trademarks/tm5.svg', 
    category: '第42类 - 设计服务', 
    applyDate: '2024-06-18', 
    regNumber: null,
    status: '审查中',
    expiryDate: null
  },
  { 
    id: 'TM006', 
    name: 'EcoTech', 
    logo: '/images/trademarks/tm6.svg', 
    category: '第11类 - 环保设备', 
    applyDate: '2024-01-20', 
    regNumber: null,
    status: '驳回复审',
    expiryDate: null
  },
  { 
    id: 'TM007', 
    name: 'MediaX', 
    logo: '/images/trademarks/tm7.svg', 
    category: '第38类 - 通讯服务', 
    applyDate: '2023-12-10', 
    regNumber: null,
    status: '即将到期',
    expiryDate: '2024-12-10'
  },
];

export default function TrademarkManagementPage() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // 过滤数据
  const filteredData = trademarkData.filter(item => {
    if (filter !== 'all' && item.status !== filter) return false;
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower) ||
        (item.regNumber && item.regNumber.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });
  
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">商标管理</h1>
        <p className="mt-1 text-gray-500">管理、申请和监控您的商标资产</p>
      </div>
      
      {/* 操作栏 */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              新增商标申请
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              商标检索
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              批量导入
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="搜索商标..."
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
        </div>
        
        {/* 状态过滤按钮 */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button 
            className={`px-3 py-1.5 rounded-md ${filter === 'all' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setFilter('all')}
          >
            全部
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md ${filter === '已注册' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setFilter('已注册')}
          >
            已注册
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md ${filter === '审查中' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setFilter('审查中')}
          >
            审查中
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md ${filter === '驳回复审' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setFilter('驳回复审')}
          >
            驳回复审
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md ${filter === '即将到期' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setFilter('即将到期')}
          >
            即将到期
          </button>
        </div>
      </div>
      
      {/* 商标列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((trademark) => (
            <div key={trademark.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
                      {trademark.logo ? (
                        <img src={trademark.logo} alt={trademark.name} className="w-8 h-8" />
                      ) : (
                        <span className="text-xl">®</span>
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900">{trademark.name}</h3>
                      <p className="text-sm text-gray-500">{trademark.category}</p>
                    </div>
                  </div>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                    trademark.status === '已注册' ? 'bg-green-100 text-green-800' : 
                    trademark.status === '审查中' ? 'bg-blue-100 text-blue-800' : 
                    trademark.status === '驳回复审' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {trademark.status}
                  </span>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">申请日期</span>
                    <span className="text-gray-900">{trademark.applyDate}</span>
                  </div>
                  {trademark.regNumber && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">注册号</span>
                      <span className="text-gray-900">{trademark.regNumber}</span>
                    </div>
                  )}
                  {trademark.expiryDate && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">有效期至</span>
                      <span className={`${
                        trademark.status === '即将到期' ? 'text-yellow-600 font-medium' : 'text-gray-900'
                      }`}>
                        {trademark.expiryDate}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex justify-end space-x-2">
                  <Link href={`/dashboard/intellectual-property-services/trademark-management/${trademark.id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    详情
                  </Link>
                  {trademark.status === '已注册' && (
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                      续展
                    </button>
                  )}
                  {trademark.status === '驳回复审' && (
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      复审
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-lg shadow p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">未找到商标</h3>
            <p className="text-gray-500 mb-4">尝试调整搜索条件或清除筛选器</p>
            <button 
              onClick={() => {setFilter('all'); setSearchTerm('');}}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              清除所有筛选
            </button>
          </div>
        )}
      </div>
      
      {/* 分页控件 */}
      {filteredData.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow px-4 py-3 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            显示 {filteredData.length} 个商标，共 {trademarkData.length} 个
          </div>
          
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
              上一页
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-white bg-indigo-600 hover:bg-indigo-700">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
              下一页
            </button>
          </div>
        </div>
      )}
    </>
  );
} 