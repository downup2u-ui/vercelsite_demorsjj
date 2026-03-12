import React from 'react';
import Placeholder from '../Placeholder';

interface ResourcesManagerPlaceholderProps {
  withSidebar?: boolean; // 是否显示侧边栏分类
  itemCount?: number; // 资源项目数量
}

/**
 * 设计资源管理占位符组件
 * 用于展示设计资源库、分类管理和链接收藏功能
 */
const ResourcesManagerPlaceholder: React.FC<ResourcesManagerPlaceholderProps> = ({
  withSidebar = true,
  itemCount = 8,
}) => {
  return (
    <Placeholder 
      title="[设计资源管理区域占位符]"
      description="例如：分类链接、素材预览、标签筛选、笔记编辑器等。"
      height="min-h-[600px]"
      className="p-0 overflow-hidden"
    >
      <div className="flex h-full">
        {/* 资源分类侧边栏 */}
        {withSidebar && (
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 hidden md:block">
            <div className="mb-6">
              <div className="h-8 bg-gray-200 rounded-lg w-full mb-4"></div>
              <div className="space-y-2">
                {['全部资源', '收藏链接', '设计素材', '工具软件', '教程资源', '字体资源', '灵感收集'].map((_, index) => (
                  <div 
                    key={index} 
                    className={`h-8 flex items-center px-3 rounded-lg ${index === 0 ? 'bg-indigo-50 border-l-4 border-indigo-500' : 'bg-transparent hover:bg-gray-100'}`}
                  >
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <div className="h-5 bg-gray-200 rounded w-20 mb-3"></div>
              <div className="space-y-2">
                {['最近添加', '常用资源', '待整理'].map((_, index) => (
                  <div key={index} className="h-7 flex items-center px-3 rounded hover:bg-gray-100">
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="h-5 bg-gray-200 rounded w-20 mb-3"></div>
              <div className="space-y-2">
                {['设计', 'UI/UX', '3D模型', '插画'].map((_, index) => (
                  <div key={index} className="h-7 flex items-center px-3 rounded hover:bg-gray-100">
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* 资源内容主区域 */}
        <div className="flex-1 p-6">
          {/* 顶部搜索和操作栏 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="搜索资源..." 
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled
              />
            </div>
            
            <div className="flex space-x-2">
              <button disabled className="bg-white border border-gray-300 px-3 py-2 rounded-lg text-gray-500 flex items-center space-x-1 cursor-not-allowed">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>筛选</span>
              </button>
              
              <button disabled className="bg-indigo-600 text-white px-3 py-2 rounded-lg flex items-center space-x-1 cursor-not-allowed opacity-90">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>添加资源</span>
              </button>
            </div>
          </div>
          
          {/* 标签筛选条 */}
          <div className="mb-6 flex flex-wrap gap-2">
            <div className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center">
              <span>全部</span>
            </div>
            {['链接', '图片', '文档', '视频'].map((tag, index) => (
              <div key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center">
                <span>{tag}</span>
              </div>
            ))}
          </div>
          
          {/* 资源卡片网格 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: itemCount }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow transition-shadow duration-200">
                {/* 卡片顶部(图片或图标) */}
                <div 
                  className={index % 4 >= 2 ? "h-32 bg-gray-200 flex items-center justify-center" : "h-0"}
                >
                  {index % 4 >= 2 && (
                    <svg className="h-10 w-10 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                
                {/* 卡片内容 */}
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    {/* 资源类型图标 */}
                    <div 
                      className={`h-8 w-8 rounded-lg flex items-center justify-center mr-2 ${
                        index % 4 === 0 ? 'bg-blue-100 text-blue-600' : 
                        index % 4 === 1 ? 'bg-emerald-100 text-emerald-600' : 
                        index % 4 === 2 ? 'bg-amber-100 text-amber-600' : 
                        'bg-purple-100 text-purple-600'
                      }`}
                    >
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                          index % 4 === 0 ? "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" : 
                          index % 4 === 1 ? "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" : 
                          index % 4 === 2 ? "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" : 
                          "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        } />
                      </svg>
                    </div>
                    
                    {/* 资源标题 */}
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  
                  {/* 资源描述 */}
                  {index % 2 === 0 && (
                    <div className="mb-3">
                      <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                    </div>
                  )}
                  
                  {/* 标签和日期 */}
                  <div className="flex justify-between items-center mt-2 text-xs">
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 底部分页 */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button disabled className="px-3 py-1 rounded border border-gray-300 text-gray-400 cursor-not-allowed">上一页</button>
              <button className="px-3 py-1 rounded bg-indigo-600 text-white">1</button>
              <button disabled className="px-3 py-1 rounded border border-gray-300 text-gray-400 cursor-not-allowed">2</button>
              <button disabled className="px-3 py-1 rounded border border-gray-300 text-gray-400 cursor-not-allowed">3</button>
              <button disabled className="px-3 py-1 rounded border border-gray-300 text-gray-400 cursor-not-allowed">下一页</button>
            </nav>
          </div>
        </div>
      </div>
    </Placeholder>
  );
};

export default ResourcesManagerPlaceholder; 