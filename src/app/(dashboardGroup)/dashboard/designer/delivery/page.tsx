"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
  PlusIcon,
  DocumentTextIcon,
  PhotoIcon,
  ArrowsRightLeftIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  ShoppingBagIcon,
  HandThumbUpIcon,
  CameraIcon,
  ExclamationCircleIcon,
  IdentificationIcon,
  UserIcon,
  RectangleGroupIcon
} from '@heroicons/react/24/outline';

// 交付卡片组件
interface DeliveryCardProps {
  id: string;
  orderNumber: string;
  orderTitle: string;
  customerName: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'confirmed' | 'issue';
  deliveryDate?: string;
  confirmationDate?: string;
  type: 'digital' | 'physical' | 'hybrid';
  products: Array<{
    name: string;
    quantity: number;
  }>;
  notes?: string;
  attachments?: number;
  hasFeedback?: boolean;
  href: string;
}

const DeliveryCard: React.FC<DeliveryCardProps> = ({
  id,
  orderNumber,
  orderTitle,
  customerName,
  status,
  deliveryDate,
  confirmationDate,
  type,
  products,
  notes,
  attachments,
  hasFeedback,
  href
}) => {
  // 状态配置
  const statusConfig = {
    pending: {
      label: '待交付',
      color: 'bg-yellow-100 text-yellow-800',
      icon: <ClockIcon className="h-4 w-4 mr-1" />
    },
    preparing: {
      label: '准备中',
      color: 'bg-blue-100 text-blue-800',
      icon: <ArrowPathIcon className="h-4 w-4 mr-1" />
    },
    ready: {
      label: '待确认',
      color: 'bg-indigo-100 text-indigo-800',
      icon: <TruckIcon className="h-4 w-4 mr-1" />
    },
    delivered: {
      label: '已交付',
      color: 'bg-green-100 text-green-800',
      icon: <CheckCircleIcon className="h-4 w-4 mr-1" />
    },
    confirmed: {
      label: '已确认',
      color: 'bg-purple-100 text-purple-800',
      icon: <HandThumbUpIcon className="h-4 w-4 mr-1" />
    },
    issue: {
      label: '问题反馈',
      color: 'bg-red-100 text-red-800',
      icon: <ExclamationCircleIcon className="h-4 w-4 mr-1" />
    }
  };

  // 类型配置
  const typeConfig = {
    digital: {
      label: '数字交付',
      icon: <DocumentTextIcon className="h-5 w-5 text-indigo-500" />
    },
    physical: {
      label: '实物交付',
      icon: <ShoppingBagIcon className="h-5 w-5 text-indigo-500" />
    },
    hybrid: {
      label: '混合交付',
      icon: <RectangleGroupIcon className="h-5 w-5 text-indigo-500" />
    }
  };

  const currentStatus = statusConfig[status];
  const currentType = typeConfig[type];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            {currentType.icon}
            <span className="text-sm font-medium text-gray-600 ml-1.5">{currentType.label}</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${currentStatus.color}`}>
            {currentStatus.icon}
            {currentStatus.label}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{orderTitle}</h3>
        <p className="text-sm text-gray-600 mb-3">客户: {customerName}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
          <div>
            <p className="text-xs text-gray-500">交付编号</p>
            <p className="font-medium text-gray-800">{id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">订单编号</p>
            <p className="font-medium text-gray-800">{orderNumber}</p>
          </div>
          {deliveryDate && (
            <div>
              <p className="text-xs text-gray-500">交付日期</p>
              <p className="font-medium text-gray-800">{deliveryDate}</p>
            </div>
          )}
          {confirmationDate && (
            <div>
              <p className="text-xs text-gray-500">确认日期</p>
              <p className="font-medium text-gray-800">{confirmationDate}</p>
            </div>
          )}
        </div>
        
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-500 mb-2">交付内容:</p>
          <ul className="space-y-1">
            {products.map((product, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-center">
                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                {product.name} {product.quantity > 1 && `(${product.quantity})`}
              </li>
            ))}
          </ul>
        </div>
        
        {notes && (
          <div className="mb-4 p-3 bg-yellow-50 rounded-md border border-yellow-100">
            <p className="text-xs text-gray-500 mb-1">备注</p>
            <p className="text-sm text-gray-600">{notes}</p>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            {attachments && (
              <span className="flex items-center text-sm text-gray-500">
                <PhotoIcon className="h-4 w-4 mr-1" />
                附件 ({attachments})
              </span>
            )}
            {hasFeedback && (
              <span className="flex items-center text-sm text-gray-500">
                <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
                有反馈
              </span>
            )}
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

export default function DeliveryPage() {
  // 状态筛选
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'preparing' | 'ready' | 'delivered' | 'confirmed' | 'issue'>('all');
  
  // 类型筛选
  const [typeFilter, setTypeFilter] = useState<'all' | 'digital' | 'physical' | 'hybrid'>('all');
  
  // 交付数据
  const deliveries: DeliveryCardProps[] = [
    {
      id: "DEL-2023-042",
      orderNumber: "ORD-2023-1025",
      orderTitle: "办公椅设计定制方案",
      customerName: "上海创新科技有限公司",
      status: "delivered",
      deliveryDate: "2023-12-15",
      type: "hybrid",
      products: [
        { name: "办公椅设计方案文件", quantity: 1 },
        { name: "办公椅原型样品", quantity: 2 },
        { name: "材料样本", quantity: 5 }
      ],
      attachments: 8,
      hasFeedback: true,
      href: "/dashboard/designer/delivery/del-2023-042"
    },
    {
      id: "DEL-2023-038",
      orderNumber: "ORD-2023-1018",
      orderTitle: "品牌识别系统设计",
      customerName: "新锐科技初创公司",
      status: "confirmed",
      deliveryDate: "2023-12-01",
      confirmationDate: "2023-12-08",
      type: "digital",
      products: [
        { name: "品牌Logo源文件", quantity: 1 },
        { name: "品牌视觉系统指南", quantity: 1 },
        { name: "应用场景示例", quantity: 10 }
      ],
      notes: "客户对最终交付内容非常满意，特别是应用场景示例",
      attachments: 15,
      hasFeedback: true,
      href: "/dashboard/designer/delivery/del-2023-038"
    },
    {
      id: "DEL-2023-035",
      orderNumber: "ORD-2023-1022",
      orderTitle: "可持续材料家具系列",
      customerName: "绿色生活家居",
      status: "issue",
      deliveryDate: "2023-12-10",
      type: "physical",
      products: [
        { name: "环保餐桌", quantity: 1 },
        { name: "环保椅子", quantity: 4 },
        { name: "设计说明文档", quantity: 1 }
      ],
      notes: "客户反馈其中一把椅子的表面处理有瑕疵，需要重新处理",
      attachments: 6,
      hasFeedback: true,
      href: "/dashboard/designer/delivery/del-2023-035"
    },
    {
      id: "DEL-2023-033",
      orderNumber: "ORD-2023-1015",
      orderTitle: "智能家居控制界面设计",
      customerName: "智能家居科技公司",
      status: "ready",
      deliveryDate: "2023-12-14",
      type: "digital",
      products: [
        { name: "用户界面设计文件", quantity: 1 },
        { name: "交互原型", quantity: 1 },
        { name: "设计系统组件库", quantity: 1 }
      ],
      attachments: 12,
      href: "/dashboard/designer/delivery/del-2023-033"
    },
    {
      id: "DEL-2023-030",
      orderNumber: "ORD-2023-1030",
      orderTitle: "办公空间灯具设计",
      customerName: "现代照明有限公司",
      status: "preparing",
      type: "hybrid",
      products: [
        { name: "灯具设计图纸", quantity: 1 },
        { name: "灯具原型", quantity: 2 },
        { name: "材料规格说明", quantity: 1 }
      ],
      notes: "原型制作进行中，预计3天后完成",
      href: "/dashboard/designer/delivery/del-2023-030"
    },
    {
      id: "DEL-2023-028",
      orderNumber: "ORD-2023-1038",
      orderTitle: "儿童家具设计方案",
      customerName: "快乐童年玩具公司",
      status: "pending",
      type: "digital",
      products: [
        { name: "儿童桌椅设计方案", quantity: 1 },
        { name: "3D模型文件", quantity: 5 },
        { name: "渲染图", quantity: 10 }
      ],
      href: "/dashboard/designer/delivery/del-2023-028"
    }
  ];
  
  // 统计数据
  const stats = [
    {
      label: "总交付项目",
      value: deliveries.length.toString(),
      icon: <ShoppingBagIcon className="h-5 w-5 text-indigo-500" />,
      color: "bg-indigo-50"
    },
    {
      label: "待处理交付",
      value: deliveries.filter(d => d.status === 'pending' || d.status === 'preparing').length.toString(),
      icon: <ClockIcon className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-50"
    },
    {
      label: "完成确认",
      value: deliveries.filter(d => d.status === 'confirmed').length.toString(),
      icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
      color: "bg-green-50"
    },
    {
      label: "问题反馈",
      value: deliveries.filter(d => d.status === 'issue').length.toString(),
      icon: <ExclamationCircleIcon className="h-5 w-5 text-red-500" />,
      color: "bg-red-50"
    }
  ];
  
  // 根据筛选条件过滤交付项目
  const filteredDeliveries = deliveries.filter(delivery => {
    if (statusFilter !== 'all' && delivery.status !== statusFilter) return false;
    if (typeFilter !== 'all' && delivery.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">产品交付</h1>
        <p className="mt-2 text-sm text-gray-600">
          管理产品交付流程，确保客户满意度和项目顺利完成
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

      {/* 交付筛选和管理区域 */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <h2 className="text-lg font-semibold text-gray-800">交付管理</h2>
          <Link href="/dashboard/designer/delivery/new">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center">
              <PlusIcon className="h-5 w-5 mr-1" />
              新建交付
            </button>
          </Link>
        </div>
        
        {/* 状态筛选按钮 */}
        <div className="flex items-center space-x-2 mb-4">
          <FunnelIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">状态:</span>
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              label="全部" 
              count={deliveries.length}
              active={statusFilter === 'all'} 
              onClick={() => setStatusFilter('all')} 
            />
            <FilterButton 
              label="待交付" 
              count={deliveries.filter(d => d.status === 'pending').length}
              active={statusFilter === 'pending'} 
              onClick={() => setStatusFilter('pending')} 
            />
            <FilterButton 
              label="准备中" 
              count={deliveries.filter(d => d.status === 'preparing').length}
              active={statusFilter === 'preparing'} 
              onClick={() => setStatusFilter('preparing')} 
            />
            <FilterButton 
              label="待确认" 
              count={deliveries.filter(d => d.status === 'ready').length}
              active={statusFilter === 'ready'} 
              onClick={() => setStatusFilter('ready')} 
            />
            <FilterButton 
              label="已交付" 
              count={deliveries.filter(d => d.status === 'delivered').length}
              active={statusFilter === 'delivered'} 
              onClick={() => setStatusFilter('delivered')} 
            />
            <FilterButton 
              label="已确认" 
              count={deliveries.filter(d => d.status === 'confirmed').length}
              active={statusFilter === 'confirmed'} 
              onClick={() => setStatusFilter('confirmed')} 
            />
            <FilterButton 
              label="问题反馈" 
              count={deliveries.filter(d => d.status === 'issue').length}
              active={statusFilter === 'issue'} 
              onClick={() => setStatusFilter('issue')} 
            />
          </div>
        </div>
        
        {/* 类型筛选按钮 */}
        <div className="flex items-center space-x-2 mb-4">
          <IdentificationIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">类型:</span>
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              label="全部" 
              active={typeFilter === 'all'} 
              onClick={() => setTypeFilter('all')} 
            />
            <FilterButton 
              label="数字交付" 
              count={deliveries.filter(d => d.type === 'digital').length}
              active={typeFilter === 'digital'} 
              onClick={() => setTypeFilter('digital')} 
            />
            <FilterButton 
              label="实物交付" 
              count={deliveries.filter(d => d.type === 'physical').length}
              active={typeFilter === 'physical'} 
              onClick={() => setTypeFilter('physical')} 
            />
            <FilterButton 
              label="混合交付" 
              count={deliveries.filter(d => d.type === 'hybrid').length}
              active={typeFilter === 'hybrid'} 
              onClick={() => setTypeFilter('hybrid')} 
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
            placeholder="搜索交付项目、订单号或客户名称..."
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
        
        {/* 交付卡片列表 */}
        <div className="space-y-6">
          {filteredDeliveries.length > 0 ? (
            filteredDeliveries.map((delivery) => (
              <DeliveryCard
                key={delivery.id}
                id={delivery.id}
                orderNumber={delivery.orderNumber}
                orderTitle={delivery.orderTitle}
                customerName={delivery.customerName}
                status={delivery.status}
                deliveryDate={delivery.deliveryDate}
                confirmationDate={delivery.confirmationDate}
                type={delivery.type}
                products={delivery.products}
                notes={delivery.notes}
                attachments={delivery.attachments}
                hasFeedback={delivery.hasFeedback}
                href={delivery.href}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-gray-200">
              <ShoppingBagIcon className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到交付项目</h3>
              <p className="text-gray-500 mb-4">尝试调整筛选条件或创建新的交付项目</p>
              <div className="flex space-x-3">
                <button 
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setStatusFilter('all');
                    setTypeFilter('all');
                  }}
                >
                  <ArrowsRightLeftIcon className="h-4 w-4 mr-2" />
                  重置筛选条件
                </button>
                <Link href="/dashboard/designer/delivery/new">
                  <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    新建交付
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
        
        {/* 分页控件 */}
        {filteredDeliveries.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              显示 {filteredDeliveries.length} 个交付项目中的 1-{Math.min(filteredDeliveries.length, 10)}
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

      {/* 交付流程 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-5">产品交付流程</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <DocumentTextIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">准备交付</h4>
            <p className="text-sm text-gray-600">整理所有设计成果和交付文档</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CameraIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">质量检查</h4>
            <p className="text-sm text-gray-600">确保所有交付内容符合标准</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <TruckIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">完成交付</h4>
            <p className="text-sm text-gray-600">交付设计成果给客户</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <UserIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">客户确认</h4>
            <p className="text-sm text-gray-600">获取客户对交付的确认</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">后续跟进</h4>
            <p className="text-sm text-gray-600">收集反馈并提供必要的支持</p>
          </div>
        </div>
      </div>

      {/* 交付最佳实践 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">交付最佳实践</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h4 className="text-md font-medium text-gray-800 mb-3 border-b border-gray-200 pb-2">数字交付检查清单</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">确保所有文件命名符合规范</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">检查文件格式与客户要求一致</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">包含设计说明文档</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">检查源文件和资源完整性</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">使用安全的文件传输方式</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h4 className="text-md font-medium text-gray-800 mb-3 border-b border-gray-200 pb-2">实物交付注意事项</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">产品包装符合保护标准</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">提前与客户确认交付地址和时间</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">准备产品使用说明和维护指南</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">交付前拍摄产品状态照片</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">安排产品交付验收流程</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 