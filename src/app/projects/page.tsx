"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import ProjectList from './components/ProjectList';

export default function ProjectsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // 面包屑导航
  const breadcrumbItems = [
    { label: '首页', href: '/' },
    { label: '设计管理', href: '#' },
    { label: '项目管理', href: '/projects', active: true }
  ];

  // 处理搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // 处理状态筛选
  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  // 处理创建项目
  const handleCreateProject = () => {
    router.push('/projects/create');
  };

  // 清除所有筛选
  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
  };

  // 处理页面变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 在实际应用中可能需要滚动到页面顶部
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-3xl font-bold mt-4">项目管理</h1>
        <p className="text-gray-600 mt-2">管理您所有的设计项目，跟踪项目进度并协作</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索项目..."
                className="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={handleSearch}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setSearchQuery('')}
                >
                  ×
                </button>
              )}
            </div>
            <select 
              className="w-full md:w-48 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={handleStatusFilter}
            >
              <option value="">所有状态</option>
              <option value="active">进行中</option>
              <option value="completed">已完成</option>
              <option value="pending">待审核</option>
            </select>
            {(searchQuery || statusFilter) && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                清除筛选
              </button>
            )}
          </div>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={handleCreateProject}
          >
            创建项目
          </button>
        </div>

        {/* 项目列表 */}
        <div className="border rounded-lg overflow-hidden">
          <ProjectList 
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
} 