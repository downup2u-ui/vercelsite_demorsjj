"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusBadge from '@/components/shared/StatusBadge';
import { designerIPRequests } from '@/data/mockIPRequests';

// 定义DetailItem组件
interface DetailItemProps {
  label: string;
  value: string | React.ReactNode;
}

export const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
  <div className="mb-4">
    <h4 className="text-sm font-medium text-gray-500">{label}</h4>
    <p className="mt-1 text-sm text-gray-900">{value}</p>
  </div>
);

// Mock data - in a real app, this would come from an API based on requestId
const mockIpRequests = [
  {
    id: "IPR001",
    serviceType: "商标查询与申请",
    relatedIpName: `"潮玩系列"品牌商标`,
    requestDetails: "为新设计的潮玩系列产品进行商标查询，并准备申请材料。初步构想包含图形和文字部分。",
    attachments: [{name: 'logo_design_v1.jpg', url: '#'}, {name: 'brand_concept.pdf', url: '#'}],
    notesToPlatform: "请优先查询图形商标的近似情况。",
    submittedDate: "2024-07-28",
    status: "顾问处理中",
    assignedConsultant: "王顾问",
    platformUpdates: [
        { date: "2024-07-29", update: "请求已分配给王顾问处理。"},
        { date: "2024-07-30", update: "王顾问已开始初步查询。"}
    ]
  },
  {
    id: "IPR002",
    serviceType: "作品版权登记",
    relatedIpName: `数字画作"未来都市"系列`,
    requestDetails: "为系列数字画作申请版权登记，共5幅作品。",
    attachments: [{name: 'artwork_collection.zip', url: '#'}],
    notesToPlatform: "希望了解加急登记的可能性。",
    submittedDate: "2024-07-22",
    status: "已完成",
    assignedConsultant: "刘专员",
    platformUpdates: [
        { date: "2024-07-23", update: "请求已分配给刘专员。"},
        { date: "2024-07-25", update: "版权登记材料已提交。"},
        { date: "2024-08-05", update: "版权登记已完成，证书已下发。"}
    ]
  }
];

export default function IPCollaborationRequestDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.requestId;
  
  // 查找匹配的请求
  const request = designerIPRequests.find(req => req.id === requestId);
  
  // 如果找不到请求，显示错误状态
  if (!request) {
    return (
      <div className="bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-red-600 mb-4">请求未找到</h1>
        <p className="text-gray-600 mb-4">无法找到ID为 "{requestId}" 的知识产权咨询请求。</p>
        <Link 
          href="/dashboard/designer/ip-collaboration"
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
          <h1 className="text-2xl font-bold text-gray-900">知识产权咨询请求详情</h1>
          <Link 
            href="/dashboard/designer/ip-collaboration"
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
                <StatusBadge status={request.status} />
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-600">提交时间：{request.submittedAt}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">请求描述</h3>
            <p className="text-gray-700 whitespace-pre-line mb-4">{request.description}</p>
            
            {request.ipType && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">知识产权类型</h3>
                <p className="text-gray-700">{request.ipType}</p>
              </div>
            )}
            
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
      
      {/* IP顾问回复区域 */}
      {request.responses && request.responses.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">知识产权顾问回复</h3>
            
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
                <p>您的知识产权咨询请求已提交，正在等待IP顾问处理，请耐心等待。</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 操作按钮 */}
      <div className="flex justify-end">
        <button
          onClick={() => router.push(`/dashboard/designer/ip-collaboration/${requestId}/add-info`)}
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