import React, { useState, useEffect, useCallback } from 'react';
import { 
  Invoice, 
  InvoiceStatus, 
  InvoiceFilters, 
  PaginatedInvoices, 
  invoiceService 
} from '@/services/invoiceService';
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

// 状态标签的颜色映射
const statusColors: Record<InvoiceStatus, string> = {
  draft: 'bg-gray-100 text-gray-800',
  sent: 'bg-blue-100 text-blue-800',
  paid: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800',
  cancelled: 'bg-yellow-100 text-yellow-800'
};

// 状态显示文本
const statusLabels: Record<InvoiceStatus, string> = {
  draft: '草稿',
  sent: '已发送',
  paid: '已付款',
  overdue: '逾期',
  cancelled: '已取消'
};

// 排序方向类型
type SortDirection = 'asc' | 'desc';

// 可排序的字段
type SortableField = 'invoiceNumber' | 'clientName' | 'createdAt' | 'dueDate' | 'total' | 'status';

// 属性接口
interface InvoiceListProps {
  filters?: InvoiceFilters;
  refreshTrigger?: number;
  onViewInvoice?: (invoice: Invoice) => void;
  onEditInvoice?: (invoice: Invoice) => void;
  onDeleteInvoice?: (invoiceId: string) => void;
  onStatusChange?: (invoiceId: string, newStatus: InvoiceStatus) => void;
  onBulkDownload?: (invoiceIds: string[]) => void;
}

export const InvoiceList: React.FC<InvoiceListProps> = ({
  filters = {},
  refreshTrigger = 0,
  onViewInvoice,
  onEditInvoice,
  onDeleteInvoice,
  onStatusChange,
  onBulkDownload
}) => {
  // 状态
  const [loading, setLoading] = useState(true);
  const [invoicesData, setInvoicesData] = useState<PaginatedInvoices>({
    invoices: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // 排序状态
  const [sortField, setSortField] = useState<SortableField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  // 分页状态
  const [page, setPage] = useState(0); // 从0开始计数
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 获取发票数据
  const fetchInvoices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const combinedFilters: InvoiceFilters = {
        ...filters,
        sortBy: sortField,
        sortOrder: sortDirection,
        page: page + 1, // API从1开始
        limit: rowsPerPage
      };
      
      const data = await invoiceService.getInvoices(combinedFilters);
      setInvoicesData(data);
    } catch (err) {
      console.error('Failed to fetch invoices:', err);
      setError('获取发票数据失败，请重试');
    } finally {
      setLoading(false);
    }
  }, [filters, sortField, sortDirection, page, rowsPerPage, refreshTrigger]);

  // 在组件加载和依赖项变化时加载数据
  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  // 处理页码变化
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  // 处理每页行数变化
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    setRowsPerPage(newLimit);
    setPage(0); // 重置到第一页
  };

  // 处理排序变化
  const handleSortChange = (field: SortableField) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  // 处理全选/取消全选
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = invoicesData.invoices.map(invoice => invoice.id);
      setSelectedInvoices(newSelected);
      return;
    }
    setSelectedInvoices([]);
  };

  // 处理单个选择
  const handleSelect = (id: string) => {
    const selectedIndex = selectedInvoices.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedInvoices, id];
    } else {
      newSelected = [...selectedInvoices.filter(item => item !== id)];
    }

    setSelectedInvoices(newSelected);
  };

  // 处理批量下载
  const handleBulkDownload = () => {
    if (selectedInvoices.length > 0 && onBulkDownload) {
      onBulkDownload(selectedInvoices);
    }
  };

  // 是否选中
  const isSelected = (id: string) => selectedInvoices.indexOf(id) !== -1;

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
  };

  // 格式化金额
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount);
  };

  if (loading && invoicesData.invoices.length === 0) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (invoicesData.invoices.length === 0 && !loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">暂无发票数据</p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedInvoices.length > 0 && selectedInvoices.length === invoicesData.invoices.length}
                  onChange={handleSelectAllClick}
                />
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortChange('invoiceNumber')}
              >
                <div className="flex items-center">
                  发票编号
                  {sortField === 'invoiceNumber' && (
                    sortDirection === 'asc' 
                      ? <ChevronUpIcon className="ml-1 h-4 w-4" /> 
                      : <ChevronDownIcon className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortChange('clientName')}
              >
                <div className="flex items-center">
                  客户
                  {sortField === 'clientName' && (
                    sortDirection === 'asc' 
                      ? <ChevronUpIcon className="ml-1 h-4 w-4" /> 
                      : <ChevronDownIcon className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortChange('createdAt')}
              >
                <div className="flex items-center">
                  创建日期
                  {sortField === 'createdAt' && (
                    sortDirection === 'asc' 
                      ? <ChevronUpIcon className="ml-1 h-4 w-4" /> 
                      : <ChevronDownIcon className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortChange('dueDate')}
              >
                <div className="flex items-center">
                  到期日期
                  {sortField === 'dueDate' && (
                    sortDirection === 'asc' 
                      ? <ChevronUpIcon className="ml-1 h-4 w-4" /> 
                      : <ChevronDownIcon className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortChange('total')}
              >
                <div className="flex items-center justify-end">
                  金额
                  {sortField === 'total' && (
                    sortDirection === 'asc' 
                      ? <ChevronUpIcon className="ml-1 h-4 w-4" /> 
                      : <ChevronDownIcon className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSortChange('status')}
              >
                <div className="flex items-center">
                  状态
                  {sortField === 'status' && (
                    sortDirection === 'asc' 
                      ? <ChevronUpIcon className="ml-1 h-4 w-4" /> 
                      : <ChevronDownIcon className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoicesData.invoices.map(invoice => {
              const isItemSelected = isSelected(invoice.id);
              
              return (
                <tr 
                  key={invoice.id}
                  className={isItemSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={isItemSelected}
                      onChange={() => handleSelect(invoice.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.invoiceNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.clientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(invoice.createdAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(invoice.dueDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatAmount(invoice.total)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${statusColors[invoice.status]}`}>
                      {statusLabels[invoice.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() => onViewInvoice && onViewInvoice(invoice)}
                        className="text-blue-600 hover:text-blue-900"
                        title="查看"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEditInvoice && onEditInvoice(invoice)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="编辑"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteInvoice && onDeleteInvoice(invoice.id)}
                        className="text-red-600 hover:text-red-900"
                        title="删除"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* 分页 */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex items-center">
          <label htmlFor="rowsPerPage" className="mr-2 text-sm text-gray-700">
            每页行数:
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </div>
        
        <div className="inline-flex -space-x-px">
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="sr-only">上一页</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300">
            {`${page * rowsPerPage + 1}-${Math.min((page + 1) * rowsPerPage, invoicesData.total)} 共 ${invoicesData.total}`}
          </div>
          <button
            onClick={() => handleChangePage(page + 1)}
            disabled={page >= Math.ceil(invoicesData.total / rowsPerPage) - 1}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="sr-only">下一页</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {selectedInvoices.length > 0 && (
          <div>
            <button
              type="button"
              onClick={handleBulkDownload}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              下载所选 ({selectedInvoices.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceList; 