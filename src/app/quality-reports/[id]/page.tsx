"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { toast } from 'react-hot-toast';
import { QualityReport, getQualityReportById, exportReportToPDF } from '@/services/qualityReportService';
import ImageViewer from '@/components/ui/ImageViewer';

export default function QualityReportDetailPage() {
  const router = useRouter();
  const params = useParams();
  const reportId = params.id as string;
  
  const [report, setReport] = useState<QualityReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  
  // 图片查看器状态
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // 面包屑导航
  const breadcrumbItems = [
    { label: '首页', href: '/' },
    { label: '设计管理', href: '#' },
    { label: '质检报告', href: '/quality-reports' },
    { label: report ? report.title : '加载中...', href: `/quality-reports/${reportId}` },
  ];
  
  // 加载报告详情
  useEffect(() => {
    const fetchReportDetail = async () => {
      if (!reportId) return;
      
      setIsLoading(true);
      try {
        const reportData = await getQualityReportById(reportId);
        if (reportData) {
          setReport(reportData);
          setError(null);
        } else {
          setError('未找到报告信息');
          toast.error('未找到报告信息');
        }
      } catch (err) {
        setError('加载报告详情失败');
        toast.error('加载报告详情失败，请重试');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReportDetail();
  }, [reportId]);
  
  // 导出报告为PDF
  const handleExportPDF = async () => {
    if (!report) return;
    
    setIsExporting(true);
    try {
      const result = await exportReportToPDF(report.id);
      toast.success('报告已生成，可以下载');
      
      // 如果后端返回了下载链接，就打开它
      if (result && result.url) {
        window.open(result.url, '_blank');
      }
    } catch (err) {
      toast.error('导出报告失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };
  
  // 打印报告
  const handlePrintReport = () => {
    if (!report) return;
    
    // 创建一个隐藏的打印样式
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        .print-section, .print-section * {
          visibility: visible;
        }
        .print-section {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .no-print {
          display: none !important;
        }
        @page {
          size: A4;
          margin: 1cm;
        }
      }
    `;
    document.head.appendChild(style);
    
    // 执行打印
    window.print();
    
    // 打印完成后移除样式
    setTimeout(() => {
      document.head.removeChild(style);
    }, 1000);
  };
  
  // 渲染状态标签
  const renderStatusBadge = (status: string) => {
    let bgColor, textColor, statusText;
    
    switch (status) {
      case 'pass':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        statusText = '通过';
        break;
      case 'fail':
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
        statusText = '不通过';
        break;
      case 'pending':
      default:
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-800';
        statusText = '待定';
    }
    
    return (
      <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
        {statusText}
      </span>
    );
  };
  
  // 返回到列表页
  const handleBack = () => {
    router.push('/quality-reports');
  };
  
  // 渲染内容区域
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载报告详情中...</p>
        </div>
      );
    }
    
    if (error || !report) {
      return (
        <div className="text-center py-12">
          <svg className="h-16 w-16 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">未找到报告信息</h3>
          <p className="mt-1 text-gray-500">该报告可能已被删除或您没有权限查看</p>
          <button 
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            返回列表
          </button>
        </div>
      );
    }
    
    // 计算检查项通过率
    const totalItems = report.inspectionItems?.length || 0;
    const passedItems = report.inspectionItems?.filter(item => item.result).length || 0;
    const passRate = totalItems > 0 ? Math.round((passedItems / totalItems) * 100) : 0;
    
    // 打开图片查看器
    const handleImageClick = (index: number) => {
      setSelectedImageIndex(index);
      setIsImageViewerOpen(true);
    };
    
    return (
      <div className="space-y-8">
        {/* 报告基本信息 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="sm:flex sm:items-center sm:justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 inline-flex items-center">
                {report.title}
                <span className="ml-3">{renderStatusBadge(report.status)}</span>
              </h1>
              <p className="text-sm text-gray-500 mt-1">报告编号: {report.id}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
              >
                {isExporting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    导出中...
                  </>
                ) : (
                  <>
                    <svg className="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    导出PDF
                  </>
                )}
              </button>
              
              <button
                onClick={handlePrintReport}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                打印报告
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="border-r border-gray-200 pr-4">
              <h3 className="text-sm font-medium text-gray-500">项目信息</h3>
              <div className="mt-2">
                <p className="text-sm font-medium">项目名称: {report.project}</p>
                <p className="text-sm text-gray-500 mt-1">项目编号: {report.projectId}</p>
              </div>
            </div>
            <div className="border-r border-gray-200 pr-4">
              <h3 className="text-sm font-medium text-gray-500">检验信息</h3>
              <div className="mt-2">
                <p className="text-sm font-medium">检验人: {report.inspector}</p>
                <p className="text-sm text-gray-500 mt-1">检验日期: {report.date}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">检验结果</h3>
              <div className="mt-2">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${passRate >= 80 ? 'bg-green-600' : passRate >= 60 ? 'bg-yellow-500' : 'bg-red-600'}`} 
                      style={{ width: `${passRate}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 ml-2">{passRate}%</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {totalItems} 个检查项，{passedItems} 个通过
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 报告描述信息 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">详细描述</h2>
          <p className="text-gray-700 whitespace-pre-line">{report.description}</p>
          
          {report.feedback && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-md font-medium text-gray-900">反馈意见</h3>
              <p className="mt-2 text-gray-700 whitespace-pre-line">{report.feedback}</p>
            </div>
          )}
        </div>
        
        {/* 检查项目列表 */}
        {report.inspectionItems && report.inspectionItems.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">检查项目</h2>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {report.inspectionItems.map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 w-4 h-4 rounded-full mt-1 ${item.result ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className={`text-xs font-medium rounded-full px-2 py-0.5 ${item.result ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {item.result ? '通过' : '不通过'}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                        <div className="mt-2 flex text-xs">
                          <span className="text-gray-500 mr-2">检查标准:</span>
                          <span className="text-gray-700">{item.standard}</span>
                        </div>
                        {item.notes && (
                          <div className="mt-1 flex text-xs">
                            <span className="text-gray-500 mr-2">备注:</span>
                            <span className="text-gray-700">{item.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {/* 报告图片 */}
        {report.images && report.images.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">附图 ({report.images.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {report.images.map((image, index) => (
                <div 
                  key={image.id} 
                  className="overflow-hidden rounded-lg shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
                  onClick={() => handleImageClick(index)}
                >
                  <div 
                    className="h-48 bg-gray-200" 
                    style={{
                      backgroundImage: `url(${image.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                  <div className="p-3 bg-white">
                    <p className="text-sm text-gray-700">{image.caption}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(image.timestamp).toLocaleString('zh-CN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 元数据信息 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">报告元数据</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">创建时间</p>
              <p className="text-sm font-medium">
                {new Date(report.createdAt).toLocaleString('zh-CN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">最后更新</p>
              <p className="text-sm font-medium">
                {new Date(report.updatedAt).toLocaleString('zh-CN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 no-print">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex items-center mt-4">
          <button 
            onClick={handleBack}
            className="mr-3 flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回
          </button>
        </div>
      </div>
      
      <div className="print-section">
        {renderContent()}
      </div>
      
      {/* 图片查看器 */}
      {report?.images && report.images.length > 0 && (
        <ImageViewer
          images={report.images.map(img => ({
            id: img.id,
            url: img.url,
            caption: img.caption
          }))}
          initialIndex={selectedImageIndex}
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />
      )}
    </div>
  );
} 