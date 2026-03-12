"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

// 会员套餐数据
const membershipPlans = {
  'regular-monthly': {
    type: 'regular',
    name: '普通会员月卡',
    price: 39,
    period: '月',
    duration: 1, // 月数
  },
  'regular-yearly': {
    type: 'regular',
    name: '普通会员年卡',
    price: 399,
    period: '年',
    duration: 12, // 月数
  },
  'vip-monthly': {
    type: 'vip',
    name: 'VIP会员月卡',
    price: 99,
    period: '月',
    duration: 1, // 月数
  },
  'vip-yearly': {
    type: 'vip',
    name: 'VIP会员年卡',
    price: 999,
    period: '年',
    duration: 12, // 月数
  },
};

function MembershipConfirmationContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // 如果用户未登录，重定向到登录页面
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
  
  // 如果没有选择套餐，重定向到会员页面
  useEffect(() => {
    if (!planId || !membershipPlans[planId as keyof typeof membershipPlans]) {
      router.push('/membership');
    }
  }, [planId, router]);
  
  if (!user || !planId || !membershipPlans[planId as keyof typeof membershipPlans]) {
    return null; // 等待重定向
  }
  
  const selectedPlan = membershipPlans[planId as keyof typeof membershipPlans];
  
  // 处理支付确认
  const handleConfirmPayment = () => {
    setIsProcessing(true);
    
    // 模拟支付处理
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };
  
  // 计算会员到期日期
  const calculateExpiryDate = () => {
    const now = new Date();
    
    // 如果用户已有会员且未过期，从当前到期日开始计算
    if (user.membershipExpiry) {
      const currentExpiry = new Date(user.membershipExpiry);
      if (currentExpiry > now) {
        const newExpiry = new Date(currentExpiry);
        newExpiry.setMonth(newExpiry.getMonth() + selectedPlan.duration);
        return newExpiry.toLocaleDateString('zh-CN');
      }
    }
    
    // 否则从当前日期开始计算
    const newExpiry = new Date();
    newExpiry.setMonth(newExpiry.getMonth() + selectedPlan.duration);
    return newExpiry.toLocaleDateString('zh-CN');
  };
  
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          {!isSuccess ? (
            <>
              <h1 className="text-3xl font-serif mb-8 text-center">会员购买确认</h1>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-medium mb-4">订单详情</h2>
                
                <div className="border-t border-gray-200 pt-4">
                  <dl className="divide-y divide-gray-200">
                    <div className="py-4 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">会员套餐</dt>
                      <dd className="text-sm font-medium text-gray-900">{selectedPlan.name}</dd>
                    </div>
                    <div className="py-4 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">会员类型</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {selectedPlan.type === 'vip' ? 'VIP会员' : '普通会员'}
                      </dd>
                    </div>
                    <div className="py-4 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">有效期</dt>
                      <dd className="text-sm font-medium text-gray-900">{selectedPlan.duration} 个月</dd>
                    </div>
                    <div className="py-4 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">到期日期</dt>
                      <dd className="text-sm font-medium text-gray-900">{calculateExpiryDate()}</dd>
                    </div>
                    <div className="py-4 flex justify-between">
                      <dt className="text-sm font-medium text-gray-500">支付金额</dt>
                      <dd className="text-sm font-medium text-indigo-600">¥{selectedPlan.price}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-medium mb-4">支付方式</h2>
                
                <div className="space-y-4">
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="wechat"
                        name="payment"
                        type="radio"
                        defaultChecked
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="wechat" className="font-medium text-gray-700">
                        微信支付
                      </label>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="alipay"
                        name="payment"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="alipay" className="font-medium text-gray-700">
                        支付宝
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Link
                  href="/membership"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  返回
                </Link>
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isProcessing ? '处理中...' : '确认支付'}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-serif mb-4">支付成功</h1>
              <p className="text-gray-500 mb-8">
                您已成功购买{selectedPlan.name}，有效期至 {calculateExpiryDate()}
              </p>
              <div className="flex flex-col space-y-4">
                <Link
                  href="/profile"
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  查看会员信息
                </Link>
                <Link
                  href="/"
                  className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  返回首页
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MembershipConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <div className="bg-white shadow sm:rounded-lg p-6">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
              <div className="mt-4 text-center text-gray-600">
                正在加载...
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <MembershipConfirmationContent />
    </Suspense>
  );
}
