"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  ClipboardDocumentListIcon, 
  ChartBarIcon, 
  PhotoIcon,
  CurrencyYenIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  UserIcon
} from '@heroicons/react/24/outline';

// 项目卡片组件
interface ProjectCardProps {
  id: string;
  title: string;
  type: string;
  progress: number;
  deadline: string;
  status: 'ongoing' | 'completed' | 'delayed' | 'pending';
  client?: string;
  collaborators: number;
  thumbnailUrl: string;
  href: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  id, 
  title, 
  type, 
  progress, 
  deadline, 
  status, 
  client, 
  collaborators, 
  thumbnailUrl, 
  href 
}) => {
  // 状态颜色和图标映射
  const statusConfig = {
    ongoing: {
      color: 'bg-blue-100 text-blue-800',
      icon: <ClockIcon className="h-4 w-4 mr-1" />,
      text: '进行中'
    },
    completed: {
      color: 'bg-green-100 text-green-800',
      icon: <CheckCircleIcon className="h-4 w-4 mr-1" />,
      text: '已完成'
    },
    delayed: {
      color: 'bg-red-100 text-red-800',
      icon: <ExclamationCircleIcon className="h-4 w-4 mr-1" />,
      text: '已延期'
    },
    pending: {
      color: 'bg-yellow-100 text-yellow-800',
      icon: <ClockIcon className="h-4 w-4 mr-1" />,
      text: '待开始'
    }
  };
  
  const currentStatus = statusConfig[status];
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 bg-gray-200 relative overflow-hidden">
        <img 
          src={thumbnailUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${currentStatus.color}`}>
            {currentStatus.icon}
            {currentStatus.text}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span>{type}</span>
          <span>#{id}</span>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">进度</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                status === 'delayed' ? 'bg-red-500' : 
                status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
              }`} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div>
            <p className="text-xs text-gray-500">截止日期</p>
            <p className="font-medium text-gray-700">{deadline}</p>
          </div>
          {client && (
            <div>
              <p className="text-xs text-gray-500">客户</p>
              <p className="font-medium text-gray-700">{client}</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <UserIcon className="h-4 w-4 mr-1" />
            <span>{collaborators} 协作者</span>
          </div>
          <Link href={href}>
            <button className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-md text-sm font-medium hover:bg-indigo-100 transition">
              查看详情
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// 功能卡片组件
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, href }) => {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 inline-block mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm flex-grow">{description}</p>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 flex items-center">
            进入
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
};

// 统计卡片组件
interface StatCardProps {
  title: string;
  value: string;
  trend?: {
    value: string;
    isUp: boolean;
  };
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500">
          {icon}
        </div>
      </div>
      {trend && (
        <div className="flex items-center text-sm">
          {trend.isUp ? (
            <ArrowTrendingUpIcon className="h-4 w-4 mr-1 text-green-500" />
          ) : (
            <ArrowTrendingUpIcon className="h-4 w-4 mr-1 transform rotate-180 text-red-500" />
          )}
          <span className={trend.isUp ? 'text-green-600' : 'text-red-600'}>
            {trend.value}
          </span>
        </div>
      )}
    </div>
  );
};

