"use client";

import { useState, useEffect } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const PARTNER_OPTIONS = [
  { label: '全部合作方', value: '' },
  { label: '张三', value: 'zhangsan' },
  { label: '李四', value: 'lisi' },
  { label: '王五', value: 'wangwu' }
];
const STATUS_OPTIONS = [
  { label: '已支付', value: 'paid' },
  { label: '待支付', value: 'pending' },
  { label: '逾期', value: 'overdue' }
];

// 分成明细数据结构
interface RevenueShareRecord {
  id: string;
  date: string;
  partner: string;
  amount: number;
  sharePercent: number;
  partnerAmount: number;
  companyAmount: number;
  status: string;
}

// 合作方映射
const PARTNER_MAP: Record<string, string> = {
  zhangsan: '张三',
  lisi: '李四',
  wangwu: '王五',
};

// 模拟数据生成
function generateMockData(filter: { startDate: string; endDate: string; partner: string; status: string[] }): RevenueShareRecord[] {
  const partners = ['zhangsan', 'lisi', 'wangwu'];
  const statusArr = ['paid', 'pending', 'overdue'];
  const arr: RevenueShareRecord[] = [];
  for (let i = 0; i < 20; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i * 2);
    const partner = partners[i % partners.length];
    const status = statusArr[i % statusArr.length];
    const amount = 1000 + Math.floor(Math.random() * 2000);
    const sharePercent = [30, 40, 50][i % 3];
    const partnerAmount = Math.round(amount * sharePercent / 100);
    const companyAmount = amount - partnerAmount;
    arr.push({
      id: `RS${1000 + i}`,
      date: date.toISOString().slice(0, 10),
      partner,
      amount,
      sharePercent,
      partnerAmount,
      companyAmount,
      status,
    });
  }
  // 筛选
  return arr.filter(item => {
    if (filter.startDate && item.date < filter.startDate) return false;
    if (filter.endDate && item.date > filter.endDate) return false;
    if (filter.partner && item.partner !== filter.partner) return false;
    if (filter.status.length && !filter.status.includes(item.status)) return false;
    return true;
  });
}

// 合作方详情弹窗组件
function PartnerDetailModal({ open, onClose, partnerKey }: { open: boolean; onClose: () => void; partnerKey: string }) {
  if (!open || !partnerKey) return null;
  // 模拟合作方详情
  const details = {
    zhangsan: {
      name: '张三',
      sharePercent: 40,
      totalAmount: 32000,
      transactionCount: 18,
      email: 'zhangsan@example.com',
      phone: '13800000001',
    },
    lisi: {
      name: '李四',
      sharePercent: 50,
      totalAmount: 41000,
      transactionCount: 22,
      email: 'lisi@example.com',
      phone: '13800000002',
    },
    wangwu: {
      name: '王五',
      sharePercent: 30,
      totalAmount: 27000,
      transactionCount: 14,
      email: 'wangwu@example.com',
      phone: '13800000003',
    },
  };
  const info = details[partnerKey];
  if (!info) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={onClose} aria-label="关闭">
          ×
        </button>
        <h3 className="text-xl font-bold mb-4">合作方详情</h3>
        <div className="space-y-2">
          <div><span className="font-medium">名称：</span>{info.name}</div>
          <div><span className="font-medium">分成比例：</span>{info.sharePercent}%</div>
          <div><span className="font-medium">历史分成总额：</span>{info.totalAmount} 元</div>
          <div><span className="font-medium">交易次数：</span>{info.transactionCount}</div>
          <div><span className="font-medium">邮箱：</span>{info.email}</div>
          <div><span className="font-medium">电话：</span>{info.phone}</div>
        </div>
      </div>
    </div>
  );
}

