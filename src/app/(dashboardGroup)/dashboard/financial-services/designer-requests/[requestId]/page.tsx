"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusBadge from '@/components/shared/StatusBadge';
import { financialConsultantRequests } from '@/data/mockFinancialRequests';

// Assuming DetailItem might be similar
const DetailItem: React.FC<{ label: string; value?: string | React.ReactNode; fullWidth?: boolean }> = ({ label, value, fullWidth }) => (
  <div className={`py-3 ${fullWidth ? 'sm:col-span-2' : ''}`}>
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900">{value || '-'}</dd>
  </div>
);

export default function FinancialRequestDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.requestId;
  
  // 查找匹配的请求 - 使用财务顾问视角的请求数据
  const request = financialConsultantRequests.find(req => req.id === requestId);
  
  // 如果找不到请求，显示错误状态
  if (!request) {
    return (
      <div className="bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-red-600 mb-4">请求未找到</h1>
        <p className="text-gray-600 mb-4">无法找到ID为 "{requestId}" 的财务咨询请求。</p>
        <Link 
          href="/dashboard/financial-services/designer-requests"
          className="text-indigo-600 hover:text-indigo-800"
        >
          返回请求列表
        </Link>
      </div>
    );
  }
  
  // 处理状态更新
  const [status, setStatus] = useState(request.status);
  const [comments, setComments] = useState("");
  
  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    // 在实际应用中，这里会发送API请求更新状态
  };
  
  const handleSubmitResponse = () => {
    // 在实际应用中，这里会发送API请求提交回复
    alert('回复已提交！(模拟)');
    router.push('/dashboard/financial-services/designer-requests');
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">财务咨询请求详情</h1>
          <Link 
            href="/dashboard/financial-services/designer-requests"
            className="text-indigo-600 hover:text-indigo-800"
          >
            返回请求列表
          </Link>
        </div>
      </div>
      
      {/* 请求详情卡片 */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{request.title}</h2>
              <div className="flex items-center mb-4">
                <span className="text-gray-600 mr-4">请求ID: #{request.id}</span>
                <StatusBadge status={status} />
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-600">提交时间：{request.submittedAt}</p>
              <p className="text-gray-600">设计师：{request.designerName}</p>
              <Link href={request.designerPortfolio} className="text-indigo-600 hover:text-indigo-800 text-sm">
                查看设计师资料
              </Link>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">请求描述</h3>
            <p className="text-gray-700 whitespace-pre-line mb-4">{request.description}</p>
            
            {request.attachments && request.attachments.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">附件</h3>
                <ul className="list-disc list-inside text-indigo-600">
                  {request.attachments.map((attachment, index) => (
                    <li key={index}>
                      <a href="#" className="hover:text-indigo-800">{attachment}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* 财务顾问回复区域 */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">处理请求</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
              更新状态
            </label>
            <div className="flex space-x-4">
              <button 
                onClick={() => handleStatusChange('待处理')} 
                className={`px-4 py-2 rounded-md ${status === '待处理' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300' : 'bg-gray-100 text-gray-600'}`}
              >
                待处理
              </button>
              <button 
                onClick={() => handleStatusChange('处理中')} 
                className={`px-4 py-2 rounded-md ${status === '处理中' ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' : 'bg-gray-100 text-gray-600'}`}
              >
                处理中
              </button>
              <button 
                onClick={() => handleStatusChange('已完成')} 
                className={`px-4 py-2 rounded-md ${status === '已完成' ? 'bg-green-100 text-green-800 border-2 border-green-300' : 'bg-gray-100 text-gray-600'}`}
              >
                已完成
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comments">
              回复内容
            </label>
            <textarea
              id="comments"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={6}
              placeholder="输入您对设计师财务咨询请求的回复..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSubmitResponse}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              提交回复
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 