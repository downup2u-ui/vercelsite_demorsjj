"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  ChartBarIcon,
  CurrencyYenIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  FunnelIcon,
  DocumentArrowDownIcon,
  PresentationChartBarIcon,
  ChartPieIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  BanknotesIcon,
  MapPinIcon,
  TagIcon,
  RocketLaunchIcon,
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  ChevronDownIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

// 统计卡片组件
interface StatCardProps {
  label: string;
  value: string;
  trend?: {
    value: string;
    isUp: boolean;
  };
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon, color }) => {
  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
      <div className="flex items-center mb-2">
        <div className={`p-2 rounded-md ${color} mr-3`}>
          {icon}
        </div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
      </div>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      {trend && (
        <div className="flex items-center mt-1 text-sm">
          {trend.isUp ? (
            <span className="text-green-600 flex items-center">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              {trend.value}
            </span>
          ) : (
            <span className="text-red-600 flex items-center">
              <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
              {trend.value}
            </span>
          )}
          <span className="text-gray-500 ml-1">与上月相比</span>
        </div>
      )}
    </div>
  );
};

// 筛选按钮组件
interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, active, onClick }) => {
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
    </button>
  );
};

// 表格组件
interface TableRow {
  id: string;
  name: string;
  type: string;
  orders: number;
  revenue: string;
  growth: string;
  isGrowthPositive: boolean;
}

const DataTable: React.FC<{ data: TableRow[] }> = ({ data }) => {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              名称
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              类型
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              订单数
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              收入
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              同比增长
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {row.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.orders}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {row.revenue}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  row.isGrowthPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {row.isGrowthPositive ? (
                    <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-3 w-3 mr-1" />
                  )}
                  {row.growth}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 图表卡片组件
interface ChartCardProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  height?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, description, icon, height = 'h-64' }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-indigo-50 rounded-md text-indigo-600 mr-3">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            {description && <p className="text-sm text-gray-500">{description}</p>}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition">
            <MagnifyingGlassIcon className="h-4 w-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition">
            <ArrowDownTrayIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className={`${height} bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center`}>
        <span className="text-gray-400">图表区域</span>
      </div>
    </div>
  );
};

