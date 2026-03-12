"use client";

import { useState } from 'react';
import Link from 'next/link';

// 模拟版权数据
const copyrightData = [
  { 
    id: 'CR001', 
    workTitle: '流动的色彩 - 交互设计集',
    workType: '美术作品',
    authors: ['张艺林', '李明哲'],
    creationDate: '2023-03-15',
    registrationNumber: '国作登字-2023-F-12345678',
    registrationDate: '2023-05-20',
    status: '已登记',
    certificate: true
  },
  { 
    id: 'CR002', 
    workTitle: '未来界面设计指南 3.0',
    workType: '文字作品',
    authors: ['王科技'],
    creationDate: '2023-06-10',
    registrationNumber: '国作登字-2023-A-23456789',
    registrationDate: '2023-07-25',
    status: '已登记',
    certificate: true
  },
  { 
    id: 'CR003', 
    workTitle: '数字艺术互动展示平台',
    workType: '计算机软件',
    authors: ['刘创新', '陈技术', '张程序'],
    creationDate: '2023-09-05',
    registrationNumber: '软著登字-2023-SR654321',
    registrationDate: '2023-11-15',
    status: '已登记',
    certificate: true
  },
  { 
    id: 'CR004', 
    workTitle: '创意设计实践方法论',
    workType: '文字作品',
    authors: ['赵教授'],
    creationDate: '2024-01-20',
    registrationNumber: null,
    registrationDate: null,
    status: '审核中',
    certificate: false
  },
  { 
    id: 'CR005', 
    workTitle: '数字时代的品牌视觉语言',
    workType: '美术作品',
    authors: ['林设计', '吴视觉'],
    creationDate: '2024-02-28',
    registrationNumber: null,
    registrationDate: null,
    status: '审核中',
    certificate: false
  },
  { 
    id: 'CR006', 
    workTitle: '智能UI组件库',
    workType: '计算机软件',
    authors: ['郑前端'],
    creationDate: '2024-03-10',
    registrationNumber: null,
    registrationDate: null,
    status: '材料准备中',
    certificate: false
  },
  { 
    id: 'CR007', 
    workTitle: '沉浸式用户体验设计',
    workType: '文字作品',
    authors: ['孙体验', '钱交互'],
    creationDate: '2024-04-05',
    registrationNumber: null,
    registrationDate: null,
    status: '材料准备中',
    certificate: false
  },
];

// 模拟版权登记进度
const registrationSteps = {
  '材料准备中': 1,
  '已提交': 2,
  '审核中': 3,
  '已登记': 4
};

export default function CopyrightRegistrationPage() {
  const [filter, setFilter] = useState('all');
  const [workType, setWorkType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // 过滤数据
  const filteredData = copyrightData.filter(item => {
    // 状态筛选
    if (filter !== 'all' && item.status !== filter) return false;
    
    // 作品类型筛选
    if (workType !== 'all' && item.workType !== workType) return false;
    
    // 搜索筛选
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.workTitle.toLowerCase().includes(searchLower) ||
        item.authors.some(author => author.toLowerCase().includes(searchLower)) ||
        (item.registrationNumber && item.registrationNumber.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });
  
  // 统计数据
  const statsData = {
    total: copyrightData.length,
    registered: copyrightData.filter(item => item.status === '已登记').length,
    inProgress: copyrightData.filter(item => ['审核中', '已提交'].includes(item.status)).length,
    preparation: copyrightData.filter(item => item.status === '材料准备中').length
  };
  
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">版权登记</h1>
        <p className="mt-1 text-gray-500">管理和申请您的作品版权登记</p>
      </div>
      
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">全部作品</p>
              <p className="text-xl font-bold text-gray-900">{statsData.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">已登记</p>
              <p className="text-xl font-bold text-gray-900">{statsData.registered}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">审核处理中</p>
              <p className="text-xl font-bold text-gray-900">{statsData.inProgress}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">材料准备中</p>
              <p className="text-xl font-bold text-gray-900">{statsData.preparation}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 操作和筛选控件 */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              新增版权登记
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
              批量导入
            </button>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索作品..."
                className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
            >
              <option value="all">全部作品类型</option>
              <option value="文字作品">文字作品</option>
              <option value="美术作品">美术作品</option>
              <option value="计算机软件">计算机软件</option>
            </select>
          </div>
        </div>
        
        {/* 状态过滤按钮 */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button 
            className={`px-3 py-1.5 rounded-md ${filter === 'all' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setFilter('all')}
          >
            全部状态
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md ${filter === '已登记' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setFilter('已登记')}
          >
            已登记
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md ${filter === '审核中' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setFilter('审核中')}
          >
            审核中
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md ${filter === '已提交' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setFilter('已提交')}
          >
            已提交
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md ${filter === '材料准备中' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => setFilter('材料准备中')}
          >
            材料准备中
          </button>
        </div>
      </div>
      
      {/* 版权列表 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  作品信息
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  作品类型
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  作者
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  创作日期
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  登记状态
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-indigo-600">{item.workTitle}</div>
                      {item.registrationNumber && (
                        <div className="text-xs text-gray-500">
                          登记号: {item.registrationNumber}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.workType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.authors.join(', ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.creationDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                          item.status === '已登记' ? 'bg-green-100 text-green-800' : 
                          item.status === '审核中' ? 'bg-blue-100 text-blue-800' : 
                          item.status === '已提交' ? 'bg-purple-100 text-purple-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status}
                        </span>
                        
                        {item.registrationDate && (
                          <span className="ml-2 text-xs text-gray-500">
                            ({item.registrationDate})
                          </span>
                        )}
                      </div>
                      
                      {/* 登记进度条 */}
                      {item.status !== '已登记' && (
                        <div className="mt-2 w-full h-1.5 bg-gray-200 rounded overflow-hidden">
                          <div 
                            className="h-1.5 bg-indigo-600 rounded" 
                            style={{ width: `${(registrationSteps[item.status] / 4) * 100}%` }}
                          ></div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={`/dashboard/intellectual-property-services/copyright-registration/${item.id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">
                        详情
                      </Link>
                      
                      {item.status === '材料准备中' && (
                        <button className="text-green-600 hover:text-green-800 mr-3">
                          提交申请
                        </button>
                      )}
                      
                      {item.status === '已登记' && item.certificate && (
                        <button className="text-indigo-600 hover:text-indigo-800 mr-3">
                          查看证书
                        </button>
                      )}
                      
                      {['材料准备中', '已提交'].includes(item.status) && (
                        <button className="text-gray-600 hover:text-gray-800">
                          编辑
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    未找到匹配的版权记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* 分页 */}
        {filteredData.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              显示 {filteredData.length} 条记录，共 {copyrightData.length} 条
            </div>
            
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
                上一页
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-white bg-indigo-600 hover:bg-indigo-700">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
                下一页
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* 版权知识提示 */}
      <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-indigo-800">版权登记小贴士</h3>
            <div className="mt-2 text-sm text-indigo-700">
              <p>版权登记虽然不是取得著作权的必要条件，但是可以作为著作权归属的初步证据。登记可以帮助您：</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>在发生著作权纠纷时提供初步的权利证明</li>
                <li>方便进行著作权许可、转让等商业活动</li>
                <li>增强维权的法律保障</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 