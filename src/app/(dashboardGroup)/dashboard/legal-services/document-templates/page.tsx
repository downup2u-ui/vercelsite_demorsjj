"use client";

import { useState } from 'react';
import Link from 'next/link';

// 模拟文书模板数据
const templateCategories = [
  { id: 'contract', name: '合同模板' },
  { id: 'litigation', name: '诉讼文书' },
  { id: 'ip', name: '知识产权' },
  { id: 'corporate', name: '公司业务' },
  { id: 'labor', name: '劳动关系' },
  { id: 'other', name: '其他文书' },
];

const templateData = [
  {
    id: 'T001',
    title: '设计服务合同',
    category: 'contract',
    format: 'Word',
    lastUpdated: '2024-05-15',
    createdBy: '李律师',
    description: '适用于设计师提供设计服务的标准合同模板，包含服务范围、交付时间、费用支付和知识产权保护条款。',
    popularity: 32,
    version: '2.1',
    tags: ['设计', '服务合同', '知识产权'],
  },
  {
    id: 'T002',
    title: '保密协议(NDA)',
    category: 'contract',
    format: 'Word',
    lastUpdated: '2024-06-10',
    createdBy: '王律师',
    description: '标准保密协议模板，适用于设计师与客户之间的信息保护，包含保密范围、期限和违约责任条款。',
    popularity: 45,
    version: '1.3',
    tags: ['保密', 'NDA', '商业秘密'],
  },
  {
    id: 'T003',
    title: '商标侵权起诉状',
    category: 'litigation',
    format: 'Word',
    lastUpdated: '2024-04-22',
    createdBy: '张律师',
    description: '针对商标侵权行为的民事起诉状模板，包含原告信息、被告信息、事实与理由、诉讼请求等部分。',
    popularity: 18,
    version: '2.0',
    tags: ['商标', '侵权', '诉讼'],
  },
  {
    id: 'T004',
    title: '著作权登记申请表',
    category: 'ip',
    format: 'PDF',
    lastUpdated: '2024-07-05',
    createdBy: '赵律师',
    description: '用于著作权登记的标准申请表格，包含作品信息、权利人信息和申请声明等内容。',
    popularity: 27,
    version: '1.1',
    tags: ['著作权', '登记', '申请'],
  },
  {
    id: 'T005',
    title: '设计作品授权协议',
    category: 'ip',
    format: 'Word',
    lastUpdated: '2024-06-30',
    createdBy: '李律师',
    description: '针对设计作品的授权使用协议，明确授权范围、使用方式、期限和费用等条款。',
    popularity: 23,
    version: '1.2',
    tags: ['设计', '授权', '知识产权'],
  },
  {
    id: 'T006',
    title: '商业合作协议',
    category: 'corporate',
    format: 'Word',
    lastUpdated: '2024-06-18',
    createdBy: '陈律师',
    description: '规范商业合作关系的协议模板，包含合作内容、权责划分、利益分配和争议解决等条款。',
    popularity: 19,
    version: '2.4',
    tags: ['商业', '合作', '协议'],
  },
  {
    id: 'T007',
    title: '雇佣合同',
    category: 'labor',
    format: 'Word',
    lastUpdated: '2024-05-28',
    createdBy: '王律师',
    description: '标准雇佣合同模板，适用于设计公司与员工之间的劳动关系，包含工作职责、薪酬福利、知识产权归属等条款。',
    popularity: 31,
    version: '3.0',
    tags: ['雇佣', '劳动', '合同'],
  },
  {
    id: 'T008',
    title: '设计作品版权声明',
    category: 'other',
    format: 'PDF',
    lastUpdated: '2024-07-12',
    createdBy: '张律师',
    description: '用于设计作品的版权声明文本，明确作品权利归属和未授权使用的责任。',
    popularity: 14,
    version: '1.0',
    tags: ['版权', '声明', '设计'],
  },
  {
    id: 'T009',
    title: '侵权警告函',
    category: 'litigation',
    format: 'Word',
    lastUpdated: '2024-06-05',
    createdBy: '赵律师',
    description: '针对侵犯知识产权行为的正式警告函模板，要求停止侵权并提出相应赔偿要求。',
    popularity: 22,
    version: '1.5',
    tags: ['侵权', '警告', '知识产权'],
  },
  {
    id: 'T010',
    title: '设计项目合同终止协议',
    category: 'contract',
    format: 'Word',
    lastUpdated: '2024-06-25',
    createdBy: '李律师',
    description: '用于终止设计项目合同的协议模板，明确双方责任和后续安排。',
    popularity: 12,
    version: '1.1',
    tags: ['合同', '终止', '设计'],
  },
];

