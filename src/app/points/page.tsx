"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

// 模拟积分历史记录
const mockPointsHistory = [
  {
    id: '1',
    type: 'earn',
    amount: 100,
    description: '会员每月赠送',
    date: '2025-03-01',
  },
  {
    id: '2',
    type: 'spend',
    amount: 50,
    description: '兑换优惠券',
    date: '2025-03-10',
  },
  {
    id: '3',
    type: 'earn',
    amount: 200,
    description: '完成设计挑战',
    date: '2025-03-15',
  },
  {
    id: '4',
    type: 'earn',
    amount: 30,
    description: '每日登录奖励',
    date: '2025-03-20',
  },
  {
    id: '5',
    type: 'spend',
    amount: 150,
    description: '兑换3D打印服务',
    date: '2025-03-25',
  },
];

// 积分兑换商品
const redeemItems = [
  {
    id: '1',
    name: '3D打印服务抵扣券',
    points: 200,
    image: '/images/redeem/print-coupon.jpg',
    description: '可抵扣任意3D打印服务费用50元',
  },
  {
    id: '2',
    name: '设计工具会员月卡',
    points: 500,
    image: '/images/redeem/design-tool.jpg',
    description: '获得指定设计工具一个月会员资格',
  },
  {
    id: '3',
    name: '限量版创意手办',
    points: 1000,
    image: '/images/redeem/figurine.jpg',
    description: '平台原创设计的限量版手办',
  },
  {
    id: '4',
    name: 'NFT铸造服务',
    points: 2000,
    image: '/images/redeem/nft.jpg',
    description: '将您的一件作品铸造为NFT',
  },
];

export default function PointsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  
  // 如果用户未登录，重定向到登录页面
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
  
  if (!user) {
    return null; // 等待重定向
  }
  
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif mb-8">积分中心</h1>
          
          {/* 积分概览 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">当前积分</p>
                  <p className="text-3xl font-medium">{user.points}</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Link
                  href="/points/recharge"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  积分充值
                </Link>
                <Link
                  href="/points/exchange"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  积分兑换
                </Link>
              </div>
            </div>
          </div>
          
          {/* 选项卡导航 */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`${
                  activeTab === 'overview'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                积分概览
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`${
                  activeTab === 'history'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                积分明细
              </button>
              <button
                onClick={() => setActiveTab('redeem')}
                className={`${
                  activeTab === 'redeem'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                积分兑换
              </button>
              <button
                onClick={() => setActiveTab('rules')}
                className={`${
                  activeTab === 'rules'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                积分规则
              </button>
            </nav>
          </div>
          
          {/* 积分概览 */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">积分获取途径</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">每日登录奖励 (10积分/天)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">VIP会员每月赠送 (100积分/月)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">完成设计挑战 (50-200积分/次)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">分享作品被点赞 (5积分/次)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">积分充值 (1元=10积分)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">积分使用方式</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span className="text-gray-600">兑换优惠券</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span className="text-gray-600">兑换3D打印服务</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span className="text-gray-600">兑换设计工具会员</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span className="text-gray-600">兑换限量版周边</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span className="text-gray-600">NFT铸造服务</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">最近积分活动</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          日期
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          类型
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          描述
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          积分变动
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockPointsHistory.slice(0, 3).map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.type === 'earn' ? '获取' : '消费'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.description}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                            item.type === 'earn' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {item.type === 'earn' ? '+' : '-'}{item.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => setActiveTab('history')}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    查看全部记录 →
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* 积分明细 */}
          {activeTab === 'history' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {mockPointsHistory.map((item) => (
                  <li key={item.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                            item.type === 'earn' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {item.type === 'earn' ? (
                              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            ) : (
                              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.description}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.date}
                            </div>
                          </div>
                        </div>
                        <div className={`text-sm font-medium ${
                          item.type === 'earn' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.type === 'earn' ? '+' : '-'}{item.amount}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* 积分兑换 */}
          {activeTab === 'redeem' && (
            <div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                {redeemItems.map((item) => (
                  <div key={item.id} className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="relative h-48 w-full">
                      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                        <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {item.points} 积分
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                      <div className="mt-4">
                        <button
                          type="button"
                          disabled={user.points < item.points}
                          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${
                            user.points >= item.points
                              ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                              : 'text-gray-400 bg-gray-200 cursor-not-allowed'
                          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                          {user.points >= item.points ? '立即兑换' : '积分不足'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 积分规则 */}
          {activeTab === 'rules' && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">积分规则说明</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  了解积分获取、使用和有效期等相关规则
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">积分获取</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>每日登录奖励：每天首次登录平台可获得10积分</li>
                        <li>VIP会员福利：VIP会员每月自动获得100积分</li>
                        <li>设计挑战：参与并完成平台发布的设计挑战可获得50-200不等的积分</li>
                        <li>作品互动：您的作品每获得一个点赞，您将获得5积分</li>
                        <li>积分充值：可以通过充值获得积分，比例为1元=10积分</li>
                      </ul>
                    </dd>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">积分使用</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>积分可用于兑换平台内各类优惠券、服务和实物礼品</li>
                        <li>部分高级功能和服务可使用积分解锁或抵扣费用</li>
                        <li>积分兑换后不支持退回或取消</li>
                        <li>特定活动期间可能会推出限时兑换商品</li>
                      </ul>
                    </dd>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">积分有效期</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>通过日常活动获得的积分有效期为获取日起12个月</li>
                        <li>通过充值获得的积分有效期为24个月</li>
                        <li>会员赠送的积分有效期与会员有效期一致</li>
                        <li>积分将按照先到期先扣除的原则进行使用</li>
                        <li>积分到期前一个月，系统会通过站内信和邮件提醒用户</li>
                      </ul>
                    </dd>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">其他说明</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>平台保留对积分规则进行调整和解释的权利</li>
                        <li>如发现用户通过不正当手段获取积分，平台有权取消相关积分并追究责任</li>
                        <li>积分不可转让、不可提现</li>
                        <li>如有任何疑问，请联系客服</li>
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
