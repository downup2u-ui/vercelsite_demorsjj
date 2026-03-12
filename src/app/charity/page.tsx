"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CharityPage() {
  return (
    <div className="bg-white">
      {/* 公益项目头部 */}
      <div className="relative bg-indigo-600">
        <div className="absolute inset-0">
          <Image
            className="h-full w-full object-cover opacity-40"
            src="/images/high-quality/exhibition-hall.jpg"
            alt="公益项目"
            width={1920}
            height={600}
          />
          <div className="absolute inset-0 bg-indigo-600 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">公益项目</h1>
          <p className="mt-6 max-w-3xl text-xl text-indigo-100">
            海创共坊积极参与社会公益事业，通过"国宝回家"和"红色之旅"等项目，弘扬中华文化，传承红色精神。
          </p>
        </div>
      </div>

      {/* 项目导航卡片 */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:gap-x-8">
          {/* 国宝回家项目卡片 */}
          <div className="group relative">
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
              <Image
                className="w-full h-48 object-cover group-hover:opacity-75 transition-opacity duration-300"
                src="/images/high-quality/exhibition-hall.jpg"
                alt="国宝回家项目"
                width={500}
                height={400}
              />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-gray-900">
              <Link href="/charity/national-treasures">
                <span className="absolute inset-0" />
                国宝回家公益项目
              </Link>
            </h3>
            <p className="text-base text-gray-500 mt-2">
              致力于海外流失文物的寻找、修复与返还，守护中华文化遗产，促进文化认同。
            </p>
            <div className="mt-4">
              <Link 
                href="/charity/national-treasures" 
                className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
              >
                了解更多 &rarr;
              </Link>
            </div>
          </div>

          {/* 红色之旅卡片 */}
          <div className="group relative">
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
              <Image
                className="w-full h-48 object-cover group-hover:opacity-75 transition-opacity duration-300"
                src="/images/high-quality/exhibition-hall.jpg"
                alt="红色之旅项目"
                width={500}
                height={400}
              />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-gray-900">
              <Link href="/charity/red-journey">
                <span className="absolute inset-0" />
                红色之旅
              </Link>
            </h3>
            <p className="text-base text-gray-500 mt-2">
              重走革命道路，传承红色基因，通过沉浸式体验和互动展览，让历史照进现实。
            </p>
            <div className="mt-4">
              <Link 
                href="/charity/red-journey" 
                className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
              >
                了解更多 &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 参与方式 */}
        <div className="mt-20">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">参与方式</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">志愿者服务</h3>
                  <p className="mt-5 text-base text-gray-500">
                    成为我们的志愿者，参与文物保护宣传、红色基地导览等活动，用行动传承文化。
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">爱心捐赠</h3>
                  <p className="mt-5 text-base text-gray-500">
                    您的每一笔捐款都将用于文物保护、红色基地建设与维护，让文化得以延续。
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">创意支持</h3>
                  <p className="mt-5 text-base text-gray-500">
                    利用您的专业技能和创意，参与公益设计、宣传活动策划，让更多人了解并参与公益。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 