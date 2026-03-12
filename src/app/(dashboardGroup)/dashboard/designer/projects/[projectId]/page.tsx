"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

// 模拟项目数据
const mockProjects = [
  {
    id: "PRJ001",
    title: "新能源科技企业VI设计",
    description: "为领先的新能源科技公司设计全新的视觉识别系统，包括标志、名片、宣传材料等应用设计。",
    status: "in_progress",
    deadline: "2024-08-15",
    client: "绿源科技有限公司",
    progress: 65,
    team: [
      { name: "张设计", avatar: null },
      { name: "李创意", avatar: null },
      { name: "王总监", avatar: null }
    ],
    tasks: [
      { id: 1, title: "竞品分析", status: "completed", assignee: "张设计", deadline: "2024-07-01" },
      { id: 2, title: "标志设计", status: "completed", assignee: "李创意", deadline: "2024-07-15" },
      { id: 3, title: "色彩系统", status: "in_progress", assignee: "张设计", deadline: "2024-07-25" },
      { id: 4, title: "名片设计", status: "in_progress", assignee: "李创意", deadline: "2024-08-01" },
      { id: 5, title: "宣传册样式", status: "pending", assignee: "未分配", deadline: "2024-08-10" }
    ],
    documents: [
      { name: "需求文档.pdf", uploadTime: "2024-06-15", size: "2.5MB" },
      { name: "竞品分析报告.docx", uploadTime: "2024-07-01", size: "1.8MB" },
      { name: "标志设计草图.ai", uploadTime: "2024-07-10", size: "5.2MB" },
      { name: "色彩方案初稿.pdf", uploadTime: "2024-07-20", size: "3.1MB" }
    ]
  },
  {
    id: "PRJ002",
    title: "手机应用界面设计",
    description: "设计一款健康生活方式追踪应用的用户界面，包括信息架构、交互设计和视觉设计。",
    status: "review",
    deadline: "2024-07-30",
    client: "健康科技初创公司",
    progress: 90,
    team: [
      { name: "刘UI", avatar: null },
      { name: "陈交互", avatar: null }
    ],
    tasks: [
      { id: 1, title: "用户研究", status: "completed", assignee: "刘UI", deadline: "2024-06-20" },
      { id: 2, title: "信息架构设计", status: "completed", assignee: "陈交互", deadline: "2024-06-30" },
      { id: 3, title: "交互原型设计", status: "completed", assignee: "陈交互", deadline: "2024-07-10" },
      { id: 4, title: "视觉设计", status: "completed", assignee: "刘UI", deadline: "2024-07-20" },
      { id: 5, title: "设计审核", status: "in_progress", assignee: "刘UI", deadline: "2024-07-25" }
    ],
    documents: [
      { name: "设计简报.pdf", uploadTime: "2024-06-10", size: "1.5MB" },
      { name: "用户研究报告.docx", uploadTime: "2024-06-20", size: "2.8MB" },
      { name: "线框图.sketch", uploadTime: "2024-07-01", size: "8.2MB" },
      { name: "UI设计稿.xd", uploadTime: "2024-07-20", size: "15.6MB" }
    ]
  },
  // 其他项目...
];

// 状态徽章组件
const StatusBadge = ({ status }: { status: string }) => {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-800';
  let statusText = status;

  switch (status) {
    case 'in_progress':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      statusText = '进行中';
      break;
    case 'review':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      statusText = '审核中';
      break;
    case 'completed':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      statusText = '已完成';
      break;
    case 'pending':
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      statusText = '待开始';
      break;
    case 'paused':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      statusText = '已暂停';
      break;
  }

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
      {statusText}
    </span>
  );
};

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  
  // 查找当前项目
  const project = mockProjects.find(p => p.id === projectId);
  
  // 活动标签
  const [activeTab, setActiveTab] = useState('overview');
  
  // 如果项目不存在
  if (!project) {
    return (
      <div className="bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-red-600 mb-4">项目未找到</h1>
        <p className="text-gray-600 mb-4">无法找到ID为 "{projectId}" 的项目。</p>
        <Link 
          href="/dashboard/designer/projects"
          className="text-indigo-600 hover:text-indigo-800"
        >
          返回项目列表
        </Link>
      </div>
    );
  }
  
  return (
    <>
      {/* 头部信息 */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Link 
              href="/dashboard/designer/projects" 
              className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              返回项目列表
            </Link>
            <h2 className="text-2xl font-semibold text-gray-800">{project.title}</h2>
            <StatusBadge status={project.status} />
          </div>
          <p className="text-gray-500 mt-1">{project.description}</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium">
            编辑项目
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            + 添加任务
          </button>
        </div>
      </div>
      
      {/* 项目详情卡片 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">客户</h3>
            <p className="text-base text-gray-900">{project.client}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">截止日期</h3>
            <p className="text-base text-gray-900">{project.deadline}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">项目进度</h3>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2 mr-2 flex-grow">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">项目团队</h3>
          <div className="flex items-center flex-wrap">
            {project.team.map((member, index) => (
              <div key={index} className="flex items-center mr-4 mb-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium text-sm mr-2">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full" />
                  ) : (
                    member.name.charAt(0)
                  )}
                </div>
                <span className="text-sm text-gray-700">{member.name}</span>
              </div>
            ))}
            <button className="text-sm text-indigo-600 hover:text-indigo-800 ml-2">
              + 添加成员
            </button>
          </div>
        </div>
      </div>
      
      {/* 标签导航 */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            项目概览
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tasks'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            任务 ({project.tasks.length})
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'documents'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            文档 ({project.documents.length})
          </button>
          <button
            onClick={() => setActiveTab('discussions')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'discussions'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            讨论
          </button>
        </nav>
      </div>
      
      {/* 标签内容 */}
      {activeTab === 'overview' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">项目概览</h3>
          <p className="text-gray-600 mb-4">{project.description}</p>
          
          <h4 className="text-md font-medium text-gray-800 mb-2 mt-6">近期任务</h4>
          <div className="overflow-hidden shadow-sm border border-gray-200 rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">任务名称</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">负责人</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">截止日期</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {project.tasks.slice(0, 3).map(task => (
                  <tr key={task.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{task.assignee}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{task.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {project.tasks.length > 3 && (
            <div className="mt-3 text-right">
              <button 
                onClick={() => setActiveTab('tasks')}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                查看全部任务 →
              </button>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'tasks' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">项目任务</h3>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-sm font-medium">
              + 添加任务
            </button>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">任务ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">任务名称</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">负责人</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">截止日期</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">操作</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {project.tasks.map(task => (
                  <tr key={task.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`T-${task.id}`}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.assignee}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.deadline}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">编辑</button>
                      <button className="text-gray-600 hover:text-gray-900">详情</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'documents' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">项目文档</h3>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-sm font-medium">
              + 上传文档
            </button>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">文件名</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">上传时间</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">大小</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">操作</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {project.documents.map((doc, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{doc.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploadTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">下载</button>
                      <button className="text-gray-600 hover:text-gray-900">删除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'discussions' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center py-10">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">暂无讨论</h3>
          <p className="mt-1 text-sm text-gray-500">
            与团队成员和客户在此讨论项目相关事务
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              发起讨论
            </button>
          </div>
        </div>
      )}
    </>
  );
} 