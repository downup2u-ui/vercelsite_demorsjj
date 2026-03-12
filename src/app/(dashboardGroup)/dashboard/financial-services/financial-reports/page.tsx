"use client";

import { useState } from 'react';
import Link from 'next/link';

// 模拟报表数据
const reportsData = [
  { 
    id: 'FR001', 
    clientName: '晨曦设计工作室', 
    reportType: '月度财务报表', 
    period: '2024年6月', 
    generatedDate: '2024-07-05', 
    status: '已生成',
    keyMetrics: {
      revenue: 85000,
      expenses: 62000,
      profit: 23000,
      profitMargin: 27.06
    }
  },
  { 
    id: 'FR002', 
    clientName: '创新数字媒体有限公司', 
    reportType: '季度财务报表', 
    period: '2024年第二季度', 
    generatedDate: '2024-07-12', 
    status: '已生成',
    keyMetrics: {
      revenue: 345000,
      expenses: 278000,
      profit: 67000,
      profitMargin: 19.42
    }
  },
  { 
    id: 'FR003', 
    clientName: '光华设计咨询有限公司', 
    reportType: '半年度财务报表', 
    period: '2024年上半年', 
    generatedDate: '2024-07-20', 
    status: '进行中',
    keyMetrics: null
  },
  { 
    id: 'FR004', 
    clientName: '远景创意工作室', 
    reportType: '月度财务报表', 
    period: '2024年6月', 
    generatedDate: null, 
    status: '待生成',
    keyMetrics: null
  },
  { 
    id: 'FR005', 
    clientName: '中艺设计集团', 
    reportType: '季度财务报表', 
    period: '2024年第二季度', 
    generatedDate: null, 
    status: '待生成',
    keyMetrics: null
  },
];

// 模拟趋势数据
const trendData = {
  revenue: [65000, 68000, 72000, 75000, 82000, 85000],
  expenses: [52000, 54000, 58000, 56000, 60000, 62000],
  profit: [13000, 14000, 14000, 19000, 22000, 23000],
  months: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06']
};

