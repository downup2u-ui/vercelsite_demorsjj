"use client";

import { useState } from 'react';
import Link from 'next/link';

// 模拟文书数据
const documentsData = [
  {
    id: 'DOC001',
    title: '张三设计工作室商标侵权诉状',
    type: '诉讼文书',
    status: '已定稿',
    client: '张三设计工作室',
    clientId: 'CP001',
    relatedCase: 'CASE001',
    createDate: '2024-07-05',
    updateDate: '2024-07-15',
    createdBy: '李律师',
    approvedBy: '陈主任',
    size: '12页',
    description: '针对某公司侵犯张三设计工作室商标权的民事诉讼起诉状，包含事实陈述、法律依据和诉讼请求。',
    tags: ['商标侵权', '知识产权', '民事诉讼']
  },
  {
    id: 'DOC002',
    title: '李四设计服务合同争议仲裁申请书',
    type: '仲裁文书',
    status: '草稿',
    client: '李四',
    clientId: 'CP002',
    relatedCase: 'CASE002',
    createDate: '2024-07-12',
    updateDate: '2024-07-18',
    createdBy: '王律师',
    approvedBy: null,
    size: '8页',
    description: '针对设计服务合同付款争议的仲裁申请书，详细说明合同履行情况和争议事实，要求支付剩余设计费用。',
    tags: ['合同争议', '服务合同', '仲裁申请']
  },
  {
    id: 'DOC003',
    title: '设计作品著作权登记申请表',
    type: '登记文书',
    status: '已提交',
    client: '赵六',
    clientId: 'CP006',
    relatedCase: null,
    createDate: '2024-07-06',
    updateDate: '2024-07-08',
    createdBy: '张律师',
    approvedBy: '张律师',
    size: '5页',
    description: '为客户UI设计作品申请著作权登记的官方申请表格，包含作品信息、权利人信息和创作情况说明。',
    tags: ['著作权', '登记申请', 'UI设计']
  },
  {
    id: 'DOC004',
    title: '知识产权授权协议',
    type: '合同协议',
    status: '已定稿',
    client: '钱七',
    clientId: 'CP007',
    relatedCase: 'CASE003',
    createDate: '2024-06-15',
    updateDate: '2024-06-20',
    createdBy: '张律师',
    approvedBy: '陈主任',
    size: '10页',
    description: '规范设计作品授权使用的正式协议，明确授权范围、使用期限、地域限制和授权费用等条款。',
    tags: ['知识产权', '授权协议', '版权']
  }
];

// 文档类型
const documentTypes = Array.from(new Set(documentsData.map(item => item.type)));

