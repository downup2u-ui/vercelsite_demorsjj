"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import Link from 'next/link';
import { Project, ProjectService } from '@/services/projectService';
import ProjectDetails from '../components/ProjectDetails';

// 状态标签颜色映射
const statusColorMap = {
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
};

// 状态中文名称映射
const statusNameMap = {
  active: '进行中',
  completed: '已完成',
  pending: '待审核',
};

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const projectData = await ProjectService.getProjectById(id);
        
        if (projectData) {
          setProject(projectData);
        } else {
          setError('项目不存在');
        }
      } catch (err) {
        setError('加载项目详情失败');
        console.error('Error fetching project:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // 面包屑导航
  const breadcrumbItems = [
    { label: '首页', href: '/' },
    { label: '设计管理', href: '#' },
    { label: '项目管理', href: '/projects' },
    { label: project?.name || '项目详情', href: `/projects/${id}`, active: true },
  ];

  // 处理删除项目
  const handleDeleteProject = async () => {
    if (!window.confirm('确定要删除该项目吗？此操作不可撤销。')) {
      return;
    }

    try {
      await ProjectService.deleteProject(id);
      router.push('/projects');
    } catch (error) {
      console.error('删除项目失败:', error);
      alert('删除项目失败，请稍后重试');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-3xl font-bold mt-4">加载中...</h1>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-3xl font-bold mt-4">项目详情</h1>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center py-8">
            <div className="text-red-500 mb-4">{error || '项目不存在'}</div>
            <Link 
              href="/projects"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              返回项目列表
            </Link>
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
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <button 
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            onClick={() => router.back()}
          >
            返回
          </button>
        </div>
      </div>

      <ProjectDetails 
        project={project} 
        onDelete={handleDeleteProject}
      />
    </div>
  );
} 