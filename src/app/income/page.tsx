"use client";

import { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { IncomeTrendChart, IncomeTrendData } from '@/components/income/IncomeTrendChart';
import { IncomeCategoryChart, IncomeCategoryData } from '@/components/income/IncomeCategoryChart';
import { IncomeCompareChart, IncomeCompareData } from '@/components/income/IncomeCompareChart';

export default function IncomeStatisticsPage() {
  // 面包屑导航
  const breadcrumbItems = [
    { label: '首页', href: '/' },
    { label: '收入管理', href: '#' },
    { label: '收入统计', href: '/income', active: true }
  ];

  // 筛选条件状态
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [source, setSource] = useState('');

  // 对比周期状态
  const [comparePeriod, setComparePeriod] = useState('prev_month');

  // 应用筛选
  const handleApplyFilter = () => {
    // 这里将来会触发数据刷新
    console.log('筛选条件：', { startDate, endDate, source });
  };

  // 重置筛选
  const handleResetFilter = () => {
    setStartDate('');
    setEndDate('');
    setSource('');
  };

  // 生成模拟数据（根据筛选条件简单变化）
  const generateMockData = (): IncomeTrendData[] => {
    // 生成近7天数据
    const days = 7;
    const today = new Date();
    const arr: IncomeTrendData[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      // 模拟不同筛选条件下的收入
      let base = 1000;
      if (source === 'service') base = 1200;
      if (source === 'royalty') base = 800;
      if (source === 'patent') base = 600;
      if (source === 'sales') base = 1500;
      // 日期范围影响
      if (startDate && dateStr < startDate) continue;
      if (endDate && dateStr > endDate) continue;
      arr.push({ date: dateStr, amount: base + Math.floor(Math.random() * 400) });
    }
    return arr;
  };
  const trendData = generateMockData();

  // 生成模拟分类数据
  const generateCategoryData = (): IncomeCategoryData[] => {
    // 假设有四类收入
    const base = [
      { name: '服务费', key: 'service' },
      { name: '版权使用费', key: 'royalty' },
      { name: '专利收益', key: 'patent' },
      { name: '产品销售', key: 'sales' }
    ];
    // 按筛选条件调整分布
    let total = 0;
    const arr = base.map((item, idx) => {
      let value = 0;
      if (!source || source === item.key) {
        value = 1000 + Math.floor(Math.random() * 500) - idx * 100;
      } else {
        value = 200 + Math.floor(Math.random() * 100);
      }
      // 日期范围影响（简单模拟）
      if (startDate || endDate) {
        value = Math.floor(value * 0.8);
      }
      total += value;
      return { name: item.name, value };
    });
    // 保证总和不为0
    if (total === 0) arr[0].value = 1;
    return arr;
  };
  const categoryData = generateCategoryData();

  // 生成模拟对比数据
  const generateCompareData = (): IncomeCompareData[] => {
    // 以月为单位，生成本期与对比期的收入
    const labels = ['第1周', '第2周', '第3周', '第4周'];
    return labels.map((label, idx) => {
      let current = 1000 + Math.floor(Math.random() * 400) + idx * 100;
      let compare = 900 + Math.floor(Math.random() * 300) + idx * 80;
      // 筛选条件影响
      if (source) {
        current -= 100;
        compare -= 80;
      }
      if (startDate || endDate) {
        current = Math.floor(current * 0.9);
        compare = Math.floor(compare * 0.85);
      }
      // 不同对比周期影响
      if (comparePeriod === 'prev_quarter') {
        compare = Math.floor(compare * 1.2);
      } else if (comparePeriod === 'prev_year') {
        compare = Math.floor(compare * 1.5);
      }
      return { label, current, compare };
    });
  };
  const compareData = generateCompareData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-3xl font-bold">收入统计</h1>
        </div>
        <p className="text-gray-600 mt-2">
          分析您的收入数据，查看趋势、类别分布和与往期的对比情况。
        </p>
      </div>

      {/* 筛选器容器 */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h2 className="text-xl font-semibold mb-4">筛选条件</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 日期范围选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="date"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="开始日期"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                max={endDate || undefined}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="date"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="结束日期"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                min={startDate || undefined}
              />
            </div>
          </div>
          {/* 收入来源选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">收入来源</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={source}
                onChange={e => setSource(e.target.value)}
              >
                <option value="">全部来源</option>
                <option value="service">服务费</option>
                <option value="royalty">版权使用费</option>
                <option value="patent">专利收益</option>
                <option value="sales">产品销售</option>
              </select>
            </div>
          </div>
          {/* 筛选按钮组 */}
          <div className="flex items-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
              onClick={handleApplyFilter}
            >
              应用筛选
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition w-full"
              onClick={handleResetFilter}
            >
              重置
            </button>
          </div>
        </div>
      </div>

      {/* 收入图表容器 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 收入随时间变化图表占位 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">收入趋势</h2>
          <IncomeTrendChart data={trendData} />
        </div>

        {/* 收入分类图表占位 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">收入分类</h2>
          <IncomeCategoryChart data={categoryData} />
        </div>
      </div>

      {/* 收入对比图表占位 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">收入对比</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">对比周期</label>
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={comparePeriod}
              onChange={e => setComparePeriod(e.target.value)}
            >
              <option value="prev_month">与上月对比</option>
              <option value="prev_quarter">与上季度对比</option>
              <option value="prev_year">与去年同期对比</option>
            </select>
          </div>
        </div>
        <IncomeCompareChart data={compareData} currentLabel="本期" compareLabel={
          comparePeriod === 'prev_month' ? '上月' : comparePeriod === 'prev_quarter' ? '上季度' : '去年同期'
        } />
      </div>
    </div>
  );
} 