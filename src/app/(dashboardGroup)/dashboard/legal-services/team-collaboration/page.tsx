"use client";

import { useState } from 'react';
import Link from 'next/link';

// 模拟协作案件数据
const collaborativeCasesData = [
  { 
    id: 'CL001', 
    title: '张三商标侵权案', 
    client: '张三设计工作室',
    status: '进行中',
    lastUpdated: '2024-07-05',
    members: [
      { id: 'M001', name: '李律师', role: '主办律师', avatar: '👨‍⚖️' },
      { id: 'M002', name: '王律师', role: '协办律师', avatar: '👨‍⚖️' },
      { id: 'M003', name: '小张', role: '律师助理', avatar: '👩‍💼' },
      { id: 'M004', name: '小王', role: '文书专员', avatar: '👨‍💼' }
    ]
  },
  { 
    id: 'CL002', 
    title: '李四与某公司设计合同纠纷', 
    client: '李四',
    status: '进行中',
    lastUpdated: '2024-07-12',
    members: [
      { id: 'M002', name: '王律师', role: '主办律师', avatar: '👨‍⚖️' },
      { id: 'M005', name: '李助理', role: '律师助理', avatar: '👨‍💼' }
    ]
  },
  { 
    id: 'CL005', 
    title: '王五肖像权侵权投诉', 
    client: '王五',
    status: '准备开庭',
    lastUpdated: '2024-07-15',
    members: [
      { id: 'M006', name: '张律师', role: '主办律师', avatar: '👨‍⚖️' },
      { id: 'M001', name: '李律师', role: '协办律师', avatar: '👨‍⚖️' },
      { id: 'M007', name: '小李', role: '律师助理', avatar: '👩‍💼' }
    ]
  },
  { 
    id: 'CL007', 
    title: '赵六与某科技公司logo设计合同纠纷', 
    client: '赵六',
    status: '调解中',
    lastUpdated: '2024-07-18',
    members: [
      { id: 'M002', name: '王律师', role: '主办律师', avatar: '👨‍⚖️' },
      { id: 'M008', name: '赵助理', role: '律师助理', avatar: '👨‍💼' }
    ]
  },
  { 
    id: 'CL010', 
    title: '吴十设计工作室商业秘密泄露案', 
    client: '吴十设计工作室',
    status: '证据收集',
    lastUpdated: '2024-07-22',
    members: [
      { id: 'M009', name: '赵律师', role: '主办律师', avatar: '👨‍⚖️' },
      { id: 'M010', name: '陈律师', role: '协办律师', avatar: '👨‍⚖️' },
      { id: 'M011', name: '小陈', role: '律师助理', avatar: '👨‍💼' },
      { id: 'M012', name: '小马', role: '文书专员', avatar: '👩‍💼' }
    ]
  }
];

// 模拟团队成员数据
const teamMembersData = [
  { id: 'M001', name: '李律师', role: '资深律师', department: '知识产权部', avatar: '👨‍⚖️', status: '在线' },
  { id: 'M002', name: '王律师', role: '合伙人', department: '商事部', avatar: '👨‍⚖️', status: '在线' },
  { id: 'M006', name: '张律师', role: '资深律师', department: '知识产权部', avatar: '👨‍⚖️', status: '忙碌' },
  { id: 'M009', name: '赵律师', role: '律师', department: '知识产权部', avatar: '👨‍⚖️', status: '离线' },
  { id: 'M010', name: '陈律师', role: '律师', department: '商事部', avatar: '👨‍⚖️', status: '离线' },
  { id: 'M003', name: '小张', role: '律师助理', department: '知识产权部', avatar: '👩‍💼', status: '在线' },
  { id: 'M005', name: '李助理', role: '律师助理', department: '商事部', avatar: '👨‍💼', status: '在线' },
  { id: 'M007', name: '小李', role: '律师助理', department: '知识产权部', avatar: '👩‍💼', status: '忙碌' },
  { id: 'M008', name: '赵助理', role: '律师助理', department: '商事部', avatar: '👨‍💼', status: '在线' },
  { id: 'M011', name: '小陈', role: '律师助理', department: '知识产权部', avatar: '👨‍💼', status: '在线' },
  { id: 'M004', name: '小王', role: '文书专员', department: '行政部', avatar: '👨‍💼', status: '离线' },
  { id: 'M012', name: '小马', role: '文书专员', department: '行政部', avatar: '👩‍💼', status: '在线' }
];

