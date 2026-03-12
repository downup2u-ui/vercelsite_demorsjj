import React from 'react';
import Placeholder from '../Placeholder';

interface LearningResourcesPlaceholderProps {
  courseCount?: number; // 课程数量
  withFilters?: boolean; // 是否显示筛选选项
}

/**
 * 学习资源占位符组件
 * 用于展示设计培训课程、教程和学习资源
 */
const LearningResourcesPlaceholder: React.FC<LearningResourcesPlaceholderProps> = ({
  courseCount = 6,
  withFilters = true,
}) => {
  return (
    <Placeholder 
      title="[学习资源和培训信息占位符]"
      description="例如：培训课程、教程视频、学习路径、交流社区等。"
      height="min-h-[600px]"
      className="p-0 overflow-hidden"
    >
      <div className="p-6">
        {/* 顶部横幅 */}
        <div className="mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl overflow-hidden shadow-lg">
          <div className="px-6 py-8 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 text-white mb-6 md:mb-0 md:pr-8">
              <div className="h-8 bg-white bg-opacity-20 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-white bg-opacity-20 rounded w-full mb-2"></div>
              <div className="h-4 bg-white bg-opacity-20 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-white bg-opacity-20 rounded w-4/6 mb-6"></div>
              <div className="h-10 bg-white bg-opacity-20 rounded-lg w-40"></div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-40 h-40 rounded-full bg-white bg-opacity-10 flex items-center justify-center">
                <svg className="h-20 w-20 text-white opacity-60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* 筛选选项 */}
        {withFilters && (
          <div className="mb-8">
            <div className="flex flex-wrap justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">推荐课程</h2>
              <div className="flex space-x-3">
                <select disabled className="border border-gray-300 rounded px-3 py-1.5 bg-white text-gray-500 text-sm cursor-not-allowed">
                  <option>全部分类</option>
                </select>
                <select disabled className="border border-gray-300 rounded px-3 py-1.5 bg-white text-gray-500 text-sm cursor-not-allowed">
                  <option>难度级别</option>
                </select>
                <select disabled className="border border-gray-300 rounded px-3 py-1.5 bg-white text-gray-500 text-sm cursor-not-allowed">
                  <option>课程类型</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {['全部', '设计基础', 'UI/UX', '产品设计', '3D设计', '品牌设计'].map((tag, index) => (
                <div 
                  key={index} 
                  className={`px-3 py-1 rounded-full text-sm ${index === 0 ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 课程卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {Array.from({ length: courseCount }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow duration-200 border border-gray-200">
              {/* 课程封面图 */}
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="h-12 w-12 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                
                {/* 课程时长 */}
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {Math.floor(Math.random() * 3) + 1}h {Math.floor(Math.random() * 50) + 10}m
                </div>
              </div>
              
              <div className="p-4">
                {/* 标题和等级 */}
                <div className="flex justify-between items-start mb-2">
                  <div className="h-5 bg-gray-200 rounded w-4/5"></div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    index % 3 === 0 ? 'bg-green-100 text-green-700' : 
                    index % 3 === 1 ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {index % 3 === 0 ? '初级' : index % 3 === 1 ? '中级' : '高级'}
                  </div>
                </div>
                
                {/* 描述 */}
                <div className="mb-4">
                  <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-11/12"></div>
                </div>
                
                {/* 统计信息 */}
                <div className="flex text-xs text-gray-500 mb-4">
                  <div className="flex items-center mr-4">
                    <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {Math.floor(Math.random() * 900) + 100}
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    {(Math.random() * 2 + 3).toFixed(1)}
                  </div>
                </div>
                
                {/* 价格和按钮 */}
                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold text-gray-800">
                    {index % 3 === 0 ? '免费' : `¥${Math.floor(Math.random() * 200) + 99}`}
                  </div>
                  <button disabled className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm opacity-80 cursor-not-allowed">
                    查看详情
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 学习路径部分 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">推荐学习路径</h2>
            <button disabled className="text-sm text-indigo-600 hover:text-indigo-800 cursor-not-allowed">查看全部</button>
          </div>
          
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6">
              {/* 路径信息 */}
              <div className="md:w-1/3">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5 mb-6"></div>
                
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div className="h-3 bg-gray-200 rounded w-28"></div>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
                
                <button disabled className="w-full py-2 bg-indigo-600 text-white rounded-lg opacity-80 cursor-not-allowed">
                  开始学习
                </button>
              </div>
              
              {/* 路径步骤 */}
              <div className="md:w-2/3">
                <div className="relative pl-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="mb-6 relative">
                      <div className="absolute left-[-30px] top-0 w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 社区专区 */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">设计社区</h2>
            <button disabled className="text-sm text-indigo-600 hover:text-indigo-800 cursor-not-allowed">查看更多</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow duration-200 border border-gray-200 p-4">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-11/12 mb-3"></div>
                <div className="flex justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    {Math.floor(Math.random() * 50) + 5}
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Placeholder>
  );
};

export default LearningResourcesPlaceholder; 