'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { auctions } from '@/data/commerceData';

export default function AuctionsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [filter, setFilter] = useState('all'); // all, upcoming, active, ended

  // 根据筛选条件过滤拍卖
  const filteredAuctions = auctions.filter(auction => {
    if (filter === 'all') return true;
    return auction.status === filter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 筛选选项 */}
      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
        >
          全部拍卖
        </button>
        <button 
          onClick={() => setFilter('upcoming')}
          className={`px-4 py-2 rounded-md ${filter === 'upcoming' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
        >
          即将开始
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-md ${filter === 'active' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
        >
          正在进行
        </button>
        <button 
          onClick={() => setFilter('ended')}
          className={`px-4 py-2 rounded-md ${filter === 'ended' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
        >
          已结束
        </button>
      </div>

      {/* 拍卖列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAuctions.map((auction) => (
          <Link href={`/auctions/${auction.id}`} key={auction.id}>
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition group">
              <div className="relative h-48 w-full">
                <Image
                  src={auction.coverImage}
                  alt={auction.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium 
                  ${auction.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                    auction.status === 'active' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'}">
                  {auction.status === 'upcoming' ? '即将开始' : 
                   auction.status === 'active' ? '正在进行' : 
                   '已结束'}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">{auction.title}</h3>
                  <p className="text-white text-sm">
                    当前价格: ¥{auction.currentPrice.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 line-clamp-2 mb-4">{auction.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <p className="text-gray-500">
                      {auction.status === 'upcoming' ? '开始时间' : 
                       auction.status === 'active' ? '结束时间' : 
                       '已结束于'}
                    </p>
                    <p className="font-medium">
                      {auction.status === 'upcoming' ? new Date(auction.startTime).toLocaleString() : 
                       new Date(auction.endTime).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-sm text-right">
                    <p className="text-gray-500">出价次数</p>
                    <p className="font-medium">{auction.bids.length}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">创建者</span>
                  </div>
                  <span className="text-indigo-600 font-medium text-sm">参与竞拍</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 拍卖规则 */}
      <section className="mt-16 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">拍卖规则</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">竞拍规则</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600">每件拍品设有起拍价，首次出价不得低于起拍价</p>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600">每次加价不得低于拍品设定的最小加价幅度</p>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600">拍卖结束前5分钟内有新出价，拍卖时间自动延长5分钟</p>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600">拍卖结束时，最高出价者获得拍品</p>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">支付与交付</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600">参与竞拍前需缴纳拍品起拍价10%的保证金</p>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600">中标后7天内需完成全额支付，逾期将扣除保证金</p>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600">未中标者的保证金将在拍卖结束后3个工作日内退还</p>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600">支付完成后，平台将协助买卖双方完成作品交付</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 拍卖数据分析 */}
      <section className="mt-16 mb-12">
        <h2 className="text-2xl font-bold mb-6">拍卖数据分析</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-500 text-sm">总拍卖数</p>
            <p className="text-3xl font-bold">{auctions.length}</p>
            <div className="mt-2 h-1 w-full bg-gray-200">
              <div className="h-1 bg-indigo-600" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-500 text-sm">即将开始</p>
            <p className="text-3xl font-bold">{auctions.filter(a => a.status === 'upcoming').length}</p>
            <div className="mt-2 h-1 w-full bg-gray-200">
              <div className="h-1 bg-blue-500" style={{ width: `${auctions.filter(a => a.status === 'upcoming').length / auctions.length * 100}%` }}></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-500 text-sm">正在进行</p>
            <p className="text-3xl font-bold">{auctions.filter(a => a.status === 'active').length}</p>
            <div className="mt-2 h-1 w-full bg-gray-200">
              <div className="h-1 bg-green-500" style={{ width: `${auctions.filter(a => a.status === 'active').length / auctions.length * 100}%` }}></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-500 text-sm">已结束</p>
            <p className="text-3xl font-bold">{auctions.filter(a => a.status === 'ended').length}</p>
            <div className="mt-2 h-1 w-full bg-gray-200">
              <div className="h-1 bg-gray-500" style={{ width: `${auctions.filter(a => a.status === 'ended').length / auctions.length * 100}%` }}></div>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">热门拍卖品</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    拍品名称
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    起拍价
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    当前价格
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    涨幅
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    出价次数
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {auctions
                  .sort((a, b) => b.bids.length - a.bids.length)
                  .slice(0, 5)
                  .map((auction) => (
                    <tr key={auction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {auction.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ¥{auction.startingPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ¥{auction.currentPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {Math.round((auction.currentPrice - auction.startingPrice) / auction.startingPrice * 100)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {auction.bids.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          auction.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                          auction.status === 'active' ? 'bg-green-100 text-green-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {auction.status === 'upcoming' ? '即将开始' : 
                           auction.status === 'active' ? '正在进行' : 
                           '已结束'}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 相关功能链接 */}
      <section className="mt-16 mb-12 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">相关功能</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/exhibitions" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">展览平台</h3>
            <p className="text-gray-600 mb-4">浏览精彩展览，发现艺术灵感，参与艺术活动</p>
            <span className="text-indigo-600 font-medium flex items-center">
              前往展览平台
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>
          
          <Link href="/orders" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">订单管理</h3>
            <p className="text-gray-600 mb-4">管理您的订单，跟踪进度，查看详情</p>
            <span className="text-indigo-600 font-medium flex items-center">
              前往订单管理
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>
          
          <Link href="/crm" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">客户关系管理</h3>
            <p className="text-gray-600 mb-4">管理客户关系，跟踪销售机会，提高客户满意度</p>
            <span className="text-indigo-600 font-medium flex items-center">
              前往CRM系统
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
