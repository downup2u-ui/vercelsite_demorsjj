import React from 'react';
import Placeholder from '../Placeholder';

interface TrendsDisplayPlaceholderProps {
  withCharts?: boolean; // 是否显示图表区域
  withNewsCards?: boolean; // 是否显示新闻卡片
}

/**
 * 行业趋势展示占位符组件
 * 用于展示设计行业趋势、市场分析和新闻资讯
 */
const TrendsDisplayPlaceholder: React.FC<TrendsDisplayPlaceholderProps> = ({
  withCharts = true,
  withNewsCards = true,
}) => {
  return (
    <Placeholder 
      title="[行业趋势内容展示占位符]"
      description="例如：趋势分析图表、热门设计风格、市场数据统计等。"
      height="min-h-[600px]"
      className="p-0 overflow-hidden"
    >
      <div className="p-6">
        {/* 标签栏 */}
        <div className="flex flex-wrap mb-8 border-b">
          <button className="px-4 py-2 border-b-2 border-indigo-500 text-indigo-600 font-medium">
            热门趋势
          </button>
          <button className="px-4 py-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
            市场分析
          </button>
          <button className="px-4 py-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
            行业新闻
          </button>
          <button className="px-4 py-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
            设计资讯
          </button>
        </div>
        
        {/* 图表区域 */}
        {withCharts && (
          <div className="mb-10">
            <h3 className="text-lg font-medium text-gray-800 mb-4">趋势概览</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* 趋势图表 1 */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 w-6 bg-gray-200 rounded"></div>
                    <div className="h-6 w-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
                
                {/* 柱状图占位符 */}
                <div className="h-64 flex items-end justify-between p-4 border-b border-gray-200">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-6 bg-indigo-500 rounded-t"
                        style={{
                          height: `${Math.max(20, Math.floor(Math.random() * 150))}px`, 
                          opacity: 0.3 + Math.random() * 0.7
                        }}
                      ></div>
                      <div className="h-3 w-3 bg-gray-200 rounded mt-2"></div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between mt-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
              
              {/* 趋势图表 2 */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-5 bg-gray-200 rounded w-2/5"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 w-6 bg-gray-200 rounded"></div>
                    <div className="h-6 w-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
                
                {/* 圆形图表占位符 */}
                <div className="h-64 flex items-center justify-center">
                  <div className="relative h-48 w-48 rounded-full" style={{ background: 'conic-gradient(from 0deg, rgba(99, 102, 241, 0.8) 0%, rgba(99, 102, 241, 0.4) 25%, rgba(249, 115, 22, 0.7) 25%, rgba(249, 115, 22, 0.4) 50%, rgba(16, 185, 129, 0.7) 50%, rgba(16, 185, 129, 0.4) 75%, rgba(249, 168, 212, 0.7) 75%, rgba(249, 168, 212, 0.4) 100%)' }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-24 w-24 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* 图例 */}
                <div className="flex flex-wrap justify-center mt-2 gap-3">
                  {['bg-indigo-500', 'bg-orange-500', 'bg-emerald-500', 'bg-pink-400'].map((color, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`h-3 w-3 ${color} rounded-full mr-1`}></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 趋势卡片行 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="h-5 bg-gray-200 rounded w-24"></div>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-indigo-100 text-indigo-600' : 
                      index === 1 ? 'bg-emerald-100 text-emerald-600' : 
                      index === 2 ? 'bg-amber-100 text-amber-600' : 
                      'bg-rose-100 text-rose-600'
                    }`}>
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                          index === 0 ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : 
                          index === 1 ? "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" : 
                          index === 2 ? "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" : 
                          "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                        } />
                      </svg>
                    </div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 行业新闻卡片 */}
        {withNewsCards && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">最新行业资讯</h3>
              <button disabled className="text-sm text-indigo-600 hover:text-indigo-800 cursor-not-allowed">查看全部</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow duration-200 border border-gray-200">
                  {/* 新闻图片占位符 */}
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
                    <svg className="h-10 w-10 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  
                  <div className="p-4">
                    {/* 分类标签 */}
                    <div className="text-xs text-indigo-600 font-medium mb-2">
                      {index === 0 ? '市场趋势' : index === 1 ? '设计创新' : '行业活动'}
                    </div>
                    
                    {/* 标题和内容 */}
                    <div className="h-5 bg-gray-200 rounded w-5/6 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                    <div className="h-4 bg-gray-200 rounded w-11/12 mb-3"></div>
                    
                    {/* 时间和来源 */}
                    <div className="flex justify-between text-xs text-gray-500">
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Placeholder>
  );
};

export default TrendsDisplayPlaceholder; 