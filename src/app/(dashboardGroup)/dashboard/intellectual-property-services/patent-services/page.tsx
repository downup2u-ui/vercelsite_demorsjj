"use client";

import { useState } from 'react';
import Link from 'next/link';

// 模拟专利数据
const patentData = [
  { 
    id: 'PT001', 
    title: '一种基于人工智能的图像识别系统', 
    type: '发明专利', 
    inventors: ['张明', '李伟'],
    applicationNumber: 'CN123456789A',
    applicationDate: '2023-05-18',
    status: '已授权',
    grantDate: '2024-06-10',
    expiryDate: '2043-05-18'
  },
  { 
    id: 'PT002', 
    title: '一种节能环保材料的制备方法', 
    type: '发明专利', 
    inventors: ['王芳', '刘海'],
    applicationNumber: 'CN234567890A',
    applicationDate: '2023-07-22',
    status: '实质审查',
    grantDate: null,
    expiryDate: null
  },
  { 
    id: 'PT003', 
    title: '一种便携式多功能设计工具', 
    type: '实用新型', 
    inventors: ['赵小红'],
    applicationNumber: 'CN345678901U',
    applicationDate: '2023-09-15',
    status: '已授权',
    grantDate: '2024-03-20',
    expiryDate: '2033-09-15'
  },
  { 
    id: 'PT004', 
    title: '智能设计软件界面交互装置', 
    type: '外观设计', 
    inventors: ['孙明亮', '钱佳'],
    applicationNumber: 'CN456789012D',
    applicationDate: '2023-11-28',
    status: '形式审查',
    grantDate: null,
    expiryDate: null
  },
  { 
    id: 'PT005', 
    title: '一种用于可视化数据分析的方法及系统', 
    type: '发明专利', 
    inventors: ['周学文', '吴研'],
    applicationNumber: 'CN567890123A',
    applicationDate: '2024-01-12',
    status: '形式审查',
    grantDate: null,
    expiryDate: null
  },
  { 
    id: 'PT006', 
    title: '一种多媒体内容归档装置', 
    type: '实用新型', 
    inventors: ['郑工'],
    applicationNumber: 'CN678901234U',
    applicationDate: '2024-02-25',
    status: '公布',
    grantDate: null,
    expiryDate: null
  },
  { 
    id: 'PT007', 
    title: '交互式设计平台用户界面', 
    type: '外观设计', 
    inventors: ['林特', '何海伦'],
    applicationNumber: 'CN789012345D',
    applicationDate: '2024-04-05',
    status: '实质审查',
    grantDate: null,
    expiryDate: null
  },
];

// 模拟最近活动
const recentActivities = [
  { id: 1, patent: 'PT001', date: '2024-07-05', action: '年费缴纳', description: '已成功缴纳第1年年费' },
  { id: 2, patent: 'PT002', date: '2024-07-02', action: '官方通知', description: '收到实质审查阶段的审查意见通知书' },
  { id: 3, patent: 'PT003', date: '2024-06-28', action: '证书发放', description: '专利证书已邮寄，请注意查收' },
  { id: 4, patent: 'PT004', date: '2024-06-25', action: '状态更新', description: '专利申请进入形式审查阶段' },
  { id: 5, patent: 'PT007', date: '2024-06-22', action: '文件提交', description: '已提交补充材料' },
];

