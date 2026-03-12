'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  getQualityReports, 
  type QualityReport, 
  type ReportFilters, 
  exportReportToPDF,
  deleteReport,
  shareReport,
  getProjectsForFilter
} from '@/services/qualityReportService';
import QualityReportCard from '@/components/quality/QualityReportCard';
import ShareReportDialog from '@/components/quality/ShareReportDialog';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import EmptyState from '@/components/ui/EmptyState';

// 加载指示器组件
function LoadingIndicator() {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center">
      <div className="text-center">
        <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-gray-600">正在加载质检报告...</p>
      </div>
    </div>
  );
}

// 用于获取搜索参数的客户端组件
function QualityReportsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 状态管理
  const [reports, setReports] = useState<QualityReport[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingIds, setLoadingIds] = useState<{ [key: string]: boolean }>({});
  
  // 筛选状态
  const [filters, setFilters] = useState<ReportFilters>({
    search: searchParams.get('search') || '',
    project: searchParams.get('project') || 'all',
    status: (searchParams.get('status') as any) || 'all',
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || '',
    page: Number(searchParams.get('page') || 1),
    limit: Number(searchParams.get('limit') || 10)
  });
  
  // 项目列表
  const [projects, setProjects] = useState<{id: string, name: string}[]>([]);
  const [selectedReportForShare, setSelectedReportForShare] = useState<QualityReport | null>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  // 加载项目列表
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await getProjectsForFilter();
        setProjects(projectsData);
      } catch (err) {
        console.error('加载项目列表失败:', err);
      }
    };
    
    loadProjects();
  }, []);
  
  // 加载报告数据
  useEffect(() => {
    const loadReports = async () => {
      setLoading(true);
      try {
        const result = await getQualityReports(filters);
        setReports(result.data);
        setTotal(result.total);
        setPage(result.page);
        setLimit(result.limit);
        setTotalPages(result.totalPages);
        setError(null);
      } catch (err: any) {
        setError(err.message || '加载质检报告失败');
        setReports([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadReports();
  }, [filters]);
  
  // 处理筛选变化
  const handleFilterChange = (newFilters: Partial<ReportFilters>) => {
    // 重置到第一页
    if (Object.keys(newFilters).some(key => key !== 'page')) {
      newFilters.page = 1;
    }
    
    setFilters(prev => ({ ...prev, ...newFilters }));
    
    // 更新URL参数以支持分享和刷新
    const params = new URLSearchParams();
    const updatedFilters = { ...filters, ...newFilters };
    
    if (updatedFilters.search) params.set('search', updatedFilters.search);
    if (updatedFilters.project && updatedFilters.project !== 'all') params.set('project', updatedFilters.project);
    if (updatedFilters.status && updatedFilters.status !== 'all') params.set('status', updatedFilters.status as string);
    if (updatedFilters.startDate) params.set('startDate', updatedFilters.startDate);
    if (updatedFilters.endDate) params.set('endDate', updatedFilters.endDate);
    if (updatedFilters.page && updatedFilters.page > 1) params.set('page', updatedFilters.page.toString());
    
    router.push(`/quality-reports?${params.toString()}`);
  };
  
  // 处理查看报告
  const handleViewReport = (reportId: string) => {
    router.push(`/quality-reports/${reportId}`);
  };
  
  // 处理下载报告
  const handleDownloadReport = async (reportId: string) => {
    setLoadingIds(prev => ({ ...prev, [reportId]: true }));
    try {
      const result = await exportReportToPDF(reportId);
      // 触发下载
      const link = document.createElement('a');
      link.href = result.url;
      link.setAttribute('download', `质检报告-${reportId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('下载报告失败:', err);
      alert('下载报告失败');
    } finally {
      setLoadingIds(prev => ({ ...prev, [reportId]: false }));
    }
  };
  
  // 处理分享报告
  const handleOpenShareDialog = (report: QualityReport) => {
    setSelectedReportForShare(report);
    setIsShareDialogOpen(true);
  };
  
  const handleShareReport = async (reportId: string, emails: string[]) => {
    setIsSharing(true);
    try {
      const result = await shareReport(reportId, emails);
      if (result) {
        alert('报告分享成功');
        setIsShareDialogOpen(false);
      } else {
        alert('报告分享失败');
      }
    } catch (err) {
      console.error('分享报告失败:', err);
      alert('分享报告失败');
    } finally {
      setIsSharing(false);
    }
  };
  
  // 处理删除报告
  const handleDeleteReport = async (reportId: string) => {
    try {
      const result = await deleteReport(reportId);
      if (result) {
        setReports(prev => prev.filter(report => report.id !== reportId));
        setTotal(prev => prev - 1);
      }
    } catch (err) {
      console.error('删除报告失败:', err);
      alert('删除报告失败');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: '首页', href: '/' },
          { label: '质检报告', href: '/quality-reports', active: true }
        ]}
      />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">质检报告管理</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
          onClick={() => router.push('/quality-reports/create')}
        >
          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          新建报告
        </button>
      </div>
      
      {/* 筛选区域 */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">关键词搜索</label>
            <input
              type="text"
              id="search"
              placeholder="输入报告标题、ID或描述"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              value={filters.search || ''}
              onChange={(e) => handleFilterChange({ search: e.target.value })}
            />
          </div>
          
          <div>
            <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">项目</label>
            <select
              id="project"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              value={filters.project || 'all'}
              onChange={(e) => handleFilterChange({ project: e.target.value })}
            >
              <option value="all">全部项目</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">状态</label>
            <select
              id="status"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              value={filters.status || 'all'}
              onChange={(e) => handleFilterChange({ status: e.target.value as any })}
            >
              <option value="all">全部状态</option>
              <option value="pass">通过</option>
              <option value="fail">不通过</option>
              <option value="pending">待处理</option>
            </select>
          </div>
          
          <div className="flex space-x-2">
            <div className="flex-1">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
              <input
                type="date"
                id="startDate"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                value={filters.startDate || ''}
                onChange={(e) => handleFilterChange({ startDate: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
              <input
                type="date"
                id="endDate"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                value={filters.endDate || ''}
                onChange={(e) => handleFilterChange({ endDate: e.target.value })}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <button
            className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium mr-2"
            onClick={() => handleFilterChange({
              search: '',
              project: 'all',
              status: 'all',
              startDate: '',
              endDate: '',
              page: 1
            })}
          >
            重置筛选
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            onClick={() => handleFilterChange({})}
          >
            应用筛选
          </button>
        </div>
      </div>
      
      {/* 报告列表 */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
          <p className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </p>
        </div>
      ) : reports.length === 0 ? (
        <EmptyState
          title="暂无质检报告"
          description="目前没有符合筛选条件的质检报告记录。您可以尝试调整筛选条件或创建新的质检报告。"
          action={{
            label: "创建新报告",
            onClick: () => router.push('/quality-reports/create')
          }}
          icon={
            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {reports.map(report => (
              <QualityReportCard
                key={report.id}
                report={report}
                onView={handleViewReport}
                onDownload={handleDownloadReport}
                onShare={() => handleOpenShareDialog(report)}
                onDelete={handleDeleteReport}
                isDownloading={loadingIds[report.id] || false}
                currentUserRole="admin" // 实际应用中应从用户系统获取
              />
            ))}
          </div>
          
          {/* 分页控件 */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <button
                  className={`px-3 py-1 rounded-md border ${page > 1 ? 'border-gray-300 hover:bg-gray-50' : 'border-gray-200 text-gray-400 cursor-not-allowed'}`}
                  onClick={() => page > 1 && handleFilterChange({ page: page - 1 })}
                  disabled={page <= 1}
                >
                  上一页
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    className={`px-3 py-1 rounded-md ${pageNum === page ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                    onClick={() => handleFilterChange({ page: pageNum })}
                  >
                    {pageNum}
                  </button>
                ))}
                
                <button
                  className={`px-3 py-1 rounded-md border ${page < totalPages ? 'border-gray-300 hover:bg-gray-50' : 'border-gray-200 text-gray-400 cursor-not-allowed'}`}
                  onClick={() => page < totalPages && handleFilterChange({ page: page + 1 })}
                  disabled={page >= totalPages}
                >
                  下一页
                </button>
              </nav>
            </div>
          )}
        </>
      )}
      
      {/* 分享对话框 */}
      <ShareReportDialog
        isOpen={isShareDialogOpen}
        report={selectedReportForShare}
        onClose={() => setIsShareDialogOpen(false)}
        onShare={handleShareReport}
        isSharing={isSharing}
      />
    </div>
  );
}

// 主页面导出，使用Suspense包裹
export default function QualityReportsPage() {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <QualityReportsClient />
    </Suspense>
  );
}
