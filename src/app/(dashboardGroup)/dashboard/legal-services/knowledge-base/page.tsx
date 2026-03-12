"use client";

import { useState } from 'react';
import Link from 'next/link';

// 模拟知识库类别数据
const categoriesData = [
  { id: 'CAT001', name: '法律法规', icon: '📜', count: 45 },
  { id: 'CAT002', name: '案例分析', icon: '⚖️', count: 32 },
  { id: 'CAT003', name: '合同模板', icon: '📝', count: 28 },
  { id: 'CAT004', name: '内部指引', icon: '📌', count: 15 },
  { id: 'CAT005', name: '行业研究', icon: '📊', count: 23 },
  { id: 'CAT006', name: '技术资料', icon: '💻', count: 17 }
];

// 模拟知识库文档数据
const documentsData = [
  {
    id: 'DOC001',
    title: '2024年著作权法实施条例解读',
    category: 'CAT001',
    tags: ['著作权法', 'AI创作', '法规解读'],
    author: '李律师',
    createDate: '2024-06-20',
    viewCount: 230,
    summary: '对新修订的著作权法实施条例进行详细解读，重点分析AI生成内容的著作权归属问题、保护期限调整以及侵权赔偿新标准的适用指引。'
  },
  {
    id: 'DOC002',
    title: '设计行业知识产权实务指南',
    category: 'CAT001',
    tags: ['知识产权', '设计行业', '实务指南'],
    author: '王律师',
    createDate: '2024-05-15',
    viewCount: 315,
    summary: '针对设计行业的知识产权保护实务指南，涵盖作品版权、商标保护、专利申请、侵权判定及预防措施等内容，为设计师提供全面的法律保护参考。'
  },
  {
    id: 'DOC003',
    title: '某电商平台与设计师商标侵权案例分析',
    category: 'CAT002',
    tags: ['商标侵权', '电商平台', '设计师权益'],
    author: '张律师',
    createDate: '2024-07-01',
    viewCount: 178,
    summary: '通过对一起知名电商平台侵犯设计师商标权案件的分析，探讨电商平台的审核责任、设计师维权途径以及司法认定标准，总结实务经验和教训。'
  },
  {
    id: 'DOC004',
    title: '字体侵权集体诉讼案的司法创新与启示',
    category: 'CAT002',
    tags: ['字体侵权', '集体诉讼', '司法创新'],
    author: '陈律师',
    createDate: '2024-06-05',
    viewCount: 142,
    summary: '分析近期字体设计公司提起的集体诉讼案件，探讨该案在批量维权方面的司法创新点，以及对设计领域知识产权保护的深远影响。'
  },
  {
    id: 'DOC005',
    title: '设计服务合同标准模板及条款解析',
    category: 'CAT003',
    tags: ['设计合同', '合同模板', '条款解释'],
    author: '王律师',
    createDate: '2024-04-10',
    viewCount: 420,
    summary: '提供经过实务检验的设计服务合同标准模板，并对关键条款如知识产权归属、验收标准、修改次数、付款方式等进行详细解析，附有条款适用指引。'
  },
  {
    id: 'DOC006',
    title: '保密协议及竞业限制条款最佳实践',
    category: 'CAT003',
    tags: ['保密协议', '竞业限制', '最佳实践'],
    author: '李律师',
    createDate: '2024-03-25',
    viewCount: 285,
    summary: '针对设计行业常见的保密协议与竞业限制安排，提供符合法律规定且保护创作者权益的条款模板，分析常见争议情形及解决方案。'
  },
  {
    id: 'DOC007',
    title: '知识产权侵权案件证据收集指南',
    category: 'CAT004',
    tags: ['证据收集', '侵权诉讼', '内部指引'],
    author: '张律师',
    createDate: '2024-05-30',
    viewCount: 165,
    summary: '详细指导知识产权侵权案件中的证据收集工作，包括侵权证据固定方法、公证取证流程、电子证据保全技巧以及境外证据的使用要点。'
  },
  {
    id: 'DOC008',
    title: '设计师法律风险防范手册',
    category: 'CAT004',
    tags: ['风险防范', '合规指南', '设计师指引'],
    author: '陈律师',
    createDate: '2024-02-15',
    viewCount: 320,
    summary: '为设计师提供全面的法律风险防范指引，涵盖创作过程中的版权考量、商业使用授权范围界定、合同签订注意事项及潜在侵权风险识别与规避。'
  },
  {
    id: 'DOC009',
    title: '中国数字创意产业发展报告2024',
    category: 'CAT005',
    tags: ['数字创意', '产业报告', '市场趋势'],
    author: '研究团队',
    createDate: '2024-07-10',
    viewCount: 210,
    summary: '对中国数字创意产业的最新发展状况进行分析，包括市场规模、行业格局、政策环境、技术创新以及发展趋势预测，为设计行业提供宏观参考。'
  },
  {
    id: 'DOC010',
    title: '全球设计版权保护体系比较研究',
    category: 'CAT005',
    tags: ['国际比较', '版权保护', '设计行业'],
    author: '国际法律部',
    createDate: '2024-04-05',
    viewCount: 135,
    summary: '对美国、欧盟、日本等主要国家和地区的设计作品版权保护体系进行比较研究，分析不同法律体系下的保护强度、维权途径和国际协作机制。'
  },
  {
    id: 'DOC011',
    title: 'AI生成内容的法律属性与权利归属',
    category: 'CAT006',
    tags: ['人工智能', '版权归属', '法律创新'],
    author: '技术法律组',
    createDate: '2024-06-15',
    viewCount: 290,
    summary: '深入分析AI生成内容在现行法律框架下的定位与权利归属问题，探讨人类创作者与AI工具之间的权利边界，并提出实务处理建议。'
  },
  {
    id: 'DOC012',
    title: 'NFT设计作品的法律保护研究',
    category: 'CAT006',
    tags: ['NFT', '区块链', '数字艺术'],
    author: '技术法律组',
    createDate: '2024-05-01',
    viewCount: 175,
    summary: '针对NFT设计作品的特殊性，研究其在传统知识产权法框架下的保护困境与创新空间，分析智能合约的法律效力以及NFT交易中的权利义务关系。'
  }
];

