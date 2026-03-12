import React, { useState, useEffect } from 'react';
import { Patent, getUserPatents, PatentFilters, PaginatedResult } from '@/services/patentService';

interface PatentSelectionComponentProps {
  selectedPatents: Patent[];
  onSelectPatent: (patent: Patent) => void;
  onRemovePatent: (patentId: string) => void;
}

const PatentSelectionComponent: React.FC<PatentSelectionComponentProps> = ({
  selectedPatents,
  onSelectPatent,
  onRemovePatent
}) => {
  // 状态
  const [patents, setPatents] = useState<Patent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PatentFilters>({
    search: '',
    status: 'approved', // 默认只展示已授权的专利，因为只有已授权的专利才能转让
    page: 1,
    limit: 5
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 0
  });
  
  // 加载专利列表
  useEffect(() => {
    const fetchPatents = async () => {
      setLoading(true);
      try {
        const result: PaginatedResult<Patent> = await getUserPatents(filters);
        setPatents(result.data);
        setPagination({
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: result.totalPages
        });
        setError(null);
      } catch (err) {
        setError('加载专利列表失败，请重试');
        console.error('Error fetching patents:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPatents();
  }, [filters]);
  
  // 处理搜索输入变化
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      search: e.target.value,
      page: 1 // 重置到第一页
    });
  };
  
  // 处理分页
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setFilters({
        ...filters,
        page: newPage
      });
    }
  };
  
  // 检查专利是否已选择
  const isPatentSelected = (patentId: string): boolean => {
    return selectedPatents.some(p => p.id === patentId);
  };
  
  // 切换专利选择状态
  const togglePatentSelection = (patent: Patent) => {
    if (isPatentSelected(patent.id)) {
      onRemovePatent(patent.id);
    } else {
      onSelectPatent(patent);
    }
  };
  
  // 渲染专利列表
  const renderPatentList = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">加载专利列表中...</span>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="py-4 text-center">
          <p className="text-red-500">{error}</p>
          <button 
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setFilters({...filters})}
          >
            重试
          </button>
        </div>
      );
    }
    
    if (patents.length === 0) {
      return (
        <div className="py-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">未找到专利</h3>
          <p className="mt-1 text-sm text-gray-500">您没有符合条件的专利或尚未申请专利</p>
        </div>
      );
    }
    
    return (
      <div className="mt-4 space-y-4">
        {patents.map(patent => (
          <div 
            key={patent.id} 
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              isPatentSelected(patent.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => togglePatentSelection(patent)}
          >
            <div className="flex justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{patent.title}</h3>
                <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-500">
                  <span>专利号: {patent.appNumber}</span>
                  <span>类型: {patent.patentType}</span>
                  <span>申请日: {patent.filingDate}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    patent.status === 'approved' ? 'bg-green-100 text-green-800' :
                    patent.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {patent.status === 'approved' ? '已授权' : 
                     patent.status === 'rejected' ? '已驳回' : 
                     patent.status === 'withdrawn' ? '已撤回' : 
                     patent.status === 'examination' ? '实质审查' : '审查中'}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{patent.abstract || patent.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                  发明人: {patent.inventors.join(', ')}
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  checked={isPatentSelected(patent.id)}
                  onChange={() => {}} // 通过div点击事件处理
                  onClick={e => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // 渲染分页控件
  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;
    
    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
              pagination.page === 1 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            上一页
          </button>
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className={`relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
              pagination.page === pagination.totalPages 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            下一页
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              显示第 <span className="font-medium">{((pagination.page - 1) * pagination.limit) + 1}</span> 至 <span className="font-medium">
                {Math.min(pagination.page * pagination.limit, pagination.total)}
              </span> 条，共 <span className="font-medium">{pagination.total}</span> 条结果
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                  pagination.page === 1 ? 'cursor-not-allowed' : ''
                }`}
              >
                <span className="sr-only">上一页</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* 页码 */}
              {Array.from({ length: pagination.totalPages }).map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      pagination.page === pageNum
                        ? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                  pagination.page === pagination.totalPages ? 'cursor-not-allowed' : ''
                }`}
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
    );
  };
  
  // 渲染已选专利列表
  const renderSelectedPatents = () => {
    if (selectedPatents.length === 0) {
      return (
        <div className="p-4 border border-dashed border-gray-300 rounded-lg text-center">
          <p className="text-gray-500">尚未选择专利，请从上方列表选择</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-2">
        {selectedPatents.map(patent => (
          <div key={patent.id} className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium text-blue-900">{patent.title}</h4>
              <p className="text-sm text-blue-700">专利号: {patent.appNumber}</p>
            </div>
            <button
              type="button"
              onClick={() => onRemovePatent(patent.id)}
              className="text-blue-600 hover:text-blue-800"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      {/* 搜索专利 */}
      <div>
        <div className="relative">
          <input
            type="text"
            placeholder="搜索专利（输入专利名称、编号或发明人）"
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* 专利列表 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">可转让专利列表</h3>
        {renderPatentList()}
        {renderPagination()}
      </div>
      
      {/* 已选专利 */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-900">已选择的专利</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {selectedPatents.length} 个专利
          </span>
        </div>
        {renderSelectedPatents()}
      </div>
    </div>
  );
};

export default PatentSelectionComponent; 