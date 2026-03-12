/**
 * 设计系统 - 定义网站的统一风格
 * 基于参考Janel Group网站的设计风格
 * 采用专业的深蓝色主色调，搭配红色作为强调色
 */

export const colors = {
  // 主要颜色
  primary: {
    main: '#003B70',      // 深蓝色 - 主色调
    light: '#1A5A8E',     // 浅蓝色
    hover: '#00305C',     // 悬停时的颜色
    dark: '#002547',      // 更深蓝色
  },
  
  // 强调色 - 红色系
  accent: {
    main: '#C8102E',      // 红色 - 强调色
    light: '#E63346',     // 浅红色
    hover: '#B30E29',     // 悬停时的红色
    dark: '#9E0C23',      // 深红色
  },
  
  // 背景颜色
  background: {
    default: '#FFFFFF',   // 白色
    paper: '#F5F5F7',     // 浅灰色背景
    alt: '#E6E6E6',       // 分割线颜色
    card: '#FFFFFF',      // 卡片背景
  },
  
  // 文本颜色
  text: {
    primary: '#333333',   // 主要文字
    secondary: '#666666',  // 常规文字
    tertiary: '#888888',   // 次要文字
    disabled: '#BBBBBB',   // 禁用文本
  },
  
  // 边框颜色
  border: {
    light: '#D9D9D9',     // 边框线
    main: '#BBBBBB',      // 主要边框
  },
  
  // 状态颜色
  status: {
    success: '#00843D',   // 成功
    error: '#C8102E',     // 错误 - 使用强调色红色
    warning: '#F5A623',   // 警告
    info: '#003B70',      // 信息 - 使用主色调蓝色
  }
};

// 按钮样式
export const buttonStyles = {
  // 主要按钮
  primary: {
    base: 'bg-[#003B70] text-white px-4 py-2 font-medium transition-colors', // 移除圆角
    hover: 'hover:bg-[#00305C]',
    focus: 'focus:outline-none focus:ring-2 focus:ring-[#1A5A8E] focus:ring-offset-2',
    disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed',
  },
  
  // 次要按钮
  secondary: {
    base: 'bg-white text-[#003B70] border border-[#003B70] px-4 py-2 font-medium transition-colors', // 移除圆角
    hover: 'hover:bg-[#F0F5FF]',
    focus: 'focus:outline-none focus:ring-2 focus:ring-[#1A5A8E] focus:ring-offset-2',
    disabled: 'bg-white border-gray-300 text-gray-400 cursor-not-allowed',
  },
  
  // 文本按钮
  text: {
    base: 'bg-transparent text-[#003B70] px-4 py-2 font-medium transition-colors',
    hover: 'hover:text-[#00305C] hover:bg-[#F0F5FF]',
    focus: 'focus:outline-none',
    disabled: 'text-gray-400 cursor-not-allowed',
  },
  
  // 强调按钮 (红色)
  accent: {
    base: 'bg-[#C8102E] text-white px-4 py-2 font-medium transition-colors', // 移除圆角
    hover: 'hover:bg-[#B30E29]',
    focus: 'focus:outline-none focus:ring-2 focus:ring-[#E63346] focus:ring-offset-2',
    disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed',
  },
  
  // 图标按钮
  icon: {
    base: 'p-2 transition-colors',
    hover: 'hover:bg-[#F5F5F7]',
    focus: 'focus:outline-none focus:ring-2 focus:ring-[#1A5A8E]',
  }
};

// 卡片样式
export const cardStyles = {
  base: 'bg-white border border-gray-200 overflow-hidden', // 移除圆角和阴影
  hover: 'hover:border-[#003B70] transition-colors duration-300', // 修改悬停效果为边框变色
  interactive: 'cursor-pointer',
  professional: 'border-l-4 border-l-[#003B70]', // 专业风格卡片
  accent: 'border-l-4 border-l-[#C8102E]', // 强调风格卡片
};

// 标签样式
export const tagStyles = {
  base: 'inline-flex items-center px-2.5 py-0.5 text-xs font-medium', // 移除圆角
  colors: {
    gray: 'bg-gray-100 text-gray-800',
    red: 'bg-[#FFEBEE] text-[#C8102E]', // 更新为新的红色
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    blue: 'bg-[#E6EEF6] text-[#003B70]', // 更新为新的蓝色
    indigo: 'bg-indigo-100 text-indigo-800',
    purple: 'bg-purple-100 text-purple-800',
    pink: 'bg-pink-100 text-pink-800',
    // 专业标签
    professional: 'bg-[#E6EEF6] text-[#003B70] border border-[#003B70]',
    accent: 'bg-[#FFEBEE] text-[#C8102E] border border-[#C8102E]',
    service: 'bg-[#F5F5F7] text-[#333333] border border-[#D9D9D9]', // 服务相关
  },
};

// 输入框样式
export const inputStyles = {
  base: 'block w-full border-gray-300 shadow-sm focus:border-[#003B70] focus:ring-[#003B70] sm:text-sm', // 移除圆角
  error: 'border-[#C8102E] focus:border-[#C8102E] focus:ring-[#C8102E]',
  disabled: 'bg-gray-100 text-gray-500 cursor-not-allowed',
};

// 排版样式
export const typography = {
  // 标题 - 使用无衬线字体，更粗体
  h1: 'text-4xl font-sans font-bold tracking-tight text-[#333333] border-b border-gray-200 pb-2',
  h2: 'text-3xl font-sans font-bold tracking-tight text-[#333333] border-b border-gray-200 pb-2',
  h3: 'text-2xl font-sans font-bold text-[#333333]',
  h4: 'text-xl font-sans font-semibold text-[#333333]',
  h5: 'text-lg font-sans font-semibold text-[#333333]',
  h6: 'text-base font-sans font-semibold text-[#333333]',
  // 正文 - 调整行高和颜色
  body1: 'text-base text-[#666666] leading-relaxed',
  body2: 'text-sm text-[#666666] leading-relaxed',
  caption: 'text-xs text-[#888888]',
  // 专业风格
  professional: {
    heading: 'text-2xl font-sans font-bold text-[#003B70] border-l-4 border-[#003B70] pl-3',
    subheading: 'text-lg font-sans font-semibold text-[#003B70]',
  },
  // 强调风格
  accent: {
    heading: 'text-2xl font-sans font-bold text-[#C8102E]',
    subheading: 'text-lg font-sans font-semibold text-[#C8102E]',
  }
};

// 导航样式
export const navigationStyles = {
  main: 'text-[#333333] font-medium hover:text-[#003B70] hover:border-b-2 hover:border-[#003B70] transition-colors',
  active: 'text-[#003B70] border-b-2 border-[#003B70]',
  mobile: 'block px-3 py-2 text-base font-medium text-[#333333] hover:bg-[#F5F5F7] hover:text-[#003B70]',
  dropdown: 'bg-white border border-gray-200 shadow-sm',
};

// 组合所有样式
export const styles = {
  colors,
  buttons: buttonStyles,
  cards: cardStyles,
  tags: tagStyles,
  inputs: inputStyles,
  typography: typography,
  navigation: navigationStyles,
};

export default styles;
