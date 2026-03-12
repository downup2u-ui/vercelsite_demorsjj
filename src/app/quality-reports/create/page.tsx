'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  createQualityReport, 
  type QualityReport, 
  type InspectionItem, 
  getProjectsForFilter 
} from '@/services/qualityReportService';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function CreateQualityReportPage() {
  const router = useRouter();
  
  // 项目列表
  const [projects, setProjects] = useState<{id: string, name: string}[]>([]);
  
  // 表单状态
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project: '',
    projectId: '',
    inspector: '',
    date: new Date().toISOString().split('T')[0],
    status: 'pending' as const,
  });
  
  // 检查项列表
  const [inspectionItems, setInspectionItems] = useState<Partial<InspectionItem>[]>([
    { id: `item-${Date.now()}-1`, name: '', description: '', standard: '', result: true, notes: '' }
  ]);
  
  // 表单状态
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // 加载项目列表
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await getProjectsForFilter();
        setProjects(projectsData);
      } catch (err) {
        console.error('加载项目列表失败:', err);
      }
    };
    
    loadProjects();
  }, []);
  
  // 处理表单字段变更
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 清除对应的错误信息
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // 处理项目选择
  const handleProjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = e.target.selectedIndex;
    if (selectedIndex > 0) {
      const projectId = e.target.value;
      const projectName = e.target.options[selectedIndex].text;
      
      setFormData(prev => ({
        ...prev,
        project: projectName,
        projectId: projectId
      }));
      
      // 清除对应的错误信息
      if (errors.project) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.project;
          return newErrors;
        });
      }
    } else {
      setFormData(prev => ({
        ...prev,
        project: '',
        projectId: ''
      }));
    }
  };
  
  // 处理检查项变更
  const handleInspectionItemChange = (index: number, field: keyof InspectionItem, value: any) => {
    const updatedItems = [...inspectionItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setInspectionItems(updatedItems);
  };
  
  // 添加检查项
  const handleAddInspectionItem = () => {
    setInspectionItems([
      ...inspectionItems,
      { id: `item-${Date.now()}`, name: '', description: '', standard: '', result: true, notes: '' }
    ]);
  };
  
  // 删除检查项
  const handleRemoveInspectionItem = (index: number) => {
    if (inspectionItems.length <= 1) return;
    
    const updatedItems = [...inspectionItems];
    updatedItems.splice(index, 1);
    setInspectionItems(updatedItems);
  };
  
  // 表单验证
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '请输入报告标题';
    }
    
    if (!formData.project) {
      newErrors.project = '请选择关联项目';
    }
    
    if (!formData.inspector.trim()) {
      newErrors.inspector = '请输入检验员姓名';
    }
    
    if (!formData.date) {
      newErrors.date = '请选择检验日期';
    }
    
    // 验证检查项
    let hasInvalidItem = false;
    inspectionItems.forEach((item, index) => {
      if (!item.name?.trim()) {
        newErrors[`item_${index}_name`] = '请输入检查项名称';
        hasInvalidItem = true;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 准备提交数据
      const reportData: Partial<QualityReport> = {
        ...formData,
        inspectionItems: inspectionItems as InspectionItem[],
      };
      
      // 调用API创建报告
      const createdReport = await createQualityReport(reportData);
      
      // 创建成功后跳转到详情页
      router.push(`/quality-reports/${createdReport.id}`);
    } catch (err) {
      console.error('创建质检报告失败:', err);
      alert('创建质检报告失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: '首页', href: '/' },
          { label: '质检报告', href: '/quality-reports' },
          { label: '创建新报告', href: '/quality-reports/create', active: true }
        ]}
      />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">创建质检报告</h1>
        <button
          type="button"
          onClick={() => router.push('/quality-reports')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          返回列表
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 基本信息卡片 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">基本信息</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                报告标题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.title ? 'border-red-300' : ''}`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>
            
            <div>
              <label htmlFor="project" className="block text-sm font-medium text-gray-700">
                关联项目 <span className="text-red-500">*</span>
              </label>
              <select
                id="project"
                name="project"
                value={formData.projectId}
                onChange={handleProjectSelect}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.project ? 'border-red-300' : ''}`}
              >
                <option value="">选择项目</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
              {errors.project && <p className="mt-1 text-sm text-red-600">{errors.project}</p>}
            </div>
            
            <div>
              <label htmlFor="inspector" className="block text-sm font-medium text-gray-700">
                检验员 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="inspector"
                name="inspector"
                value={formData.inspector}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.inspector ? 'border-red-300' : ''}`}
              />
              {errors.inspector && <p className="mt-1 text-sm text-red-600">{errors.inspector}</p>}
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                检验日期 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.date ? 'border-red-300' : ''}`}
              />
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                报告描述
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                报告状态
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="pending">待处理</option>
                <option value="pass">通过</option>
                <option value="fail">不通过</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* 检查项卡片 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">质检项目</h2>
            <button
              type="button"
              onClick={handleAddInspectionItem}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="-ml-1 mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              添加检查项
            </button>
          </div>
          
          <div className="space-y-4">
            {inspectionItems.map((item, index) => (
              <div key={item.id} className="border border-gray-200 rounded-md p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-gray-700">检查项 #{index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => handleRemoveInspectionItem(index)}
                    disabled={inspectionItems.length <= 1}
                    className={`inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-50 focus:outline-none ${inspectionItems.length <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`item-${index}-name`} className="block text-sm font-medium text-gray-700">
                      检查项名称 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`item-${index}-name`}
                      value={item.name || ''}
                      onChange={(e) => handleInspectionItemChange(index, 'name', e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors[`item_${index}_name`] ? 'border-red-300' : ''}`}
                    />
                    {errors[`item_${index}_name`] && <p className="mt-1 text-sm text-red-600">{errors[`item_${index}_name`]}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor={`item-${index}-standard`} className="block text-sm font-medium text-gray-700">
                      检查标准
                    </label>
                    <input
                      type="text"
                      id={`item-${index}-standard`}
                      value={item.standard || ''}
                      onChange={(e) => handleInspectionItemChange(index, 'standard', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor={`item-${index}-description`} className="block text-sm font-medium text-gray-700">
                      检查项描述
                    </label>
                    <input
                      type="text"
                      id={`item-${index}-description`}
                      value={item.description || ''}
                      onChange={(e) => handleInspectionItemChange(index, 'description', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`item-${index}-result`} className="block text-sm font-medium text-gray-700">
                      检查结果
                    </label>
                    <select
                      id={`item-${index}-result`}
                      value={item.result ? 'true' : 'false'}
                      onChange={(e) => handleInspectionItemChange(index, 'result', e.target.value === 'true')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="true">通过</option>
                      <option value="false">不通过</option>
                    </select>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor={`item-${index}-notes`} className="block text-sm font-medium text-gray-700">
                      备注
                    </label>
                    <textarea
                      id={`item-${index}-notes`}
                      rows={2}
                      value={item.notes || ''}
                      onChange={(e) => handleInspectionItemChange(index, 'notes', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 提交按钮 */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/quality-reports')}
            className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                提交中...
              </>
            ) : '创建报告'}
          </button>
        </div>
      </form>
    </div>
  );
} 