"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TransferApplication, getTransferApplicationStatus, cancelTransferApplication } from '@/services/transferService';

export default function ApplicationDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const referenceNumber = params.referenceNumber as string;
  
  const [application, setApplication] = useState<TransferApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 面包屑导航
  const breadcrumbItems = [
    { label: '首页', href: '/' },
    { label: '我的申请', href: '/my-applications' },
    { label: `申请详情 ${referenceNumber}`, href: `/application-details/${referenceNumber}` },
  ];
  
  // 获取申请详情
  useEffect(() => {
    const fetchApplicationDetails = async () => {
      if (!referenceNumber) return;
      
      try {
        setLoading(true);
        const data = await getTransferApplicationStatus(referenceNumber);
        
        if (!data) {
          setError('找不到该申请，请检查申请编号是否正确');
          return;
        }
        
        setApplication(data);
      } catch (err) {
        console.error('获取申请详情失败', err);
        setError('无法加载申请详情，请稍后重试');
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplicationDetails();
  }, [referenceNumber]);
  
  // 取消申请
  const handleCancelApplication = async () => {
    if (!application) return;
    
    if (!confirm('确定要取消此转让申请吗？此操作不可撤销。')) {
      return;
    }
    
    try {
      const success = await cancelTransferApplication(referenceNumber);
      if (success) {
        // 更新状态
        setApplication({
          ...application,
          status: 'rejected',
          notes: '申请已由用户取消',
          updatedAt: new Date().toISOString()
        });
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
  
  // 格式化转让类型
  const formatTransferType = (type: string) => {
    switch (type) {
      case 'sale': return '全权出售';
      case 'license': return '许可使用';
      case 'gift': return '赠予';
      case 'inheritance': return '继承';
      case 'other': return '其他';
      default: return type;
    }
  };
  
  // 格式化接收方类型
  const formatRecipientType = (type: string) => {
    switch (type) {
      case 'individual': return '个人';
      case 'company': return '企业';
      case 'institution': return '机构/组织';
      default: return type;
    }
  };
  
  // 格式化付款方式
  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case 'bank': return '银行转账';
      case 'alipay': return '支付宝';
      case 'wechat': return '微信支付';
      case 'other': return '其他';
      default: return method;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-gray-900">申请详情</h1>
          {application && (
            <div className="flex items-center space-x-4 mt-2">
              <p className="text-gray-600">申请编号: {application.referenceNumber}</p>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(application.status)}`}>
                {getStatusName(application.status)}
              </span>
            </div>
          )}
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
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => router.push('/my-applications')}
                  className="text-sm text-red-700 font-medium hover:underline"
                >
                  返回我的申请
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 申请详情 */}
      {!loading && !error && application && (
        <div className="space-y-6">
          {/* 操作栏 */}
          <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-500">申请时间: {formatDate(application.createdAt)}</div>
              <div className="text-sm text-gray-500">最后更新: {formatDate(application.updatedAt)}</div>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                打印
              </button>
              {application.status === 'pending' && (
                <button
                  type="button"
                  onClick={handleCancelApplication}
                  className="px-3 py-1.5 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700"
                >
                  取消申请
                </button>
              )}
              <button
                type="button"
                onClick={() => router.push('/my-applications')}
                className="px-3 py-1.5 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
              >
                返回列表
              </button>
            </div>
          </div>
          
          {/* 申请状态跟踪 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">申请进度</h2>
            </div>
            <div className="px-4 py-5">
              <div className="flex items-center">
                <div className="relative">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center ${
                    application.status !== 'draft' ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4 min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">申请创建</p>
                  <p className="text-sm text-gray-500">{formatDate(application.createdAt)}</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-start">
                  <div className="relative">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center ${
                      ['reviewing', 'approved', 'completed'].includes(application.status) ? 'bg-green-500' : 
                      application.status === 'pending' ? 'bg-blue-500' : 
                      application.status === 'rejected' ? 'bg-red-500' : 'bg-gray-300'
                    }`}>
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4 min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">审核中</p>
                    <p className="text-sm text-gray-500">
                      {application.status === 'reviewing' ? '正在审核您的申请' :
                       application.status === 'approved' || application.status === 'completed' ? '您的申请已审核通过' : 
                       application.status === 'rejected' ? '您的申请被拒绝' : 
                       application.status === 'pending' ? '等待审核' : ''}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-start">
                  <div className="relative">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center ${
                      application.status === 'completed' ? 'bg-green-500' :
                      application.status === 'approved' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4 min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">完成</p>
                    <p className="text-sm text-gray-500">
                      {application.status === 'completed' ? '专利转让流程已完成' :
                       application.status === 'approved' ? '等待完成登记手续' : '等待审核通过'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 申请详情内容 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">申请详情</h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">转让类型</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatTransferType(application.transferDetails.transferType)}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">接收方类型</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formatRecipientType(application.recipientInfo.recipientType)}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">接收方名称</dt>
                  <dd className="mt-1 text-sm text-gray-900">{application.recipientInfo.name}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">联系电话</dt>
                  <dd className="mt-1 text-sm text-gray-900">{application.recipientInfo.phone}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">电子邮箱</dt>
                  <dd className="mt-1 text-sm text-gray-900">{application.recipientInfo.email}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">转让费用</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {application.termsAndDocuments.transferFee ? `¥${application.termsAndDocuments.transferFee} CNY` : '-'}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">付款方式</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {application.termsAndDocuments.paymentMethod ? formatPaymentMethod(application.termsAndDocuments.paymentMethod) : '-'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          
          {/* 专利列表 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">转让专利列表</h2>
            </div>
            <ul className="divide-y divide-gray-200">
              {application.selectedPatents.map((patent) => (
                <li key={patent.id} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{patent.title}</h3>
                      <div className="mt-1 text-sm text-gray-500">
                        <p>专利号: {patent.appNumber}</p>
                        <p>发明人: {patent.inventors.join(', ')}</p>
                      </div>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {patent.type}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* 申请备注 */}
          {application.notes && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">申请备注</h2>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <p className="text-sm text-gray-900 whitespace-pre-wrap">{application.notes}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 