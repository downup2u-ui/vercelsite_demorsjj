import React from 'react';
import Placeholder from '../Placeholder';

interface EventCreationPlaceholderProps {
  eventCount?: number; // 显示的活动数量
  withFilters?: boolean; // 是否显示筛选选项
}

/**
 * 活动发起占位符组件
 * 用于展示活动创建、管理和统计功能
 */
const EventCreationPlaceholder: React.FC<EventCreationPlaceholderProps> = ({
  eventCount = 3,
  withFilters = true,
}) => {
  return (
    <Placeholder 
      title="[活动发起功能占位符]"
      description="例如：创建设计活动、工作坊、展览、讲座等。"
      height="min-h-[600px]"
      className="p-0 overflow-hidden"
    >
      <div className="p-6">
        {/* 顶部卡片指标 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">已发布活动</div>
                <div className="text-2xl font-semibold text-gray-800">{Math.floor(Math.random() * 5) + 3}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-green-500 font-medium flex items-center">
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                2
              </span>
              <span className="ml-2">本月新增</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">活动参与人数</div>
                <div className="text-2xl font-semibold text-gray-800">{Math.floor(Math.random() * 500) + 200}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-green-500 font-medium flex items-center">
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                15%
              </span>
              <span className="ml-2">较上月</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">活动收入</div>
                <div className="text-2xl font-semibold text-gray-800">¥{(Math.random() * 10000 + 5000).toFixed(2)}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-green-500 font-medium flex items-center">
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                23%
              </span>
              <span className="ml-2">较上月</span>
            </div>
          </div>
        </div>
        
        {/* 创建按钮和筛选选项 */}
        {withFilters && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-4 md:justify-between items-center">
              <div className="flex space-x-1">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-l-lg text-sm">全部活动</button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm">已发布</button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm">草稿</button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-r-lg text-sm">已结束</button>
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
                    placeholder="搜索活动..." 
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
                  创建新活动
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* 活动卡片列表 */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
            {Array.from({ length: eventCount }).map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {/* 状态标签 */}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${index === 0 ? 'bg-green-100 text-green-800' : 
                        index === 1 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'}
                    `}>
                      {index === 0 ? '进行中' : index === 1 ? '即将开始' : '草稿'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-lg text-gray-800">
                    {index === 0 ? '设计创新工作坊' : index === 1 ? '可持续设计论坛' : '艺术与技术交流会'}
                  </h4>
                  <p className="text-gray-500 text-sm mb-2">
                    {index === 0 ? '2024/08/15 14:00-18:00' : index === 1 ? '2024/09/05 10:00-17:00' : '草稿 - 未设定日期'}
                  </p>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <svg className="h-4 w-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {index === 0 ? '线下 - 上海创意中心' : index === 1 ? '线上' : '待定'}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {index === 0 ? '设计工作坊' : index === 1 ? '论坛' : '交流会'}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      {index === 0 ? '面向设计师' : index === 1 ? '公开活动' : '邀请制'}
                    </span>
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">
                      {index === 0 ? '¥99/人' : index === 1 ? '免费' : '待定'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-sm text-gray-600">
                        {index === 0 ? '已报名: 42/50人' : index === 1 ? '已报名: 108人' : '容量: 待定'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 px-3 py-1.5 bg-indigo-600 text-white rounded text-sm">
                      {index === 2 ? '继续编辑' : '管理活动'}
                    </button>
                    <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded text-sm">
                      {index === 2 ? '预览' : '数据统计'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 活动数据统计 */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">活动数据统计</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 活动参与度图表（占位符） */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <h4 className="text-base font-medium text-gray-700 mb-4">活动参与度</h4>
              <div className="h-64 border border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">活动参与度图表</div>
                  <div className="text-xs text-gray-400">显示各活动的报名率、出席率和互动度</div>
                </div>
              </div>
            </div>
            
            {/* 活动收入分析（占位符） */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <h4 className="text-base font-medium text-gray-700 mb-4">活动收入分析</h4>
              <div className="h-64 border border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">活动收入图表</div>
                  <div className="text-xs text-gray-400">显示各活动的收入、成本和盈利情况</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 活动模板库 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">活动模板库</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px] border border-dashed border-gray-300 rounded-lg p-4 hover:border-indigo-300 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <h5 className="font-medium text-gray-800">设计工作坊</h5>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">热门</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">适用于设计培训、技能交流和项目协作</p>
                <div className="text-xs text-indigo-600">应用模板 →</div>
              </div>
              
              <div className="flex-1 min-w-[200px] border border-dashed border-gray-300 rounded-lg p-4 hover:border-indigo-300 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <h5 className="font-medium text-gray-800">线上讲座</h5>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">简易</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">适用于知识分享、行业洞察和教育培训</p>
                <div className="text-xs text-indigo-600">应用模板 →</div>
              </div>
              
              <div className="flex-1 min-w-[200px] border border-dashed border-gray-300 rounded-lg p-4 hover:border-indigo-300 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <h5 className="font-medium text-gray-800">设计展览</h5>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">专业</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">适用于作品展示、行业交流和品牌推广</p>
                <div className="text-xs text-indigo-600">应用模板 →</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Placeholder>
  );
};

export default EventCreationPlaceholder; 