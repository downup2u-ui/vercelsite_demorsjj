import React from 'react';
import Placeholder from '../Placeholder';

interface FinancialCollaborationPlaceholderProps {
  requestCount?: number; // 显示的财务服务请求数量
  withFilters?: boolean; // 是否显示筛选选项
}

/**
 * 财务协作占位符组件
 * 用于展示财务服务请求、财务分析工具和协作功能
 */
const FinancialCollaborationPlaceholder: React.FC<FinancialCollaborationPlaceholderProps> = ({
  requestCount = 3,
  withFilters = true,
}) => {
  return (
    <Placeholder 
      title="[财务协作功能占位符]"
      description="例如：财务服务请求、预算管理、成本分析工具等。"
      height="min-h-[600px]"
      className="p-0 overflow-hidden"
    >
      <div className="p-6">
        {/* 顶部卡片指标 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">活跃财务请求</div>
                <div className="text-2xl font-semibold text-gray-800">{Math.floor(Math.random() * 5) + 2}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-green-500 font-medium flex items-center">
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                1
              </span>
              <span className="ml-2">本周新增</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">本月项目支出</div>
                <div className="text-2xl font-semibold text-gray-800">¥{(Math.random() * 20000 + 10000).toFixed(2)}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-amber-500 font-medium flex items-center">
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
                8.2%
              </span>
              <span className="ml-2">较上月</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">预算余额</div>
                <div className="text-2xl font-semibold text-gray-800">¥{(Math.random() * 50000 + 30000).toFixed(2)}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-green-500 font-medium flex items-center">
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12.5%
              </span>
              <span className="ml-2">季度对比</span>
            </div>
          </div>
        </div>
        
        {/* 筛选选项 */}
        {withFilters && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-4 md:justify-between items-center">
              <div className="flex space-x-1">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-l-lg text-sm">所有请求</button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm">处理中</button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm">已完成</button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-r-lg text-sm">待审核</button>
              </div>
              
              <div className="flex space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    placeholder="搜索请求..." 
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
                    disabled
                  />
                </div>
                
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 flex items-center">
                  <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  筛选
                </button>
                
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm flex items-center">
                  <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  发起新请求
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* 财务请求列表 */}
        <div className="mb-8">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">请求ID/类型</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">关联项目</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">提交日期</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">财务顾问</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">优先级</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.from({ length: requestCount }).map((_, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-1">
                          <div className="text-sm font-medium text-gray-900">
                            FR{String(1001 + index).padStart(4, '0')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {index === 0 ? '项目预算编制' : index === 1 ? '税务咨询' : '成本分析'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {index === 0 ? '城市公共艺术装置' : index === 1 ? '2024年度税务规划' : '夏季限定系列成本分析'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index === 0 ? '2024/08/01' : 
                       index === 1 ? '2024/07/25' : 
                       '2024/07/15'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${index === 0 ? 'bg-yellow-100 text-yellow-800' : 
                          index === 1 ? 'bg-green-100 text-green-800' : 
                          'bg-blue-100 text-blue-800'}
                      `}>
                        {index === 0 ? '审核中' : index === 1 ? '已完成' : '处理中'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index === 0 ? '李会计' : 
                       index === 1 ? '张财务' : 
                       '王顾问'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${index === 0 ? 'bg-red-100 text-red-800' : 
                          index === 1 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}
                      `}>
                        {index === 0 ? '紧急' : index === 1 ? '中等' : '一般'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900">查看</button>
                        {index === 0 && (
                          <button className="text-green-600 hover:text-green-900">更新</button>
                        )}
                        {index === 1 && (
                          <button className="text-gray-600 hover:text-gray-900">档案</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* 财务工具与分析 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 预算使用情况 */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-4">预算使用情况</h3>
            
            {/* 环形进度图（占位符） */}
            <div className="flex justify-center mb-4">
              <div className="relative h-36 w-36">
                <svg className="h-full w-full" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="3"></circle>
                  <circle 
                    cx="18" cy="18" r="16" 
                    fill="none" 
                    stroke="#4f46e5" 
                    strokeWidth="3" 
                    strokeDasharray="100" 
                    strokeDashoffset="35" 
                    strokeLinecap="round">
                  </circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">65%</span>
                </div>
              </div>
            </div>
            
            {/* 预算详情 */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">总预算</span>
                  <span className="font-medium text-gray-800">¥100,000.00</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">已使用</span>
                  <span className="font-medium text-gray-800">¥65,423.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">剩余</span>
                  <span className="font-medium text-gray-800">¥34,576.50</span>
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-100">
                <div className="text-sm text-gray-500">当前预算周期：2024年第三季度</div>
                <div className="text-sm text-gray-500">剩余天数：45天</div>
              </div>
            </div>
          </div>
          
          {/* 最近交易 */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-4">最近财务活动</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mt-1">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">材料费支出</p>
                  <p className="text-xs text-gray-500">¥8,642.25 • 3天前</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">预算追加</p>
                  <p className="text-xs text-gray-500">¥15,000.00 • 1周前</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mt-1">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">设计服务费</p>
                  <p className="text-xs text-gray-500">¥12,500.00 • 2周前</p>
                </div>
              </div>
              
              <button disabled className="w-full mt-2 text-sm text-indigo-600 hover:text-indigo-800">查看全部</button>
            </div>
          </div>
        </div>
      </div>
    </Placeholder>
  );
};

export default FinancialCollaborationPlaceholder; 