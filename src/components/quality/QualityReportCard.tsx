import React, { useState } from 'react';
import { QualityReport } from '@/services/qualityReportService';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

interface QualityReportCardProps {
  report: QualityReport;
  onView: (reportId: string) => void;
  onDownload: (reportId: string) => void;
  onShare?: (reportId: string) => void;
  onDelete?: (reportId: string) => void;
  onMarkForReview?: (reportId: string) => void;
  isDownloading?: boolean;
  currentUserRole?: string;
}

const QualityReportCard: React.FC<QualityReportCardProps> = ({ 
  report, 
  onView, 
  onDownload,
  onShare,
  onDelete,
  onMarkForReview,
  isDownloading = false,
  currentUserRole = 'user' // 默认用户角色
}) => {
  // 对话框状态
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  
  // 检查用户权限
  const canDelete = currentUserRole === 'admin' || currentUserRole === 'manager';
  const canMarkForReview = true; // 所有角色都可以标记为审核
  
  // 渲染状态标签
  const renderStatusBadge = () => {
    switch (report.status) {
      case 'approved':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">已批准</span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">未通过</span>;
      case 'review':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">审核中</span>;
      default:
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">草稿</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
            <p className="text-sm text-gray-500">
              {new Date(report.createdAt).toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          {renderStatusBadge()}
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{report.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
            项目: {report.projectName}
          </span>
          <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
            检查员: {report.inspectorName}
          </span>
          {report.tags && report.tags.map(tag => (
            <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="flex space-x-2">
            <button 
              className="text-sm text-gray-600 hover:text-gray-900 px-2 py-1 rounded flex items-center"
              onClick={() => onView(report.id)}
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              查看
            </button>
            
            <button 
              className="text-sm text-gray-600 hover:text-gray-900 px-2 py-1 rounded flex items-center"
              onClick={() => onDownload(report.id)}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  下载中
                </>
              ) : (
                <>
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  下载
                </>
              )}
            </button>
          </div>
          
          <div className="flex space-x-1">
            {onShare && (
              <button 
                className="text-sm text-gray-600 hover:text-blue-600 p-1 rounded-full"
                onClick={() => setIsShareDialogOpen(true)}
                title="分享报告"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            )}
            
            {onMarkForReview && canMarkForReview && report.status !== 'review' && (
              <button 
                className="text-sm text-gray-600 hover:text-yellow-600 p-1 rounded-full"
                onClick={() => setIsReviewDialogOpen(true)}
                title="标记为审核"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            )}
            
            {onDelete && canDelete && (
              <button 
                className="text-sm text-gray-600 hover:text-red-600 p-1 rounded-full"
                onClick={() => setIsDeleteDialogOpen(true)}
                title="删除报告"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* 确认对话框 */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="删除报告"
        message={`您确定要删除报告 "${report.title}" 吗？此操作无法撤销。`}
        confirmText="删除"
        cancelText="取消"
        onConfirm={() => {
          if (onDelete) onDelete(report.id);
          setIsDeleteDialogOpen(false);
        }}
        onCancel={() => setIsDeleteDialogOpen(false)}
        type="danger"
      />
      
      <ConfirmDialog
        isOpen={isReviewDialogOpen}
        title="标记为审核"
        message={`您确定要将报告 "${report.title}" 标记为需要审核吗？`}
        confirmText="确认"
        cancelText="取消"
        onConfirm={() => {
          if (onMarkForReview) onMarkForReview(report.id);
          setIsReviewDialogOpen(false);
        }}
        onCancel={() => setIsReviewDialogOpen(false)}
        type="warning"
      />
      
      <ConfirmDialog
        isOpen={isShareDialogOpen}
        title="分享报告"
        message={`您确定要分享报告 "${report.title}" 吗？该报告将通过邮件发送给相关人员。`}
        confirmText="分享"
        cancelText="取消"
        onConfirm={() => {
          if (onShare) onShare(report.id);
          setIsShareDialogOpen(false);
        }}
        onCancel={() => setIsShareDialogOpen(false)}
        type="info"
      />
    </div>
  );
};

export default QualityReportCard; 