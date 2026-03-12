"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { spaces } from '@/data/spaces';

export default function SpacesPage() {
  const [filter, setFilter] = useState<'all' | 'meeting' | 'studio' | 'exhibition' | 'workshop'>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [showVipOnly, setShowVipOnly] = useState<boolean>(false);

  // 获取当前日期，格式为 YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  
  // 如果没有选择日期，默认为今天
  const selectedDate = dateFilter || today;

  // 过滤空间
  const filteredSpaces = spaces.filter((space) => {
    // 根据类型过滤
    const typeMatch = filter === 'all' || space.type === filter;
    
    // 根据会员状态过滤
    const vipMatch = !showVipOnly || space.vipOnly;
    
    // 检查在选定日期是否可用
    const bookingsOnSelectedDate = space.bookings?.filter(
      booking => booking.date === selectedDate
    ) || [];
    
    // 如果没有预订或者有可用时段，则认为空间可用
    const isAvailable = space.available && bookingsOnSelectedDate.length < 8; // 假设一天最多8个时段
    
    return typeMatch && vipMatch && isAvailable;
  });

  // 生成未来30天的日期选项
  const dateOptions = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">空间预约</h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            预约我们的创意空间，为您的项目提供理想的工作和展示环境
          </p>
        </div>

        {/* 筛选器 */}
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setFilter('all')}
            >
              全部空间
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === 'meeting'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setFilter('meeting')}
            >
              会议室
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === 'studio'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setFilter('studio')}
            >
              工作室
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === 'exhibition'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setFilter('exhibition')}
            >
              展览空间
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === 'workshop'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setFilter('workshop')}
            >
              工作台
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <div>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">选择日期</option>
                {dateOptions.map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('zh-CN')}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                id="vip-filter"
                type="checkbox"
                checked={showVipOnly}
                onChange={() => setShowVipOnly(!showVipOnly)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="vip-filter" className="ml-2 text-sm text-gray-600">
                仅显示会员专享
              </label>
            </div>
          </div>
        </div>

        {/* 空间列表 */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSpaces.length > 0 ? (
            filteredSpaces.map((space) => (
              <div key={space.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div className="relative h-48">
                  <Image
                    src={space.image}
                    alt={space.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {space.vipOnly && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 text-xs font-bold rounded">
                      会员专享
                    </div>
                  )}
                </div>
                
                <div className="flex-1 bg-white p-6 flex flex-col">
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{space.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {space.type === 'meeting' ? '会议室' : 
                           space.type === 'studio' ? '工作室' : 
                           space.type === 'exhibition' ? '展览空间' : '工作台'}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-indigo-600">¥{space.hourlyRate}/小时</p>
                    </div>
                    
                    <p className="mt-3 text-sm text-gray-600 line-clamp-2">{space.description}</p>
                    
                    <div className="mt-4 flex flex-wrap gap-1">
                      {space.facilities.slice(0, 3).map((item, index) => (
                        <span key={index} className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                          {item}
                        </span>
                      ))}
                      {space.facilities.length > 3 && (
                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                          +{space.facilities.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {space.location}
                    </div>
                    
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      最多容纳 {space.capacity} 人
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link
                      href={`/spaces/${space.id}?date=${selectedDate}`}
                      className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      查看可用时段
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-lg text-gray-500">没有找到符合条件的空间</p>
              <button 
                className="mt-4 text-indigo-600 hover:text-indigo-500"
                onClick={() => {
                  setFilter('all');
                  setDateFilter('');
                  setShowVipOnly(false);
                }}
              >
                重置筛选条件
              </button>
            </div>
          )}
        </div>
        
        {/* 预约说明 */}
        <div className="mt-16 rounded-2xl bg-gray-50 p-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">预约须知</h2>
          <ul className="mt-6 space-y-3 text-sm text-gray-600">
            <li className="flex gap-x-3">
              <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              <span>预约时间段为每天 9:00-22:00，每次预约最少 1 小时，最多 4 小时</span>
            </li>
            <li className="flex gap-x-3">
              <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              <span>可提前 30 天预约，最晚需提前 2 小时预约</span>
            </li>
            <li className="flex gap-x-3">
              <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              <span>会员专享空间仅对会员开放，普通用户需升级会员后使用</span>
            </li>
            <li className="flex gap-x-3">
              <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              <span>取消预约需提前 24 小时，否则将扣除相应费用</span>
            </li>
            <li className="flex gap-x-3">
              <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              <span>会员享受空间预约 8 折优惠</span>
            </li>
          </ul>
        </div>
        
        {/* 会员权益 */}
        <div className="mt-16 rounded-2xl bg-indigo-50 p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">会员专享权益</h2>
              <p className="mt-2 text-sm text-gray-600">成为会员，享受更多空间预约特权</p>
            </div>
            <Link
              href="/membership"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              了解会员权益
            </Link>
          </div>
          
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-100 text-indigo-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">空间预约折扣</h3>
              <p className="mt-2 text-sm text-gray-600">会员享受所有空间预约 8 折优惠，年度会员更可享受 7 折特惠</p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-100 text-indigo-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">专属空间访问</h3>
              <p className="mt-2 text-sm text-gray-600">解锁会员专享空间，包括高端摄影棚、3D打印工作室等专业设备</p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-100 text-indigo-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">优先预约权</h3>
              <p className="mt-2 text-sm text-gray-600">会员可提前 45 天预约热门空间，比普通用户多 15 天的预约窗口</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
