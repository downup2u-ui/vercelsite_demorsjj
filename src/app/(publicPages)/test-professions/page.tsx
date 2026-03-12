"use client";

import Link from 'next/link';
import { FC } from 'react';

/**
 * Represents a single profession with its display name, URL-friendly slug, and icon.
 */
interface Profession {
  name: string;
  slug: string;
  icon: string; // 添加图标字段
  description?: string; // 可选的描述字段
}

/**
 * Represents a category of professions, containing the category name and a list of professions.
 */
interface ProfessionCategory {
  categoryName: string;
  icon: string; // 添加类别图标
  professions: Profession[];
}

/**
 * Converts a string into a URL-friendly slug.
 * It converts the text to lowercase, replaces spaces with hyphens,
 * removes parentheses and their content, and replaces Chinese punctuation with hyphens.
 * @param {string} text - The input string to slugify.
 * @returns {string} The slugified string.
 */
const slugify = (text: string): string => {
  const mainText = text.split('(')[0].trim();
  return mainText.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[/()]/g, '')
    .replace(/、/g, '-'); // 替换中文顿号
};

// 职业卡片组件，展示单个职业选项
const ProfessionCard: FC<{
  profession: Profession;
  isHighlighted: boolean;
}> = ({ profession, isHighlighted }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-indigo-300 hover:translate-y-[-5px] transform">
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-3">{profession.icon}</div>
        <h3 className="text-xl font-medium text-gray-800">{profession.name}</h3>
      </div>
      
      {profession.description && (
        <p className="text-gray-600 mb-5 text-sm">{profession.description}</p>
      )}
      
      <Link 
        href={`/dashboard/${profession.slug}`} 
        className={`block w-full text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-300 ${
          isHighlighted
            ? "bg-indigo-600 hover:bg-indigo-700"
            : "bg-emerald-600 hover:bg-emerald-700"
        }`}
      >
        进入系统
      </Link>
    </div>
  );
};

// Data for profession categories and their respective professions.
const professionData: ProfessionCategory[] = [
  {
    categoryName: "创客",
    icon: "🛠️",
    professions: [
      { 
        name: "设计师 (Designer)", 
        slug: slugify("Designer"),
        icon: "🎨",
        description: "为产品、界面或品牌创建视觉设计与创意方案" 
      },
      { 
        name: "艺术家 (Artist)", 
        slug: slugify("Artist"),
        icon: "🖌️",
        description: "创作艺术作品，表达创意理念与审美价值" 
      },
      { 
        name: "手工艺者 (Craftsman)", 
        slug: slugify("Craftsman"),
        icon: "🧶",
        description: "从事传统或现代手工艺品的制作与创新" 
      },
      { 
        name: "研发工程师 (Engineer)", 
        slug: slugify("Engineer"),
        icon: "🔧",
        description: "设计、开发和优化技术产品与解决方案" 
      },
    ],
  },
  {
    categoryName: "专业服务提供者",
    icon: "💼",
    professions: [
      { 
        name: "法律服务 (Legal Services)", 
        slug: slugify("Legal Services"),
        icon: "⚖️",
        description: "提供法律咨询、文件审核和知识产权保护服务" 
      },
      { 
        name: "财务服务 (Financial Services)", 
        slug: slugify("Financial Services"),
        icon: "💰",
        description: "提供财务规划、会计和投资咨询服务" 
      },
      { 
        name: "知识产权服务 (IP Services)", 
        slug: slugify("Intellectual Property Services"),
        icon: "📝",
        description: "专注于专利、商标和版权的注册与保护" 
      },
      { 
        name: "顾问服务 (Consulting Services)", 
        slug: slugify("Consulting Services"),
        icon: "📊",
        description: "提供业务战略、市场分析和专业咨询" 
      },
      { 
        name: "技术支持 (Technical Support)", 
        slug: slugify("Technical Support"),
        icon: "🔌",
        description: "提供技术问题解决和系统维护服务" 
      },
    ],
  },
  {
    categoryName: "设备厂商/公司",
    icon: "🏭",
    professions: [
      { 
        name: "设备厂商/公司", 
        slug: slugify("Equipment Vendor Company"),
        icon: "📟",
        description: "生产或销售专业设备、硬件和技术工具" 
      },
    ],
  },
];

/**
 * TestProfessionsPage component displays a list of profession categories and professions,
 * allowing users to navigate to specific dashboard pages for each profession.
 * It uses data defined in `professionData` and the `slugify` utility for generating links.
 */
export default function TestProfessionsPage() {
  const highlightedSlugs = [
    slugify("Designer"),
    slugify("Legal Services"),
    slugify("Financial Services"),
    slugify("Intellectual Property Services"),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      {/* 返回首页按钮 - 放在左上角 */}
      <div className="container mx-auto px-6">
        <Link 
          href="/" 
          className="inline-flex items-center mb-8 text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回首页
        </Link>
        
        <h1 className="text-3xl font-bold mb-10 text-gray-800">
          职业角色选择
        </h1>
        
        {professionData.map((category) => (
          <section key={category.categoryName} className="mb-12">
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-3">{category.icon}</span>
              <h2 className="text-2xl font-semibold text-gray-800">
                {category.categoryName}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.professions.map((profession) => (
                <ProfessionCard
                  key={profession.slug}
                  profession={profession}
                  isHighlighted={highlightedSlugs.includes(profession.slug)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
} 