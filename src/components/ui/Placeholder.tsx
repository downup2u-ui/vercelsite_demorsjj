import React from 'react';

interface PlaceholderProps {
  title: string;              // 占位符标题，例如 [作品集展示区域占位符]
  description?: string;       // 占位符描述，例如：作品卡片网格、图片/视频预览等
  icon?: React.ReactNode;     // 可选图标
  height?: string;            // 高度，默认 'min-h-[400px]'
  withBorder?: boolean;       // 是否显示虚线边框，默认为 true
  textAlignment?: 'center' | 'left' | 'right'; // 文本对齐方式，默认为 'center'
  children?: React.ReactNode; // 可以传入子组件
  className?: string;         // 自定义className
}

/**
 * 通用占位符组件
 * 用于表示尚未实现的功能区域
 */
const Placeholder: React.FC<PlaceholderProps> = ({
  title,
  description,
  icon,
  height = 'min-h-[400px]',
  withBorder = true,
  textAlignment = 'center',
  children,
  className = '',
}) => {
  const containerClasses = `
    bg-white p-6 shadow-md rounded-lg 
    ${withBorder ? 'border-2 border-dashed border-gray-200' : ''} 
    ${height}
    ${className}
  `;

  const textClasses = `text-${textAlignment} text-gray-400 mt-10`;
  
  return (
    <div className={containerClasses}>
      {children || (
        <>
          {icon && <div className="text-gray-300 text-5xl mb-4 flex justify-center">{icon}</div>}
          <div className={textClasses}>
            <p className="text-lg">{title}</p>
            {description && <p className="text-sm mt-2">{description}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default Placeholder; 