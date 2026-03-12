"use client";

import React from 'react';
import { tagStyles } from '@/styles/designSystem';

// 更新标签颜色选项
type TagColor = 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'professional' | 'accent' | 'service';

interface TagProps {
  color?: TagColor;
  className?: string;
  children: React.ReactNode;
}

const Tag: React.FC<TagProps> = ({
  color = 'gray',
  className = '',
  children,
}) => {
  // 组合样式类
  const baseStyle = tagStyles.base;
  const colorStyle = tagStyles.colors[color];
  
  const tagClass = `
    ${baseStyle}
    ${colorStyle}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <span className={tagClass}>
      {children}
    </span>
  );
};

export default Tag;
