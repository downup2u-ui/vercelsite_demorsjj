"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  EyeIcon,
  PlusIcon,
  PhotoIcon,
  BriefcaseIcon,
  UserGroupIcon,
  ArrowPathIcon,
  BuildingStorefrontIcon,
  QrCodeIcon,
  CalendarIcon,
  MapPinIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  ShareIcon,
  MagnifyingGlassIcon,
  TagIcon,
  ChevronUpDownIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

// 展览卡片组件
interface ExhibitionCardProps {
  id: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'past';
  thumbnailUrl: string;
  curator?: string;
  participantsCount: number;
  works: number;
  href: string;
}

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({
  id,
  title,
  location,
  startDate,
  endDate,
  status,
  thumbnailUrl,
  curator,
  participantsCount,
  works,
  href
}) => {
  // 状态标签配置
  const statusConfig = {
    upcoming: {
      color: 'bg-blue-100 text-blue-800',
      label: '即将开始'
    },
    active: {
      color: 'bg-green-100 text-green-800',
      label: '展出中'
    },
    past: {
      color: 'bg-gray-100 text-gray-800',
      label: '已结束'
    }
  };

  const statusData = statusConfig[status];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 bg-gray-200 relative">
        <img 
          src={thumbnailUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-lg font-semibold line-clamp-2">{title}</h3>
          <p className="text-white text-sm opacity-90 flex items-center mt-1">
            <MapPinIcon className="h-4 w-4 mr-1" />
            {location}
          </p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 text-gray-500 mr-1" />
            <p className="text-sm text-gray-600">
              {startDate} - {endDate}
            </p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusData.color}`}>
            {statusData.label}
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
          <div className="text-center">
            <p className="text-xs text-gray-500">作品数量</p>
            <p className="font-medium text-gray-800">{works}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">参与者</p>
            <p className="font-medium text-gray-800">{participantsCount}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">编号</p>
            <p className="font-medium text-gray-800">{id}</p>
          </div>
        </div>
        
        {curator && (
          <p className="text-sm text-gray-600 mb-3">
            <span className="font-medium">策展人:</span> {curator}
          </p>
        )}
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <button className="text-gray-500 hover:text-indigo-600 p-1.5">
            <QrCodeIcon className="h-5 w-5" />
          </button>
          <Link href={href}>
            <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition">
              展览详情
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// 作品卡片组件
interface WorkCardProps {
  id: string;
  title: string;
  type: string;
  thumbnailUrl: string;
  likes: number;
  comments: number;
  tags: string[];
  createdDate: string;
  href: string;
}

const WorkCard: React.FC<WorkCardProps> = ({
  id,
  title,
  type,
  thumbnailUrl,
  likes,
  comments,
  tags,
  createdDate,
  href
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-40 bg-gray-200 relative">
        <img 
          src={thumbnailUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
          {type}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-gray-800 font-semibold line-clamp-1 mb-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-2">上传于 {createdDate}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag, index) => (
            <span key={index} className="bg-indigo-50 text-indigo-600 text-xs px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <span className="flex items-center text-gray-500 text-sm">
              <HeartIcon className="h-4 w-4 mr-1" />
              {likes}
            </span>
            <span className="flex items-center text-gray-500 text-sm">
              <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
              {comments}
            </span>
          </div>
          <Link href={href}>
            <button className="text-indigo-600 hover:text-indigo-800">
              <EyeIcon className="h-5 w-5" />
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

// 数据分析卡片组件
interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: {
    value: string;
    isUp: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, change }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
          {icon}
        </div>
      </div>
      {change && (
        <div className="flex items-center text-sm">
          {change.isUp ? (
            <span className="text-green-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              {change.value}
            </span>
          ) : (
            <span className="text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
              {change.value}
            </span>
          )}
          <span className="text-gray-500 ml-1">与上月相比</span>
        </div>
      )}
    </div>
  );
};

export default function ShowcasePage() {
  // 标签页状态
  const [activeTab, setActiveTab] = useState<'exhibitions' | 'works'>('exhibitions');
  
  // 展览筛选状态
  const [exhibitionFilter, setExhibitionFilter] = useState<'all' | 'upcoming' | 'active' | 'past'>('all');
  
  // 作品筛选状态
  const [workTypeFilter, setWorkTypeFilter] = useState<'all' | 'product' | 'furniture' | 'interior' | 'graphic'>('all');
  
  // 展览数据
  const exhibitions: ExhibitionCardProps[] = [
    {
      id: "EX-2023-025",
      title: "创新设计与可持续未来",
      location: "上海设计中心",
      startDate: "2023-12-15",
      endDate: "2024-01-15",
      status: "upcoming",
      thumbnailUrl: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      curator: "张明华",
      participantsCount: 12,
      works: 35,
      href: "/dashboard/designer/showcase/exhibition/ex-2023-025"
    },
    {
      id: "EX-2023-018",
      title: "现代家居设计展",
      location: "北京国际设计周",
      startDate: "2023-11-20",
      endDate: "2023-12-20",
      status: "active",
      thumbnailUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      participantsCount: 8,
      works: 24,
      href: "/dashboard/designer/showcase/exhibition/ex-2023-018"
    },
    {
      id: "EX-2023-015",
      title: "材料与形式：探索设计边界",
      location: "广州设计博物馆",
      startDate: "2023-10-10",
      endDate: "2023-11-10",
      status: "past",
      thumbnailUrl: "https://images.unsplash.com/photo-1605001915599-0358ba478e7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      curator: "李志远",
      participantsCount: 15,
      works: 42,
      href: "/dashboard/designer/showcase/exhibition/ex-2023-015"
    },
    {
      id: "EX-2023-010",
      title: "青年设计师新锐作品展",
      location: "深圳创意园",
      startDate: "2023-12-01",
      endDate: "2024-01-10",
      status: "active",
      thumbnailUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      participantsCount: 20,
      works: 38,
      href: "/dashboard/designer/showcase/exhibition/ex-2023-010"
    }
  ];
  
  // 作品数据
  const works: WorkCardProps[] = [
    {
      id: "WK-2023-085",
      title: "极简主义办公椅设计",
      type: "家具设计",
      thumbnailUrl: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      likes: 128,
      comments: 32,
      tags: ["家具", "办公", "极简"],
      createdDate: "2023-11-18",
      href: "/dashboard/designer/showcase/work/wk-2023-085"
    },
    {
      id: "WK-2023-082",
      title: "环保材质餐具系列",
      type: "产品设计",
      thumbnailUrl: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      likes: 95,
      comments: 18,
      tags: ["餐具", "环保", "可持续"],
      createdDate: "2023-11-10",
      href: "/dashboard/designer/showcase/work/wk-2023-082"
    },
    {
      id: "WK-2023-078",
      title: "现代公寓室内设计方案",
      type: "室内设计",
      thumbnailUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1558&q=80",
      likes: 215,
      comments: 45,
      tags: ["室内", "公寓", "现代"],
      createdDate: "2023-10-25",
      href: "/dashboard/designer/showcase/work/wk-2023-078"
    },
    {
      id: "WK-2023-075",
      title: "生态城市品牌视觉系统",
      type: "平面设计",
      thumbnailUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      likes: 80,
      comments: 21,
      tags: ["品牌", "视觉", "生态"],
      createdDate: "2023-10-15",
      href: "/dashboard/designer/showcase/work/wk-2023-075"
    },
    {
      id: "WK-2023-072",
      title: "智能照明系统原型",
      type: "产品设计",
      thumbnailUrl: "https://images.unsplash.com/photo-1507878866276-a947ef722fee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
      likes: 112,
      comments: 28,
      tags: ["智能", "照明", "互动"],
      createdDate: "2023-10-05",
      href: "/dashboard/designer/showcase/work/wk-2023-072"
    },
    {
      id: "WK-2023-068",
      title: "模块化书架系统",
      type: "家具设计",
      thumbnailUrl: "https://images.unsplash.com/photo-1588515605249-be8802aeaa79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      likes: 145,
      comments: 36,
      tags: ["家具", "模块化", "收纳"],
      createdDate: "2023-09-28",
      href: "/dashboard/designer/showcase/work/wk-2023-068"
    }
  ];
  
  // 数据统计
  const stats = [
    {
      title: "展览总数",
      value: "12",
      icon: <BuildingStorefrontIcon className="h-6 w-6" />,
      change: { value: "2", isUp: true }
    },
    {
      title: "作品总数",
      value: "78",
      icon: <BriefcaseIcon className="h-6 w-6" />,
      change: { value: "8", isUp: true }
    },
    {
      title: "累计浏览量",
      value: "12,580",
      icon: <EyeIcon className="h-6 w-6" />,
      change: { value: "12%", isUp: true }
    },
    {
      title: "累计互动量",
      value: "3,245",
      icon: <UserGroupIcon className="h-6 w-6" />,
      change: { value: "5%", isUp: true }
    }
  ];
  
  // 根据筛选条件过滤展览
  const filteredExhibitions = exhibitionFilter === 'all'
    ? exhibitions
    : exhibitions.filter(exhibition => exhibition.status === exhibitionFilter);
  
  // 根据筛选条件过滤作品
  const filteredWorks = workTypeFilter === 'all'
    ? works
    : works.filter(work => {
        const typeMappings: { [key: string]: string } = {
          'product': '产品设计',
          'furniture': '家具设计',
          'interior': '室内设计',
          'graphic': '平面设计'
        };
        return work.type === typeMappings[workTypeFilter];
      });

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">展示系统</h1>
        <p className="mt-2 text-sm text-gray-600">
          管理您的设计作品展示和参与的设计展览
        </p>
      </div>

      {/* 数据统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
          />
        ))}
      </div>

      {/* 标签页导航 */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'exhibitions'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('exhibitions')}
          >
            <div className="flex items-center">
              <BuildingStorefrontIcon className="h-5 w-5 mr-2" />
              展览管理
            </div>
          </button>
          <button
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'works'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('works')}
          >
            <div className="flex items-center">
              <PhotoIcon className="h-5 w-5 mr-2" />
              作品管理
            </div>
          </button>
        </nav>
      </div>

      {/* 展览内容 */}
      {activeTab === 'exhibitions' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">我的展览</h2>
            <Link href="/dashboard/designer/showcase/exhibition/new">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center">
                <PlusIcon className="h-5 w-5 mr-1" />
                创建新展览
              </button>
            </Link>
          </div>
          
          {/* 展览筛选按钮 */}
          <div className="flex flex-wrap gap-2 mb-3">
            <FilterButton 
              label="全部展览" 
              count={exhibitions.length}
              active={exhibitionFilter === 'all'} 
              onClick={() => setExhibitionFilter('all')} 
            />
            <FilterButton 
              label="即将开始" 
              count={exhibitions.filter(e => e.status === 'upcoming').length}
              active={exhibitionFilter === 'upcoming'} 
              onClick={() => setExhibitionFilter('upcoming')} 
            />
            <FilterButton 
              label="展出中" 
              count={exhibitions.filter(e => e.status === 'active').length}
              active={exhibitionFilter === 'active'} 
              onClick={() => setExhibitionFilter('active')} 
            />
            <FilterButton 
              label="已结束" 
              count={exhibitions.filter(e => e.status === 'past').length}
              active={exhibitionFilter === 'past'} 
              onClick={() => setExhibitionFilter('past')} 
            />
          </div>
          
          {/* 展览搜索 */}
          <div className="relative mb-5">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="搜索展览名称、地点或策展人..."
              className="pl-10 w-full h-10 bg-white border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          {/* 展览卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExhibitions.length > 0 ? (
              filteredExhibitions.map((exhibition) => (
                <ExhibitionCard
                  key={exhibition.id}
                  id={exhibition.id}
                  title={exhibition.title}
                  location={exhibition.location}
                  startDate={exhibition.startDate}
                  endDate={exhibition.endDate}
                  status={exhibition.status}
                  thumbnailUrl={exhibition.thumbnailUrl}
                  curator={exhibition.curator}
                  participantsCount={exhibition.participantsCount}
                  works={exhibition.works}
                  href={exhibition.href}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-gray-200">
                <BuildingStorefrontIcon className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到展览</h3>
                <p className="text-gray-500 mb-4">尝试调整筛选条件或搜索不同的关键词</p>
                <button 
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setExhibitionFilter('all')}
                >
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  查看全部展览
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 作品内容 */}
      {activeTab === 'works' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">我的作品</h2>
            <Link href="/dashboard/designer/showcase/work/new">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center">
                <PlusIcon className="h-5 w-5 mr-1" />
                上传新作品
              </button>
            </Link>
          </div>
          
          {/* 作品筛选和搜索栏 */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <TagIcon className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">类型:</span>
                <div className="flex flex-wrap gap-2">
                  <FilterButton 
                    label="全部" 
                    active={workTypeFilter === 'all'} 
                    onClick={() => setWorkTypeFilter('all')} 
                  />
                  <FilterButton 
                    label="产品设计" 
                    active={workTypeFilter === 'product'} 
                    onClick={() => setWorkTypeFilter('product')} 
                  />
                  <FilterButton 
                    label="家具设计" 
                    active={workTypeFilter === 'furniture'} 
                    onClick={() => setWorkTypeFilter('furniture')} 
                  />
                  <FilterButton 
                    label="室内设计" 
                    active={workTypeFilter === 'interior'} 
                    onClick={() => setWorkTypeFilter('interior')} 
                  />
                  <FilterButton 
                    label="平面设计" 
                    active={workTypeFilter === 'graphic'} 
                    onClick={() => setWorkTypeFilter('graphic')} 
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="relative w-full md:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="搜索作品..."
                    className="pl-10 w-full md:w-64 h-10 bg-white border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
                <span>高级筛选</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-sm text-gray-600">
                  <span>排序方式:</span>
                  <span className="font-medium ml-1">最新上传</span>
                  <ChevronUpDownIcon className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
          
          {/* 作品卡片网格 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWorks.length > 0 ? (
              filteredWorks.map((work) => (
                <WorkCard
                  key={work.id}
                  id={work.id}
                  title={work.title}
                  type={work.type}
                  thumbnailUrl={work.thumbnailUrl}
                  likes={work.likes}
                  comments={work.comments}
                  tags={work.tags}
                  createdDate={work.createdDate}
                  href={work.href}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-gray-200">
                <PhotoIcon className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到作品</h3>
                <p className="text-gray-500 mb-4">尝试调整筛选条件或搜索不同的关键词</p>
                <button 
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setWorkTypeFilter('all')}
                >
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  查看全部作品
                </button>
              </div>
            )}
          </div>
          
          {/* 加载更多按钮 */}
          {filteredWorks.length > 0 && (
            <div className="flex justify-center mt-4">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                加载更多作品
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 