export default function PatentServicesPage() {
  const [filter, setFilter] = useState('all');
  const [patentType, setPatentType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatent, setSelectedPatent] = useState<string | null>(null);
  
  // 过滤数据
  const filteredData = patentData.filter(patent => {
    // 状态筛选
    if (filter !== 'all' && patent.status !== filter) return false;
    
    // 专利类型筛选
    if (patentType !== 'all' && patent.type !== patentType) return false;
    
    // 搜索筛选
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        patent.title.toLowerCase().includes(searchLower) ||
        patent.applicationNumber.toLowerCase().includes(searchLower) ||
        patent.inventors.some(inv => inv.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });
  
  // 获取选中专利详情
  const selectedPatentDetails = selectedPatent 
    ? patentData.find(p => p.id === selectedPatent) 
    : null;
  
  // 获取选中专利相关活动
  const patentActivities = selectedPatent
    ? recentActivities.filter(activity => activity.patent === selectedPatent)
    : [];
  
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">专利服务</h1>
        <p className="mt-1 text-gray-500">管理、申请和追踪您的专利资产</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧列表和过滤器 */}
        <div className="lg:col-span-1 space-y-6">
          {/* 操作和筛选控件 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                新增专利申请
              </button>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索专利..."
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">专利类型</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={patentType}
                  onChange={(e) => setPatentType(e.target.value)}
                >
                  <option value="all">全部类型</option>
                  <option value="发明专利">发明专利</option>
                  <option value="实用新型">实用新型</option>
                  <option value="外观设计">外观设计</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">申请状态</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${filter === 'all' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilter('all')}
                  >
                    全部
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${filter === '已授权' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilter('已授权')}
                  >
                    已授权
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${filter === '实质审查' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilter('实质审查')}
                  >
                    实质审查
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${filter === '形式审查' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilter('形式审查')}
                  >
                    形式审查
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${filter === '公布' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilter('公布')}
                  >
                    公布
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 专利列表 */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">专利列表</h3>
            </div>
            
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {filteredData.length > 0 ? (
                filteredData.map((patent) => (
                  <div 
                    key={patent.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedPatent === patent.id ? 'bg-indigo-50' : ''}`}
                    onClick={() => setSelectedPatent(patent.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900 line-clamp-2">{patent.title}</h4>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ml-2 ${
                        patent.status === '已授权' ? 'bg-green-100 text-green-800' : 
                        patent.status === '实质审查' ? 'bg-blue-100 text-blue-800' : 
                        patent.status === '形式审查' ? 'bg-purple-100 text-purple-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {patent.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <span className="mr-2">{patent.type}</span>
                      <span>•</span>
                      <span className="ml-2">申请号: {patent.applicationNumber}</span>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      申请日期: {patent.applicationDate}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  未找到匹配的专利记录
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 右侧详情 */}
        <div className="lg:col-span-2">
          {selectedPatentDetails ? (
            <div className="space-y-6">
              {/* 专利基本信息 */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedPatentDetails.title}</h2>
                    <div className="flex items-center">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                        selectedPatentDetails.status === '已授权' ? 'bg-green-100 text-green-800' : 
                        selectedPatentDetails.status === '实质审查' ? 'bg-blue-100 text-blue-800' : 
                        selectedPatentDetails.status === '形式审查' ? 'bg-purple-100 text-purple-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedPatentDetails.status}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">{selectedPatentDetails.type}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      href={`/dashboard/intellectual-property-services/patent-services/${selectedPatentDetails.id}`}
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm"
                    >
                      详细信息
                    </Link>
                    
                    {selectedPatentDetails.status === '已授权' ? (
                      <button className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
                        年费管理
                      </button>
                    ) : (
                      <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm">
                        修改资料
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">申请信息</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">申请号:</span>
                        <span className="text-sm text-gray-900">{selectedPatentDetails.applicationNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">申请日期:</span>
                        <span className="text-sm text-gray-900">{selectedPatentDetails.applicationDate}</span>
                      </div>
                      {selectedPatentDetails.grantDate && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">授权日期:</span>
                          <span className="text-sm text-gray-900">{selectedPatentDetails.grantDate}</span>
                        </div>
                      )}
                      {selectedPatentDetails.expiryDate && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">有效期至:</span>
                          <span className="text-sm text-gray-900">{selectedPatentDetails.expiryDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">发明人</h3>
                    <div className="bg-gray-50 p-2 rounded-md">
                      {selectedPatentDetails.inventors.map((inventor, index) => (
                        <div key={index} className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-sm mr-2 mb-2">
                          {inventor}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {selectedPatentDetails.status === '已授权' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span className="text-green-600 text-sm font-medium">年费状态: 已缴纳第1年年费，下次付款日期: 2025-05-18</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* 历史活动 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">活动历史</h3>
                
                {patentActivities.length > 0 ? (
                  <div className="flow-root">
                    <ul className="ml-6 -mb-8">
                      {patentActivities.map((activity, index) => (
                        <li key={activity.id}>
                          <div className="relative pb-8">
                            {index !== patentActivities.length - 1 ? (
                              <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                            ) : null}
                            <div className="relative flex items-start space-x-3">
                              <div className="relative">
                                <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center ring-8 ring-white">
                                  <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {activity.action}
                                  </div>
                                  <p className="mt-0.5 text-sm text-gray-500">
                                    {activity.date}
                                  </p>
                                </div>
                                <div className="mt-2 text-sm text-gray-700">
                                  <p>{activity.description}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">暂无活动记录</div>
                )}
              </div>
              
              {/* 相关文档 - 示例 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">相关文档</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <svg className="h-6 w-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">专利申请书</span>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                      下载
                    </button>
                  </div>
                  
                  {selectedPatentDetails.status === '已授权' && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <svg className="h-6 w-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">专利证书</span>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                        下载
                      </button>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <svg className="h-6 w-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">说明书附图</span>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                      下载
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center text-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">选择专利查看详情</h3>
              <p className="mt-1 text-gray-500 max-w-md">
                从左侧列表选择一个专利申请查看其详细信息、状态和相关文档。
              </p>
              <button
                onClick={() => {setFilter('all'); setPatentType('all'); setSearchTerm('');}}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                查看所有专利
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 