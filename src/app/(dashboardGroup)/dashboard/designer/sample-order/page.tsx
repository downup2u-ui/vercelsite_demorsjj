"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBagIcon,
  PlusIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  TagIcon,
  ClipboardDocumentCheckIcon,
  UserIcon,
  CalendarIcon,
  CurrencyYenIcon,
  ClockIcon,
  TruckIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

// 订单状态标签组件
interface StatusTagProps {
  status: string;
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-800';
  let icon = <ClipboardDocumentCheckIcon className="h-4 w-4 mr-1" />;

  switch (status) {
    case '新订单':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      icon = <ClipboardDocumentCheckIcon className="h-4 w-4 mr-1" />;
      break;
    case '打样中':
      bgColor = 'bg-indigo-100';
      textColor = 'text-indigo-800';
      icon = <ClockIcon className="h-4 w-4 mr-1" />;
      break;
    case '样品审核':
      bgColor = 'bg-purple-100';
      textColor = 'text-purple-800';
      icon = <MagnifyingGlassIcon className="h-4 w-4 mr-1" />;
      break;
    case '生产中':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      icon = <TruckIcon className="h-4 w-4 mr-1" />;
      break;
    case '已完成':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      icon = <CheckCircleIcon className="h-4 w-4 mr-1" />;
      break;
    case '已取消':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      icon = <ExclamationCircleIcon className="h-4 w-4 mr-1" />;
      break;
  }

  return (
    <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {icon}
      {status}
    </span>
  );
};

// 订单卡片组件
interface OrderCardProps {
  id: string;
  title: string;
  type: string;
  client: string;
  status: string;
  dueDate: string;
  quantity: number;
  amount: string;
  thumbnailUrl: string;
  href: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  id,
  title,
  type,
  client,
  status,
  dueDate,
  quantity,
  amount,
  thumbnailUrl,
  href
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex">
        <div className="w-1/3 bg-gray-200 relative">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2">
            <span className="bg-gray-800 bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              {type}
            </span>
          </div>
        </div>
        <div className="w-2/3 p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-500 mt-1">客户：{client}</p>
              <p className="text-xs text-gray-500 mt-1">订单号：{id}</p>
            </div>
            <StatusTag status={status} />
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-sm mb-4">
            <div>
              <p className="text-xs text-gray-500">截止日期</p>
              <p className="font-medium text-gray-800 flex items-center">
                <CalendarIcon className="h-3 w-3 mr-1 text-gray-500" />
                {dueDate}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">数量</p>
              <p className="font-medium text-gray-800">{quantity}件</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">金额</p>
              <p className="font-medium text-gray-800">{amount}</p>
            </div>
          </div>
          
