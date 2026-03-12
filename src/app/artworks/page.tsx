"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { artworks } from '@/data/artworks';
import { primaryCategories, subcategories, categoryUtils } from '@/data/categories';
import { designers } from '@/data/designers';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';

export default function ArtworksPage() {
  // 状态管理
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState<{[key: number]: string}>({
    1: 'all',
    2: 'all',
    3: 'all',
    4: 'all'
  });
  const [visibleCategories, setVisibleCategories] = useState<{[key: number]: any[]}>({
    1: primaryCategories,
    2: [],
    3: [],
    4: []
  });
  const [filteredArtworks, setFilteredArtworks] = useState(artworks);
  const [groupedByDesigner, setGroupedByDesigner] = useState<boolean>(false);
  
  // 当分类选择改变时，更新可见的下级分类
  useEffect(() => {
    const newVisibleCategories = { ...visibleCategories };
    const newSelectedCategories = { ...selectedCategories };
    
    // 重置所有下级分类
    for (let level = selectedLevel + 1; level <= 4; level++) {
      newVisibleCategories[level] = [];
      newSelectedCategories[level] = 'all';
    }
    
    // 如果选择了特定分类，获取其子分类
    if (selectedCategories[selectedLevel] !== 'all') {
      const nextLevel = selectedLevel + 1;
      if (nextLevel <= 4) {
        const subcats = categoryUtils.getSubcategoriesByParentId(selectedCategories[selectedLevel]);
        newVisibleCategories[nextLevel] = subcats;
      }
    }
    
    setVisibleCategories(newVisibleCategories);
    setSelectedCategories(newSelectedCategories);
  }, [selectedLevel, selectedCategories[selectedLevel]]);
  
  // 提取当前选中的分类ID到单独的状态，避免依赖整个selectedCategories对象
  const [currentCategoryIds, setCurrentCategoryIds] = useState<string[]>([]);
  
  // 当分类选择改变时，更新当前选中的分类ID列表
  useEffect(() => {
    const categoryIds: string[] = [];
    
    for (let level = 1; level <= 4; level++) {
      if (selectedCategories[level] !== 'all') {
        categoryIds.push(selectedCategories[level]);
      }
    }
    
    setCurrentCategoryIds(categoryIds);
  }, [selectedCategories]);
  
  // 当选中的分类ID列表改变时，过滤作品
  useEffect(() => {
    let filtered = [...artworks];
    
    // 应用每个分类ID的过滤
    for (const categoryId of currentCategoryIds) {
      const allCategoryIds = categoryUtils.getAllSubcategoryIds(categoryId);
      
      if (allCategoryIds.length > 0) {
        filtered = filtered.filter(artwork => 
          artwork.category && artwork.category.some(cat => allCategoryIds.includes(cat))
        );
      }
    }
    
    setFilteredArtworks(filtered);
  }, [currentCategoryIds]);
  
  // 处理分类选择
  const handleCategorySelect = (level: number, categoryId: string) => {
    setSelectedLevel(level);
    setSelectedCategories(prev => ({ ...prev, [level]: categoryId }));
  };
  
  // 获取分类名称
  const getCategoryName = (categoryId: string) => {
    if (categoryId === 'all') return '全部';
    return categoryUtils.getCategoryName(categoryId);
  };
  
  // 获取分类路径（面包屑）
  const getCategoryPath = () => {
    const path = [];
    
    for (let level = 1; level <= 4; level++) {
      if (selectedCategories[level] !== 'all') {
        const category = categoryUtils.getCategoryById(selectedCategories[level]);
        if (category) {
          path.push(category.name);
        }
      }
    }
    
    return path.length > 0 ? path.join(' > ') : '全部行业';
  };
  
  // 按设计师分组显示同一产品的不同版本
  const getGroupedArtworks = () => {
    // 如果选择了四级分类且启用了分组，按设计师分组显示
    if (selectedCategories[4] !== 'all' && groupedByDesigner) {
      const quaternaryCategoryId = selectedCategories[4];
      const groupedWorks: { [key: string]: any[] } = {};
      
      // 获取该四级分类下的所有作品
      const categoryWorks = filteredArtworks.filter(artwork => 
        artwork.category && artwork.category.includes(quaternaryCategoryId)
      );
      
      // 按设计师分组
      categoryWorks.forEach(artwork => {
        if (artwork.creatorId) {
          if (!groupedWorks[artwork.creatorId]) {
            groupedWorks[artwork.creatorId] = [];
          }
          groupedWorks[artwork.creatorId].push(artwork);
        }
      });
      
      return groupedWorks;
    }
    
    return null;
  };
  
  // 获取设计师信息
  const getDesignerInfo = (designerId: string) => {
    return designers.find(designer => designer.id === designerId);
  };
  
  // 分组后的作品
  const groupedArtworks = getGroupedArtworks();

  // 渲染作品卡片
  const renderArtworkCard = (artwork: any) => {
    // 创建一个处理创作者点击的函数
    const handleCreatorClick = (e: React.MouseEvent, creatorId: string) => {
      e.preventDefault(); // 阻止默认行为
      e.stopPropagation(); // 阻止事件冒泡
      window.location.href = `/designers/${creatorId}`; // 手动导航到设计师页面
    };

    return (
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
            <div className="flex justify-between items-center">
              {artwork.creatorId ? (
                <span 
                  className="text-sm text-gray-500 hover:text-black hover:underline cursor-pointer"
                  onClick={(e) => handleCreatorClick(e, artwork.creatorId)}
                >
                  {artwork.creator || '未知创作者'}
                </span>
              ) : (
                <span className="text-sm text-gray-500">{artwork.creator || '未知创作者'}</span>
              )}
              {artwork.hasNFT && (
                <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full">NFT</span>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 页面标题区域 */}
      <div className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">创意作品</h1>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              探索3D打印技术在各行业领域的创新应用与优秀案例
            </p>
          </div>
        </div>
      </div>
      
      {/* 当前分类路径 */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-6">
        <div className="text-sm text-gray-500">
          当前分类: {getCategoryPath()}
        </div>
      </div>
      
      {/* 分类筛选区域 */}
      <div className="border-b border-gray-200 mt-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* 一级分类 */}
          <div className="flex items-center justify-between py-4 overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4">
              <button
                onClick={() => handleCategorySelect(1, 'all')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedCategories[1] === 'all'
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                全部行业
              </button>
              
              {visibleCategories[1].map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(1, category.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedCategories[1] === category.id
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* 二级分类 */}
          {visibleCategories[2].length > 0 && (
            <div className="flex items-center py-4 overflow-x-auto scrollbar-hide border-t border-gray-100">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleCategorySelect(2, 'all')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    selectedCategories[2] === 'all'
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  全部{getCategoryName(selectedCategories[1])}
                </button>
                
                {visibleCategories[2].map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(2, category.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                      selectedCategories[2] === category.id
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* 三级分类 */}
          {visibleCategories[3].length > 0 && (
            <div className="flex items-center py-4 overflow-x-auto scrollbar-hide border-t border-gray-100">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleCategorySelect(3, 'all')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    selectedCategories[3] === 'all'
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  全部{getCategoryName(selectedCategories[2])}
                </button>
                
                {visibleCategories[3].map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(3, category.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                      selectedCategories[3] === category.id
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* 四级分类 */}
          {visibleCategories[4].length > 0 && (
            <div className="flex items-center py-4 overflow-x-auto scrollbar-hide border-t border-gray-100">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleCategorySelect(4, 'all')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    selectedCategories[4] === 'all'
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  全部{getCategoryName(selectedCategories[3])}
                </button>
                
                {visibleCategories[4].map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(4, category.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                      selectedCategories[4] === category.id
                        ? 'bg-black text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* 如果选择了四级分类，提供分组选项 */}
          {selectedCategories[4] !== 'all' && (
            <div className="flex justify-end py-2 border-t border-gray-100">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={groupedByDesigner}
                  onChange={() => setGroupedByDesigner(!groupedByDesigner)}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">按设计师分组</span>
              </label>
            </div>
          )}
        </div>
      </div>
      
      {/* 作品展示区域 */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
        {/* 如果启用了分组且有四级分类选择 */}
        {groupedArtworks && Object.keys(groupedArtworks).length > 0 ? (
          <div className="space-y-16">
            {Object.entries(groupedArtworks).map(([designerId, works]) => {
              const designer = getDesignerInfo(designerId);
              
              return (
                <div key={designerId} className="space-y-6">
                  <div className="border-b border-gray-200 pb-4">
                    <Link href={`/designers/${designerId}`} className="group">
                      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors inline-flex items-center">
                        {designer?.name || '未知设计师'}
                        <span className="ml-2 text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
                      </h2>
                      {designer?.specialty && (
                        <p className="text-sm text-gray-500 mt-1">{designer.specialty}</p>
                      )}
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {works.map((artwork) => renderArtworkCard(artwork))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // 标准非分组展示
          <>
            {filteredArtworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredArtworks.map((artwork) => renderArtworkCard(artwork))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">该行业分类下暂无作品</h3>
                <p className="text-gray-500">试试其他行业分类，或者返回全部行业查看所有作品</p>
                <Button
                  onClick={() => {
                    setSelectedLevel(1);
                    setSelectedCategories({
                      1: 'all',
                      2: 'all',
                      3: 'all',
                      4: 'all'
                    });
                  }}
                  className="mt-4"
                  variant="outline"
                >
                  查看全部作品
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
