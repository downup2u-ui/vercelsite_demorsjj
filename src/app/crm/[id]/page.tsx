"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  UserIcon, 
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  TagIcon,
  CurrencyYenIcon,
  CalendarIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

// 模拟客户数据
const customerData = {
  id: 'CUS-001',
  name: '张先生',
  avatar: '/profile/customer-avatar.svg',
  email: 'zhang@example.com',
  phone: '138****1234',
  address: '广州市天河区珠江新城88号',
  company: '广州创意设计有限公司',
  position: '创意总监',
  tags: ['VIP客户', '收藏家', '设计师'],
  joinDate: '2023-05-15',
  lastActive: '2025-03-25',
  totalSpent: 28500,
  preferences: {
    artStyles: ['现代主义', '极简主义', '抽象艺术'],
    artists: ['李明', '王华', '张艺'],
    mediums: ['油画', '版画', '摄影']
  },
  purchaseHistory: [
    {
      id: 'ORD-20250615-001',
      date: '2025-06-15',
      items: [
        { name: '《山水新境》版画', price: 2800 },
        { name: '《城市记忆》摄影作品', price: 3500 }
      ],
      total: 6300,
      status: '已完成'
    },
    {
      id: 'ORD-20250320-002',
      date: '2025-03-20',
      items: [
        { name: '《光影交错》油画', price: 12000 }
      ],
      total: 12000,
      status: '已完成'
    },
    {
      id: 'ORD-20250105-003',
      date: '2025-01-05',
      items: [
        { name: '《都市几何》摄影作品', price: 4500 },
        { name: '《色彩研究》版画', price: 5700 }
      ],
      total: 10200,
      status: '已完成'
    }
  ],
  eventAttendance: [
    { id: 'EVT-001', name: '2025春季艺术展', date: '2025-03-15', status: '已参加' },
    { id: 'EVT-002', name: '当代设计师论坛', date: '2025-02-20', status: '已参加' },
    { id: 'EVT-003', name: '艺术收藏家沙龙', date: '2025-04-10', status: '已报名' }
  ],
  interactions: [
    { 
      id: 'INT-001', 
      date: '2025-03-25', 
      type: '电话沟通', 
      staff: '李客服',
      notes: '客户询问了即将举办的夏季展览信息，对现代主义艺术作品表示浓厚兴趣。'
    },
    { 
      id: 'INT-002', 
      date: '2025-03-10', 
      type: '邮件沟通', 
      staff: '王销售',
      notes: '向客户推荐了几位新兴艺术家的作品，客户表示会考虑。'
    },
    { 
      id: 'INT-003', 
      date: '2025-02-28', 
      type: '现场咨询', 
      staff: '张经理',
      notes: '客户参观了画廊，对李明的新作品表示很感兴趣，考虑购买。'
    }
  ]
};

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params.id;
  
  // 在实际应用中，这里会根据customerId从API获取客户数据
  // 这里使用模拟数据
  const customer = customerData;
  
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 客户基本信息 */}
        <div className="mb-8 md:flex md:items-center md:justify-between">
          <div className="flex items-center">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
              <Image
                src={customer.avatar}
                alt={customer.name}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                <div className="flex items-center">
                  <UserIcon className="mr-1 h-4 w-4 text-gray-400" />
                  <span>{customer.company} - {customer.position}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="mr-1 h-4 w-4 text-gray-400" />
                  <span>加入时间: {customer.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <button className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
              <ChatBubbleLeftRightIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
              联系客户
            </button>
          </div>
        </div>
        
        {/* 客户标签 */}
        <div className="mb-6 flex flex-wrap gap-2">
          {customer.tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800"
            >
              <TagIcon className="mr-1 h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>
        
        {/* 标签页导航 */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === 'profile'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              客户资料
            </button>
            <button
              onClick={() => setActiveTab('purchases')}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === 'purchases'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              购买记录
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === 'events'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              活动参与
            </button>
            <button
              onClick={() => setActiveTab('interactions')}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === 'interactions'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              互动记录
            </button>
          </nav>
        </div>
        
        {/* 客户资料 */}
        {activeTab === 'profile' && (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* 联系信息 */}
            <div>
              <h2 className="text-lg font-medium text-gray-900">联系信息</h2>
              <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
                <dl className="divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="flex items-center text-sm font-medium text-gray-500">
                      <PhoneIcon className="mr-1 h-5 w-5 text-gray-400" />
                      电话
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{customer.phone}</dd>
                  </div>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="flex items-center text-sm font-medium text-gray-500">
                      <EnvelopeIcon className="mr-1 h-5 w-5 text-gray-400" />
                      电子邮件
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{customer.email}</dd>
                  </div>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="flex items-center text-sm font-medium text-gray-500">
                      <MapPinIcon className="mr-1 h-5 w-5 text-gray-400" />
                      地址
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{customer.address}</dd>
                  </div>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="flex items-center text-sm font-medium text-gray-500">
                      <UserIcon className="mr-1 h-5 w-5 text-gray-400" />
                      公司
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{customer.company}</dd>
                  </div>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="flex items-center text-sm font-medium text-gray-500">
                      <UserIcon className="mr-1 h-5 w-5 text-gray-400" />
                      职位
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{customer.position}</dd>
                  </div>
                </dl>
              </div>
            </div>
            
            {/* 客户偏好 */}
            <div>
              <h2 className="text-lg font-medium text-gray-900">客户偏好</h2>
              <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
                <dl className="divide-y divide-gray-200">
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">艺术风格</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <div className="flex flex-wrap gap-2">
                        {customer.preferences.artStyles.map((style, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                          >
                            {style}
                          </span>
                        ))}
                      </div>
                    </dd>
                  </div>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">偏好艺术家</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <div className="flex flex-wrap gap-2">
                        {customer.preferences.artists.map((artist, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                          >
                            {artist}
                          </span>
                        ))}
                      </div>
                    </dd>
                  </div>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">偏好媒介</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <div className="flex flex-wrap gap-2">
                        {customer.preferences.mediums.map((medium, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                          >
                            {medium}
                          </span>
                        ))}
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
              
              {/* 客户统计 */}
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">客户统计</h2>
                <dl className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">总消费金额</dt>
                    <dd className="mt-1 flex items-baseline justify-between">
                      <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                        <CurrencyYenIcon className="mr-1 h-5 w-5" />
                        {customer.totalSpent.toLocaleString()}
                      </div>
                    </dd>
                  </div>
                  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">购买次数</dt>
                    <dd className="mt-1 text-2xl font-semibold text-indigo-600">{customer.purchaseHistory.length}</dd>
                  </div>
                  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">最近活跃</dt>
                    <dd className="mt-1 text-2xl font-semibold text-indigo-600">{customer.lastActive}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
        
        {/* 购买记录 */}
        {activeTab === 'purchases' && (
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">购买记录</h2>
            <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        订单编号
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        日期
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        商品
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                        金额
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                        状态
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {customer.purchaseHistory.map((purchase) => (
                      <tr key={purchase.id}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-indigo-600">
                          <Link href={`/orders/${purchase.id}`}>{purchase.id}</Link>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {purchase.date}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <ul className="list-disc pl-5">
                            {purchase.items.map((item, index) => (
                              <li key={index}>{item.name}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900">
                          ¥{purchase.total.toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {purchase.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <Link href={`/orders/${purchase.id}`} className="text-indigo-600 hover:text-indigo-900">
                            查看详情
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* 活动参与 */}
        {activeTab === 'events' && (
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">活动参与</h2>
            <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        活动名称
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        日期
                      </th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                        状态
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {customer.eventAttendance.map((event) => (
                      <tr key={event.id}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          {event.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {event.date}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            event.status === '已参加' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <Link href={`/events/${event.id}`} className="text-indigo-600 hover:text-indigo-900">
                            查看活动
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* 互动记录 */}
        {activeTab === 'interactions' && (
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">互动记录</h2>
              <button className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                添加互动记录
              </button>
            </div>
            <div className="mt-4 flow-root">
              <ul className="-mb-8">
                {customer.interactions.map((interaction, index) => (
                  <li key={interaction.id}>
                    <div className="relative pb-8">
                      {index !== customer.interactions.length - 1 ? (
                        <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 ring-8 ring-white">
                            <ChatBubbleLeftRightIcon className="h-5 w-5 text-indigo-500" />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium text-gray-900">{interaction.type}</span> 由 
                              <span className="font-medium text-indigo-600"> {interaction.staff}</span> 处理
                            </p>
                            <p className="mt-2 text-sm text-gray-700">{interaction.notes}</p>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            <div className="flex flex-col items-end">
                              <CalendarIcon className="mb-1 ml-auto h-4 w-4" />
                              <time dateTime={interaction.date}>{interaction.date}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
