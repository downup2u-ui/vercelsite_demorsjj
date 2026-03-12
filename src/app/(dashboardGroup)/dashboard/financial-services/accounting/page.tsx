"use client";

import Link from 'next/link';
import { useState } from 'react';

// 模拟账务数据
const accountingData = [
  { id: 'AC001', date: '2024-07-15', type: '收入', category: '设计服务费', amount: 15000, status: '已记账' },
  { id: 'AC002', date: '2024-07-17', type: '支出', category: '办公用品', amount: 2500, status: '已记账' },
  { id: 'AC003', date: '2024-07-18', type: '收入', category: '咨询服务费', amount: 8000, status: '已记账' },
  { id: 'AC004', date: '2024-07-20', type: '支出', category: '软件订阅', amount: 1200, status: '待审核' },
  { id: 'AC005', date: '2024-07-22', type: '收入', category: '项目尾款', amount: 20000, status: '待审核' },
  { id: 'AC006', date: '2024-07-25', type: '支出', category: '员工薪酬', amount: 35000, status: '待审核' },
  { id: 'AC007', date: '2024-07-28', type: '收入', category: '设计服务费', amount: 12000, status: '草稿' },
  { id: 'AC008', date: '2024-07-30', type: '支出', category: '市场推广', amount: 5000, status: '草稿' },
];

export default function AccountingPage() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // 过滤数据
  const filteredData = accountingData.filter(item => {
    // 状态过滤
    if (filter !== 'all' && item.status !== filter) return false;
    
    // 搜索过滤
    if (searchTerm && !Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )) return false;
    
    return true;
  });
  
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">账务处理</h1>
        <p className="mt-1 text-gray-500">管理日常账目、发票与凭证</p>
      </div>
      
      {/* 操作按钮和筛选控件 */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex space-x-2 mb-2 sm:mb-0">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              新增账务
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              批量导入
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              导出账单
            </button>
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索账务记录..."
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
        </div>
        
        {/* 状态过滤按钮 */}
        <div className="mt-4 flex space-x-2">
          <button 
            className={`px-3 py-1.5 rounded-md ${filter === 'all' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setFilter('all')}
          >
            全部
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md ${filter === '已记账' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setFilter('已记账')}
          >
            已记账
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md ${filter === '待审核' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setFilter('待审核')}
          >
            待审核
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md ${filter === '草稿' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setFilter('草稿')}
          >
            草稿
          </button>
        </div>
      </div>
      
      {/* 账务表格 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  账务编号
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  日期
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  类型
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  分类
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  金额 (¥)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                        item.type === '收入' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.type === '收入' ? '+' : '-'}
                      {item.amount.toLocaleString('zh-CN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                        item.status === '已记账' ? 'bg-green-100 text-green-800' : 
                        item.status === '待审核' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={`/dashboard/financial-services/accounting/${item.id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                        查看
                      </Link>
                      <button className="text-gray-600 hover:text-gray-900 mr-3">
                        编辑
                      </button>
                      {item.status !== '已记账' && (
                        <button className="text-red-600 hover:text-red-900">
                          删除
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    未找到匹配的账务记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* 分页 */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            显示 {filteredData.length} 条记录，共 {accountingData.length} 条
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
      </div>
    </>
  );
} 