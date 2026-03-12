import React, { useState, useEffect } from 'react';
import { QualityReport } from '@/services/qualityReportService';

interface ShareReportDialogProps {
  isOpen: boolean;
  report: QualityReport | null;
  onClose: () => void;
  onShare: (reportId: string, emails: string[]) => void;
  isSharing?: boolean;
}

const ShareReportDialog: React.FC<ShareReportDialogProps> = ({
  isOpen,
  report,
  onClose,
  onShare,
  isSharing = false
}) => {
  const [emails, setEmails] = useState<string[]>(['']);
  const [errors, setErrors] = useState<string[]>([]);
  
  // 重置表单
  useEffect(() => {
    if (isOpen) {
      setEmails(['']);
      setErrors([]);
    }
  }, [isOpen]);
  
  // 监听ESC键关闭对话框
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  if (!isOpen || !report) return null;
  
  // 添加新邮箱输入框
  const handleAddEmail = () => {
    setEmails([...emails, '']);
    setErrors([...errors, '']);
  };
  
  // 删除邮箱输入框
  const handleRemoveEmail = (index: number) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
    
    const newErrors = [...errors];
    newErrors.splice(index, 1);
    setErrors(newErrors);
  };
  
  // 更新邮箱值
  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
    
    // 清除错误
    const newErrors = [...errors];
    newErrors[index] = '';
    setErrors(newErrors);
  };
  
  // 验证邮箱
  const validateEmails = (): boolean => {
    const newErrors = emails.map(email => {
      if (!email.trim()) return '请输入邮箱地址';
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) return '请输入有效的邮箱地址';
      
      return '';
    });
    
    setErrors(newErrors);
    return newErrors.every(error => !error);
  };
  
  // 提交
  const handleSubmit = () => {
    if (validateEmails()) {
      // 过滤掉空邮箱
      const validEmails = emails.filter(email => email.trim());
      onShare(report.id, validEmails);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
        {/* 背景遮罩 */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>
        
        {/* 对话框内容 */}
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                <h3 className="text-base font-semibold leading-6 text-gray-900">分享报告</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-4">
                    您正在分享质检报告 "{report.title}"。请输入接收人的邮箱地址。
                  </p>
                  
                  {/* 邮箱输入区域 */}
                  <div className="space-y-3 mt-4">
                    {emails.map((email, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="flex-1">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => handleEmailChange(index, e.target.value)}
                            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${
                              errors[index] ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                            }`}
                            placeholder="example@company.com"
                            disabled={isSharing}
                          />
                          {errors[index] && (
                            <p className="mt-1 text-sm text-red-600">{errors[index]}</p>
                          )}
                        </div>
                        {emails.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveEmail(index)}
                            className="text-red-500 hover:text-red-700"
                            disabled={isSharing}
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* 添加更多邮箱 */}
                  <button
                    type="button"
                    onClick={handleAddEmail}
                    className="mt-3 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                    disabled={isSharing}
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    添加更多接收人
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 按钮区域 */}
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto ${
                isSharing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={handleSubmit}
              disabled={isSharing}
            >
              {isSharing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  处理中...
                </>
              ) : '分享'}
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={onClose}
              disabled={isSharing}
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareReportDialog; 