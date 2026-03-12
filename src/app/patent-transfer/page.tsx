"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import PatentSelectionComponent from '@/components/patent/PatentSelectionComponent';
import TransferDetailsForm, { TransferDetails } from '@/components/patent/TransferDetailsForm';
import RecipientInfoForm, { RecipientInfo } from '@/components/patent/RecipientInfoForm';
import TermsAndDocumentsForm, { TermsAndDocuments } from '@/components/patent/TermsAndDocumentsForm';
import ReviewAndSubmitForm, { SubmissionResult } from '@/components/patent/ReviewAndSubmitForm';
import { Patent } from '@/services/patentService';
import { submitTransferApplication } from '@/services/transferService';

export default function PatentTransferPage() {
  const router = useRouter();
  
  // 定义步骤
  const steps = [
    { id: 'select', name: '选择专利' },
    { id: 'details', name: '转让详情' },
    { id: 'recipient', name: '接收方信息' },
    { id: 'terms', name: '条款与文档' },
    { id: 'review', name: '审核与提交' }
  ];
  
  // 当前步骤状态
  const [currentStep, setCurrentStep] = useState('select');
  
  // 选中的专利
  const [selectedPatents, setSelectedPatents] = useState<Patent[]>([]);
  
  // 转让详情
  const [transferDetails, setTransferDetails] = useState<TransferDetails>({
    transferType: 'sale',
    transferDate: new Date().toISOString().split('T')[0],
  });
  
  // 接收方信息
  const [recipientInfo, setRecipientInfo] = useState<RecipientInfo>({
    recipientType: 'company',
    name: '',
    identifier: '',
    phone: '',
    email: '',
    address: '',
    country: '',
    province: '',
    city: '',
  });
  
  // 条款和文档
  const [termsAndDocuments, setTermsAndDocuments] = useState<TermsAndDocuments>({
    confidentiality: false,
    nonCompete: false,
    customTerms: '',
    transferFee: '',
    paymentMethod: '',
    paymentTerms: '',
    documents: []
  });
  
  // 处理专利选择
  const handleSelectPatent = (patent: Patent) => {
    setSelectedPatents(prev => [...prev, patent]);
  };
  
  // 处理专利移除
  const handleRemovePatent = (patentId: string) => {
    setSelectedPatents(prev => prev.filter(p => p.id !== patentId));
  };
  
  // 面包屑导航
  const breadcrumbItems = [
    { label: '首页', href: '/' },
    { label: '知识产权', href: '#' },
    { label: '专利转让', href: '/patent-transfer' },
  ];
  
  // 处理提交申请
  const handleSubmitApplication = async (): Promise<SubmissionResult> => {
    try {
      const response = await submitTransferApplication({
        selectedPatents,
        transferDetails,
        recipientInfo,
        termsAndDocuments
      });
      
      return {
        success: response.success,
        referenceNumber: response.referenceNumber,
        message: response.message
      };
    } catch (error) {
      console.error('提交申请失败:', error);
      return {
        success: false,
        message: '提交申请时发生错误，请稍后重试'
      };
    }
  };
  
  // 处理打印
  const handlePrint = () => {
    window.print();
  };
  
  // 渲染步骤导航
  const renderStepNav = () => {
    return (
      <nav aria-label="Progress" className="mb-8">
        <ol className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => {
            const isCurrent = step.id === currentStep;
            const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
            
            return (
              <li key={step.id} className="md:flex-1">
                <div className={`group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 ${
                  isCurrent ? 'border-blue-600 md:border-blue-600' : 
                  isCompleted ? 'border-green-500 md:border-green-500' : 
                  'border-gray-200 md:border-gray-200'}`}>
                  <span className={`text-sm font-medium ${
                    isCurrent ? 'text-blue-600' : 
                    isCompleted ? 'text-green-500' : 
                    'text-gray-500'}`}>
                    {step.name}
                  </span>
                  <span className="text-sm">
                    {index + 1} / {steps.length}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  };
  
  // 渲染内容
  const renderContent = () => {
    let content;
    
    switch(currentStep) {
      case 'select':
        content = (
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">选择专利</h3>
            <p className="mb-4 text-gray-600">请选择您要转让的专利。您可以选择一个或多个专利进行转让操作。</p>
            <PatentSelectionComponent 
              selectedPatents={selectedPatents}
              onSelectPatent={handleSelectPatent}
              onRemovePatent={handleRemovePatent}
            />
          </div>
        );
        break;
      case 'details':
        content = (
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">转让详情</h3>
            <p className="mb-4 text-gray-600">请选择转让类型并填写相关详情信息。</p>
            <TransferDetailsForm 
              value={transferDetails}
              onChange={setTransferDetails}
            />
          </div>
        );
        break;
      case 'recipient':
        content = (
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">接收方信息</h3>
            <p className="mb-4 text-gray-600">请填写接收方的详细信息。</p>
            <RecipientInfoForm 
              value={recipientInfo}
              onChange={setRecipientInfo}
            />
          </div>
        );
        break;
      case 'terms':
        content = (
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">条款与文档</h3>
            <p className="mb-4 text-gray-600">请指定转让条款并上传相关法律文档。</p>
            <TermsAndDocumentsForm
              value={termsAndDocuments}
              onChange={setTermsAndDocuments}
            />
          </div>
        );
        break;
      case 'review':
        content = (
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">审核与提交</h3>
            <p className="mb-4 text-gray-600">请审核所有信息并提交转让申请。</p>
            <ReviewAndSubmitForm
              selectedPatents={selectedPatents}
              transferDetails={transferDetails}
              recipientInfo={recipientInfo}
              termsAndDocuments={termsAndDocuments}
              onSubmit={handleSubmitApplication}
              onPrint={handlePrint}
            />
          </div>
        );
        break;
      default:
        content = <div>未知步骤</div>;
    }
    
    return content;
  };
  
  // 导航按钮
  const renderNavButtons = () => {
    const currentStepIndex = steps.findIndex(step => step.id === currentStep);
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;
    
    // 验证当前步骤是否可以继续
    const canProceed = () => {
      if (currentStep === 'select') {
        return selectedPatents.length > 0;
      } else if (currentStep === 'details') {
        // 验证转让详情
        return transferDetails.transferType && transferDetails.transferDate;
      } else if (currentStep === 'recipient') {
        // 验证接收方信息（简化版，实际应用中需要更详细的验证）
        return recipientInfo.name && recipientInfo.identifier && 
               recipientInfo.phone && recipientInfo.email && 
               recipientInfo.country && recipientInfo.province && 
               recipientInfo.city && recipientInfo.address;
      } else if (currentStep === 'terms') {
        // 验证条款和文档，至少要有转让费用和付款方式
        return !!termsAndDocuments.transferFee && !!termsAndDocuments.paymentMethod;
      }
      return true; // 其他步骤的验证将在各自组件中实现
    };
    
    // 如果是最后一步，隐藏导航按钮（因为ReviewAndSubmitForm中有自己的按钮）
    if (isLastStep) {
      return null;
    }
    
    return (
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={() => {
            if (!isFirstStep) {
              setCurrentStep(steps[currentStepIndex - 1].id);
            } else {
              router.push('/'); // 返回首页或其他适当页面
            }
          }}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          {isFirstStep ? '取消' : '上一步'}
        </button>
        
        <button
          type="button"
          onClick={() => {
            if (!isLastStep && canProceed()) {
              setCurrentStep(steps[currentStepIndex + 1].id);
            }
          }}
          disabled={!canProceed()}
          className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            canProceed() 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-blue-300 cursor-not-allowed'
          }`}
        >
          下一步
        </button>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-gray-900">专利转让</h1>
          <p className="mt-2 text-gray-600">通过此页面，您可以将您的专利转让给其他个人或组织。请按照步骤操作以完成转让流程。</p>
        </div>
      </div>
      
      {renderStepNav()}
      
      {renderContent()}
      
      {renderNavButtons()}
    </div>
  );
} 