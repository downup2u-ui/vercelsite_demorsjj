"use client";

import { useState, useEffect } from 'react';
import { Project, ProjectService } from '@/services/projectService';

interface ProjectSelectorProps {
  selectedProject: Project | null;
  onSelectProject: (project: Project | null) => void;
  error?: string;
}

export default function ProjectSelector({ 
  selectedProject, 
  onSelectProject,
  error 
}: ProjectSelectorProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 获取项目列表
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const projectList = await ProjectService.getProjects();
        // 只显示活跃的项目
        const activeProjects = projectList.filter(p => p.status === 'active');
        setProjects(activeProjects);
      } catch (err) {
        console.error('获取项目列表失败:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // 筛选项目
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 处理项目选择
  const handleSelectProject = (project: Project) => {
    onSelectProject(project);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  // 清除选择
  const handleClearSelection = () => {
    onSelectProject(null);
  };

  return (
    <div className="relative">
      <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
        选择项目 <span className="text-red-500">*</span>
      </label>
      
      {selectedProject ? (
        <div className="flex items-center justify-between border rounded-lg p-2 bg-blue-50">
          <div>
            <p className="font-medium">{selectedProject.name}</p>
            <p className="text-sm text-gray-600 truncate">{selectedProject.description.substring(0, 80)}...</p>
          </div>
          <button 
            type="button"
            className="p-1 text-gray-400 hover:text-gray-600"
            onClick={handleClearSelection}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <>
          <div className="relative">
            <input
              type="text"
              id="project"
              placeholder="搜索项目..."
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsDropdownOpen(true)}
              autoComplete="off"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isDropdownOpen ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
              </svg>
            </button>
          </div>
          
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
              {isLoading ? (
                <div className="p-4 text-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600">加载项目中...</p>
                </div>
              ) : filteredProjects.length > 0 ? (
                <ul>
                  {filteredProjects.map((project) => (
                    <li
                      key={project.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectProject(project)}
                    >
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-gray-600 truncate">{project.description.substring(0, 60)}...</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  {projects.length === 0 ? '没有可用的项目' : '没有匹配的项目'}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
} 