"use client";

import Link from 'next/link';
import { useState } from 'react';
// Removed: import DashboardLayout from '@/components/dashboard/DashboardLayout';

// 项目状态徽章组件
const ProjectStatusBadge = ({ status }: { status: string }) => {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-800';
  let statusText = status;

  switch (status) {
    case 'in_progress':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      statusText = '进行中';
      break;
    case 'review':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      statusText = '审核中';
      break;
    case 'completed':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      statusText = '已完成';
      break;
    case 'pending':
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      statusText = '待开始';
      break;
    case 'paused':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      statusText = '已暂停';
      break;
  }

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
      {statusText}
    </span>
  );
};

// 项目卡片组件
const ProjectCard = ({ project }: { project: any }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{project.title}</h3>
          <ProjectStatusBadge status={project.status} />
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
        <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
          <span>截止日期: {project.deadline}</span>
          <span>客户: {project.client}</span>
        </div>
        
        {/* 团队成员 */}
        <div className="flex items-center mb-4">
          <span className="text-xs text-gray-500 mr-2">团队:</span>
          <div className="flex -space-x-2">
            {project.team.map((member: any, index: number) => (
              <div 
                key={index} 
                className="w-6 h-6 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs"
                title={member.name}
              >
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full" />
                ) : (
                  member.name.charAt(0)
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* 进度条 */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-700">项目进度</span>
            <span className="text-xs font-medium text-gray-700">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full" 
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
        <Link 
          href={`/dashboard/designer/projects/${project.id}`}
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          查看详情 →
        </Link>
      </div>
    </div>
  );
};

// 模拟项目数据
const mockProjects = [
  {
    id: "PRJ001",
    title: "新能源科技企业VI设计",
    description: "为领先的新能源科技公司设计全新的视觉识别系统，包括标志、名片、宣传材料等应用设计。",
    status: "in_progress",
    deadline: "2024-08-15",
    client: "绿源科技有限公司",
    progress: 65,
    team: [
      { name: "张设计", avatar: null },
      { name: "李创意", avatar: null },
      { name: "王总监", avatar: null }
    ]
  },
  {
    id: "PRJ002",
    title: "手机应用界面设计",
    description: "设计一款健康生活方式追踪应用的用户界面，包括信息架构、交互设计和视觉设计。",
    status: "review",
    deadline: "2024-07-30",
    client: "健康科技初创公司",
    progress: 90,
    team: [
      { name: "刘UI", avatar: null },
      { name: "陈交互", avatar: null }
    ]
  },
  {
    id: "PRJ003",
    title: "高档餐厅空间设计",
    description: "为位于市中心的一家新开高档餐厅设计内部空间，包括平面布局、材料选择、灯光设计和家具定制。",
    status: "completed",
    deadline: "2024-06-10",
    client: "星月餐饮集团",
    progress: 100,
    team: [
      { name: "赵空间", avatar: null },
      { name: "钱灯光", avatar: null },
      { name: "孙材料", avatar: null }
    ]
  },
  {
    id: "PRJ004",
    title: "企业宣传册设计",
    description: "为一家跨国公司设计年度宣传册，展示公司成就、产品和企业文化。",
    status: "pending",
    deadline: "2024-09-05",
    client: "环球贸易公司",
    progress: 0,
    team: [
      { name: "周平面", avatar: null },
      { name: "吴摄影", avatar: null }
    ]
  },
  {
    id: "PRJ005",
    title: "产品包装设计改版",
    description: "为一线护肤品牌的明星产品系列设计全新包装，提升品牌形象并增强产品在货架上的视觉吸引力。",
    status: "paused",
    deadline: "2024-08-20",
    client: "美丽护肤品牌",
    progress: 30,
    team: [
      { name: "郑包装", avatar: null },
      { name: "冯平面", avatar: null }
    ]
  }
];

export default function DesignerProjectsPage() {
  const pageFeatureTitle = "项目管理";
  const welcomeMessage = "管理您的所有设计项目，跟踪进度、任务和交付物。";
  
  // 状态过滤器
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // 根据过滤条件显示项目
  const filteredProjects = statusFilter 
    ? mockProjects.filter(project => project.status === statusFilter)
    : mockProjects;
  
  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">{pageFeatureTitle}</h2>
          <p className="text-gray-500 mt-1">{welcomeMessage}</p>
        </div>
        <Link 
          href="/dashboard/designer" 
          className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          返回设计师仪表盘
        </Link>
      </div>

      {/* 筛选和操作按钮 */}
      <div className="mb-6 flex flex-wrap justify-between items-center">
        <div className="flex space-x-2 mb-2 md:mb-0">
          <button 
            onClick={() => setStatusFilter(null)} 
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${!statusFilter ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            全部
          </button>
          <button 
            onClick={() => setStatusFilter('in_progress')} 
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${statusFilter === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            进行中
          </button>
          <button 
            onClick={() => setStatusFilter('review')} 
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${statusFilter === 'review' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            审核中
          </button>
          <button 
            onClick={() => setStatusFilter('completed')} 
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${statusFilter === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            已完成
          </button>
        </div>
        
        <Link 
          href="/dashboard/designer/projects/new" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-150"
        >
          + 创建新项目
        </Link>
      </div>
      
      {/* 项目网格 */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 text-center rounded-lg shadow-sm border border-gray-200">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">没有符合条件的项目</h3>
          <p className="mt-1 text-sm text-gray-500">
            {statusFilter ? '尝试选择不同的筛选条件或创建新项目' : '创建您的第一个项目开始工作'}
          </p>
          <div className="mt-6">
            <Link 
              href="/dashboard/designer/projects/new" 
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              创建新项目
            </Link>
          </div>
        </div>
      )}
    </>
  );
} 