"use client";

import Link from 'next/link';
import StatusBadge from '@/components/shared/StatusBadge';
import { designerLegalRequests } from '@/data/mockLegalRequests';

export default function DesignerLegalCollaborationPage() {
  const pageFeatureTitle = "法律服务协同";
  const welcomeMessage = "管理您的法律服务请求，与法务团队高效协作。";

  return (
    <>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-3xl font-semibold text-gray-800">{pageFeatureTitle}</h2>
            <Link 
              href="/dashboard/designer" 
              className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              返回设计师仪表盘
            </Link>
        </div>
        <p className="text-gray-500 mt-1 text-lg">{welcomeMessage}</p>
      </div>
      
      <div className="flex justify-end mb-6">
        <Link 
          href="/dashboard/designer/legal-collaboration/new-request" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-150 text-sm"
        >
          + 发起新请求
        </Link>
      </div>

      {designerLegalRequests.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">请求ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">服务类型</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">关联项目/IP</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">提交日期</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">负责法务</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">操作</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {designerLegalRequests.map((req) => (
                <tr key={req.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-indigo-600 font-medium">{req.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{req.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{req.relatedProject}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{req.submittedAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={req.status} label={req.statusText} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{req.assignedLawyer || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      href={`/dashboard/designer/legal-collaboration/${req.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      查看详情
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">暂无法律服务请求</h3>
          <p className="mt-1 text-sm text-gray-500">您可以点击上方按钮发起新的法律服务请求。</p>
        </div>
      )}
    </>
  );
} 