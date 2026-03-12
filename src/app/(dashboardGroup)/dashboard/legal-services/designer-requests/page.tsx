"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 模拟设计师请求数据
const designerRequestsData = [
  {
    id: 'DR001',
    designer: {
      id: 'D001',
      name: '张三',
      avatar: '/avatars/designer1.png',
      company: '张三设计工作室',
    },
    title: '设计服务合同审核',
    description: '需要专业律师审核与客户签署的设计服务合同，确保知识产权条款合理且保护创作者权益。',
    serviceType: '合同审核',
    priority: '高',
    status: '处理中',
    submittedAt: '2024-07-15',
    lastUpdated: '2024-07-16',
    assignedTo: '李律师',
    deadline: '2024-07-20',
    files: [
      { name: '设计服务合同草稿.docx', size: '235 KB', uploadedAt: '2024-07-15' },
      { name: '项目需求说明.pdf', size: '1.2 MB', uploadedAt: '2024-07-15' },
    ],
    comments: [
      { 
        id: 'C001', 
        author: '李律师', 
        content: '已收到请求，正在审核合同内容，预计明天完成初步审核。', 
        time: '2024-07-16 09:30',
        isLawyer: true
      },
      { 
        id: 'C002', 
        author: '张三', 
        content: '谢谢，请特别关注知识产权转让条款，希望保留部分二次开发权利。',
        time: '2024-07-16 10:15',
        isLawyer: false
      },
    ],
  },
  {
    id: 'DR002',
    designer: {
      id: 'D002',
      name: '李四',
      avatar: '/avatars/designer2.png',
      company: '个人设计师',
    },
    title: '侵权投诉函起草',
    description: '发现我设计的LOGO被某公司未经授权使用，需要起草正式投诉函，要求停止侵权并赔偿损失。',
    serviceType: '侵权处理',
    priority: '高',
    status: '已完成',
    submittedAt: '2024-07-10',
    lastUpdated: '2024-07-13',
    assignedTo: '王律师',
    deadline: '2024-07-15',
    files: [
      { name: '原创设计证明.pdf', size: '3.5 MB', uploadedAt: '2024-07-10' },
      { name: '侵权使用证据.zip', size: '8.2 MB', uploadedAt: '2024-07-10' },
    ],
    comments: [
      { 
        id: 'C003', 
        author: '王律师', 
        content: '已审核所有证据材料，侵权事实清晰。投诉函草稿已完成，请查看并确认。', 
        time: '2024-07-12 14:20',
        isLawyer: true
      },
      { 
        id: 'C004', 
        author: '李四', 
        content: '收到，已查看投诉函，内容无误，感谢专业支持。',
        time: '2024-07-13 09:45',
        isLawyer: false
      },
      { 
        id: 'C005', 
        author: '王律师', 
        content: '投诉函已定稿并发送。建议您保留所有往来邮件记录，以备后续可能的法律程序使用。',
        time: '2024-07-13 11:30',
        isLawyer: true
      },
    ],
  },
  {
    id: 'DR003',
    designer: {
      id: 'D003',
      name: '王五',
      avatar: '/avatars/designer3.png',
      company: '创意无限设计',
    },
    title: '商业合作协议咨询',
    description: '收到一家公司的合作邀请，希望了解合作协议中的风险点和需要注意的法律问题。',
    serviceType: '法律咨询',
    priority: '中',
    status: '等待回复',
    submittedAt: '2024-07-18',
    lastUpdated: '2024-07-18',
    assignedTo: '赵律师',
    deadline: '2024-07-25',
    files: [
      { name: '合作意向书.pdf', size: '420 KB', uploadedAt: '2024-07-18' },
    ],
    comments: [
      { 
        id: 'C006', 
        author: '赵律师', 
        content: '已收到您的咨询请求，正在审阅相关文件。有几个问题需要了解：1.您是以个人还是公司名义合作？2.预期合作周期有多长？', 
        time: '2024-07-18 15:40',
        isLawyer: true
      },
    ],
  },
  {
    id: 'DR004',
    designer: {
      id: 'D004',
      name: '赵六',
      avatar: '/avatars/designer4.png',
      company: '视觉工坊',
    },
    title: 'NDA保密协议审核',
    description: '客户要求签署保密协议才能获取项目详情，需要专业审核确保不会限制未来的工作机会。',
    serviceType: '合同审核',
    priority: '中',
    status: '处理中',
    submittedAt: '2024-07-14',
    lastUpdated: '2024-07-17',
    assignedTo: '陈律师',
    deadline: '2024-07-22',
    files: [
      { name: '保密协议模板.docx', size: '180 KB', uploadedAt: '2024-07-14' },
    ],
    comments: [
      { 
        id: 'C007', 
        author: '陈律师', 
        content: '已完成初步审核，发现该NDA竞业限制条款过于宽泛，建议修改。详细意见已在文档中标注。', 
        time: '2024-07-17 10:20',
        isLawyer: true
      },
      { 
        id: 'C008', 
        author: '赵六', 
        content: '谢谢，请问竞业限制期限最长可以接受多久？行业范围如何界定更合理？',
        time: '2024-07-17 11:05',
        isLawyer: false
      },
    ],
  },
  {
    id: 'DR005',
    designer: {
      id: 'D005',
      name: '钱七',
      avatar: '/avatars/designer5.png',
      company: '钱七创意设计',
    },
    title: '著作权登记咨询',
    description: '完成了一系列插画作品，希望了解如何进行著作权登记以及登记后的权益保护问题。',
    serviceType: '知识产权',
    priority: '低',
    status: '已完成',
    submittedAt: '2024-07-05',
    lastUpdated: '2024-07-09',
    assignedTo: '张律师',
    deadline: '2024-07-12',
    files: [
      { name: '作品样例.pdf', size: '5.6 MB', uploadedAt: '2024-07-05' },
    ],
    comments: [
      { 
        id: 'C009', 
        author: '张律师', 
        content: '已查看您的作品，建议您进行著作权登记。我已整理了登记流程指南和所需材料清单，请查收。', 
        time: '2024-07-07 16:30',
        isLawyer: true
      },
      { 
        id: 'C010', 
        author: '钱七', 
        content: '非常感谢详细的指导！请问登记完成后如何监测可能的侵权行为？',
        time: '2024-07-08 09:15',
        isLawyer: false
      },
      { 
        id: 'C011', 
        author: '张律师', 
        content: '关于侵权监测，我已准备了一份实用指南，包括线上监测工具和发现侵权后的应对策略。希望对您有所帮助。',
        time: '2024-07-09 10:40',
        isLawyer: true
      },
      { 
        id: 'C012', 
        author: '钱七', 
        content: '太全面了，正是我需要的！文档已收到并阅读，没有其他问题了。',
        time: '2024-07-09 14:20',
        isLawyer: false
      },
    ],
  },
  {
    id: 'DR006',
    designer: {
      id: 'D006',
      name: '孙八',
      avatar: '/avatars/designer6.png',
      company: '数字视觉工作室',
    },
    title: 'AI生成内容版权问题',
    description: '使用AI工具生成了部分设计元素，需要了解相关法律风险和在商业项目中使用的注意事项。',
    serviceType: '法律咨询',
    priority: '中',
    status: '待分配',
    submittedAt: '2024-07-19',
    lastUpdated: '2024-07-19',
    assignedTo: '未分配',
    deadline: '2024-07-26',
    files: [
      { name: 'AI生成作品示例.pdf', size: '4.3 MB', uploadedAt: '2024-07-19' },
      { name: '使用场景说明.docx', size: '325 KB', uploadedAt: '2024-07-19' },
    ],
    comments: [],
  },
];