// 模拟最近讨论数据
const recentDiscussionsData = [
  {
    id: 'D001',
    caseId: 'CL001',
    title: '侵权证据收集进度讨论',
    lastUpdate: '2024-07-20 14:30',
    participants: ['李律师', '王律师', '小张'],
    unreadCount: 3
  },
  {
    id: 'D002',
    caseId: 'CL005',
    title: '庭前准备会议纪要',
    lastUpdate: '2024-07-19 16:45',
    participants: ['张律师', '李律师', '小李'],
    unreadCount: 0
  },
  {
    id: 'D003',
    caseId: 'CL010',
    title: '证据材料审核讨论',
    lastUpdate: '2024-07-22 10:15',
    participants: ['赵律师', '陈律师', '小陈', '小马'],
    unreadCount: 5
  },
  {
    id: 'D004',
    caseId: 'CL002',
    title: '合同条款解释意见',
    lastUpdate: '2024-07-17 09:20',
    participants: ['王律师', '李助理'],
    unreadCount: 0
  },
  {
    id: 'D005',
    caseId: 'CL007',
    title: '调解方案讨论',
    lastUpdate: '2024-07-21 11:30',
    participants: ['王律师', '赵助理'],
    unreadCount: 2
  }
];

// 模拟共享文档数据
const sharedDocumentsData = [
  {
    id: 'DOC001',
    caseId: 'CL001',
    title: '商标侵权证据清单',
    type: '清单',
    lastUpdate: '2024-07-18',
    updatedBy: '小张',
    size: '1.5MB'
  },
  {
    id: 'DOC002',
    caseId: 'CL001',
    title: '起诉状草稿v2',
    type: '法律文书',
    lastUpdate: '2024-07-10',
    updatedBy: '李律师',
    size: '2.3MB'
  },
  {
    id: 'DOC003',
    caseId: 'CL005',
    title: '肖像权案例研究报告',
    type: '研究报告',
    lastUpdate: '2024-07-14',
    updatedBy: '张律师',
    size: '4.8MB'
  },
  {
    id: 'DOC004',
    caseId: 'CL005',
    title: '庭审提纲',
    type: '法律文书',
    lastUpdate: '2024-07-21',
    updatedBy: '李律师',
    size: '1.1MB'
  },
  {
    id: 'DOC005',
    caseId: 'CL010',
    title: '商业秘密保护相关法规汇编',
    type: '法规汇编',
    lastUpdate: '2024-07-15',
    updatedBy: '赵律师',
    size: '5.2MB'
  },
  {
    id: 'DOC006',
    caseId: 'CL010',
    title: '证据清单与分析',
    type: '清单',
    lastUpdate: '2024-07-22',
    updatedBy: '小陈',
    size: '3.7MB'
  },
  {
    id: 'DOC007',
    caseId: 'CL002',
    title: '设计合同法律分析',
    type: '法律分析',
    lastUpdate: '2024-07-16',
    updatedBy: '王律师',
    size: '2.9MB'
  },
  {
    id: 'DOC008',
    caseId: 'CL007',
    title: '调解方案草案',
    type: '法律文书',
    lastUpdate: '2024-07-21',
    updatedBy: '王律师',
    size: '1.8MB'
  }
];

