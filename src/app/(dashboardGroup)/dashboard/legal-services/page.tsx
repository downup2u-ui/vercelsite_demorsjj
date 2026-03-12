"use client";

import Link from 'next/link';
import { CalendarIcon, BriefcaseIcon, UserGroupIcon, ScaleIcon, 
  DocumentTextIcon, DocumentDuplicateIcon, CurrencyDollarIcon, 
  BookOpenIcon, ClockIcon } from '@heroicons/react/24/outline';

/**
 * Represents a feature card on the dashboard.
 */
interface FeatureCardProps {
  title: string;
  icon: string; 
  href: string;
  description?: string;
}

const FeatureCard: React.FC<FeatureCardProps & { isHighlighted?: boolean }> = ({ title, icon, href, description, isHighlighted }) => {
  return (
    <Link
      href={href}
      className={`block bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border group ${
        isHighlighted ? 'border-orange-500 border-2' : 'border-gray-200'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">{icon}</div>
        <h4 className="text-lg font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">{title}</h4>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
    </Link>
  );
};

/**
 * Represents a metric card for displaying key data points.
 */
interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: string; 
  bgColor?: string;
  textColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon, bgColor = 'bg-indigo-500', textColor = 'text-white' }) => {
  return (
    <div className={`p-5 rounded-lg shadow-md ${bgColor} ${textColor}`}>
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <div className="text-4xl font-bold">{value}</div>
      <div className="text-sm opacity-90 mt-1">{label}</div>
    </div>
  );
};

// 模拟统计数据
const statsData = {
  pendingCases: 12,
  activeCases: 8,
  completedCases: 24,
  totalClients: 38,
  activeClients: 22,
  consultationRequests: 6,
  documentsCreated: 96,
  pendingDocuments: 4,
  totalBilling: '¥128,650',
  pendingPayments: '¥35,200',
  todayMeetings: 3,
  tomorrowMeetings: 2
};

// 模拟最近案件数据
const recentCases = [
  {
    id: 'CASE001',
    title: '张三设计工作室商标侵权案',
    client: '张三设计工作室',
    type: '知识产权纠纷',
    status: '进行中',
    priority: '高',
    lastUpdate: '2024-07-18',
    assignedTo: '李律师'
  },
  {
    id: 'CASE002',
    title: '李四设计服务合同争议',
    client: '李四',
    type: '合同纠纷',
    status: '进行中',
    priority: '中',
    lastUpdate: '2024-07-16',
    assignedTo: '王律师'
  },
  {
    id: 'CASE003',
    title: '钱七知识产权授权协议',
    client: '钱七',
    type: '非诉讼业务',
    status: '准备中',
    priority: '中',
    lastUpdate: '2024-07-15',
    assignedTo: '张律师'
  }
];

// 模拟待处理咨询数据
const pendingConsultations = [
  {
    id: 'CON001',
    title: '商标侵权咨询',
    client: '张三设计工作室',
    type: '知识产权咨询',
    requestDate: '2024-07-15',
    status: '未回复',
    priority: '高'
  },
  {
    id: 'CON003',
    title: '产品设计专利保护咨询',
    client: '王五科技有限公司',
    type: '知识产权咨询',
    requestDate: '2024-07-14',
    status: '未回复',
    priority: '中'
  },
  {
    id: 'CON005',
    title: '新员工保密协议审核',
    client: '李四',
    type: '合同咨询',
    requestDate: '2024-07-13',
    status: '未回复',
    priority: '低'
  }
];

// 模拟今日日程
const todaySchedule = [
  {
    id: 'SCH001',
    time: '10:00 - 11:00',
    title: '与张三设计工作室商标侵权案庭前会议',
    type: '会议',
    location: '公司会议室A',
    participants: ['李律师', '张三', '公司法务']
  },
  {
    id: 'SCH002',
    time: '14:30 - 15:30',
    title: '李四合同争议调解会',
    type: '调解',
    location: '第三方调解中心',
    participants: ['王律师', '李四', '对方代表']
  },
  {
    id: 'SCH003',
    time: '16:30 - 17:30',
    title: '设计行业法律风险讲座准备',
    type: '内部工作',
    location: '办公室',
    participants: ['张律师']
  }
];

// 状态样式
const getStatusStyle = (status: string) => {
  switch (status) {
    case '进行中':
      return 'bg-blue-100 text-blue-800';
    case '准备中':
      return 'bg-yellow-100 text-yellow-800';
    case '已完成':
      return 'bg-green-100 text-green-800';
    case '未回复':
      return 'bg-red-100 text-red-800';
    case '已回复':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// 优先级样式
const getPriorityStyle = (priority: string) => {
  switch (priority) {
    case '高':
      return 'bg-red-100 text-red-800';
    case '中':
      return 'bg-yellow-100 text-yellow-800';
    case '低':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * LegalServicesDashboardPage component renders the personalized dashboard for Legal Service providers.
 * It utilizes the DashboardLayout and features card-based navigation for key functions and metrics.
 */
export default function LegalServicesPage() {
  const professionName = "法律服务 (Legal Services)";
  const welcomeMessage = "您的法律事务管理中心，高效处理案件、管理客户与日程。";

  const features: FeatureCardProps[] = [
    {
      title: "案件管理系统",
      icon: "⚖️", // Scales icon
      href: "/dashboard/legal-services/case-management",
      description: "创建、更新和跟踪案件状态"
    },
    {
      title: "客户档案库",
      icon: "📂", // Open folder
      href: "/dashboard/legal-services/client-profiles",
      description: "管理客户信息与相关文档"
    },
    {
      title: "法律文书模板",
      icon: "📜", // Scroll
      href: "/dashboard/legal-services/document-templates",
      description: "访问和使用常用法律文书"
    },
    {
      title: "日程与开庭提醒",
      icon: "📅", // Calendar
      href: "/dashboard/legal-services/calendar",
      description: "管理开庭、会议和截止日期"
    },
    {
      title: "法规更新与研究",
      icon: "📚", // Books
      href: "/dashboard/legal-services/legal-research",
      description: "获取最新法规与案例研究"
    },
    {
      title: "账单与收款管理",
      icon: "🧾", // Receipt
      href: "/dashboard/legal-services/billing",
      description: "创建账单并跟踪支付状态"
    },
    {
      title: "团队协作空间",
      icon: "🤝", // Handshake
      href: "/dashboard/legal-services/team-collaboration",
      description: "共享案件信息与任务分配"
    },
    {
      title: "设计师协作请求",
      icon: "🧑‍🎨", // Artist palette icon
      href: "/dashboard/legal-services/designer-requests",
      description: "处理设计师的法律服务请求，如合同起草、审核等"
    },
    {
      title: "内部知识库",
      icon: "🧠", // Brain
      href: "/dashboard/legal-services/knowledge-base",
      description: "存储和检索专业知识文档"
    },
  ];

  const collaborationHref = "/dashboard/legal-services/designer-requests";

  const keyMetrics: MetricCardProps[] = [
    {
      label: "进行中案件",
      value: 12, // Placeholder
      icon: "⏳",
      bgColor: 'bg-blue-500',
    },
    {
      label: "本月新接咨询",
      value: 5, // Placeholder
      icon: "🗣️", // Speaking head
      bgColor: 'bg-teal-500',
    },
    {
      label: "待审核文书",
      value: 3, // Placeholder
      icon: "📄", // Page with curl
      bgColor: 'bg-purple-500',
    },
    {
        label: "即将到期任务",
        value: 7, // Placeholder
        icon: "🔔", // Bell
        bgColor: 'bg-orange-500',
    }
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">法律服务中心</h1>
        <p className="mt-1 text-gray-500">法律服务工作仪表盘与业务概览</p>
      </div>
      
      {/* 快速统计 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
              <BriefcaseIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5">
              <h3 className="text-sm font-medium text-gray-500">案件管理</h3>
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{statsData.activeCases}</p>
                <p className="ml-2 text-sm font-medium text-gray-500">进行中</p>
                <span className="mx-2 text-gray-300">|</span>
                <p className="text-sm font-medium text-gray-900">{statsData.pendingCases}</p>
                <p className="ml-1 text-sm text-gray-500">待处理</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/dashboard/legal-services/case-management" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
              查看所有案件 →
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
              <UserGroupIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5">
              <h3 className="text-sm font-medium text-gray-500">客户管理</h3>
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{statsData.activeClients}</p>
                <p className="ml-2 text-sm font-medium text-gray-500">活跃客户</p>
                <span className="mx-2 text-gray-300">|</span>
                <p className="text-sm font-medium text-gray-900">{statsData.totalClients}</p>
                <p className="ml-1 text-sm text-gray-500">总客户</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/dashboard/legal-services/client-profiles" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
              管理客户档案 →
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
              <ScaleIcon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5">
              <h3 className="text-sm font-medium text-gray-500">法律咨询</h3>
              <div className="mt-1 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{statsData.consultationRequests}</p>
                <p className="ml-2 text-sm font-medium text-gray-500">待回复咨询</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/dashboard/legal-services/consultation" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
              处理咨询请求 →
            </Link>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 最近案件 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">最近案件</h2>
            <Link href="/dashboard/legal-services/case-management" className="text-sm text-indigo-600 hover:text-indigo-800">
              查看全部
            </Link>
          </div>
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {recentCases.map((caseItem) => (
                <li key={caseItem.id} className="p-4 hover:bg-gray-50">
                  <Link href={`/dashboard/legal-services/case-management?case=${caseItem.id}`} className="block">
                    <div className="flex justify-between">
                      <div className="text-sm font-medium text-gray-900 truncate mb-1">{caseItem.title}</div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(caseItem.status)}`}>
                          {caseItem.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                      <div>{caseItem.client}</div>
                      <div>{caseItem.type}</div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <div className="text-gray-500">
                        负责人: <span className="text-gray-900">{caseItem.assignedTo}</span>
                      </div>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityStyle(caseItem.priority)}`}>
                        {caseItem.priority}优先
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* 待处理咨询 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">待处理咨询</h2>
            <Link href="/dashboard/legal-services/consultation" className="text-sm text-indigo-600 hover:text-indigo-800">
              查看全部
            </Link>
          </div>
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {pendingConsultations.map((consultation) => (
                <li key={consultation.id} className="p-4 hover:bg-gray-50">
                  <Link href={`/dashboard/legal-services/consultation?consultation=${consultation.id}`} className="block">
                    <div className="flex justify-between">
                      <div className="text-sm font-medium text-gray-900 truncate mb-1">{consultation.title}</div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(consultation.status)}`}>
                          {consultation.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                      <div>{consultation.client}</div>
                      <div>{consultation.type}</div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <div className="text-gray-500">
                        请求日期: <span className="text-gray-900">{consultation.requestDate}</span>
                      </div>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityStyle(consultation.priority)}`}>
                        {consultation.priority}优先
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* 今日日程 */}
        <div className="md:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">今日日程安排</h2>
          </div>
          <div className="p-4">
            {todaySchedule.map((schedule) => (
              <div key={schedule.id} className="mb-4 last:mb-0">
                <div className="flex items-start">
                  <div className="min-w-20 text-sm font-medium text-gray-900">{schedule.time}</div>
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <div className="text-sm font-medium text-gray-900">{schedule.title}</div>
                      <span className="inline-flex px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800">
                        {schedule.type}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      <div>地点: {schedule.location}</div>
                      <div className="mt-1">参与者: {schedule.participants.join(', ')}</div>
                    </div>
                  </div>
                </div>
                {schedule.id !== todaySchedule[todaySchedule.length - 1].id && (
                  <div className="border-t border-gray-100 mt-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* 快速访问 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">快速访问</h2>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <Link href="/dashboard/legal-services/case-management" className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <div className="flex-shrink-0 bg-indigo-100 rounded-md p-2">
                  <BriefcaseIcon className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="ml-3 text-sm font-medium text-gray-900">案件管理</div>
              </Link>
              
              <Link href="/dashboard/legal-services/client-profiles" className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-2">
                  <UserGroupIcon className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-3 text-sm font-medium text-gray-900">客户档案</div>
              </Link>
              
              <Link href="/dashboard/legal-services/consultation" className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <div className="flex-shrink-0 bg-purple-100 rounded-md p-2">
                  <ScaleIcon className="h-5 w-5 text-purple-600" />
                </div>
                <div className="ml-3 text-sm font-medium text-gray-900">法律咨询服务</div>
              </Link>
              
              <Link href="/dashboard/legal-services/documents" className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
                  <DocumentTextIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3 text-sm font-medium text-gray-900">法律文书与合同</div>
              </Link>
              
              <Link href="/dashboard/legal-services/template-center" className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-2">
                  <DocumentDuplicateIcon className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="ml-3 text-sm font-medium text-gray-900">文书模板中心</div>
              </Link>
              
              <Link href="/dashboard/legal-services/regulation" className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <div className="flex-shrink-0 bg-pink-100 rounded-md p-2">
                  <BookOpenIcon className="h-5 w-5 text-pink-600" />
                </div>
                <div className="ml-3 text-sm font-medium text-gray-900">法规更新与研究</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* 统计信息和财务概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
              <DocumentTextIcon className="h-4 w-4 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">文档总数</h3>
              <p className="text-lg font-semibold text-gray-900">{statsData.documentsCreated}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-100 rounded-full p-2">
              <ClockIcon className="h-4 w-4 text-yellow-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">待处理文档</h3>
              <p className="text-lg font-semibold text-gray-900">{statsData.pendingDocuments}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
              <CurrencyDollarIcon className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">总账单金额</h3>
              <p className="text-lg font-semibold text-gray-900">{statsData.totalBilling}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
              <CurrencyDollarIcon className="h-4 w-4 text-red-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">待收款</h3>
              <p className="text-lg font-semibold text-gray-900">{statsData.pendingPayments}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 
