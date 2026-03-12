"use client";

import React, { useState, useEffect, useRef } from 'react';

// 发明描述步骤组件
export const InventionDescriptionStep: React.FC<{
  data: any;
  updateData: (data: any) => void;
}> = ({ data, updateData }) => {
  const [formState, setFormState] = useState({
    title: data.title || '',
    technicalField: data.technicalField || '',
    background: data.background || '',
    summary: data.summary || '',
    detailedDescription: data.detailedDescription || '',
  });
  const [errors, setErrors] = useState<any>({});
  const [isMounted, setIsMounted] = useState(false);
  const localSaveKey = 'patent_invention_description_draft';
  
  // 组件挂载状态检测，确保客户端组件
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);
  
  // 自动保存
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(localSaveKey, JSON.stringify(formState));
    }
  }, [formState, isMounted]);
  
  // 首次加载时尝试恢复草稿
  useEffect(() => {
    if (isMounted && (!data || Object.keys(data).length === 0)) {
      const draft = localStorage.getItem(localSaveKey);
      if (draft) {
        try {
          const parsed = JSON.parse(draft);
          setFormState(parsed);
          updateData(parsed);
        } catch {}
      }
    }
  }, [isMounted, data, updateData]);
  
  // 校验逻辑
  const validate = (state: typeof formState) => {
    const newErrors: any = {};
    if (!state.title.trim()) newErrors.title = '发明名称为必填项';
    if (!state.technicalField.trim()) newErrors.technicalField = '技术领域为必填项';
    if (!state.summary.trim()) newErrors.summary = '发明摘要为必填项';
    // 详细描述富文本需去除html标签后判断
    const plainDesc = state.detailedDescription.replace(/<[^>]+>/g, '').trim();
    if (!plainDesc) newErrors.detailedDescription = '详细描述为必填项';
    return newErrors;
  };
  
  // 统一处理输入
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newState = { ...formState, [name]: value };
    setFormState(newState);
    updateData(newState);
    setErrors(validate(newState));
  };
  
  const handleDetailedDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    const newState = { ...formState, detailedDescription: value };
    setFormState(newState);
    updateData(newState);
    setErrors(validate(newState));
  };
  
  // 字数统计
  const getTextLength = (text: string) => text.replace(/<[^>]+>/g, '').trim().length;
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">发明描述</h3>
      <p className="text-gray-500 text-sm">请详细描述您的发明，这些信息将用于评估您发明的新颖性、创造性和实用性。</p>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          发明名称 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formState.title}
          onChange={handleChange}
          className={`w-full px-4 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="请输入发明的名称"
        />
        {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
      </div>
      <div>
        <label htmlFor="technicalField" className="block text-sm font-medium text-gray-700 mb-1">
          技术领域 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="technicalField"
          name="technicalField"
          value={formState.technicalField}
          onChange={handleChange}
          rows={3}
          className={`w-full px-4 py-2 border ${errors.technicalField ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="描述该发明所属的技术领域"
        />
        {errors.technicalField && <div className="text-red-500 text-xs mt-1">{errors.technicalField}</div>}
      </div>
      <div>
        <label htmlFor="background" className="block text-sm font-medium text-gray-700 mb-1">
          背景技术
        </label>
        <textarea
          id="background"
          name="background"
          value={formState.background}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="描述现有技术的不足或问题"
        />
      </div>
      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
          发明摘要 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="summary"
          name="summary"
          value={formState.summary}
          onChange={handleChange}
          rows={3}
          className={`w-full px-4 py-2 border ${errors.summary ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="简要概述发明的目的和主要特点"
        />
        <div className="text-xs text-gray-500 mt-1">字数：{formState.summary.trim().length}</div>
        {errors.summary && <div className="text-red-500 text-xs mt-1">{errors.summary}</div>}
      </div>
      <div>
        <label htmlFor="detailedDescription" className="block text-sm font-medium text-gray-700 mb-1">
          详细描述 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="detailedDescription"
          name="detailedDescription"
          value={formState.detailedDescription}
          onChange={handleDetailedDescriptionChange}
          rows={8}
          className={`w-full px-4 py-3 border ${errors.detailedDescription ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="详细描述您的发明，包括结构、功能、工作原理等"
        />
        <div className="text-xs text-gray-500 mt-1">字数：{getTextLength(formState.detailedDescription)}</div>
        {errors.detailedDescription && <div className="text-red-500 text-xs mt-1">{errors.detailedDescription}</div>}
      </div>
    </div>
  );
};

// 图纸上传步骤组件
export const DrawingsUploadStep: React.FC<{
  data: any;
  updateData: (data: any) => void;
}> = ({ data, updateData }) => {
  const [files, setFiles] = React.useState<(File & { preview?: string; progress?: number; desc?: string; error?: string })[]>(data.drawings || []);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  // 文件类型与大小限制
  const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'application/pdf'];
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  // 处理文件选择
  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    let newFiles: typeof files = [...files];
    Array.from(fileList).forEach(file => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        newFiles.push({ ...file, error: '不支持的文件类型' });
        return;
      }
      if (file.size > MAX_SIZE) {
        newFiles.push({ ...file, error: '文件过大（最大10MB）' });
        return;
      }
      let preview = '';
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }
      newFiles.push({ ...file, preview, progress: 100, desc: '' }); // 本地模拟进度100%
    });
    setFiles(newFiles);
    updateData({ ...data, drawings: newFiles });
    setError(null);
  };
  // 拖拽上传
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };
  // 点击上传
  const handleClick = () => {
    inputRef.current?.click();
  };
  // 删除文件
  const handleRemove = (idx: number) => {
    const newFiles = files.filter((_, i) => i !== idx);
    setFiles(newFiles);
    updateData({ ...data, drawings: newFiles });
  };
  // 修改描述
  const handleDescChange = (idx: number, desc: string) => {
    const newFiles = files.map((f, i) => i === idx ? { ...f, desc } : f);
    setFiles(newFiles);
    updateData({ ...data, drawings: newFiles });
  };
  // 阻止默认拖拽行为
  const preventDefault = (e: React.DragEvent) => e.preventDefault();
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">图纸上传</h3>
      <p className="text-gray-500 text-sm">上传相关的技术图纸和支持文件，增强申请的有效性。</p>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white cursor-pointer hover:border-blue-400 transition"
        onDrop={handleDrop}
        onDragOver={preventDefault}
        onDragEnter={preventDefault}
        onClick={handleClick}
      >
        <input
          type="file"
          multiple
          accept=".png,.jpg,.jpeg,.pdf"
          className="hidden"
          ref={inputRef}
          onChange={e => handleFiles(e.target.files)}
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="mt-2 text-sm text-gray-600">拖放文件至此处，或点击上传</p>
        <p className="mt-1 text-xs text-gray-500">支持 PNG、JPG、PDF 文件，单个文件不超过10MB</p>
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleClick}
        >
          选择文件
        </button>
        {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
      </div>
      {/* 文件列表 */}
      {files.length > 0 && (
        <div className="space-y-4">
          {files.map((file, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
              {/* 预览 */}
              {file.type?.startsWith('image/') && file.preview && (
                <img src={file.preview} alt={file.name} className="w-16 h-16 object-cover rounded" />
              )}
              {file.type === 'application/pdf' && (
                <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded text-gray-600 font-bold text-lg">
                  PDF
                </div>
              )}
              {/* 文件信息 */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-800 truncate">{file.name}</div>
                <div className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                {file.error && <div className="text-red-500 text-xs">{file.error}</div>}
                {/* 描述输入 */}
                {!file.error && (
                  <input
                    type="text"
                    className="mt-2 w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="可为该文件添加描述/备注"
                    value={file.desc || ''}
                    onChange={e => handleDescChange(idx, e.target.value)}
                  />
                )}
              </div>
              {/* 进度条（本地100%） */}
              {!file.error && (
                <div className="w-24 flex flex-col items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${file.progress || 100}%` }}></div>
                  </div>
                  <span className="text-xs text-gray-500">{file.progress || 100}%</span>
                </div>
              )}
              {/* 删除按钮 */}
              <button
                type="button"
                className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-xs"
                onClick={() => handleRemove(idx)}
              >
                删除
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 发明人信息步骤组件
export const InventorInfoStep: React.FC<{
  data: any;
  updateData: (data: any) => void;
}> = ({ data, updateData }) => {
  // 默认的发明人数据结构
  const defaultInventor = {
    name: '',
    phone: '',
    email: '',
    address: '',
    contribution: '',
  };

  // 使用状态管理多个发明人
  const [inventors, setInventors] = useState<Array<typeof defaultInventor>>(
    data.inventors && data.inventors.length > 0 
      ? data.inventors 
      : [{ ...defaultInventor }]
  );
  
  const [errors, setErrors] = useState<Array<Record<string, string>>>([{}]);

  // 验证单个发明人信息
  const validateInventor = (inventor: typeof defaultInventor, index: number) => {
    const newErrors = { ...errors[index] || {} };
    
    if (!inventor.name.trim()) {
      newErrors.name = '发明人姓名不能为空';
    } else {
      delete newErrors.name;
    }
    
    if (!inventor.phone.trim()) {
      newErrors.phone = '联系电话不能为空';
    } else if (!/^1[3-9]\d{9}$/.test(inventor.phone.trim())) {
      newErrors.phone = '请输入有效的手机号码';
    } else {
      delete newErrors.phone;
    }
    
    if (!inventor.email.trim()) {
      newErrors.email = '电子邮箱不能为空';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inventor.email.trim())) {
      newErrors.email = '请输入有效的邮箱地址';
    } else {
      delete newErrors.email;
    }
    
    if (!inventor.address.trim()) {
      newErrors.address = '联系地址不能为空';
    } else {
      delete newErrors.address;
    }
    
    // 更新错误状态
    const newErrorsList = [...errors];
    newErrorsList[index] = newErrors;
    setErrors(newErrorsList);
    
    // 如果没有错误，则对象为空
    return Object.keys(newErrors).length === 0;
  };

  // 处理所有发明人的输入变化
  const handleChange = (index: number, field: string, value: string) => {
    const updatedInventors = [...inventors];
    updatedInventors[index] = { 
      ...updatedInventors[index], 
      [field]: value 
    };
    
    setInventors(updatedInventors);
    updateData({ ...data, inventors: updatedInventors });
    
    // 实时验证
    validateInventor(updatedInventors[index], index);
  };

  // 添加新的发明人
  const addInventor = () => {
    const updatedInventors = [...inventors, { ...defaultInventor }];
    setInventors(updatedInventors);
    setErrors([...errors, {}]);
    updateData({ ...data, inventors: updatedInventors });
  };

  // 删除发明人
  const removeInventor = (index: number) => {
    if (inventors.length <= 1) {
      return; // 至少保留一位发明人
    }
    
    const updatedInventors = inventors.filter((_, i) => i !== index);
    const updatedErrors = errors.filter((_, i) => i !== index);
    
    setInventors(updatedInventors);
    setErrors(updatedErrors);
    updateData({ ...data, inventors: updatedInventors });
  };

  // 表单提交时全面验证
  useEffect(() => {
    const validateAllInventors = () => {
      let isValid = true;
      const newErrorsList = [...errors];
      
      inventors.forEach((inventor, index) => {
        if (!validateInventor(inventor, index)) {
          isValid = false;
        }
      });
      
      setErrors(newErrorsList);
      return isValid;
    };
    
    // 初始验证
    validateAllInventors();
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">发明人信息</h3>
      <p className="text-gray-500 text-sm">填写发明人的详细信息，可添加多位发明人。</p>

      {inventors.map((inventor, index) => (
        <div 
          key={index} 
          className={`${index === 0 ? 'bg-blue-50' : 'bg-gray-50'} p-4 rounded-md mb-6 relative`}
        >
          <h4 className="text-sm font-medium text-blue-800 mb-2">
            {index === 0 ? '主要发明人' : `发明人 ${index + 1}`}
          </h4>
          
          {/* 删除按钮 - 只在非主要发明人上显示 */}
          {index > 0 && (
            <button
              type="button"
              onClick={() => removeInventor(index)}
              className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-500"
              aria-label="删除发明人"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`inventor-${index}-name`} className="block text-sm font-medium text-gray-700 mb-1">
                姓名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`inventor-${index}-name`}
                value={inventor.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                className={`w-full px-4 py-2 border ${errors[index]?.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="发明人姓名"
              />
              {errors[index]?.name && <p className="mt-1 text-xs text-red-500">{errors[index].name}</p>}
            </div>

            <div>
              <label htmlFor={`inventor-${index}-phone`} className="block text-sm font-medium text-gray-700 mb-1">
                电话 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id={`inventor-${index}-phone`}
                value={inventor.phone}
                onChange={(e) => handleChange(index, 'phone', e.target.value)}
                className={`w-full px-4 py-2 border ${errors[index]?.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="联系电话"
              />
              {errors[index]?.phone && <p className="mt-1 text-xs text-red-500">{errors[index].phone}</p>}
            </div>

            <div>
              <label htmlFor={`inventor-${index}-email`} className="block text-sm font-medium text-gray-700 mb-1">
                电子邮箱 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id={`inventor-${index}-email`}
                value={inventor.email}
                onChange={(e) => handleChange(index, 'email', e.target.value)}
                className={`w-full px-4 py-2 border ${errors[index]?.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="电子邮箱地址"
              />
              {errors[index]?.email && <p className="mt-1 text-xs text-red-500">{errors[index].email}</p>}
            </div>

            <div>
              <label htmlFor={`inventor-${index}-address`} className="block text-sm font-medium text-gray-700 mb-1">
                地址 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`inventor-${index}-address`}
                value={inventor.address}
                onChange={(e) => handleChange(index, 'address', e.target.value)}
                className={`w-full px-4 py-2 border ${errors[index]?.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="联系地址"
              />
              {errors[index]?.address && <p className="mt-1 text-xs text-red-500">{errors[index].address}</p>}
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor={`inventor-${index}-contribution`} className="block text-sm font-medium text-gray-700 mb-1">
                贡献说明
              </label>
              <textarea
                id={`inventor-${index}-contribution`}
                value={inventor.contribution}
                onChange={(e) => handleChange(index, 'contribution', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="简要描述该发明人对发明的贡献"
                rows={2}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={addInventor}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          添加其他发明人
        </button>
      </div>
    </div>
  );
};

// 申请类型选择步骤
export const ApplicationTypeStep: React.FC<{
  data: any;
  updateData: (data: any) => void;
}> = ({ data, updateData }) => {
  const [type, setType] = useState(data.applicationType || 'provisional');
  const typeOptions = [
    { value: 'provisional', label: '临时申请', desc: '保护发明的初步权利，有效期1年，后续可转正式申请。' },
    { value: 'nonprovisional', label: '正式申请', desc: '获得完整专利权，需满足所有专利要求。' },
    { value: 'PCT', label: 'PCT国际申请', desc: '在多个国家同时申请专利保护。' }
  ];
  const handleChange = (val: string) => {
    setType(val);
    updateData({ ...data, applicationType: val });
  };
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">申请类型选择</h3>
      <div className="flex flex-col gap-4">
        {typeOptions.map(opt => (
          <label key={opt.value} className="flex items-start gap-2 cursor-pointer">
            <input
              type="radio"
              name="applicationType"
              value={opt.value}
              checked={type === opt.value}
              onChange={() => handleChange(opt.value)}
              className="mt-1"
            />
            <div>
              <span className="font-semibold">{opt.label}</span>
              <span className="ml-2 text-gray-500 text-xs">{opt.desc}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

// 信息汇总与提交步骤
export const ReviewSubmissionStep: React.FC<{
  data: any;
  onSubmit: () => Promise<void>;
  submitting: boolean;
  error: string | null;
}> = ({ data, onSubmit, submitting, error }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">信息确认与提交</h3>
      <div className="bg-gray-50 rounded p-4 text-sm">
        <div><span className="font-medium">发明标题：</span>{data.title}</div>
        <div><span className="font-medium">技术领域：</span>{data.technicalField}</div>
        <div><span className="font-medium">背景：</span>{data.background}</div>
        <div><span className="font-medium">摘要：</span>{data.summary}</div>
        <div><span className="font-medium">详细描述：</span>{data.detailedDescription}</div>
        <div><span className="font-medium">申请类型：</span>{data.applicationType === 'provisional' ? '临时申请' : data.applicationType === 'nonprovisional' ? '正式申请' : 'PCT国际申请'}</div>
        {/* 可补充更多字段 */}
      </div>
      {error && <div className="text-red-600">{error}</div>}
      <button
        type="button"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        onClick={onSubmit}
        disabled={submitting}
      >
        {submitting ? '提交中...' : '提交申请'}
      </button>
    </div>
  );
}; 
