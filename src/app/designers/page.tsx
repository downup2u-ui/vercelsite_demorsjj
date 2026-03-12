"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { designers } from '@/data/designers';
import { artworks } from '@/data/artworks';
import { categoryUtils } from '@/data/categories';
import Tag from '@/components/ui/Tag';

export default function DesignersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  
  // 获取所有专长列表
  const allSpecialties = Array.from(
    new Set(
      designers.flatMap(designer => designer.specialties)
    )
  ).sort();
  
  // 过滤设计师
  const filteredDesigners = designers.filter(designer => {
    // 搜索词过滤
    const matchesSearch = searchTerm === '' || 
      designer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      designer.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 专长过滤
    const matchesSpecialty = selectedSpecialty === 'all' || 
      designer.specialties.includes(selectedSpecialty);
    
    return matchesSearch && matchesSpecialty;
  });
  
  // 获取设计师的作品
  const getDesignerArtworks = (designerId: string) => {
    return artworks.filter(artwork => artwork.creatorId === designerId);
  };

  // 渲染作品缩略图
  const renderArtworkThumbnail = (artwork: any) => (
    <Link 
      key={artwork.id} 
      href={`/artworks/${artwork.id}`}
      className="block aspect-square relative overflow-hidden rounded-md bg-gray-100 hover:opacity-90 transition-opacity"
    >
      {artwork.image && (
        <Image
          src={artwork.image}
          alt={artwork.title || '作品'}
          fill
          className="object-cover object-center"
        />
      )}
    </Link>
  );

  // 获取设计师的作品数量
  const getArtworkCount = (designerId: string) => {
    return artworks.filter(artwork => artwork.creatorId === designerId).length;
  };
  
  // 获取设计师的主要分类
  const getDesignerCategories = (designerId: string) => {
    const designerArtworks = artworks.filter(artwork => artwork.creatorId === designerId);
    const categoryIds = Array.from(
      new Set(
        designerArtworks.flatMap(artwork => artwork.category || [])
      )
    );
    
    return categoryIds.map(id => categoryUtils.getCategoryName(id));
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 页面标题区域 */}
      <div className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">设计师</h1>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              探索我们平台上的优秀3D打印设计师及其作品
            </p>
          </div>
        </div>
      </div>
      
      {/* 搜索和过滤区域 */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="w-full sm:w-1/2">
            <label htmlFor="search" className="sr-only">搜索设计师</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border-0 py-3 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                placeholder="搜索设计师名称或简介"
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full sm:w-1/3">
            <label htmlFor="specialty" className="sr-only">按专长筛选</label>
            <select
              id="specialty"
              name="specialty"
              className="block w-full rounded-md border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="all">所有专长</option>
              {allSpecialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* 设计师列表 */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDesigners.map((designer) => (
            <Link 
              key={designer.id} 
              href={`/designers/${designer.id}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 p-6 bg-gray-50">
                {designer.avatar ? (
                  <Image
                    src={designer.avatar}
                    alt={designer.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xl font-medium text-gray-500">
                      {designer.name.charAt(0)}
                    </span>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-black">
                    {designer.name}
                    {designer.featured && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800">
                        推荐
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500">{designer.location || '未知地区'}</p>
                </div>
              </div>
              
              <div className="flex-1 p-6">
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{designer.bio}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {designer.specialties.slice(0, 3).map((specialty) => (
                    <Tag key={specialty} className="bg-gray-100 text-gray-800 text-xs">
                      {specialty}
                    </Tag>
                  ))}
                  {designer.specialties.length > 3 && (
                    <span className="text-xs text-gray-500">+{designer.specialties.length - 3}个专长</span>
                  )}
                </div>
                
                {/* 设计师作品预览 */}
                {getDesignerArtworks(designer.id).length > 0 && (
                  <div className="mt-4 mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">作品预览</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {getDesignerArtworks(designer.id).slice(0, 3).map(artwork => 
                        renderArtworkThumbnail(artwork)
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between text-sm text-gray-500">
                  <span>作品: {getArtworkCount(designer.id)}</span>
                  <span>加入时间: {new Date(designer.joinedAt).getFullYear()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredDesigners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">没有找到符合条件的设计师</p>
          </div>
        )}
      </div>
    </div>
  );
}