          <div className="flex justify-end items-center pt-2 border-t border-gray-100">
            <Link href={href}>
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

// 服务卡片组件
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, href }) => {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow h-full">
        <div className="flex items-center mb-3">
          <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 mr-3">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default function SampleOrderPage() {
  // 状态筛选
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'sampling' | 'review' | 'production' | 'completed' | 'cancelled'>('all');
  
  // 类型筛选
  const [typeFilter, setTypeFilter] = useState<'all' | 'furniture' | 'product' | 'material' | 'textile'>('all');
  
  // 订单数据
  const orders: OrderCardProps[] = [
    {
      id: "SO-2023-1025",
      title: "现代风格办公椅定制",
      type: "家具制样",
      client: "上海创新科技有限公司",
      status: "打样中",
      dueDate: "2023-12-25",
      quantity: 2,
      amount: "¥12,800",
      thumbnailUrl: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      href: "/dashboard/designer/sample-order/so-2023-1025"
    },
    {
      id: "SO-2023-1022",
      title: "环保材质便携餐具套装",
      type: "产品制样",
      client: "李女士",
      status: "样品审核",
      dueDate: "2023-12-15",
      quantity: 5,
      amount: "¥3,500",
      thumbnailUrl: "https://images.unsplash.com/photo-1529008922463-fd89b925364e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      href: "/dashboard/designer/sample-order/so-2023-1022"
    },
    {
      id: "SO-2023-1018",
      title: "时尚灯具原型",
      type: "产品制样",
      client: "广州时尚家居有限公司",
      status: "生产中",
      dueDate: "2023-12-10",
      quantity: 3,
      amount: "¥8,600",
      thumbnailUrl: "https://images.unsplash.com/photo-1543198126-ad9b99b4341b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      href: "/dashboard/designer/sample-order/so-2023-1018"
    },
    {
      id: "SO-2023-1015",
      title: "创意桌面收纳盒",
      type: "产品制样",
      client: "北京艺术学院",
      status: "已完成",
      dueDate: "2023-11-30",
      quantity: 10,
      amount: "¥5,200",
      thumbnailUrl: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      href: "/dashboard/designer/sample-order/so-2023-1015"
    },
    {
      id: "SO-2023-1012",
      title: "环保面料样品打样",
      type: "材料制样",
      client: "张先生",
      status: "新订单",
      dueDate: "2023-12-30",
      quantity: 4,
      amount: "¥2,800",
      thumbnailUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      href: "/dashboard/designer/sample-order/so-2023-1012"
    },
    {
      id: "SO-2023-1008",
      title: "定制印花面料",
      type: "纺织制样",
      client: "东方艺术工作室",
      status: "已取消",
      dueDate: "2023-11-15",
      quantity: 6,
      amount: "¥4,500",
      thumbnailUrl: "https://images.unsplash.com/photo-1529515108370-ffd20a2a5ff4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      href: "/dashboard/designer/sample-order/so-2023-1008"
    }
  ];
  
  // 统计数据
  const stats = [
    {
      label: "本月订单总数",
      value: "24",
      icon: <ShoppingBagIcon className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      label: "在制订单",
      value: "12",
      icon: <ClockIcon className="h-5 w-5 text-indigo-500" />,
      color: "bg-indigo-50"
    },
    {
      label: "本月收入",
      value: "¥82,600",
      icon: <CurrencyYenIcon className="h-5 w-5 text-green-500" />,
      color: "bg-green-50"
    },
    {
      label: "订单完成率",
      value: "92%",
      icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
      color: "bg-green-50"
    }
  ];
  
  // 服务类型数据
  const services = [
    {
      title: "产品制样服务",
      description: "将您的产品设计转化为实体原型，提供高精度的制样和细节测试。",
      icon: <TagIcon className="h-6 w-6" />,
      href: "/dashboard/designer/sample-order/product-sampling"
    },
    {
      title: "家具制样服务",
      description: "定制家具设计的专业打样服务，从概念到实物的完美呈现。",
      icon: <ShoppingBagIcon className="h-6 w-6" />,
      href: "/dashboard/designer/sample-order/furniture-sampling"
    },
    {
      title: "材料制样服务",
      description: "材料和表面处理方案的测试与打样，确保设计预期效果。",
      icon: <ClipboardDocumentCheckIcon className="h-6 w-6" />,
      href: "/dashboard/designer/sample-order/material-sampling"
    },
    {
      title: "纺织制样服务",
      description: "面料、纺织品的打样与测试，包括定制印花和特殊工艺处理。",
      icon: <TruckIcon className="h-6 w-6" />,
      href: "/dashboard/designer/sample-order/textile-sampling"
    }
  ];
  
  // 根据筛选条件过滤订单
  const filteredOrders = orders.filter(order => {
    // 状态筛选
    if (statusFilter !== 'all') {
      const statusMap: {[key: string]: string} = {
        'new': '新订单',
        'sampling': '打样中',
        'review': '样品审核',
        'production': '生产中',
        'completed': '已完成',
        'cancelled': '已取消'
      };
      if (order.status !== statusMap[statusFilter]) return false;
    }
    
    // 类型筛选
    if (typeFilter !== 'all') {
      const typeMap: {[key: string]: string} = {
        'furniture': '家具制样',
        'product': '产品制样',
        'material': '材料制样',
        'textile': '纺织制样'
      };
      if (order.type !== typeMap[typeFilter]) return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">制样定单系统</h1>
        <p className="mt-2 text-sm text-gray-600">
          管理您的设计样品制作和产品定制订单
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

      {/* 服务类型卡片 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">制样服务类型</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              href={service.href}
            />
          ))}
        </div>
      </div>

      {/* 订单筛选和搜索区域 */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <h2 className="text-lg font-semibold text-gray-800">制样订单</h2>
          <Link href="/dashboard/designer/sample-order/new">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center">
              <PlusIcon className="h-5 w-5 mr-1" />
              创建制样订单
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
            placeholder="搜索订单号、产品名称或客户..."
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
                count={orders.length}
                active={statusFilter === 'all'} 
                onClick={() => setStatusFilter('all')} 
              />
              <FilterButton 
                label="新订单" 
                count={orders.filter(o => o.status === '新订单').length}
                active={statusFilter === 'new'} 
                onClick={() => setStatusFilter('new')} 
              />
              <FilterButton 
                label="打样中" 
                count={orders.filter(o => o.status === '打样中').length}
                active={statusFilter === 'sampling'} 
                onClick={() => setStatusFilter('sampling')} 
              />
              <FilterButton 
                label="样品审核" 
                count={orders.filter(o => o.status === '样品审核').length}
                active={statusFilter === 'review'} 
                onClick={() => setStatusFilter('review')} 
              />
              <FilterButton 
                label="生产中" 
                count={orders.filter(o => o.status === '生产中').length}
                active={statusFilter === 'production'} 
                onClick={() => setStatusFilter('production')} 
              />
              <FilterButton 
                label="已完成" 
                count={orders.filter(o => o.status === '已完成').length}
                active={statusFilter === 'completed'} 
                onClick={() => setStatusFilter('completed')} 
              />
              <FilterButton 
                label="已取消" 
                count={orders.filter(o => o.status === '已取消').length}
                active={statusFilter === 'cancelled'} 
                onClick={() => setStatusFilter('cancelled')} 
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
                label="家具制样" 
                active={typeFilter === 'furniture'} 
                onClick={() => setTypeFilter('furniture')} 
              />
              <FilterButton 
                label="产品制样" 
                active={typeFilter === 'product'} 
                onClick={() => setTypeFilter('product')} 
              />
              <FilterButton 
                label="材料制样" 
                active={typeFilter === 'material'} 
                onClick={() => setTypeFilter('material')} 
              />
              <FilterButton 
                label="纺织制样" 
                active={typeFilter === 'textile'} 
                onClick={() => setTypeFilter('textile')} 
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
        
        {/* 订单卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                id={order.id}
                title={order.title}
                type={order.type}
                client={order.client}
                status={order.status}
                dueDate={order.dueDate}
                quantity={order.quantity}
                amount={order.amount}
                thumbnailUrl={order.thumbnailUrl}
                href={order.href}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-gray-200">
              <ShoppingBagIcon className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">没有匹配的订单</h3>
              <p className="text-gray-500 mb-4">尝试调整筛选条件或搜索不同的关键词</p>
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
    </div>
  );
} 