"use client";

import React from 'react';
import Link from 'next/link';
import { buttonStyles } from '@/styles/designSystem';

// 更新类型定义，增加accent变体
type ButtonVariant = 'primary' | 'secondary' | 'text' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  href?: string;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode; // 添加图标支持
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
  className = '',
  children,
  disabled,
  icon,
  ...props
}) => {
  // 根据大小选择不同的内边距，移除圆角，使用方形边角
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  // 组合样式类
  const baseStyle = buttonStyles[variant]?.base || '';
  const hoverStyle = !disabled ? (buttonStyles[variant]?.hover || '') : '';
  const focusStyle = !disabled ? (buttonStyles[variant]?.focus || '') : '';
  const disabledStyle = disabled ? (buttonStyles[variant]?.disabled || '') : '';
  const widthStyle = fullWidth ? 'w-full' : '';
  
  const buttonClass = `
    ${baseStyle}
    ${hoverStyle}
    ${focusStyle}
    ${disabledStyle}
    ${sizeClasses[size]}
    ${widthStyle}
    ${className}
    ${icon ? 'inline-flex items-center justify-center' : ''}
  `.trim().replace(/\s+/g, ' ');
  
  // 如果有 href 属性，则渲染为链接
  if (href) {
    return (
      <Link 
        href={href} 
        className={buttonClass}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </Link>
    );
  }
  
  // 否则渲染为按钮
  return (
    <button
      className={buttonClass}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
