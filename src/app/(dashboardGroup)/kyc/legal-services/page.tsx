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
 * LegalServicesKycPage component renders the KYC (Know Your Customer) form 
 * specifically tailored for users or firms providing Legal Services.
 * It collects service provider type, basic, professional qualification, and service information as defined in KYC.md.
 */
export default function LegalServicesKycPage() {
  const professionName = "法律服务 (Legal Services)";
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("表单提交成功! (占位符)");
  };

  return (
    <div className="container mx-auto p-8 font-sans bg-gray-50 min-h-screen">
      <header className="mb-10">
        <Link href="/test-professions" className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300 text-sm">&larr; 返回职业选择页</Link>
        <h1 className="text-3xl font-bold text-gray-800 mt-4">KYC 表单: {professionName}</h1>
        <p className="text-gray-600 mt-1">请填写以下信息以完成您的执业资料认证。</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl space-y-8">
        
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">服务方类型</h2>
          <FormField 
            label="服务方类型"
            id="serviceProviderType"
            type="select"
            options={["律师事务所", "独立执业律师"]}
            placeholder="请选择服务方类型"
          />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">基本信息</h2>
          <FormField label="姓名 / 机构名称" id="nameOrOrgName" placeholder="请输入您的姓名或律所/机构全称" />
          <FormField label="联系方式 (电话)" id="phone" type="tel" placeholder="您的工作电话" />
          <FormField label="联系方式 (邮箱)" id="email" type="email" placeholder="您的工作邮箱" />
          <FormField label="所在地" id="location" placeholder="您或机构所在的城市" />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">专业资质</h2>
          <FormField label="执业资质证明" id="practiceLicense" placeholder="例如律师执业证编号、律所执业许可证号" />
          <FormField label="擅长领域" id="specializedAreas" isTextarea placeholder="例如: 知识产权, 合同纠纷, 公司法务等 (可多选)" />
          <FormField label="身份证信息 (个人律师需提供)" id="idCardPersonal" type="file" />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">服务信息</h2>
          <FormField label="服务内容" id="serviceContent" isTextarea placeholder="例如: 法律咨询, 合同草拟与审查, 代理诉讼等" />
          <FormField label="案例经验 (可匿名或概括性描述)" id="caseExperience" isTextarea placeholder="简述代表性案例或项目经验" />
          <FormField label="使用工具 (可选)" id="toolsUsedOptional" placeholder="例如: 法律数据库, 案件管理软件等" />
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