// CSV导出工具
function exportToCSV(records: RevenueShareRecord[]) {
  const header = ['日期','合作方','总金额(元)','分成比例','合作方金额(元)','公司金额(元)','付款状态'];
  const rows = records.map(item => [
    item.date,
    PARTNER_MAP[item.partner] || item.partner,
    item.amount,
    `${item.sharePercent}%`,
    item.partnerAmount,
    item.companyAmount,
    item.status === 'paid' ? '已支付' : item.status === 'pending' ? '待支付' : '逾期',
  ]);
  const csvContent = [header, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'revenue-sharing.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function RevenueSharingPage() {
  const breadcrumbItems = [
    { label: '首页', href: '/' },
    { label: '收入管理', href: '#' },
    { label: '收入分成明细', href: '/revenue-sharing', active: true }
  ];

  // 筛选条件状态
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [partner, setPartner] = useState('');
  const [status, setStatus] = useState<string[]>([]);

  // 数据状态
  const [data, setData] = useState<RevenueShareRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 合作方详情弹窗状态
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [currentPartner, setCurrentPartner] = useState('');

  // 应用筛选
  const handleApplyFilter = () => {
    // 这里将来会触发数据刷新
    console.log('筛选条件：', { startDate, endDate, partner, status });
  };

  // 重置筛选
  const handleResetFilter = () => {
    setStartDate('');
    setEndDate('');
    setPartner('');
    setStatus([]);
  };

  // 付款状态多选
  const handleStatusChange = (val: string) => {
    setStatus(prev => prev.includes(val) ? prev.filter(s => s !== val) : [...prev, val]);
  };

  // 获取数据
  const fetchData = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        const res = generateMockData({ startDate, endDate, partner, status });
        setData(res);
      } catch (e) {
        setError('数据加载失败');
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  // 首次加载和筛选变化时刷新
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, partner, status]);

  // 统计汇总
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  const totalCount = data.length;
  const paidAmount = data.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const paidCount = data.filter(i => i.status === 'paid').length;
  const pendingAmount = data.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0);
  const pendingCount = data.filter(i => i.status === 'pending').length;
  const overdueAmount = data.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0);
  const overdueCount = data.filter(i => i.status === 'overdue').length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-3xl font-bold">收入分成明细</h1>
        </div>
        <p className="text-gray-600 mt-2">
          查看所有收入分成的详细记录，包括交易历史、合作方详情、分成比例和付款状态。
        </p>
      </div>

      {/* 筛选面板 */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h2 className="text-xl font-semibold mb-4">筛选条件</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* 日期范围 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
            <input
              type="date"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              max={endDate || undefined}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
            <input
              type="date"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              min={startDate || undefined}
            />
          </div>
          {/* 合作方选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">合作方</label>
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={partner}
              onChange={e => setPartner(e.target.value)}
            >
              {PARTNER_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          {/* 付款状态多选 */}
          <div className="col-span-2 flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">付款状态</label>
            <div className="flex gap-4 flex-wrap">
              {STATUS_OPTIONS.map(opt => (
                <label key={opt.value} className="inline-flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                    checked={status.includes(opt.value)}
                    onChange={() => handleStatusChange(opt.value)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
          {/* 按钮组 */}
          <div className="col-span-5 flex gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={handleApplyFilter}
            >
              应用筛选
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              onClick={handleResetFilter}
            >
              重置
            </button>
          </div>
        </div>
      </div>

      {/* 预留后续功能区域 */}
      <div className="bg-white rounded-lg shadow p-8 min-h-[300px]">
        {/* 统计汇总与导出 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded">总分成金额：<span className="font-bold">{totalAmount}</span> 元</div>
            <div className="bg-gray-50 text-gray-700 px-4 py-2 rounded">总交易笔数：<span className="font-bold">{totalCount}</span></div>
            <div className="bg-green-50 text-green-700 px-4 py-2 rounded">已支付：<span className="font-bold">{paidAmount}</span> 元 / {paidCount} 笔</div>
            <div className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded">待支付：<span className="font-bold">{pendingAmount}</span> 元 / {pendingCount} 笔</div>
            <div className="bg-red-50 text-red-700 px-4 py-2 rounded">逾期：<span className="font-bold">{overdueAmount}</span> 元 / {overdueCount} 笔</div>
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
            onClick={() => exportToCSV(data)}
            disabled={data.length === 0}
          >
            导出CSV
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center text-gray-400 h-40">加载中...</div>
        ) : error ? (
          <div className="flex items-center justify-center text-red-500 h-40">{error}</div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center text-gray-400 h-40">暂无数据</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 font-medium">日期</th>
                  <th className="px-4 py-2 font-medium">合作方</th>
                  <th className="px-4 py-2 font-medium">总金额(元)</th>
                  <th className="px-4 py-2 font-medium">分成比例</th>
                  <th className="px-4 py-2 font-medium">合作方金额(元)</th>
                  <th className="px-4 py-2 font-medium">公司金额(元)</th>
                  <th className="px-4 py-2 font-medium">付款状态</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id} className="border-b last:border-0 hover:bg-blue-50 transition">
                    <td className="px-4 py-2 whitespace-nowrap">{item.date}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <button
                        className="text-blue-600 underline hover:text-blue-800"
                        onClick={() => { setCurrentPartner(item.partner); setShowPartnerModal(true); }}
                        type="button"
                      >
                        {PARTNER_MAP[item.partner] || item.partner}
                      </button>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">{item.amount}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{item.sharePercent}%</td>
                    <td className="px-4 py-2 whitespace-nowrap">{item.partnerAmount}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{item.companyAmount}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item.status === 'paid' && <span className="text-green-600">已支付</span>}
                      {item.status === 'pending' && <span className="text-yellow-600">待支付</span>}
                      {item.status === 'overdue' && <span className="text-red-600">逾期</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <PartnerDetailModal open={showPartnerModal} onClose={() => setShowPartnerModal(false)} partnerKey={currentPartner} />
          </div>
        )}
      </div>
    </div>
  );
} 