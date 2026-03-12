"use client";

import { useState } from 'react';
import Link from 'next/link';

// 模拟法规更新数据
const regulationsData = [
  {
    id: 'REG001',
    title: '关于加强知识产权保护的规定（2024年修订版）',
    type: '法律法规',
    publishDate: '2024-06-01',
    effectiveDate: '2024-07-01',
    source: '国家知识产权局',
    level: '国家级',
    relevance: '高',
    category: '知识产权',
    description: '此次修订加强了对设计专利权、商标权和著作权的保护力度，明确了侵权行为的认定标准和惩罚措施，对设计行业从业者权益保护具有重要意义。',
    keyPoints: [
      '增加设计专利侵权的赔偿额上限，从50万元提高至500万元',
      '简化知识产权维权程序，提供快速通道处理明显侵权行为',
      '建立知识产权保护协同机制，加强部门联动和信息共享'
    ]
  },
  {
    id: 'REG002',
    title: '设计服务合同示范文本',
    type: '示范文本',
    publishDate: '2024-05-15',
    effectiveDate: '2024-05-15',
    source: '工业和信息化部',
    level: '部级',
    relevance: '高',
    category: '合同示范',
    description: '面向设计服务领域的合同示范文本，规范了设计服务的委托流程、服务内容、成果交付、知识产权归属等核心条款，为设计师提供合规参考。',
    keyPoints: [
      '明确设计成果的交付标准和验收流程',
      '详细规定知识产权归属和使用授权范围',
      '提供阶段性付款方式的推荐安排'
    ]
  },
  {
    id: 'REG003',
    title: '个人信息保护法实施细则',
    type: '法律法规',
    publishDate: '2024-04-10',
    effectiveDate: '2024-05-01',
    source: '国家网信办',
    level: '国家级',
    relevance: '中',
    category: '个人信息保护',
    description: '对《个人信息保护法》的具体实施进行了细化，明确了设计行业收集、处理用户数据的合规要求和隐私保护措施，影响UI/UX设计中的用户体验设计。',
    keyPoints: [
      '规定用户个人信息收集的明示同意要求',
      '明确个人信息跨境传输的安全评估流程',
      '细化个人信息处理者的合规义务和责任'
    ]
  },
  {
    id: 'REG004',
    title: '关于促进设计服务业高质量发展的指导意见',
    type: '政策文件',
    publishDate: '2024-03-20',
    effectiveDate: '2024-03-20',
    source: '文化和旅游部',
    level: '部级',
    relevance: '中',
    category: '产业政策',
    description: '提出了促进设计服务业发展的政策措施，包括税收优惠、人才培养、国际合作等方面的支持政策，为设计行业带来新的发展机遇。',
    keyPoints: [
      '对符合条件的设计企业实施研发费用加计扣除',
      '建立设计服务业人才培养体系和国际交流机制',
      '支持设计服务与制造业、文化产业融合发展'
    ]
  }
];

// 模拟研究资料数据
const researchData = [
  {
    id: 'RS001',
    title: '设计行业著作权保护实务指南',
    type: '研究报告',
    publishDate: '2024-06-15',
    author: '李明律师',
    category: '知识产权',
    tags: ['著作权', '设计作品', '侵权防范'],
    views: 256,
    downloads: 78,
    description: '针对设计行业的著作权保护问题，提供了实用的预防和维权指南，包含案例分析、权利登记流程和常见侵权处理方法。'
  },
  {
    id: 'RS002',
    title: '设计合同纠纷案例解析',
    type: '案例集',
    publishDate: '2024-05-10',
    author: '王强律师',
    category: '合同法律',
    tags: ['合同纠纷', '案例分析', '风险防范'],
    views: 189,
    downloads: 62,
    description: '收集整理了近年来设计领域合同纠纷的典型案例，分析纠纷产生的原因和法院判决依据，为设计师提供合同签订和履行的借鉴。'
  },
  {
    id: 'RS003',
    title: '跨境设计服务法律风险防范白皮书',
    type: '白皮书',
    publishDate: '2024-04-05',
    author: '国际商务法律团队',
    category: '国际业务',
    tags: ['跨境服务', '法律风险', '合规指南'],
    views: 142,
    downloads: 45,
    description: '分析了设计师提供跨境服务可能面临的法律风险，包括知识产权保护差异、支付结算、税务合规等问题，并提供了解决方案。'
  },
  {
    id: 'RS004',
    title: 'UI设计中的隐私保护合规指南',
    type: '指南手册',
    publishDate: '2024-03-18',
    author: '张华律师',
    category: '数据保护',
    tags: ['UI设计', '用户隐私', '合规设计'],
    views: 215,
    downloads: 86,
    description: '结合个人信息保护法等法规要求，提出了UI设计中隐私保护的最佳实践，包括用户同意机制设计、数据收集透明度等方面的建议。'
  }
];

