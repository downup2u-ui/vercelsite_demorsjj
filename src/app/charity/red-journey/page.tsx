"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RedJourneyPage() {
  // 红色旅游景点数据
  const redSites = [
    {
      id: 1,
      name: '井冈山',
      location: '江西省吉安市',
      image: '/images/charity/red-journey/3.jpg',
      description: '中国革命的摇篮，中国共产党创建的第一个农村革命根据地，红色旅游经典景区。',
      features: ['井冈山革命博物馆', '黄洋界哨口', '八角楼', '茨坪革命旧址群']
    },
    {
      id: 2,
      name: '延安',
      location: '陕西省延安市',
      image: '/images/charity/red-journey/4.jpg',
      description: '中共中央和红军长征胜利的落脚点，中国共产党领导中国革命的指挥中心达13年之久。',
      features: ['宝塔山', '枣园革命旧址', '杨家岭革命旧址', '王家坪革命旧址']
    },
    {
      id: 3,
      name: '西柏坡',
      location: '河北省石家庄市平山县',
      image: '/images/charity/red-journey/5.jpg',
      description: '中共中央进驻北平前的最后一个农村指挥所，见证了中国革命从农村走向城市、夺取全国胜利的重要历史。',
      features: ['西柏坡纪念馆', '中央军委作战室', '中共七届二中全会会址', '毛泽东旧居']
    }
  ];

  return (
    <div className="bg-white">
      {/* 项目头部 */}
      <div className="relative bg-red-800">
        <div className="absolute inset-0">
          <Image
            className="h-full w-full object-cover opacity-30"
            src="/images/charity/red-journey/1.jpg"
            alt="红色之旅"
            width={1920}
            height={600}
          />
          <div className="absolute inset-0 bg-red-800 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">红色文创之旅</h1>
          <p className="mt-6 max-w-3xl text-xl text-red-100">
            追寻革命足迹，传承红色基因，重温峥嵘岁月，感悟初心使命。
          </p>
        </div>
      </div>

      {/* 项目介绍 */}
      <div className="overflow-hidden bg-white">
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-base lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
            <div>
              <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">红色之旅项目</h2>
              <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                从历史中汲取力量
              </h3>
            </div>
          </div>
          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="relative lg:row-start-1 lg:col-start-2">
              <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                <figure>
                  <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                    <Image
                      className="rounded-lg shadow-lg object-cover object-center"
                      src="/images/charity/red-journey/2.jpg"
                      alt="红色之旅团队"
                      width={1184}
                      height={700}
                    />
                  </div>
                  <figcaption className="mt-3 flex text-sm text-gray-500">
                    <span className="ml-2">青少年参与红色之旅研学活动</span>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="text-base max-w-prose mx-auto lg:max-w-none">
                <p className="text-lg text-gray-500">
                  "红色之旅"是海创共坊发起的融合历史教育、文化传承与体验式学习的公益项目，旨在通过参观革命旧址、互动体验和文化交流，传承红色基因，弘扬革命精神。
                </p>
              </div>
              <div className="mt-5 prose prose-red text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                <p>
                  红色资源是中国共产党领导人民在革命、建设、改革中形成的具有历史价值、教育意义和纪念意义的遗址、遗迹、文物、文献等。这些珍贵的历史见证，是我们民族的宝贵精神财富。
                </p>
                <p>
                  我们的项目特色：
                </p>
                <ul>
                  <li>
                    <strong>沉浸式体验</strong>：通过情景再现、角色扮演等方式，让参与者身临其境感受革命历史
                  </li>
                  <li>
                    <strong>互动式学习</strong>：结合现代科技手段，如AR/VR技术，打造互动性强的学习体验
                  </li>
                  <li>
                    <strong>定制化路线</strong>：根据不同群体需求，设计专属红色旅游路线
                  </li>
                  <li>
                    <strong>跨代交流</strong>：邀请革命后代、历史见证者参与活动，与年轻一代面对面交流
                  </li>
                </ul>
                <p>
                  通过参与红色之旅，人们可以更深入地了解中国共产党的光辉历程，体悟革命先辈的坚定信念和无私奉献精神，激发爱国热情，坚定理想信念。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 红色旅游景点 */}
      <div className="bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">精选红色文创主题</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              追寻革命足迹，重温红色记忆。
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {redSites.map((site) => (
              <div key={site.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <Image
                    className="h-48 w-full object-cover"
                    src={site.image}
                    alt={site.name}
                    width={400}
                    height={200}
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="block">
                      <p className="text-xl font-semibold text-gray-900">{site.name}</p>
                      <p className="mt-1 text-sm text-gray-500">{site.location}</p>
                      <p className="mt-3 text-base text-gray-500">{site.description}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex flex-wrap gap-2">
                      {site.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 参与对象 */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-red-600 tracking-wide uppercase">参与对象</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              开启红色文创之旅
            </p>
          </div>

          <div className="mt-12 lg:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-gray-900">学生团体</h3>
                  <p className="mt-3 text-base text-gray-500">
                    针对小学、中学、大学各阶段学生，结合教育大纲设计红色研学旅行，寓教于行，强化爱国主义教育。
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-gray-900">企事业单位</h3>
                  <p className="mt-3 text-base text-gray-500">
                    为企业团队提供党建活动和团队建设方案，通过红色教育激发团队凝聚力和创新精神。
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-gray-900">社会公众</h3>
                  <p className="mt-3 text-base text-gray-500">
                    面向各年龄层公众开放的红色旅游路线，包括家庭亲子团、退休人员团等，满足不同人群的红色文化需求。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 行动呼吁 */}
      <div className="bg-red-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">加入红色文创</span>
            <span className="block">传承红色基因</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-red-200">
            我们提供创新的红色文创产品和沉浸式革命精神传承活动，让每一次体验都成为爱国主义教育的生动实践。
          </p>
          <Link
            href="/contact"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-red-50 sm:w-auto"
          >
            联系我们
          </Link>
        </div>
      </div>
    </div>
  );
} 