'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import { 
  PlusIcon, 
  ArrowDownTrayIcon, 
  FunnelIcon, 
  ChevronRightIcon 
} from '@heroicons/react/24/outline';
import InvoiceList from '@/components/invoices/InvoiceList';
import InvoiceFilters from '@/components/invoices/InvoiceFilters';
import InvoiceForm from '@/components/invoices/InvoiceForm';
import InvoiceDetail from '@/components/invoices/InvoiceDetail';
import { 
  InvoiceFilters as InvoiceFilterType, 
  Invoice,
  CreateInvoiceRequest, 
  InvoiceStatus,
  invoiceService
} from '@/services/invoiceService';

export default function InvoicesPage() {
  // 状态
  const [activeTab, setActiveTab] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [filters, setFilters] = useState<InvoiceFilterType>({});
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 页面标签定义
  const tabs = [
    { label: '全部', filter: {} },
    { label: '草稿', filter: { status: 'draft' as InvoiceStatus } },
    { label: '已发送', filter: { status: 'sent' as InvoiceStatus } },
    { label: '已付款', filter: { status: 'paid' as InvoiceStatus } },
    { label: '逾期', filter: { status: 'overdue' as InvoiceStatus } },
    { label: '已取消', filter: { status: 'cancelled' as InvoiceStatus } }
  ];

  // 处理标签变化
  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setFilters(tabs[index].filter);
  };

  // 处理筛选器切换
  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // 处理筛选器应用
  const handleFilterApply = (newFilters: InvoiceFilterType) => {
    // 保留标签中的状态筛选器，如果当前在特定标签上
    if (activeTab !== 0) {
      newFilters.status = tabs[activeTab].filter.status;
    }
    setFilters(newFilters);
  };

  // 创建发票
  const handleCreateInvoice = () => {
    setCurrentInvoice(null);
    setFormOpen(true);
  };

  // 编辑发票
  const handleEditInvoice = (invoice: Invoice) => {
    setCurrentInvoice(invoice);
    setFormOpen(true);
  };

  // 查看发票详情
  const handleViewInvoice = (invoice: Invoice) => {
    setCurrentInvoice(invoice);
    setDetailOpen(true);
  };

  // 保存发票
  const handleSaveInvoice = async (data: CreateInvoiceRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      if (currentInvoice) {
        // 更新现有发票
        await invoiceService.updateInvoice(currentInvoice.id, data);
        setSuccess('发票已成功更新');
      } else {
        // 创建新发票
        await invoiceService.createInvoice(data);
        setSuccess('发票已成功创建');
      }
      
      // 关闭表单并刷新列表
      setFormOpen(false);
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      console.error('Invoice save error:', err);
      setError('保存发票时出错');
    } finally {
      setLoading(false);
    }
  };

  // 删除发票
  const handleDeleteInvoice = async (invoiceId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await invoiceService.deleteInvoice(invoiceId);
      setSuccess('发票已成功删除');
      setRefreshTrigger(prev => prev + 1);
    } catch (err) {
      console.error('Invoice delete error:', err);
      setError('删除发票时出错');
    } finally {
      setLoading(false);
    }
  };

  // 更改发票状态
  const handleStatusChange = async (invoiceId: string, newStatus: InvoiceStatus) => {
    setLoading(true);
    setError(null);
    
    try {
      await invoiceService.updateInvoiceStatus(invoiceId, newStatus);
      setSuccess(`发票状态已更新为${newStatus}`);
      setRefreshTrigger(prev => prev + 1);
      
      // 如果当前查看的发票被更新，也需要更新其状态
      if (currentInvoice && currentInvoice.id === invoiceId) {
        setCurrentInvoice({
          ...currentInvoice,
          status: newStatus
        });
      }
    } catch (err) {
      console.error('Status change error:', err);
      setError('更改发票状态时出错');
    } finally {
      setLoading(false);
    }
  };

  // 下载发票
  const handleDownloadInvoice = async (invoiceId: string) => {
    try {
      await invoiceService.downloadInvoice(invoiceId);
      setSuccess('发票已开始下载');
    } catch (err) {
      console.error('Download error:', err);
      setError('下载发票时出错');
    }
  };

  // 发送发票邮件
  const handleSendInvoiceEmail = async (invoiceId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await invoiceService.sendInvoiceEmail(invoiceId);
      setSuccess('发票已通过电子邮件发送');
    } catch (err) {
      console.error('Email sending error:', err);
      setError('发送发票电子邮件时出错');
    } finally {
      setLoading(false);
    }
  };

  // 批量下载发票
  const handleBulkDownload = async (invoiceIds: string[]) => {
    if (invoiceIds.length === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await invoiceService.bulkDownloadInvoices(invoiceIds);
      setSuccess(`已开始下载${invoiceIds.length}份发票`);
    } catch (err) {
      console.error('Bulk download error:', err);
      setError('批量下载发票时出错');
    } finally {
      setLoading(false);
    }
  };

  // 关闭消息提示
  const handleCloseAlert = () => {
    setError(null);
    setSuccess(null);
  };

  // 面包屑定义
  const breadcrumbItems = [
    { label: '首页', href: '/' },
    { label: '发票管理', href: '/invoices' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题和面包屑 */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-3xl font-bold mt-4">发票管理</h1>
      </div>

      {/* 错误和成功消息 */}
      {error && (
        <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 relative">
          <button 
            className="absolute top-2 right-2"
            onClick={handleCloseAlert}
          >
            <span className="sr-only">关闭</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 relative">
          <button 
            className="absolute top-2 right-2"
            onClick={handleCloseAlert}
          >
            <span className="sr-only">关闭</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {success}
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex justify-between mb-6">
        <Button variant="primary" onClick={handleCreateInvoice}>
          <PlusIcon className="h-5 w-5 mr-2 inline-block" />
          新建发票
        </Button>
        <div className="flex space-x-2">
          <Button variant="secondary" onClick={handleToggleFilters}>
            <FunnelIcon className="h-5 w-5 mr-2 inline-block" />
            {showFilters ? '隐藏筛选' : '显示筛选'}
          </Button>
          <Button variant="secondary" onClick={() => setActiveTab(0)}>
            <ArrowDownTrayIcon className="h-5 w-5 mr-2 inline-block" />
            批量下载
          </Button>
        </div>
      </div>

      {/* 筛选组件 */}
      {showFilters && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <InvoiceFilters onFilter={handleFilterApply} initialFilters={filters} />
        </div>
      )}

      {/* 标签导航 */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm ${
                activeTab === index
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange(index)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 发票列表 */}
      <div className="bg-white rounded-lg shadow">
        <InvoiceList 
          filters={filters}
          refreshTrigger={refreshTrigger}
          onViewInvoice={handleViewInvoice}
          onEditInvoice={handleEditInvoice}
          onDeleteInvoice={handleDeleteInvoice}
          onStatusChange={handleStatusChange}
          onBulkDownload={handleBulkDownload}
        />
      </div>

      {/* 创建/编辑发票表单 */}
      <InvoiceForm 
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSaveInvoice}
        editInvoice={currentInvoice || undefined}
      />

      {/* 发票详情对话框 */}
      {currentInvoice && (
        <InvoiceDetail 
          invoice={currentInvoice}
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          onDownload={() => handleDownloadInvoice(currentInvoice.id)}
          onSendEmail={() => handleSendInvoiceEmail(currentInvoice.id)}
          onPrint={() => window.print()}
        />
      )}
    </div>
  );
} 