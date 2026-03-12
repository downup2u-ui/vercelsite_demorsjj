"use client";

import { useState } from 'react';
import Link from 'next/link';

// 模拟客户数据
const clientsData = [
  {
    id: 'CP001',
    name: '张三设计工作室',
    type: '企业客户',
    contactPerson: '张三',
    phone: '13800138001',
    email: 'zhangsan@design.com',
    address: '北京市朝阳区设计创意园A座501',
    industry: '设计服务',
    joinDate: '2023-05-15',
    status: '活跃',
    notes: '主要从事UI/UX设计，有较高的品牌知名度，对知识产权保护要求较高。'
  },
  {
    id: 'CP002',
    name: '李四',
    type: '个人客户',
    contactPerson: '李四',
    phone: '13900139002',
    email: 'lisi@email.com',
    address: '上海市静安区某小区B栋2304',
    industry: '自由设计师',
    joinDate: '2023-08-20',
    status: '活跃',
    notes: '自由职业平面设计师，主要服务于小型企业和创业公司，关注合同纠纷问题。'
  },
  {
    id: 'CP007',
    name: '钱七',
    type: '个人客户',
    contactPerson: '钱七',
    phone: '13600136007',
    email: 'qianqi@email.com',
    address: '广州市天河区某公寓C栋1505',
    industry: '插画设计师',
    joinDate: '2024-01-10',
    status: '活跃',
    notes: '专业插画设计师，主要为出版社和广告公司提供插画作品，关注作品版权保护问题。'
  }
];

// 模拟相关案件数据
const relatedCases = {
  'CP001': [
    { id: 'CASE001', title: '张三设计工作室商标侵权案', status: '进行中', type: '知识产权纠纷', date: '2024-06-15' }
  ],
  'CP002': [
    { id: 'CASE002', title: '李四设计服务合同争议', status: '进行中', type: '合同纠纷', date: '2024-06-20' }
  ],
  'CP007': [
    { id: 'CASE003', title: '钱七知识产权授权协议', status: '准备中', type: '非诉讼业务', date: '2024-07-10' }
  ]
};

// 模拟相关文档数据
const relatedDocuments = {
  'CP001': [
    { id: 'DOC001', title: '张三设计工作室商标侵权诉状', type: '诉讼文书', date: '2024-07-15', status: '已定稿' }
  ],
  'CP002': [
    { id: 'DOC002', title: '李四设计服务合同争议仲裁申请书', type: '仲裁文书', date: '2024-07-18', status: '草稿' }
  ],
  'CP007': [
    { id: 'DOC004', title: '知识产权授权协议', type: '合同协议', date: '2024-06-20', status: '已定稿' }
  ]
};

// 模拟咨询记录数据
const consultationsData = {
  'CP001': [
    { id: 'CON001', title: '商标侵权咨询', type: '知识产权咨询', date: '2024-07-15', status: '未回复' }
  ],
  'CP002': [
    { id: 'CON002', title: '设计合同纠纷咨询', type: '合同咨询', date: '2024-07-12', status: '已回复' }
  ],
  'CP007': [
    { id: 'CON007', title: '插画作品版权保护咨询', type: '知识产权咨询', date: '2024-07-08', status: '已回复' }
  ]
};

