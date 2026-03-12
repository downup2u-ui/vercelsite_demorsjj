"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { spaces } from '@/data/spaces';

// 定义时间段类型
interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

// 生成时间段
function generateTimeSlots(date: string, bookings: any[] = []): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9:00 开始
  const endHour = 22; // 22:00 结束
  
  // 将预订信息转换为不可用时间段
  const bookedSlots = bookings
    .filter(booking => booking.date === date)
    .map(booking => ({
      start: parseInt(booking.startTime.split(':')[0]),
      end: parseInt(booking.endTime.split(':')[0])
    }));
  
  // 生成所有时间段
  for (let hour = startHour; hour < endHour; hour++) {
    const startTime = `${hour}:00`;
    const endTime = `${hour + 1}:00`;
    
    // 检查该时间段是否被预订
    const isBooked = bookedSlots.some(
      slot => hour >= slot.start && hour < slot.end
    );
    
    slots.push({
      startTime,
      endTime,
      available: !isBooked
    });
  }
  
  return slots;
}

export default function SpaceDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const spaceId = params?.id?.toString() || '';
  const selectedDate = searchParams.get('date') || new Date().toISOString().split('T')[0];
  
  const [space, setSpace] = useState<any>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // 加载空间数据
  useEffect(() => {
    if (!spaceId) {
      console.error('空间ID未提供');
      router.push('/spaces');
      return;
    }
    
    const foundSpace = spaces.find(s => s.id === spaceId);
    if (foundSpace) {
      setSpace(foundSpace);
    } else {
      console.error(`未找到ID为 ${spaceId} 的空间`);
      // 空间不存在，重定向到空间列表页
      router.push('/spaces');
    }
  }, [spaceId, router]);
  
  // 根据选择的日期生成时间段
  useEffect(() => {
    if (space && space.bookings) {
      setTimeSlots(generateTimeSlots(selectedDate, space.bookings));
    }
  }, [selectedDate, space]);
  
  // 选择/取消选择时间段
  const toggleTimeSlot = (index: number) => {
    // 如果时间段不可用，不做任何操作
    if (!timeSlots[index].available) return;
    
    // 检查是否已选择
    if (selectedSlots.includes(index)) {
      // 取消选择
      setSelectedSlots(selectedSlots.filter(i => i !== index));
    } else {
      // 检查是否与已选时间段连续
      if (selectedSlots.length === 0 || 
          selectedSlots.includes(index - 1) || 
          selectedSlots.includes(index + 1)) {
        // 检查是否超过最大预约时长（4小时）
        if (selectedSlots.length < 4) {
          setSelectedSlots([...selectedSlots, index].sort((a, b) => a - b));
        } else {
          alert('最多只能预约连续4小时');
        }
      } else {
        alert('请选择连续的时间段');
      }
    }
  };
  
  // 计算总价
  const calculateTotalPrice = () => {
    if (!space) return 0;
    return selectedSlots.length * space.hourlyRate;
  };
  
  // 提交预约
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSlots.length === 0) {
      alert('请至少选择一个时间段');
      return;
    }
    
    if (!name || !phone || !email) {
      alert('请填写必要的联系信息');
      return;
    }
    
    setIsSubmitting(true);
    
    // 模拟提交预约
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);
      
      // 清空表单
      setSelectedSlots([]);
      setName('');
      setPhone('');
      setEmail('');
      setPurpose('');
    }, 1500);
  };
  
  // 关闭确认对话框
  const closeConfirmation = () => {
    setShowConfirmation(false);
    router.push('/spaces');
  };
  
  // 如果空间数据未加载，显示加载状态
  if (!space) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Link
            href="/spaces"
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回空间列表
          </Link>
        </div>
        
        {/* 空间详情 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 左侧：空间信息 */}
          <div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={space.image}
                alt={space.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {space.vipOnly && (
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 text-sm font-bold rounded-md">
                  会员专享
                </div>
              )}
            </div>
            
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">{space.name}</h1>
            
            <div className="mt-2 flex items-center">
              <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                {space.type === 'meeting' ? '会议室' : 
                 space.type === 'studio' ? '工作室' : 
                 space.type === 'exhibition' ? '展览空间' : '工作台'}
              </span>
              <span className="ml-3 text-lg font-semibold text-indigo-600">¥{space.hourlyRate}/小时</span>
            </div>
            
            <p className="mt-4 text-base text-gray-600">{space.description}</p>
            
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900">空间设施</h3>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                {space.facilities.map((item: string, index: number) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <svg className="mr-2 h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900">空间信息</h3>
              <dl className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">位置</dt>
                  <dd className="mt-1 text-sm text-gray-900">{space.location}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">容纳人数</dt>
                  <dd className="mt-1 text-sm text-gray-900">{space.capacity} 人</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">会员权益</dt>
                  <dd className="mt-1 text-sm text-gray-900">{space.vipOnly ? '仅限会员' : '会员享8折优惠'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">开放时间</dt>
                  <dd className="mt-1 text-sm text-gray-900">每日 9:00 - 22:00</dd>
                </div>
              </dl>
            </div>
          </div>
          
          {/* 右侧：预约表单 */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">预约信息</h2>
              
              {/* 日期选择 */}
              <div className="mt-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  选择日期
                </label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  onChange={(e) => router.push(`/spaces/${spaceId}?date=${e.target.value}`)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              
              {/* 时间段选择 */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700">选择时间段</h3>
                <p className="mt-1 text-xs text-gray-500">点击选择连续的时间段，最多可预约4小时</p>
                <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => toggleTimeSlot(index)}
                      disabled={!slot.available}
                      className={`px-2 py-3 text-xs sm:text-sm rounded-md text-center ${
                        !slot.available
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : selectedSlots.includes(index)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {slot.startTime} - {slot.endTime}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 预约表单 */}
              <form onSubmit={handleSubmit} className="mt-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      姓名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      手机号码 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      电子邮箱 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                      使用目的
                    </label>
                    <textarea
                      id="purpose"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                {/* 价格计算 */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>小时数</p>
                    <p>{selectedSlots.length} 小时</p>
                  </div>
                  <div className="mt-2 flex justify-between text-base font-medium text-gray-900">
                    <p>单价</p>
                    <p>¥{space.hourlyRate}/小时</p>
                  </div>
                  {space.vipOnly && (
                    <div className="mt-2 flex justify-between text-sm text-gray-500">
                      <p>会员专享</p>
                      <p>仅限会员预约</p>
                    </div>
                  )}
                  {!space.vipOnly && (
                    <div className="mt-2 flex justify-between text-sm text-gray-500">
                      <p>会员折扣</p>
                      <p>会员享8折优惠</p>
                    </div>
                  )}
                  <div className="mt-4 flex justify-between items-center border-t border-gray-200 pt-4 text-lg font-bold text-indigo-600">
                    <p>总价</p>
                    <p>¥{calculateTotalPrice()}</p>
                  </div>
                </div>
                
                {/* 提交按钮 */}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={selectedSlots.length === 0 || isSubmitting}
                    className={`w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                      selectedSlots.length === 0 || isSubmitting
                        ? 'bg-indigo-300 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-500'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex justify-center items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        处理中...
                      </span>
                    ) : (
                      '提交预约'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* 预约确认对话框 */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-center text-gray-900">预约成功</h3>
              <p className="mt-2 text-sm text-center text-gray-500">
                您已成功预约{space.name}，我们将发送确认邮件至您的邮箱。
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={closeConfirmation}
                  className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  返回空间列表
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
