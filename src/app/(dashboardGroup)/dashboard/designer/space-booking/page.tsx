"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  BuildingOffice2Icon,
  CalendarIcon,
  MapPinIcon,
  UserIcon,
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  FunnelIcon,
  MusicalNoteIcon,
  QueueListIcon,
  HomeModernIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  ShoppingBagIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { SpaceBookingPlaceholder } from '@/components/ui/placeholders';

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

export default function SpaceBookingPage() {
  const pageFeatureTitle = "空间预约";
  const welcomeMessage = "预约工作室、办公室和会议室等创意空间，助力您的设计事业。";
  
  // 当前选中的菜单项
  const [activeMenu, setActiveMenu] = useState('all');
  
  // 菜单项配置
  const menuItems = [
    { id: 'all', label: '全部空间', icon: '🏢' },
    { id: 'studio', label: '共享工作室', icon: '🎨' },
    { id: 'office', label: '办公室', icon: '💼' },
    { id: 'meeting', label: '会议室', icon: '👥' },
    { id: 'divider', type: 'divider' },
    { id: 'my-bookings', label: '我的预约', icon: '📅' },
    { id: 'expired', label: '历史预约', icon: '⏱️' },
  ];

  // 获取各空间类型的描述
  const getSpaceDescription = (type: string) => {
    switch(type) {
      case 'studio':
        return '适合个人设计师或小团队使用的创意工作空间，提供基础设计工具和设备。';
      case 'office':
        return '独立办公空间，提供安静专注的工作环境，适合需要私密性的设计项目和团队。';
      case 'meeting':
        return '配备投影、白板等会议设施的专业空间，适合项目讨论、客户会谈和创意头脑风暴。';
      default:
        return '';
    }
  };

  // 标签页状态
  const [activeTab, setActiveTab] = useState<'spaces' | 'bookings'>('spaces');
  
  // 筛选状态
  const [spaceTypeFilter, setSpaceTypeFilter] = useState<'all' | 'workspace' | 'office' | 'meeting' | 'market' | 'event'>('all');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  
  // 空间数据
  const spaces: SpaceCardProps[] = [
    {
      id: "SP-W-001",
      name: "创意共享工作室A",
      type: "共享工作室",
      location: "1号楼 3楼",
      capacity: 10,
      facilities: ["高速WiFi", "打印机", "饮水机", "充电站"],
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      availability: "available",
      price: "¥200/天",
      href: "/dashboard/designer/space-booking/space/sp-w-001"
    },
    {
      id: "SP-O-002",
      name: "独立设计工作室B",
      type: "办公室",
      location: "2号楼 5楼",
      capacity: 4,
      facilities: ["高速WiFi", "私人储物柜", "24小时门禁", "空调"],
      imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      availability: "limited",
      price: "¥3,500/月",
      href: "/dashboard/designer/space-booking/space/sp-o-002"
    },
    {
      id: "SP-M-003",
      name: "创意会议室C",
      type: "会议室",
      location: "1号楼 4楼",
      capacity: 12,
      facilities: ["投影仪", "视频会议系统", "白板", "茶水服务"],
      imageUrl: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80",
      availability: "available",
      price: "¥150/小时",
      href: "/dashboard/designer/space-booking/space/sp-m-003"
    },
    {
      id: "SP-M-004",
      name: "多功能会议室D",
      type: "会议室",
      location: "3号楼 2楼",
      capacity: 20,
      facilities: ["双投影仪", "音响系统", "互动白板", "茶水服务"],
      imageUrl: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      availability: "unavailable",
      price: "¥280/小时",
      href: "/dashboard/designer/space-booking/space/sp-m-004"
    },
    {
      id: "SP-MK-005",
      name: "创意市集空间",
      type: "创意市集",
      location: "1号楼 1楼",
      capacity: 50,
      facilities: ["展示架", "照明系统", "音响设备", "收银区"],
      imageUrl: "https://images.unsplash.com/photo-1538681271054-d196150aa350?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      availability: "limited",
      price: "¥800/天",
      href: "/dashboard/designer/space-booking/space/sp-mk-005"
    },
    {
      id: "SP-E-006",
      name: "天台活动空间",
      type: "公共活动",
      location: "3号楼 顶层",
      capacity: 100,
      facilities: ["音响系统", "照明设备", "简易舞台", "简易座椅"],
      imageUrl: "https://images.unsplash.com/photo-1561912774-79769a0a0a7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
      availability: "available",
      price: "¥5,000/次",
      href: "/dashboard/designer/space-booking/space/sp-e-006"
    }
  ];
  
  // 预约数据
  const bookings: BookingCardProps[] = [
    {
      id: "BK-2023-056",
      spaceName: "创意会议室C",
      spaceType: "会议室",
      date: "2023-12-15",
      timeSlot: "14:00 - 16:00",
      status: "confirmed",
      attendees: 8,
      purpose: "项目进度讨论会议",
      imageUrl: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80",
      href: "/dashboard/designer/space-booking/booking/bk-2023-056"
    },
    {
      id: "BK-2023-045",
      spaceName: "创意共享工作室A",
      spaceType: "共享工作室",
      date: "2023-12-20",
      timeSlot: "全天",
      status: "pending",
      attendees: 2,
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      href: "/dashboard/designer/space-booking/booking/bk-2023-045"
    },
    {
      id: "BK-2023-032",
      spaceName: "多功能会议室D",
      spaceType: "会议室",
      date: "2023-12-05",
      timeSlot: "09:00 - 12:00",
      status: "completed",
      attendees: 15,
      purpose: "设计方案演示与客户沟通",
      imageUrl: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      href: "/dashboard/designer/space-booking/booking/bk-2023-032"
    },
    {
      id: "BK-2023-028",
      spaceName: "天台活动空间",
      spaceType: "公共活动",
      date: "2023-12-25",
      timeSlot: "18:00 - 21:00",
      status: "confirmed",
      attendees: 80,
      purpose: "年终设计师交流音乐会",
      imageUrl: "https://images.unsplash.com/photo-1561912774-79769a0a0a7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
      href: "/dashboard/designer/space-booking/booking/bk-2023-028"
    }
  ];
  
  // 统计数据
  const stats = [
    {
      label: "可用空间数",
      value: spaces.filter(space => space.availability === 'available').length.toString(),
      icon: <BuildingOffice2Icon className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      label: "已预约次数",
      value: bookings.length.toString(),
      icon: <CalendarIcon className="h-5 w-5 text-indigo-500" />,
      color: "bg-indigo-50"
    },
    {
      label: "已确认预约",
      value: bookings.filter(booking => booking.status === 'confirmed' || booking.status === 'completed').length.toString(),
      icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
      color: "bg-green-50"
    },
    {
      label: "待确认预约",
      value: bookings.filter(booking => booking.status === 'pending').length.toString(),
      icon: <ClockIcon className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-50"
    }
  ];
  
  // 根据筛选条件过滤空间
  const filteredSpaces = spaceTypeFilter === 'all'
    ? spaces
    : spaces.filter(space => {
        const typeMappings: { [key: string]: string } = {
          'workspace': '共享工作室',
          'office': '办公室',
          'meeting': '会议室',
          'market': '创意市集',
          'event': '公共活动'
        };
        return space.type === typeMappings[spaceTypeFilter];
      });
  
  // 根据筛选条件过滤预约
  const filteredBookings = bookingStatusFilter === 'all'
    ? bookings
    : bookings.filter(booking => booking.status === bookingStatusFilter);

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">空间预约 / 辅助设施</h1>
        <p className="mt-2 text-sm text-gray-600">
          预约共享工作室、会议室和活动空间，使用平台辅助设施
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

      {/* 标签页导航 */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'spaces'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('spaces')}
          >
            <div className="flex items-center">
              <BuildingOffice2Icon className="h-5 w-5 mr-2" />
              可用空间与设施
            </div>
          </button>
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bookings'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('bookings')}
          >
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              我的预约
            </div>
          </button>
        </nav>
      </div>

      {/* 空间列表内容 */}
      {activeTab === 'spaces' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">可预约空间</h2>
            <Link href="/dashboard/designer/space-booking/calendar">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center">
                <CalendarIcon className="h-5 w-5 mr-1" />
                查看预约日历
              </button>
            </Link>
          </div>
          
          {/* 空间筛选按钮 */}
          <div className="flex flex-wrap gap-2 mb-3">
            <FilterButton 
              label="全部空间" 
              count={spaces.length}
              active={spaceTypeFilter === 'all'} 
              onClick={() => setSpaceTypeFilter('all')} 
            />
            <FilterButton 
              label="共享工作室" 
              count={spaces.filter(s => s.type === '共享工作室').length}
              active={spaceTypeFilter === 'workspace'} 
              onClick={() => setSpaceTypeFilter('workspace')} 
            />
            <FilterButton 
              label="办公室" 
              count={spaces.filter(s => s.type === '办公室').length}
              active={spaceTypeFilter === 'office'} 
              onClick={() => setSpaceTypeFilter('office')} 
            />
            <FilterButton 
              label="会议室" 
              count={spaces.filter(s => s.type === '会议室').length}
              active={spaceTypeFilter === 'meeting'} 
              onClick={() => setSpaceTypeFilter('meeting')} 
            />
            <FilterButton 
              label="创意市集" 
              count={spaces.filter(s => s.type === '创意市集').length}
              active={spaceTypeFilter === 'market'} 
              onClick={() => setSpaceTypeFilter('market')} 
            />
            <FilterButton 
              label="公共活动" 
              count={spaces.filter(s => s.type === '公共活动').length}
              active={spaceTypeFilter === 'event'} 
              onClick={() => setSpaceTypeFilter('event')} 
            />
          </div>
          
          {/* 搜索和高级筛选 */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 mb-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="w-full md:w-auto relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="搜索空间名称、位置..."
                  className="pl-10 w-full md:w-80 h-10 bg-white border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="flex items-center">
                <button className="flex items-center text-sm text-gray-600 bg-white border border-gray-300 rounded-md px-3 py-2">
                  <AdjustmentsHorizontalIcon className="h-5 w-5 mr-1" />
                  高级筛选
                </button>
                <div className="ml-2 flex items-center text-sm text-gray-600 bg-white border border-gray-300 rounded-md px-3 py-2">
                  <span>排序:</span>
                  <span className="font-medium ml-1">推荐</span>
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>
          </div>
          
          {/* 空间卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpaces.length > 0 ? (
              filteredSpaces.map((space) => (
                <SpaceCard
                  key={space.id}
                  id={space.id}
                  name={space.name}
                  type={space.type}
                  location={space.location}
                  capacity={space.capacity}
                  facilities={space.facilities}
                  imageUrl={space.imageUrl}
                  availability={space.availability}
                  price={space.price}
                  href={space.href}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-gray-200">
                <BuildingOffice2Icon className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到匹配的空间</h3>
                <p className="text-gray-500 mb-4">尝试调整筛选条件或搜索不同的关键词</p>
                <button 
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setSpaceTypeFilter('all')}
                >
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  查看全部空间
                </button>
              </div>
            )}
          </div>
          
          {/* 功能简介区域 */}
          <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100 mt-8">
            <h3 className="text-lg font-semibold text-indigo-800 mb-4">可预约设施和空间类型</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mr-3">
                    <HomeModernIcon className="h-6 w-6" />
                  </div>
                  <h4 className="font-medium text-gray-800">共享工作室</h4>
                </div>
                <p className="text-sm text-gray-600">共享开放式工作环境，配备高速网络与办公设备，适合日常工作与小型团队协作。</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 mr-3">
                    <BuildingOffice2Icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-medium text-gray-800">独立办公室</h4>
                </div>
                <p className="text-sm text-gray-600">私密独立的办公空间，提供安全的24小时门禁和专属设施，适合需要长期固定工作区域的团队。</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-green-50 rounded-lg text-green-600 mr-3">
                    <UsersIcon className="h-6 w-6" />
                  </div>
                  <h4 className="font-medium text-gray-800">会议室</h4>
                </div>
                <p className="text-sm text-gray-600">专业会议空间，配备高清投影和视频会议系统，适合项目讨论、客户会议和团队协作。</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600 mr-3">
                    <ShoppingBagIcon className="h-6 w-6" />
                  </div>
                  <h4 className="font-medium text-gray-800">创意市集</h4>
                </div>
                <p className="text-sm text-gray-600">展示和销售设计作品的开放空间，提供专业展示设备和流量支持，帮助设计师推广作品。</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600 mr-3">
                    <MusicalNoteIcon className="h-6 w-6" />
                  </div>
                  <h4 className="font-medium text-gray-800">活动空间</h4>
                </div>
                <p className="text-sm text-gray-600">举办展览和社交活动的多功能场地，包括天台音乐会场地，适合设计社区交流与作品展示。</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-red-50 rounded-lg text-red-600 mr-3">
                    <QueueListIcon className="h-6 w-6" />
                  </div>
                  <h4 className="font-medium text-gray-800">辅助设施</h4>
                </div>
                <p className="text-sm text-gray-600">各类专业辅助设施，包括3D打印机、摄影棚、材料库等，提供按需使用的专业工具支持。</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 预约列表内容 */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">我的预约</h2>
            <Link href="/dashboard/designer/space-booking/new">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center">
                <PlusIcon className="h-5 w-5 mr-1" />
                新预约申请
              </button>
            </Link>
          </div>
          
          {/* 预约筛选按钮 */}
          <div className="flex flex-wrap gap-2 mb-5">
            <FilterButton 
              label="全部预约" 
              count={bookings.length}
              active={bookingStatusFilter === 'all'} 
              onClick={() => setBookingStatusFilter('all')} 
            />
            <FilterButton 
              label="待确认" 
              count={bookings.filter(b => b.status === 'pending').length}
              active={bookingStatusFilter === 'pending'} 
              onClick={() => setBookingStatusFilter('pending')} 
            />
            <FilterButton 
              label="已确认" 
              count={bookings.filter(b => b.status === 'confirmed').length}
              active={bookingStatusFilter === 'confirmed'} 
              onClick={() => setBookingStatusFilter('confirmed')} 
            />
            <FilterButton 
              label="已完成" 
              count={bookings.filter(b => b.status === 'completed').length}
              active={bookingStatusFilter === 'completed'} 
              onClick={() => setBookingStatusFilter('completed')} 
            />
            <FilterButton 
              label="已取消" 
              count={bookings.filter(b => b.status === 'cancelled').length}
              active={bookingStatusFilter === 'cancelled'} 
              onClick={() => setBookingStatusFilter('cancelled')} 
            />
          </div>
          
          {/* 搜索框 */}
          <div className="relative mb-5">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="搜索预约编号、空间名称..."
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
          
          {/* 预约卡片列表 */}
          <div className="grid grid-cols-1 gap-6">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  id={booking.id}
                  spaceName={booking.spaceName}
                  spaceType={booking.spaceType}
                  date={booking.date}
                  timeSlot={booking.timeSlot}
                  status={booking.status}
                  attendees={booking.attendees}
                  purpose={booking.purpose}
                  imageUrl={booking.imageUrl}
                  href={booking.href}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-gray-200">
                <CalendarIcon className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到预约记录</h3>
                <p className="text-gray-500 mb-4">您还没有任何符合条件的预约，可以预约空间或调整筛选条件</p>
                <Link href="/dashboard/designer/space-booking/new">
                  <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    创建新预约
                  </button>
                </Link>
              </div>
            )}
          </div>
          
          {/* 分页控件 */}
          {filteredBookings.length > 0 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                显示 {filteredBookings.length} 个预约中的 1-{Math.min(filteredBookings.length, 10)}
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
      )}
    </div>
  );
}

