'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CreateAuctionPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startingPrice: '',
    minIncrement: '',
    startTime: '',
    endTime: '',
    coverImage: '/images/auctions/placeholder.svg',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 如果用户未登录，重定向到登录页面
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">需要登录</h1>
        <p className="mb-8">您需要先登录才能创建拍卖。</p>
        <Link href="/login" className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition">
          前往登录
        </Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '请输入拍品标题';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = '请输入拍品描述';
    }
    
    const startingPrice = parseFloat(formData.startingPrice);
    if (isNaN(startingPrice) || startingPrice <= 0) {
      newErrors.startingPrice = '请输入有效的起拍价';
    }
    
    const minIncrement = parseFloat(formData.minIncrement);
    if (isNaN(minIncrement) || minIncrement <= 0) {
      newErrors.minIncrement = '请输入有效的最小加价幅度';
    }
    
    if (!formData.startTime) {
      newErrors.startTime = '请选择拍卖开始时间';
    }
    
    if (!formData.endTime) {
      newErrors.endTime = '请选择拍卖结束时间';
    } else if (new Date(formData.endTime) <= new Date(formData.startTime)) {
      newErrors.endTime = '结束时间必须晚于开始时间';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // 模拟创建拍卖的API调用
    setTimeout(() => {
      // 在实际应用中，这里会调用API创建拍卖
      setIsSubmitting(false);
      setSuccess(true);
      
      // 2秒后重定向到拍卖列表页
      setTimeout(() => {
        router.push('/auctions');
      }, 2000);
    }, 1500);
  };

  // 模拟上传图片
  const handleImageUpload = () => {
    // 在实际应用中，这里会打开文件选择器并上传图片
    // 这里仅模拟随机选择一个预设的图片
    const demoImages = [
      '/images/auctions/placeholder.svg',
      '/images/auctions/art1.svg',
      '/images/auctions/art2.svg',
      '/images/auctions/art3.svg'
    ];
    
    const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)];
    setFormData(prev => ({ ...prev, coverImage: randomImage }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/auctions" className="text-indigo-600 hover:text-indigo-800 transition flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回拍卖列表
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">创建拍卖</h1>
        
        {success ? (
          <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-bold mb-2">拍卖创建成功！</h2>
            <p className="mb-4">您的拍卖已成功提交，正在审核中。</p>
            <p className="text-sm text-green-600">即将返回拍卖列表...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 左侧 - 基本信息 */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    拍品标题 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.title ? 'border-red-500' : ''}`}
                    placeholder="例如：抽象艺术油画《思绪》"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    拍品描述 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.description ? 'border-red-500' : ''}`}
                    placeholder="详细描述您的拍品，包括创作背景、尺寸、材质等信息..."
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startingPrice" className="block text-sm font-medium text-gray-700 mb-1">
                      起拍价 (¥) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="startingPrice"
                      name="startingPrice"
                      value={formData.startingPrice}
                      onChange={handleChange}
                      min="1"
                      step="0.01"
                      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.startingPrice ? 'border-red-500' : ''}`}
                      placeholder="1000"
                    />
                    {errors.startingPrice && <p className="mt-1 text-sm text-red-600">{errors.startingPrice}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="minIncrement" className="block text-sm font-medium text-gray-700 mb-1">
                      最小加价 (¥) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="minIncrement"
                      name="minIncrement"
                      value={formData.minIncrement}
                      onChange={handleChange}
                      min="1"
                      step="0.01"
                      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.minIncrement ? 'border-red-500' : ''}`}
                      placeholder="100"
                    />
                    {errors.minIncrement && <p className="mt-1 text-sm text-red-600">{errors.minIncrement}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                      开始时间 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      id="startTime"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.startTime ? 'border-red-500' : ''}`}
                    />
                    {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                      结束时间 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      id="endTime"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.endTime ? 'border-red-500' : ''}`}
                    />
                    {errors.endTime && <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>}
                  </div>
                </div>
              </div>
              
              {/* 右侧 - 图片上传和预览 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  拍品图片 <span className="text-red-500">*</span>
                </label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <div className="relative h-48 w-full mb-4 bg-gray-50 rounded overflow-hidden">
                    <Image
                      src={formData.coverImage}
                      alt="拍品图片预览"
                      fill
                      style={{ objectFit: 'contain' }}
                      className="p-2"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    上传图片
                  </button>
                  
                  <p className="mt-2 text-xs text-gray-500">
                    支持 JPG, PNG, SVG 格式，文件大小不超过 5MB
                  </p>
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-sm mb-3">拍卖提交须知</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>您提交的拍卖将经过平台审核，通常在24小时内完成</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>拍卖成功后，平台将收取成交价的10%作为服务费</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>请确保您对拍品拥有合法的所有权或销售权</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
              <Link
                href="/auctions"
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                取消
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '提交中...' : '创建拍卖'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
