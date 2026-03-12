"use client";

import { useState } from 'react';
import Link from 'next/link';

// 模拟法规更新数据
const legalUpdatesData = [
  {
    id: 'R001',
    title: '著作权法实施条例修订',
    date: '2024-06-15',
    category: '知识产权法',
    source: '国务院法制办',
    summary: '新修订的著作权法实施条例明确了AI生成内容的著作权保护范围，更新了侵权赔偿标准，并细化了软件著作权保护措施。',
    relevantCases: ['CL001', 'CL005', 'CL008'],
    url: 'https://example.gov.cn/copyright-regulation',
  },
  {
    id: 'R002',
    title: '最高院关于审理侵害商标权民事纠纷案件适用法律若干问题的解释',
    date: '2024-05-20',
    category: '知识产权法',
    source: '最高人民法院',
    summary: '该司法解释对商标侵权判定标准、赔偿金额计算方法、举证责任分配等关键问题提供了明确指导，特别强调了恶意侵权的惩罚性赔偿适用条件。',
    relevantCases: ['CL001', 'CL004'],
    url: 'https://example.court.gov.cn/trademark-interpretation',
  },
  {
    id: 'R003',
    title: '中华人民共和国数据安全法',
    date: '2024-03-10',
    category: '网络安全法',
    source: '全国人大常委会',
    summary: '《数据安全法》明确了数据分类分级制度，建立了数据安全风险评估机制，并对重要数据的处理活动提出了合规要求，对设计数据相关业务有重大影响。',
    relevantCases: [],
    url: 'https://example.gov.cn/data-security-law',
  },
  {
    id: 'R004',
    title: '关于规范设计行业知识产权交易的指导意见',
    date: '2024-04-18',
    category: '行业规范',
    source: '文化和旅游部、国家知识产权局',
    summary: '该指导意见专门针对设计行业知识产权交易提供规范，包括设计作品的权利归属、使用许可范围、合理定价机制等方面的指导，旨在促进设计行业健康发展。',
    relevantCases: ['CL002', 'CL007'],
    url: 'https://example.gov.cn/design-ip-guidelines',
  },
  {
    id: 'R005',
    title: '网络直播营销管理办法',
    date: '2024-02-25',
    category: '电子商务法',
    source: '国家市场监督管理总局',
    summary: '该办法对网络直播营销中的知识产权保护、设计元素使用授权、虚假宣传认定等问题做出规定，并明确了平台责任和主播义务。',
    relevantCases: [],
    url: 'https://example.gov.cn/livestream-marketing-regulations',
  },
];

// 模拟案例研究数据
const caseStudiesData = [
  {
    id: 'CS001',
    title: '某知名设计师vs某电商平台Logo抄袭案',
    date: '2024-05-30',
    court: '北京知识产权法院',
    category: '商标侵权',
    summary: '该案例涉及电商平台使用与知名设计师作品高度相似的Logo。法院认定构成侵权，判定赔偿50万元。该案对判断视觉设计作品实质性相似的标准提供了参考。',
    keyPoints: [
      '视觉设计作品的实质性相似判断标准',
      '商业使用场景下的侵权认定标准',
      '设计作品的商业价值评估方法'
    ],
    relevantRegulations: ['R001', 'R002'],
  },
  {
    id: 'CS002',
    title: '字体侵权索赔集体诉讼案',
    date: '2024-04-15',
    court: '上海市高级人民法院',
    category: '著作权侵权',
    summary: '多家字体设计公司对大量未授权使用商业字体的设计工作室提起集体诉讼。法院支持了原告诉求，确立了字体侵权的判定方法和赔偿计算标准。',
    keyPoints: [
      '商业字体的著作权保护范围',
      '设计作品中字体使用的授权要求',
      '批量侵权案件的赔偿计算方法'
    ],
    relevantRegulations: ['R001'],
  },
  {
    id: 'CS003',
    title: 'AI生成设计作品著作权归属争议案',
    date: '2024-06-02',
    court: '深圳市中级人民法院',
    category: '著作权归属',
    summary: '设计师使用AI工具生成的作品被第三方使用，引发著作权归属争议。法院首次对AI辅助创作的作品著作权问题做出判决，确认设计师对最终作品享有著作权。',
    keyPoints: [
      'AI辅助创作的著作权认定',
      '人工干预程度与创作性判断',
      'AI工具使用协议的法律效力'
    ],
    relevantRegulations: ['R001', 'R003'],
  },
  {
    id: 'CS004',
    title: '设计服务合同违约赔偿案',
    date: '2024-03-25',
    court: '广州市天河区人民法院',
    category: '合同纠纷',
    summary: '设计师完成设计服务后客户拒绝支付剩余费用，并自行修改使用设计作品。法院支持设计师诉求，判定客户支付全部费用并赔偿额外使用损失。',
    keyPoints: [
      '设计服务合同的权利义务界定',
      '设计成果交付标准的认定',
      '客户修改设计作品的授权范围'
    ],
    relevantRegulations: ['R004'],
  },
  {
    id: 'CS005',
    title: '某设计师肖像权被直播平台侵犯案',
    date: '2024-05-10',
    court: '杭州互联网法院',
    category: '肖像权侵权',
    summary: '知名设计师的肖像被直播平台主播未经授权使用于产品宣传。法院认定侵犯肖像权，并结合设计师的知名度和商业价值判定较高赔偿金额。',
    keyPoints: [
      '网络环境下的肖像权保护',
      '设计师个人品牌价值评估',
      '平台与主播的连带责任认定'
    ],
    relevantRegulations: ['R005'],
  },
];

