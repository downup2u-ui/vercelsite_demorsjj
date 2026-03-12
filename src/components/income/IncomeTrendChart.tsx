"use client";

import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export interface IncomeTrendData {
  date: string;
  amount: number;
}

interface IncomeTrendChartProps {
  data: IncomeTrendData[];
}

export const IncomeTrendChart: React.FC<IncomeTrendChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} name="收入" />
      </LineChart>
    </ResponsiveContainer>
  );
}; 