// 项目筛选按钮组件
interface FilterButtonProps {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, count, active, onClick }) => {
  return (
    <button
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        active
          ? 'bg-indigo-100 text-indigo-700'
          : 'bg-white text-gray-700 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      {label}
      {count !== undefined && (
        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
          active ? 'bg-indigo-200 text-indigo-800' : 'bg-gray-200 text-gray-700'
        }`}>
          {count}
        </span>
      )}
    </button>
  );
};

export default function ProjectPage() {
  // 项目筛选状态
  const [projectFilter, setProjectFilter] = useState<'all' | 'ongoing' | 'completed' | 'delayed' | 'pending'>('all');
  
  // 统计数据
  const stats = [
    {
      title: "进行中项目",
      value: "12",
      trend: { value: "+2", isUp: true },
      icon: <ClipboardDocumentListIcon className="h-6 w-6" />
    },
    {
      title: "已完成项目",
      value: "45",
      trend: { value: "+5", isUp: true },
      icon: <CheckCircleIcon className="h-6 w-6" />
    },
    {
      title: "IP收益总额",
      value: "¥123,456",
      trend: { value: "+12.5%", isUp: true },
      icon: <CurrencyYenIcon className="h-6 w-6" />
    }
  ];
  
  // 功能入口数据
  const features = [
    {
      title: "项目进度看板",
      description: "可视化查看所有项目的进度和状态，高效管理设计工作流程。",
      icon: <ChartBarIcon className="h-6 w-6" />,
      href: "/dashboard/designer/project/kanban"
    },
    {
      title: "我的作品集",
      description: "管理和展示您的设计作品，提高曝光度并吸引潜在客户。",
      icon: <PhotoIcon className="h-6 w-6" />,
      href: "/dashboard/designer/project/portfolio"
    },
    {
      title: "IP收益分润",
      description: "追踪设计IP的商业化收益，查看分润详情和历史记录。",
      icon: <CurrencyYenIcon className="h-6 w-6" />,
      href: "/dashboard/designer/project/revenue"
    }
  ];
  
  // 项目数据
  const projects = [
    {
      id: "PRJ-1025",
      title: "现代办公空间设计",
      type: "空间设计",
      progress: 75,
      deadline: "2023-12-20",
      status: "ongoing" as const,
      client: "上海创新科技有限公司",
      collaborators: 3,
      thumbnailUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      href: "/dashboard/designer/project/prj-1025"
    },
    {
      id: "PRJ-1023",
      title: "可持续材料家具设计",
      type: "产品设计",
      progress: 90,
      deadline: "2023-12-10",
      status: "delayed" as const,
      client: "绿色生活家居",
      collaborators: 2,
      thumbnailUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      href: "/dashboard/designer/project/prj-1023"
    },
    {
      id: "PRJ-1022",
      title: "品牌识别系统设计",
      type: "视觉设计",
      progress: 100,
      deadline: "2023-11-25",
      status: "completed" as const,
      client: "新锐科技初创公司",
      collaborators: 1,
      thumbnailUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      href: "/dashboard/designer/project/prj-1022"
    },
    {
      id: "PRJ-1020",
      title: "智能家居控制界面",
      type: "UI/UX设计",
      progress: 0,
      deadline: "2024-01-15",
      status: "pending" as const,
      client: "智能家居科技公司",
      collaborators: 4,
      thumbnailUrl: "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      href: "/dashboard/designer/project/prj-1020"
    }
  ];
  
  // 根据筛选状态过滤项目
  const filteredProjects = projectFilter === 'all'
    ? projects
    : projects.filter(project => project.status === projectFilter);

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">项目管理</h1>
        <p className="mt-2 text-sm text-gray-600">
          管理您的设计项目，追踪进度和IP收益
        </p>
      </div>

      {/* 功能卡片区域 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            href={feature.href}
          />
        ))}
      </div>

      {/* 项目统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* 项目列表区域 */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <h2 className="text-xl font-semibold text-gray-800">我的项目</h2>
          <Link href="/dashboard/designer/project/new">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition">
              <PlusIcon className="h-5 w-5 inline-block mr-1" />
              创建新项目
            </button>
          </Link>
        </div>
        
        {/* 搜索和筛选工具条 */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="w-full sm:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="搜索项目..."
                  className="pl-10 w-full sm:w-80 h-10 bg-gray-50 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <FilterButton 
                label="全部" 
                count={projects.length}
                active={projectFilter === 'all'} 
                onClick={() => setProjectFilter('all')} 
              />
              <FilterButton 
                label="进行中" 
                count={projects.filter(p => p.status === 'ongoing').length}
                active={projectFilter === 'ongoing'} 
                onClick={() => setProjectFilter('ongoing')} 
              />
              <FilterButton 
                label="已完成" 
                count={projects.filter(p => p.status === 'completed').length}
                active={projectFilter === 'completed'} 
                onClick={() => setProjectFilter('completed')} 
              />
              <FilterButton 
                label="已延期" 
                count={projects.filter(p => p.status === 'delayed').length}
                active={projectFilter === 'delayed'} 
                onClick={() => setProjectFilter('delayed')} 
              />
              <FilterButton 
                label="待开始" 
                count={projects.filter(p => p.status === 'pending').length}
                active={projectFilter === 'pending'} 
                onClick={() => setProjectFilter('pending')} 
              />
            </div>
          </div>
        </div>
        
        {/* 项目卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                type={project.type}
                progress={project.progress}
                deadline={project.deadline}
                status={project.status}
                client={project.client}
                collaborators={project.collaborators}
                thumbnailUrl={project.thumbnailUrl}
                href={project.href}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-gray-200">
              <ClipboardDocumentListIcon className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">没有匹配的项目</h3>
              <p className="text-gray-500 mb-4">尝试调整筛选条件或搜索不同的关键词</p>
              <button 
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setProjectFilter('all')}
              >
                <ArrowPathIcon className="h-4 w-4 mr-2" />
                查看全部项目
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 