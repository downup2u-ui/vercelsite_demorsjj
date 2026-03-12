"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Removed: import DashboardLayout from '@/components/dashboard/DashboardLayout';

// 模拟设计师请求数据
const designerRequests = [
  { 
    id: 'DR001', 
    designer: {
      name: '周艺术',
      avatar: '/images/avatars/designer1.svg',
      rating: 4.8,
      projectsCount: 37
    },
    requestType: '商标注册咨询',
    title: '新品牌标识商标保护问题咨询',
    description: '我为客户设计了一个新的品牌标识，需要了解如何进行商标注册以保护设计成果，以及在注册前需要准备哪些材料。',
    attachments: 2,
    status: '待处理',
    priority: '高',
    submittedAt: '2024-07-10 14:30'
  },
  { 
    id: 'DR002', 
    designer: {
      name: '林创意',
      avatar: '/images/avatars/designer2.svg',
      rating: 4.6,
      projectsCount: 24
    },
    requestType: '版权登记',
    title: '海报系列作品版权登记',
    description: '我创作了一系列文化海报作品，希望能够为这些作品办理版权登记手续。有一些关于作品类型分类和集体登记的问题需要咨询。',
    attachments: 5,
    status: '处理中',
    priority: '中',
    submittedAt: '2024-07-09 10:15'
  },
  { 
    id: 'DR003', 
    designer: {
      name: '陈数字',
      avatar: '/images/avatars/designer3.svg',
      rating: 4.9,
      projectsCount: 52
    },
    requestType: '设计侵权分析',
    title: '关于网站UI设计相似度分析',
    description: '发现一个网站的UI设计与我之前设计的作品有很大相似度，希望能对比分析确认是否构成侵权，并获取侵权处理建议。',
    attachments: 8,
    status: '已回复',
    priority: '高',
    submittedAt: '2024-07-08 16:45'
  },
  { 
    id: 'DR004', 
    designer: {
      name: '吴动效',
      avatar: '/images/avatars/designer4.svg',
      rating: 4.7,
      projectsCount: 19
    },
    requestType: 'IP授权咨询',
    title: '动效设计IP授权模式咨询',
    description: '我设计了一套动效图标库，现在有其他设计师希望使用，需要了解如何建立合适的IP授权模式，以及如何制定合理的授权费用。',
    attachments: 1,
    status: '待处理',
    priority: '中',
    submittedAt: '2024-07-07 09:30'
  },
  { 
    id: 'DR005', 
    designer: {
      name: '黄界面',
      avatar: '/images/avatars/designer5.svg',
      rating: 4.5,
      projectsCount: 28
    },
    requestType: '专利申请咨询',
    title: '交互设计方法专利可行性',
    description: '我开发了一种新的用户界面交互方法，想了解该方法是否可以申请为发明专利或实用新型专利，以及申请流程和需要提供的材料。',
    attachments: 3,
    status: '已回复',
    priority: '低',
    submittedAt: '2024-07-06 14:20'
  },
  { 
    id: 'DR006', 
    designer: {
      name: '刘设计',
      avatar: '/images/avatars/designer6.svg',
      rating: 4.4,
      projectsCount: 15
    },
    requestType: '商标检索',
    title: '新Logo商标近似检索',
    description: '为一家启动公司设计了新的Logo，需要进行商标近似检索，避免潜在的商标侵权风险。希望能提供专业的检索报告。',
    attachments: 1,
    status: '处理中',
    priority: '高',
    submittedAt: '2024-07-05 11:10'
  },
];

