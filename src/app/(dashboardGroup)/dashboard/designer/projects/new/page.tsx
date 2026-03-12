"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    client: '',
    deadline: '',
    team: [] as string[]
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [teamMember, setTeamMember] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 清除该字段的错误
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAddTeamMember = () => {
    if (teamMember.trim()) {
      setFormData(prev => ({
        ...prev,
        team: [...prev.team, teamMember.trim()]
      }));
      setTeamMember('');
    }
  };

  const handleRemoveTeamMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '请输入项目标题';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = '请输入项目描述';
    }
    
    if (!formData.client.trim()) {
      newErrors.client = '请输入客户名称';
    }
    
    if (!formData.deadline.trim()) {
      newErrors.deadline = '请选择截止日期';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 模拟API请求
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 此处在实际应用中会将表单数据发送到服务器
      console.log('提交的项目数据:', formData);
      
      // 模拟成功响应
      alert('项目创建成功！');
      router.push('/dashboard/designer/projects');
    } catch (error) {
      console.error('提交失败:', error);
      alert('创建项目时发生错误，请稍后重试。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">创建新项目</h1>
          <Link 
            href="/dashboard/designer/projects" 
            className="text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            返回项目列表
          </Link>
        </div>
        <p className="text-gray-500 mt-1">填写以下信息创建一个新的设计项目</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* 项目标题 */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                项目标题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'} shadow-sm sm:text-sm`}
                placeholder="例如：企业品牌VI设计"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* 项目描述 */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                项目描述 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md ${errors.description ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'} shadow-sm sm:text-sm`}
                placeholder="详细描述项目内容、目标和范围"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* 客户信息 */}
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                客户名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="client"
                id="client"
                value={formData.client}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md ${errors.client ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'} shadow-sm sm:text-sm`}
                placeholder="例如：绿源科技有限公司"
              />
              {errors.client && <p className="mt-1 text-sm text-red-600">{errors.client}</p>}
            </div>

            {/* 截止日期 */}
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                截止日期 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="deadline"
                id="deadline"
                value={formData.deadline}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]} // 设置最小日期为今天
                className={`mt-1 block w-full rounded-md ${errors.deadline ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'} shadow-sm sm:text-sm`}
              />
              {errors.deadline && <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>}
            </div>

            {/* 项目团队 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                项目团队
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  value={teamMember}
                  onChange={(e) => setTeamMember(e.target.value)}
                  className="block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="输入团队成员姓名"
                />
                <button
                  type="button"
                  onClick={handleAddTeamMember}
                  className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  添加
                </button>
              </div>
              {/* 团队成员列表 */}
              {formData.team.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700 mb-1">已添加团队成员:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.team.map((member, index) => (
                      <div key={index} className="inline-flex items-center bg-gray-100 rounded-md px-2 py-1">
                        <span className="text-sm text-gray-700">{member}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTeamMember(index)}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 提交按钮 */}
            <div className="pt-5 border-t border-gray-200 flex justify-end space-x-3">
              <Link
                href="/dashboard/designer/projects"
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                取消
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? '创建中...' : '创建项目'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
} 