"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { events, Event } from '@/data/events';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export default function EventDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showMembershipPrompt, setShowMembershipPrompt] = useState(false);
  
  useEffect(() => {
    // 查找对应ID的事件
    const foundEvent = events.find(e => e.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
    }
    
    // 模拟已注册状态（实际应用中应从API获取）
    if (user) {
      // 假设50%的概率用户已注册
      setIsRegistered(Math.random() > 0.5);
    }
  }, [id, user]);
  
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">加载中...</p>
      </div>
    );
  }
  
  const handleRegister = () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    
    if (event.memberOnly && user.membershipType === 'none') {
      setShowMembershipPrompt(true);
      return;
    }
    
    setIsRegistering(true);
    
    // 模拟注册过程
    setTimeout(() => {
      setIsRegistering(false);
      setIsRegistered(true);
    }, 1000);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'yyyy年MM月dd日 HH:mm', { locale: zhCN });
  };
  
  const getEventTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      'exhibition': '展览',
      'auction': '拍卖会',
      'workshop': '工作坊',
      'meetup': '交流会'
    };
    return typeMap[type] || type;
  };
  
  const getRegistrationStatus = () => {
    const percentage = Math.round((event.registered / event.capacity) * 100);
    
    if (percentage >= 90) {
      return { text: '即将满员', color: 'text-red-600' };
    } else if (percentage >= 70) {
      return { text: '报名火热', color: 'text-orange-500' };
    } else {
      return { text: '报名中', color: 'text-green-600' };
    }
  };
  
  const status = getRegistrationStatus();
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const isUpcoming = startDate > new Date();
  
  return (
    <div className="bg-white">
      {/* 事件头部 */}
      <div className="relative">
        <div className="h-96 w-full relative">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="inline-block px-3 py-1 rounded-full bg-gray-800 text-xs font-medium mb-4">
              {getEventTypeLabel(event.type)}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(event.startDate)} - {formatDate(event.endDate)}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>主办方: {event.organizer}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 事件内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 左侧内容 */}
          <div className="lg:col-span-2">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-6">活动详情</h2>
              <p className="text-gray-700 text-lg">{event.description}</p>
              
              <div className="my-12">
                <h3 className="text-xl font-bold mb-4">活动亮点</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-800 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>汇集国内外知名设计师最新作品，展示潮流文化前沿趋势</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-800 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>限量版潮玩首发，参展即有机会获得独家收藏品</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-800 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>设计师现场互动环节，深入了解创作背后的故事</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-800 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>会员专享VIP预览时段，提前体验全部展品</span>
                  </li>
                </ul>
              </div>
              
              <div className="my-12">
                <h3 className="text-xl font-bold mb-4">参展须知</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-800 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>请提前在线注册，现场出示电子票或确认码</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-800 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>展览期间禁止使用闪光灯拍照，部分展品可能不允许拍照</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-800 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>会员可享优先入场和专属休息区服务</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-gray-800 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>展馆内提供免费WiFi和寄存服务</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* 右侧边栏 */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">活动状态</span>
                  <span className={`text-sm font-medium ${status.color}`}>{status.text}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-800 h-2 rounded-full" 
                    style={{ width: `${Math.min(100, Math.round((event.registered / event.capacity) * 100))}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>已报名: {event.registered}</span>
                  <span>总名额: {event.capacity}</span>
                </div>
              </div>
              
              {event.memberOnly && (
                <div className="mb-6 p-3 bg-gray-100 rounded-md border-l-4 border-gray-800">
                  <div className="flex items-center text-sm">
                    <svg className="w-5 h-5 text-gray-800 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">会员专属活动</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">活动时间</p>
                    <p className="text-sm text-gray-500">{formatDate(event.startDate)}</p>
                    <p className="text-sm text-gray-500">至 {formatDate(event.endDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">活动地点</p>
                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                </div>
              </div>
              
              {isUpcoming && (
                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={isRegistering || isRegistered}
                  className={`w-full py-3 px-4 rounded-md font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                    isRegistered
                      ? 'bg-gray-100 text-gray-800 border border-gray-300'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {isRegistering ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      处理中...
                    </span>
                  ) : isRegistered ? (
                    '已报名'
                  ) : (
                    '立即报名'
                  )}
                </button>
              )}
              
              {!isUpcoming && (
                <div className="text-center p-3 bg-gray-100 rounded-md">
                  <p className="text-gray-500 text-sm">活动已结束</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* 登录提示 */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium mb-4">需要登录</h3>
            <p className="text-gray-600 mb-6">请先登录后再报名参加活动</p>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowLoginPrompt(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                取消
              </button>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-md"
              >
                去登录
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* 会员提示 */}
      {showMembershipPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium mb-4">会员专属活动</h3>
            <p className="text-gray-600 mb-6">此活动仅对会员开放，请先成为会员</p>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowMembershipPrompt(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                取消
              </button>
              <Link
                href="/membership"
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-md"
              >
                了解会员
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
