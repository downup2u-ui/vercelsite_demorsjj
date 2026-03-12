"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  TruckIcon,
  ClipboardDocumentListIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  ArrowLeftIcon,
  MapPinIcon,
  InformationCircleIcon,
  PhoneIcon,
  UsersIcon,
  CalendarIcon,
  FunnelIcon,
  TagIcon,
  ChevronDownIcon,
  ChatBubbleLeftRightIcon,
  ShoppingBagIcon,
  CameraIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

// 物流跟踪卡片组件
interface LogisticsCardProps {
  id: string;
  orderNumber: string;
  orderTitle: string;
  customerName: string;
  status: 'preparing' | 'shipped' | 'in_transit' | 'delivered' | 'exception';
  shippingDate?: string;
  estDeliveryDate?: string;
  actualDeliveryDate?: string;
  trackingNumber?: string;
  carrier?: string;
  origin: string;
  destination: string;
  packageDetails: {
    items: number;
    weight: string;
    dimensions: string;
  };
  updates: Array<{
    date: string;
    status: string;
    location?: string;
    description: string;
  }>;
  href: string;
}

const LogisticsCard: React.FC<LogisticsCardProps> = ({
  id,
  orderNumber,
  orderTitle,
  customerName,
  status,
  shippingDate,
  estDeliveryDate,
  actualDeliveryDate,
  trackingNumber,
  carrier,
  origin,
  destination,
  packageDetails,
  updates,
  href
}) => {
  // 状态配置
  const statusConfig = {
    preparing: {
      label: '准备中',
      color: 'bg-yellow-100 text-yellow-800',
      icon: <ClipboardDocumentListIcon className="h-4 w-4 mr-1" />
    },
    shipped: {
      label: '已发货',
      color: 'bg-blue-100 text-blue-800',
      icon: <TruckIcon className="h-4 w-4 mr-1" />
    },
    in_transit: {
      label: '运输中',
      color: 'bg-indigo-100 text-indigo-800',
      icon: <TruckIcon className="h-4 w-4 mr-1" />
    },
    delivered: {
      label: '已送达',
      color: 'bg-green-100 text-green-800',
      icon: <CheckCircleIcon className="h-4 w-4 mr-1" />
    },
    exception: {
      label: '异常',
      color: 'bg-red-100 text-red-800',
      icon: <ExclamationCircleIcon className="h-4 w-4 mr-1" />
    }
  };

  const currentStatus = statusConfig[status];
  
  // 计算当前进度
  const getProgressPercentage = () => {
    switch (status) {
      case 'preparing': return 0;
      case 'shipped': return 33;
      case 'in_transit': return 67;
      case 'delivered': return 100;
      case 'exception': return updates.length > 1 ? 33 : 0;
      default: return 0;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center mb-1">
              <span className="text-gray-500 text-sm">订单: </span>
              <span className="ml-1 font-medium text-gray-800">{orderNumber}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{orderTitle}</h3>
            <p className="text-sm text-gray-600">客户: {customerName}</p>
          </div>
          <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${currentStatus.color}`}>
            {currentStatus.icon}
            {currentStatus.label}
          </span>
        </div>
        
        {/* 运输路径 */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-xs text-gray-500">发货地</p>
              <div className="flex items-center mt-1">
                <MapPinIcon className="h-4 w-4 text-gray-600" />
                <p className="text-sm font-medium ml-1">{origin}</p>
              </div>
            </div>
            
            <div className="flex-1 px-4">
              <div className="relative">
                <div className="h-1 bg-gray-200 rounded-full">
                  <div 
                    className={`h-1 rounded-full ${
                      status === 'exception' ? 'bg-red-500' : 'bg-indigo-500'
                    }`} 
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
                <div className="flex justify-between absolute -top-2 w-full">
                  <div className={`w-4 h-4 rounded-full border-2 border-white ${
                    status !== 'preparing' ? 'bg-indigo-500' : 'bg-gray-300'
                  }`}></div>
                  <div className={`w-4 h-4 rounded-full border-2 border-white ${
                    status === 'shipped' || status === 'in_transit' || status === 'delivered' ? 'bg-indigo-500' : 'bg-gray-300'
                  }`}></div>
                  <div className={`w-4 h-4 rounded-full border-2 border-white ${
                    status === 'in_transit' || status === 'delivered' ? 'bg-indigo-500' : 'bg-gray-300'
                  }`}></div>
                  <div className={`w-4 h-4 rounded-full border-2 border-white ${
                    status === 'delivered' ? 'bg-indigo-500' : status === 'exception' ? 'bg-red-500' : 'bg-gray-300'
                  }`}></div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">目的地</p>
              <div className="flex items-center mt-1">
                <MapPinIcon className="h-4 w-4 text-gray-600" />
                <p className="text-sm font-medium ml-1">{destination}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 包裹信息 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
          {shippingDate && (
            <div>
              <p className="text-xs text-gray-500">发货日期</p>
              <p className="font-medium text-gray-800">{shippingDate}</p>
            </div>
          )}
          {(estDeliveryDate && !actualDeliveryDate) && (
            <div>
              <p className="text-xs text-gray-500">预计送达</p>
              <p className="font-medium text-gray-800">{estDeliveryDate}</p>
            </div>
          )}
          {actualDeliveryDate && (
            <div>
              <p className="text-xs text-gray-500">实际送达</p>
              <p className="font-medium text-gray-800">{actualDeliveryDate}</p>
            </div>
          )}
          {carrier && (
            <div>
              <p className="text-xs text-gray-500">承运商</p>
              <p className="font-medium text-gray-800">{carrier}</p>
            </div>
          )}
          {trackingNumber && (
            <div>
              <p className="text-xs text-gray-500">追踪编号</p>
              <p className="font-medium text-gray-800">{trackingNumber}</p>
            </div>
          )}
        </div>
        
        {/* 包裹详情 */}
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-500 mb-2">包裹详情:</p>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-xs text-gray-500">物品数量</p>
              <p className="font-medium text-gray-800">{packageDetails.items}件</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">重量</p>
              <p className="font-medium text-gray-800">{packageDetails.weight}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">尺寸</p>
              <p className="font-medium text-gray-800">{packageDetails.dimensions}</p>
            </div>
          </div>
        </div>
        
        {/* 最新更新 */}
        {updates.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-gray-700">最新动态:</p>
              <button className="text-xs text-indigo-600 hover:text-indigo-800">查看全部</button>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex items-start">
                <div className="mt-0.5 mr-3">
                  {status === 'exception' ? (
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  ) : status === 'delivered' ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <TruckIcon className="h-5 w-5 text-indigo-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <p className="font-medium text-gray-800">{updates[0].status}</p>
                    {updates[0].location && (
                      <p className="text-gray-600 text-sm ml-2">
                        <span className="mx-1">•</span>
                        {updates[0].location}
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{updates[0].description}</p>
                  <p className="text-xs text-gray-500 mt-1">{updates[0].date}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="flex space-x-2">
            <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition">
              <ChatBubbleLeftRightIcon className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition">
              <PhoneIcon className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition">
              <DocumentTextIcon className="h-4 w-4" />
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

export default function LogisticsPage() {
  // 状态筛选
  const [statusFilter, setStatusFilter] = useState<'all' | 'preparing' | 'shipped' | 'in_transit' | 'delivered' | 'exception'>('all');
  
  // 物流数据
  const logistics: LogisticsCardProps[] = [
    {
      id: "LOG-2023-042",
      orderNumber: "ORD-2023-1025",
      orderTitle: "办公椅定制项目",
      customerName: "上海创新科技有限公司",
      status: "in_transit",
      shippingDate: "2023-12-12",
      estDeliveryDate: "2023-12-18",
      carrier: "顺丰速运",
      trackingNumber: "SF1234567890",
      origin: "上海市",
      destination: "北京市",
      packageDetails: {
        items: 10,
        weight: "48kg",
        dimensions: "120×60×80cm"
      },
      updates: [
        {
          date: "2023-12-14 14:32",
          status: "运输中",
          location: "河南省郑州市",
          description: "包裹已到达中转站，正在转运中"
        },
        {
          date: "2023-12-13 08:15",
          status: "已发货",
          location: "上海市嘉定区",
          description: "包裹已发出，开始运输"
        },
        {
          date: "2023-12-12 15:45",
          status: "已揽件",
          location: "上海市嘉定区",
          description: "承运商已揽件"
        }
      ],
      href: "/dashboard/designer/logistics/log-2023-042"
    },
    {
      id: "LOG-2023-039",
      orderNumber: "ORD-2023-1022",
      orderTitle: "可持续材料家具系列",
      customerName: "绿色生活家居",
      status: "shipped",
      shippingDate: "2023-12-11",
      estDeliveryDate: "2023-12-19",
      carrier: "中通快递",
      trackingNumber: "ZT9876543210",
      origin: "上海市",
      destination: "广州市",
      packageDetails: {
        items: 14,
        weight: "76kg",
        dimensions: "多件包裹"
      },
      updates: [
        {
          date: "2023-12-11 17:25",
          status: "已发货",
          location: "上海市松江区",
          description: "包裹已发出，开始运输"
        },
        {
          date: "2023-12-11 12:10",
          status: "已揽件",
          location: "上海市松江区",
          description: "承运商已揽件"
        }
      ],
      href: "/dashboard/designer/logistics/log-2023-039"
    },
    {
      id: "LOG-2023-036",
      orderNumber: "ORD-2023-1018",
      orderTitle: "品牌识别系统设计",
      customerName: "新锐科技初创公司",
      status: "delivered",
      shippingDate: "2023-11-20",
      estDeliveryDate: "2023-11-22",
      actualDeliveryDate: "2023-11-21",
      carrier: "顺丰速运",
      trackingNumber: "SF2468135790",
      origin: "上海市",
      destination: "上海市",
      packageDetails: {
        items: 3,
        weight: "0.5kg",
        dimensions: "25×18×5cm"
      },
      updates: [
        {
          date: "2023-11-21 14:50",
          status: "已送达",
          location: "上海市浦东新区",
          description: "包裹已签收，签收人：张先生"
        },
        {
          date: "2023-11-21 10:05",
          status: "派送中",
          location: "上海市浦东新区",
          description: "快递员正在派送"
        },
        {
          date: "2023-11-20 18:30",
          status: "已发货",
          location: "上海市黄浦区",
          description: "包裹已发出，开始运输"
        }
      ],
      href: "/dashboard/designer/logistics/log-2023-036"
    },
    {
      id: "LOG-2023-033",
      orderNumber: "ORD-2023-1015",
      orderTitle: "智能家居控制界面设计",
      customerName: "智能家居科技公司",
      status: "preparing",
      packageDetails: {
        items: 1,
        weight: "预估 0.5kg",
        dimensions: "预估 25×18×5cm"
      },
      origin: "上海市",
      destination: "深圳市",
      updates: [
        {
          date: "2023-12-12 09:30",
          status: "准备中",
          description: "订单正在处理中，准备发货"
        }
      ],
      href: "/dashboard/designer/logistics/log-2023-033"
    },
    {
      id: "LOG-2023-028",
      orderNumber: "ORD-2023-1010",
      orderTitle: "展厅空间设计项目",
      customerName: "上海艺术博览会",
      status: "exception",
      shippingDate: "2023-11-15",
      estDeliveryDate: "2023-11-20",
      carrier: "德邦物流",
      trackingNumber: "DB1357924680",
      origin: "上海市",
      destination: "上海市",
      packageDetails: {
        items: 8,
        weight: "30kg",
        dimensions: "多件包裹"
      },
      updates: [
        {
          date: "2023-11-17 16:15",
          status: "运输异常",
          location: "上海市青浦区",
          description: "包裹在运输过程中有损坏，需要进行额外处理"
        },
        {
          date: "2023-11-16 11:20",
          status: "运输中",
          location: "上海市嘉定区",
          description: "包裹正在配送中"
        },
        {
          date: "2023-11-15 14:40",
          status: "已发货",
          location: "上海市黄浦区",
          description: "包裹已发出，开始运输"
        }
      ],
      href: "/dashboard/designer/logistics/log-2023-028"
    }
  ];
  
  // 统计数据
  const stats = [
    {
      label: "总物流单数",
      value: logistics.length.toString(),
      icon: <TruckIcon className="h-5 w-5 text-indigo-500" />,
      color: "bg-indigo-50"
    },
    {
      label: "运输中",
      value: logistics.filter(item => item.status === 'in_transit' || item.status === 'shipped').length.toString(),
      icon: <ArrowPathIcon className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      label: "已送达",
      value: logistics.filter(item => item.status === 'delivered').length.toString(),
      icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
      color: "bg-green-50"
    },
    {
      label: "异常物流",
      value: logistics.filter(item => item.status === 'exception').length.toString(),
      icon: <ExclamationCircleIcon className="h-5 w-5 text-red-500" />,
      color: "bg-red-50"
    }
  ];
  
  // 根据筛选条件过滤物流单
  const filteredLogistics = statusFilter === 'all'
    ? logistics
    : logistics.filter(item => item.status === statusFilter);

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">产品物流</h1>
        <p className="mt-2 text-sm text-gray-600">
          跟踪和管理产品运输状态，提供实时物流进度可视化
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

      {/* 物流跟踪区域 */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <h2 className="text-lg font-semibold text-gray-800">物流跟踪</h2>
          <div className="flex">
            <Link href="/dashboard/designer/logistics/map">
              <button className="mr-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition flex items-center">
                <MapPinIcon className="h-5 w-5 mr-1" />
                地图视图
              </button>
            </Link>
            <Link href="/dashboard/designer/logistics/new">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center">
                <TruckIcon className="h-5 w-5 mr-1" />
                创建物流单
              </button>
            </Link>
          </div>
        </div>
        
        {/* 状态筛选按钮 */}
        <div className="flex flex-wrap gap-2 mb-5">
          <FilterButton 
            label="全部" 
            count={logistics.length}
            active={statusFilter === 'all'} 
            onClick={() => setStatusFilter('all')} 
          />
          <FilterButton 
            label="准备中" 
            count={logistics.filter(l => l.status === 'preparing').length}
            active={statusFilter === 'preparing'} 
            onClick={() => setStatusFilter('preparing')} 
          />
          <FilterButton 
            label="已发货" 
            count={logistics.filter(l => l.status === 'shipped').length}
            active={statusFilter === 'shipped'} 
            onClick={() => setStatusFilter('shipped')} 
          />
          <FilterButton 
            label="运输中" 
            count={logistics.filter(l => l.status === 'in_transit').length}
            active={statusFilter === 'in_transit'} 
            onClick={() => setStatusFilter('in_transit')} 
          />
          <FilterButton 
            label="已送达" 
            count={logistics.filter(l => l.status === 'delivered').length}
            active={statusFilter === 'delivered'} 
            onClick={() => setStatusFilter('delivered')} 
          />
          <FilterButton 
            label="异常" 
            count={logistics.filter(l => l.status === 'exception').length}
            active={statusFilter === 'exception'} 
            onClick={() => setStatusFilter('exception')} 
          />
        </div>
        
        {/* 搜索和高级筛选 */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-5">
          <div className="w-full md:w-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="搜索订单号、运单号或客户名称..."
              className="pl-10 w-full md:w-80 h-10 bg-white border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="flex items-center">
            <button className="flex items-center text-sm text-gray-600 hover:text-gray-900 mr-4">
              <FunnelIcon className="h-5 w-5 mr-1" />
              高级筛选
            </button>
            <div className="flex items-center">
              <button className="flex items-center text-sm text-gray-600 bg-white border border-gray-300 rounded-md px-3 py-2">
                <span>排序:</span>
                <span className="font-medium ml-1">最新物流</span>
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
        
        {/* 物流卡片列表 */}
        <div className="space-y-6">
          {filteredLogistics.length > 0 ? (
            filteredLogistics.map((logistics) => (
              <LogisticsCard
                key={logistics.id}
                id={logistics.id}
                orderNumber={logistics.orderNumber}
                orderTitle={logistics.orderTitle}
                customerName={logistics.customerName}
                status={logistics.status}
                shippingDate={logistics.shippingDate}
                estDeliveryDate={logistics.estDeliveryDate}
                actualDeliveryDate={logistics.actualDeliveryDate}
                trackingNumber={logistics.trackingNumber}
                carrier={logistics.carrier}
                origin={logistics.origin}
                destination={logistics.destination}
                packageDetails={logistics.packageDetails}
                updates={logistics.updates}
                href={logistics.href}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-gray-200">
              <TruckIcon className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到物流单</h3>
              <p className="text-gray-500 mb-4">尝试调整筛选条件或创建新的物流单</p>
              <button 
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setStatusFilter('all')}
              >
                <ArrowPathIcon className="h-4 w-4 mr-2" />
                重置筛选条件
              </button>
            </div>
          )}
        </div>
        
        {/* 分页控件 */}
        {filteredLogistics.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              显示 {filteredLogistics.length} 个物流单中的 1-{Math.min(filteredLogistics.length, 10)}
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

      {/* 物流信息卡片 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-indigo-50 rounded-md text-indigo-600 mr-3">
              <TruckIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">物流商合作伙伴</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-md flex items-center justify-center text-indigo-600 mr-3">
                  SF
                </div>
                <span className="font-medium">顺丰速运</span>
              </div>
              <span className="text-sm text-gray-500">主要合作伙伴</span>
            </li>
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center text-green-600 mr-3">
                  ZT
                </div>
                <span className="font-medium">中通快递</span>
              </div>
              <span className="text-sm text-gray-500">合作伙伴</span>
            </li>
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center text-yellow-600 mr-3">
                  DB
                </div>
                <span className="font-medium">德邦物流</span>
              </div>
              <span className="text-sm text-gray-500">大件运输</span>
            </li>
          </ul>
          <div className="mt-4 pt-3 border-t border-gray-100 text-center">
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
              查看全部合作伙伴
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-50 rounded-md text-green-600 mr-3">
              <CheckCircleIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">物流提示</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex p-3 bg-yellow-50 rounded-md border border-yellow-100">
              <InformationCircleIcon className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-800">临近节假日（元旦），物流配送可能延迟，请提前安排发货</p>
                <p className="text-xs text-gray-500 mt-1">2023-12-25 - 2024-01-02</p>
              </div>
            </li>
            <li className="flex p-3 bg-blue-50 rounded-md border border-blue-100">
              <InformationCircleIcon className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-800">为保证产品安全，大型家具请选择德邦物流进行运输</p>
              </div>
            </li>
            <li className="flex p-3 bg-green-50 rounded-md border border-green-100">
              <InformationCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-800">精细产品推荐使用顺丰速运，提供更安全的包装和运输方式</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-50 rounded-md text-purple-600 mr-3">
              <CameraIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">物流最佳实践</h3>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start p-2">
              <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-2 flex-shrink-0 mt-0.5">
                1
              </div>
              <p className="text-sm text-gray-700">发货前拍摄产品包装照片，记录产品状态和包装完整性</p>
            </li>
            <li className="flex items-start p-2">
              <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-2 flex-shrink-0 mt-0.5">
                2
              </div>
              <p className="text-sm text-gray-700">使用适合产品尺寸和重量的包装材料，确保运输安全</p>
            </li>
            <li className="flex items-start p-2">
              <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-2 flex-shrink-0 mt-0.5">
                3
              </div>
              <p className="text-sm text-gray-700">提前通知客户物流信息，让客户了解预期送达时间</p>
            </li>
            <li className="flex items-start p-2">
              <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-2 flex-shrink-0 mt-0.5">
                4
              </div>
              <p className="text-sm text-gray-700">对于贵重或易碎产品，建议购买物流保险和选择专业物流服务</p>
            </li>
          </ul>
          <div className="mt-4 pt-3 border-t border-gray-100 text-center">
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
              查看完整指南
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 