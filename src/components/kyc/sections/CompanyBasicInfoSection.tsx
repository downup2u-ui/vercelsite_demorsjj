"use client";

import React from 'react';
import FormField from '../FormField';

interface CompanyBasicInfoSectionProps {
  // Props for controlled components can be added here if needed
  // formData: { [key: string]: string };
  // handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Renders the "基本信息" (Basic Information) section for company users.
 * This includes fields like company name, contact, registration city, and legal representative.
 */
const CompanyBasicInfoSection: React.FC<CompanyBasicInfoSectionProps> = (props) => {
  // const { formData, handleChange } = props;

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">基本信息</h2>
      <FormField 
        label="公司全称" 
        id="companyFullName" 
        placeholder="请输入公司完整名称" 
      />
      <FormField 
        label="联系方式 (公司电话)" 
        id="companyPhone" 
        type="tel" 
        placeholder="公司总机或业务电话" 
      />
      <FormField 
        label="联系方式 (业务邮箱)" 
        id="companyBusinessEmail" 
        type="email" 
        placeholder="公司业务邮箱" 
      />
      <FormField 
        label="公司注册所在地城市" 
        id="companyRegisteredCity" 
        placeholder="公司注册地" 
      />
      <FormField 
        label="法人代表姓名" 
        id="legalRepresentativeName" 
        placeholder="公司法人姓名" 
      />
    </section>
  );
};

export default CompanyBasicInfoSection; 