"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
// Removed: import DashboardLayout from '@/components/dashboard/DashboardLayout';

// 定义DetailItem组件
interface DetailItemProps {
  label: string;
  value: React.ReactNode;
  fullWidth?: boolean;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value, fullWidth }) => (
  <div className={`py-3 ${fullWidth ? 'sm:col-span-3' : 'sm:col-span-1'}`}>
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900">{value}</dd>
  </div>
);

// Mock data
const mockFinancialRequests = [
  {
    id: "FR001",
    serviceType: "项目初期预算咨询",
    relatedProjectOrPeriod: "大型公共艺术装置项目预算",
    requestDetails: "需要为即将启动的大型公共艺术装置项目提供详细的预算编制咨询，包括材料、人工、运输、安装及应急费用。",
    attachments: [{name: 'project_proposal_v1.pdf', url: '#'}, {name: 'preliminary_quotes.xlsx', url: '#'}],
    notesToPlatform: "希望顾问有大型项目预算经验。",
    submittedDate: "2024-08-01",
    status: "财务顾问审核中",
    assignedConsultant: "李会计",
    platformUpdates: [
        { date: "2024-08-02", update: "请求已分配给李会计。"},
    ]
  },
];

export default function DesignerFinancialRequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const requestId = params.requestId as string;
  const request = mockFinancialRequests.find(r => r.id === requestId);

  // const professionName = "设计师 (Designer)"; // No longer for layout
  // const pageTitle = request ? `财务服务请求详情: ${request.id}` : "财务请求详情"; // Handled by group layout

  if (!request) {
    return (
        <div className="text-center py-10">
          <p className="text-xl text-gray-700">无法找到ID为 {requestId} 的财务服务请求。</p>
          <Link href="/dashboard/designer/financial-collaboration">
            <span className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md">返回列表</span>
          </Link>
        </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-semibold text-gray-800">财务服务请求详情: {request.id}</h2>
            {/* <p className="text-gray-500 mt-1">查看您的财务服务请求 {request.id} 的详情。</p> */}
        </div>
        <button onClick={() => router.back()} className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          返回列表
        </button>
      </div>
      
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b">
          <h3 className="text-lg font-medium text-gray-900">请求ID: {request.id} - {request.status}</h3>
          <p className="mt-1 text-sm text-gray-500">提交于: {request.submittedDate} {request.assignedConsultant && `| 当前顾问: ${request.assignedConsultant}`}</p>
        </div>
        <div className="border-t px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-4"><DetailItem label="服务类型" value={request.serviceType} /></div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-4"><DetailItem label="关联项目/周期" value={request.relatedProjectOrPeriod} /></div>
            <div className="sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6 sm:py-4"><DetailItem label="详细需求" value={<pre className="whitespace-pre-wrap font-sans">{request.requestDetails}</pre>} fullWidth /></div>
            {request.attachments && request.attachments.length > 0 && (
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-4">
                <DetailItem label="附件" value={<ul>{request.attachments.map(f => <li key={f.name}><a href={f.url} className="text-indigo-600 hover:underline">{f.name}</a></li>)}</ul>} />
              </div>
            )}
            {request.notesToPlatform && (
              <div className="sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6 sm:py-4"><DetailItem label="给平台的备注" value={<pre className="whitespace-pre-wrap font-sans">{request.notesToPlatform}</pre>} fullWidth /></div>
            )}
          </dl>
        </div>
      </div>
      {request.platformUpdates && request.platformUpdates.length > 0 && (
         <div className="mt-8 bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">平台处理记录</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <ul className="space-y-4">
              {request.platformUpdates.map((update, index) => (
                <li key={index} className="p-3 bg-gray-50 rounded-md">
                  <p className="text-xs text-gray-500">{update.date}</p>
                  <p className="text-sm text-gray-700">{update.update}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
} 