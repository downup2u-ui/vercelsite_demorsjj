"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
  ClockIcon,
  UserIcon,
  BriefcaseIcon,
  PlusIcon,
  ChevronDownIcon,
  ChatBubbleLeftEllipsisIcon,
  PhoneIcon,
  CalendarIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

// 跟单卡片组件
interface FollowUpCardProps {
  id: string;
  title: string;
  client: {
    name: string;
    type: string;
  };
  priority: 'high' | 'medium' | 'low';
  status: 'waiting' | 'processing' | 'completed' | 'delayed';
  type: 'design' | 'consultation' | 'revision' | 'technical';
  dueDate: string;
  assignee: string;
  notes?: string;
  href: string;
}

const FollowUpCard: React.FC<FollowUpCardProps> = ({
  id,
  title,
  client,
  priority,
  status,
  type,
  dueDate,
  assignee,
  notes,
  href
}) => {
  // 优先级配置
  const priorityConfig = {
    high: {
      color: 'bg-red-100 text-red-800',
      label: '高'
    },
    medium: {
      color: 'bg-yellow-100 text-yellow-800',
      label: '中'
    },
    low: {
      color: 'bg-blue-100 text-blue-800',
      label: '低'
    }
  };

  // 状态配置
  const statusConfig = {
    waiting: {
      color: 'bg-blue-100 text-blue-800',
      icon: <ClockIcon className="h-4 w-4 mr-1" />,
      label: '待处理'
    },
    processing: {
      color: 'bg-yellow-100 text-yellow-800',
      icon: <ArrowPathIcon className="h-4 w-4 mr-1" />,
      label: '处理中'
    },
    completed: {
      color: 'bg-green-100 text-green-800',
      icon: <CheckCircleIcon className="h-4 w-4 mr-1" />,
      label: '已完成'
    },
    delayed: {
      color: 'bg-red-100 text-red-800',
      icon: <ExclamationCircleIcon className="h-4 w-4 mr-1" />,
      label: '已延期'
    }
  };

  // 类型配置
  const typeConfig = {
    design: {
      icon: <BriefcaseIcon className="h-4 w-4 mr-1" />,
      label: '设计跟单'
    },
    consultation: {
      icon: <ChatBubbleLeftEllipsisIcon className="h-4 w-4 mr-1" />,
      label: '咨询服务'
    },
    revision: {
      icon: <ClipboardDocumentListIcon className="h-4 w-4 mr-1" />,
      label: '修改调整'
    },
    technical: {
      icon: <AdjustmentsHorizontalIcon className="h-4 w-4 mr-1" />,
      label: '技术支持'
    }
  };

  const currentPriority = priorityConfig[priority];
  const currentStatus = statusConfig[status];
  const currentType = typeConfig[type];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center mb-1">
              {currentType.icon}
              <span className="text-sm text-gray-600">{currentType.label}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-medium">{client.name}</span> · {client.type}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${currentStatus.color} flex items-center mb-2`}>
              {currentStatus.icon}
              {currentStatus.label}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${currentPriority.color}`}>
              {currentPriority.label}优先级
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
          <div>
            <p className="text-xs text-gray-500">跟单编号</p>
            <p className="font-medium text-gray-800">{id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">截止日期</p>
            <p className={`font-medium ${status === 'delayed' ? 'text-red-600' : 'text-gray-800'}`}>
              {dueDate}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">负责人</p>
            <p className="font-medium text-gray-800 flex items-center">
              <UserIcon className="h-3 w-3 mr-1 text-gray-500" />
              {assignee}
            </p>
          </div>
        </div>
        
        {notes && (
          <div className="mb-4 mt-3 border-t border-gray-100 pt-3">
            <p className="text-xs text-gray-500 mb-1">备注</p>
            <p className="text-sm text-gray-600">{notes}</p>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-2">
          <div className="flex space-x-2">
            <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
              <PhoneIcon className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
              <ChatBubbleLeftEllipsisIcon className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
              <CalendarIcon className="h-4 w-4" />
            </button>
          </div>
          <Link href={href}>
            <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition">
              处理跟单
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// 筛选按钮组件
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

// 统计卡片组件
interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
      <div className="flex items-center mb-2">
        <div className={`p-2 rounded-md ${color} mr-3`}>
          {icon}
        </div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
      </div>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
};

export default function FollowUpPage() {
  // 状态筛选
  const [statusFilter, setStatusFilter] = useState<'all' | 'waiting' | 'processing' | 'completed' | 'delayed'>('all');
  
  // 类型筛选
  const [typeFilter, setTypeFilter] = useState<'all' | 'design' | 'consultation' | 'revision' | 'technical'>('all');
  
  // 优先级筛选
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  
  // 跟单数据
  const followUps: FollowUpCardProps[] = [
    {
      id: "FU-2023-1025",
      title: "办公空间3D效果图调整",
      client: {
        name: "上海创新科技有限公司",
        type: "企业客户"
      },
      priority: "high",
      status: "waiting",
      type: "revision",
      dueDate: "2023-12-15",
      assignee: "张设计师",
      notes: "客户要求调整照明效果和家具布局，增加更多的绿植元素",
      href: "/dashboard/designer/follow/fu-2023-1025"
    },
    {
      id: "FU-2023-1024",
      title: "家具尺寸技术咨询",
      client: {
        name: "李女士",
        type: "个人客户"
      },
      priority: "medium",
      status: "processing",
      type: "technical",
      dueDate: "2023-12-10",
      assignee: "王工程师",
      href: "/dashboard/designer/follow/fu-2023-1024"
    },
    {
      id: "FU-2023-1022",
      title: "产品设计概念确认",
      client: {
        name: "北京艺术学院",
        type: "教育机构"
      },
      priority: "medium",
      status: "completed",
      type: "design",
      dueDate: "2023-12-01",
      assignee: "张设计师",
      notes: "针对学生工作站的设计概念已确认，准备进入详细设计阶段",
      href: "/dashboard/designer/follow/fu-2023-1022"
    },
    {
      id: "FU-2023-1019",
      title: "智能家居控制界面设计咨询",
      client: {
        name: "广州时尚家居有限公司",
        type: "企业客户"
      },
      priority: "low",
      status: "waiting",
      type: "consultation",
      dueDate: "2023-12-20",
      assignee: "刘顾问",
      href: "/dashboard/designer/follow/fu-2023-1019"
    },
    {
      id: "FU-2023-1018",
      title: "展厅设计材料变更",
      client: {
        name: "广州时尚家居有限公司",
        type: "企业客户"
      },
      priority: "high",
      status: "delayed",
      type: "design",
      dueDate: "2023-12-05",
      assignee: "张设计师",
      notes: "由于原材料供应问题，需要调整展厅墙面和地面材料",
      href: "/dashboard/designer/follow/fu-2023-1018"
    }
  ];
  
  // 统计数据
  const stats = [
    {
      label: "待处理跟单",
      value: followUps.filter(item => item.status === 'waiting').length.toString(),
      icon: <ClockIcon className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      label: "处理中跟单",
      value: followUps.filter(item => item.status === 'processing').length.toString(),
      icon: <ArrowPathIcon className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-50"
    },
    {
      label: "已完成跟单",
      value: followUps.filter(item => item.status === 'completed').length.toString(),
      icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
      color: "bg-green-50"
    },
    {
      label: "延期跟单",
      value: followUps.filter(item => item.status === 'delayed').length.toString(),
      icon: <ExclamationCircleIcon className="h-5 w-5 text-red-500" />,
      color: "bg-red-50"
    }
  ];
  
  // 根据筛选条件过滤跟单
  const filteredFollowUps = followUps.filter(item => {
    // 状态筛选
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    
    // 类型筛选
    if (typeFilter !== 'all' && item.type !== typeFilter) return false;
    
    // 优先级筛选
    if (priorityFilter !== 'all' && item.priority !== priorityFilter) return false;
    
    return true;
  });

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">跟单管理</h1>
        <p className="mt-2 text-sm text-gray-600">
          管理客户设计需求跟单，处理服务申请和咨询
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* 跟单筛选和搜索区域 */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <h2 className="text-lg font-semibold text-gray-800">跟单列表</h2>
          <Link href="/dashboard/designer/follow/new">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center">
              <PlusIcon className="h-5 w-5 mr-1" />
              创建跟单
            </button>
          </Link>
        </div>
        
        {/* 搜索框 */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="搜索跟单号、客户名称或内容..."
            className="pl-10 w-full h-10 bg-gray-50 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        {/* 筛选按钮组 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">状态:</span>
            <div className="flex flex-wrap gap-1">
              <FilterButton 
                label="全部" 
                count={followUps.length}
                active={statusFilter === 'all'} 
                onClick={() => setStatusFilter('all')} 
              />
              <FilterButton 
                label="待处理" 
                count={followUps.filter(item => item.status === 'waiting').length}
                active={statusFilter === 'waiting'} 
                onClick={() => setStatusFilter('waiting')} 
              />
              <FilterButton 
                label="处理中" 
                count={followUps.filter(item => item.status === 'processing').length}
                active={statusFilter === 'processing'} 
                onClick={() => setStatusFilter('processing')} 
              />
              <FilterButton 
                label="已完成" 
                count={followUps.filter(item => item.status === 'completed').length}
                active={statusFilter === 'completed'} 
                onClick={() => setStatusFilter('completed')} 
              />
              <FilterButton 
                label="已延期" 
                count={followUps.filter(item => item.status === 'delayed').length}
                active={statusFilter === 'delayed'} 
                onClick={() => setStatusFilter('delayed')} 
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">类型:</span>
            <div className="flex flex-wrap gap-1">
              <FilterButton 
                label="全部" 
                active={typeFilter === 'all'} 
                onClick={() => setTypeFilter('all')} 
              />
              <FilterButton 
                label="设计跟单" 
                active={typeFilter === 'design'} 
                onClick={() => setTypeFilter('design')} 
              />
              <FilterButton 
                label="咨询服务" 
                active={typeFilter === 'consultation'} 
                onClick={() => setTypeFilter('consultation')} 
              />
              <FilterButton 
                label="修改调整" 
                active={typeFilter === 'revision'} 
                onClick={() => setTypeFilter('revision')} 
              />
              <FilterButton 
                label="技术支持" 
                active={typeFilter === 'technical'} 
                onClick={() => setTypeFilter('technical')} 
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">优先级:</span>
            <div className="flex space-x-1">
              <FilterButton 
                label="全部" 
                active={priorityFilter === 'all'} 
                onClick={() => setPriorityFilter('all')} 
              />
              <FilterButton 
                label="高" 
                active={priorityFilter === 'high'} 
                onClick={() => setPriorityFilter('high')} 
              />
              <FilterButton 
                label="中" 
                active={priorityFilter === 'medium'} 
                onClick={() => setPriorityFilter('medium')} 
              />
              <FilterButton 
                label="低" 
                active={priorityFilter === 'low'} 
                onClick={() => setPriorityFilter('low')} 
              />
            </div>
          </div>
        </div>
        
        {/* 排序下拉框 */}
        <div className="flex justify-end mb-4">
          <div className="relative inline-block text-left">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              排序: 截止日期
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
        
        {/* 跟单卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFollowUps.length > 0 ? (
            filteredFollowUps.map((followUp) => (
              <FollowUpCard
                key={followUp.id}
                id={followUp.id}
                title={followUp.title}
                client={followUp.client}
                priority={followUp.priority}
                status={followUp.status}
                type={followUp.type}
                dueDate={followUp.dueDate}
                assignee={followUp.assignee}
                notes={followUp.notes}
                href={followUp.href}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-gray-200">
              <ClipboardDocumentListIcon className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">没有匹配的跟单</h3>
              <p className="text-gray-500 mb-4">尝试调整筛选条件或搜索不同的关键词</p>
              <button 
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  setStatusFilter('all');
                  setTypeFilter('all');
                  setPriorityFilter('all');
                }}
              >
                <ArrowPathIcon className="h-4 w-4 mr-2" />
                重置筛选条件
              </button>
            </div>
          )}
        </div>
        
        {/* 分页控件 */}
        {filteredFollowUps.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              显示 {filteredFollowUps.length} 个跟单中的 1-{Math.min(filteredFollowUps.length, 10)}
            </p>
            <div className="flex space-x-1">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
                上一页
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
                下一页
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 