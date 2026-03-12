"use client";

import Link from 'next/link';
// Removed: import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function FinancialDesignerRequestsPage() {
  const professionName = "财务服务 (Financial Services)";
  // const pageTitle = "设计师协作请求 (财务)"; // Handled by group layout
  const welcomeMessage = "管理和处理来自设计师的财务相关服务请求。";

  // Placeholder data for requests - replace with actual data fetching
  const designerRequests = [
    {
      id: "FR001",
      designerName: "刘设计师",
      designerId: "designer012",
      serviceType: "项目初期预算咨询",
      project: "大型公共艺术装置项目",
      submittedDate: "2024-07-25",
      status: "新请求"
    },
    {
      id: "FR002",
      designerName: "孙设计团队",
      designerId: "designer013",
      serviceType: "年度设计收入税务申报辅导",
      project: "团队年度财务规划",
      submittedDate: "2024-07-28",
      status: "处理中"
    }
  ];

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{professionName} - 设计师协作请求</h2>
        <p className="text-gray-500 mt-1">{welcomeMessage}</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-700">待处理财务服务工单</h3>
      </div>

        {designerRequests.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">请求ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">设计师</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">服务类型</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">关联项目/说明</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">提交日期</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">操作</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm">
                {designerRequests.map((req) => (
                  <tr key={req.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-indigo-600 font-medium">{req.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{req.designerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{req.serviceType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{req.project}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{req.submittedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${req.status === '新请求' ? 'bg-pink-100 text-pink-800' : 
                          req.status === '处理中' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}
                      `}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/dashboard/financial-services/designer-requests/${req.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        处理请求
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
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">暂无待处理请求</h3>
            <p className="mt-1 text-sm text-gray-500">当前没有来自设计师的财务服务请求。</p>
          </div>
        )}
    </>
  );
} 
