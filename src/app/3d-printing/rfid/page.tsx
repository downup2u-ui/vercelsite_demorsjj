'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RFIDPage() {
  const [rfidCode, setRfidCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<null | 'valid' | 'invalid'>(null);
  const [isScanning, setIsScanning] = useState(false);

  // 模拟RFID验证过程
  const verifyRFID = () => {
    if (!rfidCode.trim()) {
      alert('请输入RFID编码');
      return;
    }

    setIsScanning(true);
    
    // 模拟验证过程
    setTimeout(() => {
      setIsScanning(false);
      // 简单验证：以RF开头的编码视为有效
      if (rfidCode.startsWith('RF')) {
        setVerificationResult('valid');
      } else {
        setVerificationResult('invalid');
      }
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">RFID防伪标签系统</h1>
      <p className="text-gray-600 mb-8">
        我们的RFID防伪标签系统为您的3D打印作品提供真实性验证和溯源保障。
      </p>
      
      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* 左侧 - 验证区域 */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">验证RFID标签</h2>
            <p className="mb-6 text-gray-600">
              输入RFID编码或使用我们的移动应用扫描标签进行验证。
            </p>
            
            <div className="mb-4">
              <label htmlFor="rfid-code" className="block text-sm font-medium text-gray-700 mb-1">
                RFID编码
              </label>
              <input
                type="text"
                id="rfid-code"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="例如: RF123456789"
                value={rfidCode}
                onChange={(e) => setRfidCode(e.target.value)}
              />
            </div>
            
            <button
              onClick={verifyRFID}
              disabled={isScanning}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                isScanning ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isScanning ? '验证中...' : '验证RFID'}
            </button>
            
            {verificationResult && (
              <div className={`mt-6 p-4 rounded-md ${
                verificationResult === 'valid' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center">
                  {verificationResult === 'valid' ? (
                    <>
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-700 font-medium">验证成功！此RFID标签是有效的。</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-red-700 font-medium">验证失败！此RFID标签无效或已被篡改。</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">移动应用扫描</h2>
            <p className="mb-6 text-gray-600">
              下载我们的移动应用，使用手机NFC功能直接扫描RFID标签。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-2.86-1.21-6.08-1.21-8.94 0L5.65 5.67c-.19-.29-.58-.38-.87-.2-.28.18-.37.54-.22.83L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
                </svg>
                Android版
              </a>
              <a href="#" className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                iOS版
              </a>
            </div>
          </div>
        </div>
        
        {/* 右侧 - 信息区域 */}
        <div>
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-8">
            <Image
              src="/images/picsum/1035.jpg"
              alt="RFID防伪标签系统"
              fill
              className="object-cover"
            />
          </div>
          
          <h2 className="text-xl font-semibold mb-4">RFID防伪标签的优势</h2>
          <ul className="space-y-4 mb-8">
            <li className="flex">
              <svg className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <h3 className="font-medium">真实性验证</h3>
                <p className="text-gray-600">每个RFID标签都有唯一的加密ID，确保您的作品不会被仿冒</p>
              </div>
            </li>
            <li className="flex">
              <svg className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div>
                <h3 className="font-medium">即时验证</h3>
                <p className="text-gray-600">通过我们的移动应用或网站，随时随地验证作品的真实性</p>
              </div>
            </li>
            <li className="flex">
              <svg className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <div>
                <h3 className="font-medium">作品溯源</h3>
                <p className="text-gray-600">记录作品的创作过程、材料信息和所有权历史，提供完整的溯源链</p>
              </div>
            </li>
            <li className="flex">
              <svg className="h-6 w-6 text-indigo-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <h3 className="font-medium">增加作品价值</h3>
                <p className="text-gray-600">通过防伪认证，提升作品的收藏价值和市场认可度</p>
              </div>
            </li>
          </ul>
          
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">如何获取RFID标签</h2>
            <p className="text-gray-600 mb-4">
              当您通过我们的平台打印作品时，可以选择为作品添加RFID防伪标签。标签将在作品完成后由我们的专业人员嵌入或附着在作品上。
            </p>
            <Link href="/3d-printing/upload" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
              立即上传模型并添加RFID标签
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* 常见问题 */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">常见问题</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-2 text-black">RFID标签会影响作品的美观吗？</h3>
            <p className="text-gray-600">
              不会。我们的RFID标签非常小巧，可以隐藏在作品内部或底部，不会影响作品的外观。对于特殊需求，我们还提供定制化的标签解决方案。
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-2 text-black">RFID标签的使用寿命是多久？</h3>
            <p className="text-gray-600">
              我们使用的高品质RFID标签理论使用寿命超过10年。标签不需要电池，通过电磁感应工作，因此只要物理结构完好，就能持续使用。
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-2 text-black">如果我的作品转售，RFID标签信息会更新吗？</h3>
            <p className="text-gray-600">
              是的。当作品所有权发生变更时，您可以通过我们的平台更新RFID标签关联的所有权信息，确保溯源链的完整性。
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-2 text-black">RFID标签的安全性如何？</h3>
            <p className="text-gray-600">
              我们的RFID标签采用高级加密技术，防止未授权的复制和篡改。每个标签都有唯一的加密ID，并与我们的区块链系统关联，确保数据的安全性和不可篡改性。
            </p>
          </div>
        </div>
      </div>
      
      {/* 联系我们 */}
      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">需要更多信息？</h2>
        <p className="text-gray-600 mb-6">
          如果您对RFID防伪标签系统有任何疑问，或需要定制化的解决方案，请随时联系我们的专业团队。
        </p>
        <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          联系我们
        </Link>
      </div>
    </div>
  );
}