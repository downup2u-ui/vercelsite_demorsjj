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
 * EquipmentVendorKycPage component renders the KYC (Know Your Customer) form 
 * specifically tailored for users registering as Equipment Vendors or Companies.
 * It collects company type, basic, qualification, and cooperation information as defined in KYC.md.
 */
export default function EquipmentVendorKycPage() {
  const professionName = "设备厂商/公司 (Equipment Vendor/Company)";
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("表单提交成功! (占位符)");
  };

  return (
    <div className="container mx-auto p-8 font-sans bg-gray-50 min-h-screen">
      <header className="mb-10">
        <Link href="/test-professions" className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300 text-sm">&larr; 返回职业选择页</Link>
        <h1 className="text-3xl font-bold text-gray-800 mt-4">KYC 表单: {professionName}</h1>
        <p className="text-gray-600 mt-1">请填写以下信息以完成贵公司的资料认证。</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl space-y-8">
        
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">公司类型</h2>
          <FormField 
            label="主要公司类型"
            id="companyType"
            type="select"
            options={["3D打印服务平台/厂商", "平面打印制作厂商/公司", "3D打印耗材厂商/公司"]}
            placeholder="请选择公司类型"
          />
          <FormField label="其他公司类型 (请注明)" id="companyTypeOther" placeholder="若上方未包含贵公司类型" />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">基本信息</h2>
          <FormField label="公司全称" id="companyFullName" placeholder="请输入公司完整名称" />
          <FormField label="联系方式 (公司电话)" id="companyPhone" type="tel" placeholder="公司总机或业务电话" />
          <FormField label="联系方式 (业务邮箱)" id="companyEmail" type="email" placeholder="公司业务邮箱" />
          <FormField label="公司注册所在地城市" id="companyCity" placeholder="公司注册地" />
          <FormField label="法人代表姓名" id="legalRepresentativeName" placeholder="公司法人姓名" />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">资质文件</h2>
          <FormField label="公司营业执照 (统一社会信用代码)" id="businessLicense" type="file" />
          <p className="text-xs text-gray-500 -mt-4 mb-4 ml-1">请提供扫描件或清晰照片</p>
          <FormField label="行业特殊资质 (如适用)" id="industryLicense" type="file" />
          <p className="text-xs text-gray-500 -mt-4 mb-4 ml-1">例如特定行业的生产许可证、经营许可证等。请提供扫描件或清晰照片</p>
          <FormField label="法人身份证件扫描件 (正反面)" id="legalRepresentativeIdCard" type="file" />
           <p className="text-xs text-gray-500 -mt-4 mb-4 ml-1">请提供扫描件或清晰照片</p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">公司资料</h2>
          <FormField label="公司介绍资料" id="companyIntroduction" type="url" placeholder="例如公司官网链接、公司简介PPT或PDF的云盘链接" />
          <FormField label="公司产品手册或服务介绍" id="companyProducts" type="url" placeholder="例如产品目录、服务范围说明的云盘链接" />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">合作信息</h2>
          <FormField label="主要设备类型及品牌 (如适用)" id="equipmentTypes" isTextarea placeholder="请列举主要设备" />
          <FormField label="服务范围或耗材类型" id="serviceScope" isTextarea placeholder="请描述主要服务或产品" />
          <FormField 
            label="是否支持平台合作"
            id="platformCollaboration"
            type="select"
            options={["是", "否"]}
            placeholder="请选择"
          />
          <p className="text-xs text-gray-500 -mt-4 mb-4 ml-1">例如提供定制服务、样品制作、批量生产等</p>
          <FormField label="入驻理由" id="joiningReason" isTextarea placeholder="请简述贵公司希望入驻本平台的理由" />
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
