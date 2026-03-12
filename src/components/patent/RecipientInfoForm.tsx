import React, { useState, useEffect } from 'react';

// 接收方类型
export type RecipientType = 'individual' | 'company' | 'institution';

// 接收方信息接口
export interface RecipientInfo {
  recipientType: RecipientType;
  name: string;
  identifier: string; // 身份证或统一社会信用代码
  contactPerson?: string;
  position?: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  province: string;
  city: string;
}

interface RecipientInfoFormProps {
  value: RecipientInfo;
  onChange: (info: RecipientInfo) => void;
}

const RecipientInfoForm: React.FC<RecipientInfoFormProps> = ({
  value,
  onChange
}) => {
  // 本地状态
  const [formData, setFormData] = useState<RecipientInfo>(value);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // 同步外部值
  useEffect(() => {
    setFormData(value);
  }, [value]);
  
  // 处理表单改变
  const handleChange = (field: keyof RecipientInfo, fieldValue: any) => {
    const updatedData = { ...formData, [field]: fieldValue };
    
    // 根据接收方类型调整必填字段
    if (field === 'recipientType') {
      if (fieldValue === 'individual') {
        updatedData.contactPerson = undefined;
        updatedData.position = undefined;
      }
    }
    
    setFormData(updatedData);
    
    // 验证单个字段
    validateField(field, fieldValue);
    
    onChange(updatedData);
  };
  
  // 验证单个字段
  const validateField = (field: keyof RecipientInfo, value: any) => {
    let newErrors = { ...errors };
    
    switch (field) {
      case 'name':
        if (!value) {
          newErrors.name = '接收方名称不能为空';
        } else {
          delete newErrors.name;
        }
        break;
        
      case 'identifier':
        if (!value) {
          newErrors.identifier = '请提供有效的身份证或统一社会信用代码';
        } else if (formData.recipientType === 'individual' && !/^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/.test(value)) {
          newErrors.identifier = '请输入有效的身份证号码';
        } else if (formData.recipientType !== 'individual' && !/^[0-9A-Z]{18}$/.test(value)) {
          newErrors.identifier = '请输入有效的统一社会信用代码';
        } else {
          delete newErrors.identifier;
        }
        break;
        
      case 'phone':
        if (!value) {
          newErrors.phone = '联系电话不能为空';
        } else if (!/^1[3-9]\d{9}$/.test(value)) {
          newErrors.phone = '请输入有效的手机号码';
        } else {
          delete newErrors.phone;
        }
        break;
        
      case 'email':
        if (!value) {
          newErrors.email = '电子邮箱不能为空';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = '请输入有效的电子邮箱';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'address':
        if (!value) {
          newErrors.address = '详细地址不能为空';
        } else {
          delete newErrors.address;
        }
        break;
        
      case 'country':
      case 'province':
      case 'city':
        if (!value) {
          newErrors[field] = '请选择' + (field === 'country' ? '国家/地区' : field === 'province' ? '省份' : '城市');
        } else {
          delete newErrors[field];
        }
        break;
        
      case 'contactPerson':
        if (formData.recipientType !== 'individual' && !value) {
          newErrors.contactPerson = '请提供联系人姓名';
        } else {
          delete newErrors.contactPerson;
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // 接收方类型选项
  const recipientTypeOptions = [
    { value: 'individual', label: '个人' },
    { value: 'company', label: '企业' },
    { value: 'institution', label: '机构/组织' }
  ];
  
  // 模拟国家数据
  const countries = [
    { code: 'CN', name: '中国' },
    { code: 'US', name: '美国' },
    { code: 'JP', name: '日本' },
    // 其他国家...
  ];
  
  // 模拟省份数据（根据国家筛选）
  const provinces = formData.country === 'CN' ? [
    { code: 'BJ', name: '北京' },
    { code: 'SH', name: '上海' },
    { code: 'GD', name: '广东' },
    { code: 'JS', name: '江苏' },
    // 其他省份...
  ] : formData.country === 'US' ? [
    { code: 'CA', name: '加利福尼亚' },
    { code: 'NY', name: '纽约' },
    { code: 'TX', name: '得克萨斯' },
    // 美国州...
  ] : [];
  
  // 模拟城市数据（根据省份筛选）
  const cities = formData.province ? [
    { code: 'city1', name: '城市1' },
    { code: 'city2', name: '城市2' },
    { code: 'city3', name: '城市3' },
    // 更多城市...
  ] : [];
  
  return (
    <div className="space-y-6">
      {/* 接收方类型 */}
      <div>
        <label htmlFor="recipientType" className="block text-sm font-medium text-gray-700 mb-1">
          接收方类型 <span className="text-red-500">*</span>
        </label>
        <select
          id="recipientType"
          value={formData.recipientType}
          onChange={(e) => handleChange('recipientType', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="" disabled>请选择接收方类型</option>
          {recipientTypeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      {/* 接收方名称 */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          {formData.recipientType === 'individual' ? '姓名' : 
           formData.recipientType === 'company' ? '企业名称' : '机构名称'} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            errors.name ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder={formData.recipientType === 'individual' ? '请输入接收方姓名' : 
                       formData.recipientType === 'company' ? '请输入企业全称' : '请输入机构全称'}
          required
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>
      
      {/* 身份标识 */}
      <div>
        <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-1">
          {formData.recipientType === 'individual' ? '身份证号码' : '统一社会信用代码'} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="identifier"
          value={formData.identifier}
          onChange={(e) => handleChange('identifier', e.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            errors.identifier ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder={formData.recipientType === 'individual' ? '请输入18位身份证号码' : '请输入18位统一社会信用代码'}
          required
        />
        {errors.identifier && <p className="mt-1 text-sm text-red-600">{errors.identifier}</p>}
      </div>
      
      {/* 联系人和职位 - 只有企业和机构显示 */}
      {formData.recipientType !== 'individual' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
              联系人姓名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="contactPerson"
              value={formData.contactPerson || ''}
              onChange={(e) => handleChange('contactPerson', e.target.value)}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.contactPerson ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="请输入联系人姓名"
              required={formData.recipientType !== 'individual'}
            />
            {errors.contactPerson && <p className="mt-1 text-sm text-red-600">{errors.contactPerson}</p>}
          </div>
          
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
              职位
            </label>
            <input
              type="text"
              id="position"
              value={formData.position || ''}
              onChange={(e) => handleChange('position', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="请输入联系人职位"
            />
          </div>
        </div>
      )}
      
      {/* 联系方式 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            联系电话 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.phone ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="请输入手机号码"
            required
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            电子邮箱 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="请输入电子邮箱"
            required
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
      </div>
      
      {/* 地址信息 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">地址信息</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              国家/地区 <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.country ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            >
              <option value="">请选择国家/地区</option>
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
          </div>
          
          <div>
            <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
              省份/州 <span className="text-red-500">*</span>
            </label>
            <select
              id="province"
              value={formData.province}
              onChange={(e) => handleChange('province', e.target.value)}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.province ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={!formData.country}
              required
            >
              <option value="">请选择省份</option>
              {provinces.map(province => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
            {errors.province && <p className="mt-1 text-sm text-red-600">{errors.province}</p>}
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              城市 <span className="text-red-500">*</span>
            </label>
            <select
              id="city"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.city ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={!formData.province}
              required
            >
              <option value="">请选择城市</option>
              {cities.map(city => (
                <option key={city.code} value={city.code}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            详细地址 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            rows={2}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.address ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="请输入详细地址，如街道、门牌号等"
            required
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
        </div>
      </div>
    </div>
  );
};

export default RecipientInfoForm; 