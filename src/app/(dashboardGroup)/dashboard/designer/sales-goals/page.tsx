"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  FlagIcon,
  CurrencyYenIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  CircleStackIcon,
  UserGroupIcon,
  ClockIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  CalendarIcon,
  AdjustmentsHorizontalIcon,
  PencilSquareIcon,
  ArrowPathIcon,
  ShoppingBagIcon,
  TagIcon,
  ChevronDownIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

// 统计卡片组件
interface StatCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, subtitle, icon, color }) => {
  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
      <div className="flex items-center mb-2">
        <div className={`p-2 rounded-md ${color} mr-3`}>
          {icon}
        </div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
      </div>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
};

// 目标进度组件
interface GoalProgressProps {
  id: string;
  title: string;
  description: string;
  target: string;
  current: string;
  startDate: string;
  endDate: string;
  progress: number;
  category: 'revenue' | 'orders' | 'clients' | 'products';
  status: 'on_track' | 'at_risk' | 'completed' | 'failed';
}

const GoalProgressCard: React.FC<GoalProgressProps> = ({
  id,
  title,
  description,
  target,
  current,
  startDate,
  endDate,
  progress,
  category,
  status
}) => {
  // 类别配置
  const categoryConfig = {
    revenue: {
      icon: <CurrencyYenIcon className="h-5 w-5 text-indigo-500" />,
      label: '销售额目标'
    },
    orders: {
      icon: <ShoppingBagIcon className="h-5 w-5 text-blue-500" />,
      label: '订单数目标'
    },
    clients: {
      icon: <UserGroupIcon className="h-5 w-5 text-green-500" />,
      label: '客户数目标'
    },
    products: {
      icon: <TagIcon className="h-5 w-5 text-purple-500" />,
      label: '产品销量目标'
    }
  };

  // 状态配置
  const statusConfig = {
    on_track: {
      color: 'bg-green-100 text-green-800',
      icon: <CheckCircleIcon className="h-4 w-4 mr-1" />,
      label: '进展顺利'
    },
    at_risk: {
      color: 'bg-yellow-100 text-yellow-800',
      icon: <ClockIcon className="h-4 w-4 mr-1" />,
      label: '存在风险'
    },
    completed: {
      color: 'bg-blue-100 text-blue-800',
      icon: <FlagIcon className="h-4 w-4 mr-1" />,
      label: '已完成'
    },
    failed: {
      color: 'bg-red-100 text-red-800',
      icon: <XCircleIcon className="h-4 w-4 mr-1" />,
      label: '未达成'
    }
  };
  
  const currentCategory = categoryConfig[category];
  const currentStatus = statusConfig[status];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            {currentCategory.icon}
            <span className="text-sm font-medium text-gray-600 ml-1.5">{currentCategory.label}</span>
          </div>
          <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${currentStatus.color}`}>
            {currentStatus.icon}
            {currentStatus.label}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
          <div>
            <p className="text-xs text-gray-500">目标</p>
            <p className="font-medium text-gray-800">{target}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">当前值</p>
            <p className="font-medium text-gray-800">{current}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">开始日期</p>
            <p className="font-medium text-gray-800">{startDate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">结束日期</p>
            <p className="font-medium text-gray-800">{endDate}</p>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">进度</span>
            <span className="font-medium text-gray-700">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                status === 'completed' ? 'bg-blue-500' : 
                status === 'failed' ? 'bg-red-500' : 
                progress >= 75 ? 'bg-green-500' : 
                progress >= 40 ? 'bg-yellow-500' : 
                'bg-red-500'
              }`} 
              style={{width: `${progress}%`}}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            ID: {id}
          </div>
          <div className="flex space-x-2">
            <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition">
              <PencilSquareIcon className="h-4 w-4" />
            </button>
            <Link href={`/dashboard/designer/sales-goals/${id}`}>
              <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition">
                查看详情
              </button>
            </Link>
          </div>
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

