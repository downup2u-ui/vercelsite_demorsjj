"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  BanknotesIcon,
  CurrencyYenIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  CalendarIcon,
  ArrowsRightLeftIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CreditCardIcon,
  ReceiptRefundIcon,
  ArrowTrendingDownIcon,
  DocumentDuplicateIcon,
  PrinterIcon,
  ShoppingBagIcon,
  TagIcon
} from '@heroicons/react/24/outline';

// 结算卡片组件
interface SettlementCardProps {
  id: string;
  orderNumber: string;
  orderTitle: string;
  customerName: string;
  amount: string;
  status: 'pending' | 'processing' | 'paid' | 'overdue' | 'refunded' | 'cancelled';
  invoiceNumber?: string;
  paymentMethod?: string;
  issueDate: string;
  dueDate: string;
  paymentDate?: string;
  paymentTerms: string;
  taxAmount: string;
  currency: string;
  invoiceUrl?: string;
  notes?: string;
  href: string;
}

const SettlementCard: React.FC<SettlementCardProps> = ({
  id,
  orderNumber,
  orderTitle,
  customerName,
  amount,
  status,
  invoiceNumber,
  paymentMethod,
  issueDate,
  dueDate,
  paymentDate,
  paymentTerms,
  taxAmount,
  currency,
  invoiceUrl,
  notes,
  href
}) => {
  // 状态配置
  const statusConfig = {
    pending: {
      label: '待结算',
      color: 'bg-yellow-100 text-yellow-800',
      icon: <ClockIcon className="h-4 w-4 mr-1" />
    },
    processing: {
      label: '处理中',
      color: 'bg-blue-100 text-blue-800',
      icon: <ClockIcon className="h-4 w-4 mr-1" />
    },
    paid: {
      label: '已付款',
      color: 'bg-green-100 text-green-800',
      icon: <CheckCircleIcon className="h-4 w-4 mr-1" />
    },
    overdue: {
      label: '已逾期',
      color: 'bg-red-100 text-red-800',
      icon: <ExclamationCircleIcon className="h-4 w-4 mr-1" />
    },
    refunded: {
      label: '已退款',
      color: 'bg-purple-100 text-purple-800',
      icon: <ReceiptRefundIcon className="h-4 w-4 mr-1" />
    },
    cancelled: {
      label: '已取消',
      color: 'bg-gray-100 text-gray-800',
      icon: <XCircleIcon className="h-4 w-4 mr-1" />
    }
  };

  const currentStatus = statusConfig[status];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <span className="text-gray-500 text-sm">订单号: </span>
              <span className="ml-1 font-medium text-gray-800">{orderNumber}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{orderTitle}</h3>
            <p className="text-sm text-gray-600">客户: {customerName}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${currentStatus.color} mb-2`}>
              {currentStatus.icon}
              {currentStatus.label}
            </span>
            <p className="font-bold text-lg text-gray-800">{amount}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3 text-sm">
          <div>
            <p className="text-xs text-gray-500">结算编号</p>
            <p className="font-medium text-gray-800">{id}</p>
          </div>
          {invoiceNumber && (
            <div>
              <p className="text-xs text-gray-500">发票编号</p>
              <p className="font-medium text-gray-800">{invoiceNumber}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-gray-500">开具日期</p>
            <p className="font-medium text-gray-800">{issueDate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">到期日</p>
            <p className={`font-medium ${status === 'overdue' ? 'text-red-600' : 'text-gray-800'}`}>{dueDate}</p>
          </div>
          {paymentDate && (
            <div>
              <p className="text-xs text-gray-500">支付日期</p>
              <p className="font-medium text-gray-800">{paymentDate}</p>
            </div>
          )}
          {paymentMethod && (
            <div>
              <p className="text-xs text-gray-500">支付方式</p>
              <p className="font-medium text-gray-800">{paymentMethod}</p>
            </div>
          )}
        </div>
        
        <div className="mb-3 p-3 bg-gray-50 rounded-md grid grid-cols-3 gap-2">
          <div>
            <p className="text-xs text-gray-500">税前金额</p>
            <p className="font-medium text-gray-800">{parseFloat(amount.replace(/[^\d.-]/g, '')).toFixed(2)} {currency}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">税额</p>
            <p className="font-medium text-gray-800">{taxAmount}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">结算条款</p>
            <p className="font-medium text-gray-800">{paymentTerms}</p>
          </div>
        </div>
        
        {notes && (
          <div className="mb-4 p-3 bg-yellow-50 rounded-md border border-yellow-100">
            <p className="text-xs text-gray-500 mb-1">备注</p>
            <p className="text-sm text-gray-600">{notes}</p>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex space-x-2">
            {invoiceUrl && (
              <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition" title="下载发票">
                <ArrowDownTrayIcon className="h-4 w-4" />
              </button>
            )}
            <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition" title="打印发票">
              <PrinterIcon className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition" title="查看订单详情">
              <ShoppingBagIcon className="h-4 w-4" />
            </button>
          </div>
          <Link href={href}>
            <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition">
              {status === 'pending' ? '处理结算' : '查看详情'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// 统计卡片组件
interface StatCardProps {
  label: string;
  value: string;
  trend?: {
    value: string;
    isUp: boolean;
  };
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon, color }) => {
  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
      <div className="flex items-center mb-2">
        <div className={`p-2 rounded-md ${color} mr-3`}>
          {icon}
        </div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
      </div>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      {trend && (
        <div className="flex items-center mt-1 text-sm">
          {trend.isUp ? (
            <span className="text-green-600 flex items-center">
              <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              {trend.value}
            </span>
          ) : (
            <span className="text-red-600 flex items-center">
              <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
              {trend.value}
            </span>
          )}
          <span className="text-gray-500 ml-1">与上月相比</span>
        </div>
      )}
    </div>
  );
};

// 筛选按钮组件
interface FilterButtonProps {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, count, active, onClick }) => {
  return (
    <button
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        active
          ? 'bg-indigo-100 text-indigo-700'
          : 'bg-white text-gray-700 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      {label}
      {count !== undefined && (
        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
          active ? 'bg-indigo-200 text-indigo-800' : 'bg-gray-200 text-gray-700'
        }`}>
          {count}
        </span>
      )}
    </button>
  );
};

