"use client";

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { MultiStepForm, Step } from '@/components/form/MultiStepForm';
import { 
  InventionDescriptionStep, 
  DrawingsUploadStep,
  InventorInfoStep,
  ApplicationTypeStep,
  ReviewSubmissionStep
} from '@/components/patent/PatentFormSteps';
import { toast } from 'react-hot-toast';

// 禁用此页面的预渲染
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

function PatentApplicationContent() {
  // 状态管理
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 面包屑导航
  const breadcrumbItems = [
    { label: '首页', href: '/' },
    { label: '知识产权', href: '#' },
    { label: '专利申请', href: '/patent-application', active: true }
  ];

  // 更新表单数据
  function updateFormData(newData: Record<string, any>) {
    setFormData(prevData => ({ ...prevData, ...newData }));
  }

  // 处理表单提交
  const handleSubmit = async (data: Record<string, any>) => {
    try {
      setSubmitting(true);
      setError(null);
      console.log('提交专利申请:', data);
      // 这里将来会添加实际的API调用
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('专利申请已提交，我们将尽快处理您的申请');
      
      // 清除localStorage中的草稿
      localStorage.removeItem('patentApplicationDraft');
      
      // 提交成功后可以重定向到确认页面或专利列表
      setTimeout(() => {
        window.location.href = '/patents';
      }, 2000);
    } catch (err: any) {
      console.error('申请提交失败:', err);
      setError(err.message || '申请提交失败，请重试');
      toast.error('申请提交失败，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  // 异步提交包装器，供ReviewSubmissionStep使用
  const handleReviewSubmit = async () => {
    await handleSubmit(formData);
  };

  // 处理保存草稿
  const handleSaveDraft = (data: Record<string, any>) => {
    console.log('保存草稿:', data);
    localStorage.setItem('patentApplicationDraft', JSON.stringify(data));
    toast.success('申请草稿已保存');
  };

  // 表单步骤定义
  const steps: Step[] = [
    {
      id: 1,
      name: '发明描述',
      component: <InventionDescriptionStep data={formData} updateData={updateFormData} />,
      validator: (data) => {
        if (!data.title?.trim()) return { valid: false, message: '请输入发明名称' };
        if (!data.technicalField?.trim()) return { valid: false, message: '请输入技术领域' };
        if (!data.summary?.trim()) return { valid: false, message: '请输入发明摘要' };
        if (!data.detailedDescription?.trim()) return { valid: false, message: '请输入详细描述' };
        return { valid: true };
      }
    },
    {
      id: 2,
      name: '图纸上传',
      component: <DrawingsUploadStep data={formData} updateData={updateFormData} />,
      // 图纸上传步骤是可选的，没有验证
    },
    {
      id: 3,
      name: '发明人信息',
      component: <InventorInfoStep data={formData} updateData={updateFormData} />,
      validator: (data) => {
        if (!data.inventors?.length) return { valid: false, message: '请添加至少一位发明人' };
        const inventor = data.inventors[0];
        if (!inventor?.name?.trim()) return { valid: false, message: '请输入主要发明人姓名' };
        if (!inventor?.phone?.trim()) return { valid: false, message: '请输入联系电话' };
        if (!inventor?.email?.trim()) return { valid: false, message: '请输入电子邮箱' };
        if (!inventor?.address?.trim()) return { valid: false, message: '请输入联系地址' };
        return { valid: true };
      }
    },
    {
      id: 4,
      name: '申请类型',
      component: <ApplicationTypeStep data={formData} updateData={updateFormData} />,
      validator: (data) => {
        if (!data.applicationType) return { valid: false, message: '请选择申请类型' };
        return { valid: true };
      }
    },
    {
      id: 5,
      name: '审核提交',
      component: <ReviewSubmissionStep 
        data={formData} 
        onSubmit={handleReviewSubmit}
        submitting={submitting}
        error={error}
      />,
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-3xl font-bold">专利申请</h1>
        </div>
        <p className="text-gray-600 mt-2">
          通过多步骤流程申请专利，保护您的创新设计和发明。请填写所有必要信息以确保您的申请能够顺利处理。
        </p>
      </div>

      {/* 专利申请表单容器 */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">申请表单</h2>
          <p className="text-gray-600 mt-2">请完成所有必要步骤以提交您的专利申请</p>
        </div>
        
        <div className="p-6">
          <MultiStepForm 
            steps={steps}
            initialData={formData}
            onSubmit={handleSubmit}
            onSaveDraft={handleSaveDraft}
          />
        </div>
      </div>

      {/* 专利申请说明和帮助 */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">申请指南</h2>
          <p className="text-gray-600 mt-2">了解专利申请流程和注意事项</p>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-lg mb-2">申请流程</h3>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                <li>填写发明描述，包括技术领域、背景、摘要和详细描述</li>
                <li>上传相关图纸和支持文件，增强申请有效性</li>
                <li>提供发明人信息，可添加多位发明人</li>
                <li>选择申请类型（如临时申请、非临时申请等）</li>
                <li>提交申请并等待审核</li>
              </ol>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">申请须知</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>确保您的发明具有新颖性、创造性和实用性</li>
                <li>详细描述您的发明，使专业人士能够理解并实施</li>
                <li>提供清晰的技术图纸，标注重要结构和功能</li>
                <li>准确填写所有发明人信息，确保权益分配明确</li>
                <li>申请提交后会进入审查阶段，可能需要3-5年时间</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-lg mb-2">需要帮助？</h3>
            <p className="text-gray-700">
              如果您在申请过程中遇到任何问题，可以联系我们的专利顾问获取专业支持和建议。
            </p>
            <div className="mt-4">
              <Link 
                href="/services/legal-compliance"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                咨询专利顾问 &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PatentApplicationPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">加载中...</div>}>
      <PatentApplicationContent />
    </Suspense>
  );
} 