"use client";

import React from 'react';

export interface MissionStatement {
  title: string;
  content: string;
  icon?: React.ReactNode;
}

export interface VisionStatement {
  title: string;
  content: string;
  icon?: React.ReactNode;
}

export interface MissionVisionProps {
  mission: MissionStatement;
  vision: VisionStatement;
  className?: string;
}

const defaultMission: MissionStatement = {
  title: "我们的使命",
  content: "通过提供创新的设计工具、3D打印服务和社区平台，帮助创意人才实现他们的想法，推动潮玩文化的发展。",
  icon: (
    <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  )
};

const defaultVision: VisionStatement = {
  title: "我们的愿景",
  content: "成为中国领先的潮玩创意平台，连接设计师、程序员和创意爱好者，共同创造具有文化价值和商业价值的潮玩作品。",
  icon: (
    <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
};

const MissionVision: React.FC<MissionVisionProps> = ({ 
  mission = defaultMission,
  vision = defaultVision,
  className = ""
}) => {
  return (
    <div className={`bg-white ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">我们的使命与愿景</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto my-6"></div>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            我们致力于创造一个连接创作者与爱好者的平台，推动潮玩文化的发展与创新。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* 使命部分 */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 shadow-sm transform transition-all hover:shadow-md">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                {mission.icon}
              </div>
              <h2 className="ml-4 text-2xl font-bold text-gray-900">{mission.title}</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {mission.content}
            </p>
            <div className="mt-8 pt-6 border-t border-indigo-100 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-indigo-600 font-semibold text-lg">创意设计</div>
                <p className="text-gray-600">提供专业设计工具</p>
              </div>
              <div className="text-center">
                <div className="text-indigo-600 font-semibold text-lg">社区协作</div>
                <p className="text-gray-600">建立创作者生态</p>
              </div>
            </div>
          </div>
          
          {/* 愿景部分 */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 shadow-sm transform transition-all hover:shadow-md">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                {vision.icon}
              </div>
              <h2 className="ml-4 text-2xl font-bold text-gray-900">{vision.title}</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {vision.content}
            </p>
            <div className="mt-8 pt-6 border-t border-indigo-100 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-indigo-600 font-semibold text-lg">文化价值</div>
                <p className="text-gray-600">弘扬中国潮玩文化</p>
              </div>
              <div className="text-center">
                <div className="text-indigo-600 font-semibold text-lg">商业价值</div>
                <p className="text-gray-600">拓展作品市场渠道</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision; 