export default function SalesGoalsPage() {
  // 状态筛选
  const [statusFilter, setStatusFilter] = useState<'all' | 'on_track' | 'at_risk' | 'completed' | 'failed'>('all');
  
  // 类别筛选
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'revenue' | 'orders' | 'clients' | 'products'>('all');
  
  // 销售目标数据
  const salesGoals: GoalProgressProps[] = [
    {
      id: "G-2023-001",
      title: "第四季度销售额目标",
      description: "2023年第四季度总销售额目标，包括所有设计产品和服务",
      target: "¥1,500,000",
      current: "¥1,285,600",
      startDate: "2023-10-01",
      endDate: "2023-12-31",
      progress: 86,
      category: "revenue",
      status: "on_track"
    },
    {
      id: "G-2023-002",
      title: "新客户开发目标",
      description: "2023年新增客户数量目标，重点关注企业客户和合作机构",
      target: "50个",
      current: "36个",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      progress: 72,
      category: "clients",
      status: "at_risk"
    },
    {
      id: "G-2023-003",
      title: "办公家具订单目标",
      description: "办公家具产品线的季度订单数量目标",
      target: "200个",
      current: "185个",
      startDate: "2023-10-01",
      endDate: "2023-12-31",
      progress: 92,
      category: "orders",
      status: "on_track"
    },
    {
      id: "G-2023-004",
      title: "现代简约系列销量目标",
      description: "现代简约风格产品系列的年度销售数量目标",
      target: "350件",
      current: "302件",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      progress: 86,
      category: "products",
      status: "on_track"
    },
    {
      id: "G-2023-005",
      title: "第三季度销售额目标",
      description: "2023年第三季度总销售额目标",
      target: "¥1,200,000",
      current: "¥1,250,000",
      startDate: "2023-07-01",
      endDate: "2023-09-30",
      progress: 100,
      category: "revenue",
      status: "completed"
    },
    {
      id: "G-2023-006",
      title: "照明产品销量目标",
      description: "照明设计系列产品的季度销售目标",
      target: "150件",
      current: "95件",
      startDate: "2023-10-01",
      endDate: "2023-12-31",
      progress: 63,
      category: "products",
      status: "at_risk"
    }
  ];
  
  // 统计数据
  const stats = [
    {
      label: "进行中目标",
      value: salesGoals.filter(g => g.status === 'on_track' || g.status === 'at_risk').length.toString(),
      subtitle: "正在跟踪的销售目标",
      icon: <FlagIcon className="h-5 w-5 text-indigo-500" />,
      color: "bg-indigo-50"
    },
    {
      label: "目标达成率",
      value: "78%",
      subtitle: "今年目标平均完成情况",
      icon: <ArrowTrendingUpIcon className="h-5 w-5 text-green-500" />,
      color: "bg-green-50"
    },
    {
      label: "销售预测达成",
      value: "¥1.48M",
      subtitle: "本季度预计最终数据",
      icon: <ChartBarIcon className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      label: "距离年度目标",
      value: "¥214.4K",
      subtitle: "还需完成的销售额",
      icon: <CircleStackIcon className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-50"
    }
  ];
  
  // 根据筛选条件过滤目标
  const filteredGoals = salesGoals.filter(goal => {
    if (statusFilter !== 'all' && goal.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && goal.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">销售目标</h1>
        <p className="mt-2 text-sm text-gray-600">
          设定、跟踪和管理您的销售目标和业绩指标
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>
      
      {/* 目标进度图表 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <ChartBarIcon className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">年度目标进度</h2>
          </div>
          <Link href="/dashboard/designer/sales-goals/yearly">
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              查看全部年度目标 →
            </button>
          </Link>
        </div>
        
        <div className="h-64 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center">
          <span className="text-gray-400">年度目标进度图表区域</span>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div>
              <p className="text-sm text-gray-500">销售额目标</p>
              <p className="text-lg font-semibold text-gray-800">¥5.2M / ¥6M</p>
            </div>
            <p className="text-lg font-bold text-green-600">87%</p>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div>
              <p className="text-sm text-gray-500">订单数目标</p>
              <p className="text-lg font-semibold text-gray-800">1,850 / 2,000</p>
            </div>
            <p className="text-lg font-bold text-green-600">93%</p>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div>
              <p className="text-sm text-gray-500">客户数目标</p>
              <p className="text-lg font-semibold text-gray-800">246 / 350</p>
            </div>
            <p className="text-lg font-bold text-yellow-600">70%</p>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div>
              <p className="text-sm text-gray-500">平均客单价</p>
              <p className="text-lg font-semibold text-gray-800">¥2,810 / ¥3,000</p>
            </div>
            <p className="text-lg font-bold text-yellow-600">94%</p>
          </div>
        </div>
      </div>

      {/* 目标管理区域 */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <h2 className="text-lg font-semibold text-gray-800">销售目标管理</h2>
          <div className="flex gap-2">
            <Link href="/dashboard/designer/sales-goals/templates">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition flex items-center">
                <DocumentTextIcon className="h-5 w-5 mr-1" />
                目标模板
              </button>
            </Link>
            <Link href="/dashboard/designer/sales-goals/new">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center">
                <PlusIcon className="h-5 w-5 mr-1" />
                创建目标
              </button>
            </Link>
          </div>
        </div>
        
        {/* 状态筛选按钮 */}
        <div className="flex items-center space-x-2 mb-4">
          <TagIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">状态:</span>
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              label="全部" 
              count={salesGoals.length}
              active={statusFilter === 'all'} 
              onClick={() => setStatusFilter('all')} 
            />
            <FilterButton 
              label="进展顺利" 
              count={salesGoals.filter(g => g.status === 'on_track').length}
              active={statusFilter === 'on_track'} 
              onClick={() => setStatusFilter('on_track')} 
            />
            <FilterButton 
              label="存在风险" 
              count={salesGoals.filter(g => g.status === 'at_risk').length}
              active={statusFilter === 'at_risk'} 
              onClick={() => setStatusFilter('at_risk')} 
            />
            <FilterButton 
              label="已完成" 
              count={salesGoals.filter(g => g.status === 'completed').length}
              active={statusFilter === 'completed'} 
              onClick={() => setStatusFilter('completed')} 
            />
            <FilterButton 
              label="未达成" 
              count={salesGoals.filter(g => g.status === 'failed').length}
              active={statusFilter === 'failed'} 
              onClick={() => setStatusFilter('failed')} 
            />
          </div>
        </div>
        
        {/* 类别筛选按钮 */}
        <div className="flex items-center space-x-2 mb-4">
          <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">类别:</span>
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              label="全部" 
              active={categoryFilter === 'all'} 
              onClick={() => setCategoryFilter('all')} 
            />
            <FilterButton 
              label="销售额" 
              count={salesGoals.filter(g => g.category === 'revenue').length}
              active={categoryFilter === 'revenue'} 
              onClick={() => setCategoryFilter('revenue')} 
            />
            <FilterButton 
              label="订单数" 
              count={salesGoals.filter(g => g.category === 'orders').length}
              active={categoryFilter === 'orders'} 
              onClick={() => setCategoryFilter('orders')} 
            />
            <FilterButton 
              label="客户数" 
              count={salesGoals.filter(g => g.category === 'clients').length}
              active={categoryFilter === 'clients'} 
              onClick={() => setCategoryFilter('clients')} 
            />
            <FilterButton 
              label="产品销量" 
              count={salesGoals.filter(g => g.category === 'products').length}
              active={categoryFilter === 'products'} 
              onClick={() => setCategoryFilter('products')} 
            />
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
        
        {/* 目标卡片列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGoals.length > 0 ? (
            filteredGoals.map((goal) => (
              <GoalProgressCard
                key={goal.id}
                id={goal.id}
                title={goal.title}
                description={goal.description}
                target={goal.target}
                current={goal.current}
                startDate={goal.startDate}
                endDate={goal.endDate}
                progress={goal.progress}
                category={goal.category}
                status={goal.status}
              />
            ))
          ) : (
            <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-lg border border-gray-200">
              <FlagIcon className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到销售目标</h3>
              <p className="text-gray-500 mb-4">尝试调整筛选条件或创建新的销售目标</p>
              <div className="flex space-x-3">
                <button 
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setStatusFilter('all');
                    setCategoryFilter('all');
                  }}
                >
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  重置筛选条件
                </button>
                <Link href="/dashboard/designer/sales-goals/new">
                  <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    创建销售目标
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 目标设定指南 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">销售目标设定指南</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 mr-3">
                <FlagIcon className="h-6 w-6" />
              </div>
              <h4 className="font-medium text-gray-800">SMART原则</h4>
            </div>
            <p className="text-sm text-gray-600">设定具体的、可衡量的、可实现的、相关的、有时限的销售目标，提高达成率</p>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 mr-3">
                <ChartBarIcon className="h-6 w-6" />
              </div>
              <h4 className="font-medium text-gray-800">基于数据设定</h4>
            </div>
            <p className="text-sm text-gray-600">参考历史销售数据、市场趋势和公司战略，设定既有挑战性又切实可行的销售目标</p>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 mr-3">
                <CalendarIcon className="h-6 w-6" />
              </div>
              <h4 className="font-medium text-gray-800">定期回顾调整</h4>
            </div>
            <p className="text-sm text-gray-600">每月或每季度回顾销售目标进度，根据实际情况及时调整策略，确保目标达成</p>
          </div>
        </div>
      </div>
    </div>
  );
} 