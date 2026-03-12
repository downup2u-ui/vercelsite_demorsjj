'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { PrintModel, printModels, printMaterials } from '@/data/printingServices';

export default function MyModelsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [models, setModels] = useState<PrintModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<PrintModel | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'public' | 'private'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 如果用户未登录，重定向到登录页面
  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/3d-printing/my-models');
    } else {
      // 获取当前用户的模型
      const userModels = printModels.filter(model => model.userId === user.id);
      setModels(userModels);
    }
  }, [user, router]);

  // 根据标签和搜索筛选模型
  const filteredModels = models.filter(model => {
    const matchesTab = 
      activeTab === 'all' ? true : 
      activeTab === 'public' ? model.isPublic : 
      !model.isPublic;
    
    const matchesSearch = 
      searchQuery === '' ? true :
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTab && matchesSearch;
  });

  // 格式化日期
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 获取状态的中文名称和颜色
  const getStatusInfo = (status: 'pending' | 'approved' | 'rejected') => {
    const statusMap = {
      'pending': { name: '审核中', color: 'bg-yellow-100 text-yellow-800' },
      'approved': { name: '已批准', color: 'bg-green-100 text-green-800' },
      'rejected': { name: '已拒绝', color: 'bg-red-100 text-red-800' }
    };
    return statusMap[status];
  };

  // 如果用户未登录，显示加载中
  if (!user) {
    return <div className="container mx-auto px-4 py-8 text-center">加载中...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">我的3D模型</h1>
      <p className="text-gray-600 mb-8">
        管理您上传的3D模型，查看模型状态，并开始新的打印订单。
      </p>
      
      {/* 搜索和筛选 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex space-x-8 mb-4 md:mb-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-2 ${
              activeTab === 'all'
                ? 'border-b-2 border-black font-medium'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            全部模型
          </button>
          <button
            onClick={() => setActiveTab('public')}
            className={`pb-2 ${
              activeTab === 'public'
                ? 'border-b-2 border-black font-medium'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            公开模型
          </button>
          <button
            onClick={() => setActiveTab('private')}
            className={`pb-2 ${
              activeTab === 'private'
                ? 'border-b-2 border-black font-medium'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            私有模型
          </button>
        </div>
        
        <div className="w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索模型..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 p-2 pl-10 border border-gray-300 rounded-md"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* 上传新模型按钮 */}
      <div className="mb-8">
        <Link
          href="/3d-printing/upload"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800"
        >
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          上传新模型
        </Link>
      </div>
      
      {/* 模型列表 */}
      {filteredModels.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">没有找到模型</h3>
          <p className="text-gray-500 mb-6">您当前没有任何3D模型。</p>
          <Link
            href="/3d-printing/upload"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800"
          >
            上传第一个模型
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              className="border rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer"
              onClick={() => setSelectedModel(model)}
            >
              <div className="relative h-48">
                <Image
                  src={model.previewImage}
                  alt={model.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute top-2 right-2">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusInfo(model.status).color}`}>
                    {getStatusInfo(model.status).name}
                  </span>
                </div>
                {!model.isPublic && (
                  <div className="absolute top-2 left-2">
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      私有
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1 truncate">{model.name}</h2>
                <p className="text-gray-500 text-sm mb-2">
                  上传于 {formatDate(model.uploadedAt)}
                </p>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {model.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {model.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {model.tags.length > 3 && (
                    <span className="text-gray-500 text-xs px-1 py-1">
                      +{model.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-500">尺寸: </span>
                    <span>{model.dimensions.width} × {model.dimensions.height} × {model.dimensions.depth} mm</span>
                  </div>
                  <div>
                    <span className="text-gray-500">格式: </span>
                    <span>{model.fileFormat}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* 模型详情对话框 */}
      {selectedModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-start p-6 border-b">
              <h2 className="text-2xl font-bold">{selectedModel.name}</h2>
              <button
                onClick={() => setSelectedModel(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 左侧 - 模型预览和信息 */}
                <div>
                  <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                    <Image
                      src={selectedModel.previewImage}
                      alt={selectedModel.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">描述</h3>
                    <p className="text-gray-600">{selectedModel.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">标签</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedModel.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* 右侧 - 模型详情和操作 */}
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">状态</p>
                        <p className={`inline-block px-2 py-1 rounded text-sm ${getStatusInfo(selectedModel.status).color}`}>
                          {getStatusInfo(selectedModel.status).name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">可见性</p>
                        <p>{selectedModel.isPublic ? '公开' : '私有'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">上传时间</p>
                        <p>{formatDate(selectedModel.uploadedAt)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">最后修改</p>
                        <p>{formatDate(selectedModel.lastModified)}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">文件信息</p>
                      <div className="flex justify-between">
                        <p>{selectedModel.fileFormat} 格式</p>
                        <p>{(selectedModel.fileSize / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">尺寸</p>
                      <p>{selectedModel.dimensions.width} × {selectedModel.dimensions.height} × {selectedModel.dimensions.depth} mm</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">打印信息</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">估计重量</p>
                          <p>{selectedModel.estimatedWeight} g</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">估计打印时间</p>
                          <p>{selectedModel.estimatedPrintTime} 分钟</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">推荐材料</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedModel.recommendedMaterials.map((materialId, index) => {
                            const material = printMaterials.find(m => m.id === materialId);
                            return material ? (
                              <span 
                                key={index}
                                className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs"
                              >
                                {material.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {selectedModel.status === 'rejected' && selectedModel.reviewNote && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">审核反馈</h3>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <p className="text-red-800">{selectedModel.reviewNote}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-3">
                    {selectedModel.status === 'approved' && (
                      <Link
                        href={`/3d-printing/upload?modelId=${selectedModel.id}`}
                        className="flex-1 bg-black text-white text-center py-2 px-4 rounded-md hover:bg-gray-800 transition"
                      >
                        打印此模型
                      </Link>
                    )}
                    
                    <button className="flex-1 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition">
                      编辑模型
                    </button>
                    
                    <button className="flex items-center justify-center border border-gray-300 p-2 rounded-md hover:bg-gray-100 transition">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    
                    <button className="flex items-center justify-center border border-gray-300 p-2 rounded-md hover:bg-gray-100 transition">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
