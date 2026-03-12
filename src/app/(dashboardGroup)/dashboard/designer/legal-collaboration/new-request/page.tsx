"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Reusable FormField component (can be extracted to a shared components folder)
const FormField: React.FC<{ 
  label: string; 
  id: string; 
  type?: string; 
  placeholder?: string; 
  required?: boolean; 
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: { value: string; label: string }[];
  isTextarea?: boolean;
  rows?: number;
  note?: string;
}> = ({ label, id, type = "text", placeholder, required, value, onChange, options, isTextarea, rows, note }) => (
  <div className="mb-6">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {note && <p className="mt-1 text-xs text-gray-500">{note}</p>}
    {isTextarea ? (
      <textarea
        id={id}
        name={id}
        rows={rows || 3}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    ) : type === "select" && options ? (
      <select
        id={id}
        name={id}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required={required}
        value={value}
        onChange={onChange}
        defaultValue=""
      >
        <option value="" disabled>{placeholder || `请选择 ${label}`}</option>
        {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    )}
  </div>
);

export default function NewLegalRequestPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    relatedProject: '',
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
      alert('法律服务请求已成功提交！');
      router.push('/dashboard/designer/legal-collaboration');
    } catch (error) {
      console.error('提交失败:', error);
      alert('提交请求时发生错误，请稍后重试。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceTypes = [
    { value: "contract_drafting", label: "合同起草 (如设计服务合同)" },
    { value: "contract_review", label: "合同审核" },
    { value: "nda_drafting", label: "保密协议 (NDA) 起草" },
    { value: "nda_review", label: "保密协议 (NDA) 审核" },
    { value: "ip_license_drafting", label: "IP授权协议起草" },
    { value: "ip_license_review", label: "IP授权协议审核" },
    { value: "ip_registration_consult", label: "知识产权登记咨询 (商标、版权等)" },
    { value: "dispute_resolution_consult", label: "纠纷解决咨询" },
    { value: "other_legal_consult", label: "其他法律咨询" },
  ];

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">创建法律咨询请求</h1>
          <Link 
            href="/dashboard/designer/legal-collaboration"
            className="text-indigo-600 hover:text-indigo-800"
          >
            返回请求列表
          </Link>
        </div>
        <p className="mt-1 text-gray-500">提交您的法律咨询需求，我们的专业法务顾问将为您提供帮助。</p>
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
              placeholder="例如：设计服务合同审核"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="relatedProject" className="block text-sm font-medium text-gray-700 mb-1">
              关联项目/作品 (可选)
            </label>
            <input
              type="text"
              id="relatedProject"
              name="relatedProject"
              value={formData.relatedProject}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="例如：北京办公空间设计项目"
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
              placeholder="请详细描述您的法律咨询需求，例如您需要什么类型的合同审核、遇到的法律问题等..."
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
            <p className="mt-1 text-xs text-gray-500">支持PDF, Word, Excel, JPG, PNG等常见文件格式，单个文件不超过10MB</p>
            
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
              href="/dashboard/designer/legal-collaboration"
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