export default function LegalResearchPage() {
  const [activeTab, setActiveTab] = useState<'updates' | 'cases'>('updates');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // 获取所有类别（用于过滤选项）
  const allCategories = Array.from(new Set([
    ...legalUpdatesData.map(update => update.category),
    ...caseStudiesData.map(study => study.category)
  ]));

  // 过滤法规更新数据
  const filteredUpdates = legalUpdatesData.filter(update => {
    if (categoryFilter !== 'all' && update.category !== categoryFilter) return false;
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        update.title.toLowerCase().includes(searchLower) ||
        update.summary.toLowerCase().includes(searchLower) ||
        update.source.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  // 过滤案例研究数据
  const filteredCaseStudies = caseStudiesData.filter(study => {
    if (categoryFilter !== 'all' && study.category !== categoryFilter) return false;
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        study.title.toLowerCase().includes(searchLower) ||
        study.summary.toLowerCase().includes(searchLower) ||
        study.court.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">法规更新与研究</h1>
            <p className="mt-1 text-gray-500">获取最新法律法规和案例研究，提升您的专业知识</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/dashboard/legal-services" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
              返回仪表盘
            </Link>
            <Link href="#" className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
              创建研究笔记
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：筛选和资源列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow space-y-6 p-4">
            {/* 搜索框 */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索法规或案例..."
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

            {/* 内容类型切换 */}
            <div>
              <div className="flex rounded-md shadow-sm">
                <button
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-md ${
                    activeTab === 'updates'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                  onClick={() => setActiveTab('updates')}
                >
                  法规更新
                </button>
                <button
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-md ${
                    activeTab === 'cases'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                  onClick={() => setActiveTab('cases')}
                >
                  案例研究
                </button>
              </div>
            </div>

            {/* 类别筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">法律类别</label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">所有类别</option>
                {allCategories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* 重置按钮 */}
            <div>
              <button
                className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50"
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                }}
              >
                重置筛选条件
              </button>
            </div>
          </div>

          {/* 相关资源推荐 */}
          <div className="mt-6 bg-white rounded-lg shadow p-4">
            <h3 className="font-medium text-gray-900 mb-3">推荐资源</h3>
            <div className="space-y-3">
              <Link href="#" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <h4 className="font-medium text-indigo-600">知识产权保护实务指南</h4>
                <p className="text-sm text-gray-500 mt-1">设计师必读的知识产权保护与维权手册</p>
              </Link>
              <Link href="#" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <h4 className="font-medium text-indigo-600">设计合同标准条款库</h4>
                <p className="text-sm text-gray-500 mt-1">常用设计服务合同条款范本与解析</p>
              </Link>
              <Link href="#" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <h4 className="font-medium text-indigo-600">法律法规订阅服务</h4>
                <p className="text-sm text-gray-500 mt-1">订阅获取设计行业相关法规实时更新</p>
              </Link>
            </div>
          </div>
        </div>

        {/* 右侧：内容列表和详情 */}
        <div className="lg:col-span-2">
          {/* 法规更新列表 */}
          {activeTab === 'updates' && (
            <div className="bg-white rounded-lg shadow">
              <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">法规更新</h3>
                <span className="text-sm text-gray-500">共 {filteredUpdates.length} 条</span>
              </div>

              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {filteredUpdates.length > 0 ? (
                  filteredUpdates.map((update) => (
                    <div
                      key={update.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 ${
                        selectedItem?.id === update.id ? 'bg-indigo-50' : ''
                      }`}
                      onClick={() => setSelectedItem(update)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-900">{update.title}</h4>
                        <span className="text-sm text-gray-500">{update.date}</span>
                      </div>
                      <div className="mt-1 flex items-center">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {update.category}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">{update.source}</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{update.summary}</p>
                      {update.relevantCases.length > 0 && (
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <span>相关案件：</span>
                          <div className="flex flex-wrap gap-1 ml-1">
                            {update.relevantCases.map((caseId, index) => (
                              <Link
                                key={index}
                                href={`/dashboard/legal-services/case-management/${caseId}`}
                                className="text-indigo-600 hover:text-indigo-800"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {caseId}
                                {index < update.relevantCases.length - 1 ? ', ' : ''}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">未找到匹配的法规更新</div>
                )}
              </div>
            </div>
          )}

          {/* 案例研究列表 */}
          {activeTab === 'cases' && (
            <div className="bg-white rounded-lg shadow">
              <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">案例研究</h3>
                <span className="text-sm text-gray-500">共 {filteredCaseStudies.length} 条</span>
              </div>

              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {filteredCaseStudies.length > 0 ? (
                  filteredCaseStudies.map((study) => (
                    <div
                      key={study.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 ${
                        selectedItem?.id === study.id ? 'bg-indigo-50' : ''
                      }`}
                      onClick={() => setSelectedItem(study)}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-900">{study.title}</h4>
                        <span className="text-sm text-gray-500">{study.date}</span>
                      </div>
                      <div className="mt-1 flex items-center">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {study.category}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">{study.court}</span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{study.summary}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">未找到匹配的案例研究</div>
                )}
              </div>
            </div>
          )}

          {/* 选中项详情 */}
          {selectedItem && (
            <div className="mt-6 bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-medium text-gray-900">{selectedItem.title}</h3>
                <span className="text-sm text-gray-500">{selectedItem.date}</span>
              </div>

              {/* 法规更新详情 */}
              {activeTab === 'updates' && (
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                      {selectedItem.category}
                    </span>
                    <span className="text-gray-700">来源: {selectedItem.source}</span>
                  </div>

                  <div className="prose max-w-none text-gray-700 mb-6">
                    <p>{selectedItem.summary}</p>
                  </div>

                  {selectedItem.relevantCases && selectedItem.relevantCases.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">相关案件</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.relevantCases.map((caseId: string, index: number) => (
                          <Link
                            key={index}
                            href={`/dashboard/legal-services/case-management/${caseId}`}
                            className="px-3 py-1 bg-gray-100 text-indigo-600 rounded-full text-sm hover:bg-gray-200"
                          >
                            {caseId}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between">
                    <div>
                      {selectedItem.url && (
                        <Link
                          href={selectedItem.url}
                          target="_blank"
                          className="text-indigo-600 hover:text-indigo-800 flex items-center"
                        >
                          <span>查看原文</span>
                          <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Link href="#" className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
                        添加到收藏
                      </Link>
                      <Link href="#" className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                        创建研究笔记
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* 案例研究详情 */}
              {activeTab === 'cases' && (
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                      {selectedItem.category}
                    </span>
                    <span className="text-gray-700">审理法院: {selectedItem.court}</span>
                  </div>

                  <div className="prose max-w-none text-gray-700 mb-6">
                    <p>{selectedItem.summary}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">关键要点</h4>
                    <ul className="space-y-1">
                      {selectedItem.keyPoints.map((point: string, index: number) => (
                        <li key={index} className="text-gray-600 flex items-start">
                          <span className="mr-2">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedItem.relevantRegulations && selectedItem.relevantRegulations.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">相关法规</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.relevantRegulations.map((regId: string, index: number) => {
                          const regulation = legalUpdatesData.find(r => r.id === regId);
                          return regulation ? (
                            <div
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm cursor-pointer hover:bg-gray-200"
                              onClick={() => {
                                setActiveTab('updates');
                                setSelectedItem(regulation);
                              }}
                            >
                              {regulation.title}
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4 mt-4 flex justify-end space-x-2">
                    <Link href="#" className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
                      添加到收藏
                    </Link>
                    <Link href="#" className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                      应用到案件
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 