"use client";

import React from 'react';
import FormField from '../FormField'; // Assuming FormField is in ../kyc/FormField.tsx

/**
 * Props for the IndividualBasicInfoSection component.
 * Allows for controlled component behavior by passing value and onChange handlers.
 */
interface IndividualBasicInfoSectionProps {
  // Define props if this section needs to manage its own state or receive specific data
  // For now, it will render static fields based on KYC.md
  // Example for controlled components:
  // formData: { [key: string]: string };
  // handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * Renders the "基本信息" (Basic Information) section for individual users.
 * This includes fields like name, contact details, city, and ID card upload.
 */
const IndividualBasicInfoSection: React.FC<IndividualBasicInfoSectionProps> = (props) => {
  // const { formData, handleChange } = props; // Example for controlled components

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-2">基本信息</h2>
      <FormField 
        label="姓名 / 昵称" 
        id="nameOrNickname" 
        placeholder="您的姓名或昵称" 
        // value={formData?.nameOrNickname}
        // onChange={handleChange}
      />
      <FormField 
        label="联系方式 (手机)" 
        id="phone" 
        type="tel" 
        placeholder="您的手机号码" 
        // value={formData?.phone}
        // onChange={handleChange}
      />
      <FormField 
        label="联系方式 (邮箱)" 
        id="email" 
        type="email" 
        placeholder="您的电子邮箱" 
        // value={formData?.email}
        // onChange={handleChange}
      />
      <FormField 
        label="所在地城市" 
        id="city" 
        placeholder="您目前所在的城市" 
        // value={formData?.city}
        // onChange={handleChange}
      />
      <FormField 
        label="身份证信息 (扫描件/照片)" 
        id="idCardScan" 
        type="file" 
        // Note: File input typically isn't controlled via a 'value' prop in the same way
      />
    </section>
  );
};

export default IndividualBasicInfoSection; 