"use client";

import React from 'react';

interface ProfessionalInformationStepProps {
  // formData: any; // Replace any with a proper type for form data
  // setFormData: React.Dispatch<React.SetStateAction<any>>;
}

// Reusable FormField component (can be moved to a shared file if used across more steps or forms)
const FormField: React.FC<{ label: string; id: string; type?: string; placeholder?: string; required?: boolean; children?: React.ReactNode; note?: string; options?: { value: string; label: string }[] }> = 
  ({ label, id, type = "text", placeholder, required, children, note, options }) => (
  <div className="mb-6">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {note && <p className="text-xs text-gray-500 mb-1">{note}</p>}
    {children ? (
      children
    ) : type === 'select' && options ? (
      <select
        id={id}
        name={id}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required={required}
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
      />
    )}
  </div>
);

const ProfessionalInformationStep: React.FC<ProfessionalInformationStepProps> = (/*{ formData, setFormData }*/) => {
  // TODO: Implement logic for adding multiple skills, education entries, certifications

  return (
    <form className="space-y-8">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">专业资讯</h3>
        <p className="mt-1 text-sm text-gray-500">现在是您大放异彩的时刻了。让潜在买家知道您最擅长什么、以及您是如何获得技能、认证和经验的。</p>
      </div>

      <FormField label="您的职业" id="profession" required 
        options={[
          { value: "graphic_designer", label: "平面设计师" }, 
          { value: "ui_ux_designer", label: "UI/UX 设计师" },
          { value: "illustrator", label: "插画师" },
          // Add more professions
        ]}
        type="select"
        placeholder="选择职业"
      />
      {/* TODO: Add '+ 新增' button functionality for profession */}

      <FormField label="技能" id="skills" required>
        <div className="space-y-3 mt-1">
          <div className="flex items-center space-x-3">
            <input type="text" placeholder="添加技能 (例如, Voice Talent)" className="block w-2/5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <select className="block w-2/5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">经验水平</option>
              <option value="beginner">初级</option>
              <option value="intermediate">中级</option>
              <option value="expert">专家</option>
            </select>
            <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              加
            </button>
          </div>
        </div>
      </FormField>

      <FormField label="教育" id="education">
        <p className="text-xs text-gray-500 mb-2">添加您相关的教育背景信息，以帮助客户更好地了解您。</p>
        <div className="space-y-4 p-4 border border-gray-200 rounded-md mt-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="eduCountry-1" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">所在学院/大学所在国家</option>
              {/* Populate countries */}
              <option value="CN">中国</option>
              <option value="US">美国</option>
            </select>
            <input type="text" name="eduInstitution-1" placeholder="学院/大学名称" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" name="eduTitle-1" placeholder="标题 (例如: 学士)" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <input type="text" name="eduMajor-1" placeholder="主要 (例如: 设计)" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <input type="text" name="eduYear-1" placeholder="年" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="text-right">
            <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              加
            </button>
          </div>
        </div>
      </FormField>
      
      <FormField label="认证" id="certifications">
         <div className="space-y-4 p-4 border border-gray-200 rounded-md mt-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" name="certName-1" placeholder="证书或奖项" className="md:col-span-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              <input type="text" name="certYear-1" placeholder="年" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <input type="text" name="certInstitution-1" placeholder="认证机构 (例如 Adobe)" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <div className="text-right">
              <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                加
              </button>
            </div>
        </div>
      </FormField>

      <FormField label="个人网站" id="personalWebsite" type="url" placeholder="提供指向您的专业网站的链接" />

    </form>
  );
};

export default ProfessionalInformationStep; 