export default function ReportsPage() {
  // 时间筛选
  const [timeFilter, setTimeFilter] = useState<'all' | 'month' | 'quarter' | 'year'>('month');
  
  // 类型筛选
  const [typeFilter, setTypeFilter] = useState<'all' | 'product' | 'client' | 'region'>('all');
  
  // 统计数据
  const stats = [
    {
      label: "总销售额",
      value: "¥1,285,600",
      trend: { value: "8.5%", isUp: true },
      icon: <CurrencyYenIcon className="h-5 w-5 text-indigo-500" />,
      color: "bg-indigo-50"
    },
    {
      label: "订单数量",
      value: "485",
      trend: { value: "12.3%", isUp: true },
      icon: <ShoppingBagIcon className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      label: "平均客单价",
      value: "¥2,651",
      trend: { value: "3.2%", isUp: false },
      icon: <BanknotesIcon className="h-5 w-5 text-green-500" />,
      color: "bg-green-50"
    },
    {
      label: "客户总数",
      value: "246",
      trend: { value: "5.7%", isUp: true },
      icon: <UserGroupIcon className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-50"
    }
  ];
  
  // 产品销售数据
  const productData: TableRow[] = [
    {
      id: "1",
      name: "现代简约办公椅",
      type: "家具",
      orders: 78,
      revenue: "¥234,000",
      growth: "12.5%",
      isGrowthPositive: true
    },
    {
      id: "2",
      name: "北欧风格餐桌",
      type: "家具",
      orders: 52,
      revenue: "¥182,000",
      growth: "8.7%",
      isGrowthPositive: true
    },
    {
      id: "3",
      name: "创意照明设计",
      type: "灯具",
      orders: 124,
      revenue: "¥148,800",
      growth: "15.2%",
      isGrowthPositive: true
    },
    {
      id: "4",
      name: "可调节书架",
      type: "收纳",
      orders: 63,
      revenue: "¥113,400",
      growth: "2.1%",
      isGrowthPositive: false
    },
    {
      id: "5",
      name: "休闲沙发套装",
      type: "家具",
      orders: 42,
      revenue: "¥252,000",
      growth: "5.8%",
      isGrowthPositive: true
    }
  ];
  
  // 客户销售数据
  const clientData: TableRow[] = [
    {
      id: "1",
      name: "上海创新科技有限公司",
      type: "企业客户",
      orders: 12,
      revenue: "¥245,800",
      growth: "9.3%",
      isGrowthPositive: true
    },
    {
      id: "2",
      name: "北京艺术学院",
      type: "合作机构",
      orders: 8,
      revenue: "¥128,500",
      growth: "14.2%",
      isGrowthPositive: true
    },
    {
      id: "3",
      name: "广州时尚家居有限公司",
      type: "企业客户",
      orders: 6,
      revenue: "¥98,400",
      growth: "7.5%",
      isGrowthPositive: true
    },
    {
      id: "4",
      name: "张设计师工作室",
      type: "个人客户",
      orders: 4,
      revenue: "¥76,200",
      growth: "3.8%",
      isGrowthPositive: false
    },
    {
      id: "5",
      name: "深圳科技创新中心",
      type: "合作机构",
      orders: 5,
      revenue: "¥105,500",
      growth: "11.2%",
      isGrowthPositive: true
    }
  ];
  
  // 地区销售数据
  const regionData: TableRow[] = [
    {
      id: "1",
      name: "上海",
      type: "华东",
      orders: 156,
      revenue: "¥462,300",
      growth: "10.5%",
      isGrowthPositive: true
    },
    {
      id: "2",
      name: "北京",
      type: "华北",
      orders: 112,
      revenue: "¥328,500",
      growth: "7.2%",
      isGrowthPositive: true
    },
    {
      id: "3",
      name: "广州",
      type: "华南",
      orders: 98,
      revenue: "¥246,800",
      growth: "12.3%",
      isGrowthPositive: true
    },
    {
      id: "4",
      name: "成都",
      type: "西南",
      orders: 65,
      revenue: "¥138,400",
      growth: "4.7%",
      isGrowthPositive: false
    },
    {
      id: "5",
      name: "武汉",
      type: "华中",
      orders: 54,
      revenue: "¥109,600",
      growth: "8.9%",
      isGrowthPositive: true
    }
  ];
  
  // 根据筛选类型选择显示的数据
  let displayData: TableRow[] = [];
  let tableTitle = "";
  
  if (typeFilter === 'product' || typeFilter === 'all') {
    displayData = productData;
    tableTitle = "产品销售排行";
  } else if (typeFilter === 'client') {
    displayData = clientData;
    tableTitle = "客户销售排行";
  } else if (typeFilter === 'region') {
    displayData = regionData;
    tableTitle = "地区销售排行";
  }

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">销售报表</h1>
        <p className="mt-2 text-sm text-gray-600">
          销售数据分析和详细报表，帮助您了解业务表现和趋势
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* 时间筛选 */}
      <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-2 mr-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">时间范围:</span>
        </div>
        <div className="flex space-x-2">
          <FilterButton 
            label="本月" 
            active={timeFilter === 'month'} 
            onClick={() => setTimeFilter('month')} 
          />
          <FilterButton 
            label="本季度" 
            active={timeFilter === 'quarter'} 
            onClick={() => setTimeFilter('quarter')} 
          />
          <FilterButton 
            label="本年度" 
            active={timeFilter === 'year'} 
            onClick={() => setTimeFilter('year')} 
          />
          <FilterButton 
            label="全部时间" 
            active={timeFilter === 'all'} 
            onClick={() => setTimeFilter('all')} 
          />
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <button className="flex items-center px-4 py-2 border border-gray-300 bg-white rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            <DocumentArrowDownIcon className="h-5 w-5 mr-2 text-gray-500" />
            导出报表
          </button>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard 
          title="销售趋势" 
          description="过去12个月的销售趋势分析"
          icon={<ChartBarIcon className="h-5 w-5" />}
        />
        <ChartCard 
          title="产品类别分布" 
          description="各产品类别销售占比"
          icon={<ChartPieIcon className="h-5 w-5" />}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ChartCard 
          title="客户类型分析" 
          icon={<UserGroupIcon className="h-5 w-5" />}
          height="h-56"
        />
        <ChartCard 
          title="地区销售分布" 
          icon={<MapPinIcon className="h-5 w-5" />}
          height="h-56"
        />
        <ChartCard 
          title="订单时间分布" 
          icon={<CalendarIcon className="h-5 w-5" />}
          height="h-56"
        />
      </div>

      {/* 数据表格 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{tableTitle}</h2>
          <div className="flex items-center space-x-2">
            <button 
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                typeFilter === 'all' || typeFilter === 'product' 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setTypeFilter('product')}
            >
              产品
            </button>
            <button 
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                typeFilter === 'client' 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setTypeFilter('client')}
            >
              客户
            </button>
            <button 
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                typeFilter === 'region' 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setTypeFilter('region')}
            >
              地区
            </button>
          </div>
        </div>
        
        <DataTable data={displayData} />
        
        <div className="mt-4 text-right">
          <Link href="/dashboard/designer/reports/detailed">
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              查看完整报表 →
            </button>
          </Link>
        </div>
      </div>
      
      {/* 销售预测 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-indigo-50 rounded-md text-indigo-600 mr-3">
            <RocketLaunchIcon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">销售预测</h2>
            <p className="text-sm text-gray-500">基于历史数据的销售趋势预测</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
            <p className="text-sm text-gray-600 mb-1">下月销售预测</p>
            <p className="text-xl font-semibold text-indigo-800">¥356,000</p>
            <p className="text-xs text-indigo-600 mt-1">预计增长 7.2%</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-sm text-gray-600 mb-1">下季度销售预测</p>
            <p className="text-xl font-semibold text-blue-800">¥1,125,000</p>
            <p className="text-xs text-blue-600 mt-1">预计增长 9.5%</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <p className="text-sm text-gray-600 mb-1">热门增长产品</p>
            <p className="text-xl font-semibold text-purple-800">现代简约办公椅</p>
            <p className="text-xs text-purple-600 mt-1">预计增长 15.8%</p>
          </div>
        </div>
        
        <div className="h-64 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center">
          <span className="text-gray-400">销售预测趋势图表区域</span>
        </div>
      </div>
      
      {/* 报表快速导航 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Link href="/dashboard/designer/reports/products">
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition flex items-center">
            <div className="p-2 bg-green-50 rounded-md text-green-600 mr-3">
              <ShoppingBagIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">产品报表</h3>
              <p className="text-sm text-gray-500">详细的产品销售数据</p>
            </div>
          </div>
        </Link>
        
        <Link href="/dashboard/designer/reports/clients">
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition flex items-center">
            <div className="p-2 bg-blue-50 rounded-md text-blue-600 mr-3">
              <UserGroupIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">客户报表</h3>
              <p className="text-sm text-gray-500">客户购买行为分析</p>
            </div>
          </div>
        </Link>
        
        <Link href="/dashboard/designer/reports/regions">
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition flex items-center">
            <div className="p-2 bg-purple-50 rounded-md text-purple-600 mr-3">
              <MapPinIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">地区报表</h3>
              <p className="text-sm text-gray-500">各地区销售表现</p>
            </div>
          </div>
        </Link>
        
        <Link href="/dashboard/designer/reports/channels">
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition flex items-center">
            <div className="p-2 bg-orange-50 rounded-md text-orange-600 mr-3">
              <BuildingStorefrontIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">渠道报表</h3>
              <p className="text-sm text-gray-500">销售渠道效果对比</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
} 