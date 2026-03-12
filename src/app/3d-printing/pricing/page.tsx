'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { printMaterials } from '@/data/printingServices';

export default function PricingPage() {
  // 模型尺寸
  const [dimensions, setDimensions] = useState({
    width: 100,
    height: 100,
    depth: 100,
    unit: 'mm' as 'mm' | 'cm' | 'inch',
  });
  
  // 打印设置
  const [printSettings, setPrintSettings] = useState({
    material: printMaterials[0].id,
    quality: 'standard' as 'draft' | 'standard' | 'high',
    infill: 20,
    supports: true,
    rafts: false,
    quantity: 1,
  });
  
  // 价格估算
  const [priceEstimate, setPriceEstimate] = useState({
    materialCost: 0,
    printingCost: 0,
    postProcessingCost: 0,
    shippingCost: 15,
    discount: 0,
    total: 0,
  });
  
  // 选中的材料
  const [selectedMaterial, setSelectedMaterial] = useState(printMaterials[0]);
  
  // 当材料或尺寸变化时更新价格
  useEffect(() => {
    calculatePrice();
  }, [dimensions, printSettings]);
  
  // 处理尺寸变化
  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const dimensionKey = name.split('.')[1] as 'width' | 'height' | 'depth' | 'unit';
    
    setDimensions({
      ...dimensions,
      [dimensionKey]: e.target.type === 'number' ? parseFloat(value) : value,
    });
  };
  
  // 处理打印设置变化
  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
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
    
    // 如果材料改变，更新选中的材料
    if (settingKey === 'material') {
      const newMaterial = printMaterials.find(m => m.id === value) || printMaterials[0];
      setSelectedMaterial(newMaterial);
    }
  };
  
  // 计算价格
  const calculatePrice = () => {
    // 找到选中的材料
    const material = printMaterials.find(m => m.id === printSettings.material) || printMaterials[0];
    
    // 转换单位到毫米
    let width = dimensions.width;
    let height = dimensions.height;
    let depth = dimensions.depth;
    
    if (dimensions.unit === 'cm') {
      width *= 10;
      height *= 10;
      depth *= 10;
    } else if (dimensions.unit === 'inch') {
      width *= 25.4;
      height *= 25.4;
      depth *= 25.4;
    }
    
    // 计算体积和重量
    const volume = width * height * depth; // 立方毫米
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
    const discount = 0; // 这里可以根据用户会员状态计算折扣
    
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">3D打印价格计算器</h1>
      <p className="text-gray-600 mb-8">
        使用我们的价格计算器估算您的3D打印项目成本。调整尺寸、材料和打印设置，获取即时价格反馈。
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 左侧 - 尺寸设置 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">模型尺寸</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">单位</label>
              <select
                name="dimensions.unit"
                value={dimensions.unit}
                onChange={handleDimensionChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="mm">毫米 (mm)</option>
                <option value="cm">厘米 (cm)</option>
                <option value="inch">英寸 (inch)</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">宽度</label>
              <input
                type="number"
                name="dimensions.width"
                value={dimensions.width}
                onChange={handleDimensionChange}
                min="1"
                step="1"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">高度</label>
              <input
                type="number"
                name="dimensions.height"
                value={dimensions.height}
                onChange={handleDimensionChange}
                min="1"
                step="1"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">深度</label>
              <input
                type="number"
                name="dimensions.depth"
                value={dimensions.depth}
                onChange={handleDimensionChange}
                min="1"
                step="1"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="p-4 bg-gray-100 rounded-md">
              <h3 className="font-medium mb-2">体积计算:</h3>
              <p className="text-lg font-semibold">
                {(dimensions.width * dimensions.height * dimensions.depth).toLocaleString()} {dimensions.unit}³
              </p>
              <p className="text-sm text-gray-500 mt-1">
                估计重量: {(dimensions.width * dimensions.height * dimensions.depth * 0.00125 / (dimensions.unit === 'mm' ? 1000 : dimensions.unit === 'cm' ? 1 : 16.387064)).toFixed(2)} g
              </p>
            </div>
          </div>
        </div>
        
        {/* 中间 - 打印设置 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">打印设置</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">材料</label>
              <select
                name="printSettings.material"
                value={printSettings.material}
                onChange={handleSettingChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {printMaterials.map(material => (
                  <option 
                    key={material.id} 
                    value={material.id}
                    disabled={!material.inStock}
                  >
                    {material.name} (¥{material.pricePerGram.toFixed(2)}/g) {!material.inStock && '(缺货)'}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">打印质量</label>
              <select
                name="printSettings.quality"
                value={printSettings.quality}
                onChange={handleSettingChange}
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
                onChange={handleSettingChange}
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
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">数量</label>
              <input
                type="number"
                name="printSettings.quantity"
                value={printSettings.quantity}
                onChange={handleSettingChange}
                min="1"
                max="100"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="supports"
                name="printSettings.supports"
                checked={printSettings.supports}
                onChange={handleSettingChange}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="supports" className="ml-2 block text-sm text-gray-700">
                添加支撑结构 (+¥10/件)
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rafts"
                name="printSettings.rafts"
                checked={printSettings.rafts}
                onChange={handleSettingChange}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="rafts" className="ml-2 block text-sm text-gray-700">
                添加底层筏 (+¥5/件)
              </label>
            </div>
          </div>
        </div>
        
        {/* 右侧 - 价格估算 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">价格估算</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
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
                <span>折扣:</span>
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
            
            <Link
              href="/3d-printing/upload"
              className="block w-full bg-black text-white text-center py-3 px-4 rounded-md hover:bg-gray-800 transition mt-6"
            >
              开始上传模型
            </Link>
          </div>
          
          <div className="mt-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium mb-2">价格说明</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 材料成本基于模型体积和所选材料的单价计算</li>
              <li>• 打印成本包括设备使用、电力和操作人员费用</li>
              <li>• 后处理成本包括支撑结构移除和表面处理</li>
              <li>• 所有价格均为人民币 (¥)</li>
              <li>• VIP会员可享受额外折扣</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 材料比较表 */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">材料价格比较</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  材料
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  价格 (¥/g)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  强度
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  柔韧性
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  耐热性
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  送达时间
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {printMaterials.map((material) => (
                <tr key={material.id} className={!material.inStock ? 'bg-gray-50 text-gray-500' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{material.name}</div>
                    {!material.inStock && <span className="text-xs text-red-500">缺货</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {material.pricePerGram.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {material.properties.includes('高强度') || material.properties.includes('极高强度') 
                      ? '高' 
                      : material.properties.includes('中等强度') 
                        ? '中' 
                        : '低'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {material.properties.includes('高弹性') || material.properties.includes('柔性') 
                      ? '高' 
                      : material.properties.includes('高韧性') 
                        ? '中' 
                        : '低'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {material.properties.includes('耐高温') || material.properties.includes('耐热性好') 
                      ? '高' 
                      : material.properties.includes('耐热性') 
                        ? '中' 
                        : '低'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {material.estimatedDeliveryDays}天
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
      {/* 常见问题 */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">常见问题</h2>
        
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-medium mb-2 text-black">价格计算是如何工作的?</h3>
            <p className="text-gray-600">
              我们的价格计算基于多个因素，包括模型体积、选择的材料、打印质量、填充率以及是否需要支撑结构和底层筏。体积越大，材料成本越高；打印质量越高，打印时间越长，成本也越高。
            </p>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-medium mb-2 text-black">如何降低3D打印成本?</h3>
            <p className="text-gray-600">
              降低成本的方法包括：选择更经济的材料（如PLA）、降低填充率、使用较低的打印质量、优化模型设计减少支撑需求、批量订购以获得数量折扣，以及成为会员享受会员折扣。
            </p>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-medium mb-2 text-black">价格计算器的估算准确吗?</h3>
            <p className="text-gray-600">
              价格计算器提供的是基于输入参数的估算价格，实际价格可能会有所不同，特别是对于复杂的模型。上传模型后，我们的系统会进行更精确的分析，并提供最终报价。
            </p>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-medium mb-2 text-black">有批量订单折扣吗?</h3>
            <p className="text-gray-600">
              是的，我们为批量订单提供折扣。10件以上可享受5%折扣，50件以上可享受10%折扣，100件以上可享受15%折扣。大型批量订单请联系我们的客服团队获取定制报价。
            </p>
          </div>
        </div>
      </section>
      
      {/* 联系我们 */}
      <section className="mt-16 bg-black text-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold mb-4">需要定制报价?</h2>
            <p className="mb-4 max-w-xl">
              对于复杂项目、大批量订单或特殊材料需求，我们的专业团队可以提供个性化报价和技术咨询。
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 transition"
            >
              联系我们
            </Link>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">15%</div>
            <p className="text-xl">VIP会员折扣</p>
          </div>
        </div>
      </section>
    </div>
  );
}
