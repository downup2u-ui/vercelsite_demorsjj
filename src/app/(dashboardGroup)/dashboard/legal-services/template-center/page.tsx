"use client";

import { useState } from 'react';
import Link from 'next/link';

// 模拟模板数据
const templatesData = [
  {
    id: 'TPL001',
    title: '设计服务合同模板',
    type: '合同协议',
    tags: ['设计服务', '合同', '知识产权'],
    updatedAt: '2024-07-10',
    description: '适用于设计师与客户之间的服务合同，涵盖服务内容、交付标准、知识产权归属、付款方式等条款。',
    usage: '签订设计服务项目时使用，保障双方权利义务。'
  },
  {
    id: 'TPL002',
    title: '商标授权协议模板',
    type: '知识产权',
    tags: ['商标', '授权', '知识产权'],
    updatedAt: '2024-07-08',
    description: '用于商标权人授权他人使用商标的协议，明确授权范围、期限、费用及违约责任。',
    usage: '商标授权、品牌合作场景。'
  },
  {
    id: 'TPL003',
    title: '著作权登记申请书模板',
    type: '登记文书',
    tags: ['著作权', '登记', '作品保护'],
    updatedAt: '2024-07-05',
    description: '用于设计作品著作权登记的官方申请表格模板，包含作品信息、权利人信息等。',
    usage: '设计作品著作权登记申请。'
  },
  {
    id: 'TPL004',
    title: '保密协议（NDA）模板',
    type: '合同协议',
    tags: ['保密', 'NDA', '合作'],
    updatedAt: '2024-07-01',
    description: '适用于设计师与客户、合作方之间的信息保密约定，防止商业秘密泄露。',
    usage: '项目合作、外包、雇佣等场景。'
  }
];

const templateTypes = Array.from(new Set(templatesData.map(item => item.type)));

export default function TemplateCenterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('全部');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // 筛选模板
  const filteredTemplates = templatesData.filter(item => {
    if (typeFilter !== '全部' && item.type !== typeFilter) return false;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });

  // 获取选中模板详情
  const selectedDetails = selectedTemplate ?
    templatesData.find(t => t.id === selectedTemplate) : null;

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">文书模板中心</h1>
            <p className="mt-1 text-gray-500">常用法律文书、合同、协议模板一站式管理与下载</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/dashboard/legal-services" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
              返回仪表盘
            </Link>
            <Link href="#" className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
              添加新模板
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：筛选和模板列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">筛选条件</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">搜索模板</label>
                <input
                  type="text"
                  placeholder="输入标题、标签..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">模板类型</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="全部">全部类型</option>
                  {templateTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">模板列表</h2>
              <span className="text-sm text-gray-500">{filteredTemplates.length} 项</span>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${selectedTemplate === item.id ? 'bg-indigo-50' : ''}`}
                    onClick={() => setSelectedTemplate(item.id)}
                  >
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">{item.title}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{item.type}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      <span>更新: {item.updatedAt}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-800">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">未找到匹配的模板</div>
              )}
            </div>
          </div>
        </div>
        {/* 右侧：模板详情 */}
        <div className="lg:col-span-2">
          {selectedDetails ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-medium text-gray-900">{selectedDetails.title}</h2>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">模板ID: {selectedDetails.id}</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-sm text-gray-500">类型: {selectedDetails.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{selectedDetails.type}</span>
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
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">模板描述</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{selectedDetails.description}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">适用场景</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{selectedDetails.usage}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">标签</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDetails.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 bg-gray-200 rounded-full text-xs text-gray-800">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6 flex justify-between">
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">下载模板</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">预览</button>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">编辑模板</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">选择一个模板</h3>
              <p className="mt-1 text-sm text-gray-500">从左侧列表中选择一个模板以查看详情</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 