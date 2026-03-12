"use client";

import React from 'react';
import FormField from '../FormField';

interface LegalServiceBasicInfoSectionProps {
  // Props for controlled components can be added here if needed
}

/**
 * Renders the "基本信息" (Basic Information) section specifically for Legal Service providers.
 * Includes fields like name/organization name, contact, location, and ID for individual lawyers.
 */
const LegalServiceBasicInfoSection: React.FC<LegalServiceBasicInfoSectionProps> = (props) => {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">基本信息</h2>
      <FormField 
        label="姓名 / 机构名称" 
        id="nameOrOrgName" 
        placeholder="请输入您的姓名或律所/机构全称" 
      />
      <FormField 
        label="联系方式 (电话)" 
        id="phone" 
        type="tel" 
        placeholder="您的工作电话" 
      />
      <FormField 
        label="联系方式 (邮箱)" 
        id="email" 
        type="email" 
        placeholder="您的工作邮箱" 
      />
      <FormField 
        label="所在地" 
        id="location" 
        placeholder="您或机构所在的城市" 
      />
      {/* This field is conditional based on KYC.md "个人律师需提供" */}
      <FormField 
        label="身份证信息 (个人律师需提供)" 
        id="idCardPersonalLawyer" 
        type="file" 
      />
    </section>
  );
};

export default LegalServiceBasicInfoSection; 