"use client";

import Link from 'next/link';

/**
 * Represents a feature card on the dashboard.
 */
interface FeatureCardProps {
  title: string;
  icon: string; 
  href: string;
  description?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon, href, description }) => {
  return (
    <Link
      href={href}
      className="block bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-200 group"
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
  icon?: string; 
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
 * EquipmentVendorDashboardPage component renders the personalized dashboard for Equipment Vendors.
 * It uses the DashboardGroupLayout for common structure through route groups.
 */
export default function EquipmentVendorDashboardPage() {
  const professionName = "设备供应商 (Equipment Vendor)";
  const pageTitle = `${professionName} Dashboard`;
  const welcomeMessage = "您的设备展示与销售中心，连接设计师与高质量设备。";

  const features: FeatureCardProps[] = [
    {
      title: "设备状态监控",
      icon: "💻", // Monitor icon
      href: "/dashboard/equipment-vendor-company/device-monitoring",
      description: "实时查看设备运行状态"
    },
    {
      title: "服务订单管理",
      icon: "📋", // Clipboard
      href: "/dashboard/equipment-vendor-company/orders",
      description: "处理和追踪客户订单"
    },
    {
      title: "耗材库存与销售",
      icon: "📦", // Package
      href: "/dashboard/equipment-vendor-company/inventory",
      description: "管理耗材库存和销售记录"
    },
    {
      title: "客户关系管理",
      icon: "👥", // People icon
      href: "/dashboard/equipment-vendor-company/crm",
      description: "维护客户信息与互动"
    },
    {
      title: "维保服务排程",
      icon: "🛠️", // Wrench and hammer
      href: "/dashboard/equipment-vendor-company/maintenance",
      description: "安排设备维护和保养计划"
    },
    {
      title: "财务报表",
      icon: "📊", // Bar chart
      href: "/dashboard/equipment-vendor-company/financials",
      description: "查看销售、成本等财务数据"
    },
    {
      title: "技术支持文档",
      icon: "📄", // Page with curl
      href: "/dashboard/equipment-vendor-company/tech-docs",
      description: "访问设备和服务的技术资料"
    },
    {
      title: "合作与推广",
      icon: "🚀", // Rocket
      href: "/dashboard/equipment-vendor-company/partnerships",
      description: "管理合作伙伴与市场活动"
    },
  ];

  const keyMetrics: MetricCardProps[] = [
    {
      label: "在线设备数量",
      value: 15, // Placeholder
      icon: "🟢", // Green circle for online
      bgColor: 'bg-green-500',
    },
    {
      label: "待处理订单",
      value: 8, // Placeholder
      icon: "⏳",
      bgColor: 'bg-amber-500',
    },
    {
      label: "低库存耗材 (种)",
      value: 3, // Placeholder
      icon: "⚠️", // Warning sign
      bgColor: 'bg-red-500',
    },
    {
        label: "本月新增客户",
        value: 12, // Placeholder
        icon: "👤+",
        bgColor: 'bg-sky-500',
    }
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
        <p className="mt-1 text-gray-500">{welcomeMessage}</p>
      </div>
      
      {/* Equipment vendor-specific content starts here */}
      <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg min-h-[200px]">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">主要功能模块 (构想):</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
          <li><strong>设备产品目录:</strong> 管理销售产品、型号、与规格。</li>
          <li><strong>销售订单追踪:</strong> 查看和处理客户订购请求。</li>
          <li><strong>客户关系管理:</strong> 跟踪与设计师及工作室的合作关系。</li>
          <li><strong>售后服务管理:</strong> 协调维修、保养及技术支持。</li>
          <li><strong>设备推广活动:</strong> 策划新设备发布或优惠活动。</li>
        </ul>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">关键数据指标 (构想):</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>月度销售量与增长率</li>
          <li>热销设备品类分析</li>
          <li>客户满意度评分</li>
        </ul>
      </div>
      {/* Equipment vendor-specific content ends here */}
    </>
  );
} 