// 模拟最新更新数据
const recentUpdatesData = [
  {
    id: 'UP001',
    title: '最高法关于涉电商平台知识产权纠纷的司法解释发布',
    date: '2024-07-15',
    type: '法规更新',
    description: '该解释明确了电商平台对知识产权侵权的审查义务和免责条件，影响设计作品在线交易的法律保障。'
  },
  {
    id: 'UP002',
    title: '新增三份设计合同模板',
    date: '2024-07-12',
    type: '资源更新',
    description: '增加了UI设计服务合同、品牌设计合同和插画授权协议三个专业模板，满足不同设计领域的需求。'
  },
  {
    id: 'UP003',
    title: '图形商标近似判断标准最新司法实践总结',
    date: '2024-07-08',
    type: '实务指南',
    description: '整理了最近两年图形商标近似判断的主要司法案例，提炼出最新判断标准和考量因素。'
  }
];

// 模拟热门关键词数据
const trendingKeywordsData = [
  { id: 'KW001', text: 'AI生成内容', count: 86 },
  { id: 'KW002', text: '商标侵权', count: 75 },
  { id: 'KW003', text: '字体授权', count: 63 },
  { id: 'KW004', text: '设计合同', count: 58 },
  { id: 'KW005', text: 'NFT', count: 42 },
  { id: 'KW006', text: '肖像权', count: 39 },
  { id: 'KW007', text: '著作权登记', count: 35 },
  { id: 'KW008', text: '侵权赔偿', count: 32 }
];

