"use client";

import Link from 'next/link';
import { useState } from 'react';

/**
 * FormField is a reusable helper component for rendering various types of form inputs,
 * including text inputs, textareas, and select dropdowns.
 * It standardizes the layout and styling for form fields across KYC pages.
 */
const FormField = ({ label, id, type = "text", placeholder, isTextarea = false, options }: { label: string; id: string; type?: string; placeholder?: string; isTextarea?: boolean; options?: string[] }) => (
  <div className="mb-6">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {isTextarea ? (
      <textarea
        id={id}
        name={id}
        rows={3}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={placeholder}
      />
    ) : type === "select" && options ? (
      <select
        id={id}
        name={id}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">{placeholder || `请选择 ${label}`}</option>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={placeholder}
      />
    )}
  </div>
);

/**
 * FinancialServicesKycPage component renders the KYC (Know Your Customer) form 
 * specifically tailored for users providing Financial Services.
 * It collects professional subdivision, basic, and professional information as defined in KYC.md.
 */
export default function FinancialServicesKycPage() {
  const professionName = "财务服务 (Financial Services)";
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("表单提交成功! (占位符)");
  };

  return (
    <div className="container mx-auto p-8 font-sans bg-gray-50 min-h-screen">
      <header className="mb-10">
        <Link href="/test-professions" className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300 text-sm">&larr; 返回职业选择页</Link>
        <h1 className="text-3xl font-bold text-gray-800 mt-4">KYC 表单: {professionName}</h1>
        <p className="text-gray-600 mt-1">请填写以下信息以完成您的专业资料认证。</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl space-y-8">
        
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">职业细分</h2>
          <FormField label="主要财务职位" id="financeRole" placeholder="例如: 出纳, 财务会计师, 注册会计师 (CPA) (可多选)" />
          <FormField label="其他财务职位 (请注明)" id="financeRoleOther" placeholder="若上方未包含您的职位" />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">基本信息</h2>
          <FormField label="姓名 / 昵称" id="name" placeholder="您的姓名" />
          <FormField label="联系方式 (手机)" id="phone" type="tel" placeholder="您的手机号码" />
          <FormField label="联系方式 (邮箱)" id="email" type="email" placeholder="您的电子邮箱" />
          <FormField label="所在地城市" id="city" placeholder="您目前所在的城市" />
          <FormField label="身份证信息 (扫描件/照片)" id="idCard" type="file" />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">专业信息</h2>
          <FormField label="专业技能" id="professionalSkills" isTextarea placeholder="例如: 账务处理, 税务筹划, 财务报表编制, 审计等" />
          <FormField label="经验年限" id="yearsExperience" type="number" placeholder="您的财务领域从业年限" />
          <FormField label="专业领域" id="specializedIndustry" placeholder="例如: 特定行业的财务经验 (可选)" />
          <FormField label="项目经验 (可选)" id="projectExperienceOptional" isTextarea placeholder="请列举主要参与或负责的财务项目" />
          <FormField label="专业证书" id="professionalCertificates" isTextarea placeholder="例如: 会计从业资格证, CPA证书, 税务师证书等" />
          <FormField label="使用工具" id="toolsUsed" isTextarea placeholder="例如: 用友, 金蝶, Excel高级应用, QuickBooks等" />
          <FormField label="服务类型或模式" id="serviceType" placeholder="例如: 兼职财务, 项目制审计, 税务咨询" />
          <FormField label="入驻理由" id="joiningReason" isTextarea placeholder="请简述您希望入驻本平台的理由" />
        </section>

        <div className="pt-8 border-t mt-8">
          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            提交审核
          </button>
        </div>
      </form>
    </div>
  );
} 
