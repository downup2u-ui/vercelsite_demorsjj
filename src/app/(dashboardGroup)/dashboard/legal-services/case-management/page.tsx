"use client";

import { useState } from 'react';
import Link from 'next/link';

// 模拟案件数据
const casesData = [
  {
    id: 'CASE001',
    title: '张三设计工作室商标侵权案',
    clientName: '张三设计工作室',
    clientId: 'CP001',
    type: '知识产权纠纷',
    status: '进行中',
    priority: '高',
    assignedTo: '李律师',
    openDate: '2024-06-15',
    lastUpdate: '2024-07-18',
    nextHearing: '2024-08-05',
    description: '客户发现其设计商标被某公司使用，要求提起商标侵权诉讼。初步调查显示侵权行为确实存在，已完成证据收集和诉状准备。'
  },
  {
    id: 'CASE002',
    title: '李四设计服务合同争议',
    clientName: '李四',
    clientId: 'CP002',
    type: '合同纠纷',
    status: '进行中',
    priority: '中',
    assignedTo: '王律师',
    openDate: '2024-06-20',
    lastUpdate: '2024-07-16',
    nextHearing: '2024-08-10',
    description: '客户作为自由设计师提供服务后未收到全额款项，对方以成果质量问题拒付剩余费用。现已尝试调解未果，准备提起诉讼。'
  },
  {
    id: 'CASE003',
    title: '钱七知识产权授权协议',
    clientName: '钱七',
    clientId: 'CP007',
    type: '非诉讼业务',
    status: '准备中',
    priority: '中',
    assignedTo: '张律师',
    openDate: '2024-07-10',
    lastUpdate: '2024-07-15',
    nextHearing: null,
    description: '客户需要为其设计作品制定知识产权授权协议，规范合作伙伴使用其设计的权限范围、期限和费用等事项。'
  }
];

export default function CaseManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [typeFilter, setTypeFilter] = useState('全部');
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  
  // 获取案件类型和状态列表
  const caseTypes = Array.from(new Set(casesData.map(item => item.type)));
  const statusOptions = Array.from(new Set(casesData.map(item => item.status)));
  
  // 筛选案件
  const filteredCases = casesData.filter(caseItem => {
    // 类型筛选
    if (typeFilter !== '全部' && caseItem.type !== typeFilter) return false;
    
    // 状态筛选
    if (statusFilter !== '全部' && caseItem.status !== statusFilter) return false;
    
    // 搜索筛选
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        caseItem.title.toLowerCase().includes(searchLower) ||
        caseItem.clientName.toLowerCase().includes(searchLower) ||
        caseItem.description.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  // 获取选中案件详情
  const selectedCaseDetails = selectedCase ? 
    casesData.find(c => c.id === selectedCase) : null;
  
  // 状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case '进行中':
        return 'bg-blue-100 text-blue-800';
      case '准备中':
        return 'bg-yellow-100 text-yellow-800';
      case '已完成':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // 优先级样式
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case '高':
        return 'bg-red-100 text-red-800';
      case '中':
        return 'bg-yellow-100 text-yellow-800';
      case '低':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">案件管理</h1>
            <p className="mt-1 text-gray-500">管理法律案件、查看进展和更新状态</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/dashboard/legal-services" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
              返回仪表盘
            </Link>
            <Link href="#" className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
              创建新案件
            </Link>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：筛选和案件列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">筛选条件</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">搜索案件</label>
                <input
                  type="text"
                  placeholder="输入案件标题、客户名..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">案件类型</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="全部">全部类型</option>
                  {caseTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">案件状态</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="全部">全部状态</option>
                  {statusOptions.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">案件列表</h2>
              <span className="text-sm text-gray-500">{filteredCases.length} 项</span>
            </div>
            
            <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
              {filteredCases.length > 0 ? (
                filteredCases.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${selectedCase === caseItem.id ? 'bg-indigo-50' : ''}`}
                    onClick={() => setSelectedCase(caseItem.id)}
                  >
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">{caseItem.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(caseItem.status)}`}>
                        {caseItem.status}
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-500 mb-2">
                      <span>{caseItem.type}</span>
                      <span className="mx-2">•</span>
                      <span>更新: {caseItem.lastUpdate}</span>
                    </div>
                    
                    <div className="text-xs text-gray-500 flex items-center">
                      <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {caseItem.clientName}
                      <span className="mx-2">•</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityStyle(caseItem.priority)}`}>
                        {caseItem.priority}优先
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  未找到匹配的案件
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 右侧：案件详情 */}
        <div className="lg:col-span-2">
          {selectedCaseDetails ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-medium text-gray-900">{selectedCaseDetails.title}</h2>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">案件ID: {selectedCaseDetails.id}</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-sm text-gray-500">类型: {selectedCaseDetails.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(selectedCaseDetails.status)}`}>
                      {selectedCaseDetails.status}
                    </span>
                    <div className="relative">
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">案件信息</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">状态:</span>
                          <span className={`text-sm font-medium ${getStatusStyle(selectedCaseDetails.status)}`}>
                            {selectedCaseDetails.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">优先级:</span>
                          <span className={`text-sm font-medium ${getPriorityStyle(selectedCaseDetails.priority)}`}>
                            {selectedCaseDetails.priority}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">开案日期:</span>
                          <span className="text-sm text-gray-900">{selectedCaseDetails.openDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">最后更新:</span>
                          <span className="text-sm text-gray-900">{selectedCaseDetails.lastUpdate}</span>
                        </div>
                        {selectedCaseDetails.nextHearing && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">下次开庭:</span>
                            <span className="text-sm text-gray-900">{selectedCaseDetails.nextHearing}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">相关方信息</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">客户:</span>
                          <Link 
                            href={`/dashboard/legal-services/client-profiles?client=${selectedCaseDetails.clientId}`}
                            className="text-sm text-indigo-600 hover:text-indigo-800"
                          >
                            {selectedCaseDetails.clientName}
                          </Link>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">负责律师:</span>
                          <span className="text-sm text-gray-900">{selectedCaseDetails.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Link 
                        href={`/dashboard/legal-services/documents?case=${selectedCaseDetails.id}`}
                        className="w-full flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
                      >
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        查看案件文件
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">案件描述</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{selectedCaseDetails.description}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 flex justify-between">
                  <div className="flex space-x-2">
                    <Link 
                      href="#"
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50"
                    >
                      添加进展
                    </Link>
                    <Link 
                      href="#"
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50"
                    >
                      更新状态
                    </Link>
                  </div>
                  <Link 
                    href="#"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
                  >
                    编辑案件
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">选择一个案件</h3>
              <p className="mt-1 text-sm text-gray-500">从左侧列表中选择一个案件以查看详情</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 