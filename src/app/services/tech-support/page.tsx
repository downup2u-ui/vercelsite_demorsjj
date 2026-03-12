"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function TechSupportPage() {
  const { user } = useAuth();
  
  // 服务特点
  const features = [
    {
      name: '技术咨询',
      description: '提供专业技术咨询服务，解答您在项目开发和实施过程中遇到的各类技术问题。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: '问题排查',
      description: '系统性分析和诊断技术问题，快速定位故障原因，提供有效解决方案。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      name: '解决方案实施',
      description: '根据问题分析结果，制定并实施最佳技术解决方案，确保系统稳定运行。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      name: '技术培训',
      description: '提供定制化技术培训服务，帮助您的团队掌握必要的技术知识和操作技能。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      name: '系统优化',
      description: '分析系统性能瓶颈，提供优化建议和实施方案，提升系统运行效率。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      name: '远程支持',
      description: '提供远程技术支持服务，快速响应并解决您的技术问题，减少停机时间。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  // 支持领域
  const supportAreas = [
    {
      name: '软件开发',
      description: '包括Web应用、移动应用、桌面应用等各类软件开发技术支持。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      name: '硬件集成',
      description: '提供硬件设备集成、调试和维护的技术支持服务。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      name: '网络与安全',
      description: '网络配置、安全防护、漏洞修复等网络与信息安全技术支持。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      name: '云服务',
      description: '云平台部署、配置、迁移和优化的专业技术支持。',
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      )
    }
  ];

  // 服务流程
  const process = [
    {
      step: '问题提交',
      description: '通过在线表单、电话或邮件提交您的技术问题。'
    },
    {
      step: '初步评估',
      description: '技术支持团队对问题进行初步评估，确定问题类型和优先级。'
    },
    {
      step: '专家分配',
      description: '根据问题类型分配相应领域的技术专家负责处理。'
    },
    {
      step: '问题解决',
      description: '技术专家分析问题并提供解决方案，可能包括远程支持或现场服务。'
    },
    {
      step: '验证确认',
      description: '确认问题是否已完全解决，收集您的反馈意见。'
    }
  ];

  return (
    <div className="bg-white">
      {/* 服务介绍 */}
      <div className="relative bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">技术支持服务</h1>
            <p className="max-w-xl mx-auto text-gray-700">
              提供专业技术咨询、问题排查和解决方案实施，帮助您解决各类技术难题
            </p>
          </div>
        </div>
      </div>

      {/* 服务特点 */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif font-bold">服务内容</h2>
          <p className="mt-2 text-gray-700">全方位的技术支持服务，解决您的各类技术问题</p>
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

      {/* 支持领域 */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-serif font-bold">支持领域</h2>
            <p className="mt-2 text-gray-700">我们提供多领域的技术支持服务</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {supportAreas.map((area, index) => (
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

      {/* 服务流程 */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif font-bold">服务流程</h2>
          <p className="mt-2 text-gray-700">高效的技术支持流程，快速解决您的问题</p>
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

      {/* 服务保障 */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif font-bold">服务保障</h2>
              <p className="mt-2 text-gray-700">我们承诺提供高质量的技术支持服务</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-gray-800 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold">快速响应</h3>
                    <p className="text-gray-700">普通问题4小时内响应，紧急问题1小时内响应。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-gray-800 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold">专业团队</h3>
                    <p className="text-gray-700">由经验丰富的技术专家组成的支持团队，确保问题得到专业解决。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-gray-800 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold">全天候支持</h3>
                    <p className="text-gray-700">VIP会员享受7x24小时技术支持服务，确保您的业务不受技术问题影响。</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-gray-800 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold">满意保证</h3>
                    <p className="text-gray-700">如果您对我们的服务不满意，我们将继续提供支持直到问题得到满意解决。</p>
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
          <h2 className="text-2xl font-serif font-bold mb-4">需要技术支持？</h2>
          <p className="text-gray-700 mb-6">
            无论您遇到什么技术问题，我们的专业团队都能为您提供高效的解决方案。
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
