"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
// Removed: import DashboardLayout from '@/components/dashboard/DashboardLayout';
// import Chart from 'chart.js/auto'; // 实际使用时取消注释并安装 chart.js

// 定义交易数据接口，包含区块链信息
interface ProfitTransaction {
  id: string;
  date: string;
  source: string; // 例如：T恤销售 (批次 #123), 游戏内皮肤授权
  type: '直接销售' | '授权收入' | '衍生品合作' | '平台奖励' | '其他';
  totalAmount: number; // 原始总金额
  designerSharePercentage?: number; // 设计师分成比例（可选，若适用）
  designerNetProfit: number; // 设计师实得分润
  transactionHash: string;
  blockNumber: number;
  status: '已确认' | '处理中' | '失败';
  partners?: { name: string; share: string; amount: number }[]; // 合作方信息（可选）
}

// 定义饼图数据接口
interface PieChartDataItem {
  name: string;
  value: number;
  color: string;
}

// 示例交易数据
const sampleTransactions: ProfitTransaction[] = [
  {
    id: 'txn1',
    date: '2024-07-15',
    source: '潮流插画T恤 - 夏日限定款',
    type: '直接销售',
    totalAmount: 2000.00,
    designerSharePercentage: 60, // 假设设计师分成60%
    designerNetProfit: 1200.00,
    transactionHash: '0xabc123...def456',
    blockNumber: 12345678,
    status: '已确认',
    partners: [
      { name: '律师', share: '10%', amount: 200 },
      { name: '财务', share: '15%', amount: 300 },
      { name: '知识产权机构', share: '15%', amount: 300 }
    ]
  },
  {
    id: 'txn2',
    date: '2024-07-10',
    source: '独立游戏 "幻境迷踪" - 角色授权',
    type: '授权收入',
    totalAmount: 1000.00,
    designerNetProfit: 900.00, // 假设扣除10%的授权代理费
    transactionHash: '0x123ghi...jkl789',
    blockNumber: 12345000,
    status: '已确认',
    partners: [{ name: '授权代理A', share: '10%', amount: 100 }]
  },
  {
    id: 'txn3',
    date: '2024-07-05',
    source: '数字艺术品NFT - "赛博都市#001"',
    type: '衍生品合作',
    totalAmount: 500.00, // 假设这是设计师从NFT销售中获得的版税
    designerNetProfit: 500.00,
    transactionHash: '0xdef456...abc123',
    blockNumber: 12344000,
    status: '已确认',
  },
   {
    id: 'txn4',
    date: '2024-07-18',
    source: '平台季度优秀设计师激励',
    type: '平台奖励',
    totalAmount: 300.00, 
    designerNetProfit: 300.00,
    transactionHash: '0x789jkl...mno456',
    blockNumber: 12346000,
    status: '处理中',
  },
];

/**
 * DesignerProfitSharingPage component displays a detailed view of IP revenue 
 * and profit sharing for a designer.
 * It includes a pie chart for revenue distribution and information about blockchain-based distribution.
 */