export default function SettlementPage() {
  // 状态筛选
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'processing' | 'paid' | 'overdue' | 'refunded' | 'cancelled'>('all');
  
  // 时间筛选
  const [timeFilter, setTimeFilter] = useState<'all' | 'current-month' | 'last-month' | 'current-quarter' | 'current-year'>('all');
  
  // 结算数据
  const settlements: SettlementCardProps[] = [
    {
      id: "SET-2023-045",
      orderNumber: "ORD-2023-1025",
      orderTitle: "办公椅设计定制项目",
      customerName: "上海创新科技有限公司",
      amount: "¥24,800.00",
      status: "paid",
      invoiceNumber: "INV-20231225-001",
      paymentMethod: "银行转账",
      issueDate: "2023-12-15",
      dueDate: "2023-12-30",
      paymentDate: "2023-12-28",
      paymentTerms: "15天",
      taxAmount: "¥1,488.00",
      currency: "CNY",
      invoiceUrl: "/invoices/inv-20231225-001.pdf",
      href: "/dashboard/designer/settlement/set-2023-045"
    },
    {
      id: "SET-2023-042",
      orderNumber: "ORD-2023-1022",
      orderTitle: "可持续材料家具系列",
      customerName: "绿色生活家居",
      amount: "¥42,600.00",
      status: "pending",
      invoiceNumber: "INV-20231220-003",
      issueDate: "2023-12-20",
      dueDate: "2024-01-20",
      paymentTerms: "30天",
      taxAmount: "¥2,556.00",
      currency: "CNY",
      invoiceUrl: "/invoices/inv-20231220-003.pdf",
      href: "/dashboard/designer/settlement/set-2023-042"
    },
    {
      id: "SET-2023-040",
      orderNumber: "ORD-2023-1018",
      orderTitle: "品牌识别系统设计",
      customerName: "新锐科技初创公司",
      amount: "¥18,500.00",
      status: "paid",
      invoiceNumber: "INV-20231215-005",
      paymentMethod: "支付宝",
      issueDate: "2023-12-15",
      dueDate: "2023-12-30",
      paymentDate: "2023-12-20",
      paymentTerms: "15天",
      taxAmount: "¥1,110.00",
      currency: "CNY",
      invoiceUrl: "/invoices/inv-20231215-005.pdf",
      href: "/dashboard/designer/settlement/set-2023-040"
    },
    {
      id: "SET-2023-038",
      orderNumber: "ORD-2023-1015",
      orderTitle: "智能家居控制界面设计",
      customerName: "智能家居科技公司",
      amount: "¥32,000.00",
      status: "processing",
      invoiceNumber: "INV-20231210-002",
      issueDate: "2023-12-10",
      dueDate: "2024-01-09",
      paymentTerms: "30天",
      taxAmount: "¥1,920.00",
      currency: "CNY",
      invoiceUrl: "/invoices/inv-20231210-002.pdf",
      notes: "客户已确认收到发票，预计近期付款",
      href: "/dashboard/designer/settlement/set-2023-038"
    },
    {
      id: "SET-2023-035",
      orderNumber: "ORD-2023-1010",
      orderTitle: "展厅空间设计项目",
      customerName: "上海艺术博览会",
      amount: "¥58,000.00",
      status: "cancelled",
      issueDate: "2023-11-30",
      dueDate: "2023-12-30",
      paymentTerms: "30天",
      taxAmount: "¥3,480.00",
      currency: "CNY",
      notes: "项目已取消，客户支付了前期设计费用，已另行结算",
      href: "/dashboard/designer/settlement/set-2023-035"
    },
    {
      id: "SET-2023-032",
      orderNumber: "ORD-2023-1008",
      orderTitle: "儿童家具设计系列",
      customerName: "快乐童年家居有限公司",
      amount: "¥26,500.00",
      status: "overdue",
      invoiceNumber: "INV-20231115-001",
      issueDate: "2023-11-15",
      dueDate: "2023-12-15",
      paymentTerms: "30天",
      taxAmount: "¥1,590.00",
      currency: "CNY",
      invoiceUrl: "/invoices/inv-20231115-001.pdf",
      notes: "已发送付款提醒",
      href: "/dashboard/designer/settlement/set-2023-032"
    }
  ];
  
  // 统计数据
  const stats = [
    {
      label: "总收入",
      value: "¥1,285,600",
      trend: { value: "15%", isUp: true },
      icon: <BanknotesIcon className="h-5 w-5 text-green-500" />,
      color: "bg-green-50"
    },
    {
      label: "待结算",
      value: "¥128,500",
      icon: <ClockIcon className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-50"
    },
    {
      label: "已结算",
      value: "¥952,300",
      trend: { value: "8%", isUp: true },
      icon: <CheckCircleIcon className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      label: "逾期未付",
      value: "¥26,500",
      trend: { value: "5%", isUp: false },
      icon: <ExclamationCircleIcon className="h-5 w-5 text-red-500" />,
      color: "bg-red-50"
    }
  ];
  
  // 根据筛选条件过滤结算记录
  const filteredSettlements = settlements.filter(settlement => {
    if (statusFilter !== 'all' && settlement.status !== statusFilter) return false;
    
    // 时间筛选逻辑
    if (timeFilter !== 'all') {
      const issueDate = new Date(settlement.issueDate);
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      
      if (timeFilter === 'current-month') {
        if (issueDate.getMonth() !== currentMonth || issueDate.getFullYear() !== currentYear) return false;
      } else if (timeFilter === 'last-month') {
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        if (issueDate.getMonth() !== lastMonth || issueDate.getFullYear() !== lastMonthYear) return false;
      } else if (timeFilter === 'current-quarter') {
        const currentQuarter = Math.floor(currentMonth / 3);
        const issueQuarter = Math.floor(issueDate.getMonth() / 3);
        if (issueQuarter !== currentQuarter || issueDate.getFullYear() !== currentYear) return false;
      } else if (timeFilter === 'current-year') {
        if (issueDate.getFullYear() !== currentYear) return false;
      }
    }
    
    return true;
  });

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">产品结算</h1>
        <p className="mt-2 text-sm text-gray-600">
          管理订单结算流程，跟踪付款状态和财务记录
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* 结算管理区域 */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <h2 className="text-lg font-semibold text-gray-800">结算管理</h2>
          <div className="flex gap-2">
            <Link href="/dashboard/designer/settlement/new-invoice">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition flex items-center">
                <DocumentTextIcon className="h-5 w-5 mr-1" />
                创建发票
              </button>
            </Link>
            <Link href="/dashboard/designer/settlement/new-record">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition flex items-center">
                <PlusIcon className="h-5 w-5 mr-1" />
                添加记录
              </button>
            </Link>
          </div>
        </div>
        
        {/* 状态筛选按钮 */}
        <div className="flex items-center space-x-2 mb-4">
          <FunnelIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">状态:</span>
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              label="全部" 
              count={settlements.length}
              active={statusFilter === 'all'} 
              onClick={() => setStatusFilter('all')} 
            />
            <FilterButton 
              label="待结算" 
              count={settlements.filter(s => s.status === 'pending').length}
              active={statusFilter === 'pending'} 
              onClick={() => setStatusFilter('pending')} 
            />
            <FilterButton 
              label="处理中" 
              count={settlements.filter(s => s.status === 'processing').length}
              active={statusFilter === 'processing'} 
              onClick={() => setStatusFilter('processing')} 
            />
            <FilterButton 
              label="已付款" 
              count={settlements.filter(s => s.status === 'paid').length}
              active={statusFilter === 'paid'} 
              onClick={() => setStatusFilter('paid')} 
            />
            <FilterButton 
              label="已逾期" 
              count={settlements.filter(s => s.status === 'overdue').length}
              active={statusFilter === 'overdue'} 
              onClick={() => setStatusFilter('overdue')} 
            />
            <FilterButton 
              label="已退款" 
              count={settlements.filter(s => s.status === 'refunded').length}
              active={statusFilter === 'refunded'} 
              onClick={() => setStatusFilter('refunded')} 
            />
            <FilterButton 
              label="已取消" 
              count={settlements.filter(s => s.status === 'cancelled').length}
              active={statusFilter === 'cancelled'} 
              onClick={() => setStatusFilter('cancelled')} 
            />
          </div>
        </div>
        
        {/* 时间筛选按钮 */}
        <div className="flex items-center space-x-2 mb-4">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">时间范围:</span>
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              label="全部时间" 
              active={timeFilter === 'all'} 
              onClick={() => setTimeFilter('all')} 
            />
            <FilterButton 
              label="本月" 
              active={timeFilter === 'current-month'} 
              onClick={() => setTimeFilter('current-month')} 
            />
            <FilterButton 
              label="上月" 
              active={timeFilter === 'last-month'} 
              onClick={() => setTimeFilter('last-month')} 
            />
            <FilterButton 
              label="本季度" 
              active={timeFilter === 'current-quarter'} 
              onClick={() => setTimeFilter('current-quarter')} 
            />
            <FilterButton 
              label="本年度" 
              active={timeFilter === 'current-year'} 
              onClick={() => setTimeFilter('current-year')} 
            />
          </div>
        </div>
        
        {/* 搜索框 */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="搜索结算编号、订单号或客户名称..."
            className="pl-10 w-full h-10 bg-white border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        {/* 排序下拉框 */}
        <div className="flex justify-end mb-4">
          <div className="relative inline-block text-left">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              排序: 日期 (最近)
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
        
        {/* 结算卡片列表 */}
        <div className="space-y-6">
          {filteredSettlements.length > 0 ? (
            filteredSettlements.map((settlement) => (
              <SettlementCard
                key={settlement.id}
                id={settlement.id}
                orderNumber={settlement.orderNumber}
                orderTitle={settlement.orderTitle}
                customerName={settlement.customerName}
                amount={settlement.amount}
                status={settlement.status}
                invoiceNumber={settlement.invoiceNumber}
                paymentMethod={settlement.paymentMethod}
                issueDate={settlement.issueDate}
                dueDate={settlement.dueDate}
                paymentDate={settlement.paymentDate}
                paymentTerms={settlement.paymentTerms}
                taxAmount={settlement.taxAmount}
                currency={settlement.currency}
                invoiceUrl={settlement.invoiceUrl}
                notes={settlement.notes}
                href={settlement.href}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-gray-200">
              <DocumentTextIcon className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到结算记录</h3>
              <p className="text-gray-500 mb-4">尝试调整筛选条件或添加新的结算记录</p>
              <div className="flex space-x-3">
                <button 
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setStatusFilter('all');
                    setTimeFilter('all');
                  }}
                >
                  <ArrowsRightLeftIcon className="h-4 w-4 mr-2" />
                  重置筛选条件
                </button>
                <Link href="/dashboard/designer/settlement/new-record">
                  <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    添加记录
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
        
        {/* 分页控件 */}
        {filteredSettlements.length > 0 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              显示 {filteredSettlements.length} 个结算记录中的 1-{Math.min(filteredSettlements.length, 10)}
            </p>
            <div className="flex space-x-1">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
                上一页
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
                下一页
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 财务分析 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <ChartBarIcon className="h-6 w-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">收入趋势</h3>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center">
            <p className="text-gray-500">收入趋势图表区域</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <TagIcon className="h-6 w-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">收入分类</h3>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center">
            <p className="text-gray-500">收入分类图表区域</p>
          </div>
        </div>
      </div>

      {/* 结算流程指南 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-5">结算流程</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <DocumentTextIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">创建发票</h4>
            <p className="text-sm text-gray-600">生成正式发票和付款通知</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <DocumentDuplicateIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">发送发票</h4>
            <p className="text-sm text-gray-600">将发票发送给客户并确认收到</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <ClockIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">付款跟踪</h4>
            <p className="text-sm text-gray-600">监控付款状态并发送提醒</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CurrencyYenIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">收款确认</h4>
            <p className="text-sm text-gray-600">确认收到付款并更新记录</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center border border-indigo-100">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <DocumentDuplicateIcon className="h-6 w-6" />
            </div>
            <h4 className="font-medium text-gray-800 mb-1">归档记录</h4>
            <p className="text-sm text-gray-600">完成结算记录的归档</p>
          </div>
        </div>
      </div>

      {/* 常见问题 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">结算常见问题</h3>
        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h4 className="font-medium text-gray-800 mb-2">如何修改已发送的发票？</h4>
            <p className="text-sm text-gray-600">已发送的发票如需修改，应先作废原发票，然后创建新发票。点击发票详情页的"作废发票"按钮，填写作废原因后确认，再创建新发票。</p>
          </div>
          <div className="border-b border-gray-100 pb-3">
            <h4 className="font-medium text-gray-800 mb-2">如何处理逾期未付款的情况？</h4>
            <p className="text-sm text-gray-600">对于逾期未付款的发票，系统会自动发送提醒邮件。您也可以在发票详情页点击"发送提醒"，或通过"联系客户"按钮直接沟通。如需调整付款计划，可使用"创建付款计划"功能。</p>
          </div>
          <div className="border-b border-gray-100 pb-3">
            <h4 className="font-medium text-gray-800 mb-2">如何查看历史结算记录？</h4>
            <p className="text-sm text-gray-600">您可以使用页面上方的时间筛选器查看不同时间段的结算记录。如需更详细的历史数据，请前往"报表中心"，在"财务报表"部分查看或导出完整的结算历史。</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">税率如何计算？</h4>
            <p className="text-sm text-gray-600">系统默认按照当前适用的税率计算（增值税6%）。如需使用特殊税率或免税，请在创建发票时手动调整税率设置，并确保您有相应的资质证明。</p>
          </div>
        </div>
      </div>
    </div>
  );
} 