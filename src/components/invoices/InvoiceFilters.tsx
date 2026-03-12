import React, { useState } from 'react';
import { InvoiceStatus, InvoiceFilters } from '@/services/invoiceService';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

// 状态选项
const statusOptions = [
  { value: 'draft', label: '草稿' },
  { value: 'sent', label: '已发送' },
  { value: 'paid', label: '已付款' },
  { value: 'overdue', label: '逾期' },
  { value: 'cancelled', label: '已取消' }
];

interface InvoiceFiltersProps {
  onFilter: (filters: InvoiceFilters) => void;
  initialFilters?: InvoiceFilters;
}

const InvoiceFiltersComponent: React.FC<InvoiceFiltersProps> = ({
  onFilter,
  initialFilters = {}
}) => {
  // 筛选状态
  const [filters, setFilters] = useState<InvoiceFilters>({
    status: initialFilters.status || '',
    startDate: initialFilters.startDate || '',
    endDate: initialFilters.endDate || '',
    minAmount: initialFilters.minAmount || undefined,
    maxAmount: initialFilters.maxAmount || undefined,
    searchQuery: initialFilters.searchQuery || ''
  });

  // 处理输入变化
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // 处理数字输入变化
  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const numValue = value === '' ? undefined : Number(value);
    
    if (name) {
      setFilters(prev => ({ ...prev, [name]: numValue }));
    }
  };

  // 应用筛选器
  const applyFilters = () => {
    onFilter(filters);
  };

  // 清除筛选器
  const clearFilters = () => {
    setFilters({
      status: '',
      startDate: '',
      endDate: '',
      minAmount: undefined,
      maxAmount: undefined,
      searchQuery: ''
    });
    onFilter({});
  };

  return (
    <div className="py-4">
      <h3 className="text-lg font-medium mb-4">发票筛选</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 搜索框 */}
        <div>
          <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700 mb-1">
            搜索发票号或客户名称
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="searchQuery"
              id="searchQuery"
              className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
              placeholder="输入搜索关键词..."
              value={filters.searchQuery}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        {/* 状态下拉框 */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            状态
          </label>
          <select
            id="status"
            name="status"
            className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            value={filters.status || ''}
            onChange={handleInputChange}
          >
            <option value="">全部</option>
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* 留空 */}
        <div className="hidden md:block"></div>
        
        {/* 日期选择器 */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            开始日期
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            value={filters.startDate || ''}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            结束日期
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            value={filters.endDate || ''}
            onChange={handleInputChange}
            min={filters.startDate || undefined}
          />
        </div>
        
        {/* 留空 */}
        <div className="hidden md:block"></div>
        
        {/* 金额范围 */}
        <div>
          <label htmlFor="minAmount" className="block text-sm font-medium text-gray-700 mb-1">
            最小金额
          </label>
          <input
            type="number"
            name="minAmount"
            id="minAmount"
            className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            value={filters.minAmount !== undefined ? filters.minAmount : ''}
            onChange={handleNumberChange}
            min="0"
          />
        </div>
        
        <div>
          <label htmlFor="maxAmount" className="block text-sm font-medium text-gray-700 mb-1">
            最大金额
          </label>
          <input
            type="number"
            name="maxAmount"
            id="maxAmount"
            className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            value={filters.maxAmount !== undefined ? filters.maxAmount : ''}
            onChange={handleNumberChange}
            min="0"
          />
        </div>
        
        {/* 按钮区域 */}
        <div className="flex items-end justify-end space-x-2">
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <XMarkIcon className="h-5 w-5 mr-2" />
            清除
          </button>
          <button
            type="button"
            onClick={applyFilters}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            应用筛选
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFiltersComponent; 