export default function DesignerProfitSharingPage() {
  const designerIPName = "我的潮流插画系列"; // Placeholder for actual IP name or selection
  // const professionName = "设计师 (Designer)"; // No longer for layout prop
  // const pageTitle = `IP收益分润: ${designerIPName}`; // Handled by group layout
  const welcomeMessage = "查看您基于区块链的透明、安全、可追溯的IP收益分配详情。";

  // 示例区块链状态数据
  const blockchainStatus = {
    currentHeight: 12345987,
    totalTransactions: sampleTransactions.length, // 可以动态计算
    designerTotalChainProfit: sampleTransactions
      .filter(t => t.status === '已确认')
      .reduce((sum, t) => sum + t.designerNetProfit, 0),
  };
  
  // 颜色映射
  const PIE_COLORS = {
    '设计师': '#4F46E5', // 深蓝
    '律师': '#F59E42',   // 橙色
    '财务': '#10B981',   // 绿色
    '知识产权机构': '#6366F1' // 紫色
  };

  // 准备饼图数据（直接用第一个作品的分润方）
  const [chartData, setChartData] = useState<PieChartDataItem[]>([]);
  useEffect(() => {
    // 只展示第一个作品的分润方
    const tx = sampleTransactions[0];
    const data: PieChartDataItem[] = [
      { name: '设计师', value: tx.designerNetProfit, color: PIE_COLORS['设计师'] },
      ...((tx.partners || []).map(p => ({
        name: p.name,
        value: p.amount,
        color: PIE_COLORS[p.name] || '#A5B4FC'
      })))
    ];
    setChartData(data);
  }, []);

  // 自定义工具提示组件
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-md border border-gray-200">
          <p className="font-medium text-gray-800">{payload[0].name}</p>
          <p className="text-lg font-semibold text-indigo-600">
            {`¥${payload[0].value.toFixed(2)}`}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {`占比: ${((payload[0].value / chartData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  const StatusCard: React.FC<{ title: string; value: string | number; icon: string; unit?: string }> = ({ title, value, icon, unit }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
      <div className="text-3xl text-indigo-500">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">
          {typeof value === 'number' && unit !== '¥' ? value.toLocaleString() : value}
          {unit === '¥' && typeof value === 'number' && ` ${unit}`}
        </p>
      </div>
    </div>
  );
  
  const getStatusColor = (status: ProfitTransaction['status']) => {
    switch (status) {
      case '已确认': return 'bg-green-100 text-green-700';
      case '处理中': return 'bg-yellow-100 text-yellow-700';
      case '失败': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
       <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">IP收益分润: {designerIPName}</h2>
          <p className="text-gray-500 mt-1 text-lg">{welcomeMessage}</p>
        </div>
        <Link href="/dashboard/designer" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          返回设计师仪表盘
        </Link>
      </div>

      {/* Blockchain Status Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">链上状态总览</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatusCard title="当前区块链高度" value={blockchainStatus.currentHeight.toLocaleString()} icon="⛓️" />
          <StatusCard title="相关交易笔数" value={blockchainStatus.totalTransactions} icon="🧾" />
          <StatusCard title="您的链上总收益" value={`¥${blockchainStatus.designerTotalChainProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} icon="💰" />
        </div>
      </section>

      {/* Profit Breakdown Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">收益构成 (基于已确认交易)</h2>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <p className="text-sm text-gray-600 mb-4">
            下图展示了您的IP "{designerIPName}" 的各项收益来源占比 (已确认交易)。
            所有收益数据通过区块链智能合约自动记录与分配。
          </p>
          <div className="w-full md:w-3/4 lg:w-2/3 mx-auto p-4 min-h-[350px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={130}
                    innerRadius={60}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    formatter={(value, entry, index) => (
                      <span className="text-sm font-medium text-gray-700">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <p className="text-lg">暂无数据</p>
                  <p className="text-sm">尚无已确认的收益交易记录</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Transaction Details Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">分润交易明细 (最近 {sampleTransactions.length} 条)</h2>
        <div className="bg-white p-2 rounded-xl shadow-lg overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">收益来源/项目</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">总金额</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分成比例</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">设计师实得</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交易哈希</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">区块编号</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
              {sampleTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="py-4 px-4 whitespace-nowrap">{tx.date}</td>
                  <td className="py-4 px-4 whitespace-nowrap max-w-xs truncate" title={tx.source}>{tx.source}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center">
                      <span className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: PIE_COLORS[tx.type] || '#A5B4FC' }}></span>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">¥{tx.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="py-4 px-4 whitespace-nowrap">{tx.designerSharePercentage ? `${tx.designerSharePercentage}%` : 'N/A'}</td>
                  <td className="py-4 px-4 whitespace-nowrap font-semibold text-indigo-600">¥{tx.designerNetProfit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <Link href={`#view-tx-${tx.transactionHash}`} className="text-blue-500 hover:underline truncate max-w-[100px] block" title={tx.transactionHash}>
                      {tx.transactionHash.substring(0, 6)}...{tx.transactionHash.substring(tx.transactionHash.length - 4)}
                    </Link>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">{tx.blockNumber.toLocaleString()}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-6">
            <button 
                type="button"
                onClick={() => alert('将跳转到详细的交易列表页面或支持搜索/过滤的区块链浏览器 (占位符)')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors duration-300 text-sm shadow-md hover:shadow-lg"
            >
                查看所有交易记录
            </button>
        </div>
      </section>

      {/* Blockchain Transparency Info Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">区块链如何保障您的权益？</h2>
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-3 text-sm text-gray-600">
          <p>本平台采用先进的区块链技术来记录和处理所有与您IP相关的收益和分润交易。这意味着：</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong>透明可追溯：</strong> 每一笔交易都被永久记录在不可篡改的区块链上。您可以随时通过交易哈希公开验证交易的真实性和细节。</li>
            <li><strong>自动执行：</strong> 基于智能合约，分润计算和支付在满足预设条件时自动执行，减少人工干预和潜在错误。</li>
            <li><strong>安全可靠：</strong> 区块链的分布式特性确保了数据的安全性和抗审查性，您的收益记录不会丢失或被恶意修改。</li>
            <li><strong>公平公正：</strong> 所有参与方的分润规则都预先写入智能合约，公开透明，确保按约定公平分配。</li>
          </ul>
          <p className="pt-2">我们致力于为您提供一个值得信赖的创作收益环境。</p>
          <div className="pt-3">
            <Link
              href="/faq/blockchain-profit-sharing"
              className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-300 text-sm font-medium"
            >
              了解更多关于区块链收益分配的信息 &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
} 
