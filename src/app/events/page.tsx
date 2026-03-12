"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { events } from '@/data/events';
import { createEventSuggestions, CreateEventSuggestion } from '@/data/createEvents';
import { coworkingSpaces, CoworkingSpace } from '@/data/coworkingSpaces';

export default function EventsPage() {
  // --- STATE MANAGEMENT ---
  // 活动日历筛选与搜索状态
  const [eventFilter, setEventFilter] = useState<'all' | 'release' | 'exhibition' | 'auction' | 'market' | 'training' | 'maker'>('all');
  const [eventSearchTerm, setEventSearchTerm] = useState<string>('');
  
  // 共坊日历 (共享办公) 筛选与搜索状态
  const [coworkingFilter, setCoworkingFilter] = useState<'all' | 'meeting-room' | 'creative-studio' | 'exhibition-hall' | 'dedicated-desk' | 'open-area'>('all');
  const [coworkingSearchTerm, setCoworkingSearchTerm] = useState<string>('');

  // 活动发起建议筛选与搜索状态
  const [createFilter, setCreateFilter] = useState<'all' | 'exhibition' | 'workshop' | 'meetup' | 'market' | 'roadshow' | 'other'>('all');
  const [createSearchTerm, setCreateSearchTerm] = useState<string>('');

  // 当前激活的标签页状态 (events, coworking, create)
  const [activeTab, setActiveTab] = useState<'events' | 'coworking' | 'create'>('events');

  // --- DATA FILTERING LOGIC ---
  // 过滤活动日历事件
  const filteredEvents = events.filter((event) => {
    const typeMatch = eventFilter === 'all' || event.type === eventFilter;
    const searchMatch = 
      eventSearchTerm === '' || 
      event.title.toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(eventSearchTerm.toLowerCase());
    return typeMatch && searchMatch;
  });

  // 按日期排序活动日历事件，并区分为即将到来和已结束
  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  const now = new Date();
  const upcomingEvents = sortedEvents.filter(event => new Date(event.startDate) > now);
  const pastEvents = sortedEvents.filter(event => new Date(event.startDate) <= now);

  // 过滤共享办公空间数据
  const filteredCoworkingSpaces = coworkingSpaces.filter((space) => {
    const typeMatch = coworkingFilter === 'all' || space.type === coworkingFilter;
    const searchMatch = 
      coworkingSearchTerm === '' || 
      space.title.toLowerCase().includes(coworkingSearchTerm.toLowerCase()) ||
      space.description.toLowerCase().includes(coworkingSearchTerm.toLowerCase()) ||
      space.features.some(feature => feature.toLowerCase().includes(coworkingSearchTerm.toLowerCase()));
    return typeMatch && searchMatch;
  });

  // 过滤活动发起建议数据
  const filteredCreateEventSuggestions = createEventSuggestions.filter((suggestion) => {
    const typeMatch = createFilter === 'all' || suggestion.type === createFilter;
    const searchMatch = 
      createSearchTerm === '' || 
      suggestion.title.toLowerCase().includes(createSearchTerm.toLowerCase()) ||
      suggestion.description.toLowerCase().includes(createSearchTerm.toLowerCase());
    return typeMatch && searchMatch;
  });

  // --- JSX RENDERING ---
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">创客乌托邦</h1>
          <p className="mt-3 text-lg leading-8 text-gray-600">
            探索创新社区的无限可能，连接创意灵魂，共建理想生活方式
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <a href="#calendar" className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700">
                开始探索
              </a>
            </div>
          </div>
        </div>

        {/* 三个平级内容区分类 */}
        <div className="mt-16 border-b border-gray-200">
          <nav className="-mb-px flex justify-center space-x-8" aria-label="Tabs">
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
                activeTab === 'events' 
                  ? 'border-indigo-500 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('events')}
              aria-current={activeTab === 'events' ? 'page' : undefined}
            >
              活动日历
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
                activeTab === 'coworking' 
                  ? 'border-indigo-500 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('coworking')}
              aria-current={activeTab === 'coworking' ? 'page' : undefined}
            >
              共坊日历
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
                activeTab === 'create' 
                  ? 'border-indigo-500 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('create')}
              aria-current={activeTab === 'create' ? 'page' : undefined}
            >
              活动发起
            </button>
          </nav>
        </div>
        
        {/* 活动日历内容区域 */}
        <div id="calendar" className={`mt-8 ${activeTab === 'events' ? 'block' : 'hidden'}`}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">活动日历</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              参与我们的线上线下活动，与创意社区交流，拓展你的视野
            </p>
          </div>

          {/* 活动日历搜索和过滤 */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="w-full sm:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索活动..."
                  className="block w-full rounded-md border-0 py-2 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={eventSearchTerm}
                  onChange={(e) => setEventSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
              <button className={`px-3 py-1 rounded-full text-sm font-medium ${ eventFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setEventFilter('all')}>全部</button>
              <button className={`px-3 py-1 rounded-full text-sm font-medium ${ eventFilter === 'release' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setEventFilter('release')}>发布</button>
              <button className={`px-3 py-1 rounded-full text-sm font-medium ${ eventFilter === 'exhibition' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setEventFilter('exhibition')}>展览</button>
              <button className={`px-3 py-1 rounded-full text-sm font-medium ${ eventFilter === 'auction' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setEventFilter('auction')}>拍卖</button>
              <button className={`px-3 py-1 rounded-full text-sm font-medium ${ eventFilter === 'market' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setEventFilter('market')}>市集</button>
              <button className={`px-3 py-1 rounded-full text-sm font-medium ${ eventFilter === 'training' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setEventFilter('training')}>培训</button>
              <button className={`px-3 py-1 rounded-full text-sm font-medium ${ eventFilter === 'maker' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setEventFilter('maker')}>创客活动</button>
            </div>
          </div>

          {/* 即将到来的活动 */}
          {upcomingEvents.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900">即将到来的活动</h2>
              <div className="mt-6 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <article key={event.id} className="flex flex-col bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-x-4 text-xs">
                        <time dateTime={event.startDate} className="text-gray-500">
                          {new Date(event.startDate).toLocaleDateString('zh-CN')}
                        </time>
                        <span className="relative z-10 rounded-full bg-indigo-50 px-3 py-1.5 font-medium text-indigo-600 hover:bg-indigo-100">
                          {event.type === 'release' ? '发布' : 
                           event.type === 'exhibition' ? '展览' : 
                           event.type === 'auction' ? '拍卖' : 
                           event.type === 'market' ? '市集' : 
                           event.type === 'training' ? '培训' : 
                           event.type === 'maker' ? '创客活动' : '其他'}
                        </span>
                        {event.memberOnly && (
                          <span className="relative z-10 rounded-full bg-amber-50 px-3 py-1.5 font-medium text-amber-600">
                            会员专享
                          </span>
                        )}
                      </div>
                      <div className="group relative mt-3">
                        <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <Link href={`/events/${event.id}`}>
                            <span className="absolute inset-0" />
                            {event.title}
                          </Link>
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{event.description}</p>
                      </div>
                      <div className="mt-6">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(event.startDate).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })} - {new Date(event.endDate).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <div className="mt-4 flex w-full justify-between text-xs">
                        <span className="text-gray-500">组织者: {event.organizer}</span>
                        <span className="font-medium text-gray-700">已报名: {event.registered}/{event.capacity}</span>
                      </div>
                      <div className="mt-6">
                        <div className="relative pt-1">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                            <div 
                              style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                event.registered / event.capacity > 0.8 ? 'bg-red-500' : 'bg-indigo-500'
                              }`}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Link
                          href={`/events/${event.id}`}
                          className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          {event.registered >= event.capacity ? '查看详情（已满）' : '立即报名'}
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* 过去的活动 */}
          {pastEvents.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900">往期活动</h2>
              <div className="mt-6 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event) => (
                  <article key={event.id} className="flex flex-col bg-white rounded-xl shadow-sm overflow-hidden opacity-75">
                    <div className="relative h-48 w-full">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover grayscale"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <span className="text-white font-bold px-4 py-2 border-2 border-white rounded-md">已结束</span>
                      </div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-x-4 text-xs">
                        <time dateTime={event.startDate} className="text-gray-500">
                          {new Date(event.startDate).toLocaleDateString('zh-CN')}
                        </time>
                        <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600">
                          {event.type === 'release' ? '发布' : 
                           event.type === 'exhibition' ? '展览' : 
                           event.type === 'auction' ? '拍卖' : 
                           event.type === 'market' ? '市集' : 
                           event.type === 'training' ? '培训' : 
                           event.type === 'maker' ? '创客活动' : '其他'}
                        </span>
                      </div>
                      <div className="group relative mt-3">
                        <h3 className="text-lg font-semibold leading-6 text-gray-700 group-hover:text-gray-600">
                          <Link href={`/events/${event.id}`}>
                            <span className="absolute inset-0" />
                            {event.title}
                          </Link>
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-500">{event.description}</p>
                      </div>
                      <div className="mt-6">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </div>
                      </div>
                      <div className="mt-6">
                        <Link
                          href={`/events/${event.id}`}
                          className="block w-full rounded-md bg-gray-100 px-3.5 py-2.5 text-center text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-200"
                        >
                          查看回顾
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* 没有找到活动 */}
          {filteredEvents.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-500">没有找到符合条件的活动</p>
              <button 
                className="mt-4 text-indigo-600 hover:text-indigo-500"
                onClick={() => {
                  setEventFilter('all');
                  setEventSearchTerm('');
                }}
              >
                重置筛选条件
              </button>
            </div>
          )}
        </div>

        {/* 共坊日历区域 */}
        <div className={`mt-8 ${activeTab === 'coworking' ? 'block' : 'hidden'}`}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">共坊日历</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              查找合适的共享空间，灵活的创新工作空间，满足个人创作者与团队的多样化需求
            </p>
          </div>
          {/* 共坊日历搜索和过滤 */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="w-full sm:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索空间类型或关键词..."
                  className="block w-full rounded-md border-0 py-2 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={coworkingSearchTerm}
                  onChange={(e) => setCoworkingSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
              <button className={`px-3 py-1 rounded-full text-sm font-medium ${ coworkingFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setCoworkingFilter('all')}>全部</button>
              <button className={`px-3 py-1 rounded-full text-sm font-medium ${ coworkingFilter === 'meeting-room' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setCoworkingFilter('meeting-room')}>会议室</button>
              <button className={`px-3 py-1 rounded-full text-sm font-medium ${ coworkingFilter === 'creative-studio' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setCoworkingFilter('creative-studio')}>创意工作室</button>
              <button className={`px-3 py-1 rounded-full text-sm font-medium ${ coworkingFilter === 'exhibition-hall' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setCoworkingFilter('exhibition-hall')}>多功能展厅</button>
              <button className={`px-3 py-1 rounded-full text-sm font-medium ${ coworkingFilter === 'dedicated-desk' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setCoworkingFilter('dedicated-desk')}>独立工位</button>
              <button className={`px-3 py-1 rounded-full text-sm font-medium ${ coworkingFilter === 'open-area' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setCoworkingFilter('open-area')}>开放区域</button>
            </div>
          </div>
          {/* 共坊日历卡片列表 */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCoworkingSpaces.length > 0 ? (
              filteredCoworkingSpaces.map((space) => (
                <div key={space.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                  <div className="relative h-56 w-full">
                    <Image 
                      src={space.image}
                      alt={space.title}
                      fill 
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900">{space.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 flex-grow">{space.description}</p>
                    {space.capacity && <p className="mt-2 text-xs text-gray-500">容量: {space.capacity}</p>}
                    {space.size && <p className="text-xs text-gray-500">面积: {space.size}</p>}
                    <ul className="mt-4 space-y-1 text-sm text-gray-700">
                      {space.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                      {space.features.length > 3 && <li className="text-xs text-gray-500 ml-7">...更多特性</li>}
                    </ul>
                    <div className="mt-6">
                      <a 
                        href={space.bookingLink || '#'}
                        className={`inline-block w-full text-center rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${space.bookingLink ? 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600' : 'bg-gray-400 cursor-not-allowed'}`}
                        target="_blank" rel="noopener noreferrer"
                      >
                        {space.bookingLink ? '立即预订' : '敬请期待'}
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 py-12 text-center">
                <p className="text-lg text-gray-500">没有找到符合条件的共享空间</p>
                <button 
                  className="mt-4 text-indigo-600 hover:text-indigo-500"
                  onClick={() => {
                    setCoworkingFilter('all');
                    setCoworkingSearchTerm('');
                  }}
                >
                  重置筛选条件
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 活动发起区域 */}
        <div className={`mt-8 ${activeTab === 'create' ? 'block' : 'hidden'}`}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">分享你的创意</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              选择你想发起的活动类型，在创客乌托邦发起属于你的活动，连接同好，共创精彩！
            </p>
          </div>
          {/* 活动发起搜索和过滤 */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="w-full sm:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索你想发起的活动类型..."
                  className="block w-full rounded-md border-0 py-2 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={createSearchTerm}
                  onChange={(e) => setCreateSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
                <button className={`px-3 py-1 rounded-full text-sm font-medium ${ createFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setCreateFilter('all')}>全部</button>
                <button className={`px-3 py-1 rounded-full text-sm font-medium ${ createFilter === 'exhibition' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setCreateFilter('exhibition')}>展览</button>
                <button className={`px-3 py-1 rounded-full text-sm font-medium ${ createFilter === 'workshop' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setCreateFilter('workshop')}>工作坊</button>
                <button className={`px-3 py-1 rounded-full text-sm font-medium ${ createFilter === 'meetup' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setCreateFilter('meetup')}>分享会</button>
                <button className={`px-3 py-1 rounded-full text-sm font-medium ${ createFilter === 'market' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setCreateFilter('market')}>市集</button>
                <button className={`px-3 py-1 rounded-full text-sm font-medium ${ createFilter === 'roadshow' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setCreateFilter('roadshow')}>路演</button>
                <button className={`px-3 py-1 rounded-full text-sm font-medium ${ createFilter === 'other' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200' }`} onClick={() => setCreateFilter('other')}>其他创意</button>
            </div>
          </div>
          {/* 活动发起卡片列表 */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCreateEventSuggestions.length > 0 ? (
              filteredCreateEventSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                  <div className="relative h-48 w-full">
                    <Image 
                      src={suggestion.image}
                      alt={suggestion.title}
                      fill 
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900">{suggestion.title}</h3>
                    <p className="mt-2 text-gray-600 flex-grow">{suggestion.description}</p>
                    <div className="mt-6">
                      <a 
                        href={suggestion.ctaLink}
                        className="inline-block w-full text-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {suggestion.ctaText}
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 py-12 text-center">
                <p className="text-lg text-gray-500">没有找到符合条件的活动发起类型</p>
                <button 
                  className="mt-4 text-indigo-600 hover:text-indigo-500"
                  onClick={() => {
                    setCreateFilter('all');
                    setCreateSearchTerm('');
                  }}
                >
                  重置筛选条件
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