export default function ClientProfilesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('全部');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  
  // 获取客户类型
  const clientTypes = Array.from(new Set(clientsData.map(client => client.type)));
  
  // 筛选客户
  const filteredClients = clientsData.filter(client => {
    // 类型筛选
    if (typeFilter !== '全部' && client.type !== typeFilter) return false;
    
    // 搜索筛选
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        client.name.toLowerCase().includes(searchLower) ||
        client.contactPerson.toLowerCase().includes(searchLower) ||
        client.phone.includes(searchLower) ||
        client.email.toLowerCase().includes(searchLower) ||
        client.industry.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  // 获取选中客户详情
  const selectedClientDetails = selectedClient ? 
    clientsData.find(client => client.id === selectedClient) : null;
    
  // 获取选中客户的相关数据
  const getClientCases = (clientId: string) => relatedCases[clientId as keyof typeof relatedCases] || [];
  const getClientDocuments = (clientId: string) => relatedDocuments[clientId as keyof typeof relatedDocuments] || [];
  const getClientConsultations = (clientId: string) => consultationsData[clientId as keyof typeof consultationsData] || [];
  
  // 状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case '活跃':
        return 'bg-green-100 text-green-800';
      case '不活跃':
        return 'bg-gray-100 text-gray-800';
      case '潜在':
        return 'bg-yellow-100 text-yellow-800';
      case '进行中':
        return 'bg-blue-100 text-blue-800';
      case '准备中':
        return 'bg-yellow-100 text-yellow-800';
      case '已定稿':
        return 'bg-green-100 text-green-800';
      case '草稿':
        return 'bg-yellow-100 text-yellow-800';
      case '未回复':
        return 'bg-red-100 text-red-800';
      case '已回复':
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
            <h1 className="text-2xl font-bold text-gray-900">客户档案</h1>
            <p className="mt-1 text-gray-500">管理客户信息和查看客户相关记录</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/dashboard/legal-services" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
              返回仪表盘
            </Link>
            <Link href="#" className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
              添加新客户
            </Link>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：筛选和客户列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">客户筛选</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">搜索客户</label>
                <input
                  type="text"
                  placeholder="客户名称、联系人或电话..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">客户类型</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="全部">全部类型</option>
                  {clientTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">客户列表</h2>
              <span className="text-sm text-gray-500">{filteredClients.length} 项</span>
            </div>
            
            <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <div
                    key={client.id}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${selectedClient === client.id ? 'bg-indigo-50' : ''}`}
                    onClick={() => setSelectedClient(client.id)}
                  >
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{client.name}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(client.status)}`}>
                        {client.status}
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-500 mb-1 flex items-center">
                      <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {client.contactPerson}
                      <span className="mx-2">•</span>
                      <span>{client.type}</span>
                    </div>
                    
                    <div className="text-xs text-gray-500 mb-1">
                      <svg className="h-3 w-3 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {client.email}
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      <svg className="h-3 w-3 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {client.phone}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  未找到匹配的客户
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 右侧：客户详情 */}
        <div className="lg:col-span-2">
          {selectedClientDetails ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-medium text-gray-900">{selectedClientDetails.name}</h2>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">客户ID: {selectedClientDetails.id}</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-sm text-gray-500">类型: {selectedClientDetails.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(selectedClientDetails.status)}`}>
                      {selectedClientDetails.status}
                    </span>
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
                    <h3 className="text-sm font-medium text-gray-700 mb-3">基本信息</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">联系人:</span>
                          <span className="text-sm text-gray-900">{selectedClientDetails.contactPerson}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">电话:</span>
                          <span className="text-sm text-gray-900">{selectedClientDetails.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">邮箱:</span>
                          <span className="text-sm text-gray-900">{selectedClientDetails.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">加入日期:</span>
                          <span className="text-sm text-gray-900">{selectedClientDetails.joinDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">附加信息</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">行业:</span>
                          <span className="text-sm text-gray-900">{selectedClientDetails.industry}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">地址:</span>
                          <span className="text-sm text-gray-900 text-right">{selectedClientDetails.address}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">状态:</span>
                          <span className={`text-sm font-medium ${getStatusStyle(selectedClientDetails.status)}`}>
                            {selectedClientDetails.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">客户备注</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{selectedClientDetails.notes}</p>
                  </div>
                </div>
                
                {/* 相关案件 */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-700">相关案件</h3>
                    <Link href="/dashboard/legal-services/case-management" className="text-xs text-indigo-600 hover:text-indigo-800">
                      查看全部
                    </Link>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    {getClientCases(selectedClientDetails.id).length > 0 ? (
                      <div className="space-y-3">
                        {getClientCases(selectedClientDetails.id).map(caseItem => (
                          <div key={caseItem.id} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                            <Link href={`/dashboard/legal-services/case-management?case=${caseItem.id}`} className="block hover:bg-gray-100 p-2 rounded-md">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-900">{caseItem.title}</span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(caseItem.status)}`}>
                                  {caseItem.status}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                <span>{caseItem.type}</span>
                                <span className="mx-2">•</span>
                                <span>开案日期: {caseItem.date}</span>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-sm text-gray-500 py-3">
                        无相关案件
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 相关文档 */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-700">相关文档</h3>
                    <Link href="/dashboard/legal-services/documents" className="text-xs text-indigo-600 hover:text-indigo-800">
                      查看全部
                    </Link>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    {getClientDocuments(selectedClientDetails.id).length > 0 ? (
                      <div className="space-y-3">
                        {getClientDocuments(selectedClientDetails.id).map(doc => (
                          <div key={doc.id} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                            <Link href={`/dashboard/legal-services/documents?document=${doc.id}`} className="block hover:bg-gray-100 p-2 rounded-md">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-900">{doc.title}</span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(doc.status)}`}>
                                  {doc.status}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                <span>{doc.type}</span>
                                <span className="mx-2">•</span>
                                <span>更新日期: {doc.date}</span>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-sm text-gray-500 py-3">
                        无相关文档
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 咨询记录 */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-700">咨询记录</h3>
                    <Link href="/dashboard/legal-services/consultation" className="text-xs text-indigo-600 hover:text-indigo-800">
                      查看全部
                    </Link>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    {getClientConsultations(selectedClientDetails.id).length > 0 ? (
                      <div className="space-y-3">
                        {getClientConsultations(selectedClientDetails.id).map(con => (
                          <div key={con.id} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                            <Link href={`/dashboard/legal-services/consultation?consultation=${con.id}`} className="block hover:bg-gray-100 p-2 rounded-md">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-900">{con.title}</span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(con.status)}`}>
                                  {con.status}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                <span>{con.type}</span>
                                <span className="mx-2">•</span>
                                <span>咨询日期: {con.date}</span>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-sm text-gray-500 py-3">
                        无咨询记录
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 flex justify-between">
                  <div className="flex space-x-2">
                    <Link href="#" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
                      添加备注
                    </Link>
                    <Link href={`/dashboard/legal-services/consultation?new&client=${selectedClientDetails.id}`} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
                      新建咨询
                    </Link>
                  </div>
                  <Link href="#" className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                    编辑客户
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">选择一个客户</h3>
              <p className="mt-1 text-sm text-gray-500">从左侧列表中选择一个客户以查看详情</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 