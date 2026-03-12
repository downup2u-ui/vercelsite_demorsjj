"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

// 充值套餐
const rechargePlans = [
  {
    id: '1',
    amount: 50,
    points: 500,
    bonus: 0,
    popular: false,
  },
  {
    id: '2',
    amount: 100,
    points: 1000,
    bonus: 100,
    popular: true,
  },
  {
    id: '3',
    amount: 200,
    points: 2000,
    bonus: 300,
    popular: false,
  },
  {
    id: '4',
    amount: 500,
    points: 5000,
    bonus: 1000,
    popular: false,
  },
];

export default function PointsRechargePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState<number>(0);
  const [isCustom, setIsCustom] = useState(false);
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
  
  // 处理充值
  const handleRecharge = () => {
    if ((!selectedPlan && !isCustom) || (isCustom && customAmount <= 0)) return;
    
    setIsProcessing(true);
    
    // 模拟充值处理
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };
  
  // 获取充值金额
  const getRechargeAmount = () => {
    if (isCustom) {
      return customAmount;
    }
    
    if (!selectedPlan) return 0;
    
    const plan = rechargePlans.find(p => p.id === selectedPlan);
    return plan ? plan.amount : 0;
  };
  
  // 获取充值积分
  const getRechargePoints = () => {
    if (isCustom) {
      return customAmount * 10;
    }
    
    if (!selectedPlan) return 0;
    
    const plan = rechargePlans.find(p => p.id === selectedPlan);
    return plan ? plan.points + (plan.bonus || 0) : 0;
  };
  
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {!isSuccess ? (
            <>
              <h1 className="text-3xl font-serif mb-8 text-center">积分充值</h1>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
                <div className="flex items-center mb-6">
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
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500 mb-2">充值说明</p>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    <li>充值比例为1元 = 10积分</li>
                    <li>部分充值套餐包含额外赠送积分</li>
                    <li>充值积分有效期为24个月</li>
                    <li>充值成功后积分将立即到账</li>
                  </ul>
                </div>
              </div>
              
              <h2 className="text-xl font-medium mb-6">选择充值套餐</h2>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-8">
                {rechargePlans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      setIsCustom(false);
                    }}
                    className={`relative border rounded-lg p-4 cursor-pointer ${
                      selectedPlan === plan.id && !isCustom
                        ? 'border-indigo-500 ring-2 ring-indigo-500'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        推荐
                      </span>
                    )}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">¥{plan.amount}</p>
                        <p className="text-sm text-gray-500">
                          {plan.points} 积分
                          {plan.bonus > 0 && <span className="text-red-500"> + {plan.bonus} 赠送</span>}
                        </p>
                      </div>
                      <div className="h-5 w-5 border border-gray-300 rounded-full flex items-center justify-center">
                        {selectedPlan === plan.id && !isCustom && (
                          <div className="h-3 w-3 bg-indigo-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div
                  onClick={() => {
                    setIsCustom(true);
                    setSelectedPlan(null);
                  }}
                  className={`border rounded-lg p-4 cursor-pointer ${
                    isCustom
                      ? 'border-indigo-500 ring-2 ring-indigo-500'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">自定义金额</p>
                    <div className="h-5 w-5 border border-gray-300 rounded-full flex items-center justify-center">
                      {isCustom && <div className="h-3 w-3 bg-indigo-600 rounded-full"></div>}
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">¥</span>
                      <input
                        type="number"
                        min="1"
                        value={customAmount || ''}
                        onChange={(e) => setCustomAmount(parseInt(e.target.value) || 0)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="输入金额"
                        disabled={!isCustom}
                      />
                    </div>
                    {isCustom && customAmount > 0 && (
                      <p className="text-sm text-gray-500 mt-2">
                        可获得 {customAmount * 10} 积分
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
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
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">充值金额</p>
                  <p className="text-xl font-medium">¥{getRechargeAmount()}</p>
                </div>
                
                <button
                  type="button"
                  onClick={handleRecharge}
                  disabled={isProcessing || (!selectedPlan && (!isCustom || customAmount <= 0))}
                  className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm ${
                    isProcessing || (!selectedPlan && (!isCustom || customAmount <= 0))
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
                >
                  {isProcessing ? '处理中...' : '立即充值'}
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
              <h1 className="text-3xl font-serif mb-4">充值成功</h1>
              <p className="text-gray-500 mb-2">
                您已成功充值 ¥{getRechargeAmount()}
              </p>
              <p className="text-gray-500 mb-8">
                获得 {getRechargePoints()} 积分，积分将在24小时内到账
              </p>
              <div className="flex flex-col space-y-4">
                <Link
                  href="/points"
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  查看积分明细
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
