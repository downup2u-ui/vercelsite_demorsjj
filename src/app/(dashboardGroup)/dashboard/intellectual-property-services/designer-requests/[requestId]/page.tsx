"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// 模拟设计师请求数据 - 实际应该从API获取
const designerRequestsData = [
  { 
    id: 'DR001', 
    designer: {
      name: '周艺术',
      avatar: '/images/avatars/designer1.svg',
      rating: 4.8,
      projectsCount: 37,
      email: 'zhou.art@example.com',
      phone: '13901234567'
    },
    requestType: '商标注册咨询',
    title: '新品牌标识商标保护问题咨询',
    description: '我为客户设计了一个新的品牌标识，需要了解如何进行商标注册以保护设计成果，以及在注册前需要准备哪些材料。品牌主要面向科技领域，视觉形象包含了抽象的技术元素和创新概念的表达。我需要了解在第9类和第42类商标分类下的注册建议，以及是否需要同时在多个类别进行保护。',
    attachments: [
      { id: 'a1', name: '品牌标识设计.pdf', size: '3.2 MB', type: 'application/pdf', uploadedAt: '2024-07-10 14:30' },
      { id: 'a2', name: '设计说明文档.docx', size: '1.5 MB', type: 'application/docx', uploadedAt: '2024-07-10 14:30' }
    ],
    status: '待处理',
    priority: '高',
    submittedAt: '2024-07-10 14:30',
    history: [
      { 
        id: 'h1', 
        action: '创建请求', 
        timestamp: '2024-07-10 14:30',
        user: '周艺术',
        details: '提交了新的商标注册咨询请求'
      }
    ]
  },
  { 
    id: 'DR002', 
    designer: {
      name: '林创意',
      avatar: '/images/avatars/designer2.svg',
      rating: 4.6,
      projectsCount: 24,
      email: 'lin.creative@example.com',
      phone: '13987654321'
    },
    requestType: '版权登记',
    title: '海报系列作品版权登记',
    description: '我创作了一系列文化海报作品，希望能够为这些作品办理版权登记手续。有一些关于作品类型分类和集体登记的问题需要咨询。这是一套包含12幅作品的文化主题海报，我想了解是否可以作为一个系列作品进行集体登记，还是需要单独为每幅作品申请登记。同时，我也需要了解集体登记与单独登记的费用差异和保护范围的区别。',
    attachments: [
      { id: 'a3', name: '海报作品集预览.zip', size: '12.8 MB', type: 'application/zip', uploadedAt: '2024-07-09 10:15' },
      { id: 'a4', name: '创作说明.pdf', size: '2.4 MB', type: 'application/pdf', uploadedAt: '2024-07-09 10:15' },
      { id: 'a5', name: '作者身份证明.jpg', size: '1.1 MB', type: 'image/jpeg', uploadedAt: '2024-07-09 10:15' },
      { id: 'a6', name: '作品清单.xlsx', size: '0.5 MB', type: 'application/xlsx', uploadedAt: '2024-07-09 10:15' },
      { id: 'a7', name: '登记申请表.pdf', size: '0.8 MB', type: 'application/pdf', uploadedAt: '2024-07-09 10:15' }
    ],
    status: '处理中',
    priority: '中',
    submittedAt: '2024-07-09 10:15',
    history: [
      { 
        id: 'h2', 
        action: '创建请求', 
        timestamp: '2024-07-09 10:15',
        user: '林创意',
        details: '提交了新的版权登记请求'
      },
      { 
        id: 'h3', 
        action: '状态更新', 
        timestamp: '2024-07-09 15:40',
        user: '王知产',
        details: '请求状态从"待处理"更新为"处理中"'
      },
      { 
        id: 'h4', 
        action: '添加备注', 
        timestamp: '2024-07-09 15:45',
        user: '王知产',
        details: '已联系版权局咨询集体登记事宜，预计48小时内得到回复'
      }
    ]
  },
  { 
    id: 'DR003', 
    designer: {
      name: '陈数字',
      avatar: '/images/avatars/designer3.svg',
      rating: 4.9,
      projectsCount: 52,
      email: 'chen.digital@example.com',
      phone: '13812345678'
    },
    requestType: '设计侵权分析',
    title: '关于网站UI设计相似度分析',
    description: '发现一个网站的UI设计与我之前设计的作品有很大相似度，希望能对比分析确认是否构成侵权，并获取侵权处理建议。该网站采用了与我2023年10月为某客户设计的界面非常相似的布局、色彩方案和交互元素，甚至包括一些独特的设计组件。我已经收集了相关的截图和设计元素对比资料，希望能得到专业的法律分析，确认是否构成侵权，以及如果构成侵权应该如何处理。',
    attachments: [
      { id: 'a8', name: '侵权网站截图.zip', size: '7.5 MB', type: 'application/zip', uploadedAt: '2024-07-08 16:45' },
      { id: 'a9', name: '原始设计稿.sketch', size: '24.3 MB', type: 'application/octet-stream', uploadedAt: '2024-07-08 16:45' },
      { id: 'a10', name: '设计元素对比说明.pdf', size: '5.2 MB', type: 'application/pdf', uploadedAt: '2024-07-08 16:45' },
      { id: 'a11', name: '原始设计合同.pdf', size: '1.8 MB', type: 'application/pdf', uploadedAt: '2024-07-08 16:45' },
      { id: 'a12', name: '设计时间线证明.pdf', size: '2.1 MB', type: 'application/pdf', uploadedAt: '2024-07-08 16:45' },
      { id: 'a13', name: '相似度分析自评.docx', size: '1.4 MB', type: 'application/docx', uploadedAt: '2024-07-08 16:45' },
      { id: 'a14', name: '客户确认邮件.pdf', size: '0.5 MB', type: 'application/pdf', uploadedAt: '2024-07-08 16:45' },
      { id: 'a15', name: '侵权网站信息.txt', size: '0.1 MB', type: 'text/plain', uploadedAt: '2024-07-08 16:45' }
    ],
    status: '已回复',
    priority: '高',
    submittedAt: '2024-07-08 16:45',
    response: {
      content: `尊敬的陈先生：

感谢您提交侵权分析请求。我们已经详细分析了您提供的材料，并作出以下初步判断：

1. 根据您提供的证据，确实存在实质性相似，尤其是在以下方面：
   - 独特的导航布局和交互方式
   - 特定的色彩组合和视觉层次
   - 自定义设计的图标和UI组件
   - 特殊的动效和交互方式

2. 您有充分证据证明您的设计时间早于涉嫌侵权网站上线时间，且您持有原始设计文件和客户确认文件。

3. 侵权判定：基于上述分析，我们认为该网站的UI设计构成对您作品的实质性侵权。

处理建议：
1. 首先，建议发送"停止侵权通知函"，要求对方停止使用侵权设计并回应。
2. 如无回应，可考虑通过法律途径解决，包括：
   - 提起著作权侵权诉讼
   - 要求停止侵权并赔偿损失
   - 要求公开道歉

我们可以协助您起草正式的侵权通知函。如果您希望进一步采取法律行动，我们也可以推荐专业的知识产权律师。

请告知您的决定，我们将提供相应的后续支持。`,
      respondedAt: '2024-07-10 11:20',
      respondedBy: '李法务'
    },
    history: [
      { 
        id: 'h5', 
        action: '创建请求', 
        timestamp: '2024-07-08 16:45',
        user: '陈数字',
        details: '提交了新的设计侵权分析请求'
      },
      { 
        id: 'h6', 
        action: '状态更新', 
        timestamp: '2024-07-09 09:10',
        user: '李法务',
        details: '请求状态从"待处理"更新为"处理中"'
      },
      { 
        id: 'h7', 
        action: '添加备注', 
        timestamp: '2024-07-09 09:15',
        user: '李法务',
        details: '已开始分析提供的材料，预计需要1-2天时间完成全面评估'
      },
      { 
        id: 'h8', 
        action: '回复请求', 
        timestamp: '2024-07-10 11:20',
        user: '李法务',
        details: '已提供侵权分析结论和处理建议'
      },
      { 
        id: 'h9', 
        action: '状态更新', 
        timestamp: '2024-07-10 11:20',
        user: '李法务',
        details: '请求状态从"处理中"更新为"已回复"'
      }
    ]
  }
];

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  
  // 模拟API请求获取请求详情
  useEffect(() => {
    // 在实际应用中，这里应该是一个API调用
    const requestId = typeof params.requestId === 'string' ? params.requestId : params.requestId[0];
    const foundRequest = designerRequestsData.find(r => r.id === requestId);
    
    // 模拟加载延迟
    setTimeout(() => {
      if (foundRequest) {
        setRequest(foundRequest);
      }
      setLoading(false);
    }, 500);
  }, [params.requestId]);
  
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
  
  // 获取文件图标
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) {
      return (
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    } else if (fileType.includes('pdf')) {
      return (
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    } else if (fileType.includes('zip') || fileType.includes('octet-stream')) {
      return (
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      );
    } else {
      return (
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    }
  };
  
  // 处理回复提交
  const handleSubmitReply = () => {
    if (!replyText.trim()) return;
    
    // 在实际应用中，这里应该是一个API调用来保存回复
    alert('回复已提交（模拟）');
    router.push('/dashboard/intellectual-property-services/designer-requests');
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (!request) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl font-medium text-gray-900 mt-4">未找到请求</h2>
        <p className="text-gray-500 mt-2">找不到ID为 "{params.requestId}" 的请求</p>
        <div className="mt-6">
          <Link href="/dashboard/intellectual-property-services/designer-requests" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            返回请求列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <Link href="/dashboard/intellectual-property-services/designer-requests" className="text-indigo-600 hover:text-indigo-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 ml-3">请求 #{request.id}</h1>
          </div>
          <p className="mt-1 text-gray-500">{request.requestType} - {request.submittedAt}</p>
        </div>
        
        <div className="flex space-x-2">
          {request.status === '待处理' && (
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
              标记为处理中
            </button>
          )}
          
          {request.status === '处理中' && !request.response && (
            <button className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
              标记为已回复
            </button>
          )}
          
          <div className="relative">
            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
        </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 主内容 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 请求详情 */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{request.title}</h2>
                  <div className="mt-2 flex items-center flex-wrap gap-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(request.status)}`}>
                      {request.status}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityStyle(request.priority)}`}>
                      优先级：{request.priority}
                    </span>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {request.requestType}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-base font-medium text-gray-900 mb-4">请求详情</h3>
              <div className="text-gray-700 whitespace-pre-line">
                {request.description}
              </div>
        </div>
            
            {/* 附件列表 */}
            {request.attachments && request.attachments.length > 0 && (
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-base font-medium text-gray-900 mb-4">附件 ({request.attachments.length})</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                  {request.attachments.map((attachment: any) => (
                    <div key={attachment.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        {getFileIcon(attachment.type)}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-900">{attachment.name}</span>
                          <span className="text-sm text-gray-500">{attachment.size}</span>
                        </div>
                        <p className="text-xs text-gray-500">上传于 {attachment.uploadedAt}</p>
                      </div>
                      <button className="ml-4 text-indigo-600 hover:text-indigo-800">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* 已有回复 */}
            {request.response && (
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-medium text-gray-900">回复内容</h3>
                  <span className="text-sm text-gray-500">回复于 {request.response.respondedAt} · 由 {request.response.respondedBy}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-gray-700 whitespace-pre-line">
                  {request.response.content}
                </div>
              </div>
            )}
            
            {/* 添加回复区域 */}
            {request.status !== '已回复' && (
              <div className="p-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">添加回复</h3>
                <div className="space-y-4">
                  <textarea
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="输入您的回复..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
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
                    
                    <button className="flex items-center text-sm text-gray-700">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      使用模板
                    </button>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                      保存为草稿
                    </button>
                    <button 
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                      onClick={handleSubmitReply}
                      disabled={!replyText.trim()}
                    >
                      发送回复
                    </button>
        </div>
      </div>
        </div>
            )}
          </div>

          {/* 活动历史 */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-base font-medium text-gray-900">活动历史</h3>
            </div>
            
            <div className="p-6">
              <div className="flow-root">
                <ul className="-mb-8">
                  {request.history.map((event: any, index: number) => (
                    <li key={event.id}>
                      <div className="relative pb-8">
                        {index !== request.history.length - 1 ? (
                          <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        ) : null}
                        <div className="relative flex items-start space-x-3">
                          <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center ring-8 ring-white">
                              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
          <div>
                              <div className="text-sm">
                                <span className="font-medium text-gray-900">{event.user}</span>
                              </div>
                              <p className="mt-0.5 text-sm text-gray-500">
                                {event.timestamp}
                              </p>
                            </div>
                            <div className="mt-2 text-sm text-gray-700">
                              <p><span className="font-medium">{event.action}:</span> {event.details}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* 侧边栏信息 */}
        <div className="lg:col-span-1 space-y-6">
          {/* 设计师信息 */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-base font-medium text-gray-900">设计师信息</h3>
            </div>
            
            <div className="p-5">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  {request.designer.avatar ? (
                    <Image src={request.designer.avatar} alt={request.designer.name} width={48} height={48} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      {request.designer.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <h4 className="text-base font-medium text-gray-900">{request.designer.name}</h4>
                  <div className="flex items-center mt-0.5">
                    <div className="flex items-center text-amber-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-sm text-gray-700">{request.designer.rating}</span>
                    </div>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-gray-500">{request.designer.projectsCount} 个项目</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mt-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="ml-2 text-sm text-gray-600">{request.designer.email}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="ml-2 text-sm text-gray-600">{request.designer.phone}</span>
                </div>
              </div>
              
              <div className="mt-5 flex justify-between">
                <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                  查看设计师资料
                </button>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm">
                  查看历史请求
            </button>
          </div>
            </div>
          </div>
          
          {/* 请求详情 */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-base font-medium text-gray-900">请求信息</h3>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <p className="text-sm text-gray-500">请求ID</p>
                <p className="text-sm font-medium text-gray-900">{request.id}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">提交日期</p>
                <p className="text-sm font-medium text-gray-900">{request.submittedAt}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">请求类型</p>
                <p className="text-sm font-medium text-gray-900">{request.requestType}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">当前状态</p>
                <p className="text-sm font-medium text-gray-900">{request.status}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">优先级</p>
                <p className="text-sm font-medium text-gray-900">{request.priority}</p>
              </div>

          <div>
                <p className="text-sm text-gray-500">附件数量</p>
                <p className="text-sm font-medium text-gray-900">{request.attachments.length}</p>
              </div>
            </div>
          </div>
          
          {/* 快速操作 */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-base font-medium text-gray-900">快速操作</h3>
            </div>
            
            <div className="p-5 space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                发送消息
              </button>
              
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                安排咨询
              </button>
              
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                </svg>
                分享请求
              </button>
              
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                关闭请求
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 