"use client";

import React from 'react';
import Image from 'next/image';

export interface CompanyInfoProps {
  name?: string;
  foundingYear?: string;
  description?: string;
  logoSrc?: string;
  stats?: Array<{
    label: string;
    value: string;
  }>;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ 
  name = "海创共坊",
  foundingYear = "2023",
  description = "海创共坊是一个集创意设计、3D打印、NFT艺术和社区交流于一体的综合服务平台。",
  logoSrc,
  stats = [
    { label: "活跃创作者", value: "5,000+" },
    { label: "潮玩爱好者", value: "100,000+" },
    { label: "成功项目", value: "500+" },
    { label: "合作伙伴", value: "50+" }
  ]
}) => {
  return (
    <div className="bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
              关于{name}
            </h2>
            <div className="mb-6 flex items-center text-indigo-600">
              <span className="font-semibold">成立于 {foundingYear}</span>
              <span className="mx-2">•</span>
              <span>致力于潮玩文化发展</span>
            </div>
            <div className="text-lg text-gray-700 space-y-4">
              <p>{description}</p>
              <p>
                我们注意到，虽然中国的潮玩市场正在快速增长，但创作者们常常面临设计工具不足、
                制作成本高、销售渠道有限等问题。我们希望通过我们的平台解决这些问题。
              </p>
            </div>
          </div>
          
          <div className="relative">
            {logoSrc ? (
              <div className="relative h-64 w-full lg:h-96 overflow-hidden rounded-xl shadow-xl">
                <Image 
                  src={logoSrc} 
                  alt={`${name} logo`} 
                  fill
                  className="object-cover" 
                />
              </div>
            ) : (
              <div className="rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 h-64 w-full lg:h-96 flex items-center justify-center shadow-xl">
                <h3 className="text-4xl font-bold text-white">{name}</h3>
              </div>
            )}
          </div>
        </div>
        
        {/* 公司统计数据 */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-6 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="mx-auto">
                <dt className="text-base font-medium text-gray-500">{stat.label}</dt>
                <dd className="mt-2 text-3xl font-bold tracking-tight text-indigo-600">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo; 