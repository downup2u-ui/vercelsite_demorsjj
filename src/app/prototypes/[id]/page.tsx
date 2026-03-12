"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PrototypeService, PrototypeRequestResponse } from '@/services/prototypeService';
import { ProjectService, Project } from '@/services/projectService';
import PrototypeStatusTracker from '../components/PrototypeStatusTracker';

export default function PrototypeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [prototype, setPrototype] = useState<PrototypeRequestResponse | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrototypeData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // 获取原型申请详情
        const prototypeData = await PrototypeService.getPrototypeRequestById(id);
        
        if (!prototypeData) {
          setError('找不到此原型申请');
          return;
        }
        
        setPrototype(prototypeData);
        
        // 获取关联的项目信息
        try {
          const projectData = await ProjectService.getProjectById(prototypeData.projectId);
          setProject(projectData);
        } catch (err) {
          console.error('获取项目信息失败:', err);
        }
      } catch (err) {
        console.error('获取原型申请详情失败:', err);
        setError('获取原型申请详情失败，请稍后重试');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrototypeData();
  }, [id]);

  // 面包屑导航
  const breadcrumbItems = [
    { label: '首页', href: '/' },
    { label: '设计管理', href: '#' },
    { label: '原型申请', href: '/prototypes' },
    { label: '申请详情', href: `/prototypes/${id}`, active: true },
  ];

  // 处理取消申请
  const handleCancelRequest = async () => {
    if (!prototype) return;
    
    if (!window.confirm('确定要取消此申请吗？此操作不可逆。')) {
      return;
    }
    
    try {
      await PrototypeService.cancelPrototypeRequest(prototype.id);
      // 重新获取申请详情以更新状态
      const updatedPrototype = await PrototypeService.getPrototypeRequestById(id);
      if (updatedPrototype) {
        setPrototype(updatedPrototype);
      }
    } catch (err) {
      console.error('取消申请失败:', err);
      alert('取消申请失败，请稍后重试');
    }
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-3xl font-bold mt-4">原型申请详情</h1>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !prototype) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-3xl font-bold mt-4">原型申请详情</h1>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center py-8">
            <div className="text-red-500 mb-4">{error || '找不到此原型申请'}</div>
            <button 
              onClick={() => router.push('/prototypes')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              返回原型申请列表
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-3xl font-bold">原型申请详情</h1>
          <button 
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            onClick={() => router.push('/prototypes')}
          >
            返回
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 原型申请详情 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">申请信息</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">申请编号</h3>
                  <p className="mt-1 text-sm text-gray-900">{prototype.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">申请日期</h3>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(prototype.createdAt)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">关联项目</h3>
                  <p className="mt-1 text-sm text-gray-900">{project?.name || `项目 ${prototype.projectId}`}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">材料规格</h3>
                  <p className="mt-1 text-sm text-gray-900">{prototype.material}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">尺寸</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {prototype.width} × {prototype.height} {prototype.depth > 0 ? `× ${prototype.depth}` : ''} {prototype.unit}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">数量</h3>
                  <p className="mt-1 text-sm text-gray-900">{prototype.quantity} 件</p>
                </div>
              </div>

              {prototype.specialInstructions && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500">特殊说明</h3>
                  <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">{prototype.specialInstructions}</p>
                </div>
              )}

              {prototype.status === 'pending' && (
                <div className="mt-8">
                  <button
                    onClick={handleCancelRequest}
                    className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition"
                  >
                    取消申请
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 状态跟踪 */}
        <div className="lg:col-span-1">
          <PrototypeStatusTracker prototype={prototype} />
          
          {project && (
            <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">项目信息</h2>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500">项目名称</h3>
                  <p className="mt-1 text-sm text-gray-900">{project.name}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500">项目状态</h3>
                  <p className="mt-1 text-sm text-gray-900">{project.status}</p>
                </div>
                <button
                  onClick={() => router.push(`/projects/${project.id}`)}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  查看项目详情 →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 