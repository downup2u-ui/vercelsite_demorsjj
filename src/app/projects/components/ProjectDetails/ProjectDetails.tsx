"use client";

import { useState } from 'react';
import { Project } from '@/services/projectService';
import Link from 'next/link';
import ProjectActivities from './ProjectActivities';
import ProjectComments from './ProjectComments';

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

interface ProjectDetailsProps {
  project: Project;
  onDelete?: () => void;
}

export default function ProjectDetails({ project, onDelete }: ProjectDetailsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'files' | 'activities' | 'comments'>('overview');
  
  // 处理删除项目按钮点击
  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete();
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* 项目头部信息 */}
      <div className="p-6 border-b">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="text-gray-600 mt-1">{project.description.substring(0, 100)}...</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/projects/${project.id}/edit`}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              编辑项目
            </Link>
            <button 
              className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50"
              onClick={handleDeleteClick}
            >
              删除项目
            </button>
          </div>
        </div>
      </div>
      
      {/* 基本信息卡片 */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-b">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-gray-500">状态</div>
          <div className="mt-1 flex items-center">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                statusColorMap[project.status]
              }`}
            >
              {statusNameMap[project.status]}
            </span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-gray-500">开始日期</div>
          <div className="mt-1">
            {new Date(project.startDate).toLocaleDateString('zh-CN')}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm font-medium text-gray-500">结束日期</div>
          <div className="mt-1">
            {project.endDate ? new Date(project.endDate).toLocaleDateString('zh-CN') : '暂未设置'}
          </div>
        </div>
      </div>
      
      {/* 标签页导航 */}
      <div className="border-b">
        <nav className="flex overflow-x-auto">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'overview'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            项目概览
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'activities'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('activities')}
          >
            活动记录
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'comments'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('comments')}
          >
            讨论区
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'team'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('team')}
          >
            项目团队
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'files'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('files')}
          >
            项目文件
          </button>
        </nav>
      </div>
      
      {/* 标签页内容 */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">项目描述</h2>
            <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">项目进度</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ 
                    width: project.status === 'completed' 
                      ? '100%' 
                      : project.status === 'active' 
                      ? '50%' 
                      : '10%' 
                  }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-500">开始</span>
                <span className="text-sm text-gray-500">
                  {project.status === 'completed' 
                    ? '已完成' 
                    : project.status === 'active' 
                    ? '进行中' 
                    : '审核中'}
                </span>
                <span className="text-sm text-gray-500">完成</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">重要节点</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-4 w-4 rounded-full bg-green-500 mt-0.5"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">项目创建</p>
                    <p className="text-xs text-gray-500">{new Date(project.startDate).toLocaleDateString('zh-CN')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className={`h-4 w-4 rounded-full ${project.status === 'pending' ? 'bg-gray-300' : 'bg-yellow-500'} mt-0.5`}></div>
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${project.status === 'pending' ? 'text-gray-400' : ''}`}>项目进行中</p>
                    <p className="text-xs text-gray-500">{project.status === 'pending' ? '未开始' : '进行中'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className={`h-4 w-4 rounded-full ${project.status !== 'completed' ? 'bg-gray-300' : 'bg-blue-500'} mt-0.5`}></div>
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${project.status !== 'completed' ? 'text-gray-400' : ''}`}>项目完成</p>
                    <p className="text-xs text-gray-500">
                      {project.status === 'completed' && project.endDate 
                        ? new Date(project.endDate).toLocaleDateString('zh-CN')
                        : '未完成'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'activities' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">活动记录</h2>
            </div>
            <ProjectActivities projectId={project.id} />
          </div>
        )}
        
        {activeTab === 'comments' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">项目讨论</h2>
            </div>
            <ProjectComments projectId={project.id} />
          </div>
        )}
        
        {activeTab === 'team' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">项目团队</h2>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                添加成员
              </button>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="mt-2 text-gray-600">暂无团队成员</p>
              <p className="mt-1 text-sm text-gray-500">添加成员来协作处理此项目</p>
            </div>
          </div>
        )}
        
        {activeTab === 'files' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">项目文件</h2>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                上传文件
              </button>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-2 text-gray-600">暂无项目文件</p>
              <p className="mt-1 text-sm text-gray-500">上传文件来管理项目资源</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 