export default function KnowledgeBasePage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  // 处理标签选择
  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 收集所有标签
  const allTags = Array.from(new Set(documentsData.flatMap(doc => doc.tags)));

  // 过滤文档
  const filteredDocuments = documentsData.filter(doc => {
    // 类别筛选
    if (selectedCategory && doc.category !== selectedCategory) return false;
    
    // 标签筛选
    if (selectedTags.length > 0 && !selectedTags.some(tag => doc.tags.includes(tag))) return false;
    
    // 搜索筛选
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        doc.title.toLowerCase().includes(searchLower) ||
        doc.summary.toLowerCase().includes(searchLower) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        doc.author.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  // 排序文档
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.createDate).getTime() - new Date(a.createDate).getTime();
    } else {
      return b.viewCount - a.viewCount;
    }
  });

  // 根据ID获取文档
  const getDocumentById = (id: string) => {
    return documentsData.find(doc => doc.id === id);
  };

  // 获取选中的文档
  const selectedDocumentData = selectedDocument 
    ? getDocumentById(selectedDocument)
    : null;

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">内部知识库</h1>
            <p className="mt-1 text-gray-500">存储和检索专业知识文档</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/dashboard/legal-services" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
              返回仪表盘
            </Link>
            <Link href="#" className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
              新增文档
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧：筛选和分类 */}
        <div className="lg:col-span-1 space-y-6">
          {/* 搜索框 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索知识库..."
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
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

          {/* 分类列表 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">知识分类</h3>
            </div>
            <div className="divide-y divide-gray-200">
              <div 
                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                  selectedCategory === null ? 'bg-indigo-50' : ''
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="mr-2">📚</span>
                    <span className="text-sm font-medium text-gray-900">所有分类</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {documentsData.length}
                  </span>
                </div>
              </div>
              {categoriesData.map((category) => (
                <div 
                  key={category.id}
                  className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                    selectedCategory === category.id ? 'bg-indigo-50' : ''
                  }`}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="mr-2">{category.icon}</span>
                      <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {category.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 热门标签 */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">热门关键词</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag, index) => (
                <button
                  key={index}
                  className={`px-2 py-1 rounded-full text-xs ${
                    selectedTags.includes(tag)
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => handleTagSelect(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 最新更新 */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">最新更新</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {recentUpdatesData.map((update) => (
                <div key={update.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{update.title}</h4>
                      <div className="mt-1 flex space-x-2 text-xs">
                        <span className="text-gray-500">{update.date}</span>
                        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">
                          {update.type}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500 line-clamp-2">{update.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：文档列表和详情 */}
        <div className="lg:col-span-3">
          {/* 文档详情 */}
          {selectedDocumentData ? (
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedDocumentData.title}</h2>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span className="mr-3">作者: {selectedDocumentData.author}</span>
                      <span className="mr-3">发布于: {selectedDocumentData.createDate}</span>
                      <span>浏览: {selectedDocumentData.viewCount}</span>
                    </div>
                  </div>
                  <button
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setSelectedDocument(null)}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedDocumentData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="py-3 border-t border-b border-gray-200 mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">文档摘要</h3>
                  <p className="text-gray-600">{selectedDocumentData.summary}</p>
                </div>

                <div className="prose max-w-none border-b border-gray-200 pb-6 mb-4">
                  <p className="text-gray-500 text-sm italic">这里将显示完整的文档内容，当前为演示页面，仅显示摘要信息。</p>
                </div>

                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <svg className="mr-1 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      分享
                    </button>
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <svg className="mr-1 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      下载
                    </button>
                  </div>
                  <div>
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <svg className="mr-1 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      编辑
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* 文档列表 */}
          <div className="bg-white rounded-lg shadow">
            <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedCategory 
                  ? `${categoriesData.find(c => c.id === selectedCategory)?.name || ''}` 
                  : '所有文档'}
                {selectedTags.length > 0 && ` (标签: ${selectedTags.join(', ')})`}
              </h3>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">排序:</span>
                <select
                  className="border-none text-sm text-gray-700 font-medium focus:outline-none focus:ring-0 bg-transparent pr-8"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular')}
                >
                  <option value="recent">最新</option>
                  <option value="popular">最热</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {sortedDocuments.length > 0 ? (
                sortedDocuments.map((doc) => {
                  const category = categoriesData.find(c => c.id === doc.category);
                  return (
                    <div
                      key={doc.id}
                      className="p-6 hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedDocument(doc.id)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4 text-2xl">{category?.icon || '📄'}</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{doc.title}</h3>
                          <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500">
                            <span>{category?.name || '未分类'}</span>
                            <span className="mx-2">•</span>
                            <span>作者: {doc.author}</span>
                            <span className="mx-2">•</span>
                            <span>{doc.createDate}</span>
                            <span className="mx-2">•</span>
                            <span>浏览: {doc.viewCount}</span>
                          </div>
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{doc.summary}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {doc.tags.map((tag, index) => (
                              <span
                                key={index}
                                className={`px-2 py-0.5 rounded-full text-xs ${
                                  selectedTags.includes(tag)
                                    ? 'bg-indigo-100 text-indigo-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTagSelect(tag);
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center text-gray-500">
                  未找到匹配的文档
                </div>
              )}
            </div>
            
            {sortedDocuments.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  共 {sortedDocuments.length} 条结果
                </span>
                <div className="flex space-x-1">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                    上一页
                  </button>
                  <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                    下一页
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 