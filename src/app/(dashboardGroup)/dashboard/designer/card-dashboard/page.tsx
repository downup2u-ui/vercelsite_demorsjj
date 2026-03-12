"use client";
import React from "react";
import Link from "next/link";

interface FeatureCardProps {
  title: string;
  icon: string; // Placeholder for icon, e.g., emoji or a class name for an icon font
  href: string;
  description?: string;
}

const FeatureCard: React.FC<FeatureCardProps & { isHighlighted?: boolean }> = ({ title, icon, href, description, isHighlighted }) => {
  return (
    <Link
      href={href}
      className={`block bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border group ${
        isHighlighted ? 'border-orange-500 border-2' : 'border-gray-200'
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">{icon}</div>
        <h4 className="text-lg font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">{title}</h4>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
    </Link>
  );
};

/**
 * Represents a metric card for displaying key data points.
 */
interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: string; // Emoji or icon class
  bgColor?: string;
  textColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon, bgColor = 'bg-indigo-500', textColor = 'text-white' }) => {
  return (
    <div className={`p-5 rounded-lg shadow-md ${bgColor} ${textColor}`}>
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <div className="text-4xl font-bold">{value}</div>
      <div className="text-sm opacity-90 mt-1">{label}</div>
    </div>
  );
};

/**
 * DesignerDashboardPage component renders the personalized dashboard for Designers.
 * It utilizes the DashboardLayout for common structure and provides designer-specific content,
 * now featuring a card-based layout for tools and functions.
 */
export default function DesignerCardDashboardPage() {
  const professionName = "设计师 (Designer)";
  const welcomeMessage = "这里是您的专属仪表盘，旨在帮助您高效管理设计工作与项目。";

  const features: FeatureCardProps[] = [
    {
      title: "项目管理",
      icon: "💼",
      href: "/dashboard/designer/projects",
      description: "追踪和管理您的设计项目"
    },
    {
      title: "我的作品集",
      icon: "🖼️",
      href: "/dashboard/designer/portfolio",
      description: "展示与管理您的设计成果"
    },
    {
      title: "作品集发布",
      icon: "📤",
      href: "/dashboard/designer/portfolio-publishing",
      description: "发布、分享和追踪您的设计作品"
    },
    {
      title: "活动发起",
      icon: "📅",
      href: "/dashboard/designer/event-creation",
      description: "创建和管理设计活动与工作坊"
    },
    {
      title: "空间预约",
      icon: "🏢",
      href: "/dashboard/designer/space-booking",
      description: "预约创意空间和展览场地"
    },
    {
      title: "IP收益分润",
      icon: "💰",
      href: "/dashboard/designer/profit-sharing",
      description: "查看您的IP创作收益详情"
    },
    {
      title: "设计资源库",
      icon: "📚",
      href: "/dashboard/designer/resources",
      description: "访问常用工具、素材与灵感"
    },
    {
      title: "法律服务协同",
      icon: "⚖️",
      href: "/dashboard/designer/legal-collaboration",
      description: "为设计项目获取合同起草、审核等法律支持服务"
    },
    {
      title: "知识产权协同",
      icon: "🛡️",
      href: "/dashboard/designer/ip-collaboration",
      description: "获取商标查询、版权登记等知识产权相关服务"
    },
    {
      title: "财务服务协同",
      icon: "💲",
      href: "/dashboard/designer/financial-collaboration",
      description: "为项目预算、税务和收款获取专业财务支持"
    },
  ];

  const collaborationHrefs = [
    "/dashboard/designer/legal-collaboration",
    "/dashboard/designer/ip-collaboration",
    "/dashboard/designer/financial-collaboration",
  ];

  const keyMetrics: MetricCardProps[] = [
    { label: "进行中项目", value: 5, icon: "⏳", bgColor: 'bg-sky-500' },
    { label: "待审核作品", value: 2, icon: "🎨", bgColor: 'bg-amber-500' },
    { label: "本月新增合作咨询", value: 3, icon: "💬", bgColor: 'bg-emerald-500' },
    { label: "总收益 (本月)", value: "¥1,280", icon: "💸", bgColor: 'bg-rose-500' }
  ];

  return (
    <>
      {/* Page-specific header */}
      <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">欢迎回来, {professionName}!</h2>
          <p className="text-gray-500 mt-2 text-lg">
            {welcomeMessage}
          </p>
      </div>

      {/* Designer-specific content with card layout */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">关键数据指标</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {keyMetrics.map(metric => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-gray-700 mb-6">常用功能与工具</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard 
              key={feature.title}
              {...feature}
              isHighlighted={collaborationHrefs.includes(feature.href)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
