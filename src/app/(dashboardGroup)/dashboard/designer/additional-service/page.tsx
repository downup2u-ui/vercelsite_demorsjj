"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheckIcon,
  GiftIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  DocumentCheckIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  ClockIcon,
  FolderIcon,
  ChevronDownIcon,
  FunnelIcon,
  ArrowsRightLeftIcon,
  DocumentTextIcon,
  TagIcon,
  QrCodeIcon
} from '@heroicons/react/24/outline';

// 服务卡片组件
interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  href: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, features, icon, href }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 mr-3">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      
      <div className="mb-4 flex-grow">
        <p className="text-sm font-medium text-gray-700 mb-2">服务特点：</p>
        <ul className="space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <Link href={href}>
        <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition">
          查看详情
        </button>
      </Link>
    </div>
  );
};

// 服务请求卡片组件
interface ServiceRequestCardProps {
  id: string;
  title: string;
  productName: string;
  type: 'quality' | 'packaging';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  requestDate: string;
  completionDate?: string;
  notes?: string;
  href: string;
}

const ServiceRequestCard: React.FC<ServiceRequestCardProps> = ({
  id,
  title,
  productName,
  type,
  status,
  requestDate,
  completionDate,
  notes,
  href
}) => {
  // 状态配置
  const statusConfig = {
    pending: {
      color: 'bg-yellow-100 text-yellow-800',
      icon: <ClockIcon className="h-4 w-4 mr-1" />,
      text: '待处理'
    },
    processing: {
      color: 'bg-blue-100 text-blue-800',
      icon: <ArrowPathIcon className="h-4 w-4 mr-1" />,
      text: '处理中'
    },
    completed: {
      color: 'bg-green-100 text-green-800',
      icon: <CheckCircleIcon className="h-4 w-4 mr-1" />,
      text: '已完成'
    },
    failed: {
      color: 'bg-red-100 text-red-800',
      icon: <XCircleIcon className="h-4 w-4 mr-1" />,
      text: '未通过'
    }
  };

  // 类型配置
  const typeConfig = {
    quality: {
      icon: <ShieldCheckIcon className="h-5 w-5 text-indigo-500" />,
      text: '质量检测'
    },
    packaging: {
      icon: <GiftIcon className="h-5 w-5 text-indigo-500" />,
      text: '产品包装'
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
            <span className="text-sm font-medium text-gray-600 ml-1.5">{currentType.text}</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${currentStatus.color}`}>
            {currentStatus.icon}
            {currentStatus.text}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">产品: {productName}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
          <div>
            <p className="text-xs text-gray-500">服务编号</p>
            <p className="font-medium text-gray-800">{id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">申请日期</p>
            <p className="font-medium text-gray-800">{requestDate}</p>
          </div>
          {completionDate && (
            <div>
              <p className="text-xs text-gray-500">完成日期</p>
              <p className="font-medium text-gray-800">{completionDate}</p>
            </div>
          )}
        </div>
        
        {notes && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">备注</p>
            <p className="text-sm text-gray-600">{notes}</p>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
          <button className="text-gray-500 hover:text-indigo-600 text-sm flex items-center">
            <InformationCircleIcon className="h-4 w-4 mr-1" />
            查看详情
          </button>
          <Link href={href}>
            <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition">
              {status === 'completed' ? '查看报告' : '管理服务'}
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

export default function AdditionalServicePage() {
  // 筛选状态
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'processing' | 'completed' | 'failed'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'quality' | 'packaging'>('all');
  
  // 服务项目数据
  const services = [
    {
      title: "产品质检服务",
      description: "专业的产品质量检测服务，确保您的设计作品符合相关标准和规范。",
      features: [
        "全面的产品性能测试",
        "安全性和耐久性评估",
        "人体工程学分析",
        "材料质量鉴定",
        "详细的测试报告和建议"
      ],
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      href: "/dashboard/designer/additional-service/quality-inspection"
    },
    {
      title: "产品包装服务",
      description: "专业的产品包装设计与制作服务，提升产品价值和用户体验。",
      features: [
        "包装结构设计和原型制作",
        "包装视觉和图形设计",
        "符合环保标准的材料选择",
        "运输适应性测试",
        "小批量生产和定制化服务"
      ],
      icon: <GiftIcon className="h-6 w-6" />,
      href: "/dashboard/designer/additional-service/packaging"
    }
  ];
  
  // 服务请求数据
  const serviceRequests: ServiceRequestCardProps[] = [
    {
      id: "QI-2023-056",
      title: "办公椅人体工程学测试",
      productName: "现代风格办公椅",
      type: "quality",
      status: "completed",
      requestDate: "2023-11-25",
      completionDate: "2023-12-03",
      notes: "通过所有测试项目，建议优化扶手高度调节机构",
      href: "/dashboard/designer/additional-service/request/qi-2023-056"
    },
    {
      id: "PK-2023-042",
      title: "环保材质餐具包装设计",
      productName: "环保材质便携餐具套装",
      type: "packaging",
      status: "processing",
      requestDate: "2023-12-05",
      href: "/dashboard/designer/additional-service/request/pk-2023-042"
    },
    {
      id: "QI-2023-053",
      title: "灯具安全认证测试",
      productName: "时尚灯具原型",
      type: "quality",
      status: "failed",
      requestDate: "2023-11-30",
      completionDate: "2023-12-07",
      notes: "电气安全测试未通过，需要调整电路设计并重新测试",
      href: "/dashboard/designer/additional-service/request/qi-2023-053"
    },
    {
      id: "PK-2023-038",
      title: "收纳盒零售包装设计",
      productName: "创意桌面收纳盒",
      type: "packaging",
      status: "completed",
      requestDate: "2023-11-15",
      completionDate: "2023-11-28",
      href: "/dashboard/designer/additional-service/request/pk-2023-038"
    },
    {
      id: "QI-2023-058",
      title: "面料材质和耐久性测试",
      productName: "环保面料样品",
      type: "quality",
      status: "pending",
      requestDate: "2023-12-10",
      href: "/dashboard/designer/additional-service/request/qi-2023-058"
    }
  ];
  
  // 统计数据
  const stats = [
    {
      label: "质检服务数",
      value: serviceRequests.filter(item => item.type === 'quality').length.toString(),
      icon: <ShieldCheckIcon className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      label: "包装服务数",
      value: serviceRequests.filter(item => item.type === 'packaging').length.toString(),
      icon: <GiftIcon className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-50"
    },
    {
      label: "完成率",
      value: "75%",
      icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
      color: "bg-green-50"
    },
    {
      label: "在途服务",
      value: serviceRequests.filter(item => item.status === 'pending' || item.status === 'processing').length.toString(),
      icon: <ArrowPathIcon className="h-5 w-5 text-orange-500" />,
      color: "bg-orange-50"
    }
  ];
  
  // 根据筛选条件过滤服务请求
  const filteredRequests = serviceRequests.filter(request => {
    if (statusFilter !== 'all' && request.status !== statusFilter) return false;
    if (typeFilter !== 'all' && request.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">制样附加服务</h1>
        <p className="mt-2 text-sm text-gray-600">
          提供专业的产品质检和包装服务，提升产品品质与价值
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

      {/* 服务卡片区域 */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-5">附加服务类型</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              features={service.features}
              icon={service.icon}
              href={service.href}
            />
          ))}
        </div>
      </div>

      {/* 我的服务请求 */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <h2 className="text-lg font-semibold text-gray-800">我的服务请求</h2>
          <Link href="/dashboard/designer/additional-service/new-request">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center">
              <PlusIcon className="h-5 w-5 mr-1" />
              申请新服务
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
            placeholder="搜索服务申请..."
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
                count={serviceRequests.length}
                active={statusFilter === 'all'} 
                onClick={() => setStatusFilter('all')} 
              />
              <FilterButton 
                label="待处理" 
                count={serviceRequests.filter(item => item.status === 'pending').length}
                active={statusFilter === 'pending'} 
                onClick={() => setStatusFilter('pending')} 
              />
              <FilterButton 
                label="处理中" 
                count={serviceRequests.filter(item => item.status === 'processing').length}
                active={statusFilter === 'processing'} 
                onClick={() => setStatusFilter('processing')} 
              />
              <FilterButton 
                label="已完成" 
                count={serviceRequests.filter(item => item.status === 'completed').length}
                active={statusFilter === 'completed'} 
                onClick={() => setStatusFilter('completed')} 
              />
              <FilterButton 
                label="未通过" 
                count={serviceRequests.filter(item => item.status === 'failed').length}
                active={statusFilter === 'failed'} 
                onClick={() => setStatusFilter('failed')} 
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <TagIcon className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">类型:</span>
            <div className="flex flex-wrap gap-1">
              <FilterButton 
                label="全部" 
                active={typeFilter === 'all'} 
                onClick={() => setTypeFilter('all')} 
              />
              <FilterButton 
                label="质量检测" 
                active={typeFilter === 'quality'} 
                onClick={() => setTypeFilter('quality')} 
              />
              <FilterButton 
                label="产品包装" 
                active={typeFilter === 'packaging'} 
                onClick={() => setTypeFilter('packaging')} 
              />
            </div>
          </div>
        </div>
        
        {/* 排序下拉框 */}
        <div className="flex justify-end mb-4">
          <div className="relative inline-block text-left">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              排序: 申请日期
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
        
        {/* 服务请求卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <ServiceRequestCard
                key={request.id}
                id={request.id}
                title={request.title}
                productName={request.productName}
                type={request.type}
                status={request.status}
                requestDate={request.requestDate}
                completionDate={request.completionDate}
                notes={request.notes}
                href={request.href}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-gray-200">
              <DocumentTextIcon className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">没有匹配的服务请求</h3>
              <p className="text-gray-500 mb-4">尝试调整筛选条件或申请新的服务</p>
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
            </div>
          )}
        </div>
        
        {/* 分页控件 */}
        {filteredRequests.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              显示 {filteredRequests.length} 个服务请求中的 1-{Math.min(filteredRequests.length, 10)}
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