export default function DocumentTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'name'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // 过滤并排序模板
  const filteredTemplates = templateData.filter(template => {
    // 类别筛选
    if (selectedCategory !== 'all' && template.category !== selectedCategory) {
      return false;
    }
    
    // 搜索筛选
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        template.title.toLowerCase().includes(searchLower) ||
        template.description.toLowerCase().includes(searchLower) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  }).sort((a, b) => {
    // 排序
    if (sortBy === 'popular') {
      return b.popularity - a.popularity;
    }
    if (sortBy === 'newest') {
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    }
    if (sortBy === 'name') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
  
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">文书模板</h1>
        <p className="mt-1 text-gray-500">浏览和使用法律文书模板，快速生成标准法律文件</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧：筛选器和类别 */}
        <div className="lg:col-span-1 space-y-6">
          {/* 搜索框 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索模板..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          
          {/* 类别菜单 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">文书类别</h3>
            </div>
            
            <div className="divide-y divide-gray-200">
              <button
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${selectedCategory === 'all' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700'}`}
                onClick={() => setSelectedCategory('all')}
              >
                所有类别
              </button>
              
              {templateCategories.map((category) => (
                <button
                  key={category.id}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${selectedCategory === category.id ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700'}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* 创建新模板按钮 */}
          <button className="w-full bg-indigo-600 text-white rounded-lg py-2 px-4 hover:bg-indigo-700 transition-colors flex items-center justify-center">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            创建新模板
          </button>
        </div>
        
        {/* 右侧：模板列表 */}
        <div className="lg:col-span-3 space-y-6">
          {/* 排序和视图控制 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">排序:</span>
                <button
                  className={`px-3 py-1 text-sm rounded-md ${sortBy === 'popular' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setSortBy('popular')}
                >
                  最常用
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-md ${sortBy === 'newest' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setSortBy('newest')}
                >
                  最新更新
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-md ${sortBy === 'name' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setSortBy('name')}
                >
                  名称
                </button>
              </div>
              
              <div className="flex space-x-2">
                <button
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setViewMode('list')}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* 模板网格视图 */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => (
                  <div key={template.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-1">{template.title}</h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>{template.format}</span>
                            <span className="mx-1.5">•</span>
                            <span>版本 {template.version}</span>
                          </div>
                        </div>
                        {template.format === 'Word' ? (
                          <div className="bg-blue-100 p-2 rounded">
                            <svg className="h-6 w-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                            </svg>
                          </div>
                        ) : (
                          <div className="bg-red-100 p-2 rounded">
                            <svg className="h-6 w-6 text-red-700" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4">{template.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {template.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-500">
                          更新于 {template.lastUpdated}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          被使用 {template.popularity} 次
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-3">
                        <button className="flex-1 bg-indigo-600 text-white text-sm rounded-md py-2 hover:bg-indigo-700 transition-colors">
                          使用模板
                        </button>
                        <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                          <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                          <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-white rounded-lg shadow p-8 text-center">
                  <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">未找到模板</h3>
                  <p className="text-gray-500">
                    没有符合当前筛选条件的文书模板。请尝试调整搜索条件或类别筛选。
                  </p>
                </div>
              )}
            </div>
          ) : (
            // 模板列表视图
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 grid grid-cols-12 text-sm font-medium text-gray-500">
                <div className="col-span-5">文书名称</div>
                <div className="col-span-3">最后更新</div>
                <div className="col-span-2">类型</div>
                <div className="col-span-2 text-right">操作</div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map((template) => (
                    <div key={template.id} className="px-6 py-4 hover:bg-gray-50 grid grid-cols-12 items-center">
                      <div className="col-span-5">
                        <div className="flex items-center">
                          {template.format === 'Word' ? (
                            <div className="bg-blue-100 p-2 rounded mr-3">
                              <svg className="h-5 w-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                              </svg>
                            </div>
                          ) : (
                            <div className="bg-red-100 p-2 rounded mr-3">
                              <svg className="h-5 w-5 text-red-700" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                              </svg>
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-gray-900">{template.title}</div>
                            <div className="text-xs text-gray-500 mt-1">版本 {template.version} • 被使用 {template.popularity} 次</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-3 text-sm text-gray-500">
                        {template.lastUpdated} (由 {template.createdBy})
                      </div>
                      
                      <div className="col-span-2">
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {templateCategories.find(c => c.id === template.category)?.name || template.category}
                        </span>
                      </div>
                      
                      <div className="col-span-2 flex justify-end space-x-2">
                        <button className="p-2 text-indigo-600 hover:text-indigo-800">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-2 text-indigo-600 hover:text-indigo-800">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                        <button className="p-2 text-indigo-600 hover:text-indigo-800">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-12 text-center">
                    <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">未找到模板</h3>
                    <p className="text-gray-500">
                      没有符合当前筛选条件的文书模板。请尝试调整搜索条件或类别筛选。
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 