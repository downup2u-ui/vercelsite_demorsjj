import React from 'react';
import Placeholder from '../Placeholder';

interface CollaborationListPlaceholderProps {
  itemCount?: number; // 显示的邀约项目数量
  withTabs?: boolean; // 是否显示标签页切换
}

/**
 * 合作邀约列表占位符组件
 * 用于展示合作邀约和管理工具
 */
const CollaborationListPlaceholder: React.FC<CollaborationListPlaceholderProps> = ({
  itemCount = 4,
  withTabs = true,
}) => {
  return (
    <Placeholder 
      title="[合作邀约列表和管理工具占位符]"
      description="例如：邀约卡片、状态筛选（待处理、已接受、已拒绝）、沟通记录等。"
      height="min-h-[600px]"
      className="p-0 overflow-hidden"
    >
      <div className="p-6">
        {/* 标签页切换 */}
        {withTabs && (
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-6">
              <button className="border-indigo-500 text-indigo-600 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">
                全部邀约
              </button>
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">
                待处理
              </button>
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">
                已接受
              </button>
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">
                已拒绝
              </button>
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">
                已完成
              </button>
            </nav>
          </div>
        )}
        
        {/* 搜索和筛选 */}
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="搜索项目或合作伙伴..." 
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              disabled
            />
          </div>
          
          <div className="flex-shrink-0">
            <select 
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-500" 
              disabled
            >
              <option>排序方式</option>
              <option>最新邀约</option>
              <option>截止日期</option>
              <option>金额高低</option>
            </select>
          </div>
        </div>
        
        {/* 邀约卡片列表 */}
        <div className="space-y-6">
          {Array.from({ length: itemCount }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow transition-shadow duration-200 overflow-hidden">
              <div className="p-5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  {/* 项目名称和发起方 */}
                  <div>
                    <div className="h-6 bg-gray-200 rounded w-64 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-40"></div>
                  </div>
                  
                  {/* 状态标签 */}
                  <div className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-xs font-medium ${
                    index % 4 === 0 ? 'bg-yellow-100 text-yellow-800' : 
                    index % 4 === 1 ? 'bg-green-100 text-green-800' : 
                    index % 4 === 2 ? 'bg-red-100 text-red-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {index % 4 === 0 ? '待处理' : 
                     index % 4 === 1 ? '已接受' : 
                     index % 4 === 2 ? '已拒绝' : 
                     '已完成'}
                  </div>
                </div>
                
                {/* 合作详情 */}
                <div className="mb-4">
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
                
                {/* 项目详情表格 */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <div className="text-gray-500">合作类型</div>
                    <div className="h-4 bg-gray-200 rounded w-20 mt-1"></div>
                  </div>
                  <div>
                    <div className="text-gray-500">截止日期</div>
                    <div className="h-4 bg-gray-200 rounded w-24 mt-1"></div>
                  </div>
                  <div>
                    <div className="text-gray-500">预计收益</div>
                    <div className="h-4 bg-gray-200 rounded w-16 mt-1"></div>
                  </div>
                  <div>
                    <div className="text-gray-500">项目周期</div>
                    <div className="h-4 bg-gray-200 rounded w-20 mt-1"></div>
                  </div>
                </div>
                
                {/* 操作按钮 */}
                <div className="flex flex-wrap justify-end gap-3 mt-4 border-t pt-4">
                  <button disabled className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-400 cursor-not-allowed">
                    查看详情
                  </button>
                  {index % 4 === 0 && (
                    <>
                      <button disabled className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm opacity-50 cursor-not-allowed">
                        接受邀约
                      </button>
                      <button disabled className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm opacity-50 cursor-not-allowed">
                        婉拒邀约
                      </button>
                    </>
                  )}
                  {index % 4 === 1 && (
                    <button disabled className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm opacity-50 cursor-not-allowed">
                      沟通联系
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 分页占位符 */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button disabled className="px-3 py-1 rounded border border-gray-300 text-gray-400 cursor-not-allowed">上一页</button>
            <button className="px-3 py-1 rounded bg-indigo-600 text-white">1</button>
            <button disabled className="px-3 py-1 rounded border border-gray-300 text-gray-400 cursor-not-allowed">2</button>
            <button disabled className="px-3 py-1 rounded border border-gray-300 text-gray-400 cursor-not-allowed">下一页</button>
          </nav>
        </div>
      </div>
    </Placeholder>
  );
};

export default CollaborationListPlaceholder; 