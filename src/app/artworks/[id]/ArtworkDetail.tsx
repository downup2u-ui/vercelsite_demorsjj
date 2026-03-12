"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { artworks, Artwork } from '@/data/artworks';
import Button from '@/components/ui/Button';
import Tag from '@/components/ui/Tag';
import Card from '@/components/ui/Card';

export default function ArtworkDetail({ artworkId }: { artworkId: string }) {
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'artist'>('description');
  const [relatedArtworks, setRelatedArtworks] = useState<Artwork[]>([]);
  const router = useRouter();
  
  useEffect(() => {
    const fetchArtworkData = async () => {
      try {
        // 查找作品
        const foundArtwork = artworks.find(art => art.id === artworkId);
        
        if (foundArtwork) {
          setArtwork(foundArtwork);
          
          // 查找相关作品（同类型或同作者的其他作品）
          const related = artworks
            .filter(art => 
              art.id !== foundArtwork.id && 
              (
                art.category.some(cat => foundArtwork.category.includes(cat)) || 
                art.creator === foundArtwork.creator
              )
            )
            .slice(0, 4); // 最多显示4个相关作品
          
          setRelatedArtworks(related);
        } else {
          // 作品不存在，重定向到作品列表页
          console.log(`作品未找到: ${artworkId}`);
          router.push('/artworks');
        }
      } catch (error) {
        console.error('获取作品数据时出错:', error);
        // 可以在这里设置错误状态，显示错误信息给用户
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtworkData();
  }, [artworkId, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!artwork) {
    return null; // 重定向处理中
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Link
            href="/artworks"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回作品列表
          </Link>
        </div>

        {/* 作品详情 */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          {/* 左侧：作品图片 */}
          <div className="lg:col-start-1">
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src={artwork.image}
                alt={artwork.title}
                width={800}
                height={800}
                className="h-full w-full object-cover object-center"
                priority
              />
            </div>
            
            {/* 作品标签 */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag variant="primary">
                {artwork.hasNFT ? 'NFT可用' : '实体作品'}
              </Tag>
              {artwork.tags.map((tag) => (
                <Tag key={tag} variant="outline">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>

          {/* 右侧：作品信息 */}
          <div className="lg:col-start-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{artwork.title}</h1>
            <p className="mt-2 text-lg text-gray-500">
              创作者: {artwork.creatorId ? (
                <Link 
                  href={`/designers/${artwork.creatorId}`}
                  className="text-gray-600 hover:text-black hover:underline"
                >
                  {artwork.creator}
                </Link>
              ) : (
                artwork.creator
              )}
            </p>
            
            {artwork.price && (
              <p className="mt-2 text-xl font-medium text-gray-900">¥{artwork.price.toLocaleString()}</p>
            )}

            {/* 选项卡导航 */}
            <div className="mt-8 border-b border-gray-200">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'description'
                      ? 'border-b-2 border-gray-900 text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  作品描述
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'details'
                      ? 'border-b-2 border-gray-900 text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  详细信息
                </button>
                <button
                  onClick={() => setActiveTab('artist')}
                  className={`pb-4 text-sm font-medium ${
                    activeTab === 'artist'
                      ? 'border-b-2 border-gray-900 text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  关于创作者
                </button>
              </div>
            </div>

            {/* 选项卡内容 */}
            <div className="mt-8">
              {activeTab === 'description' && (
                <div>
                  <p className="text-base text-gray-700">{artwork.description}</p>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">分类</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {artwork.category.join(', ')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">创作日期</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(artwork.createdAt).toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  {artwork.printMaterials && artwork.printMaterials.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">打印材料</h3>
                      <p className="mt-1 text-sm text-gray-500">{artwork.printMaterials.join(', ')}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">版权信息</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {artwork.copyright.type === 'standard' ? '标准版权' : 
                       artwork.copyright.type === 'creative_commons' ? '知识共享' : '公共领域'}
                      {artwork.copyright.licenseInfo && ` - ${artwork.copyright.licenseInfo}`}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'artist' && (
                <div>
                  <p className="text-base text-gray-700 mb-4">
                    {artwork.creator}是一位专注于3D打印艺术创作的艺术家，擅长将传统艺术元素与现代技术相结合。
                  </p>
                  {artwork.creatorId && (
                    <a href={`/designers/${artwork.creatorId}`} className="text-blue-600 hover:underline">查看设计师详情</a>
                  )}
                </div>
              )}
            </div>

            {/* 购买按钮 */}
            <div className="mt-8 flex space-x-4">
              <Button variant="primary" size="lg">
                {artwork.hasNFT ? '合作' : '购买实体作品'}
              </Button>
              <Button variant="secondary" size="lg">
                添加到收藏
              </Button>
            </div>
          </div>
        </div>

        {/* 相关作品 */}
        {relatedArtworks.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">相关作品</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
              {relatedArtworks.map((relatedArtwork) => {
                // 创建一个处理创作者点击的函数
                const handleCreatorClick = (e: React.MouseEvent, creatorId: string) => {
                  e.preventDefault(); // 阻止默认行为
                  e.stopPropagation(); // 阻止事件冒泡
                  window.location.href = `/designers/${creatorId}`; // 手动导航到设计师页面
                };
                
                return (
                  <Card
                    key={relatedArtwork.id}
                    href={`/artworks/${relatedArtwork.id}`}
                    interactive
                    className="h-full flex flex-col"
                  >
                    <div className="aspect-square w-full relative overflow-hidden rounded-lg bg-gray-100 mb-4">
                      <Image
                        src={relatedArtwork.image}
                        alt={relatedArtwork.title}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{relatedArtwork.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {relatedArtwork.creatorId ? (
                          <span 
                            className="hover:text-black hover:underline cursor-pointer"
                            onClick={(e) => handleCreatorClick(e, relatedArtwork.creatorId)}
                          >
                            {relatedArtwork.creator}
                          </span>
                        ) : (
                          relatedArtwork.creator
                        )}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {relatedArtwork.tags.slice(0, 2).map((tag) => (
                          <Tag key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
