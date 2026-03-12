'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { exhibitions } from '@/data/commerceData';

export default function ExhibitionsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [filter, setFilter] = useState('all'); // all, online, offline, members

  // 根据筛选条件过滤展览
  const filteredExhibitions = exhibitions.filter(exhibition => {
    if (filter === 'all') return true;
    if (filter === 'online') return exhibition.type === 'online';
    if (filter === 'offline') return exhibition.type === 'offline';
    if (filter === 'members') return exhibition.isMembersOnly;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 筛选选项 */}
      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
        >
          全部展览
        </button>
        <button 
          onClick={() => setFilter('online')}
          className={`px-4 py-2 rounded-md ${filter === 'online' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
        >
          线上展览
        </button>
        <button 
          onClick={() => setFilter('offline')}
          className={`px-4 py-2 rounded-md ${filter === 'offline' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
        >
          线下展览
        </button>
        <button 
          onClick={() => setFilter('members')}
          className={`px-4 py-2 rounded-md ${filter === 'members' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
        >
          会员专享
        </button>
      </div>

      {/* 展览列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredExhibitions.map((exhibition) => (
          <Link href={`/exhibitions/${exhibition.id}`} key={exhibition.id}>
            <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition group">
              <div className="relative h-48 w-full">
                <Image
                  src={exhibition.coverImage}
                  alt={exhibition.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition duration-300"
                />
                {exhibition.isMembersOnly && (
                  <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                    会员专享
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">{exhibition.title}</h3>
                  <p className="text-white text-sm">
                    {exhibition.type === 'online' ? '线上展览' : '线下展览'} · {exhibition.startDate} - {exhibition.endDate}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 line-clamp-2 mb-4">{exhibition.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {exhibition.views}
                    </span>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {exhibition.likes}
                    </span>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {exhibition.comments}
                    </span>
                  </div>
                  <span className="text-indigo-600 font-medium">查看详情</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 数据分析与统计 */}
      <section className="mt-16 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">展览数据分析</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">总展览数</p>
            <p className="text-3xl font-bold">{exhibitions.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">线上展览</p>
            <p className="text-3xl font-bold">{exhibitions.filter(e => e.type === 'online').length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">线下展览</p>
            <p className="text-3xl font-bold">{exhibitions.filter(e => e.type === 'offline').length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">会员专享</p>
            <p className="text-3xl font-bold">{exhibitions.filter(e => e.isMembersOnly).length}</p>
          </div>
        </div>
      </section>

      {/* 跨平台推广 */}
      <section className="mt-16 mb-12">
        <h2 className="text-2xl font-bold mb-6">跨平台作品推广</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">社交媒体分享</h3>
            <p className="text-gray-600 mb-4">一键分享作品到微信、微博、抖音等社交平台，扩大作品影响力。</p>
            <button className="text-indigo-600 font-medium">了解更多</button>
          </div>
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">版权保护</h3>
            <p className="text-gray-600 mb-4">作品自动获得版权保护，防止未授权使用，保障创作者权益。</p>
            <button className="text-indigo-600 font-medium">了解更多</button>
          </div>
          <div className="border border-gray-200 p-6 rounded-lg">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">全球展示</h3>
            <p className="text-gray-600 mb-4">作品可被推荐到国际设计平台，获得全球曝光和合作机会。</p>
            <button className="text-indigo-600 font-medium">了解更多</button>
          </div>
        </div>
      </section>

      {/* 相关功能链接 */}
      <section className="mt-16 mb-12 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">相关功能</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          
          <Link href="/auctions" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
            <h3 className="text-lg font-semibold mb-2">艺术品拍卖</h3>
            <p className="text-gray-600 mb-4">参与线上拍卖，收藏珍贵艺术品，发现独特创意</p>
            <span className="text-indigo-600 font-medium flex items-center">
              前往拍卖系统
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
