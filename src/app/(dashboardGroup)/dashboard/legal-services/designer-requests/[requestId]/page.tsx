"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// 模拟设计师请求数据
const designerRequestsData = [
  {
    id: 'DR001',
    designer: {
      id: 'D001',
      name: '张三',
      avatar: '/avatars/designer1.png',
      company: '张三设计工作室',
      email: 'zhangsan@example.com',
      phone: '13800138001',
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
    details: {
      caseBackground: '设计师张三即将与某科技公司签署设计服务合同，涉及UI设计和移动应用界面开发。合同中涉及知识产权转让、服务范围和报酬支付等条款，设计师希望确保合同条款公平合理，特别是在知识产权方面获得适当保护。',
      clientContext: '张三设计工作室是一家小型设计工作室，主要从事UI/UX设计工作。过去曾有因合同条款模糊导致的纠纷经历，因此希望在签署新合同前获得专业法律意见。',
      legalAnalysis: '合同初步审核发现几个需要修改的问题：\n1. 知识产权条款过于宽泛，建议限定使用范围\n2. 付款条件缺乏明确时间表和逾期赔偿规定\n3. 保密义务期限不合理，建议缩短至3年\n4. 需增加设计师署名权条款',
      nextSteps: '1. 完成合同修改建议文档\n2. 与设计师沟通修改意见\n3. 协助修改合同条款\n4. 审核最终版本',
    }
  },
  {
    id: 'DR002',
    designer: {
      id: 'D002',
      name: '李四',
      avatar: '/avatars/designer2.png',
      company: '个人设计师',
      email: 'lisi@example.com',
      phone: '13900139002',
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
      { name: '侵权投诉函_最终版.pdf', size: '1.5 MB', uploadedAt: '2024-07-13' },
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
    details: {
      caseBackground: '设计师李四在2023年为自己的设计业务创作了一个独特的LOGO，并将其用于个人网站和业务宣传。近期发现某电子商务公司在其产品包装和网站上使用了与其LOGO高度相似的标识，未经授权也未支付任何费用。',
      clientContext: '李四是一名独立设计师，LOGO是其品牌标识的重要组成部分。此次侵权行为对其商业形象造成了负面影响，同时担忧其他设计作品也可能被盗用。',
      legalAnalysis: '经审核所提供的证据，确认:\n1. 李四对该LOGO拥有完整著作权，有原始设计文件和时间戳证明\n2. 侵权公司的使用行为未经授权，构成明显侵权\n3. 根据著作权法，李四有权要求停止侵权、消除影响并获得赔偿\n4. 建议通过正式投诉函先行交涉，保留后续诉讼可能',
      nextSteps: '✅ 投诉函已发送至侵权方\n✅ 已建议客户保存所有往来记录\n- 等待对方回应，若7个工作日内无回应或拒绝配合，可考虑提起诉讼\n- 准备可能的诉讼材料',
      outcome: '投诉函已发出，侵权方表示将在一周内撤下侵权内容并协商赔偿事宜。',
    }
  },
];

// 状态样式函数
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

// 优先级样式函数
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

// 服务类型样式函数
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

export default function DesignerRequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.requestId as string;
  const [activeTab, setActiveTab] = useState<'details' | 'files' | 'comments'>('details');
  const [newComment, setNewComment] = useState('');
  
  // 获取请求详情
  const requestDetails = designerRequestsData.find(r => r.id === requestId);
  
  // 如果请求不存在
  if (!requestDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white p-8 rounded-lg shadow">
        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">找不到请求信息</h3>
        <p className="mt-1 text-gray-500">
          无法找到ID为 "{requestId}" 的设计师请求记录
        </p>
        <button
          onClick={() => router.push('/dashboard/legal-services/designer-requests')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          返回请求列表
        </button>
      </div>
    );
  }
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center">
            <Link
              href="/dashboard/legal-services/designer-requests"
              className="text-indigo-600 hover:text-indigo-800 mr-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{requestDetails.title}</h1>
          </div>
          <p className="mt-1 text-gray-500">请求ID: {requestDetails.id}</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-sm">
            负责人: {requestDetails.assignedTo}
          </div>
          <span className={`px-3 py-1 rounded-md text-sm font-medium ${getStatusStyle(requestDetails.status)}`}>
            {requestDetails.status}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧: 请求信息和设计师信息 */}
        <div className="lg:col-span-1 space-y-6">
          {/* 请求信息卡片 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">请求信息</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">服务类型</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getServiceTypeStyle(requestDetails.serviceType)}`}>
                    {requestDetails.serviceType}
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">优先级</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityStyle(requestDetails.priority)}`}>
                    {requestDetails.priority}
                  </span>
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-gray-500 block">提交日期</span>
                    <span className="text-sm text-gray-900">{requestDetails.submittedAt}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">最后更新</span>
                    <span className="text-sm text-gray-900">{requestDetails.lastUpdated}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">截止日期</span>
                    <span className="text-sm text-gray-900">{requestDetails.deadline}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">剩余时间</span>
                    <span className={`text-sm ${
                      new Date(requestDetails.deadline) < new Date() 
                        ? 'text-red-600' 
                        : 'text-gray-900'
                    }`}>
                      {new Date(requestDetails.deadline) > new Date() 
                        ? `${Math.ceil((new Date(requestDetails.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} 天` 
                        : '已过期'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 设计师信息卡片 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">设计师信息</h2>
            
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-indigo-800 font-medium text-lg">
                  {requestDetails.designer.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{requestDetails.designer.name}</h3>
                <p className="text-sm text-gray-500">{requestDetails.designer.company}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-700">{requestDetails.designer.email}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm text-gray-700">{requestDetails.designer.phone}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm">
                查看设计师档案
              </button>
            </div>
          </div>
          
          {/* 操作按钮组 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">操作</h2>
            
            <div className="space-y-3">
              {requestDetails.status !== '已完成' && (
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm flex items-center justify-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  标记为已完成
                </button>
              )}
              
              {requestDetails.status === '待分配' && (
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm flex items-center justify-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  分配律师
                </button>
              )}
              
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm flex items-center justify-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                编辑请求
              </button>
              
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm flex items-center justify-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                调整截止日期
              </button>
            </div>
          </div>
        </div>
        
        {/* 右侧: 请求详情、文件和评论的选项卡 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 请求描述 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">请求描述</h2>
            <p className="text-gray-700">{requestDetails.description}</p>
          </div>
          
          {/* 选项卡导航 */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'details'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('details')}
                >
                  详细信息
                </button>
                <button
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'files'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('files')}
                >
                  文件 ({requestDetails.files.length})
                </button>
                <button
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'comments'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('comments')}
                >
                  沟通记录 ({requestDetails.comments.length})
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'details' && requestDetails.details && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-2">案件背景</h3>
                    <p className="text-gray-700">{requestDetails.details.caseBackground}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-2">客户情况</h3>
                    <p className="text-gray-700">{requestDetails.details.clientContext}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-2">法律分析</h3>
                    <div className="whitespace-pre-line text-gray-700">{requestDetails.details.legalAnalysis}</div>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-2">后续步骤</h3>
                    <div className="whitespace-pre-line text-gray-700">{requestDetails.details.nextSteps}</div>
                  </div>
                  
                  {requestDetails.details.outcome && (
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-2">处理结果</h3>
                      <p className="text-gray-700">{requestDetails.details.outcome}</p>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'files' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-medium text-gray-900">附件列表</h3>
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      上传文件
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {requestDetails.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <svg className="h-8 w-8 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{file.name}</div>
                            <div className="text-xs text-gray-500">{file.size} • 上传于 {file.uploadedAt}</div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          <button className="text-indigo-600 hover:text-indigo-800 text-sm">查看</button>
                          <button className="text-indigo-600 hover:text-indigo-800 text-sm">下载</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'comments' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-base font-medium text-gray-900 mb-4">沟通记录</h3>
                    
                    <div className="space-y-4">
                      {requestDetails.comments.map((comment) => (
                        <div 
                          key={comment.id} 
                          className={`p-4 rounded-lg ${comment.isLawyer ? 'bg-indigo-50 ml-6' : 'bg-gray-50 mr-6'}`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-medium text-gray-900">
                              {comment.author}
                              {comment.isLawyer && (
                                <span className="ml-2 text-xs font-normal text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded">律师</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">{comment.time}</div>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-base font-medium text-gray-900 mb-3">添加回复</h3>
                    
                    <textarea
                      placeholder="输入回复内容..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      rows={4}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <button className="text-gray-500 flex items-center text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        添加附件
                      </button>
                      
                      <button
                        className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors ${!newComment.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!newComment.trim()}
                      >
                        发送回复
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 