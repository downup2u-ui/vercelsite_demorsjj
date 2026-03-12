"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NationalTreasuresPage() {
  // 已返回国宝项目列表
  const treasures = [
    {
      id: 1,
      name: '圆明园兽首',
      image: '/images/charity/national-treasures/1.jpg',
      description: '圆明园十二生肖兽首铜像，原为圆明园海晏堂外喷泉的装饰，因1860年英法联军火烧圆明园而流失海外，目前已有多尊回归祖国。',
      returnedDate: '2013年6月',
      significance: '代表了中国人民寻求文化认同和民族自信的坚定决心。'
    },
    {
      id: 2,
      name: '曾伯克父青铜组器',
      image: '/images/charity/national-treasures/2.jpg',
      description: '曾伯克父青铜组器是春秋早期重要的礼器，由鼎、簋、盨、壶等8件套组成，曾被非法流失日本。',
      returnedDate: '2019年11月',
      significance: '是中日两国政府合作追索流失文物的重要成果。'
    },
    {
      id: 3,
      name: '妇好鸮尊',
      image: '/images/charity/national-treasures/3.jpg',
      description: '妇好鸮尊是商代后期青铜器，为商王武丁的妻子妇好所使用，因其罕见的鸮鸟造型而极具艺术价值。',
      returnedDate: '2012年9月',
      significance: '展示了中国早期青铜器的高超工艺和艺术成就。'
    }
  ];

  // 新增国宝文创产品数据
  const culturalProducts = [
    {
      id: 'cp001',
      name: '兽首系列冰箱贴',
      image: '/images/charity/national-treasures/4.jpg',
      description: '以回归的圆明园兽首为灵感，设计精美的系列冰箱贴，兼具艺术性与实用性。',
      category: '文创生活',
      price: '¥49.90'
    },
    {
      id: 'cp002',
      name: '青铜纹样丝巾',
      image: '/images/charity/national-treasures/4.jpg',
      description: '提取曾伯克父青铜组器的经典纹样，设计制作高档桑蚕丝丝巾，展现古典文化魅力。',
      category: '服饰配件',
      price: '¥299.00'
    },
    {
      id: 'cp003',
      name: '鸮尊造型夜灯',
      image: '/images/charity/national-treasures/4.jpg',
      description: '根据妇好鸮尊的独特造型设计的创意夜灯，为现代家居增添一抹古韵与趣味。',
      category: '家居摆件',
      price: '¥128.00'
    }
  ];

  return (
    <div className="bg-white">
      {/* 项目头部 */}
      <div className="relative bg-indigo-800">
        <div className="absolute inset-0">
          <Image
            className="h-full w-full object-cover opacity-30"
            src="/images/charity/national-treasures/1.jpg"
            alt="国宝回家"
            width={1920}
            height={600}
          />
          <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">国宝回家</h1>
          <p className="mt-6 max-w-3xl text-xl text-indigo-100">
            寻找流失文物，守护文化遗产，重现民族辉煌。让每一件国宝都能回到属于它的家。
          </p>
        </div>
      </div>

      {/* 项目介绍 */}
      <div className="overflow-hidden bg-white">
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-base lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
            <div>
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">国宝回家公益项目</h2>
              <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                守护民族瑰宝，传承历史文明
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
                      src="/images/charity/national-treasures/2.jpg"
                      alt="国宝展览"
                      width={1184}
                      height={700}
                    />
                  </div>
                  <figcaption className="mt-3 flex text-sm text-gray-500">
                    <span className="ml-2">国宝回家后的专题展览现场</span>
                  </figcaption>
                </figure>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="text-base max-w-prose mx-auto lg:max-w-none">
                <p className="text-lg text-gray-500">
                  "国宝回家"是海创共坊发起的公益项目，致力于寻找和促进流失海外的中国文物回归祖国。
                </p>
              </div>
              <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                <p>
                  中国历史上曾有大量珍贵文物因战争、掠夺等原因流失海外。这些文物不仅具有极高的历史和艺术价值，更承载着中华民族的文化记忆和民族情感。
                </p>
                <p>
                  自项目启动以来，我们通过多种方式推动文物回归：
                </p>
                <ul>
                  <li>建立全球流失文物数据库，追踪海外文物动向</li>
                  <li>联合法律专家团队，为文物回归提供法律支持</li>
                  <li>与国内外博物馆、收藏家建立沟通渠道</li>
                  <li>组织公益拍卖活动，筹集资金用于文物购回</li>
                  <li>举办文物保护与修复培训，提升专业人才水平</li>
                </ul>
                <p>
                  每一件回归的文物背后，都凝聚着无数人的努力与坚持。我们相信，随着更多人的参与，会有更多国宝找到回家的路。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 已返回国宝展示 */}
      <div className="bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">已归国宝</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              每一件文物的回归，都是中华文化生命力的见证。
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {treasures.map((treasure) => (
              <div key={treasure.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <Image
                    className="h-48 w-full object-cover"
                    src={treasure.image}
                    alt={treasure.name}
                    width={400}
                    height={200}
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="block">
                      <p className="text-xl font-semibold text-gray-900">{treasure.name}</p>
                      <p className="mt-3 text-base text-gray-500">{treasure.description}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center">
                      <div className="ml-0">
                        <div className="text-sm font-medium text-gray-900">
                          回归时间: {treasure.returnedDate}
                        </div>
                        <div className="text-sm text-gray-500">
                          {treasure.significance}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto mt-16">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">国宝文创</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              让国宝文化融入生活，每一件文创都是历史的传承与创新。
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {culturalProducts.map((product) => (
              <div key={product.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <Image
                    className="h-48 w-full object-cover"
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={200}
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="block">
                      <p className="text-xl font-semibold text-gray-900">{product.name}</p>
                      <p className="mt-1 text-sm text-indigo-600">{product.category}</p>
                      <p className="mt-3 text-base text-gray-500">{product.description}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-gray-900">{product.price}</p>
                      <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">查看详情</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 参与方式 */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">加入我们</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              共同守护文化遗产
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              每个人都可以为国宝回家贡献力量。
            </p>
          </div>
        </div>
      </div>

      {/* 行动呼吁 */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">加入国宝回家行动</span>
            <span className="block">守护民族文化瑰宝</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            无论您是专业人士还是文化爱好者，都可以通过各种方式参与到国宝回家项目中。
          </p>
          <Link
            href="/contact"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            联系我们
          </Link>
        </div>
      </div>
    </div>
  );
} 