"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ 
  title, 
  description = "我们正在努力开发中，敬请期待！" 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>
        <div className="w-24 h-1 bg-indigo-500 mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 mb-10">{description}</p>
        <div className="flex flex-col items-center space-y-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p className="text-gray-500">此页面正在建设中，感谢您的关注和耐心等待。</p>
          <Link href="/" className="mt-6 inline-flex items-center text-indigo-600 hover:text-indigo-800">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage; 