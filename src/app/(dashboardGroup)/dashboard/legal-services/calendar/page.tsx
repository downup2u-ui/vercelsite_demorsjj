"use client";

import { useState } from 'react';
import Link from 'next/link';

// 模拟日程数据
const eventsData = [
  {
    id: 'E001',
    title: '张三商标侵权案开庭',
    date: '2024-08-15',
    time: '10:00 AM',
    location: '上海市浦东新区人民法院',
    type: '开庭',
    relatedCase: 'CL001',
    description: '商标侵权案第一次开庭，需准备相关证据文件。',
    participants: ['李律师', '张三', '法院书记员'],
  },
  {
    id: 'E002',
    title: '与视觉设计有限公司商标注册进度会议',
    date: '2024-07-25',
    time: '14:30 PM',
    location: '线上会议',
    type: '会议',
    relatedCase: 'CL004',
    description: '讨论商标注册进展情况，以及下一步申请策略。',
    participants: ['赵律师', '视觉设计有限公司刘总'],
  },
  {
    id: 'E003',
    title: '李四合同纠纷证据递交截止日',
    date: '2024-08-02',
    time: '17:00 PM',
    location: '北京市朝阳区人民法院',
    type: '截止日期',
    relatedCase: 'CL002',
    description: '需在此日期前完成所有证据材料的整理并递交法院。',
    participants: ['王律师'],
  },
  {
    id: 'E004',
    title: '王五肖像权侵权案证人出庭',
    date: '2024-07-30',
    time: '09:30 AM',
    location: '广州市天河区人民法院',
    type: '开庭',
    relatedCase: 'CL005',
    description: '安排关键证人出庭作证，需提前准备。',
    participants: ['张律师', '王五', '证人李明'],
  },
  {
    id: 'E005',
    title: '赵六合同纠纷调解会议',
    date: '2024-08-05',
    time: '13:00 PM',
    location: '深圳市南山区人民法院调解室',
    type: '调解',
    relatedCase: 'CL007',
    description: '法院组织的调解会议，尝试达成和解。',
    participants: ['王律师', '赵六', '对方代表'],
  },
  {
    id: 'E006',
    title: '周九投资协议咨询会议',
    date: '2024-08-01',
    time: '11:00 AM',
    location: '律所会议室',
    type: '咨询',
    relatedCase: 'CL009',
    description: '就投资协议条款进行详细法律咨询。',
    participants: ['张律师', '周九'],
  },
  {
    id: 'E007',
    title: '吴十案件证据收集截止日',
    date: '2024-08-10',
    time: '18:00 PM',
    location: '不适用',
    type: '截止日期',
    relatedCase: 'CL010',
    description: '完成所有商业秘密泄露相关证据的收集工作。',
    participants: ['赵律师', '助理小李'],
  },
  {
    id: 'E008',
    title: '知识产权法新规培训会',
    date: '2024-08-20',
    time: '14:00 PM',
    location: '律所大会议室',
    type: '培训',
    relatedCase: '',
    description: '关于新修订知识产权法规的内部培训会议。',
    participants: ['全体律师', '外部专家刘教授'],
  },
  {
    id: 'E009',
    title: '创意工作室保密协议后续咨询',
    date: '2024-07-29',
    time: '16:00 PM',
    location: '电话会议',
    type: '咨询',
    relatedCase: 'CL003',
    description: '就已完成的保密协议使用提供进一步咨询。',
    participants: ['陈律师', '创意工作室代表'],
  },
  {
    id: 'E010',
    title: '月度案件进度总结会',
    date: '2024-07-31',
    time: '10:00 AM',
    location: '律所小会议室',
    type: '内部会议',
    relatedCase: '',
    description: '讨论所有在办案件的进展情况，解决遇到的问题。',
    participants: ['部门负责人', '所有经办律师'],
  },
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  // 获取当前日期并格式化为YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  // 根据类型筛选事件
  const getTypeStyle = (type: string) => {
    switch (type) {
      case '开庭':
        return 'bg-red-100 text-red-800';
      case '会议':
        return 'bg-blue-100 text-blue-800';
      case '截止日期':
        return 'bg-yellow-100 text-yellow-800';
      case '调解':
        return 'bg-purple-100 text-purple-800';
      case '咨询':
        return 'bg-green-100 text-green-800';
      case '培训':
        return 'bg-indigo-100 text-indigo-800';
      case '内部会议':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 过滤事件
  const filteredEvents = eventsData.filter(event => {
    // 日期筛选
    if (selectedDate && event.date !== selectedDate) return false;

    // 类型筛选
    if (typeFilter !== 'all' && event.type !== typeFilter) return false;

    // 搜索筛选
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        event.title.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.relatedCase.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  // 按照日期排序
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime();
    if (dateCompare === 0) {
      // 如果日期相同，按时间排序
      return a.time.localeCompare(b.time);
    }
    return dateCompare;
  });

  // 按日期分组
  const groupedEvents: { [key: string]: typeof eventsData } = {};
  sortedEvents.forEach(event => {
    if (!groupedEvents[event.date]) {
      groupedEvents[event.date] = [];
    }
    groupedEvents[event.date].push(event);
  });

  const allTypes = Array.from(new Set(eventsData.map(event => event.type)));

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">日程与开庭提醒</h1>
            <p className="mt-1 text-gray-500">管理您的案件相关日程、会议和重要截止日期</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/dashboard/legal-services" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50">
              返回仪表盘
            </Link>
            <Link href="#" className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
              新建日程
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：筛选和日历 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow space-y-6 p-4">
            {/* 搜索框 */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索日程..."
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
            </div>

            {/* 日期筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">选择日期</label>
              <div className="flex items-center">
                <input
                  type="date"
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={selectedDate || ''}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                {selectedDate && (
                  <button
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setSelectedDate(null)}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* 类型筛选 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">事件类型</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className={`py-1.5 px-2 rounded-md text-sm ${typeFilter === 'all' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setTypeFilter('all')}
                >
                  全部类型
                </button>
                {allTypes.map((type) => (
                  <button
                    key={type}
                    className={`py-1.5 px-2 rounded-md text-sm ${typeFilter === type ? getTypeStyle(type) : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setTypeFilter(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 快速日期选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">快速筛选</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className="py-1.5 px-2 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-800"
                  onClick={() => setSelectedDate(today)}
                >
                  今天
                </button>
                <button
                  className="py-1.5 px-2 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-800"
                  onClick={() => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    setSelectedDate(tomorrow.toISOString().split('T')[0]);
                  }}
                >
                  明天
                </button>
                <button
                  className="py-1.5 px-2 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-800"
                  onClick={() => {
                    const nextWeek = new Date();
                    nextWeek.setDate(nextWeek.getDate() + 7);
                    setSelectedDate(nextWeek.toISOString().split('T')[0]);
                  }}
                >
                  一周后
                </button>
                <button
                  className="py-1.5 px-2 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-800"
                  onClick={() => {
                    const nextMonth = new Date();
                    nextMonth.setMonth(nextMonth.getMonth() + 1);
                    setSelectedDate(nextMonth.toISOString().split('T')[0]);
                  }}
                >
                  一个月后
                </button>
                <button
                  className="py-1.5 px-2 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-800 col-span-2"
                  onClick={() => {
                    setSelectedDate(null);
                    setTypeFilter('all');
                    setSearchTerm('');
                  }}
                >
                  重置筛选条件
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：日程列表和详情 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedDate 
                  ? `${selectedDate} 的日程` 
                  : typeFilter !== 'all' 
                    ? `${typeFilter}类型的日程` 
                    : '全部日程'}
              </h3>
              <span className="text-sm text-gray-500">共 {sortedEvents.length} 个事项</span>
            </div>

            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {Object.keys(groupedEvents).length > 0 ? (
                Object.keys(groupedEvents).map((date) => (
                  <div key={date} className="px-4 py-3">
                    <div className="sticky top-0 bg-white py-2">
                      <h4 className="text-md font-medium text-gray-700">
                        {date} ({new Date(date).toLocaleDateString('zh-CN', {weekday: 'long'})})
                      </h4>
                    </div>
                    <div className="space-y-3 mt-2">
                      {groupedEvents[date].map((event) => (
                        <div
                          key={event.id}
                          className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                            selectedEvent?.id === event.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                          }`}
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium text-gray-900">{event.title}</h5>
                              <div className="text-sm text-gray-500 mt-1">{event.time} · {event.location}</div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeStyle(event.type)}`}>
                              {event.type}
                            </span>
                          </div>
                          <div className="mt-2 text-sm text-gray-500 line-clamp-2">{event.description}</div>
                          {event.relatedCase && (
                            <div className="mt-2">
                              <Link 
                                href={`/dashboard/legal-services/case-management/${event.relatedCase}`}
                                className="text-xs text-indigo-600 hover:text-indigo-800"
                              >
                                相关案件: {event.relatedCase}
                              </Link>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  未找到匹配的日程记录
                </div>
              )}
            </div>
          </div>

          {/* 事件详情 */}
          {selectedEvent && (
            <div className="mt-6 bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-medium text-gray-900">{selectedEvent.title}</h3>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${getTypeStyle(selectedEvent.type)}`}>
                  {selectedEvent.type}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">日期与时间</h4>
                      <p className="text-gray-900">{selectedEvent.date} {selectedEvent.time}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">地点</h4>
                      <p className="text-gray-900">{selectedEvent.location}</p>
                    </div>
                    {selectedEvent.relatedCase && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">相关案件</h4>
                        <Link 
                          href={`/dashboard/legal-services/case-management/${selectedEvent.relatedCase}`}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          {selectedEvent.relatedCase}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">描述</h4>
                      <p className="text-gray-900">{selectedEvent.description}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">参与人员</h4>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {selectedEvent.participants.map((person: string, index: number) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                          >
                            {person}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end space-x-3">
                <Link 
                  href="#" 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-50"
                >
                  编辑
                </Link>
                <Link 
                  href="#" 
                  className="px-4 py-2 border border-red-300 text-red-700 rounded-md text-sm hover:bg-red-50"
                >
                  删除
                </Link>
                <Link 
                  href="#" 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
                >
                  添加提醒
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 