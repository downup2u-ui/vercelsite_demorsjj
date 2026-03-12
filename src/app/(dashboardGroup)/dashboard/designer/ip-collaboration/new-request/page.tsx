"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Removed: import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function NewIPRequestPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ipType: '',
    relatedWork: '',
    attachments: [] as File[],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Convert FileList to array and append to existing attachments
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles]
      }));
    }
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '请输入请求标题';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = '请输入详细描述';
    }
    
    if (!formData.ipType) {
      newErrors.ipType = '请选择知识产权类型';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 模拟API请求
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 在实际应用中，这里会提交表单数据到后端API
      console.log('提交数据:', formData);
      
      // 模拟成功响应
      alert('知识产权服务请求已成功提交！');
      router.push('/dashboard/designer/ip-collaboration');
    } catch (error) {
      console.error('提交失败:', error);
      alert('提交请求时发生错误，请稍后重试。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 知识产权类型选项
  const ipTypeOptions = [
    { value: '', label: '请选择知识产权类型' },
    { value: 'trademark', label: '商标注册/保护' },
    { value: 'copyright', label: '版权登记/保护' },
    { value: 'patent', label: '专利申请/保护' },
    { value: 'industrial_design', label: '外观设计专利' },
    { value: 'licensing', label: '知识产权许可' },
    { value: 'infringement', label: '侵权分析/应对' },
    { value: 'consultation', label: '一般知识产权咨询' },
  ];

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">创建知识产权咨询请求</h1>
          <Link 
            href="/dashboard/designer/ip-collaboration"
            className="text-indigo-600 hover:text-indigo-800"
          >
            返回请求列表
          </Link>
        </div>
        <p className="mt-1 text-gray-500">提交您的知识产权咨询需求，我们的专业顾问将为您提供保护和建议。</p>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              请求标题 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="例如：LOGO商标注册咨询"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="ipType" className="block text-sm font-medium text-gray-700 mb-1">
              知识产权类型 <span className="text-red-500">*</span>
            </label>
            <select
              id="ipType"
              name="ipType"
              value={formData.ipType}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.ipType ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            >
              {ipTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.ipType && <p className="mt-1 text-sm text-red-600">{errors.ipType}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="relatedWork" className="block text-sm font-medium text-gray-700 mb-1">
              关联作品/IP (可选)
            </label>
            <input
              type="text"
              id="relatedWork"
              name="relatedWork"
              value={formData.relatedWork}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="例如：品牌LOGO、插画系列、产品设计等"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              详细描述 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="请详细描述您的知识产权需求，例如您希望保护什么作品，遇到了什么问题等..."
            ></textarea>
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              上传附件 (可选)
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <p className="mt-1 text-xs text-gray-500">支持图片、PDF等格式，可上传作品样稿、设计图或其他相关文件</p>
            
            {formData.attachments.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">已选择的文件:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {formData.attachments.map((file, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span>{file.name} ({(file.size / 1024).toFixed(0)} KB)</span>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        删除
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="pt-5 border-t border-gray-200 flex justify-end space-x-3">
            <Link
              href="/dashboard/designer/ip-collaboration"
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              取消
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? '提交中...' : '提交请求'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
} 