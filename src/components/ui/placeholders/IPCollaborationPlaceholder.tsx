import React from 'react';
import Placeholder from '../Placeholder';

interface IPCollaborationPlaceholderProps {
  projectCount?: number; // 显示的合作项目数量
  withFilters?: boolean; // 是否显示筛选选项
}

/**
 * 知识产权协作占位符组件
 * 用于展示IP合作项目、协议和管理工具
 */
const IPCollaborationPlaceholder: React.FC<IPCollaborationPlaceholderProps> = ({
  projectCount = 3,
  withFilters = true,
}) => {
  return (
    <Placeholder 
      title="[知识产权协作功能占位符]"
      description="例如：IP授权项目、版权协议管理、收益分配方案等。"
      height="min-h-[600px]"
      className="p-0 overflow-hidden"
    >
      <div className="p-6">
        {/* 顶部卡片指标 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">活跃IP协作</div>
                <div className="text-2xl font-semibold text-gray-800">{Math.floor(Math.random() * 10) + 5}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
          
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">授权作品数量</div>
                <div className="text-2xl font-semibold text-gray-800">{Math.floor(Math.random() * 50) + 20}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-green-500 font-medium flex items-center">
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                8.3%
              </span>
              <span className="ml-2">较上月</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">待审核申请</div>
                <div className="text-2xl font-semibold text-gray-800">{Math.floor(Math.random() * 5) + 2}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-amber-500 font-medium flex items-center">
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                2
              </span>
              <span className="ml-2">本周新增</span>
            </div>
          </div>
        </div>
        
        {/* 筛选选项 */}
        {withFilters && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-4 md:justify-between items-center">
              <div className="flex space-x-1">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-l-lg text-sm">所有协作</button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm">授权中</button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm">待审核</button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-r-lg text-sm">已完成</button>
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
                    placeholder="搜索合作..." 
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
                  新建合作
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* 合作项目列表 */}
        <div className="mb-8">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">项目/IP</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">合作方</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">授权类型</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">起止日期</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">收益分成</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.from({ length: projectCount }).map((_, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-gray-200 flex-shrink-0"></div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {index === 0 ? '夏日限定系列设计' : index === 1 ? '科技风插画集' : '城市几何艺术IP'}
                          </div>
                          <div className="text-xs text-gray-500">#{1000 + index}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {index === 0 ? '某时尚品牌有限公司' : index === 1 ? '科技出版社' : '城市文创产业集团'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {index === 0 ? '服装制造商' : index === 1 ? '出版机构' : '文创企业'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${index === 0 ? 'bg-purple-100 text-purple-800' : 
                          index === 1 ? 'bg-blue-100 text-blue-800' : 
                          'bg-green-100 text-green-800'}
                      `}>
                        {index === 0 ? '商品授权' : index === 1 ? '出版授权' : '多媒体授权'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${index === 0 ? 'bg-green-100 text-green-800' : 
                          index === 1 ? 'bg-amber-100 text-amber-800' : 
                          'bg-gray-100 text-gray-800'}
                      `}>
                        {index === 0 ? '授权中' : index === 1 ? '待审核' : '已完成'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index === 0 ? '2024/07/01 - 2025/06/30' : 
                       index === 1 ? '待定' : 
                       '2023/12/01 - 2024/05/31'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index === 0 ? '15% 销售额' : 
                       index === 1 ? '12% 版税' : 
                       '一次性￥15,000'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900">查看</button>
                        {index === 1 && (
                          <button className="text-green-600 hover:text-green-900">审核</button>
                        )}
                        {index === 0 && (
                          <button className="text-gray-600 hover:text-gray-900">报表</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* 最新动态 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 即将到期合同 */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-4">即将到期合同</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mt-1">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">城市文创IP授权合同</p>
                  <p className="text-xs text-gray-500">30天后到期 (2024/08/15)</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mt-1">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">夏日限定商品授权</p>
                  <p className="text-xs text-gray-500">45天后到期 (2024/08/30)</p>
                </div>
              </div>
              
              <button disabled className="w-full mt-2 text-sm text-indigo-600 hover:text-indigo-800">查看全部</button>
            </div>
          </div>
          
          {/* 最新收益 */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-4">最近收益</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">夏日限定系列收益</p>
                  <p className="text-xs text-gray-500">¥3,456.78 • 2天前</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">科技风插画版税</p>
                  <p className="text-xs text-gray-500">¥1,234.56 • 1周前</p>
                </div>
              </div>
              
              <button disabled className="w-full mt-2 text-sm text-indigo-600 hover:text-indigo-800">查看全部</button>
            </div>
          </div>
          
          {/* IP合作建议 */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-4">IP合作建议</h3>
            <div className="h-32 flex items-center justify-center border border-dashed border-gray-300 rounded-lg mb-4">
              <div className="text-center">
                <div className="text-gray-400 mb-2">暂无可用建议</div>
                <div className="text-xs text-gray-400">基于您的作品数据分析</div>
              </div>
            </div>
            <p className="text-xs text-gray-500">系统会基于您作品的市场表现和近期趋势，提供潜在的IP合作机会和建议。您需要上传更多作品或获得更多市场数据，系统才能给出个性化建议。</p>
          </div>
        </div>
      </div>
    </Placeholder>
  );
};

export default IPCollaborationPlaceholder; 