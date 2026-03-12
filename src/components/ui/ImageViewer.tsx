import React, { useState, useEffect } from 'react';

interface Image {
  id: string;
  url: string;
  caption?: string;
}

interface ImageViewerProps {
  images: Image[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  initialIndex,
  isOpen,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // 监听ESC键关闭查看器
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, currentIndex]);
  
  // 重置当前索引当组件重新打开时
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);
  
  if (!isOpen) return null;
  
  const currentImage = images[currentIndex];
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  // 阻止事件冒泡到overlay
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl max-h-[90vh] w-full h-full flex flex-col"
        onClick={handleImageClick}
      >
        {/* 导航按钮 */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
              onClick={handlePrev}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
              onClick={handleNext}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* 关闭按钮 */}
        <button
          className="absolute right-2 top-2 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* 图片容器 */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <img
            src={currentImage.url}
            alt={currentImage.caption || '图片'}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        
        {/* 图片说明 */}
        {currentImage.caption && (
          <div className="p-4 bg-black bg-opacity-50 text-white text-center">
            <p>{currentImage.caption}</p>
            <p className="text-sm text-gray-300 mt-1">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageViewer; 