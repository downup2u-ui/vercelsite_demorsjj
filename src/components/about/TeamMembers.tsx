"use client";

import React from 'react';
import Image from 'next/image';

export interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'github' | 'email' | 'website';
  url: string;
}

export interface TeamMemberProps {
  name: string;
  title: string;
  bio?: string;
  imageSrc?: string;
  socialLinks?: SocialLink[];
}

export interface TeamGridProps {
  title?: string;
  description?: string;
  members: TeamMemberProps[];
  className?: string;
}

// 单个团队成员组件
const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, 
  title, 
  bio, 
  imageSrc,
  socialLinks 
}) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden transform transition-all hover:shadow-md hover:-translate-y-1">
      <div className="h-48 bg-gray-200 relative">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={`${name} - ${title}`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <svg className="h-20 w-20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14.25c3.73 0 6.75-3.02 6.75-6.75S15.73.75 12 .75 5.25 3.77 5.25 7.5 8.27 14.25 12 14.25zm0-12c2.9 0 5.25 2.35 5.25 5.25S14.9 12.75 12 12.75 6.75 10.4 6.75 7.5 9.1 2.25 12 2.25zM20.25 23.25H3.75c-.41 0-.75-.34-.75-.75 0-4.41 3.59-8 8-8h2c4.41 0 8 3.59 8 8 0 .41-.34.75-.75.75zm-8-7.25c-3.58 0-6.5 2.92-6.5 6.5h13c0-3.58-2.92-6.5-6.5-6.5h-2z"></path>
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-indigo-600 mt-1">{title}</p>
        {bio && <p className="mt-3 text-gray-600">{bio}</p>}
        
        {socialLinks && socialLinks.length > 0 && (
          <div className="mt-4 flex space-x-3">
            {socialLinks.map((link, idx) => (
              <a 
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-600"
              >
                {renderSocialIcon(link.platform)}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// 社交媒体图标渲染
const renderSocialIcon = (platform: string) => {
  switch (platform) {
    case 'twitter':
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'github':
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    case 'email':
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      );
    case 'website':
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      );
    default:
      return null;
  }
};

// 默认团队成员数据
const defaultMembers: TeamMemberProps[] = [
  {
    name: "张创新",
    title: "创始人 & CEO",
    bio: "拥有10年创意设计和产品研发经验，曾任知名设计公司首席设计师。",
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'email', url: 'mailto:ceo@haicreator.com' }
    ]
  },
  {
    name: "李技术",
    title: "技术总监",
    bio: "全栈开发者，专注于3D建模和数字艺术创作工具开发。",
    socialLinks: [
      { platform: 'github', url: '#' },
      { platform: 'linkedin', url: '#' }
    ]
  },
  {
    name: "王艺术",
    title: "艺术总监",
    bio: "国际知名艺术家，作品曾在多个国家展出，擅长将传统艺术与现代科技结合。",
    socialLinks: [
      { platform: 'website', url: '#' },
      { platform: 'email', url: 'mailto:art@haicreator.com' }
    ]
  },
  {
    name: "刘营销",
    title: "市场总监",
    bio: "拥有丰富的潮玩市场营销经验，专注于创意产品的品牌建设和市场推广。",
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'twitter', url: '#' }
    ]
  }
];

// 团队网格组件
const TeamGrid: React.FC<TeamGridProps> = ({ 
  title = "我们的团队",
  description = "我们的团队由一群热爱创意设计和技术的专业人士组成，致力于为用户提供最佳的创意体验。",
  members = defaultMembers,
  className = ""
}) => {
  return (
    <div className={`bg-gray-50 py-16 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto my-6"></div>
          {description && (
            <p className="mt-4 text-lg text-gray-600">{description}</p>
          )}
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {members.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { TeamMember, TeamGrid };
export default TeamGrid; 