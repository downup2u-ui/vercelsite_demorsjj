"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function CreativeDesignPage() {
  const { user } = useAuth();
  
  // 服务特点
  const features = [
    {
      name: '平面设计',
      description: '提供品牌标识、宣传材料、包装设计等专业平面设计服务，打造独特视觉形象。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: 'UI/UX设计',
      description: '专业的用户界面和用户体验设计，提升产品易用性和用户满意度，创造卓越数字体验。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: '品牌形象设计',
      description: '全方位的品牌形象设计，包括视觉识别系统、品牌故事和品牌体验，塑造独特品牌价值。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      )
    },
    {
      name: '产品包装设计',
      description: '创新的产品包装设计，结合美学与功能性，提升产品价值和市场竞争力。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      name: '插画与动画',
      description: '定制插画和动画创作，为您的内容增添生动视觉元素，提升传播效果。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    },
    {
      name: '创意咨询',
      description: '专业创意顾问提供设计思路和创意方向指导，帮助您实现创意突破。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  // 设计流程
  const process = [
    {
      step: '需求沟通',
      description: '深入了解您的设计需求、目标受众和品牌定位，确定设计方向。'
    },
    {
      step: '概念设计',
      description: '基于需求分析，提供多个设计概念方案，供您选择和反馈。'
    },
    {
      step: '方案优化',
      description: '根据您的反馈，对选定的设计方案进行优化和完善。'
    },
    {
      step: '成品交付',
      description: '提供最终设计成品及相关素材，确保满足您的使用需求。'
    },
    {
      step: '售后支持',
      description: '提供设计使用指导和必要的调整服务，确保设计效果最大化。'
    }
  ];

  // 案例展示
  const cases = [
    {
      title: '科技公司品牌重塑',
      description: '为一家科技创新公司重新设计品牌形象，包括标识、视觉系统和营销材料，提升品牌现代感和科技感。',
      image: '/images/high-quality/services/tech-brand-redesign.jpg'
    },
    {
      title: '智能产品UI设计',
      description: '为智能家居产品设计直观、易用的用户界面，提升用户体验和产品竞争力。',
      image: '/images/high-quality/services/ui-design.jpg'
    },
    {
      title: '创新产品包装设计',
      description: '为创新消费品设计独特包装，结合产品特性和目标市场，提升货架吸引力和品牌辨识度。',
      image: '/images/high-quality/services/packaging-design.jpg'
    }
  ];

  return (
    <div className="bg-white">
      {/* 服务介绍 */}
      <div className="relative bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-serif mb-4">创意设计服务</h1>
            <p className="max-w-xl mx-auto text-gray-700">
              提供专业设计服务，包括平面设计、UI/UX设计和品牌形象设计，帮助您的创意实现商业价值
            </p>
          </div>
        </div>
      </div>

      {/* 服务特点 */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif font-bold">设计服务内容</h2>
          <p className="mt-2 text-gray-700">全方位的创意设计服务，满足您的各类设计需求</p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">{feature.name}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 设计流程 */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-serif font-bold">设计流程</h2>
            <p className="mt-2 text-gray-700">专业高效的设计流程，确保项目顺利完成</p>
          </div>
          
          <div className="relative">
            {/* 连接线 */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -ml-0.5"></div>
            
            <div className="space-y-8">
              {process.map((step, index) => (
                <div key={index} className="relative flex items-start md:items-center group">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white border border-gray-300 text-gray-700 font-medium z-10 group-hover:bg-gray-800 group-hover:text-white transition-colors">
                    {index + 1}
                  </div>
                  <div className="ml-4 bg-white p-4 rounded-lg shadow-sm flex-1 md:ml-6">
                    <h3 className="text-lg font-semibold">{step.step}</h3>
                    <p className="mt-1 text-gray-700">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 案例展示 */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif font-bold">成功案例</h2>
          <p className="mt-2 text-gray-700">我们的设计作品展示</p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((item, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-sm">
              <div className="h-48 bg-gray-200 relative">
                <Image 
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-black">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 联系我们 */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-bold mb-4">需要专业设计服务？</h2>
            <p className="text-gray-700 mb-6">
              无论您是需要全新的品牌形象设计，还是产品UI优化，我们的专业设计团队都能为您提供高质量的创意解决方案。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700"
              >
                联系我们
              </Link>
              {!user && (
                <Link
                  href="/register"
                  className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  注册会员
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
