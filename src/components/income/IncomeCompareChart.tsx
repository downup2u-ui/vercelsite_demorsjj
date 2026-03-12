"use client";

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export interface IncomeCompareData {
  label: string;
  current: number;
  compare: number;
}

interface IncomeCompareChartProps {
  data: IncomeCompareData[];
  currentLabel?: string;
  compareLabel?: string;
}

export const IncomeCompareChart: React.FC<IncomeCompareChartProps> = ({ data, currentLabel = '本期', compareLabel = '对比期' }) => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="current" fill="#2563eb" name={currentLabel} />
        <Bar dataKey="compare" fill="#f59e42" name={compareLabel} />
      </BarChart>
    </ResponsiveContainer>
  );
}; 