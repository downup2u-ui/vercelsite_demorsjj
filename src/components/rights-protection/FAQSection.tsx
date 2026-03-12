import React, { useState } from 'react';

// FAQ条目接口
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// 组件属性
interface FAQSectionProps {
  faqs: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // 切换FAQ项展开/折叠
  const toggleItem = (id: string) => {
    setOpenItemId(openItemId === id ? null : id);
  };
  
  // 提取所有可用的类别
  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];
  
  // 过滤FAQ列表
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-8">
      {/* 搜索和分类筛选 */}
      <div className="space-y-4">
        <div>
          <label htmlFor="faq-search" className="sr-only">搜索常见问题</label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="faq-search"
              type="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="搜索常见问题..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* 类别筛选 */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                activeCategory === category 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? '全部' : category}
            </button>
          ))}
        </div>
      </div>
      
      {/* FAQ列表 */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3 className="mt-2 text-base font-medium text-gray-900">未找到相关问题</h3>
            <p className="mt-1 text-sm text-gray-500">
              请尝试不同的搜索词或筛选类别
            </p>
          </div>
        ) : (
          <div className="border rounded-md divide-y divide-gray-200">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="bg-white">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-4 py-5 flex justify-between items-center text-left focus:outline-none"
                >
                  <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                  <span className="ml-6 flex-shrink-0">
                    {openItemId === faq.id ? (
                      <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                </button>
                {openItemId === faq.id && (
                  <div className="px-4 pb-5">
                    <div className="text-sm text-gray-700 prose max-w-none">
                      {/* 显示带格式的答案 */}
                      <div dangerouslySetInnerHTML={{ __html: faq.answer.replace(/\n/g, '<br/>') }} />
                    </div>
                    <div className="mt-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* 未找到答案的提示 */}
      <div className="bg-blue-50 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-blue-700">
              没有找到您需要的答案？请联系我们的知识产权顾问获取专业帮助。
            </p>
            <p className="mt-3 text-sm md:mt-0 md:ml-6">
              <a href="mailto:ip-help@example.com" className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
                联系我们
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection; 