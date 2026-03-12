"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 定义FormField组件
interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  isTextarea?: boolean;
  rows?: number;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  note?: string;
  options?: { value: string; label: string }[];
  children?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ 
  label, 
  id, 
  name, 
  type = "text", 
  isTextarea = false, 
  rows = 3, 
  placeholder = "", 
  value, 
  onChange, 
  required = false,
  note,
  options,
  children
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    
    {isTextarea ? (
      <textarea
        id={id}
        name={name}
        rows={rows}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    ) : type === "select" && options ? (
      <select
        id={id}
        name={name}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : type === "file" ? (
      children
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    )}
    
    {note && <p className="mt-1 text-xs text-gray-500">{note}</p>}
  </div>
);

export default function NewFinancialRequestPage() {
  const pageTitle = "发起新的财务服务请求";
  const router = useRouter();

  const [formData, setFormData] = useState({
    serviceType: '',
    relatedProjectOrPeriod: '',
    requestDetails: '',
    attachments: [] as File[],
    notesToPlatform: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, attachments: Array.from(e.target.files) }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("New Financial Request Submitted:", formData);
    alert("您的财务服务请求已提交给平台。");
    router.push('/dashboard/designer/financial-collaboration');
  };

  const serviceTypes = [
    { value: "budget_consulting", label: "项目预算咨询与编制" },
    { value: "tax_planning_report", label: "税务筹划与申报辅导" },
    { value: "financial_statement_prep", label: "财务报表编制与解读" },
    { value: "cost_control_analysis", label: "成本控制分析" },
    { value: "other_financial_consult", label: "其他财务咨询" },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
        <p className="mt-1 text-gray-500">请详细填写您的财务服务需求。</p>
      </div>
      
      <div className="mt-8">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 md:p-8 space-y-6">
          <FormField 
            label="财务服务类型"
            id="serviceType"
            name="serviceType"
            type="select"
            options={serviceTypes}
            value={formData.serviceType}
            onChange={handleChange}
            placeholder="请选择财务服务类型"
            required
          />
          <FormField 
            label="关联项目或财务周期 (可选)"
            id="relatedProjectOrPeriod"
            name="relatedProjectOrPeriod"
            placeholder="例如：XX项目第二季度，2024年度财务"
            value={formData.relatedProjectOrPeriod}
            onChange={handleChange}
          />
          <FormField 
            label="详细需求描述"
            id="requestDetails"
            name="requestDetails"
            isTextarea
            rows={5}
            placeholder="请详细描述您的财务服务需求..."
            value={formData.requestDetails}
            onChange={handleChange}
            required
          />
           <FormField 
            label="附件上传 (可选)"
            id="attachments"
            name="attachments"
            type="file"
            note="可以上传项目合同、收支明细、过往报表等"
          >
            <input type="file" id="attachments" name="attachments" multiple onChange={handleFileChange} />
          </FormField>
          <FormField 
            label="给平台的备注 (可选)"
            id="notesToPlatform"
            name="notesToPlatform"
            isTextarea
            rows={3}
            placeholder="例如：希望对接有文创行业经验的财务顾问。"
            value={formData.notesToPlatform}
            onChange={handleChange}
          />
          <div className="pt-5 border-t flex justify-end space-x-3">
            <Link href="/dashboard/designer/financial-collaboration">
              <span className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md">取消</span>
            </Link>
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md">提交财务请求</button>
          </div>
        </form>
      </div>
    </>
  );
} 