// 资源类别
const resourceTypes = Array.from(new Set([
  ...regulationsData.map(item => item.type),
  ...researchData.map(item => item.type)
]));

// 法规分类
const regulationCategories = Array.from(new Set(regulationsData.map(item => item.category)));

// 研究分类
const researchCategories = Array.from(new Set(researchData.map(item => item.category)));

export default function RegulationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'regulations' | 'research'>('regulations');
  const [typeFilter, setTypeFilter] = useState('全部');
  const [categoryFilter, setCategoryFilter] = useState('全部');
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  
  // 获取适用类别
  const categories = activeTab === 'regulations' 
    ? regulationCategories 
    : researchCategories;
  
  // 筛选当前分类的资源
  const filteredResources = activeTab === 'regulations'
    ? regulationsData.filter(regulation => {
        // 类型筛选
        if (typeFilter !== '全部' && regulation.type !== typeFilter) return false;
        
        // 分类筛选
        if (categoryFilter !== '全部' && regulation.category !== categoryFilter) return false;
        
        // 搜索筛选
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          return (
            regulation.title.toLowerCase().includes(searchLower) ||
            regulation.description.toLowerCase().includes(searchLower) ||
            regulation.source.toLowerCase().includes(searchLower)
          );
        }
        
        return true;
      })
    : researchData.filter(research => {
        // 类型筛选
        if (typeFilter !== '全部' && research.type !== typeFilter) return false;
        
        // 分类筛选
        if (categoryFilter !== '全部' && research.category !== categoryFilter) return false;
        
        // 搜索筛选
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          return (
            research.title.toLowerCase().includes(searchLower) ||
            research.description.toLowerCase().includes(searchLower) ||
            research.tags.some(tag => tag.toLowerCase().includes(searchLower))
          );
        }
        
        return true;
      });
  
  // 获取选中资源详情
  const selectedResourceDetails = selectedResource ? (
    activeTab === 'regulations'
      ? regulationsData.find(r => r.id === selectedResource)
      : researchData.find(r => r.id === selectedResource)
  ) : null;
  
  // 重要性标签样式
  const getRelevanceStyle = (relevance: string) => {
    switch (relevance) {
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
            <h1 className="text-2xl font-bold text-gray-900">法规更新与研究</h1>
            <p className="mt-1 text-gray-500">获取最新法律法规和行业研究资料</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/dashboard/legal-services" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
              返回仪表盘
            </Link>
            <Link href="#" className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
              添加新资源
            </Link>
          </div>
        </div>
      </div>
      
      {/* 分类标签页 */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'regulations' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => {
                setActiveTab('regulations');
                setTypeFilter('全部');
                setCategoryFilter('全部');
                setSelectedResource(null);
              }}
            >
              法律法规更新
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'research' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => {
                setActiveTab('research');
                setTypeFilter('全部');
                setCategoryFilter('全部');
                setSelectedResource(null);
              }}
            >
              研究与分析资料
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：筛选和资源列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">筛选器</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">搜索资源</label>
                <input
                  type="text"
                  placeholder="输入标题、关键词或来源..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">资源类型</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="全部">全部类型</option>
                  {resourceTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">资源分类</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="全部">全部分类</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                {activeTab === 'regulations' ? '法律法规列表' : '研究资料列表'}
              </h2>
              <span className="text-sm text-gray-500">{filteredResources.length} 项</span>
            </div>
            
            <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <div
                    key={resource.id}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${selectedResource === resource.id ? 'bg-indigo-50' : ''}`}
                    onClick={() => setSelectedResource(resource.id)}
                  >
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">{resource.title}</h3>
                      {'relevance' in resource && (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRelevanceStyle(resource.relevance)}`}>
                          {resource.relevance}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-500 mb-2">
                      <span>{resource.type}</span>
                      <span className="mx-2">•</span>
                      <span>发布: {resource.publishDate}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {resource.description}
                    </p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      {'source' in resource ? (
                        <span>{resource.source}</span>
                      ) : (
                        <span>{resource.author}</span>
                      )}
                      
                      {'views' in resource && (
                        <div className="flex items-center">
                          <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {resource.views}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  未找到匹配的资源
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 右侧：资源详情 */}
        <div className="lg:col-span-2">
          {selectedResourceDetails ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-medium text-gray-900">{selectedResourceDetails.title}</h2>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500">资源ID: {selectedResourceDetails.id}</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-sm text-gray-500">类型: {selectedResourceDetails.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {'level' in selectedResourceDetails && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {selectedResourceDetails.level}
                      </span>
                    )}
                    {'relevance' in selectedResourceDetails && (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRelevanceStyle(selectedResourceDetails.relevance)}`}>
                        {selectedResourceDetails.relevance}
                      </span>
                    )}
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
                    <h3 className="text-sm font-medium text-gray-700 mb-3">资源信息</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        {'source' in selectedResourceDetails ? (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">发布机构:</span>
                              <span className="text-sm text-gray-900">{selectedResourceDetails.source}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">发布日期:</span>
                              <span className="text-sm text-gray-900">{selectedResourceDetails.publishDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">生效日期:</span>
                              <span className="text-sm text-gray-900">{selectedResourceDetails.effectiveDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">级别:</span>
                              <span className="text-sm text-gray-900">{selectedResourceDetails.level}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">作者:</span>
                              <span className="text-sm text-gray-900">{selectedResourceDetails.author}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">发布日期:</span>
                              <span className="text-sm text-gray-900">{selectedResourceDetails.publishDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">浏览次数:</span>
                              <span className="text-sm text-gray-900">{selectedResourceDetails.views}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">下载次数:</span>
                              <span className="text-sm text-gray-900">{selectedResourceDetails.downloads}</span>
                            </div>
                          </>
                        )}
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">分类:</span>
                          <span className="text-sm text-gray-900">{selectedResourceDetails.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    {'tags' in selectedResourceDetails ? (
                      <>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">相关标签</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex flex-wrap gap-2">
                            {selectedResourceDetails.tags.map((tag, index) => (
                              <span key={index} className="px-2.5 py-0.5 bg-gray-200 rounded-full text-xs text-gray-800">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">关键要点</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <ul className="list-disc pl-5 space-y-2">
                            {selectedResourceDetails.keyPoints.map((point, index) => (
                              <li key={index} className="text-sm text-gray-700">{point}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                    
                    <div className="mt-4">
                      <button className="w-full flex justify-center items-center px-4 py-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 text-sm">
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        下载完整资源
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">资源详情</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 whitespace-pre-line">{selectedResourceDetails.description}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 flex justify-between">
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
                      分享资源
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
                      添加到收藏
                    </button>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
                    查看相关资源
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">选择一项资源</h3>
              <p className="mt-1 text-sm text-gray-500">从左侧列表中选择一项资源以查看详情</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 