"use client";

import { useState } from 'react';
import Link from 'next/link';

// 模拟税务申报数据
const taxFilingData = [
  { id: 'TF001', clientName: '晨曦设计工作室', taxType: '增值税', period: '2024年第二季度', dueDate: '2024-07-15', status: '已申报', amount: 12500 },
  { id: 'TF002', clientName: '创新数字媒体有限公司', taxType: '企业所得税', period: '2024年上半年', dueDate: '2024-07-31', status: '待申报', amount: 35000 },
  { id: 'TF003', clientName: '光华设计咨询有限公司', taxType: '个人所得税', period: '2024年6月', dueDate: '2024-07-15', status: '已申报', amount: 8200 },
  { id: 'TF004', clientName: '远景创意工作室', taxType: '增值税', period: '2024年第二季度', dueDate: '2024-07-15', status: '已逾期', amount: 6800 },
  { id: 'TF005', clientName: '中艺设计集团', taxType: '企业所得税', period: '2024年上半年', dueDate: '2024-07-31', status: '待申报', amount: 42000 },
  { id: 'TF006', clientName: '新锐设计工作室', taxType: '个人所得税', period: '2024年6月', dueDate: '2024-07-15', status: '待申报', amount: 4500 },
];

// 模拟税务筹划建议
const taxPlanningAdvice = [
  { 
    id: 1, 
    title: '研发费用加计扣除', 
    description: '对符合条件的设计研发支出可享受175%加计扣除政策，减少企业所得税。',
    potentialSavings: '预计可节税约¥15,000',
    status: '待实施'
  },
  { 
    id: 2, 
    title: '小微企业优惠政策', 
    description: '符合条件的小型微利企业可享受减免企业所得税政策。',
    potentialSavings: '预计可节税约¥8,000',
    status: '已实施'
  },
  { 
    id: 3, 
    title: '增值税进项发票管理', 
    description: '优化增值税进项发票管理，确保所有可抵扣项目都已抵扣。',
    potentialSavings: '预计可节税约¥5,500',
    status: '进行中'
  },
  { 
    id: 4, 
    title: '员工福利税务优化', 
    description: '合理设置员工福利结构，降低整体税负成本。',
    potentialSavings: '预计可节税约¥12,000',
    status: '待评估'
  },
];

export default function TaxationPage() {
  const [activeTab, setActiveTab] = useState('filing'); // 'filing' or 'planning'
  const [filter, setFilter] = useState('all');
  
  // 过滤申报数据
  const filteredFilingData = taxFilingData.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });
  
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">税务管理</h1>
        <p className="mt-1 text-gray-500">税务申报、筹划与优化</p>
      </div>
      
      {/* 标签页切换 */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              className={`${
                activeTab === 'filing'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('filing')}
            >
              税务申报
            </button>
            <button
              className={`${
                activeTab === 'planning'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab('planning')}
            >
              税务筹划
            </button>
          </nav>
        </div>
      </div>
      
      {/* 税务申报内容 */}
      {activeTab === 'filing' && (
        <div className="space-y-6">
          {/* 操作和过滤器 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex space-x-2 mb-2 sm:mb-0">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                  新增申报
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                  申报日历
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                  导出记录
                </button>
              </div>
              
              <div className="flex space-x-2">
                <select 
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">全部状态</option>
                  <option value="待申报">待申报</option>
                  <option value="已申报">已申报</option>
                  <option value="已逾期">已逾期</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* 税务申报表格 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      申报编号
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      客户名称
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      税种
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      所属期间
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      截止日期
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      应纳税额
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
                  {filteredFilingData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.clientName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.taxType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.period}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ¥{item.amount.toLocaleString('zh-CN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                          item.status === '已申报' ? 'bg-green-100 text-green-800' : 
                          item.status === '待申报' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link href={`/dashboard/financial-services/taxation/${item.id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                          查看
                        </Link>
                        {item.status !== '已申报' && (
                          <button className="text-green-600 hover:text-green-900 mr-3">
                            申报
                          </button>
                        )}
                        <button className="text-gray-600 hover:text-gray-900">
                          编辑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* 分页 - 简化版 */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                显示 {filteredFilingData.length} 条记录，共 {taxFilingData.length} 条
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
        </div>
      )}
      
      {/* 税务筹划内容 */}
      {activeTab === 'planning' && (
        <div className="space-y-6">
          {/* 顶部操作按钮 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                  新增筹划方案
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                  自动分析
                </button>
              </div>
              
              <div>
                <button className="px-4 py-2 flex items-center text-indigo-600 hover:text-indigo-800">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  生成节税报告
                </button>
              </div>
            </div>
          </div>
          
          {/* 税务筹划建议卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {taxPlanningAdvice.map((advice) => (
              <div key={advice.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{advice.title}</h3>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                    advice.status === '已实施' ? 'bg-green-100 text-green-800' : 
                    advice.status === '进行中' ? 'bg-blue-100 text-blue-800' : 
                    advice.status === '待实施' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {advice.status}
                  </span>
                </div>
                
                <p className="mt-3 text-gray-600">{advice.description}</p>
                
                <div className="mt-4 flex items-center text-sm font-medium text-green-600">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {advice.potentialSavings}
                </div>
                
                <div className="mt-5 flex justify-end space-x-3">
                  <button className="px-3 py-1.5 text-sm text-indigo-600 hover:text-indigo-800">
                    详情
                  </button>
                  
                  {advice.status !== '已实施' && (
                    <button className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                      {advice.status === '进行中' ? '更新进度' : '开始实施'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* 底部建议区 */}
          <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-indigo-800">税务筹划建议</h3>
                <div className="mt-2 text-indigo-700">
                  <p>根据当前业务情况和最新税收政策，我们建议：</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>积极申请高新技术企业认定，可享受15%的优惠税率</li>
                    <li>合理利用小微企业普惠性税收减免政策</li>
                    <li>关注"十四五"规划中的产业支持政策和配套税收优惠</li>
                    <li>优化企业员工薪酬结构，降低整体税负</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 