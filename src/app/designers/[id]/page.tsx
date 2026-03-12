"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { designers, Designer } from '@/data/designers';
import { artworks } from '@/data/artworks';
import { categoryUtils } from '@/data/categories';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';

export default function DesignerDetailPage() {
  const params = useParams();
  const [designer, setDesigner] = useState<Designer | null>(null);
  const [designerArtworks, setDesignerArtworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (params.id) {
      const designerId = Array.isArray(params.id) ? params.id[0] : params.id;
      const foundDesigner = designers.find(d => d.id === designerId);
      
      if (foundDesigner) {
        setDesigner(foundDesigner);
        
        // 获取设计师的作品
        const works = artworks.filter(artwork => artwork.creatorId === designerId);
        setDesignerArtworks(works);
      }
      
      setLoading(false);
    }
  }, [params.id]);
  
  // 按分类分组作品
  const getArtworksByCategory = () => {
    const groupedWorks: { [key: string]: any[] } = {};
    
    designerArtworks.forEach(artwork => {
      if (artwork.category && artwork.category.length > 0) {
        // 使用最具体的分类（通常是最后一个）
        const mainCategory = artwork.category[artwork.category.length - 1];
        const categoryName = categoryUtils.getCategoryName(mainCategory);
        
        if (!groupedWorks[categoryName]) {
          groupedWorks[categoryName] = [];
        }
        
        groupedWorks[categoryName].push(artwork);
      }
    });
    
    return groupedWorks;
  };
  
  // 渲染作品卡片
  const renderArtworkCard = (artwork: any) => (
    <Card key={artwork.id} href={`/artworks/${artwork.id}`} interactive className="group h-full flex flex-col">
      <div className="aspect-square w-full relative overflow-hidden rounded-lg bg-gray-100 mb-4">
        {artwork.image && (
          <Image
            src={artwork.image}
            alt={artwork.title || '作品'}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{artwork.title || '无标题'}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{artwork.description || ''}</p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-3">
            {artwork.tags && artwork.tags.length > 0 && artwork.tags.slice(0, 2).map((tag: string) => (
              <Tag key={tag} className="bg-gray-100 text-gray-800 text-xs">
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }
  
  if (!designer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">未找到设计师</h1>
        <p className="text-gray-600 mb-8">抱歉，我们找不到您请求的设计师信息。</p>
        <Link href="/designers" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">
          返回设计师列表
        </Link>
      </div>
    );
  }
  
  const groupedArtworks = getArtworksByCategory();
  
  return (
    <div className="bg-white min-h-screen">
      {/* 设计师个人资料区域 */}
      <div className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* 设计师头像 */}
            <div className="flex-shrink-0">
              {designer.avatar ? (
                <Image
                  src={designer.avatar}
                  alt={designer.name}
                  width={160}
                  height={160}
                  className="rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-md">
                  <span className="text-4xl font-medium text-gray-500">
                    {designer.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            {/* 设计师信息 */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{designer.name}</h1>
                {designer.featured && (
                  <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800">
                    推荐设计师
                  </span>
                )}
              </div>
              
              {designer.location && (
                <p className="text-gray-600 mb-4">
                  <span className="inline-flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {designer.location}
                  </span>
                </p>
              )}
              
              <p className="text-gray-700 mb-6 max-w-3xl">{designer.bio}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {designer.specialties.map((specialty) => (
                  <Tag key={specialty} className="bg-gray-100 text-gray-800">
                    {specialty}
                  </Tag>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm">
                {designer.contactEmail && (
                  <a href={`mailto:${designer.contactEmail}`} className="text-gray-600 hover:text-black flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {designer.contactEmail}
                  </a>
                )}
                
                {designer.website && (
                  <a href={designer.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                    </svg>
                    个人网站
                  </a>
                )}
                
                {designer.social && designer.social.weibo && (
                  <a href={`https://weibo.com/${designer.social.weibo.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10.098 20c-4.612 0-8.341-2.199-8.341-4.9 0-1.4.858-3.01 2.55-4.4.143-.121.304-.223.466-.316-.018-.168-.025-.336-.025-.504 0-2.871 3.777-5.2 8.443-5.2 4.667 0 8.444 2.329 8.444 5.2 0 .168-.008.336-.025.504.162.093.323.195.466.316 1.692 1.39 2.55 3 2.55 4.4 0 2.701-3.729 4.9-8.341 4.9h-6.187z"/>
                    </svg>
                    微博
                  </a>
                )}
                
                {designer.social && designer.social.instagram && (
                  <a href={`https://instagram.com/${designer.social.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 设计师作品区域 */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">设计师作品</h2>
        
        {Object.keys(groupedArtworks).length > 0 ? (
          <div className="space-y-16">
            {Object.entries(groupedArtworks).map(([category, works]) => (
              <div key={category} className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 border-b pb-2">{category}</h3>
                
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {works.map((artwork) => renderArtworkCard(artwork))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">该设计师暂无作品</p>
          </div>
        )}
      </div>
      
      {/* 返回按钮 */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-12">
        <Link href="/designers" className="inline-flex items-center text-gray-600 hover:text-black">
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回设计师列表
        </Link>
      </div>
    </div>
  );
}
