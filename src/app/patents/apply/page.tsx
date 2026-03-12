"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MultiStepForm, Step } from '@/components/form/MultiStepForm';
import { 
  InventionDescriptionStep, 
  DrawingsUploadStep, 
  InventorInfoStep,
  ApplicationTypeStep,
  ReviewSubmissionStep
} from '@/components/patent/PatentFormSteps';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { toast } from 'react-hot-toast';

export default function PatentApplicationPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // 申请表单数据状态
  const [formData, setFormData] = useState<Record<string, any>>({
    title: '',
    technicalField: '',
    background: '',
    summary: '',
    detailedDescription: '',
    drawings: [],
    inventors: [
      {
        name: '',
        phone: '',
        email: '',
        address: '',
        contribution: '',
      }
    ],
    applicationType: 'provisional',
  });

  // 各步骤表单验证
  const validateDescription = (data: typeof formData) => {
    if (!data.title?.trim()) return { valid: false, message: '发明标题不能为空' };
    if (!data.technicalField?.trim()) return { valid: false, message: '技术领域不能为空' };
    if (!data.summary?.trim()) return { valid: false, message: '摘要不能为空' };
    if (!data.detailedDescription?.trim()) return { valid: false, message: '详细描述不能为空' };
    return { valid: true };
  };

  const validateDrawings = (data: typeof formData) => {
    // 图纸上传是可选的，但如果有上传，需要检查是否有错误标记
    if (data.drawings?.some((drawing: any) => drawing.error)) {
      return { valid: false, message: '请修正图纸上传错误' };
    }
    return { valid: true };
  };

  const validateInventors = (data: typeof formData) => {
    if (!data.inventors || data.inventors.length === 0) {
      return { valid: false, message: '至少需要一位发明人' };
    }
    
    const primaryInventor = data.inventors[0];
    if (!primaryInventor.name?.trim() || 
        !primaryInventor.phone?.trim() || 
        !primaryInventor.email?.trim() || 
        !primaryInventor.address?.trim()) {
      return { valid: false, message: '主要发明人信息不完整' };
    }
    
    // 检查所有发明人信息
    for (let i = 0; i < data.inventors.length; i++) {
      const inventor = data.inventors[i];
      if (!inventor.name?.trim() || 
          !inventor.phone?.trim() || 
          !inventor.email?.trim() || 
          !inventor.address?.trim()) {
        return { valid: false, message: `发明人 ${i + 1} 信息不完整` };
      }
    }
    
    return { valid: true };
  };

  // 表单步骤定义
  const steps: Step[] = [
    {
      id: 1,
      name: '发明描述',
      component: <InventionDescriptionStep 
                   data={formData} 
                   updateData={(data) => updateFormData(data)} 
                 />,
      validator: validateDescription
    },
    {
      id: 2,
      name: '图纸上传',
      component: <DrawingsUploadStep 
                   data={formData} 
                   updateData={(data) => updateFormData(data)} 
                 />,
      validator: validateDrawings
    },
    {
      id: 3,
      name: '发明人信息',
      component: <InventorInfoStep 
                   data={formData} 
                   updateData={(data) => updateFormData(data)} 
                 />,
      validator: validateInventors
    },
    {
      id: 4,
      name: '申请类型',
      component: <ApplicationTypeStep 
                   data={formData} 
                   updateData={(data) => updateFormData(data)} 
                 />
    },
    {
      id: 5,
      name: '提交',
      component: <ReviewSubmissionStep 
                   data={formData} 
                   updateData={(data) => updateFormData(data)}
                 />
    }
  ];

  // 更新表单数据
  const updateFormData = (stepData: Record<string, any>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  // 保存草稿
  const saveDraft = (data: Record<string, any>) => {
    localStorage.setItem('patentApplicationDraft', JSON.stringify(data));
    toast.success('申请草稿已保存');
  };

  // 提交申请表单
  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 实际项目中应替换为真实API调用
      // const response = await fetch('/api/patents/apply', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // if (!response.ok) throw new Error('提交失败，请稍后重试');
      
      // 清除保存的草稿
      localStorage.removeItem('patentApplicationDraft');
      
      // 成功提示
      toast.success('专利申请已提交成功');
      
      // 重定向到专利列表页
      router.push('/patents');
    } catch (error) {
      console.error('提交专利申请失败:', error);
      setSubmitError(error instanceof Error ? error.message : '提交失败，请稍后重试');
      toast.error('提交失败，请检查表单并重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: '首页', href: '/' },
          { label: '我的专利', href: '/patents' },
          { label: '申请专利', href: '/patents/apply' },
        ]} 
      />
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">申请专利</h1>
        <p className="mt-2 text-gray-600">
          请完成以下步骤提交您的专利申请。您可以随时保存草稿，稍后继续。
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <MultiStepForm 
          steps={steps} 
          initialData={formData}
          onSubmit={handleSubmit}
          onSaveDraft={saveDraft}
        />
      </div>
    </div>
  );
} 