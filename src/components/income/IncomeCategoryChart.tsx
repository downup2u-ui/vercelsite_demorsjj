"use client";

import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from 'recharts';

export interface IncomeCategoryData {
  name: string;
  value: number;
  color?: string;
}

interface IncomeCategoryChartProps {
  data: IncomeCategoryData[];
}

const COLORS = ['#2563eb', '#10b981', '#f59e42', '#e11d48', '#6366f1'];

export const IncomeCategoryChart: React.FC<IncomeCategoryChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={48}
          fill="#2563eb"
          label
        >
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={entry.color || COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}; 