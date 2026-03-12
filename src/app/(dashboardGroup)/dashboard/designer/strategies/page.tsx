"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  LightBulbIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  PresentationChartBarIcon,
  BuildingStorefrontIcon,
  FlagIcon,
  PlusIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  EyeIcon,
  TrashIcon,
  TagIcon,
  ChartPieIcon,
  ClockIcon,
  CalendarIcon,
  ArrowPathIcon,
  MapIcon,
  ShoppingBagIcon,
  CurrencyYenIcon
} from '@heroicons/react/24/outline';

// 策略卡片组件
interface StrategyCardProps {
  id: string;
  title: string;
  description: string;
  type: 'sales' | 'market' | 'product' | 'customer';
  status: 'active' | 'planning' | 'completed' | 'archived';
  startDate: string;
  endDate: string;
  owner: string;
  kpis: string[];
  progress?: number;
  href: string;
}

const StrategyCard: React.FC<StrategyCardProps> = ({
  id,
  title,
  description,
  type,
  status,
  startDate,
  endDate,
  owner,
  kpis,
  progress,
  href
}) => {
  // 类型配置
  const typeConfig = {
    sales: {
      label: '销售策略',
      icon: <CurrencyYenIcon className="h-5 w-5 text-indigo-500" />,
      color: 'bg-indigo-50'
    },
    market: {
      label: '市场策略',
      icon: <ChartPieIcon className="h-5 w-5 text-blue-500" />,
      color: 'bg-blue-50'
    },
    product: {
      label: '产品策略',
      icon: <ShoppingBagIcon className="h-5 w-5 text-green-500" />,
      color: 'bg-green-50'
    },
    customer: {
      label: '客户策略',
      icon: <UserGroupIcon className="h-5 w-5 text-purple-500" />,
      color: 'bg-purple-50'
    }
  };

  // 状态配置
  const statusConfig = {
    active: {
      label: '执行中',
      color: 'bg-green-100 text-green-800'
    },
    planning: {
      label: '规划中',
      color: 'bg-blue-100 text-blue-800'
    },
    completed: {
      label: '已完成',
      color: 'bg-purple-100 text-purple-800'
    },
    archived: {
      label: '已归档',
      color: 'bg-gray-100 text-gray-800'
    }
  };

  const currentType = typeConfig[type];
  const currentStatus = statusConfig[status];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className={`flex items-center p-2 rounded-md ${currentType.color}`}>
            {currentType.icon}
            <span className="text-sm font-medium text-gray-600 ml-1.5">{currentType.label}</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${currentStatus.color}`}>
            {currentStatus.label}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
          <div>
            <p className="text-xs text-gray-500">开始日期</p>
            <p className="font-medium text-gray-800">{startDate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">结束日期</p>
            <p className="font-medium text-gray-800">{endDate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">负责人</p>
            <p className="font-medium text-gray-800">{owner}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">战略编号</p>
            <p className="font-medium text-gray-800">{id}</p>
          </div>
        </div>
        
        {progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">执行进度</span>
              <span className="font-medium text-gray-700">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  status === 'completed' ? 'bg-purple-500' : 
                  progress >= 75 ? 'bg-green-500' : 
                  progress >= 40 ? 'bg-blue-500' : 
                  'bg-indigo-500'
                }`} 
                style={{width: `${progress}%`}}
              ></div>
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">关键绩效指标 (KPIs):</p>
          <div className="flex flex-wrap gap-2">
            {kpis.map((kpi, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                {kpi}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex space-x-2">
            <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition">
              <PencilSquareIcon className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition">
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
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

// 策略概览卡片组件
interface StrategyOverviewCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  count: number;
  href: string;
}

const StrategyOverviewCard: React.FC<StrategyOverviewCardProps> = ({
  title,
  description,
  icon,
  color,
  count,
  href
}) => {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <div className={`p-3 rounded-lg ${color}`}>
            {icon}
          </div>
          <span className="text-2xl font-bold text-gray-800">{count}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  );
};

export default function StrategiesPage() {
  // 状态筛选
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'planning' | 'completed' | 'archived'>('all');
  
  // 类型筛选
  const [typeFilter, setTypeFilter] = useState<'all' | 'sales' | 'market' | 'product' | 'customer'>('all');
  
  // 策略数据
  const strategies: StrategyCardProps[] = [
    {
      id: "STR-2023-001",
      title: "企业客户销售增长策略",
      description: "针对企业客户群体的销售策略，重点提升客户转化率和大客户留存",
      type: "sales",
      status: "active",
      startDate: "2023-10-01",
      endDate: "2024-03-31",
      owner: "销售部 - 张经理",
      kpis: ["企业客户销售额增长30%", "大客户留存率85%以上", "客单价提升15%"],
      progress: 45,
      href: "/dashboard/designer/strategies/str-2023-001"
    },
    {
      id: "STR-2023-002",
      title: "现代简约系列市场推广",
      description: "现代简约设计系列家具的市场推广计划，包括线上营销和展会推广",
      type: "market",
      status: "active",
      startDate: "2023-11-15",
      endDate: "2024-02-15",
      owner: "市场部 - 李总监",
      kpis: ["品牌曝光量提升50%", "线上流量提升40%", "社交媒体互动率20%"],
      progress: 30,
      href: "/dashboard/designer/strategies/str-2023-002"
    },
    {
      id: "STR-2023-003",
      title: "办公空间解决方案产品策略",
      description: "开发和优化针对企业办公空间的整体解决方案产品线",
      type: "product",
      status: "planning",
      startDate: "2024-01-01",
      endDate: "2024-06-30",
      owner: "产品部 - 王设计师",
      kpis: ["新产品线上市时间", "产品毛利率35%", "客户满意度评分4.5+"],
      href: "/dashboard/designer/strategies/str-2023-003"
    },
    {
      id: "STR-2023-004",
      title: "高端客户忠诚度计划",
      description: "针对高消费客户群体的会员忠诚计划，提高复购率和客户价值",
      type: "customer",
      status: "active",
      startDate: "2023-09-01",
      endDate: "2024-08-31",
      owner: "客户关系 - 刘经理",
      kpis: ["高端客户复购率提升25%", "会员活动参与率30%", "客户终身价值提升20%"],
      progress: 60,
      href: "/dashboard/designer/strategies/str-2023-004"
    },
    {
      id: "STR-2023-005",
      title: "区域市场拓展策略",
      description: "针对华东地区的市场拓展战略，增加区域销售网络和覆盖率",
      type: "sales",
      status: "completed",
      startDate: "2023-07-01",
      endDate: "2023-12-31",
      owner: "销售部 - 陈总监",
      kpis: ["华东区销售额提升40%", "新增销售点15个", "市场占有率提升8%"],
      progress: 100,
      href: "/dashboard/designer/strategies/str-2023-005"
    },
    {
      id: "STR-2023-006",
      title: "线上渠道优化策略",
      description: "优化电商和社交媒体销售渠道，提升线上转化率和用户体验",
      type: "market",
      status: "archived",
      startDate: "2023-05-01",
      endDate: "2023-10-31",
      owner: "数字营销 - 赵经理",
      kpis: ["线上销售转化率提升15%", "客户获取成本降低20%", "用户停留时间增加30%"],
      progress: 92,
      href: "/dashboard/designer/strategies/str-2023-006"
    }
  ];
  
  // 根据筛选条件过滤策略
  const filteredStrategies = strategies.filter(strategy => {
    if (statusFilter !== 'all' && strategy.status !== statusFilter) return false;
    if (typeFilter !== 'all' && strategy.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">销售策略</h1>
        <p className="mt-2 text-sm text-gray-600">
          制定、管理和执行销售策略，提升业务增长和市场竞争力
        </p>
      </div>

      {/* 策略概览卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StrategyOverviewCard
          title="销售策略"
          description="针对销售流程和渠道的策略"
          icon={<CurrencyYenIcon className="h-6 w-6 text-indigo-600" />}
          color="bg-indigo-50"
          count={strategies.filter(s => s.type === 'sales').length}
          href="/dashboard/designer/strategies?type=sales"
        />
        <StrategyOverviewCard
          title="市场策略"
          description="市场推广和品牌建设策略"
          icon={<ChartPieIcon className="h-6 w-6 text-blue-600" />}
          color="bg-blue-50"
          count={strategies.filter(s => s.type === 'market').length}
          href="/dashboard/designer/strategies?type=market"
        />
        <StrategyOverviewCard
          title="产品策略"
          description="产品开发和优化策略"
          icon={<ShoppingBagIcon className="h-6 w-6 text-green-600" />}
          color="bg-green-50"
          count={strategies.filter(s => s.type === 'product').length}
          href="/dashboard/designer/strategies?type=product"
        />
        <StrategyOverviewCard
          title="客户策略"
          description="客户关系和忠诚度策略"
          icon={<UserGroupIcon className="h-6 w-6 text-purple-600" />}
          color="bg-purple-50"
          count={strategies.filter(s => s.type === 'customer').length}
          href="/dashboard/designer/strategies?type=customer"
        />
      </div>

      {/* 策略管理区域 */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <h2 className="text-lg font-semibold text-gray-800">策略管理</h2>
          <Link href="/dashboard/designer/strategies/new">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center">
              <PlusIcon className="h-5 w-5 mr-1" />
              创建策略
            </button>
          </Link>
        </div>
        
        {/* 状态筛选按钮 */}
        <div className="flex items-center space-x-2 mb-4">
          <TagIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">状态:</span>
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              label="全部" 
              count={strategies.length}
              active={statusFilter === 'all'} 
              onClick={() => setStatusFilter('all')} 
            />
            <FilterButton 
              label="执行中" 
              count={strategies.filter(s => s.status === 'active').length}
              active={statusFilter === 'active'} 
              onClick={() => setStatusFilter('active')} 
            />
            <FilterButton 
              label="规划中" 
              count={strategies.filter(s => s.status === 'planning').length}
              active={statusFilter === 'planning'} 
              onClick={() => setStatusFilter('planning')} 
            />
            <FilterButton 
              label="已完成" 
              count={strategies.filter(s => s.status === 'completed').length}
              active={statusFilter === 'completed'} 
              onClick={() => setStatusFilter('completed')} 
            />
            <FilterButton 
              label="已归档" 
              count={strategies.filter(s => s.status === 'archived').length}
              active={statusFilter === 'archived'} 
              onClick={() => setStatusFilter('archived')} 
            />
          </div>
        </div>
        
        {/* 类型筛选按钮 */}
        <div className="flex items-center space-x-2 mb-4">
          <LightBulbIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">类型:</span>
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              label="全部类型" 
              active={typeFilter === 'all'} 
              onClick={() => setTypeFilter('all')} 
            />
            <FilterButton 
              label="销售策略" 
              count={strategies.filter(s => s.type === 'sales').length}
              active={typeFilter === 'sales'} 
              onClick={() => setTypeFilter('sales')} 
            />
            <FilterButton 
              label="市场策略" 
              count={strategies.filter(s => s.type === 'market').length}
              active={typeFilter === 'market'} 
              onClick={() => setTypeFilter('market')} 
            />
            <FilterButton 
              label="产品策略" 
              count={strategies.filter(s => s.type === 'product').length}
              active={typeFilter === 'product'} 
              onClick={() => setTypeFilter('product')} 
            />
            <FilterButton 
              label="客户策略" 
              count={strategies.filter(s => s.type === 'customer').length}
              active={typeFilter === 'customer'} 
              onClick={() => setTypeFilter('customer')} 
            />
          </div>
        </div>
        
        {/* 搜索框 */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="搜索策略名称、描述或KPIs..."
            className="pl-10 w-full h-10 bg-white border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        {/* 排序下拉框 */}
        <div className="flex justify-end mb-4">
          <div className="relative inline-block text-left">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              排序: 最近创建
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
        
        {/* 策略卡片列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStrategies.length > 0 ? (
            filteredStrategies.map((strategy) => (
              <StrategyCard
                key={strategy.id}
                id={strategy.id}
                title={strategy.title}
                description={strategy.description}
                type={strategy.type}
                status={strategy.status}
                startDate={strategy.startDate}
                endDate={strategy.endDate}
                owner={strategy.owner}
                kpis={strategy.kpis}
                progress={strategy.progress}
                href={strategy.href}
              />
            ))
          ) : (
            <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-lg border border-gray-200">
              <LightBulbIcon className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到策略</h3>
              <p className="text-gray-500 mb-4">尝试调整筛选条件或创建新的销售策略</p>
              <div className="flex space-x-3">
                <button 
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setStatusFilter('all');
                    setTypeFilter('all');
                  }}
                >
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  重置筛选条件
                </button>
                <Link href="/dashboard/designer/strategies/new">
                  <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    创建策略
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 策略规划流程 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-5">策略规划流程</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">分析与规划</h4>
            <p className="text-sm text-gray-600">市场分析和目标设定</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <DocumentTextIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">策略制定</h4>
            <p className="text-sm text-gray-600">确定具体行动计划</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <RocketLaunchIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">执行实施</h4>
            <p className="text-sm text-gray-600">部署和执行策略</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <ChartPieIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">监控评估</h4>
            <p className="text-sm text-gray-600">跟踪进度和KPI表现</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <ArrowPathIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">优化调整</h4>
            <p className="text-sm text-gray-600">基于反馈改进策略</p>
          </div>
        </div>
      </div>
    </div>
  );
} 