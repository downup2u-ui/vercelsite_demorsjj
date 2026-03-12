import React from 'react';

interface StatusBadgeProps {
  status: string;
  label?: string;
  customColor?: string;
}

/**
 * 状态徽章组件，根据不同状态显示不同颜色的徽章
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, customColor }) => {
  // 根据状态返回相应的颜色和文本
  const getStatusDisplay = () => {
    const statusText = label || getStatusText(status);
    
    if (customColor) {
      return { 
        bgColor: customColor, 
        textColor: isLightColor(customColor) ? 'text-gray-800' : 'text-white',
        text: statusText
      };
    }

    switch(status) {
      case 'pending':
        return { bgColor: 'bg-gray-100', textColor: 'text-gray-800', text: statusText };
      case 'in_progress':
        return { bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', text: statusText };
      case 'pending_confirmation':
        return { bgColor: 'bg-blue-100', textColor: 'text-blue-800', text: statusText };
      case 'completed':
        return { bgColor: 'bg-green-100', textColor: 'text-green-800', text: statusText };
      case 'cancelled':
        return { bgColor: 'bg-red-100', textColor: 'text-red-800', text: statusText };
      default:
        return { bgColor: 'bg-gray-100', textColor: 'text-gray-800', text: statusText };
    }
  };

  // 根据状态码返回可读的状态文本
  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending':
        return '待处理';
      case 'in_progress':
        return '处理中';
      case 'pending_confirmation':
        return '待确认';
      case 'completed':
        return '已完成';
      case 'cancelled':
        return '已取消';
      default:
        return status;
    }
  };

  // 判断颜色是否为浅色（用于确定文本颜色）
  const isLightColor = (color: string) => {
    // 简单判断逻辑，实际项目中可能需要更复杂的亮度计算
    return color.includes('100') || color.includes('50');
  };

  const { bgColor, textColor, text } = getStatusDisplay();

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
      {text}
    </span>
  );
};

export default StatusBadge; 