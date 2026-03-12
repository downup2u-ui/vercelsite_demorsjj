"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function ConsultingPage() {
  const { user } = useAuth();
  
  // 服务特点
  const features = [
    {
      name: '业务战略',
      description: '制定符合企业发展目标的业务战略，优化业务模式，提升竞争力。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      name: '市场分析',
      description: '深入分析市场趋势、竞争环境和消费者需求，为决策提供数据支持。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      name: '项目管理',
      description: '提供专业的项目管理咨询，优化项目流程，提高项目执行效率。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      name: '创新管理',
      description: '建立创新管理体系，促进创新思维，加速创新成果转化。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      name: '组织发展',
      description: '优化组织结构和人才管理，提升组织效能和团队协作能力。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      name: '数字化转型',
      description: '制定数字化转型战略，推动业务流程数字化，提升运营效率。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    }
  ];

  // 咨询领域
  const consultingAreas = [
    {
      name: '创业咨询',
      description: '为创业者提供从创业计划到融资策略的全方位咨询服务。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      )
    },
    {
      name: '产品创新',
      description: '帮助企业开发创新产品，优化产品设计和用户体验。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      )
    },
    {
      name: '市场营销',
      description: '制定有效的市场营销策略，提升品牌影响力和市场份额。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      )
    },
    {
      name: '运营优化',
      description: '优化业务流程和运营模式，提高运营效率和资源利用率。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  // 咨询流程
  const process = [
    {
      step: '需求沟通',
      description: '深入了解您的业务现状、挑战和目标，明确咨询需求。'
    },
    {
      step: '现状分析',
      description: '收集相关数据和信息，分析业务现状和问题根源。'
    },
    {
      step: '方案制定',
      description: '基于分析结果，制定个性化的咨询解决方案。'
    },
    {
      step: '方案实施',
      description: '协助您实施解决方案，并进行必要的调整和优化。'
    },
    {
      step: '效果评估',
      description: '评估咨询方案的实施效果，提供持续改进建议。'
    }
  ];

  // 成功案例
  const cases = [
    {
      title: '科技创业公司战略规划',
      description: '为一家科技创业公司制定了全面的业务战略规划，帮助其明确市场定位和发展方向，成功获得融资并实现业务快速增长。',
      industry: '科技创业'
    },
    {
      title: '制造企业数字化转型',
      description: '协助一家传统制造企业实施数字化转型，优化生产流程，提高生产效率和产品质量，降低运营成本。',
      industry: '制造业'
    },
    {
      title: '创意设计公司市场拓展',
      description: '为一家创意设计公司制定了市场拓展策略，帮助其开拓新的客户群体和业务领域，实现业务多元化发展。',
      industry: '创意设计'
    }
  ];

  return (
    <div className="bg-white">
      {/* 服务介绍 */}
      <div className="relative bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">咨询顾问服务</h1>
            <p className="max-w-xl mx-auto text-gray-700">
              提供业务战略、市场分析和项目管理咨询，帮助您解决业务挑战，实现可持续发展
            </p>
          </div>
        </div>
      </div>

      {/* 服务特点 */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif font-bold">服务内容</h2>
          <p className="mt-2 text-gray-700">全方位的咨询顾问服务，助力您的业务发展</p>
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

      {/* 咨询领域 */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-serif font-bold">咨询领域</h2>
            <p className="mt-2 text-gray-700">我们提供多领域的专业咨询服务</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {consultingAreas.map((area, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  {area.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-black">{area.name}</h3>
                <p className="text-gray-700">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 咨询流程 */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif font-bold">咨询流程</h2>
          <p className="mt-2 text-gray-700">专业高效的咨询服务流程，确保项目顺利完成</p>
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

      {/* 成功案例 */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-serif font-bold">成功案例</h2>
            <p className="mt-2 text-gray-700">我们的咨询服务成功案例</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {cases.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-4">
                  <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                    {item.industry}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-black">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 咨询团队 */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif font-bold">咨询团队</h2>
          <p className="mt-2 text-gray-700">由经验丰富的咨询专家组成</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-gray-800 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold">行业专家</h3>
                  <p className="text-gray-700">团队成员来自不同行业背景，拥有丰富的行业经验和专业知识。</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="h-5 w-5 text-gray-800 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold">实战经验</h3>
                  <p className="text-gray-700">团队成员均有多年实战咨询经验，能够提供切实可行的解决方案。</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="h-5 w-5 text-gray-800 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold">创新思维</h3>
                  <p className="text-gray-700">团队注重创新思维和方法，为客户提供富有创意的解决方案。</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="h-5 w-5 text-gray-800 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold">客户导向</h3>
                  <p className="text-gray-700">以客户需求为中心，提供个性化的咨询服务，确保方案的可行性和有效性。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 联系我们 */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-bold mb-4">需要咨询服务？</h2>
            <p className="text-gray-700 mb-6">
              无论您是面临业务挑战，还是寻求发展机会，我们的咨询团队都能为您提供专业的解决方案。
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
