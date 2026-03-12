"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  UserGroupIcon,
  BuildingOfficeIcon,
  UserIcon,
  ChartBarIcon,
  CurrencyYenIcon,
  PhoneIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ChatBubbleLeftRightIcon,
  PencilSquareIcon,
  EyeIcon,
  ArrowPathIcon,
  FunnelIcon,
  ChevronDownIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ShoppingBagIcon,
  TagIcon,
  ArrowsRightLeftIcon
} from '@heroicons/react/24/outline';

// 客户卡片组件
interface ClientCardProps {
  id: string;
  name: string;
  type: 'institution' | 'enterprise' | 'individual';
  contactPerson?: string;
  email: string;
  phone: string;
  location?: string;
  totalOrders: number;
  totalSpent: string;
  lastOrderDate?: string;
  avatarUrl?: string;
  href: string;
}

const ClientCard: React.FC<ClientCardProps> = ({
  id,
  name,
  type,
  contactPerson,
  email,
  phone,
  location,
  totalOrders,
  totalSpent,
  lastOrderDate,
  avatarUrl,
  href
}) => {
  // 客户类型配置
  const typeConfig = {
    institution: {
      label: '合作机构',
      color: 'bg-purple-100 text-purple-800'
    },
    enterprise: {
      label: '企业客户',
      color: 'bg-blue-100 text-blue-800'
    },
    individual: {
      label: '个人客户',
      color: 'bg-green-100 text-green-800'
    }
  };

  const typeData = typeConfig[type];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 mr-3">
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-semibold text-lg">
                  {name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
              <div className="flex items-center mt-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeData.color}`}>
                  {typeData.label}
                </span>
                <span className="text-sm text-gray-500 ml-2">ID: {id}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          {contactPerson && (
            <div>
              <p className="text-xs text-gray-500">联系人</p>
              <p className="font-medium text-gray-800 flex items-center">
                <UserIcon className="h-3 w-3 mr-1 text-gray-500" />
                {contactPerson}
              </p>
            </div>
          )}
          <div>
            <p className="text-xs text-gray-500">邮箱</p>
            <p className="font-medium text-gray-800 flex items-center">
              <EnvelopeIcon className="h-3 w-3 mr-1 text-gray-500" />
              {email}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">电话</p>
            <p className="font-medium text-gray-800 flex items-center">
              <PhoneIcon className="h-3 w-3 mr-1 text-gray-500" />
              {phone}
            </p>
          </div>
          {location && (
            <div>
              <p className="text-xs text-gray-500">地区</p>
              <p className="font-medium text-gray-800 flex items-center">
                <MapPinIcon className="h-3 w-3 mr-1 text-gray-500" />
                {location}
              </p>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gray-50 rounded-md">
          <div className="text-center">
            <p className="text-xs text-gray-500">总订单数</p>
            <p className="font-medium text-gray-800">{totalOrders}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">消费总额</p>
            <p className="font-medium text-gray-800">{totalSpent}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">最近订单</p>
            <p className="font-medium text-gray-800">{lastOrderDate || '无'}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="flex space-x-2">
            <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition">
              <PhoneIcon className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition">
              <EnvelopeIcon className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition">
              <ChatBubbleLeftRightIcon className="h-4 w-4" />
            </button>
          </div>
          <Link href={href}>
            <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition">
              详细信息
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// 交互记录组件
interface InteractionProps {
  id: string;
  clientName: string;
  clientType: string;
  type: 'meeting' | 'call' | 'email' | 'message' | 'other';
  date: string;
  subject: string;
  summary: string;
  nextAction?: string;
  nextActionDate?: string;
  status: 'pending' | 'completed' | 'no-action';
  contactPerson?: string;
  href: string;
}

const InteractionCard: React.FC<InteractionProps> = ({
  id,
  clientName,
  clientType,
  type,
  date,
  subject,
  summary,
  nextAction,
  nextActionDate,
  status,
  contactPerson,
  href
}) => {
  // 交互类型配置
  const typeConfig = {
    meeting: {
      icon: <UserGroupIcon className="h-5 w-5 text-indigo-500" />,
      label: '会议'
    },
    call: {
      icon: <PhoneIcon className="h-5 w-5 text-green-500" />,
      label: '电话'
    },
    email: {
      icon: <EnvelopeIcon className="h-5 w-5 text-blue-500" />,
      label: '邮件'
    },
    message: {
      icon: <ChatBubbleLeftRightIcon className="h-5 w-5 text-purple-500" />,
      label: '消息'
    },
    other: {
      icon: <TagIcon className="h-5 w-5 text-orange-500" />,
      label: '其他'
    }
  };

  // 状态配置
  const statusConfig = {
    pending: {
      color: 'bg-yellow-100 text-yellow-800',
      label: '待处理'
    },
    completed: {
      color: 'bg-green-100 text-green-800',
      label: '已完成'
    },
    'no-action': {
      color: 'bg-gray-100 text-gray-800',
      label: '无需操作'
    }
  };

  const currentType = typeConfig[type];
  const currentStatus = statusConfig[status];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            {currentType.icon}
            <span className="text-sm font-medium text-gray-600 ml-1.5">{currentType.label}</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${currentStatus.color}`}>
            {currentStatus.label}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{subject}</h3>
        <div className="mb-3">
          <p className="text-sm text-gray-600">
            <span className="font-medium">{clientName}</span> · {clientType}
            {contactPerson && <span> ({contactPerson})</span>}
          </p>
        </div>
        
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">日期和时间</p>
          <p className="text-sm text-gray-800 flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
            {date}
          </p>
        </div>
        
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-500 mb-1">摘要</p>
          <p className="text-sm text-gray-600">{summary}</p>
        </div>
        
        {nextAction && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">下一步行动</p>
            <div className="flex justify-between">
              <p className="text-sm text-gray-800">{nextAction}</p>
              {nextActionDate && (
                <p className="text-sm text-gray-600 flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1 text-gray-500" />
                  {nextActionDate}
                </p>
              )}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="text-xs text-gray-500">记录ID: {id}</div>
          <Link href={href}>
            <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition">
              查看详情
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// 统计卡片组件
interface StatCardProps {
  label: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, description, icon, color }) => {
  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
      <div className="flex items-center mb-2">
        <div className={`p-2 rounded-md ${color} mr-3`}>
          {icon}
        </div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
      </div>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
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

export default function SalesPage() {
  // 标签页状态
  const [activeTab, setActiveTab] = useState<'clients' | 'interactions'>('clients');
  
  // 筛选状态
  const [clientTypeFilter, setClientTypeFilter] = useState<'all' | 'institution' | 'enterprise' | 'individual'>('all');
  const [interactionTypeFilter, setInteractionTypeFilter] = useState<'all' | 'meeting' | 'call' | 'email' | 'message' | 'other'>('all');
  const [interactionStatusFilter, setInteractionStatusFilter] = useState<'all' | 'pending' | 'completed' | 'no-action'>('all');
  
  // 客户数据
  const clients: ClientCardProps[] = [
    {
      id: "CL-2023-001",
      name: "上海创新科技有限公司",
      type: "enterprise",
      contactPerson: "张经理",
      email: "zhang@example.com",
      phone: "135-1234-5678",
      location: "上海市",
      totalOrders: 8,
      totalSpent: "¥245,800",
      lastOrderDate: "2023-12-05",
      href: "/dashboard/designer/sales/client/cl-2023-001"
    },
    {
      id: "CL-2023-002",
      name: "北京艺术学院",
      type: "institution",
      contactPerson: "李教授",
      email: "li@example.edu.cn",
      phone: "138-8765-4321",
      location: "北京市",
      totalOrders: 5,
      totalSpent: "¥128,500",
      lastOrderDate: "2023-11-20",
      href: "/dashboard/designer/sales/client/cl-2023-002"
    },
    {
      id: "CL-2023-004",
      name: "李云",
      type: "individual",
      email: "liyun@example.com",
      phone: "139-9876-5432",
      location: "广州市",
      totalOrders: 3,
      totalSpent: "¥56,200",
      lastOrderDate: "2023-12-10",
      href: "/dashboard/designer/sales/client/cl-2023-004"
    },
    {
      id: "CL-2023-007",
      name: "广州时尚家居有限公司",
      type: "enterprise",
      contactPerson: "刘总监",
      email: "liu@example.com",
      phone: "136-6543-2109",
      location: "广州市",
      totalOrders: 4,
      totalSpent: "¥98,400",
      lastOrderDate: "2023-12-08",
      href: "/dashboard/designer/sales/client/cl-2023-007"
    }
  ];
  
  // 交互记录数据
  const interactions: InteractionProps[] = [
    {
      id: "INT-2023-052",
      clientName: "上海创新科技有限公司",
      clientType: "企业客户",
      type: "meeting",
      date: "2023-12-12 14:00",
      subject: "办公空间设计方案讨论",
      summary: "与客户讨论了办公空间设计方案的修改意见，客户对整体方案满意，但希望增加更多的会议空间和休息区。",
      nextAction: "修改设计方案，增加会议空间和休息区",
      nextActionDate: "2023-12-15",
      status: "pending",
      contactPerson: "张经理",
      href: "/dashboard/designer/sales/interaction/int-2023-052"
    },
    {
      id: "INT-2023-048",
      clientName: "李云",
      clientType: "个人客户",
      type: "call",
      date: "2023-12-10 10:30",
      subject: "家居设计项目跟进",
      summary: "与李女士电话沟通家居设计项目的进度，确认了材料样本已经送达，并回答了她关于配色方案的问题。",
      nextAction: "发送修改后的配色方案",
      nextActionDate: "2023-12-13",
      status: "completed",
      href: "/dashboard/designer/sales/interaction/int-2023-048"
    },
    {
      id: "INT-2023-045",
      clientName: "北京艺术学院",
      clientType: "合作机构",
      type: "email",
      date: "2023-12-08 09:15",
      subject: "学生工作站设计项目确认",
      summary: "发送了学生工作站设计的最终方案和预算，包括材料清单和实施时间表。",
      status: "no-action",
      contactPerson: "李教授",
      href: "/dashboard/designer/sales/interaction/int-2023-045"
    },
    {
      id: "INT-2023-041",
      clientName: "广州时尚家居有限公司",
      clientType: "企业客户",
      type: "message",
      date: "2023-12-07 16:45",
      subject: "灯具样品反馈",
      summary: "客户通过消息反馈了对灯具样品的看法，对整体设计满意，但希望调整灯光亮度和色温。",
      nextAction: "联系供应商调整灯具参数",
      nextActionDate: "2023-12-11",
      status: "pending",
      contactPerson: "刘总监",
      href: "/dashboard/designer/sales/interaction/int-2023-041"
    }
  ];
  
  // 统计数据
  const stats = [
    {
      label: "总客户数",
      value: "36",
      icon: <UserGroupIcon className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      label: "本月新增",
      value: "5",
      description: "较上月 +25%",
      icon: <UserIcon className="h-5 w-5 text-green-500" />,
      color: "bg-green-50"
    },
    {
      label: "销售总额",
      value: "¥1,285,600",
      description: "本季度累计",
      icon: <CurrencyYenIcon className="h-5 w-5 text-indigo-500" />,
      color: "bg-indigo-50"
    },
    {
      label: "客户互动",
      value: "78",
      description: "最近30天",
      icon: <ChatBubbleLeftRightIcon className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-50"
    }
  ];
  
  // 根据筛选条件过滤客户
  const filteredClients = clientTypeFilter === 'all'
    ? clients
    : clients.filter(client => client.type === clientTypeFilter);
  
  // 根据筛选条件过滤交互记录
  const filteredInteractions = interactions.filter(interaction => {
    if (interactionTypeFilter !== 'all' && interaction.type !== interactionTypeFilter) return false;
    if (interactionStatusFilter !== 'all' && interaction.status !== interactionStatusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">销售系统</h1>
        <p className="mt-2 text-sm text-gray-600">
          管理客户信息和交互记录，提升销售转化率
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* 标签页导航 */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'clients'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('clients')}
          >
            <div className="flex items-center">
              <UserGroupIcon className="h-5 w-5 mr-2" />
              客户信息管理
            </div>
          </button>
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'interactions'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('interactions')}
          >
            <div className="flex items-center">
              <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
              客户交互记录
            </div>
          </button>
        </nav>
      </div>

      {/* 客户管理内容 */}
      {activeTab === 'clients' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">客户列表</h2>
            <Link href="/dashboard/designer/sales/client/new">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center">
                <PlusIcon className="h-5 w-5 mr-1" />
                添加新客户
              </button>
            </Link>
          </div>
          
          {/* 客户筛选和搜索栏 */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <FunnelIcon className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">客户类型:</span>
                <div className="flex flex-wrap gap-2">
                  <FilterButton 
                    label="全部" 
                    count={clients.length}
                    active={clientTypeFilter === 'all'} 
                    onClick={() => setClientTypeFilter('all')} 
                  />
                  <FilterButton 
                    label="合作机构" 
                    count={clients.filter(c => c.type === 'institution').length}
                    active={clientTypeFilter === 'institution'} 
                    onClick={() => setClientTypeFilter('institution')} 
                  />
                  <FilterButton 
                    label="企业客户" 
                    count={clients.filter(c => c.type === 'enterprise').length}
                    active={clientTypeFilter === 'enterprise'} 
                    onClick={() => setClientTypeFilter('enterprise')} 
                  />
                  <FilterButton 
                    label="个人客户" 
                    count={clients.filter(c => c.type === 'individual').length}
                    active={clientTypeFilter === 'individual'} 
                    onClick={() => setClientTypeFilter('individual')} 
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="搜索客户..."
                    className="pl-10 w-full md:w-64 h-10 bg-white border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <button className="flex items-center">
                  <TagIcon className="h-5 w-5 mr-1" />
                  高级筛选
                </button>
              </div>
              
              <div className="flex items-center">
                <button className="flex items-center text-sm text-gray-600 bg-white border border-gray-300 rounded-md px-3 py-2">
                  <span>排序:</span>
                  <span className="font-medium ml-1">最近订单</span>
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
          
          {/* 客户卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <ClientCard
                  key={client.id}
                  id={client.id}
                  name={client.name}
                  type={client.type}
                  contactPerson={client.contactPerson}
                  email={client.email}
                  phone={client.phone}
                  location={client.location}
                  totalOrders={client.totalOrders}
                  totalSpent={client.totalSpent}
                  lastOrderDate={client.lastOrderDate}
                  avatarUrl={client.avatarUrl}
                  href={client.href}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-gray-200">
                <UserGroupIcon className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到客户</h3>
                <p className="text-gray-500 mb-4">尝试调整筛选条件或添加新客户</p>
                <Link href="/dashboard/designer/sales/client/new">
                  <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    添加新客户
                  </button>
                </Link>
              </div>
            )}
          </div>
          
          {/* 客户分析图表区域 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
            <div className="flex items-center mb-4">
              <ChartBarIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">客户分析</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-3">客户类型分布</h4>
                <div className="h-48 flex items-center justify-center text-gray-500">
                  图表区域 - 客户类型分布
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-3">月度销售趋势</h4>
                <div className="h-48 flex items-center justify-center text-gray-500">
                  图表区域 - 月度销售趋势
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 交互记录内容 */}
      {activeTab === 'interactions' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">客户交互记录</h2>
            <Link href="/dashboard/designer/sales/interaction/new">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center">
                <PlusIcon className="h-5 w-5 mr-1" />
                记录新交互
              </button>
            </Link>
          </div>
          
          {/* 交互筛选按钮 */}
          <div className="flex flex-wrap gap-2 mb-3">
            <FilterButton 
              label="全部类型" 
              active={interactionTypeFilter === 'all'} 
              onClick={() => setInteractionTypeFilter('all')} 
            />
            <FilterButton 
              label="会议" 
              active={interactionTypeFilter === 'meeting'} 
              onClick={() => setInteractionTypeFilter('meeting')} 
            />
            <FilterButton 
              label="电话" 
              active={interactionTypeFilter === 'call'} 
              onClick={() => setInteractionTypeFilter('call')} 
            />
            <FilterButton 
              label="邮件" 
              active={interactionTypeFilter === 'email'} 
              onClick={() => setInteractionTypeFilter('email')} 
            />
            <FilterButton 
              label="消息" 
              active={interactionTypeFilter === 'message'} 
              onClick={() => setInteractionTypeFilter('message')} 
            />
            <FilterButton 
              label="其他" 
              active={interactionTypeFilter === 'other'} 
              onClick={() => setInteractionTypeFilter('other')} 
            />
          </div>
          
          <div className="flex flex-wrap gap-2 mb-5">
            <FilterButton 
              label="全部状态" 
              active={interactionStatusFilter === 'all'} 
              onClick={() => setInteractionStatusFilter('all')} 
            />
            <FilterButton 
              label="待处理" 
              count={interactions.filter(i => i.status === 'pending').length}
              active={interactionStatusFilter === 'pending'} 
              onClick={() => setInteractionStatusFilter('pending')} 
            />
            <FilterButton 
              label="已完成" 
              count={interactions.filter(i => i.status === 'completed').length}
              active={interactionStatusFilter === 'completed'} 
              onClick={() => setInteractionStatusFilter('completed')} 
            />
            <FilterButton 
              label="无需操作" 
              count={interactions.filter(i => i.status === 'no-action').length}
              active={interactionStatusFilter === 'no-action'} 
              onClick={() => setInteractionStatusFilter('no-action')} 
            />
          </div>
          
          {/* 搜索框 */}
          <div className="relative mb-5">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="搜索客户名称、主题或交互内容..."
              className="pl-10 w-full h-10 bg-white border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          {/* 排序下拉框 */}
          <div className="flex justify-end mb-4">
            <div className="relative inline-block text-left">
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                排序: 日期 (最近)
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
          
          {/* 交互记录卡片列表 */}
          <div className="grid grid-cols-1 gap-6">
            {filteredInteractions.length > 0 ? (
              filteredInteractions.map((interaction) => (
                <InteractionCard
                  key={interaction.id}
                  id={interaction.id}
                  clientName={interaction.clientName}
                  clientType={interaction.clientType}
                  type={interaction.type}
                  date={interaction.date}
                  subject={interaction.subject}
                  summary={interaction.summary}
                  nextAction={interaction.nextAction}
                  nextActionDate={interaction.nextActionDate}
                  status={interaction.status}
                  contactPerson={interaction.contactPerson}
                  href={interaction.href}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-gray-200">
                <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到交互记录</h3>
                <p className="text-gray-500 mb-4">尝试调整筛选条件或记录新的客户交互</p>
                <button 
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3"
                  onClick={() => {
                    setInteractionTypeFilter('all');
                    setInteractionStatusFilter('all');
                  }}
                >
                  <ArrowsRightLeftIcon className="h-4 w-4 mr-2" />
                  重置筛选条件
                </button>
              </div>
            )}
          </div>
          
          {/* 下一步行动提醒区域 */}
          {filteredInteractions.filter(i => i.status === 'pending').length > 0 && (
            <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-200 mt-6">
              <div className="flex items-center mb-4">
                <ClockIcon className="h-6 w-6 text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-yellow-800">待处理的后续行动</h3>
              </div>
              <div className="space-y-3">
                {filteredInteractions
                  .filter(i => i.status === 'pending' && i.nextAction)
                  .map((interaction) => (
                    <div key={interaction.id} className="flex justify-between items-center bg-white p-3 rounded-md border border-yellow-100">
                      <div>
                        <p className="font-medium text-gray-800">{interaction.nextAction}</p>
                        <p className="text-sm text-gray-600">
                          {interaction.clientName} · {interaction.subject}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-600 mr-4">
                          {interaction.nextActionDate}
                        </p>
                        <Link href={interaction.href}>
                          <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition">
                            <EyeIcon className="h-5 w-5" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 