"use client";

import { useState } from 'react';
import { Project } from '@/services/projectService';
import ProjectSelector from './ProjectSelector';

// 尺寸单位选项
const UNITS = ['mm', 'cm', 'inch'];

// 原型申请数据接口
export interface PrototypeRequest {
  projectId: string;
  material: string;
  width: number;
  height: number;
  depth: number;
  unit: string;
  quantity: number;
  specialInstructions: string;
}

// 表单默认值
const DEFAULT_FORM_DATA: PrototypeRequest = {
  projectId: '',
  material: '',
  width: 0,
  height: 0,
  depth: 0,
  unit: 'mm',
  quantity: 1,
  specialInstructions: '',
};

interface PrototypeFormProps {
  onSubmit: (data: PrototypeRequest) => Promise<void>;
}

export default function PrototypeForm({ onSubmit }: PrototypeFormProps) {
  const [formData, setFormData] = useState<PrototypeRequest>(DEFAULT_FORM_DATA);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 处理项目选择
  const handleProjectSelect = (project: Project | null) => {
    setSelectedProject(project);
    setFormData(prev => ({
      ...prev,
      projectId: project?.id || ''
    }));
    if (errors.projectId) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.projectId;
        return newErrors;
      });
    }
  };

  // 处理表单输入变化
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'width' || name === 'height' || name === 'depth' || name === 'quantity'
        ? parseFloat(value) || 0
        : value
    }));

    // 清除相关错误
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // 验证表单
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.projectId) {
      newErrors.projectId = '请选择项目';
    }
    
    if (!formData.material.trim()) {
      newErrors.material = '请输入材料规格';
    }
    
    if (formData.width <= 0) {
      newErrors.width = '宽度必须大于0';
    }
    
    if (formData.height <= 0) {
      newErrors.height = '高度必须大于0';
    }
    
    if (formData.depth < 0) {
      newErrors.depth = '深度不能为负数';
    }
    
    if (formData.quantity <= 0) {
      newErrors.quantity = '数量必须大于0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      // 提交成功后重置表单
      setFormData(DEFAULT_FORM_DATA);
      setSelectedProject(null);
    } catch (error) {
      console.error('提交原型申请失败:', error);
      setErrors({
        form: '提交申请失败，请稍后重试'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.form && (
        <div className="p-3 bg-red-100 text-red-700 rounded">
          {errors.form}
        </div>
      )}
      
      <div>
        <ProjectSelector 
          selectedProject={selectedProject}
          onSelectProject={handleProjectSelect}
          error={errors.projectId}
        />
      </div>
      
      <div>
        <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-1">
          材料规格 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="material"
          name="material"
          value={formData.material}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.material ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="例如：PLA塑料、ABS树脂、金属材料等"
        />
        {errors.material && <p className="mt-1 text-sm text-red-500">{errors.material}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">
            宽度 <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="width"
            name="width"
            min="0"
            step="0.1"
            value={formData.width || ''}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.width ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.width && <p className="mt-1 text-sm text-red-500">{errors.width}</p>}
        </div>
        
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
            高度 <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="height"
            name="height"
            min="0"
            step="0.1"
            value={formData.height || ''}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.height ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.height && <p className="mt-1 text-sm text-red-500">{errors.height}</p>}
        </div>
        
        <div>
          <label htmlFor="depth" className="block text-sm font-medium text-gray-700 mb-1">
            深度
          </label>
          <input
            type="number"
            id="depth"
            name="depth"
            min="0"
            step="0.1"
            value={formData.depth || ''}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.depth ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.depth && <p className="mt-1 text-sm text-red-500">{errors.depth}</p>}
        </div>
        
        <div>
          <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
            单位
          </label>
          <select
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {UNITS.map(unit => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
          数量 <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={formData.quantity || ''}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.quantity ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.quantity && <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>}
      </div>
      
      <div>
        <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">
          特殊说明
        </label>
        <textarea
          id="specialInstructions"
          name="specialInstructions"
          rows={4}
          value={formData.specialInstructions}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="请输入任何关于原型制作的特殊要求或说明..."
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? '提交中...' : '提交申请'}
        </button>
      </div>
    </form>
  );
} 