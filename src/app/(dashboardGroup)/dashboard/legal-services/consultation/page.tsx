"use client";

import { useState } from 'react';
import Link from 'next/link';

// 模拟咨询数据
const consultationsData = [
  {
    id: 'CON001',
    title: '商标侵权咨询',
    client: '张三设计工作室',
    clientId: 'CP001',
    type: '知识产权咨询',
    status: '未回复',
    requestDate: '2024-07-15',
    priority: '高',
    relatedCase: 'CASE001',
    description: '客户咨询其商标被他人侵权后的维权流程及证据准备，需解答诉讼流程及赔偿标准。'
  },
  {
    id: 'CON002',
    title: '设计合同纠纷咨询',
    client: '李四',
    clientId: 'CP002',
    type: '合同咨询',
    status: '已回复',
    requestDate: '2024-07-12',
    priority: '中',
    relatedCase: 'CASE002',
    description: '客户咨询设计服务合同履行争议，涉及尾款支付及成果验收问题，需提供调解建议。'
  },
  {
    id: 'CON003',
    title: '产品设计专利保护咨询',
    client: '王五科技有限公司',
    clientId: 'CP005',
    type: '知识产权咨询',
    status: '未回复',
    requestDate: '2024-07-14',
    priority: '中',
    relatedCase: null,
    description: '企业咨询新产品外观设计专利申请流程及注意事项，需解答专利类型选择。'
  },
  {
    id: 'CON004',
    title: 'UI设计著作权登记咨询',
    client: '赵六',
    clientId: 'CP006',
    type: '知识产权咨询',
    status: '已回复',
    requestDate: '2024-07-10',
    priority: '低',
    relatedCase: null,
    description: '客户咨询UI设计作品如何进行著作权登记及所需材料。'
  }
];

const consultationTypes = Array.from(new Set(consultationsData.map(item => item.type)));
const statusOptions = Array.from(new Set(consultationsData.map(item => item.status)));

export default function ConsultationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('全部');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [selectedConsultation, setSelectedConsultation] = useState<string | null>(null);

  // 筛选咨询
  const filteredConsultations = consultationsData.filter(item => {
    if (typeFilter !== '全部' && item.type !== typeFilter) return false;
    if (statusFilter !== '全部' && item.status !== statusFilter) return false;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchLower) ||
        item.client.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  // 获取选中咨询详情
  const selectedDetails = selectedConsultation ?
    consultationsData.find(c => c.id === selectedConsultation) : null;

  // 状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case '未回复':
        return 'bg-red-100 text-red-800';
      case '已回复':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  // 优先级样式
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case '高':
        return 'bg-red-100 text-red-800';
      case '中':
        return 'bg-yellow-100 text-yellow-800';
      case '低':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">法律咨询服务</h1>
            <p className="mt-1 text-gray-500">管理客户咨询请求，快速响应法律问题</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/dashboard/legal-services" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
              返回仪表盘
            </Link>
            <Link href="#" className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
              添加新咨询
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：筛选和咨询列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">筛选条件</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">搜索咨询</label>
                <input
                  type="text"
                  placeholder="输入标题、客户名..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">咨询类型</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="全部">全部类型</option>
                  {consultationTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">咨询状态</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="全部">全部状态</option>
                  {statusOptions.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">咨询请求列表</h2>
              <span className="text-sm text-gray-500">{filteredConsultations.length} 项</span>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
              {filteredConsultations.length > 0 ? (
                filteredConsultations.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${selectedConsultation === item.id ? 'bg-indigo-50' : ''}`}
                    onClick={() => setSelectedConsultation(item.id)}
                  >
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">{item.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>{item.status}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      <span>{item.type}</span>
                      <span className="mx-2">•</span>
                      <span>请求: {item.requestDate}</span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {item.client}
                      <span className="mx-2">•</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityStyle(item.priority)}`}>{item.priority}优先</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">未找到匹配的咨询</div>
              )}
            </div>
          </div>
        </div>
        {/* 右侧：咨询详情 */}
        <div className="lg:col-span-2">
          {selectedDetails ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-medium text-gray-900">{selectedDetails.title}</h2>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">咨询ID: {selectedDetails.id}</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-sm text-gray-500">类型: {selectedDetails.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(selectedDetails.status)}`}>{selectedDetails.status}</span>
                    <div className="relative">
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">咨询信息</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">状态:</span>
                          <span className={`text-sm font-medium ${getStatusStyle(selectedDetails.status)}`}>{selectedDetails.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">优先级:</span>
                          <span className={`text-sm font-medium ${getPriorityStyle(selectedDetails.priority)}`}>{selectedDetails.priority}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">请求日期:</span>
                          <span className="text-sm text-gray-900">{selectedDetails.requestDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">客户信息</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">客户:</span>
                          <Link href={`/dashboard/legal-services/client-profiles?client=${selectedDetails.clientId}`} className="text-sm text-indigo-600 hover:text-indigo-800">{selectedDetails.client}</Link>
                        </div>
                        {selectedDetails.relatedCase && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">相关案件:</span>
                            <Link href={`/dashboard/legal-services/case-management?case=${selectedDetails.relatedCase}`} className="text-sm text-indigo-600 hover:text-indigo-800">{selectedDetails.relatedCase}</Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">咨询描述</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{selectedDetails.description}</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6 flex justify-between">
                  <div className="flex space-x-2">
                    <Link href="#" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">回复咨询</Link>
                    <Link href="#" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">标记为已回复</Link>
                  </div>
                  <Link href="#" className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">编辑咨询</Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">选择一个咨询</h3>
              <p className="mt-1 text-sm text-gray-500">从左侧列表中选择一个咨询以查看详情</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 