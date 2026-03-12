"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TransferApplication, getUserTransferApplications, cancelTransferApplication } from '@/services/transferService';

export default function MyApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<TransferApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 面包屑导航
  const breadcrumbItems = [
    { label: '首页', href: '/' },
    { label: '我的申请', href: '/my-applications' },
  ];
  
  // 获取所有申请
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await getUserTransferApplications();
        // 按创建时间倒序排序
        setApplications(data.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      } catch (err) {
        console.error('获取申请失败', err);
        setError('无法加载申请数据，请稍后重试');
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, []);
  
  // 取消申请
  const handleCancelApplication = async (referenceNumber: string) => {
    if (!confirm('确定要取消此转让申请吗？此操作不可撤销。')) {
      return;
    }
    
    try {
      const success = await cancelTransferApplication(referenceNumber);
      if (success) {
        // 刷新申请列表
        const updatedApplications = applications.map(app => 
          app.referenceNumber === referenceNumber 
            ? { ...app, status: 'rejected', notes: '申请已由用户取消', updatedAt: new Date().toISOString() } 
            : app
        );
        setApplications(updatedApplications);
      } else {
        alert('无法取消申请，可能已经在处理中或已完成');
      }
    } catch (error) {
      console.error('取消申请失败', error);
      alert('取消申请时出错，请稍后重试');
    }
  };
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };
  
  // 获取状态标签样式
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // 获取状态中文名称
  const getStatusName = (status: string) => {
    switch (status) {
      case 'draft': return '草稿';
      case 'pending': return '待处理';
      case 'reviewing': return '审核中';
      case 'approved': return '已批准';
      case 'rejected': return '已拒绝';
      case 'completed': return '已完成';
      default: return status;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-gray-900">我的申请</h1>
          <p className="mt-2 text-gray-600">查看和管理您的专利转让申请。</p>
        </div>
      </div>
      
      {/* 加载状态 */}
      {loading && (
        <div className="flex justify-center py-12">
          <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      
      {/* 错误状态 */}
      {error && !loading && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* 空状态 */}
      {!loading && !error && applications.length === 0 && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">暂无申请</h3>
          <p className="mt-1 text-sm text-gray-500">您还没有提交过专利转让申请</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => router.push('/patent-transfer')}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              创建新申请
            </button>
          </div>
        </div>
      )}
      
      {/* 申请列表 */}
      {!loading && !error && applications.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">我的申请 ({applications.length})</h2>
            <button
              type="button"
              onClick={() => router.push('/patent-transfer')}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              创建新申请
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    申请编号
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    提交时间
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    专利数量
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    最后更新
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{application.referenceNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(application.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.selectedPatents.length}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(application.status)}`}>
                        {getStatusName(application.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(application.updatedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2 justify-end">
                        <button
                          onClick={() => router.push(`/application-details/${application.referenceNumber}`)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          查看详情
                        </button>
                        {application.status === 'pending' && (
                          <button
                            onClick={() => handleCancelApplication(application.referenceNumber)}
                            className="text-red-600 hover:text-red-900"
                          >
                            取消
                          </button>
                        )}
                        {application.status === 'approved' && (
                          <button
                            onClick={() => {
                              alert('此功能正在开发中');
                            }}
                            className="text-green-600 hover:text-green-900"
                          >
                            下载证书
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 