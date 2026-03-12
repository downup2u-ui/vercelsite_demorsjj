"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingCartIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  CurrencyYenIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
  PlusIcon,
  TagIcon,
  CheckIcon,
  ArrowPathIcon,
  ClockIcon,
  TruckIcon,
  ExclamationCircleIcon,
  DocumentTextIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  BanknotesIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

// 订单卡片组件
interface OrderCardProps {
  id: string;
  title: string;
  source: 'internal' | 'external';
  sourceDetail: string;
  customerName: string;
  amount: string;
  status: 'new' | 'processing' | 'shipping' | 'completed' | 'cancelled';
  date: string;
  deadline?: string;
  products: Array<{
    name: string;
    quantity: number;
    price: string;
  }>;
  thumbnailUrl?: string;
  href: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  id,
  title,
  source,
  sourceDetail,
  customerName,
  amount,
  status,
  date,
  deadline,
  products,
  thumbnailUrl,
  href
}) => {
  // 来源配置
  const sourceConfig = {
    internal: {
      label: '内部订单',
      color: 'bg-blue-100 text-blue-800'
    },
    external: {
      label: '外部订单',
      color: 'bg-green-100 text-green-800'
    }
  };

  // 状态配置
  const statusConfig = {
    new: {
      label: '新订单',
      color: 'bg-purple-100 text-purple-800',
      icon: <ShoppingBagIcon className="h-4 w-4 mr-1" />
    },
    processing: {
      label: '处理中',
      color: 'bg-yellow-100 text-yellow-800',
      icon: <ClockIcon className="h-4 w-4 mr-1" />
    },
    shipping: {
      label: '配送中',
      color: 'bg-blue-100 text-blue-800',
      icon: <TruckIcon className="h-4 w-4 mr-1" />
    },
    completed: {
      label: '已完成',
      color: 'bg-green-100 text-green-800',
      icon: <CheckIcon className="h-4 w-4 mr-1" />
    },
    cancelled: {
      label: '已取消',
      color: 'bg-red-100 text-red-800',
      icon: <ExclamationCircleIcon className="h-4 w-4 mr-1" />
    }
  };

  const sourceData = sourceConfig[source];
  const statusData = statusConfig[status];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex">
        {thumbnailUrl && (
          <div className="w-1/3 bg-gray-200 relative">
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className={thumbnailUrl ? "w-2/3 p-4" : "w-full p-4"}>
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center mb-1 gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${sourceData.color}`}>
                  {sourceData.label}
                </span>
                <span className="text-xs text-gray-500">{sourceDetail}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                客户: {customerName}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusData.color} mb-2`}>
                {statusData.icon}
                {statusData.label}
              </span>
              <p className="font-semibold text-gray-800">{amount}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
            <div>
              <p className="text-xs text-gray-500">订单编号</p>
              <p className="font-medium text-gray-800">{id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">下单日期</p>
              <p className="font-medium text-gray-800">{date}</p>
            </div>
            {deadline && (
              <div>
                <p className="text-xs text-gray-500">交付期限</p>
                <p className={`font-medium ${status === 'cancelled' || new Date(deadline) < new Date() ? 'text-red-600' : 'text-gray-800'}`}>
                  {deadline}
                </p>
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">产品明细:</p>
            <div className="text-sm bg-gray-50 rounded-md p-2">
              {products.map((product, index) => (
                <div key={index} className="flex justify-between mb-1 last:mb-0">
                  <span>{product.name} × {product.quantity}</span>
                  <span className="font-medium">{product.price}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div className="flex space-x-1">
              <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition" title="查看订单详情">
                <EyeIcon className="h-4 w-4" />
              </button>
              <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition" title="下载订单">
                <ArrowDownTrayIcon className="h-4 w-4" />
              </button>
              {status !== 'completed' && status !== 'cancelled' && (
                <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition" title="更新状态">
                  <ArrowPathIcon className="h-4 w-4" />
                </button>
              )}
            </div>
            <Link href={href}>
              <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition">
                管理订单
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

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
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              {trend.value}
            </span>
          ) : (
            <span className="text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
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

export default function CustomerOrderPage() {
  // 来源筛选状态
  const [sourceFilter, setSourceFilter] = useState<'all' | 'internal' | 'external'>('all');
  
  // 状态筛选状态
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'processing' | 'shipping' | 'completed' | 'cancelled'>('all');
  
  // 订单数据
  const orders: OrderCardProps[] = [
    {
      id: "ORD-2023-1025",
      title: "办公椅定制项目",
      source: "internal",
      sourceDetail: "平台用户",
      customerName: "上海创新科技有限公司",
      amount: "¥24,800",
      status: "processing",
      date: "2023-12-10",
      deadline: "2023-12-25",
      products: [
        { name: "现代设计办公椅", quantity: 10, price: "¥18,000" },
        { name: "设计服务与定制费", quantity: 1, price: "¥6,800" }
      ],
      thumbnailUrl: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      href: "/dashboard/designer/customer-order/ord-2023-1025"
    },
    {
      id: "ORD-2023-1022",
      title: "可持续材料家具系列",
      source: "external",
      sourceDetail: "线下展会",
      customerName: "绿色生活家居",
      amount: "¥42,600",
      status: "shipping",
      date: "2023-11-28",
      deadline: "2023-12-20",
      products: [
        { name: "环保餐桌", quantity: 2, price: "¥16,000" },
        { name: "环保椅子套装", quantity: 12, price: "¥24,000" },
        { name: "设计服务费", quantity: 1, price: "¥2,600" }
      ],
      thumbnailUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      href: "/dashboard/designer/customer-order/ord-2023-1022"
    },
    {
      id: "ORD-2023-1018",
      title: "品牌识别系统设计",
      source: "internal",
      sourceDetail: "平台用户",
      customerName: "新锐科技初创公司",
      amount: "¥18,500",
      status: "completed",
      date: "2023-11-15",
      products: [
        { name: "品牌Logo设计", quantity: 1, price: "¥6,500" },
        { name: "品牌视觉系统", quantity: 1, price: "¥8,000" },
        { name: "应用指南开发", quantity: 1, price: "¥4,000" }
      ],
      href: "/dashboard/designer/customer-order/ord-2023-1018"
    },
    {
      id: "ORD-2023-1015",
      title: "智能家居控制界面设计",
      source: "external",
      sourceDetail: "合作伙伴推荐",
      customerName: "智能家居科技公司",
      amount: "¥32,000",
      status: "new",
      date: "2023-12-08",
      deadline: "2024-01-15",
      products: [
        { name: "用户界面设计", quantity: 1, price: "¥15,000" },
        { name: "原型与交互设计", quantity: 1, price: "¥12,000" },
        { name: "设计系统开发", quantity: 1, price: "¥5,000" }
      ],
      href: "/dashboard/designer/customer-order/ord-2023-1015"
    },
    {
      id: "ORD-2023-1010",
      title: "展厅空间设计项目",
      source: "external",
      sourceDetail: "市场营销活动",
      customerName: "上海艺术博览会",
      amount: "¥58,000",
      status: "cancelled",
      date: "2023-10-30",
      deadline: "2023-12-01",
      products: [
        { name: "展厅空间设计", quantity: 1, price: "¥25,000" },
        { name: "展示道具设计", quantity: 1, price: "¥15,000" },
        { name: "照明设计", quantity: 1, price: "¥8,000" },
        { name: "3D渲染与演示", quantity: 1, price: "¥10,000" }
      ],
      href: "/dashboard/designer/customer-order/ord-2023-1010"
    }
  ];
  
  // 统计数据
  const stats = [
    {
      label: "总订单数",
      value: "128",
      trend: { value: "8%", isUp: true },
      icon: <ShoppingCartIcon className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      label: "内部订单",
      value: "86",
      trend: { value: "12%", isUp: true },
      icon: <UserGroupIcon className="h-5 w-5 text-indigo-500" />,
      color: "bg-indigo-50"
    },
    {
      label: "外部订单",
      value: "42",
      trend: { value: "5%", isUp: false },
      icon: <BuildingStorefrontIcon className="h-5 w-5 text-green-500" />,
      color: "bg-green-50"
    },
    {
      label: "订单总额",
      value: "¥2,586,400",
      trend: { value: "15%", isUp: true },
      icon: <CurrencyYenIcon className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-50"
    }
  ];
  
  // 根据筛选条件过滤订单
  const filteredOrders = orders.filter(order => {
    if (sourceFilter !== 'all' && order.source !== sourceFilter) return false;
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">定单系统</h1>
        <p className="mt-2 text-sm text-gray-600">
          管理来自不同渠道的客户订单，跟踪订单进度和履行状态
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

      {/* 订单筛选和搜索区域 */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <h2 className="text-lg font-semibold text-gray-800">订单列表</h2>
          <Link href="/dashboard/designer/customer-order/new">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center">
              <PlusIcon className="h-5 w-5 mr-1" />
              创建新订单
            </button>
          </Link>
        </div>
        
        {/* 来源筛选 */}
        <div className="flex items-center space-x-2 mb-4">
          <FunnelIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">来源:</span>
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              label="全部" 
              count={orders.length}
              active={sourceFilter === 'all'} 
              onClick={() => setSourceFilter('all')} 
            />
            <FilterButton 
              label="内部订单" 
              count={orders.filter(o => o.source === 'internal').length}
              active={sourceFilter === 'internal'} 
              onClick={() => setSourceFilter('internal')} 
            />
            <FilterButton 
              label="外部订单" 
              count={orders.filter(o => o.source === 'external').length}
              active={sourceFilter === 'external'} 
              onClick={() => setSourceFilter('external')} 
            />
          </div>
        </div>
        
        {/* 状态筛选 */}
        <div className="flex items-center space-x-2 mb-4">
          <TagIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">状态:</span>
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              label="全部" 
              active={statusFilter === 'all'} 
              onClick={() => setStatusFilter('all')} 
            />
            <FilterButton 
              label="新订单" 
              count={orders.filter(o => o.status === 'new').length}
              active={statusFilter === 'new'} 
              onClick={() => setStatusFilter('new')} 
            />
            <FilterButton 
              label="处理中" 
              count={orders.filter(o => o.status === 'processing').length}
              active={statusFilter === 'processing'} 
              onClick={() => setStatusFilter('processing')} 
            />
            <FilterButton 
              label="配送中" 
              count={orders.filter(o => o.status === 'shipping').length}
              active={statusFilter === 'shipping'} 
              onClick={() => setStatusFilter('shipping')} 
            />
            <FilterButton 
              label="已完成" 
              count={orders.filter(o => o.status === 'completed').length}
              active={statusFilter === 'completed'} 
              onClick={() => setStatusFilter('completed')} 
            />
            <FilterButton 
              label="已取消" 
              count={orders.filter(o => o.status === 'cancelled').length}
              active={statusFilter === 'cancelled'} 
              onClick={() => setStatusFilter('cancelled')} 
            />
          </div>
        </div>
        
        {/* 搜索和高级筛选 */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-5">
          <div className="w-full md:w-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="搜索订单号、产品名称或客户..."
              className="pl-10 w-full md:w-80 h-10 bg-white border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="flex items-center">
            <button className="flex items-center text-sm text-gray-600 bg-white border border-gray-300 rounded-md px-3 py-2">
              <span>排序:</span>
              <span className="font-medium ml-1">最新订单</span>
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
        
        {/* 订单卡片列表 */}
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                id={order.id}
                title={order.title}
                source={order.source}
                sourceDetail={order.sourceDetail}
                customerName={order.customerName}
                amount={order.amount}
                status={order.status}
                date={order.date}
                deadline={order.deadline}
                products={order.products}
                thumbnailUrl={order.thumbnailUrl}
                href={order.href}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-gray-200">
              <ShoppingBagIcon className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到订单</h3>
              <p className="text-gray-500 mb-4">尝试调整筛选条件或创建新订单</p>
              <div className="flex space-x-3">
                <button 
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setSourceFilter('all');
                    setStatusFilter('all');
                  }}
                >
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  重置筛选条件
                </button>
                <Link href="/dashboard/designer/customer-order/new">
                  <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    创建新订单
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
        
        {/* 分页控件 */}
        {filteredOrders.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              显示 {filteredOrders.length} 个订单中的 1-{Math.min(filteredOrders.length, 10)}
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

      {/* 订单处理流程 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-5">订单处理流程</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShoppingBagIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">新订单</h4>
            <p className="text-sm text-gray-600">接收和验证客户订单信息</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <DocumentTextIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">订单处理</h4>
            <p className="text-sm text-gray-600">确认设计细节和生产计划</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CalendarIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">设计生产</h4>
            <p className="text-sm text-gray-600">按照计划执行设计和制作</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <TruckIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">配送物流</h4>
            <p className="text-sm text-gray-600">安排产品包装和配送</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <BanknotesIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">结算完成</h4>
            <p className="text-sm text-gray-600">订单完成和账款结算</p>
          </div>
        </div>
      </div>

      {/* 订单来源分析 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">订单来源分布</h3>
          <div className="h-60 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-gray-500">订单来源分布图表区域</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">销售趋势分析</h3>
          <div className="h-60 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-gray-500">销售趋势分析图表区域</p>
          </div>
        </div>
      </div>
    </div>
  );
} 