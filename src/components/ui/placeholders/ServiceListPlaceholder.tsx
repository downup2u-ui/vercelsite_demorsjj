import React from 'react';
import Placeholder from '../Placeholder';

interface ServiceListPlaceholderProps {
  itemCount?: number; // 显示的服务项目数量
  withFilters?: boolean; // 是否显示筛选选项
}

/**
 * 服务列表占位符组件
 * 用于展示服务商列表、筛选和搜索功能
 */
const ServiceListPlaceholder: React.FC<ServiceListPlaceholderProps> = ({
  itemCount = 4,
  withFilters = true,
}) => {
  return (
    <Placeholder 
      title="[服务商列表与筛选占位符]"
      description="例如：服务商卡片、服务类别筛选、地区筛选、评价系统等。"
      height="min-h-[600px]"
      className="p-0 overflow-hidden"
    >
      <div className="p-6">
        {/* 搜索和筛选区域 */}
        {withFilters && (
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
              {/* 搜索框 */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  placeholder="搜索服务商或服务类型..." 
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  disabled
                />
              </div>
              
              {/* 排序下拉菜单 */}
              <div className="flex-shrink-0">
                <select 
                  className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-500" 
                  disabled
                >
                  <option>按评分排序</option>
                  <option>按价格排序</option>
                  <option>按距离排序</option>
                </select>
              </div>
            </div>
            
            {/* 筛选选项 */}
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                全部服务
              </div>
              <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                3D打印
              </div>
              <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                材料供应
              </div>
              <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                3D扫描
              </div>
              <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                产品摄影
              </div>
              <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                包装设计
              </div>
            </div>
          </div>
        )}
        
        {/* 服务商卡片列表 */}
        <div className="space-y-6">
          {Array.from({ length: itemCount }).map((_, index) => (
            <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
              <div className="flex flex-col md:flex-row gap-6">
                {/* 服务商头像/Logo */}
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 md:h-28 md:w-28 bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg className="h-10 w-10 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                
                {/* 服务商信息 */}
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 rounded w-4/12 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-11/12 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-8/12 mb-4"></div>
                  
                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                  
                  {/* 底部评分和按钮 */}
                  <div className="flex flex-wrap justify-between items-center mt-2">
                    <div className="flex items-center">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <svg key={starIndex} className="h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-10 ml-2"></div>
                    </div>
                    
                    <button disabled className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium opacity-50 cursor-not-allowed">
                      联系服务商
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 加载更多按钮 */}
        <div className="mt-8 text-center">
          <button disabled className="px-6 py-2 border border-gray-300 rounded-lg text-gray-400 hover:bg-gray-50 transition-colors duration-200 cursor-not-allowed">
            加载更多服务商
          </button>
        </div>
      </div>
    </Placeholder>
  );
};

export default ServiceListPlaceholder; 