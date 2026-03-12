"use client";

import { useState, useEffect } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import PrototypeForm, { PrototypeRequest } from './components/PrototypeForm';
import { PrototypeService, PrototypeRequestResponse, PrototypeStatus } from '@/services/prototypeService';
import { Project, ProjectService } from '@/services/projectService';
import Link from 'next/link';

// 状态标签颜色映射
const statusColorMap: Record<PrototypeStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-blue-100 text-blue-800',
  rejected: 'bg-red-100 text-red-800',
  in_progress: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800'
};

// 状态中文名称映射
const statusNameMap: Record<PrototypeStatus, string> = {
  pending: '待审核',
  approved: '已批准',
  rejected: '已拒绝',
  in_progress: '制作中',
  completed: '已完成'
};

export default function PrototypesPage() {
  const [prototypes, setPrototypes] = useState<PrototypeRequestResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [projectsCache, setProjectsCache] = useState<Record<string, Project>>({});

  // 面包屑导航
  const breadcrumbItems = [
    { label: '首页', href: '/' },
    { label: '设计管理', href: '#' },
    { label: '原型申请', href: '/prototypes', active: true }
  ];

  // 获取用户的原型申请记录
  useEffect(() => {
    const fetchPrototypes = async () => {
      setIsLoading(true);
      try {
        const data = await PrototypeService.getUserPrototypeRequests();
        setPrototypes(data);
        
        // 获取相关的项目信息
        const projectIds = [...new Set(data.map(p => p.projectId))];
        const projectsData: Record<string, Project> = {};
        
        for (const id of projectIds) {
          try {
            const project = await ProjectService.getProjectById(id);
            if (project) {
              projectsData[id] = project;
            }
          } catch (err) {
            console.error(`获取项目 ${id} 信息失败:`, err);
          }
        }
        
        setProjectsCache(projectsData);
      } catch (err) {
        console.error('获取原型申请记录失败:', err);
        setErrorMessage('获取原型申请记录失败，请稍后重试');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrototypes();
  }, []);

  // 处理表单提交
  const handleSubmitPrototype = async (data: PrototypeRequest) => {
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    
    try {
      await PrototypeService.submitPrototypeRequest(data);
      setSuccessMessage('原型申请已成功提交，我们将尽快处理您的请求');
      
      // 重新获取申请记录
      const updatedPrototypes = await PrototypeService.getUserPrototypeRequests();
      setPrototypes(updatedPrototypes);
      
      // 如果有新的项目ID，获取项目信息
      const newProjectIds = updatedPrototypes
        .map(p => p.projectId)
        .filter(id => !projectsCache[id]);
      
      if (newProjectIds.length > 0) {
        const projectsData = { ...projectsCache };
        
        for (const id of newProjectIds) {
          try {
            const project = await ProjectService.getProjectById(id);
            if (project) {
              projectsData[id] = project;
            }
          } catch (err) {
            console.error(`获取项目 ${id} 信息失败:`, err);
          }
        }
        
        setProjectsCache(projectsData);
      }
    } catch (err) {
      console.error('提交原型申请失败:', err);
      setErrorMessage('提交原型申请失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 获取项目名称
  const getProjectName = (projectId: string) => {
    return projectsCache[projectId]?.name || `项目 ${projectId}`;
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-3xl font-bold mt-4">原型申请</h1>
        <p className="text-gray-600 mt-2">提交原型制作申请，跟踪原型制作进度</p>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">创建新的原型申请</h2>
          <p className="text-gray-600 mt-2">
            填写以下表单提交您的原型制作申请，我们会尽快处理您的请求。
          </p>
        </div>

        <div className="p-6">
          <PrototypeForm onSubmit={handleSubmitPrototype} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">我的申请记录</h2>
          <p className="text-gray-600 mt-2">
            查看您之前提交的原型申请和当前处理状态。
          </p>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">加载申请记录中...</p>
            </div>
          ) : prototypes.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="mt-4 text-gray-600">暂无申请记录</p>
              <p className="mt-2 text-gray-500">提交您的第一个原型申请以查看记录</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      项目
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      申请日期
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      材料
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      尺寸
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      数量
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {prototypes.map((prototype) => (
                    <tr key={prototype.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{getProjectName(prototype.projectId)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(prototype.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{prototype.material}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {prototype.width} × {prototype.height} {prototype.depth > 0 ? `× ${prototype.depth}` : ''} {prototype.unit}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{prototype.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColorMap[prototype.status]}`}>
                          {statusNameMap[prototype.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link
                          href={`/prototypes/${prototype.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          查看详情
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 