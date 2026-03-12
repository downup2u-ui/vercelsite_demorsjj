"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function FinancialTaxPage() {
  const { user } = useAuth();
  
  // 服务特点
  const features = [
    {
      name: '财务规划',
      description: '根据您的业务特点和发展目标，制定科学合理的财务规划方案，优化资金配置。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      name: '税务优化',
      description: '分析您的业务模式和税务状况，提供合法合规的税务筹划方案，降低税务成本。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      name: '财务报表分析',
      description: '对财务报表进行专业分析，揭示业务运营状况，为决策提供数据支持。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      name: '预算编制',
      description: '协助制定科学合理的预算计划，优化资源配置，提高资金使用效率。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: '税务申报',
      description: '提供专业的税务申报服务，确保税务申报准确及时，避免税务风险。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: '财务咨询',
      description: '针对各类财务问题提供专业咨询服务，帮助您做出明智的财务决策。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  // 税务服务
  const taxServices = [
    {
      name: '个人所得税筹划',
      description: '根据个人收入情况，提供合法合规的个人所得税筹划方案，降低税负。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      name: '企业所得税筹划',
      description: '分析企业经营状况，提供合法合规的企业所得税筹划方案，优化税负结构。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      name: '增值税筹划',
      description: '针对增值税政策，提供合法合规的增值税筹划方案，降低增值税税负。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: '税收优惠政策咨询',
      description: '提供各类税收优惠政策咨询，帮助您充分享受国家税收优惠政策。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  // 服务流程
  const process = [
    {
      step: '需求沟通',
      description: '了解您的财务状况和需求，确定服务方向和目标。'
    },
    {
      step: '资料收集',
      description: '收集相关财务资料和信息，为分析和规划做准备。'
    },
    {
      step: '分析评估',
      description: '对财务状况进行专业分析和评估，识别问题和机会。'
    },
    {
      step: '方案制定',
      description: '根据分析结果，制定个性化的财务规划和税务优化方案。'
    },
    {
      step: '方案实施',
      description: '协助实施财务规划和税务优化方案，并进行效果跟踪。'
    }
  ];

  return (
    <div className="bg-white">
      {/* 服务介绍 */}
      <div className="relative bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-serif mb-4">财务税务服务</h1>
            <p className="max-w-xl mx-auto text-gray-500">
              提供财务规划、税务优化和财务报表分析，帮助您优化财务结构，降低税务成本
            </p>
          </div>
        </div>
      </div>

      {/* 服务特点 */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif">服务内容</h2>
          <p className="mt-2 text-gray-500">全方位的财务税务服务，优化您的财务结构</p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-2 text-black">{feature.name}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 税务服务 */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-serif">税务优化服务</h2>
            <p className="mt-2 text-gray-500">合法合规的税务筹划，降低税务成本</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {taxServices.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-medium mb-2 text-black">{service.name}</h3>
                <p className="text-gray-500">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 服务流程 */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif">服务流程</h2>
          <p className="mt-2 text-gray-500">专业高效的财务税务服务流程</p>
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
                  <p className="mt-1 text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 服务优势 */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-serif">我们的优势</h2>
            <p className="mt-2 text-gray-500">专业团队，优质服务</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-gray-800 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium">专业团队</h3>
                    <p className="text-gray-500">由注册会计师、税务师和财务专家组成的专业团队，拥有丰富的实践经验。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-gray-800 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium">行业经验</h3>
                    <p className="text-gray-500">服务过多个行业的企业和个人客户，了解不同行业的财务特点和需求。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-gray-800 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium">个性化方案</h3>
                    <p className="text-gray-500">根据客户的具体情况和需求，提供个性化的财务规划和税务优化方案。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-gray-800 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium">合规保障</h3>
                    <p className="text-gray-500">所有财务规划和税务优化方案都严格遵守相关法律法规，确保合法合规。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 联系我们 */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-serif mb-4">需要财务税务服务？</h2>
          <p className="text-gray-500 mb-6">
            无论您是需要财务规划、税务优化还是财务报表分析，我们的专业团队都能为您提供高质量的服务。
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
  );
}
