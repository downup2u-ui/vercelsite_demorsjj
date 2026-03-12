"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function IntellectualPropertyPage() {
  const { user } = useAuth();
  
  // 服务特点
  const features = [
    {
      name: '专利申请',
      description: '提供发明专利、实用新型专利和外观设计专利的申请服务，保护您的创新成果。',
      icon: (
        <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      name: '商标注册',
      description: '提供商标查询、注册申请、续展和转让等全流程服务，保护您的品牌资产。',
      icon: (
        <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      )
    },
    {
      name: '版权登记',
      description: '为软件、文学、艺术作品等提供版权登记服务，确保创作者权益得到法律保护。',
      icon: (
        <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      )
    },
    {
      name: '知识产权诊断',
      description: '为企业提供知识产权现状评估和风险分析，制定知识产权保护策略。',
      icon: (
        <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      name: '知识产权维权',
      description: '提供知识产权侵权调查、证据收集、谈判和诉讼支持，维护权利人合法权益。',
      icon: (
        <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      )
    },
    {
      name: '知识产权许可与转让',
      description: '协助企业进行知识产权的许可、转让和交易，实现知识产权的商业价值。',
      icon: (
        <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    }
  ];

  // 服务流程
  const process = [
    {
      step: '需求咨询',
      description: '了解您的知识产权需求和目标，提供初步专业建议。'
    },
    {
      step: '方案制定',
      description: '根据您的需求，制定个性化的知识产权保护方案。'
    },
    {
      step: '材料准备',
      description: '协助您准备申请所需的各类文件和材料。'
    },
    {
      step: '申请提交',
      description: '代您向相关机构提交申请文件，并跟踪申请进度。'
    },
    {
      step: '获权维护',
      description: '协助您维护已获得的知识产权，提供长期保护策略。'
    }
  ];

  // 成功案例
  const cases = [
    {
      title: '高新技术企业专利布局',
      description: '为一家人工智能企业制定专利布局策略，成功申请20余项核心技术专利，助力企业获得高新技术企业认定。',
      image: '/images/high-quality/services/patent-layout.jpg'
    },
    {
      title: '品牌商标保护',
      description: '为新兴消费品牌提供全球商标注册服务，在多个国家和地区成功注册商标，建立完善的品牌保护体系。',
      image: '/images/high-quality/services/trademark-protection.jpg'
    },
    {
      title: '软件著作权维权',
      description: '协助软件开发企业进行著作权登记，并成功处理多起侵权案件，维护了企业的合法权益。',
      image: '/images/high-quality/services/copyright-defense.jpg'
    }
  ];

  return (
    <div className="bg-white">
      {/* 服务介绍 */}
      <div className="relative bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-serif mb-4">知识产权服务</h1>
            <p className="max-w-xl mx-auto text-gray-700">
              提供专业知识产权保护服务，包括专利申请、商标注册和版权登记，保护您的创新成果和品牌资产
            </p>
          </div>
        </div>
      </div>

      {/* 服务特点 */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif">服务内容</h2>
          <p className="mt-2 text-gray-700">全方位的知识产权服务，满足您的各类知识产权需求</p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-2 text-black">{feature.name}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 服务流程 */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-serif">服务流程</h2>
            <p className="mt-2 text-gray-700">专业高效的知识产权服务流程，确保您的权益得到保障</p>
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
                    <h3 className="text-lg font-medium">{step.step}</h3>
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
          <h2 className="text-2xl font-serif">成功案例</h2>
          <p className="mt-2 text-gray-700">我们的知识产权服务案例</p>
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
                <h3 className="text-lg font-medium mb-2 text-black">{item.title}</h3>
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
            <h2 className="text-2xl font-serif mb-4">需要知识产权服务？</h2>
            <p className="text-gray-700 mb-6">
              无论您是需要申请专利、注册商标，还是进行知识产权维权，我们的专业团队都能为您提供高质量的知识产权服务。
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