// 文档状态
const statusOptions = ['全部', '草稿', '审核中', '已定稿', '已提交', '已归档'];

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('全部');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  
  // 过滤文档
  const filteredDocuments = documentsData.filter(doc => {
    // 类型筛选
    if (typeFilter !== '全部' && doc.type !== typeFilter) return false;
    
    // 状态筛选
    if (statusFilter !== '全部' && doc.status !== statusFilter) return false;
    
    // 搜索筛选
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        doc.title.toLowerCase().includes(searchLower) ||
        doc.client.toLowerCase().includes(searchLower) ||
        doc.description.toLowerCase().includes(searchLower) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });
  
  // 获取选中文档详情
  const selectedDocumentDetails = selectedDocument ? 
    documentsData.find(d => d.id === selectedDocument) : null;
  
  // 状态样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case '草稿':
        return 'bg-yellow-100 text-yellow-800';
      case '审核中':
        return 'bg-blue-100 text-blue-800';
      case '已定稿':
        return 'bg-green-100 text-green-800';
      case '已提交':
        return 'bg-purple-100 text-purple-800';
      case '已归档':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">法律文书与合同</h1>
            <p className="mt-1 text-gray-500">管理法律文书、诉讼文件和合同</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/dashboard/legal-services" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
              返回仪表盘
            </Link>
            <Link href="/dashboard/legal-services/template-center" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
              模板中心
            </Link>
            <Link href="#" className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
              创建新文档
            </Link>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：筛选和文档列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">筛选器</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">搜索文档</label>
                <input
                  type="text"
                  placeholder="输入标题、客户名或标签..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">文档类型</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="全部">全部类型</option>
                  {documentTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">文档状态</label>
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
              <h2 className="text-lg font-medium text-gray-900">文档列表</h2>
              <span className="text-sm text-gray-500">{filteredDocuments.length} 项</span>
            </div>
            
            <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${selectedDocument === doc.id ? 'bg-indigo-50' : ''}`}
                    onClick={() => setSelectedDocument(doc.id)}
                  >
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">{doc.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(doc.status)}`}>
                        {doc.status}
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-500 mb-2">
                      <span>{doc.type}</span>
                      <span className="mx-2">•</span>
                      <span>更新: {doc.updateDate}</span>
                    </div>
                    
                    <div className="text-xs text-gray-500 flex items-center">
                      <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {doc.client}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center mt-1">
                      <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      {doc.createdBy}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  未找到匹配的文档
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 右侧：文档详情 */}
        <div className="lg:col-span-2">
          {selectedDocumentDetails ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-medium text-gray-900">{selectedDocumentDetails.title}</h2>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">文档ID: {selectedDocumentDetails.id}</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-sm text-gray-500">类型: {selectedDocumentDetails.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(selectedDocumentDetails.status)}`}>
                      {selectedDocumentDetails.status}
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
                    <h3 className="text-sm font-medium text-gray-700 mb-3">文档信息</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">状态:</span>
                          <span className={`text-sm font-medium ${getStatusStyle(selectedDocumentDetails.status)}`}>
                            {selectedDocumentDetails.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">创建日期:</span>
                          <span className="text-sm text-gray-900">{selectedDocumentDetails.createDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">最后更新:</span>
                          <span className="text-sm text-gray-900">{selectedDocumentDetails.updateDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">页数:</span>
                          <span className="text-sm text-gray-900">{selectedDocumentDetails.size}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">相关方信息</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">客户:</span>
                          <Link 
                            href={`/dashboard/legal-services/client-profiles?client=${selectedDocumentDetails.clientId}`}
                            className="text-sm text-indigo-600 hover:text-indigo-800"
                          >
                            {selectedDocumentDetails.client}
                          </Link>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">创建者:</span>
                          <span className="text-sm text-gray-900">{selectedDocumentDetails.createdBy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">审批人:</span>
                          <span className="text-sm text-gray-900">{selectedDocumentDetails.approvedBy || '-'}</span>
                        </div>
                        {selectedDocumentDetails.relatedCase && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">相关案件:</span>
                            <Link 
                              href={`/dashboard/legal-services/case-management?case=${selectedDocumentDetails.relatedCase}`}
                              className="text-sm text-indigo-600 hover:text-indigo-800"
                            >
                              {selectedDocumentDetails.relatedCase}
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">文档描述</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{selectedDocumentDetails.description}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">标签</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDocumentDetails.tags.map((tag, index) => (
                      <span key={index} className="px-2.5 py-0.5 bg-gray-100 rounded-full text-xs text-gray-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">文档预览</h3>
                  <p className="mt-1 text-sm text-gray-500">点击下方按钮查看完整文档</p>
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                      查看文档
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 flex justify-between">
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
                      下载
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
                      打印
                    </button>
                    {selectedDocumentDetails.status === '草稿' && (
                      <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
                        提交审核
                      </button>
                    )}
                  </div>
                  {(selectedDocumentDetails.status === '草稿' || selectedDocumentDetails.status === '审核中') && (
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                      编辑文档
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">选择一个文档</h3>
              <p className="mt-1 text-sm text-gray-500">从左侧列表中选择一个文档以查看详情</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 