// 空间卡片组件
interface SpaceCardProps {
  id: string;
  name: string;
  type: string;
  location: string;
  capacity: number;
  facilities: string[];
  imageUrl: string;
  availability: 'available' | 'limited' | 'unavailable';
  price: string;
  href: string;
}

const SpaceCard: React.FC<SpaceCardProps> = ({
  id,
  name,
  type,
  location,
  capacity,
  facilities,
  imageUrl,
  availability,
  price,
  href
}) => {
  // 可用性标签配置
  const availabilityConfig = {
    available: {
      color: 'bg-green-100 text-green-800',
      text: '可预约'
    },
    limited: {
      color: 'bg-yellow-100 text-yellow-800',
      text: '余位有限'
    },
    unavailable: {
      color: 'bg-red-100 text-red-800',
      text: '已满'
    }
  };

  const availabilityData = availabilityConfig[availability];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 bg-gray-200 relative">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${availabilityData.color}`}>
            {availabilityData.text}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
          <h3 className="text-white font-semibold text-lg">{name}</h3>
          <p className="text-white text-sm opacity-90">{type}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start mb-3">
          <MapPinIcon className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5 mr-2" />
          <p className="text-sm text-gray-600">{location}</p>
        </div>
        
        <div className="flex items-center mb-3">
          <UsersIcon className="h-5 w-5 text-gray-500 mr-2" />
          <p className="text-sm text-gray-600">容纳人数: <span className="font-medium">{capacity}人</span></p>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-700 mb-2">设施:</p>
          <div className="flex flex-wrap gap-1">
            {facilities.map((facility, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                {facility}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="text-sm">
            <span className="text-gray-500">价格: </span>
            <span className="font-medium text-gray-900">{price}</span>
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

// 预约卡片组件
interface BookingCardProps {
  id: string;
  spaceName: string;
  spaceType: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  attendees: number;
  purpose?: string;
  imageUrl: string;
  href: string;
}

const BookingCard: React.FC<BookingCardProps> = ({
  id,
  spaceName,
  spaceType,
  date,
  timeSlot,
  status,
  attendees,
  purpose,
  imageUrl,
  href
}) => {
  // 状态配置
  const statusConfig = {
    pending: {
      color: 'bg-yellow-100 text-yellow-800',
      icon: <ClockIcon className="h-4 w-4 mr-1" />,
      text: '待确认'
    },
    confirmed: {
      color: 'bg-blue-100 text-blue-800',
      icon: <CheckCircleIcon className="h-4 w-4 mr-1" />,
      text: '已确认'
    },
    completed: {
      color: 'bg-green-100 text-green-800',
      icon: <CheckCircleIcon className="h-4 w-4 mr-1" />,
      text: '已完成'
    },
    cancelled: {
      color: 'bg-red-100 text-red-800',
      icon: <XCircleIcon className="h-4 w-4 mr-1" />,
      text: '已取消'
    }
  };

  const currentStatus = statusConfig[status];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex">
        <div className="w-1/3 bg-gray-200 relative">
          <img
            src={imageUrl}
            alt={spaceName}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2">
            <span className="bg-gray-800 bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              {spaceType}
            </span>
          </div>
        </div>
        <div className="w-2/3 p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{spaceName}</h3>
              <p className="text-sm text-gray-600">预约编号: {id}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${currentStatus.color}`}>
              {currentStatus.icon}
              {currentStatus.text}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <div>
              <p className="text-xs text-gray-500">日期</p>
              <p className="font-medium text-gray-800 flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                {date}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">时间段</p>
              <p className="font-medium text-gray-800 flex items-center">
                <ClockIcon className="h-4 w-4 mr-1 text-gray-500" />
                {timeSlot}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">人数</p>
              <p className="font-medium text-gray-800 flex items-center">
                <UsersIcon className="h-4 w-4 mr-1 text-gray-500" />
                {attendees}人
              </p>
            </div>
          </div>
          
          {purpose && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">用途</p>
              <p className="text-sm text-gray-600">{purpose}</p>
            </div>
          )}
          
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div className="flex space-x-2">
              <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition">
                <PencilSquareIcon className="h-4 w-4" />
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
    </div>
  );
}; 