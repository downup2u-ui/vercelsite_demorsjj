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
 * TechnicalSupportKycPage component renders the KYC (Know Your Customer) form 
 * specifically tailored for users or teams providing Technical Support.
 * It collects professional subdivision, basic, and professional information as defined in KYC.md.
 */
export default function TechnicalSupportKycPage() {
  const professionName = "技术支持 (Technical Support)";
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
          <FormField label="主要技术支持领域" id="supportArea" placeholder="例如: 3D打印技术人员/团队, CAD/CAM软件专家 (可多选)" />
          <FormField label="其他技术支持领域 (请注明)" id="supportAreaOther" placeholder="若上方未包含您的领域" />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">基本信息</h2>
          <FormField label="姓名 / 团队名称 / 昵称" id="nameOrTeam" placeholder="您的姓名或团队名称" />
          <FormField label="联系方式 (手机)" id="phone" type="tel" placeholder="您的联系手机" />
          <FormField label="联系方式 (邮箱)" id="email" type="email" placeholder="您的联系邮箱" />
          <FormField label="所在地城市" id="city" placeholder="您或团队所在的城市" />
          <FormField label="身份证信息 (个人需提供)" id="idCardIndividual" type="file" />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">专业信息</h2>
          <FormField label="技术领域或技能方向" id="technicalDomain" isTextarea placeholder="请描述您的核心技术领域" />
          <FormField label="熟练软件或硬件平台" id="platforms" isTextarea placeholder="请列举您熟练操作的软件或硬件" />
          <FormField label="服务内容" id="serviceContent" isTextarea placeholder="例如: 技术支持, 故障排除, 培训, 定制开发等" />
          <FormField label="项目链接或案例经验 (可选)" id="projectLinks" type="url" placeholder="相关项目或案例的在线链接" />
          <FormField label="技能证书或厂商认证 (可选)" id="certificationsTechnical" isTextarea placeholder="请列举相关技术认证" />
          <FormField label="使用工具 (可选)" id="toolsUsedTechSupport" placeholder="例如: 特定的诊断工具, 远程协作软件等" />
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
