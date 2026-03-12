"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PatentService, PatentFilterParams, Patent, PatentResponse, PatentStatus, PatentType } from '@/services/patentService';
import { PatentList } from '@/components/patent/PatentList';
import Link from 'next/link';

// SearchParamsProvider组件解决useSearchParams必须在Suspense中的问题
function SearchParamsProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  return <>{children({ searchParams })}</>;
}

export default function PatentsPage() {
  const router = useRouter();
  
  // 状态定义
  const [patents, setPatents] = useState<Patent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterParams, setFilterParams] = useState<PatentFilterParams>({
    search: '',
    status: 'all',
    type: 'all',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 10
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // 面包屑导航
  const breadcrumbItems = [
    { label: '首页', href: '/' },
    { label: '知识产权', href: '#' },
    { label: '我的专利', href: '/patents', active: true }
  ];

  // 初始化filterParams和searchQuery
  const initializeFromSearchParams = (params: URLSearchParams) => {
    const newFilterParams = {
      search: params.get('search') || '',
      status: params.get('status') || 'all',
      type: params.get('type') || 'all',
      startDate: params.get('startDate') || '',
      endDate: params.get('endDate') || '',
      page: parseInt(params.get('page') || '1', 10),
      limit: parseInt(params.get('limit') || '10', 10)
    };
    
    setFilterParams(newFilterParams);
    setSearchQuery(newFilterParams.search);
    setCurrentPage(newFilterParams.page);
  };

  // 更新URL参数
  const updateURLParams = (params: PatentFilterParams) => {
    const urlParams = new URLSearchParams();
    
    if (params.search) urlParams.set('search', params.search);
    if (params.status && params.status !== 'all') urlParams.set('status', params.status);
    if (params.type && params.type !== 'all') urlParams.set('type', params.type);
    if (params.startDate) urlParams.set('startDate', params.startDate);
    if (params.endDate) urlParams.set('endDate', params.endDate);
    if (params.page && params.page > 1) urlParams.set('page', params.page.toString());
    if (params.limit && params.limit !== 10) urlParams.set('limit', params.limit.toString());
    
    const queryString = urlParams.toString();
    const newUrl = `/patents${queryString ? `?${queryString}` : ''}`;
    router.push(newUrl, { scroll: false });
  };

  // 获取专利列表
  useEffect(() => {
    const fetchPatents = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await PatentService.getPatents(filterParams);
        setPatents(response.patents);
        setTotalPages(response.totalPages);
        setCurrentPage(response.page);
      } catch (err) {
        console.error('获取专利列表失败:', err);
        setError('获取专利列表失败，请稍后重试');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatents();
  }, [filterParams]);

  // 处理搜索
  const handleSearch = () => {
    const newParams = {
      ...filterParams,
      search: searchQuery,
      page: 1 // 重置到第一页
    };
    
    setFilterParams(newParams);
    updateURLParams(newParams);
  };

  // 处理按回车键搜索
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 处理状态筛选变化
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = {
      ...filterParams,
      status: e.target.value,
      page: 1
    };
    
    setFilterParams(newParams);
    updateURLParams(newParams);
  };

  // 处理类型筛选变化
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = {
      ...filterParams,
      type: e.target.value,
      page: 1
    };
    
    setFilterParams(newParams);
    updateURLParams(newParams);
  };

  // 处理日期筛选变化
  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    const newParams = {
      ...filterParams,
      [field]: value,
      page: 1
    };
    
    setFilterParams(newParams);
    updateURLParams(newParams);
  };

  // 处理分页
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    
    const newParams = {
      ...filterParams,
      page: newPage
    };
    
    setFilterParams(newParams);
    updateURLParams(newParams);
  };

  // 格式化日期
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 清除所有筛选条件
  const clearFilters = () => {
    setSearchQuery('');
    const newParams = {
      page: 1,
      limit: 10
    };
    
    setFilterParams(newParams);
    updateURLParams(newParams);
  };

  // 检查是否有已应用的筛选条件
  const hasActiveFilters = () => {
    return !!(
      filterParams.search || 
      (filterParams.status && filterParams.status !== 'all') || 
      (filterParams.type && filterParams.type !== 'all') || 
      filterParams.startDate || 
      filterParams.endDate
    );
  };

  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
      <SearchParamsProvider>
        {({ searchParams }) => {
          // 组件挂载时初始化filterParams
          useEffect(() => {
            initializeFromSearchParams(searchParams);
          }, []);
          
          return (
            <div className="container mx-auto px-4 py-8">
              <div className="mb-6">
                <Breadcrumb items={breadcrumbItems} />
                <div className="flex justify-between items-center mt-4">
                  <h1 className="text-3xl font-bold">我的专利</h1>
                  <div className="flex gap-2">
                    <Link
                      href="/patents/apply"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      申请专利
                    </Link>
                  </div>
                </div>
                <p className="text-gray-600 mt-2">查看并管理您的所有专利申请、授权专利和相关知识产权事务</p>
              </div>
              
              {/* 专利搜索和筛选区域 */}
              <div className="mb-6 bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {/* 搜索框 */}
                  <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">关键词搜索</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="search"
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="专利名称、编号..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={handleSearch}
                        aria-label="搜索"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* 状态筛选 */}
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">专利状态</label>
                    <select
                      id="status"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filterParams.status || 'all'}
                      onChange={handleStatusChange}
                      aria-label="按专利状态筛选"
                    >
                      <option value="all">全部状态</option>
                      <option value="pending">等待审查</option>
                      <option value="examination">审查中</option>
                      <option value="approved">已授权</option>
                      <option value="rejected">已驳回</option>
                      <option value="withdrawn">已撤回</option>
                    </select>
                  </div>

                  {/* 类型筛选 */}
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">专利类型</label>
                    <select
                      id="type"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filterParams.type || 'all'}
                      onChange={handleTypeChange}
                      aria-label="按专利类型筛选"
                    >
                      <option value="all">全部类型</option>
                      <option value="invention">发明专利</option>
                      <option value="utility">实用新型</option>
                      <option value="design">外观设计</option>
                    </select>
                  </div>

                  {/* 日期筛选 */}
                  <div>
                    <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">申请日期</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="date"
                        className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={filterParams.startDate || ''}
                        onChange={(e) => handleDateChange('startDate', e.target.value)}
                        aria-label="开始日期"
                      />
                      <span className="text-gray-500">至</span>
                      <input
                        type="date"
                        className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={filterParams.endDate || ''}
                        onChange={(e) => handleDateChange('endDate', e.target.value)}
                        aria-label="结束日期"
                      />
                    </div>
                  </div>
                </div>

                {/* 筛选操作按钮 */}
                <div className="flex justify-end">
                  {hasActiveFilters() && (
                    <button
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 mr-2"
                      onClick={clearFilters}
                    >
                      清除筛选
                    </button>
                  )}
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    onClick={handleSearch}
                  >
                    应用筛选
                  </button>
                </div>
                
                {/* 已应用的筛选条件标签 */}
                {hasActiveFilters() && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {filterParams.search && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        搜索: {filterParams.search}
                        <button 
                          className="ml-1 text-blue-600 hover:text-blue-800"
                          onClick={() => {
                            setSearchQuery('');
                            setFilterParams({...filterParams, search: '', page: 1});
                            updateURLParams({...filterParams, search: '', page: 1});
                          }}
                          aria-label="移除搜索条件"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    )}
                    {filterParams.status && filterParams.status !== 'all' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        状态: {PatentService.getStatusName(filterParams.status as PatentStatus)}
                        <button 
                          className="ml-1 text-blue-600 hover:text-blue-800"
                          onClick={() => {
                            setFilterParams({...filterParams, status: 'all', page: 1});
                            updateURLParams({...filterParams, status: 'all', page: 1});
                          }}
                          aria-label="移除状态筛选"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    )}
                    {filterParams.type && filterParams.type !== 'all' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        类型: {PatentService.getTypeName(filterParams.type as PatentType)}
                        <button 
                          className="ml-1 text-blue-600 hover:text-blue-800"
                          onClick={() => {
                            setFilterParams({...filterParams, type: 'all', page: 1});
                            updateURLParams({...filterParams, type: 'all', page: 1});
                          }}
                          aria-label="移除类型筛选"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    )}
                    {(filterParams.startDate || filterParams.endDate) && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        日期: {filterParams.startDate ? formatDate(filterParams.startDate) : '开始'} 至 {filterParams.endDate ? formatDate(filterParams.endDate) : '今天'}
                        <button 
                          className="ml-1 text-blue-600 hover:text-blue-800"
                          onClick={() => {
                            setFilterParams({...filterParams, startDate: '', endDate: '', page: 1});
                            updateURLParams({...filterParams, startDate: '', endDate: '', page: 1});
                          }}
                          aria-label="移除日期筛选"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              {/* 专利列表区域 */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  {isLoading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-4 text-gray-600">加载中...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center py-12 text-red-500">
                      <p>{error}</p>
                      <button 
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        onClick={() => setFilterParams({...filterParams})}
                      >
                        重试
                      </button>
                    </div>
                  ) : patents.length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="mt-2 text-lg font-medium text-gray-900">暂无专利数据</h3>
                      <p className="mt-1 text-gray-500">
                        {hasActiveFilters() 
                          ? '没有符合当前筛选条件的专利，请尝试调整筛选条件' 
                          : '您还没有创建任何专利申请，点击"申请专利"开始创建'}
                      </p>
                      <div className="mt-6">
                        {hasActiveFilters() ? (
                          <button
                            type="button"
                            onClick={clearFilters}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            清除所有筛选条件
                          </button>
                        ) : (
                          <Link
                            href="/patents/apply"
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            申请专利
                          </Link>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      <PatentList 
                        patents={patents} 
                        formatDate={formatDate}
                        isLoading={false}
                        error={null}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                      
                      {/* 分页控件 */}
                      {totalPages > 1 && (
                        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
                          <div className="flex flex-1 justify-between sm:hidden">
                            <button
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                                currentPage === 1 
                                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                                  : 'bg-white text-blue-600 hover:bg-blue-50'
                              }`}
                            >
                              上一页
                            </button>
                            <button
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              className={`relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                                currentPage === totalPages 
                                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                                  : 'bg-white text-blue-600 hover:bg-blue-50'
                              }`}
                            >
                              下一页
                            </button>
                          </div>
                          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm text-gray-700">
                                显示第 
                                <span className="font-medium">{((currentPage - 1) * filterParams.limit) + 1}</span> 
                                至 
                                <span className="font-medium">
                                  {Math.min(currentPage * filterParams.limit, patents.length * totalPages)}
                                </span> 
                                条，共 
                                <span className="font-medium">{patents.length * totalPages}</span> 
                                条结果
                              </p>
                            </div>
                            <div>
                              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <button
                                  onClick={() => handlePageChange(currentPage - 1)}
                                  disabled={currentPage === 1}
                                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md ${
                                    currentPage === 1 
                                      ? 'bg-gray-50 text-gray-400 cursor-not-allowed' 
                                      : 'bg-white text-gray-500 hover:bg-gray-50'
                                  } ring-1 ring-inset ring-gray-300`}
                                >
                                  <span className="sr-only">上一页</span>
                                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                  </svg>
                                </button>
                                
                                {/* 页码按钮生成 */}
                                {Array.from({ length: totalPages }).map((_, idx) => {
                                  const pageNum = idx + 1;
                                  // 显示首页、尾页、当前页及其相邻页
                                  const shouldShow = 
                                    pageNum === 1 || 
                                    pageNum === totalPages || 
                                    Math.abs(pageNum - currentPage) <= 1;
                                    
                                  if (shouldShow) {
                                    return (
                                      <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                          pageNum === currentPage
                                            ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20'
                                        }`}
                                      >
                                        {pageNum}
                                      </button>
                                    );
                                  }
                                  
                                  // 显示省略号
                                  if (
                                    (pageNum === 2 && currentPage > 3) || 
                                    (pageNum === totalPages - 1 && currentPage < totalPages - 2)
                                  ) {
                                    return (
                                      <span
                                        key={pageNum}
                                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                                      >
                                        ...
                                      </span>
                                    );
                                  }
                                  
                                  return null;
                                })}
                                
                                <button
                                  onClick={() => handlePageChange(currentPage + 1)}
                                  disabled={currentPage === totalPages}
                                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md ${
                                    currentPage === totalPages 
                                      ? 'bg-gray-50 text-gray-400 cursor-not-allowed' 
                                      : 'bg-white text-gray-500 hover:bg-gray-50'
                                  } ring-1 ring-inset ring-gray-300`}
                                >
                                  <span className="sr-only">下一页</span>
                                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </nav>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </SearchParamsProvider>
    </Suspense>
  );
} 