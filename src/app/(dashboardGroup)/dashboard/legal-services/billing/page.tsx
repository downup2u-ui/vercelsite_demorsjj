"use client";

import { useState } from 'react';
import Link from 'next/link';

// 模拟账单数据
const billsData = [
  {
    id: 'BILL001',
    title: '设计服务费（UI项目A）',
    client: '张三设计工作室',
    clientId: 'CP001',
    amount: 12000,
    status: '待支付',
    dueDate: '2024-07-20',
    paidDate: null,
    relatedCase: 'CASE001',
    description: 'UI界面设计服务，含原型、交互、视觉稿。'
  },
  {
    id: 'BILL002',
    title: '法律咨询费（合同审核）',
    client: '李四',
    clientId: 'CP002',
    amount: 2000,
    status: '已支付',
    dueDate: '2024-07-10',
    paidDate: '2024-07-09',
    relatedCase: null,
    description: '合同审核与法律咨询服务。'
  },
  {
    id: 'BILL003',
    title: '知识产权登记代理费',
    client: '王五科技有限公司',
    clientId: 'CP005',
    amount: 3500,
    status: '逾期',
    dueDate: '2024-07-01',
    paidDate: null,
    relatedCase: 'CASE003',
    description: '外观设计专利登记代理服务。'
  },
  {
    id: 'BILL004',
    title: '文书模板下载费',
    client: '赵六',
    clientId: 'CP006',
    amount: 300,
    status: '待支付',
    dueDate: '2024-07-18',
    paidDate: null,
    relatedCase: null,
    description: '文书模板中心下载服务。'
  }
];

const statusOptions = ['全部', '待支付', '已支付', '逾期'];

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [selectedBill, setSelectedBill] = useState<string | null>(null);

  // 筛选账单
  const filteredBills = billsData.filter(item => {
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

  // 获取选中账单详情
  const selectedDetails = selectedBill ?
    billsData.find(b => b.id === selectedBill) : null;

  // 状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case '待支付':
        return 'bg-yellow-100 text-yellow-800';
      case '已支付':
        return 'bg-green-100 text-green-800';
      case '逾期':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">账单与收款管理</h1>
            <p className="mt-1 text-gray-500">统一管理法律服务账单，跟踪收款进度</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/dashboard/legal-services" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
              返回仪表盘
            </Link>
            <Link href="#" className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
              创建新账单
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：筛选和账单列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">筛选条件</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">搜索账单</label>
                <input
                  type="text"
                  placeholder="输入标题、客户名..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">账单状态</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {statusOptions.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">账单列表</h2>
              <span className="text-sm text-gray-500">{filteredBills.length} 项</span>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
              {filteredBills.length > 0 ? (
                filteredBills.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${selectedBill === item.id ? 'bg-indigo-50' : ''}`}
                    onClick={() => setSelectedBill(item.id)}
                  >
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">{item.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}>{item.status}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      <span>客户: {item.client}</span>
                      <span className="mx-2">•</span>
                      <span>金额: ￥{item.amount}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      <span>到期: {item.dueDate}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">未找到匹配的账单</div>
              )}
            </div>
          </div>
        </div>
        {/* 右侧：账单详情 */}
        <div className="lg:col-span-2">
          {selectedDetails ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-medium text-gray-900">{selectedDetails.title}</h2>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">账单ID: {selectedDetails.id}</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-sm text-gray-500">状态: <span className={`font-medium ${getStatusStyle(selectedDetails.status)}`}>{selectedDetails.status}</span></span>
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
                    <h3 className="text-sm font-medium text-gray-700 mb-3">账单信息</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">金额:</span>
                          <span className="text-sm font-medium text-gray-900">￥{selectedDetails.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">到期日:</span>
                          <span className="text-sm text-gray-900">{selectedDetails.dueDate}</span>
                        </div>
                        {selectedDetails.paidDate && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">支付时间:</span>
                            <span className="text-sm text-gray-900">{selectedDetails.paidDate}</span>
                          </div>
                        )}
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
                            <span className="text-sm text-gray-500">关联案件:</span>
                            <Link href={`/dashboard/legal-services/case-management?case=${selectedDetails.relatedCase}`} className="text-sm text-indigo-600 hover:text-indigo-800">{selectedDetails.relatedCase}</Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">账单描述</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{selectedDetails.description}</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6 flex justify-between">
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">标记为已支付</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">发送账单</button>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">下载账单</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">选择一个账单</h3>
              <p className="mt-1 text-sm text-gray-500">从左侧列表中选择一个账单以查看详情</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 