import React, { useState } from 'react';

// 案件状态接口
export interface CaseStatus {
  referenceNumber: string;
  status: 'pending' | 'reviewing' | 'rejected' | 'approved' | 'resolved';
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  comments?: string[];
}

// 组件属性
interface CaseTrackingFormProps {
  onTrack: (referenceNumber: string) => Promise<CaseStatus | null>;
}

const CaseTrackingForm: React.FC<CaseTrackingFormProps> = ({ onTrack }) => {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [caseData, setCaseData] = useState<CaseStatus | null>(null);
  
  // 处理跟踪提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!referenceNumber.trim()) {
      setError('请输入案件编号');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await onTrack(referenceNumber);
      if (result) {
        setCaseData(result);
      } else {
        setError('未找到该案件编号的信息，请确认编号是否正确');
      }
    } catch (error) {
      console.error('查询案件状态时出错:', error);
      setError('查询失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };
  
  // 获取状态标签样式
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'resolved':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // 获取状态中文名称
  const getStatusName = (status: string) => {
    switch (status) {
      case 'pending': return '等待处理';
      case 'reviewing': return '正在审核';
      case 'rejected': return '已拒绝';
      case 'approved': return '已批准';
      case 'resolved': return '已解决';
      default: return status;
    }
  };
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };
  
  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="referenceNumber" className="block text-sm font-medium text-gray-700">
            案件编号
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              name="referenceNumber"
              id="referenceNumber"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="请输入您的案件编号，例如：IPR-20240601-1234"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className={`ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  查询中...
                </>
              ) : '查询状态'}
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            案件编号是您提交侵权举报后收到的唯一标识符，格式通常为 IPR-YYYYMMDD-XXXX
          </p>
        </div>
      </form>
      
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">查询错误</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {caseData && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">案件详情</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              案件编号: {caseData.referenceNumber}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">当前状态</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(caseData.status)}`}>
                    {getStatusName(caseData.status)}
                  </span>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">举报标题</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{caseData.title}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">提交时间</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formatDate(caseData.createdAt)}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">最后更新时间</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{formatDate(caseData.updatedAt)}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">侵权描述</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{caseData.description}</dd>
              </div>
              
              {caseData.comments && caseData.comments.length > 0 && (
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">处理进度与反馈</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {caseData.comments.map((comment, index) => (
                        <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span className="ml-2 flex-1 w-0 truncate">{comment}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      )}
      
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-sm font-medium text-gray-900 mb-2">需要帮助？</h3>
        <p className="text-sm text-gray-500">
          如果您在查询案件状态时遇到困难，或需要更多信息，请联系我们的客户支持团队：
          <span className="block mt-2">
            <a href="mailto:ip-support@example.com" className="text-blue-600 hover:text-blue-500">ip-support@example.com</a> 或拨打
            <a href="tel:+86-400-123-4567" className="text-blue-600 hover:text-blue-500"> +86 400-123-4567</a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default CaseTrackingForm; 