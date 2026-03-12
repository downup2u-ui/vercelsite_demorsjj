"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function LegalCompliancePage() {
  const { user } = useAuth();
  
  // 服务特点
  const features = [
    {
      name: '知识产权保护',
      description: '提供专利、商标、版权等知识产权全方位保护服务，保障您的创新成果和创意资产。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      name: '合同审核',
      description: '专业法律团队提供合同起草、审核和修改服务，确保您的权益得到充分保障。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      name: '法律咨询',
      description: '提供各类法律问题的专业咨询服务，帮助您了解相关法律规定和风险防范措施。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: '法律风险评估',
      description: '对您的业务活动进行全面的法律风险评估，识别潜在风险并提供防范建议。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      name: '争议解决',
      description: '提供调解、仲裁和诉讼等多种争议解决方式，维护您的合法权益。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      )
    },
    {
      name: '合规培训',
      description: '为您的团队提供法律合规培训，提高法律意识和风险防范能力。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ];

  // 知识产权服务
  const ipServices = [
    {
      name: '专利申请与保护',
      description: '提供发明专利、实用新型专利和外观设计专利的申请、审查和维权服务。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      name: '商标注册与管理',
      description: '提供商标查询、注册、续展、转让和许可等全流程服务，保护您的品牌资产。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      )
    },
    {
      name: '版权登记与保护',
      description: '提供作品版权登记、著作权许可和侵权维权等服务，保护您的创作成果。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      )
    },
    {
      name: '知识产权战略规划',
      description: '根据您的业务发展需求，制定全面的知识产权保护和运营战略。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  // 服务流程
  const process = [
    {
      step: '需求咨询',
      description: '了解您的法律需求和具体情况，确定服务方向。'
    },
    {
      step: '方案制定',
      description: '根据您的需求，制定个性化的法律服务方案。'
    },
    {
      step: '专业服务',
      description: '由专业律师团队提供高质量的法律服务。'
    },
    {
      step: '成果交付',
      description: '交付法律文件、报告或其他服务成果。'
    },
    {
      step: '后续支持',
      description: '提供必要的后续法律支持和咨询服务。'
    }
  ];

  return (
    <div className="bg-white">
      {/* 服务介绍 */}
      <div className="relative bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-serif mb-4">法律合规服务</h1>
            <p className="max-w-xl mx-auto text-gray-500">
              提供知识产权保护、合同审核和法律咨询服务，保障您的创新成果和商业利益
            </p>
          </div>
        </div>
      </div>

      {/* 服务特点 */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif">服务内容</h2>
          <p className="mt-2 text-gray-500">全方位的法律合规服务，保障您的权益</p>
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

      {/* 知识产权服务 */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-serif">知识产权服务</h2>
            <p className="mt-2 text-gray-500">保护您的创新成果和知识资产</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {ipServices.map((service, index) => (
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
          <p className="mt-2 text-gray-500">专业高效的法律服务流程</p>
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

      {/* 法律团队 */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-serif">专业法律团队</h2>
            <p className="mt-2 text-gray-500">由经验丰富的律师和法律专家组成</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-gray-800 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium">知识产权专家</h3>
                    <p className="text-gray-500">专注于专利、商标、版权等知识产权保护领域，拥有丰富的实践经验。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-gray-800 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium">合同法专家</h3>
                    <p className="text-gray-500">精通各类商业合同的起草、审核和谈判，确保您的权益得到充分保障。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-gray-800 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium">争议解决专家</h3>
                    <p className="text-gray-500">擅长调解、仲裁和诉讼等各种争议解决方式，保护客户的合法权益。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-gray-800 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium">行业经验</h3>
                    <p className="text-gray-500">团队成员拥有科技、创意、制造等多个行业的法律服务经验，了解行业特点和需求。</p>
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
          <h2 className="text-2xl font-serif mb-4">需要法律服务？</h2>
          <p className="text-gray-500 mb-6">
            无论您是需要知识产权保护、合同审核还是法律咨询，我们的专业团队都能为您提供高质量的法律服务。
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
