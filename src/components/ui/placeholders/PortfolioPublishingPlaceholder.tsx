import React from 'react';
import Placeholder from '../Placeholder';

interface PortfolioPublishingPlaceholderProps {
  workCount?: number; // 显示的作品数量
  withFilters?: boolean; // 是否显示筛选选项
}

/**
 * 作品集发布占位符组件
 * 用于展示作品发布、编辑和分享功能
 */
const PortfolioPublishingPlaceholder: React.FC<PortfolioPublishingPlaceholderProps> = ({
  workCount = 4,
  withFilters = true,
}) => {
  return (
    <Placeholder 
      title="[作品集发布功能占位符]"
      description="例如：作品上传、编辑、分类和发布功能等。"
      height="min-h-[600px]"
      className="p-0 overflow-hidden"
    >
      <div className="p-6">
        {/* 顶部卡片指标 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">已发布作品</div>
                <div className="text-2xl font-semibold text-gray-800">{Math.floor(Math.random() * 15) + 8}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-green-500 font-medium flex items-center">
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                3
              </span>
              <span className="ml-2">本月新增</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">作品浏览量</div>
                <div className="text-2xl font-semibold text-gray-800">{Math.floor(Math.random() * 800) + 1200}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-green-500 font-medium flex items-center">
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                18%
              </span>
              <span className="ml-2">较上月</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">收藏数</div>
                <div className="text-2xl font-semibold text-gray-800">{Math.floor(Math.random() * 100) + 50}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-green-500 font-medium flex items-center">
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12%
              </span>
              <span className="ml-2">较上月</span>
            </div>
          </div>
        </div>
        
        {/* 上传和筛选按钮 */}
        {withFilters && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-4 md:justify-between items-center">
              <div className="flex space-x-1">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-l-lg text-sm">全部作品</button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm">平面设计</button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm">产品设计</button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-r-lg text-sm">插画艺术</button>
              </div>
              
              <div className="flex space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    placeholder="搜索作品..." 
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
                    disabled
                  />
                </div>
                
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 flex items-center">
                  <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  筛选
                </button>
                
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm flex items-center">
                  <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  上传新作品
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* 作品网格 */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: workCount }).map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  
                  {/* 标签 */}
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${index % 4 === 0 ? 'bg-blue-100 text-blue-800' : 
                        index % 4 === 1 ? 'bg-green-100 text-green-800' : 
                        index % 4 === 2 ? 'bg-purple-100 text-purple-800' :
                        'bg-amber-100 text-amber-800'}
                    `}>
                      {index % 4 === 0 ? '平面设计' : 
                       index % 4 === 1 ? '产品设计' : 
                       index % 4 === 2 ? '插画艺术' :
                       '品牌设计'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {index % 4 === 0 ? '现代品牌识别系统' : 
                     index % 4 === 1 ? '生态友好产品概念' : 
                     index % 4 === 2 ? '城市风景插画系列' :
                     '未来主义海报设计'}
                  </h4>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {index % 4 === 0 ? '为客户开发的现代且独特的品牌标识，包括标志、色彩系统和应用指南。' : 
                     index % 4 === 1 ? '使用可持续材料的创新产品设计，减少环境影响的同时保持美观和功能性。' : 
                     index % 4 === 2 ? '探索城市建筑和自然环境交互的手绘数字插画系列作品。' :
                     '受未来主义艺术流派启发的海报设计，融合几何形状与鲜明色彩。'}
                  </p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <svg className="h-4 w-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="text-xs text-gray-600">
                          {Math.floor(Math.random() * 200) + 50}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="h-4 w-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-xs text-gray-600">
                          {Math.floor(Math.random() * 20) + 5}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      {index % 4 === 0 ? '2天前发布' : 
                       index % 4 === 1 ? '1周前发布' : 
                       index % 4 === 2 ? '2周前发布' :
                       '1月前发布'}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 px-3 py-1.5 bg-indigo-600 text-white rounded text-sm">编辑</button>
                    <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded text-sm">分享</button>
                    <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded text-sm">
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* 添加新作品卡片 */}
            <div className="bg-white border border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-indigo-300 transition-colors cursor-pointer">
              <div className="aspect-w-1 aspect-h-1 flex items-center justify-center">
                <div className="text-center">
                  <svg className="h-12 w-12 mx-auto text-gray-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <p className="text-sm text-gray-500">添加新作品</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 作品集组织和发布工具 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* 作品集组织 */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-4">作品集组织</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">创建作品集</p>
                  <p className="text-xs text-gray-500">将多个作品组织成一个主题集合</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">管理标签</p>
                  <p className="text-xs text-gray-500">为作品添加分类标签</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">排序和布局</p>
                  <p className="text-xs text-gray-500">自定义作品展示顺序和布局方式</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 发布分享 */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-4">发布与分享</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">生成专属页面</p>
                  <p className="text-xs text-gray-500">创建可分享的作品集URL</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">社交媒体分享</p>
                  <p className="text-xs text-gray-500">一键分享到各大社交平台</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">隐私设置</p>
                  <p className="text-xs text-gray-500">控制谁可以查看您的作品</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 统计信息 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">统计分析</h3>
          <div className="h-64 border border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="text-gray-400 mb-2">作品统计图表</div>
              <div className="text-xs text-gray-400">查看作品浏览量、点赞、收藏和分享数据</div>
            </div>
          </div>
        </div>
      </div>
    </Placeholder>
  );
};

export default PortfolioPublishingPlaceholder; 