export default function TeamCollaborationPage() {
  const [activeTab, setActiveTab] = useState<'cases' | 'discussions' | 'documents' | 'team'>('cases');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  // 状态标签样式
  const getStatusStyle = (status: string) => {
    switch (status) {
      case '进行中':
        return 'bg-blue-100 text-blue-800';
      case '准备开庭':
        return 'bg-purple-100 text-purple-800';
      case '调解中':
        return 'bg-yellow-100 text-yellow-800';
      case '证据收集':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 用户状态样式
  const getUserStatusStyle = (status: string) => {
    switch (status) {
      case '在线':
        return 'bg-green-100 text-green-800';
      case '忙碌':
        return 'bg-yellow-100 text-yellow-800';
      case '离线':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 文档类型样式
  const getDocumentTypeStyle = (type: string) => {
    switch (type) {
      case '法律文书':
        return 'bg-blue-100 text-blue-800';
      case '研究报告':
        return 'bg-indigo-100 text-indigo-800';
      case '清单':
        return 'bg-green-100 text-green-800';
      case '法规汇编':
        return 'bg-purple-100 text-purple-800';
      case '法律分析':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 过滤协作案件
  const filteredCases = collaborativeCasesData.filter(caseItem => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        caseItem.title.toLowerCase().includes(searchLower) ||
        caseItem.client.toLowerCase().includes(searchLower) ||
        caseItem.id.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  // 过滤团队成员
  const filteredMembers = teamMembersData.filter(member => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        member.name.toLowerCase().includes(searchLower) ||
        member.role.toLowerCase().includes(searchLower) ||
        member.department.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  // 过滤讨论
  const filteredDiscussions = recentDiscussionsData.filter(discussion => {
    if (selectedCase && discussion.caseId !== selectedCase) {
      return false;
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        discussion.title.toLowerCase().includes(searchLower) ||
        discussion.participants.some(p => p.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });

  // 过滤文档
  const filteredDocuments = sharedDocumentsData.filter(document => {
    if (selectedCase && document.caseId !== selectedCase) {
      return false;
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        document.title.toLowerCase().includes(searchLower) ||
        document.type.toLowerCase().includes(searchLower) ||
        document.updatedBy.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">团队协作空间</h1>
            <p className="mt-1 text-gray-500">共享案件信息、文档与团队成员协作</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/dashboard/legal-services" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
              返回仪表盘
            </Link>
            <Link href="#" className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
              创建讨论
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* 标签导航 */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'cases'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('cases')}
            >
              协作案件
            </button>
            <button
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'discussions'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => {
                setActiveTab('discussions');
                setSelectedCase(null);
              }}
            >
              最近讨论
            </button>
            <button
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'documents'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => {
                setActiveTab('documents');
                setSelectedCase(null);
              }}
            >
              共享文档
            </button>
            <button
              className={`px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === 'team'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('team')}
            >
              团队成员
            </button>
          </nav>
        </div>

        {/* 搜索和筛选区域 */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={`搜索${
                  activeTab === 'cases' ? '案件' : 
                  activeTab === 'discussions' ? '讨论' : 
                  activeTab === 'documents' ? '文档' : '团队成员'
                }...`}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* 案件筛选器 (仅在讨论和文档标签显示) */}
            {(activeTab === 'discussions' || activeTab === 'documents') && (
              <div className="w-full md:w-64">
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedCase || ''}
                  onChange={(e) => setSelectedCase(e.target.value || null)}
                >
                  <option value="">所有案件</option>
                  {collaborativeCasesData.map((caseItem) => (
                    <option key={caseItem.id} value={caseItem.id}>
                      {caseItem.id} - {caseItem.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-4">
          {/* 协作案件列表 */}
          {activeTab === 'cases' && (
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        案件信息
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        状态
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        团队成员
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        最后更新
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCases.map((caseItem) => (
                      <tr key={caseItem.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{caseItem.title}</div>
                              <div className="text-sm text-gray-500">
                                <span className="mr-2">#{caseItem.id}</span>
                                <span>客户: {caseItem.client}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(caseItem.status)}`}>
                            {caseItem.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex -space-x-2 overflow-hidden">
                            {caseItem.members.slice(0, 3).map((member, index) => (
                              <div
                                key={index}
                                className="inline-block h-8 w-8 rounded-full text-white bg-gray-500 flex items-center justify-center text-xs ring-2 ring-white"
                                title={`${member.name} (${member.role})`}
                              >
                                {member.avatar}
                              </div>
                            ))}
                            {caseItem.members.length > 3 && (
                              <div className="inline-block h-8 w-8 rounded-full text-white bg-gray-400 flex items-center justify-center text-xs ring-2 ring-white">
                                +{caseItem.members.length - 3}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {caseItem.lastUpdated}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link 
                            href={`/dashboard/legal-services/case-management/${caseItem.id}`}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            查看案件
                          </Link>
                          <Link 
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveTab('discussions');
                              setSelectedCase(caseItem.id);
                            }}
                          >
                            讨论
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredCases.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    未找到匹配的协作案件
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 最近讨论列表 */}
          {activeTab === 'discussions' && (
            <div>
              {selectedCase && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">已筛选案件:</span>
                      <span className="ml-2 font-medium">
                        {collaborativeCasesData.find(c => c.id === selectedCase)?.title || selectedCase}
                      </span>
                    </div>
                    <button 
                      className="text-sm text-gray-500 hover:text-gray-700"
                      onClick={() => setSelectedCase(null)}
                    >
                      清除筛选
                    </button>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                {filteredDiscussions.map((discussion) => {
                  const relatedCase = collaborativeCasesData.find(c => c.id === discussion.caseId);
                  return (
                    <div key={discussion.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-200 hover:bg-indigo-50 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{discussion.title}</h3>
                          <div className="text-sm text-gray-500 mt-1">
                            相关案件: {relatedCase?.title || discussion.caseId}
                          </div>
                        </div>
                        {discussion.unreadCount > 0 && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                            {discussion.unreadCount} 条新消息
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 mr-2">参与者:</span>
                          <div className="flex items-center">
                            {discussion.participants.slice(0, 3).map((participant, index) => (
                              <span key={index} className="mr-1 text-sm text-gray-700">
                                {participant}{index < Math.min(discussion.participants.length, 3) - 1 ? ', ' : ''}
                              </span>
                            ))}
                            {discussion.participants.length > 3 && (
                              <span className="text-sm text-gray-500">+{discussion.participants.length - 3}人</span>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{discussion.lastUpdate}</span>
                      </div>
                      
                      <div className="mt-3 flex justify-end">
                        <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-800">
                          查看讨论
                        </Link>
                      </div>
                    </div>
                  );
                })}
                
                {filteredDiscussions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    未找到匹配的讨论
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 共享文档列表 */}
          {activeTab === 'documents' && (
            <div>
              {selectedCase && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">已筛选案件:</span>
                      <span className="ml-2 font-medium">
                        {collaborativeCasesData.find(c => c.id === selectedCase)?.title || selectedCase}
                      </span>
                    </div>
                    <button 
                      className="text-sm text-gray-500 hover:text-gray-700"
                      onClick={() => setSelectedCase(null)}
                    >
                      清除筛选
                    </button>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map((document) => {
                  const relatedCase = collaborativeCasesData.find(c => c.id === document.caseId);
                  return (
                    <div key={document.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-200 hover:shadow-md transition">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 line-clamp-1">{document.title}</h3>
                          <div className="text-xs text-gray-500 mt-1">
                            {relatedCase?.title || document.caseId}
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getDocumentTypeStyle(document.type)}`}>
                          {document.type}
                        </span>
                      </div>
                      
                      <div className="mt-3 flex justify-between items-center text-sm">
                        <div className="text-gray-500">
                          更新于 {document.lastUpdate}
                        </div>
                        <div className="text-gray-500">
                          {document.size}
                        </div>
                      </div>
                      
                      <div className="mt-1 text-xs text-gray-500">
                        更新者: {document.updatedBy}
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
                        <Link href="#" className="text-xs text-indigo-600 hover:text-indigo-800">
                          查看
                        </Link>
                        <Link href="#" className="text-xs text-indigo-600 hover:text-indigo-800">
                          下载
                        </Link>
                        <Link href="#" className="text-xs text-indigo-600 hover:text-indigo-800">
                          分享
                        </Link>
                      </div>
                    </div>
                  );
                })}
                
                {filteredDocuments.length === 0 && (
                  <div className="col-span-3 text-center py-8 text-gray-500">
                    未找到匹配的文档
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 团队成员列表 */}
          {activeTab === 'team' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMembers.map((member) => (
                <div 
                  key={member.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedMember === member.id 
                      ? 'border-indigo-300 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50'
                  }`}
                  onClick={() => setSelectedMember(member.id === selectedMember ? null : member.id)}
                >
                  <div className="flex items-center">
                    <div className="text-3xl mr-3">{member.avatar}</div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-900">{member.name}</h3>
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getUserStatusStyle(member.status)}`}>
                          {member.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{member.role} · {member.department}</p>
                    </div>
                  </div>
                  
                  {selectedMember === member.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between mb-2">
                        <div className="text-sm text-gray-500">相关案件</div>
                        <span className="text-xs text-gray-500">
                          共 {collaborativeCasesData.filter(c => 
                            c.members.some(m => m.id === member.id)
                          ).length} 个
                        </span>
                      </div>
                      <div className="space-y-2">
                        {collaborativeCasesData
                          .filter(c => c.members.some(m => m.id === member.id))
                          .slice(0, 3)
                          .map(c => (
                            <div key={c.id} className="text-sm">
                              <Link 
                                href={`/dashboard/legal-services/case-management/${c.id}`}
                                className="text-indigo-600 hover:text-indigo-800"
                              >
                                {c.title}
                              </Link>
                              <div className="text-xs text-gray-500">
                                角色: {c.members.find(m => m.id === member.id)?.role}
                              </div>
                            </div>
                          ))
                        }
                        {collaborativeCasesData.filter(c => 
                            c.members.some(m => m.id === member.id)
                          ).length > 3 && (
                          <div className="text-xs text-gray-500">
                            ...及其他案件
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 flex justify-between">
                        <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-800">
                          发起讨论
                        </Link>
                        <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-800">
                          查看资料
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {filteredMembers.length === 0 && (
                <div className="col-span-3 text-center py-8 text-gray-500">
                  未找到匹配的团队成员
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 