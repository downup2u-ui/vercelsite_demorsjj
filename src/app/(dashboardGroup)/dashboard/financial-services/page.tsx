"use client";

import Link from 'next/link';

// Re-using FeatureCard and MetricCard components (assuming they are generic enough or can be made so)
// If they are defined in a shared location, import from there, otherwise define locally or abstract further.

interface FeatureCardProps {
  title: string;
  icon: string; 
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

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: string; 
  bgColor?: string;
  textColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon, bgColor = 'bg-green-500', textColor = 'text-white' }) => {
  return (
    <div className={`p-5 rounded-lg shadow-md ${bgColor} ${textColor}`}>
      {icon && <div className="text-3xl mb-2">{icon}</div>}
      <div className="text-4xl font-bold">{value}</div>
      <div className="text-sm opacity-90 mt-1">{label}</div>
    </div>
  );
};

/**
 * FinancialServicesDashboardPage component renders the personalized dashboard for Financial Service professionals.
 * It utilizes the DashboardLayout for common structure and provides finance-specific content.
 */
export default function FinancialServicesDashboardPage() {
  const professionName = "财务服务 (Financial Services)";
  const welcomeMessage = "您的财务管理与咨询工作台，助力业务稳健发展。";

  const features: FeatureCardProps[] = [
    {
      title: "账务处理",
      icon: "🧮", // Abacus
      href: "/dashboard/financial-services/accounting",
      description: "日常账目录入、核对与管理"
    },
    {
      title: "税务筹划与申报",
      icon: "📝", // Memo
      href: "/dashboard/financial-services/taxation",
      description: "税务咨询、合规申报与优化"
    },
    {
      title: "财务报表分析",
      icon: "📊", // Bar chart
      href: "/dashboard/financial-services/financial-reports",
      description: "生成、解读财务报表，提供决策支持"
    },
    {
      title: "预算与成本控制",
      icon: "📉", // Chart decreasing (for cost control)
      href: "/dashboard/financial-services/budgeting",
      description: "协助制定预算，监控并控制成本"
    },
    {
      title: "审计支持服务",
      icon: "🔍", // Magnifying glass
      href: "/dashboard/financial-services/audit-support",
      description: "配合内外部审计工作，提供所需资料"
    },
    {
      title: "设计师协作请求",
      icon: "🧑‍🎨", // Artist palette
      href: "/dashboard/financial-services/designer-requests",
      description: "处理设计师的财务咨询与服务请求"
    },
    {
      title: "融资与投资咨询",
      icon: "📈", // Chart increasing (for investment)
      href: "/dashboard/financial-services/investment-consulting",
      description: "提供企业融资渠道与投资策略建议"
    },
  ];

  const collaborationHref = "/dashboard/financial-services/designer-requests";

  const keyMetrics: MetricCardProps[] = [
    {
      label: "待处理账务凭证",
      value: 125, 
      icon: "🧾", // Receipt
      bgColor: 'bg-blue-500',
    },
    {
      label: "本月完成税务申报",
      value: "12家", 
      icon: "✅",
      bgColor: 'bg-teal-500',
    },
    {
      label: "待出具财务报告",
      value: 4,
      icon: "📄",
      bgColor: 'bg-amber-500',
    },
    {
        label: "设计师服务请求",
        value: 2, 
        icon: "📨", // Incoming envelope
        bgColor: 'bg-purple-500',
    }
  ];

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">欢迎访问, {professionName}!</h2>
        <p className="text-gray-500 mt-2 text-lg">{welcomeMessage}</p>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">关键数据指标</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {keyMetrics.map(metric => (
            <MetricCard 
              key={metric.label}
              label={metric.label}
              value={metric.value}
              icon={metric.icon}
              bgColor={metric.bgColor}
            />
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-gray-700 mb-6">核心功能模块</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard 
              key={feature.title}
              title={feature.title} 
              icon={feature.icon} 
              href={feature.href} 
              description={feature.description}
              isHighlighted={feature.href === collaborationHref}
            />
          ))}
        </div>
      </div>
    </>
  );
} 