export default function FinancialReportsPage() {
  const [filter, setFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  
  // 筛选报表数据
  const filteredReports = reportsData.filter(report => {
    if (filter === 'all') return true;
    return report.status === filter;
  });
  
  // 获取选中的报表
  const reportDetail = selectedReport 
    ? reportsData.find(report => report.id === selectedReport) 
    : null;
  
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">财务报表</h1>
        <p className="mt-1 text-gray-500">生成、查看和分析财务报表</p>
      </div>
      
      {/* 操作和筛选控件 */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              新建报表
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              批量生成
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              导出数据
            </button>
          </div>
          
          <div className="flex space-x-2">
            <select 
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">全部状态</option>
              <option value="已生成">已生成</option>
              <option value="进行中">进行中</option>
              <option value="待生成">待生成</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：报表列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">报表列表</h3>
            </div>
            
            <div className="divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <div 
                  key={report.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedReport === report.id ? 'bg-indigo-50' : ''}`}
                  onClick={() => setSelectedReport(report.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{report.clientName}</h4>
                      <p className="text-sm text-gray-600">{report.reportType} - {report.period}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                      report.status === '已生成' ? 'bg-green-100 text-green-800' : 
                      report.status === '进行中' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {report.generatedDate ? `生成于: ${report.generatedDate}` : '尚未生成'}
                  </div>
                </div>
              ))}
              
              {filteredReports.length === 0 && (
                <div className="px-4 py-8 text-center text-gray-500">
                  没有找到符合条件的报表
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 右侧：报表详情和图表 */}
        <div className="lg:col-span-2">
          {selectedReport ? (
            <div className="space-y-6">
              {/* 报表基本信息 */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {reportDetail?.clientName} - {reportDetail?.reportType}
                    </h2>
                    <p className="text-gray-600 mt-1">报表周期: {reportDetail?.period}</p>
                    {reportDetail?.generatedDate && (
                      <p className="text-gray-600 mt-1">生成日期: {reportDetail?.generatedDate}</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    {reportDetail?.status === '已生成' && (
                      <>
                        <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          查看完整报告
                        </button>
                        <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          下载PDF
                        </button>
                      </>
                    )}
                    
                    {reportDetail?.status === '待生成' && (
                      <button className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                        生成报表
                      </button>
                    )}
                    
                    {reportDetail?.status === '进行中' && (
                      <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                        查看处理进度
                      </button>
                    )}
                  </div>
                </div>
                
                {/* 关键指标 */}
                {reportDetail?.keyMetrics && (
                  <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <div className="text-sm font-medium text-indigo-800">总收入</div>
                      <div className="mt-1 text-2xl font-bold text-indigo-900">
                        ¥{reportDetail.keyMetrics.revenue.toLocaleString('zh-CN')}
                      </div>
                    </div>
                    
                    <div className="bg-red-50 rounded-lg p-4">
                      <div className="text-sm font-medium text-red-800">总支出</div>
                      <div className="mt-1 text-2xl font-bold text-red-900">
                        ¥{reportDetail.keyMetrics.expenses.toLocaleString('zh-CN')}
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-sm font-medium text-green-800">净利润</div>
                      <div className="mt-1 text-2xl font-bold text-green-900">
                        ¥{reportDetail.keyMetrics.profit.toLocaleString('zh-CN')}
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <div className="text-sm font-medium text-yellow-800">利润率</div>
                      <div className="mt-1 text-2xl font-bold text-yellow-900">
                        {reportDetail.keyMetrics.profitMargin.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* 图表区域 - 这里只是静态展示，实际项目中应使用Chart.js等库绘制 */}
              {reportDetail?.status === '已生成' && (
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900">财务趋势分析</h3>
                    <p className="text-sm text-gray-500">展示近6个月的收入、支出和利润趋势</p>
                  </div>
                  
                  <div className="h-64 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <p>这里将显示收入、支出和利润的趋势图表</p>
                      <p className="text-sm mt-1">实际项目中集成Chart.js或其他图表库</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">收入明细</h4>
                      <div className="h-36 flex items-center justify-center text-gray-500 text-sm">
                        收入来源分布图表
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">支出明细</h4>
                      <div className="h-36 flex items-center justify-center text-gray-500 text-sm">
                        支出类别分布图表
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">现金流</h4>
                      <div className="h-36 flex items-center justify-center text-gray-500 text-sm">
                        现金流变化图表
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* 报表待生成或进行中时的提示信息 */}
              {reportDetail?.status !== '已生成' && (
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-center py-8">
                    {reportDetail?.status === '待生成' ? (
                      <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">报表尚未生成</h3>
                        <p className="mt-1 text-gray-500">请点击"生成报表"按钮开始生成流程</p>
                        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                          生成报表
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">报表生成中</h3>
                        <p className="mt-1 text-gray-500">系统正在处理数据，请稍候...</p>
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full w-3/4"></div>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">预计剩余时间: 2分钟</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* 财务分析 */}
              {reportDetail?.status === '已生成' && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">财务分析与建议</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-base font-medium text-gray-900">收入趋势正向</h4>
                        <p className="text-gray-600">相比上期增长 11.5%，建议继续扩大目前表现良好的业务线。</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-base font-medium text-gray-900">支出增长较快</h4>
                        <p className="text-gray-600">支出增长率 (15.3%) 高于收入增长率，需关注成本控制。</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-base font-medium text-gray-900">现金流管理</h4>
                        <p className="text-gray-600">建议优化应收账款周期，目前平均收款周期为45天，超出行业平均。</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center text-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">选择报表查看详情</h3>
              <p className="mt-1 text-gray-500 max-w-md">
                从左侧列表选择一个报表查看其详细信息、指标和分析。
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 