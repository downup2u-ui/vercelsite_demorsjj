'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { PrintMaterial, printMaterials } from '@/data/printingServices';

export default function ModelUploadPage() {
  const router = useRouter();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 如果用户未登录，重定向到登录页面
  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/3d-printing/upload');
    }
  }, [user, router]);

  // 模型信息状态
  const [modelInfo, setModelInfo] = useState({
    name: '',
    description: '',
    tags: '',
    isPublic: true,
  });

  // 文件上传状态
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  // 模型尺寸状态
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    depth: 0,
    unit: 'mm' as 'mm' | 'cm' | 'inch',
  });
  
  // 打印设置状态
  const [printSettings, setPrintSettings] = useState({
    material: printMaterials[0].id,
    color: printMaterials[0].colors[0],
    quantity: 1,
    quality: 'standard' as 'draft' | 'standard' | 'high',
    infill: 20, // 填充百分比
    supports: true,
    rafts: false,
  });

  // 价格计算状态
  const [priceEstimate, setPriceEstimate] = useState({
    materialCost: 0,
    printingCost: 0,
    postProcessingCost: 0,
    shippingCost: 15, // 默认运费
    discount: 0,
    total: 0,
  });

  // 当前选择的材料
  const [selectedMaterial, setSelectedMaterial] = useState<PrintMaterial>(printMaterials[0]);

  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    // 检查文件类型
    const validTypes = ['.stl', '.obj', '.3mf', '.step', '.fbx'];
    const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();
    
    if (!validTypes.includes(fileExtension)) {
      setUploadError(`不支持的文件格式。请上传以下格式之一: ${validTypes.join(', ')}`);
      return;
    }
    
    // 检查文件大小 (限制为50MB)
    if (selectedFile.size > 50 * 1024 * 1024) {
      setUploadError('文件过大，请上传小于50MB的文件');
      return;
    }
    
    setFile(selectedFile);
    setUploadError(null);
    
    // 创建文件预览
    // 注意：STL等3D文件无法直接预览，这里使用模拟预览
    setFilePreview('/images/3d-model-preview.jpg');
    
    // 设置模型名称（如果尚未设置）
    if (!modelInfo.name) {
      setModelInfo({
        ...modelInfo,
        name: selectedFile.name.substring(0, selectedFile.name.lastIndexOf('.')),
      });
    }
    
    // 模拟从文件中提取尺寸信息
    // 实际应用中，这需要使用专门的库来解析3D文件
    setDimensions({
      width: Math.floor(Math.random() * 100) + 50,
      height: Math.floor(Math.random() * 100) + 50,
      depth: Math.floor(Math.random() * 100) + 50,
      unit: 'mm',
    });
    
    // 计算价格估算
    calculatePrice();
  };

  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('dimensions.')) {
      const dimensionKey = name.split('.')[1] as 'width' | 'height' | 'depth' | 'unit';
      setDimensions({
        ...dimensions,
        [dimensionKey]: type === 'number' ? parseFloat(value) : value,
      });
      
      // 重新计算价格
      calculatePrice();
      return;
    }
    
    if (name.startsWith('printSettings.')) {
      const settingKey = name.split('.')[1] as keyof typeof printSettings;
      const newValue = type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'number' 
          ? parseFloat(value) 
          : value;
      
      setPrintSettings({
        ...printSettings,
        [settingKey]: newValue,
      });
      
      // 如果材料改变，更新可用颜色和选中的材料
      if (settingKey === 'material') {
        const newMaterial = printMaterials.find(m => m.id === value) || printMaterials[0];
        setSelectedMaterial(newMaterial);
        
        // 如果当前颜色在新材料中不可用，选择第一个可用颜色
        if (!newMaterial.colors.includes(printSettings.color)) {
          setPrintSettings({
            ...printSettings,
            material: value,
            color: newMaterial.colors[0],
          });
        } else {
          setPrintSettings({
            ...printSettings,
            material: value,
          });
        }
      }
      
      // 重新计算价格
      calculatePrice();
      return;
    }
    
    setModelInfo({
      ...modelInfo,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  // 计算价格
  const calculatePrice = () => {
    // 找到选中的材料
    const material = printMaterials.find(m => m.id === printSettings.material) || printMaterials[0];
    
    // 计算体积和重量（简化计算）
    const volume = dimensions.width * dimensions.height * dimensions.depth; // 立方毫米
    const estimatedWeight = volume * 0.001 * 0.00125; // 假设密度为1.25 g/cm³
    
    // 材料成本
    const materialCost = estimatedWeight * material.pricePerGram * printSettings.quantity;
    
    // 打印成本 - 基于质量和尺寸
    let qualityMultiplier = 1;
    switch (printSettings.quality) {
      case 'draft': qualityMultiplier = 0.8; break;
      case 'high': qualityMultiplier = 1.5; break;
      default: qualityMultiplier = 1;
    }
    
    const printingCost = (volume / 1000) * 0.05 * qualityMultiplier * printSettings.quantity;
    
    // 后处理成本 - 基于是否需要支撑和筏
    const postProcessingCost = (
      (printSettings.supports ? 10 : 0) + 
      (printSettings.rafts ? 5 : 0)
    ) * printSettings.quantity;
    
    // 计算折扣（VIP会员8折）
    const discount = user?.membershipType === 'vip' ? 
      (materialCost + printingCost + postProcessingCost) * 0.2 : 0;
    
    // 总价
    const total = materialCost + printingCost + postProcessingCost + priceEstimate.shippingCost - discount;
    
    setPriceEstimate({
      materialCost,
      printingCost,
      postProcessingCost,
      shippingCost: priceEstimate.shippingCost,
      discount,
      total,
    });
  };

  // 模拟上传过程
  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setUploadError('请选择一个模型文件');
      return;
    }
    
    if (!modelInfo.name) {
      setUploadError('请输入模型名称');
      return;
    }
    
    // 模拟文件上传
    simulateUpload();
    
    // 模拟上传完成后处理
    setTimeout(() => {
      // 在实际应用中，这里会将数据发送到服务器
      console.log('模型信息:', modelInfo);
      console.log('文件:', file);
      console.log('尺寸:', dimensions);
      console.log('打印设置:', printSettings);
      console.log('价格估算:', priceEstimate);
      
      // 上传完成后跳转到确认页面
      router.push('/3d-printing/upload/confirmation');
    }, 4000);
  };

  // 如果用户未登录，显示加载中
  if (!user) {
    return <div className="container mx-auto px-4 py-8 text-center">加载中...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">上传3D打印模型</h1>
      
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 左侧 - 文件上传 */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">模型文件</h2>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition"
                onClick={() => fileInputRef.current?.click()}
              >
                {filePreview ? (
                  <div className="relative h-48 mb-4">
                    <Image
                      src={filePreview}
                      alt="模型预览"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                ) : (
                  <div className="text-gray-500 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                )}
                
                <p className="mb-2">{file ? file.name : '点击或拖放文件上传'}</p>
                <p className="text-sm text-gray-500">支持 STL, OBJ, 3MF, STEP, FBX 格式</p>
                <p className="text-sm text-gray-500">最大文件大小: 50MB</p>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".stl,.obj,.3mf,.step,.fbx"
                  className="hidden"
                />
              </div>
              
              {uploadError && (
                <p className="text-red-500 mt-2 text-sm">{uploadError}</p>
              )}
              
              {isUploading && (
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-black" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">上传中... {uploadProgress}%</p>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">模型尺寸</h2>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">宽度</label>
                  <input
                    type="number"
                    name="dimensions.width"
                    value={dimensions.width}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">高度</label>
                  <input
                    type="number"
                    name="dimensions.height"
                    value={dimensions.height}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">深度</label>
                  <input
                    type="number"
                    name="dimensions.depth"
                    value={dimensions.depth}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">单位</label>
                <select
                  name="dimensions.unit"
                  value={dimensions.unit}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="mm">毫米 (mm)</option>
                  <option value="cm">厘米 (cm)</option>
                  <option value="inch">英寸 (inch)</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* 中间 - 模型信息和打印设置 */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">模型信息</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">模型名称</label>
                <input
                  type="text"
                  name="name"
                  value={modelInfo.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea
                  name="description"
                  value={modelInfo.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">标签（用逗号分隔）</label>
                <input
                  type="text"
                  name="tags"
                  value={modelInfo.tags}
                  onChange={handleInputChange}
                  placeholder="例如: 机械, 教育, 艺术"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="isPublic"
                  name="isPublic"
                  checked={modelInfo.isPublic}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
                  公开模型（允许其他用户查看）
                </label>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">打印设置</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">打印质量</label>
                <select
                  name="printSettings.quality"
                  value={printSettings.quality}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="draft">草稿质量 (0.3mm层高)</option>
                  <option value="standard">标准质量 (0.2mm层高)</option>
                  <option value="high">高质量 (0.1mm层高)</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">填充率 ({printSettings.infill}%)</label>
                <input
                  type="range"
                  name="printSettings.infill"
                  value={printSettings.infill}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="5"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0% (空心)</span>
                  <span>50% (中等)</span>
                  <span>100% (实心)</span>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="supports"
                  name="printSettings.supports"
                  checked={printSettings.supports}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label htmlFor="supports" className="ml-2 block text-sm text-gray-700">
                  添加支撑结构（悬垂部分需要）
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rafts"
                  name="printSettings.rafts"
                  checked={printSettings.rafts}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label htmlFor="rafts" className="ml-2 block text-sm text-gray-700">
                  添加底层筏（改善附着力）
                </label>
              </div>
            </div>
          </div>
          
          {/* 右侧 - 材料选择和价格 */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">材料选择</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">材料类型</label>
                <select
                  name="printSettings.material"
                  value={printSettings.material}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {printMaterials.map(material => (
                    <option 
                      key={material.id} 
                      value={material.id}
                      disabled={!material.inStock}
                    >
                      {material.name} {!material.inStock && '(缺货)'}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">颜色</label>
                <select
                  name="printSettings.color"
                  value={printSettings.color}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {selectedMaterial.colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">数量</label>
                <input
                  type="number"
                  name="printSettings.quantity"
                  value={printSettings.quantity}
                  onChange={handleInputChange}
                  min="1"
                  max="100"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md mb-4">
                <h3 className="font-medium mb-2">材料特性:</h3>
                <ul className="text-sm space-y-1 mb-3">
                  {selectedMaterial.properties.map((prop, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2">•</span>
                      {prop}
                    </li>
                  ))}
                </ul>
                <h3 className="font-medium mb-2">推荐应用:</h3>
                <p className="text-sm text-gray-600">
                  {selectedMaterial.applications.join(', ')}
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">价格估算</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <span>材料成本:</span>
                  <span>¥{priceEstimate.materialCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>打印成本:</span>
                  <span>¥{priceEstimate.printingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>后处理成本:</span>
                  <span>¥{priceEstimate.postProcessingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>运费:</span>
                  <span>¥{priceEstimate.shippingCost.toFixed(2)}</span>
                </div>
                {priceEstimate.discount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>VIP会员折扣:</span>
                    <span>-¥{priceEstimate.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 my-2 pt-2 flex justify-between font-bold">
                  <span>总计:</span>
                  <span>¥{priceEstimate.total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  预计送达时间: {selectedMaterial.estimatedDeliveryDays} 个工作日
                </p>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition"
              disabled={isUploading}
            >
              {isUploading ? '上传中...' : '提交订单'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