export default function IntellectualPropertyDesignerRequestsPage() {
  const professionName = "知识产权服务 (Intellectual Property Services)";
  // const pageTitle = "设计师协作请求 (知识产权)"; // Handled by group layout
  const welcomeMessage = "管理和处理来自设计师的知识产权相关服务请求。";

  const [filter, setFilter] = useState('all');
  const [requestType, setRequestType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  
  // 过滤数据
  const filteredRequests = designerRequests.filter(request => {
    // 状态筛选
    if (filter !== 'all' && request.status !== filter) return false;
    
    // 请求类型筛选
    if (requestType !== 'all' && request.requestType !== requestType) return false;
    
    // 搜索筛选
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        request.title.toLowerCase().includes(searchLower) ||
        request.designer.name.toLowerCase().includes(searchLower) ||
        request.description.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  // 获取选中请求详情
  const selectedRequestDetails = selectedRequest 
    ? designerRequests.find(r => r.id === selectedRequest) 
    : null;
  
  // 获取所有请求类型（用于筛选下拉菜单）
  const requestTypes = Array.from(new Set(designerRequests.map(r => r.requestType)));
  
  // 状态标签样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case '待处理':
        return 'bg-yellow-100 text-yellow-800';
      case '处理中':
        return 'bg-blue-100 text-blue-800';
      case '已回复':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // 优先级标签样式
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case '高':
        return 'bg-red-100 text-red-800';
      case '中':
        return 'bg-orange-100 text-orange-800';
      case '低':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="mb-6">
        {/* Removed: pageTitle, professionName, welcomeMessage - now handled by layout or directly in content */}
        {/* Welcome message and profession name can be rendered here if needed, or as part of a page header section */}
        <h2 className="text-2xl font-semibold text-gray-800">{professionName} - 设计师协作请求</h2>
        <p className="text-gray-500 mt-1">{welcomeMessage}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：请求列表和筛选器 */}
        <div className="lg:col-span-1 space-y-6">
          {/* 筛选工具 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索请求..."
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
                <label className="block text-sm font-medium text-gray-700 mb-1">状态筛选</label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${filter === 'all' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilter('all')}
                  >
                    全部
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${filter === '待处理' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilter('待处理')}
                  >
                    待处理
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${filter === '处理中' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilter('处理中')}
                  >
                    处理中
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${filter === '已回复' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilter('已回复')}
                  >
                    已回复
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">请求类型</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                >
                  <option value="all">全部类型</option>
                  {requestTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* 请求列表 */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">请求列表</h3>
              <span className="text-sm text-gray-500">
                {filteredRequests.length} 个请求
              </span>
            </div>
            
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <div 
                    key={request.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedRequest === request.id ? 'bg-indigo-50' : ''}`}
                    onClick={() => setSelectedRequest(request.id)}
                  >
                    <div className="flex items-start mb-2">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                        {/* 头像占位 */}
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          {request.designer.avatar ? (
                            <Image src={request.designer.avatar} alt={request.designer.name} width={40} height={40} />
                          ) : (
                            request.designer.name.charAt(0)
                          )}
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-900">{request.designer.name}</span>
                          <span className={`inline-flex px-2 py-0.5 text-xs rounded-full ${getStatusStyle(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{request.requestType}</p>
                      </div>
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{request.title}</h4>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">{request.description}</p>
                    <div className="mt-2 flex justify-between text-xs text-gray-400">
                      <span>提交于 {request.submittedAt}</span>
                      {request.attachments > 0 && (
                        <span className="flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          {request.attachments}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  未找到匹配的请求
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 右侧：请求详情 */}
        <div className="lg:col-span-2">
          {selectedRequestDetails ? (
            <div className="bg-white rounded-lg shadow">
              {/* 请求标题和操作栏 */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedRequestDetails.title}</h2>
                    <div className="mt-1 flex items-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(selectedRequestDetails.status)}`}>
                        {selectedRequestDetails.status}
                      </span>
                      <span className="mx-2">•</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityStyle(selectedRequestDetails.priority)}`}>
                        优先级：{selectedRequestDetails.priority}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="text-sm text-gray-500">{selectedRequestDetails.requestType}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm">
                      {selectedRequestDetails.status === '已回复' ? '查看回复' : '回复请求'}
                    </button>
                    
                    {selectedRequestDetails.status === '待处理' && (
                      <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                        标记为处理中
                      </button>
                    )}
                    
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* 设计师信息 */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    {/* 头像占位 */}
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      {selectedRequestDetails.designer.avatar ? (
                        <Image src={selectedRequestDetails.designer.avatar} alt={selectedRequestDetails.designer.name} width={48} height={48} />
                      ) : (
                        selectedRequestDetails.designer.name.charAt(0)
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{selectedRequestDetails.designer.name}</h3>
                    <div className="mt-1 flex items-center">
                      <div className="flex items-center text-amber-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-sm text-gray-700">{selectedRequestDetails.designer.rating}</span>
                      </div>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-sm text-gray-500">已完成 {selectedRequestDetails.designer.projectsCount} 个项目</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 请求详情 */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-base font-medium text-gray-900 mb-4">请求详情</h3>
                <p className="text-gray-700">{selectedRequestDetails.description}</p>
                
                {/* 提交时间 */}
                <div className="mt-4 text-sm text-gray-500">
                  提交时间：{selectedRequestDetails.submittedAt}
                </div>
              </div>
              
              {/* 附件区域 */}
              {selectedRequestDetails.attachments > 0 && (
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-base font-medium text-gray-900 mb-4">附件 ({selectedRequestDetails.attachments})</h3>
                  <div className="space-y-3">
                    {/* 示例附件 */}
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-900">设计说明文档.pdf</span>
                          <span className="text-sm text-gray-500">3.2 MB</span>
                        </div>
                        <p className="text-xs text-gray-500">上传于 {selectedRequestDetails.submittedAt}</p>
                      </div>
                      <button className="ml-4 text-indigo-600 hover:text-indigo-800">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                    
                    {selectedRequestDetails.attachments > 1 && (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium text-gray-900">设计作品图片.jpg</span>
                            <span className="text-sm text-gray-500">1.8 MB</span>
                          </div>
                          <p className="text-xs text-gray-500">上传于 {selectedRequestDetails.submittedAt}</p>
                        </div>
                        <button className="ml-4 text-indigo-600 hover:text-indigo-800">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* 回复区域 */}
              <div className="p-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">
                  {selectedRequestDetails.status === '已回复' ? '您的回复' : '添加回复'}
                </h3>
                
                {selectedRequestDetails.status === '已回复' ? (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">感谢您的咨询。关于您的商标注册问题，我们建议您首先进行商标查询，确认该标识是否与现有商标冲突。按照程序，您需要准备以下材料：</p>
                    <ol className="list-decimal list-inside mt-2 space-y-1 text-gray-700">
                      <li>商标图样（清晰的JPG格式，建议300DPI以上）</li>
                      <li>申请人身份证明文件</li>
                      <li>商标使用声明</li>
                      <li>拟注册的商品/服务类别说明</li>
                    </ol>
                    <p className="mt-2 text-gray-700">如有需要，我们可以安排时间进行一对一咨询，为您提供更详细的指导。</p>
                    <div className="mt-4 text-sm text-gray-500">回复于 2024-07-11 09:23</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <textarea
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="输入您的回复..."
                    ></textarea>
                    
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-sm text-gray-700">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        添加附件
                      </button>
                      
                      <button className="flex items-center text-sm text-gray-700">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        预约咨询
                      </button>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                        保存为草稿
                      </button>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                        发送回复
                      </button>
                    </div>
                  </div>
                )}
              </div>
          </div>
        ) : (
            <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center text-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">选择请求查看详情</h3>
              <p className="mt-1 text-gray-500 max-w-md">
                从左侧列表选择一个设计师的协作请求查看详细信息并回复。
              </p>
              <button
                onClick={() => {setFilter('all'); setRequestType('all'); setSearchTerm('');}}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                查看所有请求
              </button>
          </div>
        )}
        </div>
      </div>
    </>
  );
} 