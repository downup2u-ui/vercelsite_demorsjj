import React from 'react';
import Placeholder from '../Placeholder';

interface PortfolioGridPlaceholderProps {
  itemCount?: number; // 显示的占位项目数量
  withUploadButton?: boolean; // 是否显示上传按钮
  withFilters?: boolean; // 是否显示筛选选项
}

/**
 * 作品集网格占位符组件
 * 用于作品集展示区域的占位显示，包括作品卡片网格、上传按钮和分类筛选区
 */
const PortfolioGridPlaceholder: React.FC<PortfolioGridPlaceholderProps> = ({
  itemCount = 6,
  withUploadButton = true,
  withFilters = true,
}) => {
  return (
    <Placeholder 
      title="[作品集展示区域占位符]"
      description="例如：作品卡片网格、图片/视频预览、上传按钮、分类筛选等。"
      height="min-h-[600px]"
      className="p-0 overflow-hidden"
    >
      <div className="p-6">
        {/* 筛选和上传按钮区域 */}
        {withFilters && (
          <div className="flex flex-wrap justify-between items-center mb-8 p-4 border-b border-gray-100">
            <div className="flex space-x-2 mb-3 sm:mb-0">
              <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                全部
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                平面设计
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                工业设计
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                数字插画
              </button>
            </div>
            
            {withUploadButton && (
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                上传新作品
              </button>
            )}
          </div>
        )}
        
        {/* 作品卡片网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: itemCount }).map((_, index) => (
            <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="flex justify-between items-center mt-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-8"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 分页占位符 */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded border border-gray-300 text-gray-400">上一页</button>
            <button className="px-3 py-1 rounded bg-indigo-600 text-white">1</button>
            <button className="px-3 py-1 rounded border border-gray-300 text-gray-400">2</button>
            <button className="px-3 py-1 rounded border border-gray-300 text-gray-400">3</button>
            <span className="px-2 text-gray-400">...</span>
            <button className="px-3 py-1 rounded border border-gray-300 text-gray-400">10</button>
            <button className="px-3 py-1 rounded border border-gray-300 text-gray-400">下一页</button>
          </nav>
        </div>
      </div>
    </Placeholder>
  );
};

export default PortfolioGridPlaceholder; 