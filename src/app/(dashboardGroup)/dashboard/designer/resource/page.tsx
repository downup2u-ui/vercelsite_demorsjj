"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpenIcon,
  DocumentTextIcon,
  BookmarkIcon,
  StarIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  FunnelIcon,
  PlusIcon,
  DocumentArrowDownIcon,
  CalculatorIcon,
  PresentationChartBarIcon,
  ChartBarIcon,
  PhotoIcon,
  VideoCameraIcon,
  SwatchIcon,
  RectangleGroupIcon,
  CurrencyYenIcon,
  FolderIcon,
  ArchiveBoxIcon,
  ClockIcon,
  CalendarIcon,
  UserCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// 资源卡片组件
interface ResourceCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'document' | 'image' | 'video' | 'website' | 'material' | 'tool';
  thumbnailUrl?: string;
  dateAdded: string;
  author: string;
  bookmarked?: boolean;
  tags: string[];
  downloadUrl?: string;
  externalUrl?: string;
  href: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  id,
  title,
  description,
  category,
  type,
  thumbnailUrl,
  dateAdded,
  author,
  bookmarked = false,
  tags,
  downloadUrl,
  externalUrl,
  href
}) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  // 资源类型配置
  const typeConfig: Record<string, { icon: JSX.Element; label: string; color: string }> = {
    document: {
      icon: <DocumentTextIcon className="h-5 w-5" />,
      label: '文档',
      color: 'text-blue-600 bg-blue-100'
    },
    image: {
      icon: <PhotoIcon className="h-5 w-5" />,
      label: '图片',
      color: 'text-purple-600 bg-purple-100'
    },
    video: {
      icon: <VideoCameraIcon className="h-5 w-5" />,
      label: '视频',
      color: 'text-red-600 bg-red-100'
    },
    website: {
      icon: <RectangleGroupIcon className="h-5 w-5" />,
      label: '网站',
      color: 'text-teal-600 bg-teal-100'
    },
    material: {
      icon: <SwatchIcon className="h-5 w-5" />,
      label: '材料',
      color: 'text-amber-600 bg-amber-100'
    },
    tool: {
      icon: <ArchiveBoxIcon className="h-5 w-5" />,
      label: '工具',
      color: 'text-gray-600 bg-gray-100'
    }
  };

  const resourceType = typeConfig[type];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col h-full">
        {thumbnailUrl && (
          <div className="h-40 bg-gray-200 relative">
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50"
              >
                <BookmarkIcon
                  className={`h-5 w-5 ${isBookmarked ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`}
                />
              </button>
            </div>
            <div className="absolute bottom-2 left-2">
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${resourceType.color} flex items-center`}>
                {resourceType.icon}
                <span className="ml-1">{resourceType.label}</span>
              </span>
            </div>
          </div>
        )}
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start">
            {!thumbnailUrl && (
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${resourceType.color} flex items-center mb-2`}>
                {resourceType.icon}
                <span className="ml-1">{resourceType.label}</span>
              </span>
            )}
            {!thumbnailUrl && (
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="p-1.5 hover:bg-gray-100 rounded-full"
              >
                <BookmarkIcon
                  className={`h-5 w-5 ${isBookmarked ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`}
                />
              </button>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-3 flex-grow">{description}</p>
          
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mb-3">
            <p>分类: {category}</p>
            <p>添加时间: {dateAdded}</p>
            <p>贡献者: {author}</p>
          </div>
          
          <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
            <div className="flex space-x-2">
              {downloadUrl && (
                <a href={downloadUrl} download className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition" title="下载">
                  <DocumentArrowDownIcon className="h-5 w-5" />
                </a>
              )}
              {externalUrl && (
                <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition" title="外部链接">
                  <RectangleGroupIcon className="h-5 w-5" />
                </a>
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
    </div>
  );
};

// 功能卡片组件
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, href }) => {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg w-fit mb-3">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
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

export default function ResourcePage() {
  // 类型筛选
  const [typeFilter, setTypeFilter] = useState<'all' | 'document' | 'image' | 'video' | 'website' | 'material' | 'tool'>('all');
  
  // 类别筛选
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'design' | 'technical' | 'market' | 'business'>('all');
  
  // 资源数据
  const resources: ResourceCardProps[] = [
    {
      id: "RES-2023-001",
      title: "2024年家具设计趋势报告",
      description: "详细分析了2024年全球家具设计的主要趋势和消费者偏好变化",
      category: "设计参考",
      type: "document",
      thumbnailUrl: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      dateAdded: "2023-12-01",
      author: "设计研究团队",
      bookmarked: true,
      tags: ["趋势", "家具", "2024", "市场研究"],
      downloadUrl: "/resources/documents/furniture-trends-2024.pdf",
      href: "/dashboard/designer/resource/res-2023-001"
    },
    {
      id: "RES-2023-010",
      title: "竹材制造工艺指南",
      description: "全面介绍竹材加工技术、特性和可持续应用方案",
      category: "技术指南",
      type: "document",
      thumbnailUrl: "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      dateAdded: "2023-11-15",
      author: "材料研究中心",
      tags: ["竹材", "可持续", "工艺", "制造"],
      downloadUrl: "/resources/documents/bamboo-crafting-guide.pdf",
      href: "/dashboard/designer/resource/res-2023-010"
    },
    {
      id: "RES-2023-015",
      title: "环保材料样本库",
      description: "超过50种环保材料的详细规格、用途和供应商信息",
      category: "材料参考",
      type: "material",
      thumbnailUrl: "https://images.unsplash.com/photo-1595515106865-dd574df6abfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      dateAdded: "2023-11-20",
      author: "可持续设计实验室",
      tags: ["环保", "材料", "样本", "可持续"],
      href: "/dashboard/designer/resource/res-2023-015"
    },
    {
      id: "RES-2023-022",
      title: "照明设计案例集",
      description: "精选的创新照明设计案例，包含设计理念和技术实现",
      category: "设计参考",
      type: "image",
      thumbnailUrl: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      dateAdded: "2023-12-05",
      author: "照明设计协会",
      tags: ["照明", "案例", "创新", "灵感"],
      href: "/dashboard/designer/resource/res-2023-022"
    },
    {
      id: "RES-2023-030",
      title: "家具制造成本分析工具",
      description: "帮助设计师快速估算不同材料和工艺的制造成本",
      category: "商业工具",
      type: "tool",
      dateAdded: "2023-11-10",
      author: "成本管理部门",
      tags: ["成本", "计算", "估算", "制造"],
      externalUrl: "/dashboard/designer/resource/cost-calculator",
      href: "/dashboard/designer/resource/res-2023-030"
    },
    {
      id: "RES-2023-035",
      title: "可持续设计视频教程",
      description: "系列视频教程，介绍可持续设计原则和实践方法",
      category: "教育资源",
      type: "video",
      thumbnailUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
      dateAdded: "2023-12-10",
      author: "教育培训中心",
      tags: ["教程", "视频", "可持续", "设计"],
      href: "/dashboard/designer/resource/res-2023-035"
    }
  ];
  
  // 功能卡片数据
  const features = [
    {
      title: "成本计算器",
      description: "估算材料和制造成本，帮助您准确预算项目费用",
      icon: <CalculatorIcon className="h-6 w-6" />,
      href: "/dashboard/designer/resource/cost-calculator"
    },
    {
      title: "材料目录",
      description: "浏览全面的材料库，查看规格、特性和供应商信息",
      icon: <SwatchIcon className="h-6 w-6" />,
      href: "/dashboard/designer/resource/materials"
    },
    {
      title: "市场分析",
      description: "访问最新的市场研究和趋势分析报告",
      icon: <PresentationChartBarIcon className="h-6 w-6" />,
      href: "/dashboard/designer/resource/market-analysis"
    },
    {
      title: "设计模板",
      description: "使用专业模板快速启动您的设计项目",
      icon: <RectangleGroupIcon className="h-6 w-6" />,
      href: "/dashboard/designer/resource/templates"
    }
  ];
  
  // 近期活动数据
  const recentActivities = [
    {
      date: "2023-12-15",
      action: "添加了新资源",
      title: "2024年家具设计趋势报告",
      user: "设计研究团队"
    },
    {
      date: "2023-12-10",
      action: "更新了文档",
      title: "材料供应商目录",
      user: "材料管理部门"
    },
    {
      date: "2023-12-08",
      action: "分享了资源",
      title: "可持续设计视频教程",
      user: "教育培训中心"
    }
  ];
  
  // 根据筛选条件过滤资源
  const filteredResources = resources.filter(resource => {
    if (typeFilter !== 'all' && resource.type !== typeFilter) return false;
    
    if (categoryFilter !== 'all') {
      const categoryMap: Record<string, string> = {
        'design': '设计参考',
        'technical': '技术指南',
        'market': '市场研究',
        'business': '商业工具'
      };
      if (resource.category !== categoryMap[categoryFilter]) return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">设计资源库</h1>
        <p className="mt-2 text-sm text-gray-600">
          访问设计参考资料、技术指南和实用工具，提升您的设计效率
        </p>
      </div>

      {/* 功能卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            href={feature.href}
          />
        ))}
      </div>

      {/* 资源管理区域 */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <h2 className="text-lg font-semibold text-gray-800">参考资料</h2>
          <div className="flex gap-2">
            <Link href="/dashboard/designer/resource/bookmarks">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition flex items-center">
                <BookmarkIcon className="h-5 w-5 mr-1 text-yellow-500" />
                我的收藏
              </button>
            </Link>
            <Link href="/dashboard/designer/resource/upload">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center">
                <PlusIcon className="h-5 w-5 mr-1" />
                上传资源
              </button>
            </Link>
          </div>
        </div>
        
        {/* 类型筛选按钮 */}
        <div className="flex items-center space-x-2 mb-4">
          <FunnelIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">类型:</span>
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              label="全部" 
              count={resources.length}
              active={typeFilter === 'all'} 
              onClick={() => setTypeFilter('all')} 
            />
            <FilterButton 
              label="文档" 
              count={resources.filter(r => r.type === 'document').length}
              active={typeFilter === 'document'} 
              onClick={() => setTypeFilter('document')} 
            />
            <FilterButton 
              label="图片" 
              count={resources.filter(r => r.type === 'image').length}
              active={typeFilter === 'image'} 
              onClick={() => setTypeFilter('image')} 
            />
            <FilterButton 
              label="视频" 
              count={resources.filter(r => r.type === 'video').length}
              active={typeFilter === 'video'} 
              onClick={() => setTypeFilter('video')} 
            />
            <FilterButton 
              label="网站" 
              count={resources.filter(r => r.type === 'website').length}
              active={typeFilter === 'website'} 
              onClick={() => setTypeFilter('website')} 
            />
            <FilterButton 
              label="材料" 
              count={resources.filter(r => r.type === 'material').length}
              active={typeFilter === 'material'} 
              onClick={() => setTypeFilter('material')} 
            />
            <FilterButton 
              label="工具" 
              count={resources.filter(r => r.type === 'tool').length}
              active={typeFilter === 'tool'} 
              onClick={() => setTypeFilter('tool')} 
            />
          </div>
        </div>
        
        {/* 类别筛选按钮 */}
        <div className="flex items-center space-x-2 mb-4">
          <FolderIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">类别:</span>
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              label="全部" 
              active={categoryFilter === 'all'} 
              onClick={() => setCategoryFilter('all')} 
            />
            <FilterButton 
              label="设计参考" 
              count={resources.filter(r => r.category === '设计参考').length}
              active={categoryFilter === 'design'} 
              onClick={() => setCategoryFilter('design')} 
            />
            <FilterButton 
              label="技术指南" 
              count={resources.filter(r => r.category === '技术指南').length}
              active={categoryFilter === 'technical'} 
              onClick={() => setCategoryFilter('technical')} 
            />
            <FilterButton 
              label="市场研究" 
              count={resources.filter(r => r.category === '市场研究').length}
              active={categoryFilter === 'market'} 
              onClick={() => setCategoryFilter('market')} 
            />
            <FilterButton 
              label="商业工具" 
              count={resources.filter(r => r.category === '商业工具').length}
              active={categoryFilter === 'business'} 
              onClick={() => setCategoryFilter('business')} 
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
            placeholder="搜索资源标题、描述或标签..."
            className="pl-10 w-full h-10 bg-white border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        {/* 排序下拉框 */}
        <div className="flex justify-end mb-4">
          <div className="relative inline-block text-left">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              排序: 最近添加
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
        
        {/* 资源卡片列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                id={resource.id}
                title={resource.title}
                description={resource.description}
                category={resource.category}
                type={resource.type}
                thumbnailUrl={resource.thumbnailUrl}
                dateAdded={resource.dateAdded}
                author={resource.author}
                bookmarked={resource.bookmarked}
                tags={resource.tags}
                downloadUrl={resource.downloadUrl}
                externalUrl={resource.externalUrl}
                href={resource.href}
              />
            ))
          ) : (
            <div className="col-span-3 flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-lg border border-gray-200">
              <BookOpenIcon className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到资源</h3>
              <p className="text-gray-500 mb-4">尝试调整筛选条件或上传新资源</p>
              <div className="flex space-x-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setTypeFilter('all');
                    setCategoryFilter('all');
                  }}
                >
                  重置筛选条件
                </button>
                <Link href="/dashboard/designer/resource/upload">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                    上传资源
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
        
        {/* 分页控件 */}
        {filteredResources.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              显示 {filteredResources.length} 个资源中的 1-{Math.min(filteredResources.length, 12)}
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

      {/* 成本计算器预览 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <CalculatorIcon className="h-6 w-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">成本计算器</h3>
          </div>
          <Link href="/dashboard/designer/resource/cost-calculator">
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
              打开完整计算器 →
            </button>
          </Link>
        </div>
        
        <div className="bg-gray-50 rounded-lg border border-gray-100 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                项目类型
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>家具设计</option>
                <option>空间设计</option>
                <option>产品设计</option>
                <option>照明设计</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                主要材料
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>木材</option>
                <option>金属</option>
                <option>塑料</option>
                <option>混合材料</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                设计复杂度
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>简单</option>
                <option>中等</option>
                <option>复杂</option>
                <option>非常复杂</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center">
              <CalculatorIcon className="h-5 w-5 mr-1" />
              快速估算
            </button>
          </div>
        </div>
      </div>

      {/* 近期活动 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <ClockIcon className="h-6 w-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">近期活动</h3>
          </div>
          <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 flex items-center">
            刷新
            <ArrowPathIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-full mr-3">
                <CalendarIcon className="h-5 w-5" />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-800">{activity.action}: <span className="text-indigo-600">{activity.title}</span></p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-500">{activity.date}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <div className="flex items-center text-xs text-gray-500">
                    <UserCircleIcon className="h-3 w-3 mr-1" />
                    {activity.user}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 