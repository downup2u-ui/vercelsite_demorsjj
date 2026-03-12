"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Project, ProjectService } from '@/services/projectService';

// 定义组件属性
interface ProjectListProps {
  initialProjects?: Project[];
  searchQuery?: string;
  statusFilter?: string;
  onPageChange?: (page: number) => void;
}

// 状态标签颜色映射
const statusColorMap = {
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
};

// 状态中文名称映射
const statusNameMap = {
  active: '进行中',
  completed: '已完成',
  pending: '待审核',
};

export default function ProjectList({ 
  initialProjects = [], 
  searchQuery = "", 
  statusFilter = "",
  onPageChange 
}: ProjectListProps) {
  // 项目状态
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'name' | 'startDate' | 'status'>('startDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5);

  // 处理数据获取
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await ProjectService.getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('加载项目数据失败，请稍后重试');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  // 处理搜索和筛选
  useEffect(() => {
    const fetchFilteredProjects = async () => {
      if (!searchQuery && !statusFilter) {
        setFilteredProjects(projects);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await ProjectService.searchProjects(searchQuery, statusFilter);
        setFilteredProjects(data);
      } catch (err) {
        console.error('Error searching projects:', err);
        setError('搜索项目失败，请稍后重试');
        // 回退到本地筛选
        let result = [...projects];
        
        // 应用搜索过滤
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          result = result.filter(project => 
            project.name.toLowerCase().includes(query) || 
            project.description.toLowerCase().includes(query)
          );
        }
        
        // 应用状态过滤
        if (statusFilter) {
          result = result.filter(project => project.status === statusFilter);
        }
        
        setFilteredProjects(result);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFilteredProjects();
  }, [projects, searchQuery, statusFilter]);

  // 处理排序
  const handleSort = (field: 'name' | 'startDate' | 'status') => {
    if (sortField === field) {
      // 如果点击的是当前排序字段，则切换排序方向
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // 否则，设置新的排序字段并默认为升序
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // 应用排序
  useEffect(() => {
    const sortedProjects = [...filteredProjects].sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === 'startDate') {
        return sortDirection === 'asc'
          ? new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          : new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      } else if (sortField === 'status') {
        return sortDirection === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
      return 0;
    });
    
    setFilteredProjects(sortedProjects);
    setCurrentPage(1); // 重置到第一页
  }, [sortField, sortDirection]);

  // 处理分页
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (onPageChange) {
      onPageChange(pageNumber);
    }
  };

  // 获取排序图标
  const getSortIcon = (field: 'name' | 'startDate' | 'status') => {
    if (sortField !== field) return null;
    
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  if (isLoading && projects.length === 0) {
    return (
      <div className="w-full py-12 flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && projects.length === 0) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          重试
        </button>
      </div>
    );
  }

  if (filteredProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">
          {searchQuery || statusFilter ? '没有符合条件的项目' : '暂无项目数据'}
        </p>
        <Link href="/projects/create">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            创建新项目
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      )}
      
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('name')}
            >
              项目名称 {getSortIcon('name')}
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('status')}
            >
              状态 {getSortIcon('status')}
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('startDate')}
            >
              开始日期 {getSortIcon('startDate')}
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              结束日期
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentProjects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{project.name}</div>
                <div className="text-sm text-gray-500">{project.description.substring(0, 60)}...</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    statusColorMap[project.status]
                  }`}
                >
                  {statusNameMap[project.status]}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(project.startDate).toLocaleDateString('zh-CN')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {project.endDate ? new Date(project.endDate).toLocaleDateString('zh-CN') : '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex space-x-2">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    查看
                  </Link>
                  <Link
                    href={`/projects/${project.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    编辑
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 分页控制 */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center gap-2">
            <button 
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
              className={`p-2 border rounded ${
                currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
            >
              上一页
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`p-2 border rounded ${
                  currentPage === number ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
                }`}
              >
                {number}
              </button>
            ))}
            
            <button
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              disabled={currentPage === totalPages}
              className={`p-2 border rounded ${
                currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
            >
              下一页
            </button>
          </nav>
        </div>
      )}
    </div>
  );
} 