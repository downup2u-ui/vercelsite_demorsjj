"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  ArchiveBoxIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronDownIcon,
  CalendarIcon,
  ReceiptRefundIcon,
  FunnelIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  ArrowsRightLeftIcon,
  BriefcaseIcon,
  TagIcon,
  ShoppingBagIcon,
  TruckIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';

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

// 库存项目卡片组件
interface InventoryItemProps {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'reserved';
  location: string;
  lastUpdated: string;
  dimensions?: string;
  reservationInfo?: {
    reservedBy: string;
    until: string;
  };
  thumbnailUrl?: string;
  href: string;
}

const InventoryItemCard: React.FC<InventoryItemProps> = ({
  id,
  name,
  category,
  quantity,
  status,
  location,
  lastUpdated,
  dimensions,
  reservationInfo,
  thumbnailUrl,
  href
}) => {
  // 状态配置
  const statusConfig = {
    in_stock: {
      label: '库存充足',
      color: 'bg-green-100 text-green-800',
      icon: <CheckCircleIcon className="h-4 w-4 mr-1" />
    },
    low_stock: {
      label: '库存不足',
      color: 'bg-yellow-100 text-yellow-800',
      icon: <ClockIcon className="h-4 w-4 mr-1" />
    },
    out_of_stock: {
      label: '无库存',
      color: 'bg-red-100 text-red-800',
      icon: <XCircleIcon className="h-4 w-4 mr-1" />
    },
    reserved: {
      label: '已预约',
      color: 'bg-blue-100 text-blue-800',
      icon: <CalendarIcon className="h-4 w-4 mr-1" />
    }
  };

  const currentStatus = statusConfig[status];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex">
        {thumbnailUrl && (
          <div className="w-1/3 sm:w-1/4 bg-gray-200 relative">
            <img
              src={thumbnailUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className={thumbnailUrl ? "w-2/3 sm:w-3/4 p-4" : "w-full p-4"}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
              <p className="text-sm text-gray-600">{category}</p>
            </div>
            <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${currentStatus.color}`}>
              {currentStatus.icon}
              {currentStatus.label}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
            <div>
              <p className="text-xs text-gray-500">库存编号</p>
              <p className="font-medium text-gray-800">{id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">数量</p>
              <p className="font-medium text-gray-800">{quantity}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">库位</p>
              <p className="font-medium text-gray-800">{location}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">上次更新</p>
              <p className="font-medium text-gray-800">{lastUpdated}</p>
            </div>
            {dimensions && (
              <div className="col-span-2">
                <p className="text-xs text-gray-500">规格尺寸</p>
                <p className="font-medium text-gray-800">{dimensions}</p>
              </div>
            )}
          </div>
          
          {reservationInfo && (
            <div className="mb-3 p-2 bg-blue-50 rounded-md text-sm">
              <p className="text-xs text-gray-600">
                <span className="font-medium">预约信息:</span> 由 {reservationInfo.reservedBy} 预约至 {reservationInfo.until}
              </p>
            </div>
          )}
          
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div className="flex space-x-2">
              <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition" title="预约库存">
                <CalendarIcon className="h-4 w-4" />
              </button>
              <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition" title="出库申请">
                <ShoppingBagIcon className="h-4 w-4" />
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
    </div>
  );
};

export default function InventoryPage() {
  // 分类筛选
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'material' | 'tool' | 'product' | 'sample'>('all');
  
  // 状态筛选
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock' | 'reserved'>('all');
  
  // 库存数据
  const inventoryItems: InventoryItemProps[] = [
    {
      id: "INV-2023-001",
      name: "竹制家具材料套装",
      category: "材料",
      quantity: 25,
      status: "in_stock",
      location: "A区-12架-03格",
      lastUpdated: "2023-12-15",
      dimensions: "120 × 80 × 40 cm",
      thumbnailUrl: "https://images.unsplash.com/photo-1533377379833-53adac35ddb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      href: "/dashboard/designer/inventory/inv-2023-001"
    },
    {
      id: "INV-2023-010",
      name: "激光切割机 XS-450",
      category: "工具",
      quantity: 3,
      status: "low_stock",
      location: "B区-03架-01格",
      lastUpdated: "2023-12-10",
      thumbnailUrl: "https://images.unsplash.com/photo-1600504970111-8c558c38504c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      href: "/dashboard/designer/inventory/inv-2023-010"
    },
    {
      id: "INV-2023-025",
      name: "办公椅原型样品",
      category: "样品",
      quantity: 2,
      status: "reserved",
      location: "C区-08架-05格",
      lastUpdated: "2023-12-12",
      dimensions: "60 × 60 × 90 cm",
      reservationInfo: {
        reservedBy: "张设计师",
        until: "2023-12-25"
      },
      thumbnailUrl: "https://images.unsplash.com/photo-1505843490640-21be87112389?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      href: "/dashboard/designer/inventory/inv-2023-025"
    },
    {
      id: "INV-2023-032",
      name: "环保布料样品套装",
      category: "材料",
      quantity: 0,
      status: "out_of_stock",
      location: "A区-05架-08格",
      lastUpdated: "2023-12-08",
      dimensions: "30 × 20 × 10 cm",
      thumbnailUrl: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      href: "/dashboard/designer/inventory/inv-2023-032"
    },
    {
      id: "INV-2023-040",
      name: "灯具成品",
      category: "产品",
      quantity: 8,
      status: "in_stock",
      location: "D区-02架-07格",
      lastUpdated: "2023-12-17",
      dimensions: "40 × 40 × 80 cm",
      thumbnailUrl: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      href: "/dashboard/designer/inventory/inv-2023-040"
    }
  ];
  
  // 统计数据
  const stats = [
    {
      label: "总库存项目",
      value: inventoryItems.length.toString(),
      icon: <ArchiveBoxIcon className="h-5 w-5 text-indigo-500" />,
      color: "bg-indigo-50"
    },
    {
      label: "库存充足",
      value: inventoryItems.filter(item => item.status === 'in_stock').length.toString(),
      icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
      color: "bg-green-50"
    },
    {
      label: "已预约",
      value: inventoryItems.filter(item => item.status === 'reserved').length.toString(),
      icon: <CalendarIcon className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      label: "库存不足",
      value: (inventoryItems.filter(item => item.status === 'low_stock').length + 
              inventoryItems.filter(item => item.status === 'out_of_stock').length).toString(),
      icon: <XCircleIcon className="h-5 w-5 text-red-500" />,
      color: "bg-red-50"
    }
  ];
  
  // 根据筛选条件过滤库存项目
  const filteredItems = inventoryItems.filter(item => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    
    if (categoryFilter !== 'all') {
      const categoryMap: Record<string, string> = {
        'material': '材料',
        'tool': '工具',
        'product': '产品',
        'sample': '样品'
      };
      if (item.category !== categoryMap[categoryFilter]) return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">WWS库存管理</h1>
        <p className="mt-2 text-sm text-gray-600">
          管理和预约工作室仓库中的材料、工具和样品等库存资源
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

      {/* 库存管理区域 */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <h2 className="text-lg font-semibold text-gray-800">库存列表</h2>
          <div className="flex gap-2">
            <Link href="/dashboard/designer/inventory/warehouse-reservation">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition flex items-center">
                <CalendarIcon className="h-5 w-5 mr-1" />
                仓库预约
              </button>
            </Link>
            <Link href="/dashboard/designer/inventory/apply">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center">
                <PlusIcon className="h-5 w-5 mr-1" />
                申请使用
              </button>
            </Link>
          </div>
        </div>
        
        {/* 分类筛选按钮 */}
        <div className="flex items-center space-x-2 mb-4">
          <FunnelIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">分类:</span>
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              label="全部" 
              count={inventoryItems.length}
              active={categoryFilter === 'all'} 
              onClick={() => setCategoryFilter('all')} 
            />
            <FilterButton 
              label="材料" 
              count={inventoryItems.filter(item => item.category === '材料').length}
              active={categoryFilter === 'material'} 
              onClick={() => setCategoryFilter('material')} 
            />
            <FilterButton 
              label="工具" 
              count={inventoryItems.filter(item => item.category === '工具').length}
              active={categoryFilter === 'tool'} 
              onClick={() => setCategoryFilter('tool')} 
            />
            <FilterButton 
              label="产品" 
              count={inventoryItems.filter(item => item.category === '产品').length}
              active={categoryFilter === 'product'} 
              onClick={() => setCategoryFilter('product')} 
            />
            <FilterButton 
              label="样品" 
              count={inventoryItems.filter(item => item.category === '样品').length}
              active={categoryFilter === 'sample'} 
              onClick={() => setCategoryFilter('sample')} 
            />
          </div>
        </div>
        
        {/* 状态筛选按钮 */}
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
              label="库存充足" 
              count={inventoryItems.filter(item => item.status === 'in_stock').length}
              active={statusFilter === 'in_stock'} 
              onClick={() => setStatusFilter('in_stock')} 
            />
            <FilterButton 
              label="库存不足" 
              count={inventoryItems.filter(item => item.status === 'low_stock').length}
              active={statusFilter === 'low_stock'} 
              onClick={() => setStatusFilter('low_stock')} 
            />
            <FilterButton 
              label="无库存" 
              count={inventoryItems.filter(item => item.status === 'out_of_stock').length}
              active={statusFilter === 'out_of_stock'} 
              onClick={() => setStatusFilter('out_of_stock')} 
            />
            <FilterButton 
              label="已预约" 
              count={inventoryItems.filter(item => item.status === 'reserved').length}
              active={statusFilter === 'reserved'} 
              onClick={() => setStatusFilter('reserved')} 
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
            placeholder="搜索库存编号、名称或位置..."
            className="pl-10 w-full h-10 bg-white border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        {/* 排序下拉框 */}
        <div className="flex justify-end mb-4">
          <div className="relative inline-block text-left">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              排序: 最近更新
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
        
        {/* 库存项目卡片列表 */}
        <div className="space-y-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <InventoryItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                category={item.category}
                quantity={item.quantity}
                status={item.status}
                location={item.location}
                lastUpdated={item.lastUpdated}
                dimensions={item.dimensions}
                reservationInfo={item.reservationInfo}
                thumbnailUrl={item.thumbnailUrl}
                href={item.href}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-gray-200">
              <ArchiveBoxIcon className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到库存项目</h3>
              <p className="text-gray-500 mb-4">尝试调整筛选条件</p>
              <button 
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  setCategoryFilter('all');
                  setStatusFilter('all');
                }}
              >
                <ArrowsRightLeftIcon className="h-4 w-4 mr-2" />
                重置筛选条件
              </button>
            </div>
          )}
        </div>
        
        {/* 分页控件 */}
        {filteredItems.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              显示 {filteredItems.length} 个库存项目中的 1-{Math.min(filteredItems.length, 10)}
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

      {/* 库存操作指南 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">库存操作指南</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 mr-3">
                <CalendarIcon className="h-6 w-6" />
              </div>
              <h4 className="font-medium text-gray-800">仓库预约</h4>
            </div>
            <p className="text-sm text-gray-600">预约仓库使用时间，可预约特定设备和材料，确保您的项目所需资源。</p>
            <Link href="/dashboard/designer/inventory/warehouse-reservation">
              <button className="mt-3 text-indigo-600 text-sm font-medium hover:text-indigo-800">
                预约仓库 →
              </button>
            </Link>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 mr-3">
                <BriefcaseIcon className="h-6 w-6" />
              </div>
              <h4 className="font-medium text-gray-800">材料借用</h4>
            </div>
            <p className="text-sm text-gray-600">申请借用设计材料和工具，填写用途和预计归还时间，系统自动跟踪借用状态。</p>
            <Link href="/dashboard/designer/inventory/borrow">
              <button className="mt-3 text-indigo-600 text-sm font-medium hover:text-indigo-800">
                申请借用 →
              </button>
            </Link>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 mr-3">
                <DocumentDuplicateIcon className="h-6 w-6" />
              </div>
              <h4 className="font-medium text-gray-800">库存申报</h4>
            </div>
            <p className="text-sm text-gray-600">将您的设计样品或成品登记入库，或申报已使用的材料，保持库存准确性。</p>
            <Link href="/dashboard/designer/inventory/register">
              <button className="mt-3 text-indigo-600 text-sm font-medium hover:text-indigo-800">
                申报库存 →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 