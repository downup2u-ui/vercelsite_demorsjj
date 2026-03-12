"use client";

import React from 'react';

interface PersonalInformationStepProps {
  // formData: any; // Replace any with a proper type for form data
  // setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const FormField: React.FC<{ label: string; id: string; type?: string; placeholder?: string; required?: boolean; children?: React.ReactNode; note?: string }> = 
  ({ label, id, type = "text", placeholder, required, children, note }) => (
  <div className="mb-6">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {note && <p className="text-xs text-gray-500 mb-1">{note}</p>}
    {children ? children : (
      <input
        type={type}
        id={id}
        name={id}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={placeholder}
        required={required}
      />
    )}
  </div>
);

const PersonalInformationStep: React.FC<PersonalInformationStepProps> = (/*{ formData, setFormData }*/) => {
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // TODO: Implement actual state handling and file upload logic for profile picture
  // TODO: Implement logic for adding multiple languages

  return (
    <form className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">个人信息</h3>
        <p className="mt-1 text-sm text-gray-500">请简单介绍一下您自己。此信息将出现在您的公开资料中，以便潜在买家可以更好地了解您。</p>
      </div>

      <FormField label="全名" id="fullName" required note="您的真实姓名，用于身份验证。">
        <div className="flex space-x-4 mt-1">
          <input type="text" name="firstName" id="firstName" placeholder="名字" className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
          <input type="text" name="lastName" id="lastName" placeholder="姓" className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
      </FormField>
      
      <FormField label="显示名称" id="displayName" placeholder="键入您的显示名称" required />

      <FormField label="个人资料图片" id="profilePicture" required>
        <div className="mt-1 flex items-center space-x-4">
          <span className="inline-block h-20 w-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-gray-400 text-3xl">
            {/* Placeholder for image preview or initial, e.g., S */} S
          </span>
          <button type="button" className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            上传图片
          </button>
        </div>
      </FormField>

      <FormField label="描述" id="description" required>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="分享一些关于您的工作经验、您完成的项目以及您的专业领域。最少 150 个字符。"
          minLength={150}
          maxLength={600}
          required
        />
        <p className="mt-2 text-xs text-gray-500 text-right">0 / 600 (最少 150)</p>
      </FormField>

      <FormField label="语言" id="languages" required>
        <div className="space-y-4 mt-1">
          <div className="flex items-center space-x-3">
            <select name="language-1" className="block w-2/5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">语言</option>
              <option value="chinese">中文</option>
              <option value="english">English</option>
              {/* Add more languages */}
            </select>
            <select name="languageLevel-1" className="block w-2/5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">语言级别</option>
              <option value="native">母语</option>
              <option value="fluent">流利</option>
              <option value="conversational">会话</option>
              <option value="basic">基础</option>
            </select>
            <button type="button" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              加
            </button>
          </div>
          {/* Placeholder for added languages */}
        </div>
      </FormField>
    </form>
  );
};

export default PersonalInformationStep; 