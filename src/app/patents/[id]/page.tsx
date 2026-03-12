"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PatentService, Patent, PatentStatus, PatentType } from '@/services/patentService';

export default function PatentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [patent, setPatent] = useState<Patent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'documents' | 'history'>('info');

  // 获取专利详情
  useEffect(() => {
    const fetchPatentDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const patentData = await PatentService.getPatentById(id);
        
        if (!patentData) {
          setError('找不到此专利信息');
        } else {
          setPatent(patentData);
        }
      } catch (err) {
        console.error('获取专利详情失败:', err);
        setError('获取专利详情失败，请稍后重试');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatentDetails();
  }, [id]);

  // 面包屑导航
  const breadcrumbItems = [
    { label: '首页', href: '/' },
    { label: '知识产权', href: '#' },
    { label: '我的专利', href: '/patents' },
    { label: '专利详情', href: `/patents/${id}`, active: true },
  ];

  // 格式化日期
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 获取状态标签样式
  const getStatusStyle = (status: PatentStatus) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'examination':
        return 'bg-blue-100 text-blue-800';
      case 'withdrawn':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-3xl font-bold">专利详情</h1>
            <button 
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              onClick={() => router.push('/patents')}
            >
              返回
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">正在加载专利详情...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !patent) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
          <div className="flex justify-between items-center mt-4">
            <h1 className="text-3xl font-bold">专利详情</h1>
            <button 
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              onClick={() => router.push('/patents')}
            >
              返回
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-red-600">{error || '找不到此专利信息'}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => router.push('/patents')}
            >
              返回专利列表
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-3xl font-bold">专利详情</h1>
          <button 
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            onClick={() => router.push('/patents')}
          >
            返回
          </button>
        </div>
      </div>
      
      {/* 专利基本信息卡片 */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h2 className="text-xl font-semibold">{patent.title}</h2>
              <p className="text-gray-600 mt-1">专利编号: {patent.patentNumber}</p>
            </div>
            <div className="mt-2 md:mt-0 flex items-center">
              <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusStyle(patent.status as PatentStatus)}`}>
                {PatentService.getStatusName(patent.status as PatentStatus)}
              </span>
              <span className="ml-3 px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                {PatentService.getTypeName(patent.type as PatentType)}
              </span>
            </div>
          </div>
        </div>
        
        {/* 专利详情标签页 */}
        <div className="border-b">
          <div className="flex overflow-x-auto">
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'info' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('info')}
            >
              基本信息
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'documents' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('documents')}
            >
              文件资料
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'history' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('history')}
            >
              状态记录
            </button>
          </div>
        </div>

        {/* 基本信息内容 */}
        {activeTab === 'info' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">专利类型</h3>
                  <p className="mt-1 text-sm text-gray-900">{PatentService.getTypeName(patent.type as PatentType)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">申请日期</h3>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(patent.filingDate)}</p>
                </div>
                {patent.approvalDate && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">授权日期</h3>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(patent.approvalDate)}</p>
                  </div>
                )}
                {patent.expirationDate && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">有效期至</h3>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(patent.expirationDate)}</p>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">发明人</h3>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {patent.inventors.map((inventor, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                        {inventor}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">专利权人</h3>
                  <p className="mt-1 text-sm text-gray-900">{patent.owner}</p>
                </div>
                {patent.agents && patent.agents.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">代理人</h3>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {patent.agents.map((agent, index) => (
                        <span key={index} className="text-sm text-gray-900">{agent}</span>
                      ))}
                    </div>
                  </div>
                )}
                {patent.priority && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">优先权</h3>
                    <p className="mt-1 text-sm text-gray-900">{patent.priority}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 专利摘要和描述 */}
            <div className="mt-6">
              {patent.abstract && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500">摘要</h3>
                  <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">{patent.abstract}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-500">说明</h3>
                <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">{patent.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* 文件资料内容 */}
        {activeTab === 'documents' && (
          <div className="p-6">
            {patent.images && patent.images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {patent.images.map((image, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      <img
                        src={image}
                        alt={`专利图示 ${index + 1}`}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          // 图片加载失败时显示占位图标
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yNCAxaDt2MjJoLTI0di0yMmgyNHptLTEgMWgtMjJ2MjBoMjJ2LTIwem0tMSAxOWgtMjB2LTE4aDF2MTdoMTl2MXptLTItNmgtNnY0aDZ2LTR6bTAtMTBoLTR2OWg0di05em0tMTEgMWMxLjEwNSAwIDIgLjg5NSAyIDJzLS44OTUgMi0yIDItMi0uODk1LTItMiAuODk1LTIgMi0yem0tMyA4Yy4wMjEtLjU1Ni4xOS0yLjI3OCAxLjQ4My0zLjU4OS43ODgtLjqqMiAxLjY4Ni0xLjMxNSAyLjg0LTEuMzE1IDEuODY3IDAgMi42NTMgMS4wMDcgMi45NSAyLjE3NC4xNTQtLjE3IC40MTgtLjIyNC42OS0uMzI0LjEwMy0uMDM4LjI1NC0uMDg2LjM5Ny0uMTQ4Ljy5LzMzLjY2MSAxLjU2Mi0xLjQ4OSA0Ljg4Ny0yLjI5OXoiLz48L3N2Zz4=';
                        }}
                      />
                    </div>
                    <div className="p-2 text-center text-sm text-gray-600">
                      专利图示 {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-4 text-gray-600">暂无专利相关图示</p>
              </div>
            )}

            {/* 其他文件列表 - 实际应用中可以显示专利申请文件、审查意见等 */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">相关文件</h3>
              <div className="border rounded-lg overflow-hidden">
                <div className="text-center py-8 bg-gray-50">
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="mt-4 text-gray-600">暂无相关文件</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 状态记录内容 */}
        {activeTab === 'history' && (
          <div className="p-6">
            <div className="relative">
              {/* 模拟状态历史记录 - 实际应用中应从API获取 */}
              <div className="absolute top-0 bottom-0 left-9 border-l-2 border-gray-200"></div>
              
              <div className="relative pl-14 mb-8">
                <div className="absolute left-0 top-1 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900">申请提交</h4>
                  <p className="mt-1 text-sm text-gray-600">{formatDate(patent.filingDate)}</p>
                  <p className="mt-2 text-sm text-gray-600">您的专利申请已提交，申请类型为{PatentService.getTypeName(patent.type as PatentType)}。</p>
                </div>
              </div>
              
              {patent.status === 'examination' || patent.status === 'approved' || patent.status === 'rejected' ? (
                <div className="relative pl-14 mb-8">
                  <div className="absolute left-0 top-1 flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-white">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900">进入实质审查</h4>
                    <p className="mt-1 text-sm text-gray-600">{formatDate(new Date(new Date(patent.filingDate).getTime() + 3 * 30 * 24 * 60 * 60 * 1000))}</p>
                    <p className="mt-2 text-sm text-gray-600">您的专利申请已进入实质审查阶段，专利局将审查您的申请是否符合授权条件。</p>
                  </div>
                </div>
              ) : null}
              
              {patent.status === 'approved' ? (
                <div className="relative pl-14 mb-8">
                  <div className="absolute left-0 top-1 flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900">授权通知</h4>
                    <p className="mt-1 text-sm text-gray-600">{formatDate(patent.approvalDate)}</p>
                    <p className="mt-2 text-sm text-gray-600">恭喜您的专利申请已获得授权，您将收到专利证书。</p>
                  </div>
                </div>
              ) : null}
              
              {patent.status === 'rejected' ? (
                <div className="relative pl-14 mb-8">
                  <div className="absolute left-0 top-1 flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900">驳回通知</h4>
                    <p className="mt-1 text-sm text-gray-600">{formatDate(new Date(new Date(patent.filingDate).getTime() + 6 * 30 * 24 * 60 * 60 * 1000))}</p>
                    <p className="mt-2 text-sm text-gray-600">很遗憾，您的专利申请未能满足授权条件，已被驳回。您可以联系专利代理人了解详情。</p>
                  </div>
                </div>
              ) : null}
              
              {patent.status === 'withdrawn' ? (
                <div className="relative pl-14 mb-8">
                  <div className="absolute left-0 top-1 flex items-center justify-center w-8 h-8 rounded-full bg-gray-500 text-white">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900">申请撤回</h4>
                    <p className="mt-1 text-sm text-gray-600">{formatDate(new Date(new Date(patent.filingDate).getTime() + 2 * 30 * 24 * 60 * 60 * 1000))}</p>
                    <p className="mt-2 text-sm text-gray-600">根据您的请求，此专利申请已撤回。</p>
                  </div>
                </div>
              ) : null}
            </div>
            
            {patent.status === 'pending' && (
              <div className="text-center mt-4">
                <p className="text-gray-600 text-sm">专利申请正在等待审查，请耐心等待...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 