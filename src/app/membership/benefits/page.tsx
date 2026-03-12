import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MembershipBenefitsPage() {
  // 会员权益数据
  const regularBenefits = [
    {
      title: '专属活动',
      description: '优先参与社区活动和工作坊，与设计师和艺术家面对面交流',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: '创作空间',
      description: '每月8小时免费使用创客空间，包括基础工具和设备',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: '积分奖励',
      description: '消费积分双倍累计，可兑换服务和产品折扣',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: '3D打印折扣',
      description: '所有3D打印服务享受85折优惠',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
  ];

  const vipBenefits = [
    {
      title: '专属顾问',
      description: '一对一设计和技术顾问服务，帮助您实现创意',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: '无限创作空间',
      description: '无限制使用创客空间，包括高级设备和专业工具',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: '优先展示',
      description: '作品在平台首页和展览中获得优先展示机会',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      title: '专属活动',
      description: '独家参与VIP会员活动，与行业专家和艺术家深度交流',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: '3D打印特惠',
      description: '所有3D打印服务享受7折优惠，包括高级材料',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: '积分加速',
      description: '消费积分三倍累计，更多兑换选择和专属礼品',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'RFID防伪标签',
      description: '免费获得RFID防伪标签，保护您的作品真实性',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: '专业培训',
      description: '免费参加专业技能培训课程，提升设计和技术能力',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white">
      {/* 页面标题 */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">会员权益详情</h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              了解我们的会员计划如何帮助您实现创意并获得更多资源和支持
            </p>
          </div>
        </div>
      </div>

      {/* 会员类型比较 */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 普通会员 */}
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">普通会员</h2>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  基础特权
                </span>
              </div>
              <p className="text-gray-600 mb-8">
                为创意爱好者和初级设计师提供基础支持和资源，帮助您探索创意可能性。
              </p>
              <ul className="space-y-6 mb-8">
                {regularBenefits.map((benefit, index) => (
                  <li key={index} className="flex">
                    <div className="flex-shrink-0 h-6 w-6 text-blue-500">
                      {benefit.icon}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-900">{benefit.title}</h3>
                      <p className="mt-1 text-gray-500">{benefit.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link 
                  href="/membership" 
                  className="block w-full bg-white border border-black text-black text-center px-4 py-2 rounded-md font-medium hover:bg-gray-50"
                >
                  选择普通会员
                </Link>
              </div>
            </div>

            {/* VIP会员 */}
            <div className="bg-black rounded-lg p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">VIP会员</h2>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-400 text-black">
                  尊享特权
                </span>
              </div>
              <p className="text-gray-300 mb-8">
                为专业设计师和艺术家提供全方位支持和资源，帮助您实现创意并获得更多展示机会。
              </p>
              <ul className="space-y-6 mb-8">
                {vipBenefits.map((benefit, index) => (
                  <li key={index} className="flex">
                    <div className="flex-shrink-0 h-6 w-6 text-yellow-400">
                      {benefit.icon}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">{benefit.title}</h3>
                      <p className="mt-1 text-gray-300">{benefit.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link 
                  href="/membership" 
                  className="block w-full bg-white text-black text-center px-4 py-2 rounded-md font-medium hover:bg-gray-100"
                >
                  选择VIP会员
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 会员见证 */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">会员见证</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              听听我们的会员如何利用会员权益实现他们的创意
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 见证1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src="/images/avatars/张设计.svg"
                    alt="张设计"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">张设计</h3>
                  <p className="text-sm text-gray-500">VIP会员 · 产品设计师</p>
                </div>
              </div>
              <p className="text-gray-600">
                "成为VIP会员后，我不仅可以无限使用创客空间，还获得了专业顾问的指导，帮助我将创意转化为实际产品。平台的展示机会也让我的作品获得了更多关注。"
              </p>
            </div>

            {/* 见证2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src="/images/avatars/李程序.svg"
                    alt="李程序"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">李程序</h3>
                  <p className="text-sm text-gray-500">普通会员 · 软件工程师</p>
                </div>
              </div>
              <p className="text-gray-600">
                "普通会员的创作空间对我来说非常实用，每月8小时足够我完成我的小型项目。3D打印折扣也让我能够以合理的价格将我的设计变为实物。"
              </p>
            </div>

            {/* 见证3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src="/images/avatars/赵艺术.svg"
                    alt="赵艺术"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">赵艺术</h3>
                  <p className="text-sm text-gray-500">VIP会员 · 艺术家</p>
                </div>
              </div>
              <p className="text-gray-600">
                "VIP会员的专业培训课程大大提升了我的设计技能，RFID防伪标签也为我的作品提供了保护。积分加速让我能够兑换更多服务，支持我的创作过程。"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 常见问题 */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">常见问题</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              关于会员权益的常见问题解答
            </p>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">如何升级我的会员等级？</h3>
              <p className="mt-2 text-gray-600">
                您可以在会员中心页面选择升级会员等级，支付相应费用后即可立即享受升级后的会员权益。
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">会员权益是否可以转让？</h3>
              <p className="mt-2 text-gray-600">
                会员权益是与您的个人账户绑定的，不可转让给其他用户。但您可以邀请朋友注册并享受推荐奖励。
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">如何预约创作空间？</h3>
              <p className="mt-2 text-gray-600">
                您可以在会员中心的"空间预约"页面查看可用时段并进行预约，预约成功后会收到确认邮件。
              </p>
            </div>
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">积分如何兑换和使用？</h3>
              <p className="mt-2 text-gray-600">
                您可以在积分中心查看可兑换的服务和产品，选择后使用积分进行兑换，兑换成功后会收到确认通知。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 行动号召 */}
      <div className="bg-black py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">立即加入会员计划</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
            选择适合您的会员类型，开启创意之旅
          </p>
          <div className="mt-8">
            <Link 
              href="/membership" 
              className="inline-block bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-gray-100"
            >
              查看会员计划
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
