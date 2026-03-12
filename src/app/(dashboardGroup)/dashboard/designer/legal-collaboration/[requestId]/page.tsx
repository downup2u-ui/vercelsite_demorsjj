"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusBadge from '@/components/shared/StatusBadge';
import { designerLegalRequests } from '@/data/mockLegalRequests';

export default function LegalCollaborationRequestDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.requestId;
  
  // 查找匹配的请求
  const request = designerLegalRequests.find(req => req.id === requestId);
  
  // 如果找不到请求，显示错误状态
  if (!request) {
    return (
      <div className="bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-red-600 mb-4">请求未找到</h1>
        <p className="text-gray-600 mb-4">无法找到ID为 "{requestId}" 的法律咨询请求。</p>
        <Link 
          href="/dashboard/designer/legal-collaboration"
          className="text-indigo-600 hover:text-indigo-800"
        >
          返回请求列表
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">法律咨询请求详情</h1>
          <Link 
            href="/dashboard/designer/legal-collaboration"
            className="text-indigo-600 hover:text-indigo-800"
          >
            返回我的请求
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
                <StatusBadge status={request.status} label={request.statusText} />
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-600">提交时间：{request.submittedAt}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">请求描述</h3>
            <p className="text-gray-700 whitespace-pre-line mb-4">{request.description}</p>
            
            {request.attachments && request.attachments.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">我提交的附件</h3>
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
      
      {/* 法务回复区域 */}
      {request.responses && request.responses.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">法务顾问回复</h3>
            
            {request.responses.map((response, index) => (
              <div key={index} className={`${index > 0 ? 'border-t border-gray-200 pt-4 mt-4' : ''}`}>
                <div className="flex justify-between mb-2">
                  <p className="font-medium text-gray-800">{response.respondent}</p>
                  <p className="text-sm text-gray-500">{response.responseDate}</p>
                </div>
                <p className="text-gray-700 whitespace-pre-line mb-3">{response.message}</p>
                
                {response.attachments && response.attachments.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">附件:</p>
                    <ul className="list-disc list-inside text-indigo-600 ml-2">
                      {response.attachments.map((attachment, i) => (
                        <li key={i}>
                          <a href="#" className="hover:text-indigo-800">{attachment}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">等待处理</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>您的法律咨询请求已提交，正在等待法务顾问处理，请耐心等待。</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 追加信息按钮 */}
      <div className="flex justify-end">
        <button
          onClick={() => router.push(`/dashboard/designer/legal-collaboration/${requestId}/add-info`)}
          className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md mr-2"
        >
          追加信息
        </button>
        {/* 根据请求状态显示不同的按钮 */}
        {request.status === 'completed' ? (
          <button
            onClick={() => alert('功能开发中：标记为已解决')}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"
          >
            标记为已解决
          </button>
        ) : request.status === 'cancelled' ? (
          <button
            onClick={() => alert('功能开发中：重新开启请求')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md"
          >
            重新开启请求
          </button>
        ) : (
          <button
            onClick={() => alert('功能开发中：取消请求')}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
          >
            取消请求
          </button>
        )}
      </div>
    </>
  );
} 