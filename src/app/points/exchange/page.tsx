"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

// 积分兑换商品
const redeemItems = [
  {
    id: '1',
    name: '3D打印服务抵扣券',
    points: 200,
    image: '/images/placeholder.jpg',
    description: '可抵扣任意3D打印服务费用50元',
    category: 'coupon',
    stock: 999,
  },
  {
    id: '2',
    name: '设计工具会员月卡',
    points: 500,
    image: '/images/placeholder.jpg',
    description: '获得指定设计工具一个月会员资格',
    category: 'service',
    stock: 999,
  },
  {
    id: '3',
    name: '限量版创意手办',
    points: 1000,
    image: '/images/placeholder.jpg',
    description: '平台原创设计的限量版手办',
    category: 'physical',
    stock: 50,
  },
  {
    id: '4',
    name: 'NFT铸造服务',
    points: 2000,
    image: '/images/placeholder.jpg',
    description: '将您的一件作品铸造为NFT',
    category: 'service',
    stock: 100,
  },
  {
    id: '5',
    name: '创意设计课程',
    points: 800,
    image: '/images/placeholder.jpg',
    description: '由平台签约设计师授课的专业设计课程',
    category: 'service',
    stock: 20,
  },
  {
    id: '6',
    name: '定制T恤',
    points: 1500,
    image: '/images/placeholder.jpg',
    description: '使用您的设计定制高质量T恤一件',
    category: 'physical',
    stock: 30,
  },
  {
    id: '7',
    name: '设计咨询服务',
    points: 1200,
    image: '/images/placeholder.jpg',
    description: '1小时专业设计师一对一咨询服务',
    category: 'service',
    stock: 10,
  },
  {
    id: '8',
    name: '会员月卡',
    points: 1800,
    image: '/images/placeholder.jpg',
    description: '兑换一个月VIP会员资格',
    category: 'membership',
    stock: 999,
  },
];

export default function PointsExchangePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // 如果用户未登录，重定向到登录页面
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
  
  if (!user) {
    return null; // 等待重定向
  }
  
  // 根据分类筛选商品
  const filteredItems = activeCategory === 'all' 
    ? redeemItems 
    : redeemItems.filter(item => item.category === activeCategory);
  
  // 获取选中的商品
  const getSelectedItemDetails = () => {
    return redeemItems.find(item => item.id === selectedItem);
  };
  
  // 处理兑换确认
  const handleConfirmExchange = () => {
    setIsProcessing(true);
    
    // 模拟兑换处理
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmModal(false);
      setIsSuccess(true);
    }, 1500);
  };
  
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {!isSuccess ? (
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-serif mb-8">积分兑换</h1>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">当前积分</p>
                  <p className="text-2xl font-medium">{user.points}</p>
                </div>
              </div>
              
              <Link
                href="/points/recharge"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                积分充值
              </Link>
            </div>
            
            {/* 分类筛选 */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`${
                    activeCategory === 'all'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  全部
                </button>
                <button
                  onClick={() => setActiveCategory('coupon')}
                  className={`${
                    activeCategory === 'coupon'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  优惠券
                </button>
                <button
                  onClick={() => setActiveCategory('service')}
                  className={`${
                    activeCategory === 'service'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  服务
                </button>
                <button
                  onClick={() => setActiveCategory('physical')}
                  className={`${
                    activeCategory === 'physical'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  实物
                </button>
                <button
                  onClick={() => setActiveCategory('membership')}
                  className={`${
                    activeCategory === 'membership'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  会员
                </button>
              </nav>
            </div>
            
            {/* 商品列表 */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="relative h-48 w-full bg-gray-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    {item.stock <= 20 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        库存紧张
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {item.points} 积分
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{item.description}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedItem(item.id);
                        setShowConfirmModal(true);
                      }}
                      disabled={user.points < item.points}
                      className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${
                        user.points >= item.points
                          ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                          : 'text-gray-400 bg-gray-200 cursor-not-allowed'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                      {user.points >= item.points ? '立即兑换' : '积分不足'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 兑换确认弹窗 */}
            {showConfirmModal && (
              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                  
                  <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                          确认兑换
                        </h3>
                        
                        {getSelectedItemDetails() && (
                          <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium">{getSelectedItemDetails()?.name}</p>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                {getSelectedItemDetails()?.points} 积分
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">{getSelectedItemDetails()?.description}</p>
                          </div>
                        )}
                        
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            确认使用 {getSelectedItemDetails()?.points} 积分兑换该商品吗？兑换后积分将立即扣除，无法退回。
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                      <button
                        type="button"
                        onClick={handleConfirmExchange}
                        disabled={isProcessing}
                        className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm ${
                          isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                      >
                        {isProcessing ? '处理中...' : '确认兑换'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowConfirmModal(false)}
                        disabled={isProcessing}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-lg mx-auto text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-serif mb-4">兑换成功</h1>
            <p className="text-gray-500 mb-2">
              您已成功兑换 {getSelectedItemDetails()?.name}
            </p>
            <p className="text-gray-500 mb-8">
              消耗 {getSelectedItemDetails()?.points} 积分
            </p>
            
            {getSelectedItemDetails()?.category === 'physical' && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      请前往"个人中心-我的订单"完善收货信息，以便我们尽快为您发货。
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {getSelectedItemDetails()?.category === 'service' && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      服务兑换券已发放到您的账户，请前往"个人中心-我的服务"查看使用方法。
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-col space-y-4">
              <Link
                href="/points"
                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                查看积分明细
              </Link>
              <Link
                href="/points/exchange"
                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                继续兑换
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
