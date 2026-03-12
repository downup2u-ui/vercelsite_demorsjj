import React, { useState } from 'react';
import { Patent } from '@/services/patentService';
import { TransferDetails } from './TransferDetailsForm';
import { RecipientInfo } from './RecipientInfoForm';
import { TermsAndDocuments, DocumentFile } from './TermsAndDocumentsForm';

// 提交状态类型
export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

// 转让申请提交结果
export interface SubmissionResult {
  success: boolean;
  referenceNumber?: string;
  message?: string;
}

interface ReviewAndSubmitFormProps {
  selectedPatents: Patent[];
  transferDetails: TransferDetails;
  recipientInfo: RecipientInfo;
  termsAndDocuments: TermsAndDocuments;
  onSubmit: () => Promise<SubmissionResult>;
  onPrint: () => void;
}

const ReviewAndSubmitForm: React.FC<ReviewAndSubmitFormProps> = ({
  selectedPatents,
  transferDetails,
  recipientInfo,
  termsAndDocuments,
  onSubmit,
  onPrint
}) => {
  // 提交状态
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  // 提交结果
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  // 展开收起各部分
  const [expanded, setExpanded] = useState({
    patents: true,
    details: true,
    recipient: true,
    terms: true
  });

  // 处理提交
  const handleSubmit = async () => {
    setSubmissionStatus('submitting');
    try {
      const result = await onSubmit();
      setSubmissionResult(result);
      setSubmissionStatus(result.success ? 'success' : 'error');
    } catch (error) {
      console.error('提交失败:', error);
      setSubmissionResult({
        success: false,
        message: '提交过程中发生错误，请稍后重试或联系客服。'
      });
      setSubmissionStatus('error');
    }
  };

  // 格式化日期显示
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  // 格式化付款方式
  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case 'bank': return '银行转账';
      case 'alipay': return '支付宝';
      case 'wechat': return '微信支付';
      case 'other': return '其他';
      default: return method;
    }
  };

  // 格式化接收方类型
  const formatRecipientType = (type: string) => {
    switch (type) {
      case 'individual': return '个人';
      case 'company': return '企业';
      case 'institution': return '机构/组织';
      default: return type;
    }
  };

  // 格式化转让类型
  const formatTransferType = (type: string) => {
    switch (type) {
      case 'sale': return '全权出售';
      case 'license': return '许可使用';
      case 'gift': return '赠予';
      case 'inheritance': return '继承';
      case 'other': return '其他';
      default: return type;
    }
  };

  // 渲染成功提交结果
  const renderSuccessResult = () => {
    return (
      <div className="bg-green-50 border border-green-300 rounded-lg p-6 text-center">
        <div className="flex justify-center mb-4">
          <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-green-800 mb-2">提交成功</h3>
        <p className="text-green-700 mb-4">您的专利转让申请已成功提交。</p>
        
        <div className="bg-white rounded-lg border border-green-200 p-4 mb-6 inline-block">
          <p className="text-gray-500 text-sm mb-1">申请参考编号:</p>
          <p className="text-lg font-medium text-gray-900">{submissionResult?.referenceNumber || 'TR-20240528-001'}</p>
        </div>
        
        <div className="space-y-4">
          <p className="text-green-700">
            您可以在"我的申请"页面查看申请进度。我们会通过邮件通知您申请状态的变更。
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={onPrint}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              打印申请
            </button>
            <a
              href="/my-applications"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              查看我的申请
            </a>
          </div>
        </div>
      </div>
    );
  };

  // 渲染错误提交结果
  const renderErrorResult = () => {
    return (
      <div className="bg-red-50 border border-red-300 rounded-lg p-6 text-center">
        <div className="flex justify-center mb-4">
          <svg className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-red-800 mb-2">提交失败</h3>
        <p className="text-red-700 mb-6">{submissionResult?.message || '提交过程中发生错误，请稍后重试。'}</p>
        
        <button
          type="button"
          onClick={() => setSubmissionStatus('idle')}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          返回修改
        </button>
      </div>
    );
  };

  // 如果已提交，显示结果
  if (submissionStatus === 'success') {
    return renderSuccessResult();
  }

  if (submissionStatus === 'error') {
    return renderErrorResult();
  }

  // 渲染审核内容
  return (
    <div className="space-y-8">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">提交前请仔细审核</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>请确认所有信息准确无误。提交后，您将无法编辑申请内容。</p>
            </div>
          </div>
        </div>
      </div>

      {/* 专利信息部分 */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div 
          className="bg-gray-50 px-4 py-3 flex justify-between cursor-pointer"
          onClick={() => setExpanded({...expanded, patents: !expanded.patents})}
        >
          <h3 className="text-lg font-medium text-gray-900">选中的专利 ({selectedPatents.length})</h3>
          <svg 
            className={`h-5 w-5 text-gray-500 transition-transform ${expanded.patents ? 'transform rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expanded.patents && (
          <div className="p-4 divide-y divide-gray-200">
            {selectedPatents.map(patent => (
              <div key={patent.id} className="py-3">
                <h4 className="font-medium text-gray-900">{patent.title}</h4>
                <div className="mt-1 text-sm text-gray-500">
                  <p>专利号: {patent.appNumber}</p>
                  <p>申请日: {formatDate(patent.filingDate)}</p>
                  <p>发明人: {patent.inventors.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 转让详情部分 */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div 
          className="bg-gray-50 px-4 py-3 flex justify-between cursor-pointer"
          onClick={() => setExpanded({...expanded, details: !expanded.details})}
        >
          <h3 className="text-lg font-medium text-gray-900">转让详情</h3>
          <svg 
            className={`h-5 w-5 text-gray-500 transition-transform ${expanded.details ? 'transform rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expanded.details && (
          <div className="p-4">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500">转让类型</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatTransferType(transferDetails.transferType)}</dd>
              </div>
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500">生效日期</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatDate(transferDetails.transferDate)}</dd>
              </div>
              {transferDetails.transferType === 'license' && (
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">排他性许可</dt>
                  <dd className="mt-1 text-sm text-gray-900">{transferDetails.exclusive ? '是' : '否'}</dd>
                </div>
              )}
              {transferDetails.transferReason && (
                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-500">转让原因</dt>
                  <dd className="mt-1 text-sm text-gray-900">{transferDetails.transferReason}</dd>
                </div>
              )}
              {transferDetails.transferType === 'license' && transferDetails.transferScope && (
                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-500">许可范围</dt>
                  <dd className="mt-1 text-sm text-gray-900">{transferDetails.transferScope}</dd>
                </div>
              )}
              {transferDetails.transferType === 'license' && transferDetails.territoryLimitation && (
                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-500">区域限制</dt>
                  <dd className="mt-1 text-sm text-gray-900">{transferDetails.territoryLimitation}</dd>
                </div>
              )}
              {transferDetails.otherLimitations && (
                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-500">其他限制条件</dt>
                  <dd className="mt-1 text-sm text-gray-900">{transferDetails.otherLimitations}</dd>
                </div>
              )}
              {transferDetails.additionalNotes && (
                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-500">附加说明</dt>
                  <dd className="mt-1 text-sm text-gray-900">{transferDetails.additionalNotes}</dd>
                </div>
              )}
            </dl>
          </div>
        )}
      </div>

      {/* 接收方信息部分 */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div 
          className="bg-gray-50 px-4 py-3 flex justify-between cursor-pointer"
          onClick={() => setExpanded({...expanded, recipient: !expanded.recipient})}
        >
          <h3 className="text-lg font-medium text-gray-900">接收方信息</h3>
          <svg 
            className={`h-5 w-5 text-gray-500 transition-transform ${expanded.recipient ? 'transform rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expanded.recipient && (
          <div className="p-4">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500">接收方类型</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatRecipientType(recipientInfo.recipientType)}</dd>
              </div>
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  {recipientInfo.recipientType === 'individual' ? '姓名' : 
                   recipientInfo.recipientType === 'company' ? '企业名称' : '机构名称'}
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{recipientInfo.name}</dd>
              </div>
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  {recipientInfo.recipientType === 'individual' ? '身份证号码' : '统一社会信用代码'}
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{recipientInfo.identifier}</dd>
              </div>
              {recipientInfo.recipientType !== 'individual' && recipientInfo.contactPerson && (
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">联系人</dt>
                  <dd className="mt-1 text-sm text-gray-900">{recipientInfo.contactPerson}</dd>
                </div>
              )}
              {recipientInfo.recipientType !== 'individual' && recipientInfo.position && (
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">职位</dt>
                  <dd className="mt-1 text-sm text-gray-900">{recipientInfo.position}</dd>
                </div>
              )}
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500">联系电话</dt>
                <dd className="mt-1 text-sm text-gray-900">{recipientInfo.phone}</dd>
              </div>
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500">电子邮箱</dt>
                <dd className="mt-1 text-sm text-gray-900">{recipientInfo.email}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-sm font-medium text-gray-500">详细地址</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {recipientInfo.country && recipientInfo.province && recipientInfo.city && recipientInfo.address && 
                    `${recipientInfo.country} ${recipientInfo.province} ${recipientInfo.city} ${recipientInfo.address}`}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>

      {/* 条款与文档部分 */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div 
          className="bg-gray-50 px-4 py-3 flex justify-between cursor-pointer"
          onClick={() => setExpanded({...expanded, terms: !expanded.terms})}
        >
          <h3 className="text-lg font-medium text-gray-900">条款与文档</h3>
          <svg 
            className={`h-5 w-5 text-gray-500 transition-transform ${expanded.terms ? 'transform rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {expanded.terms && (
          <div className="p-4">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500">转让费用</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {termsAndDocuments.transferFee ? `¥${termsAndDocuments.transferFee} CNY` : '-'}
                </dd>
              </div>
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500">付款方式</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {termsAndDocuments.paymentMethod ? formatPaymentMethod(termsAndDocuments.paymentMethod) : '-'}
                </dd>
              </div>
              {termsAndDocuments.paymentTerms && (
                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-500">付款条款</dt>
                  <dd className="mt-1 text-sm text-gray-900">{termsAndDocuments.paymentTerms}</dd>
                </div>
              )}
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500">保密条款</dt>
                <dd className="mt-1 text-sm text-gray-900">{termsAndDocuments.confidentiality ? '是' : '否'}</dd>
              </div>
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500">竞业限制</dt>
                <dd className="mt-1 text-sm text-gray-900">{termsAndDocuments.nonCompete ? '是' : '否'}</dd>
              </div>
              {termsAndDocuments.customTerms && (
                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-500">自定义条款</dt>
                  <dd className="mt-1 text-sm text-gray-900 whitespace-pre-line">{termsAndDocuments.customTerms}</dd>
                </div>
              )}
            </dl>

            {/* 上传的文档 */}
            {termsAndDocuments.documents.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">上传的文档</h4>
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  {termsAndDocuments.documents.map((doc: DocumentFile) => (
                    <li key={doc.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="ml-2 flex-1 w-0 truncate">
                          {doc.name}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 同意条款和提交按钮 */}
      <div className="space-y-6">
        <div className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agree"
              name="agree"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agree" className="font-medium text-gray-700">我已阅读并同意《专利转让协议》</label>
            <p className="text-gray-500">我确认以上所有信息真实有效，并同意承担相应法律责任。</p>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            打印
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submissionStatus === 'submitting'}
            className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
              submissionStatus === 'submitting' 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {submissionStatus === 'submitting' ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                提交中...
              </>
            ) : (
              '提交申请'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndSubmitForm; 