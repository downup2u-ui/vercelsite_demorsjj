"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { artworks } from '@/data/artworks';
import { categories } from '@/data/categories';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = decodeURIComponent(params.category as string);
  
  const [selectedDesigner, setSelectedDesigner] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showOverview, setShowOverview] = useState<boolean>(false);

  // 获取当前行业信息
  const categoryInfo = categories.find(cat => cat.id === categoryId);

  // 过滤当前行业的作品
  const categoryArtworks = artworks.filter(artwork => 
    artwork.category.includes(categoryId)
  );

  // 过滤当前选中设计师的作品
  const filteredArtworks = categoryArtworks.filter((artwork) => {
    // 根据设计师过滤
    const designerMatch = selectedDesigner === 'all' || artwork.creator === selectedDesigner;
    
    // 根据搜索词过滤
    const searchMatch = 
      searchTerm === '' || 
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return designerMatch && searchMatch;
  });

  // 获取该行业的所有设计师
  // 优先使用 categoryInfo.designers（如果存在），否则从作品中提取设计师信息
  const designerList = categoryInfo?.designers || categoryArtworks.map(artwork => artwork.creator);
  const designers = ['all', ...new Set(designerList)].sort();

  // 如果找不到该分类，显示错误信息
  if (!categoryInfo) {
    return (
      <div className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">未找到该行业</h1>
          <p className="text-lg text-gray-600 mb-8">抱歉，我们找不到"{categoryId}"行业的相关信息</p>
          <Link href="/artworks" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            返回作品列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* 行业头部信息 */}
      <div className="relative">
        {categoryInfo.heroImage && (
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={categoryInfo.heroImage}
              alt={categoryInfo.name}
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/60 to-white" />
          </div>
        )}
        
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            {categoryInfo.name}
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-700">
            {categoryInfo.description}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
        {/* 主要内容区：设计师列表和作品列表 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* 设计师列表 */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">设计师</h2>
                <p className="text-sm text-gray-600">{designers.length - 1} 位设计师</p>
              </div>
              
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <div 
                  className={`p-4 rounded-lg transition-all cursor-pointer ${
                    selectedDesigner === 'all'
                      ? 'bg-gray-100 border-2 border-gray-800'
                      : 'bg-white hover:bg-gray-50 border border-gray-200'
                  }`}
                  onClick={() => setSelectedDesigner('all')}
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-white mr-3">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">全部设计师</h3>
                      <p className="text-sm text-gray-500">{categoryArtworks.length} 件作品</p>
                    </div>
                  </div>
                </div>
                
                {designers.filter(d => d !== 'all').map((designer) => (
                  <div 
                    key={designer}
                    className={`p-4 rounded-lg transition-all cursor-pointer ${
                      selectedDesigner === designer
                        ? 'bg-gray-100 border-2 border-gray-800'
                        : 'bg-white hover:bg-gray-50 border border-gray-200'
                    }`}
                    onClick={() => setSelectedDesigner(designer)}
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold mr-3">
                        {designer.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-gray-900">{designer}</h3>
                        <p className="text-sm text-gray-500">
                          {categoryArtworks.filter(a => a.creator === designer).length} 件作品
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 作品列表 */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">作品展示</h2>
              
              {/* 搜索框 */}
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="搜索作品..."
                  className="block w-full rounded-md border-0 py-2 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* 作品网格 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
              {filteredArtworks.length > 0 ? (
                filteredArtworks.map((artwork) => (
                  <article key={artwork.id} className="flex flex-col items-start">
                    <div className="relative w-full">
                      <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[3/2] relative">
                        {artwork.image ? (
                          <Image
                            src={artwork.image}
                            alt={artwork.title}
                            fill
                            className="rounded-2xl object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="h-full w-full rounded-2xl bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">{artwork.title}</span>
                          </div>
                        )}
                      </div>
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="max-w-xl">
                      <div className="mt-8 flex items-center gap-x-4 text-xs">
                        <time dateTime={artwork.createdAt} className="text-gray-500">
                          {new Date(artwork.createdAt).toLocaleDateString('zh-CN')}
                        </time>
                        <Link 
                          href={`/categories/${encodeURIComponent(artwork.category.filter(cat => cat !== categoryId)[0] || categoryId)}`}
                          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                        >
                          {artwork.category.filter(cat => cat !== categoryId)[0] || categoryId}
                        </Link>
                      </div>
                      <div className="group relative">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <Link href={`/artworks/${artwork.id}`}>
                            <span className="absolute inset-0" />
                            {artwork.title}
                          </Link>
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{artwork.description}</p>
                      </div>
                      <div className="relative mt-8 flex items-center gap-x-4">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold">
                          {artwork.creator.charAt(0)}
                        </div>
                        <div className="text-sm leading-6">
                          <p className="font-semibold text-gray-900">
                            <span className="absolute inset-0" />
                            {artwork.creator}
                          </p>
                          <p className="text-gray-600">{artwork.hasNFT ? 'NFT已铸造' : '未铸造NFT'}</p>
                        </div>
                        <div className="ml-auto flex items-center gap-x-2 text-sm text-gray-500">
                          <span className="flex items-center gap-x-1">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {artwork.likes}
                          </span>
                          <span className="flex items-center gap-x-1">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {artwork.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">未找到符合条件的作品</h3>
                  <p className="mt-1 text-sm text-gray-500">请尝试其他搜索条件或选择不同的设计师</p>
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        setSelectedDesigner('all');
                        setSearchTerm('');
                      }}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      重置筛选条件
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 概览切换按钮 */}
        <div className="border-t border-b border-gray-200 mb-8">
          <button
            onClick={() => setShowOverview(!showOverview)}
            className="flex items-center gap-2 py-4 px-1 text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            {showOverview ? (
              <>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                收起行业概览
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                展开行业概览
              </>
            )}
          </button>
        </div>

        {/* 行业概览 */}
        {showOverview && (
          <div className="py-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">行业介绍</h2>
                <p className="text-lg text-gray-700 mb-8">
                  {categoryInfo.introduction}
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">应用场景</h3>
                <ul className="space-y-4 mb-8">
                  {categoryInfo.applications.map((app, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 mr-3">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{app}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">行业趋势</h3>
                <ul className="space-y-4 mb-8">
                  {categoryInfo.trends.map((trend, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 mr-3">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                      </span>
                      <span className="text-gray-700">{trend}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">关键技术</h3>
                  <div className="space-y-3">
                    {categoryInfo.keyTechnologies.map((tech, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div className="text-gray-700">{tech}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">作品统计</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">作品数量</span>
                        <span className="font-medium">{categoryArtworks.length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${Math.min(100, categoryArtworks.length/2)}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">设计师数量</span>
                        <span className="font-medium">{designers.length - 1}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${Math.min(100, (designers.length-1)*10)}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">可打印作品比例</span>
                        <span className="font-medium">
                          {Math.round(categoryArtworks.filter(a => a.printable).length / categoryArtworks.length * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ 
                          width: `${Math.round(categoryArtworks.filter(a => a.printable).length / categoryArtworks.length * 100)}%` 
                        }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
