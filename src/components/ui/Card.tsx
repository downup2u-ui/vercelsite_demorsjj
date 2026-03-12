"use client";

import React from 'react';
import Link from 'next/link';
import { cardStyles } from '@/styles/designSystem';

// 添加卡片风格选项
type CardVariant = 'default' | 'professional' | 'accent';

interface CardProps {
  href?: string;
  className?: string;
  interactive?: boolean;
  variant?: CardVariant;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  href,
  className = '',
  interactive = false,
  variant = 'default',
  children,
}) => {
  // 组合样式类
  const baseStyle = cardStyles.base;
  const interactiveStyle = interactive || href ? cardStyles.interactive : '';
  const hoverStyle = interactive || href ? cardStyles.hover : '';
  
  // 根据变体选择不同的样式
  let variantStyle = '';
  if (variant === 'professional') {
    variantStyle = cardStyles.professional;
  } else if (variant === 'accent') {
    variantStyle = cardStyles.accent;
  }
  
  const cardClass = `
    ${baseStyle}
    ${interactiveStyle}
    ${hoverStyle}
    ${variantStyle}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  // 如果有 href 属性，则渲染为链接
  if (href) {
    return (
      <Link href={href} className={cardClass}>
        {children}
      </Link>
    );
  }
  
  // 否则渲染为 div
  return (
    <div className={cardClass}>
      {children}
    </div>
  );
};

export default Card;