export default function DesignerRequestsPage() {
  const [filter, setFilter] = useState('all');
  const [serviceType, setServiceType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'priority'>('newest');
  
  // 获取所有服务类型（用于筛选下拉菜单）
  const serviceTypes = Array.from(new Set(designerRequestsData.map(req => req.serviceType)));
  
  // 过滤和排序数据
  const filteredRequests = designerRequestsData.filter(request => {
    // 状态筛选
    if (filter !== 'all' && request.status !== filter) return false;
    
    // 服务类型筛选
    if (serviceType !== 'all' && request.serviceType !== serviceType) return false;
    
    // 搜索筛选
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        request.title.toLowerCase().includes(searchLower) ||
        request.description.toLowerCase().includes(searchLower) ||
        request.designer.name.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  }).sort((a, b) => {
    // 排序
    if (sortOrder === 'newest') {
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    } else if (sortOrder === 'oldest') {
      return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
    } else if (sortOrder === 'priority') {
      const priorityOrder = { '高': 0, '中': 1, '低': 2 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
    }
    return 0;
  });
  
  // 获取选中请求详情
  const selectedRequestDetails = selectedRequest
    ? designerRequestsData.find(r => r.id === selectedRequest)
    : null;
  
  // 状态标签样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case '待分配':
        return 'bg-yellow-100 text-yellow-800';
      case '处理中':
        return 'bg-blue-100 text-blue-800';
      case '等待回复':
        return 'bg-purple-100 text-purple-800';
      case '已完成':
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
  
  // 服务类型标签样式
  const getServiceTypeStyle = (type: string) => {
    switch (type) {
      case '合同审核':
        return 'bg-indigo-100 text-indigo-800';
      case '侵权处理':
        return 'bg-red-100 text-red-800';
      case '法律咨询':
        return 'bg-blue-100 text-blue-800';
      case '知识产权':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">设计师协作请求</h1>
        <p className="mt-1 text-gray-500">管理和处理来自设计师的法律服务协作请求</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：请求列表和筛选器 */}
        <div className="lg:col-span-1 space-y-6">
          {/* 操作和筛选控件 */}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">服务类型</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  <option value="all">全部类型</option>
                  {serviceTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">请求状态</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${filter === 'all' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilter('all')}
                  >
                    全部
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${filter === '待分配' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilter('待分配')}
                  >
                    待分配
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${filter === '处理中' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilter('处理中')}
                  >
                    处理中
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${filter === '等待回复' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilter('等待回复')}
                  >
                    等待回复
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${filter === '已完成' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setFilter('已完成')}
                  >
                    已完成
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">排序方式</label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${sortOrder === 'newest' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setSortOrder('newest')}
                  >
                    最新优先
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${sortOrder === 'oldest' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setSortOrder('oldest')}
                  >
                    最早优先
                  </button>
                  <button 
                    className={`px-3 py-1.5 rounded-md text-sm ${sortOrder === 'priority' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-600'}`}
                    onClick={() => setSortOrder('priority')}
                  >
                    优先级
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 请求列表 */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">请求列表</h3>
            </div>
            
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <div 
                    key={request.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedRequest === request.id ? 'bg-indigo-50' : ''}`}
                    onClick={() => setSelectedRequest(request.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900 line-clamp-1">{request.title}</h4>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ml-2 ${getStatusStyle(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>{request.designer.name}</span>
                      <span className="mx-1">•</span>
                      <span>{new Date(request.submittedAt).toLocaleDateString('zh-CN')}</span>
                    </div>
                    
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">{request.description}</p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className={`inline-flex px-2 py-0.5 rounded-full font-medium ${getServiceTypeStyle(request.serviceType)}`}>
                        {request.serviceType}
                      </span>
                      
                      <span className={`inline-flex px-2 py-0.5 rounded-full font-medium ${getPriorityStyle(request.priority)}`}>
                        {request.priority}优先级
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  未找到匹配的请求记录
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 右侧：请求详情 */}
        <div className="lg:col-span-2">
          {selectedRequestDetails ? (
            <div className="space-y-6">
              {/* 请求基本信息 */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedRequestDetails.title}</h2>
                    <div className="flex items-center flex-wrap gap-2">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(selectedRequestDetails.status)}`}>
                        {selectedRequestDetails.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getPriorityStyle(selectedRequestDetails.priority)}`}>
                        {selectedRequestDetails.priority}优先级
                      </span>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getServiceTypeStyle(selectedRequestDetails.serviceType)}`}>
                        {selectedRequestDetails.serviceType}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      href={`/dashboard/legal-services/designer-requests/${selectedRequestDetails.id}`}
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm"
                    >
                      详细页面
                      </Link>
                    
                    <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm">
                      更新状态
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{selectedRequestDetails.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">请求信息</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">请求ID:</span>
                        <span className="text-sm text-gray-900">{selectedRequestDetails.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">提交日期:</span>
                        <span className="text-sm text-gray-900">{selectedRequestDetails.submittedAt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">最后更新:</span>
                        <span className="text-sm text-gray-900">{selectedRequestDetails.lastUpdated}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">截止日期:</span>
                        <span className="text-sm text-gray-900">{selectedRequestDetails.deadline}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">处理信息</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">负责律师:</span>
                        <span className="text-sm text-gray-900">{selectedRequestDetails.assignedTo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">处理状态:</span>
                        <span className={`text-sm font-medium ${
                          selectedRequestDetails.status === '已完成' ? 'text-green-600' : 
                          selectedRequestDetails.status === '待分配' ? 'text-yellow-600' : 
                          'text-blue-600'
                        }`}>{selectedRequestDetails.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">剩余时间:</span>
                        <span className="text-sm text-gray-900">
                          {new Date(selectedRequestDetails.deadline) > new Date() 
                            ? `${Math.ceil((new Date(selectedRequestDetails.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} 天` 
                            : '已过期'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">相关文件</h3>
                  <div className="space-y-2">
                    {selectedRequestDetails.files.map((file, index) => (
                      <div key={index} className="flex justify-between items-center p-2 rounded bg-gray-50">
                        <div className="flex items-center">
                          <svg className="h-4 w-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm text-gray-700">{file.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">{file.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 沟通记录 */}
              {selectedRequestDetails.comments.length > 0 && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-base font-medium text-gray-900 mb-4">沟通记录</h3>
                  <div className="space-y-3">
                    {selectedRequestDetails.comments.map((comment) => (
                      <div 
                        key={comment.id}
                        className={`p-3 rounded-lg ${comment.isLawyer ? 'bg-indigo-50 ml-6' : 'bg-gray-50 mr-6'}`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-gray-900">
                            {comment.author}
                            {comment.isLawyer && (
                              <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded">律师</span>
                            )}
                          </span>
                          <span className="text-xs text-gray-500">{comment.time}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        ) : (
            <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center text-center h-[400px]">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">选择请求查看详情</h3>
              <p className="mt-1 text-gray-500 max-w-md">
                从左侧列表选择一个请求来查看详细信息、相关文件和沟通记录。
              </p>
              <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                新建请求
              </button>
          </div>
        )}
        </div>
      </div>
    </>
  );
} 