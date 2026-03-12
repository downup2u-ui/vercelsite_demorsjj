'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { printMaterials, PrintMaterial } from '@/data/printingServices';

export default function MaterialsPage() {
  const [selectedMaterial, setSelectedMaterial] = useState<PrintMaterial | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // 材料分类
  const categories = [
    { id: 'all', name: '全部材料' },
    { id: 'standard', name: '标准材料', materials: ['1', '2', '3'] },
    { id: 'flexible', name: '柔性材料', materials: ['4'] },
    { id: 'engineering', name: '工程材料', materials: ['5', '8'] },
    { id: 'specialty', name: '特殊材料', materials: ['6', '7', '9', '10'] },
  ];
  
  // 根据分类筛选材料
  const filteredMaterials = filterCategory === 'all' 
    ? printMaterials 
    : printMaterials.filter(material => {
        const category = categories.find(c => c.id === filterCategory);
        return category?.materials?.includes(material.id);
      });
  
  // 打开材料详情对话框
  const openMaterialDetails = (material: PrintMaterial) => {
    setSelectedMaterial(material);
  };
  
  // 关闭材料详情对话框
  const closeMaterialDetails = () => {
    setSelectedMaterial(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">3D打印材料</h1>
      <p className="text-gray-600 mb-8">
        探索我们提供的各种高质量3D打印材料，从标准PLA到专业工程材料，满足您的各种打印需求。
      </p>
      
      {/* 材料分类筛选 */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilterCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filterCategory === category.id
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* 材料列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map(material => (
          <div 
            key={material.id}
            className={`border rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer ${
              !material.inStock ? 'opacity-70' : ''
            }`}
            onClick={() => openMaterialDetails(material)}
          >
            <div className="relative h-48">
              <Image
                src={material.image}
                alt={material.name}
                fill
                style={{ objectFit: 'cover' }}
              />
              {!material.inStock && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  缺货
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{material.name}</h2>
                <span className="text-sm font-medium">
                  ¥{material.pricePerGram.toFixed(2)}/g
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {material.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {material.properties.slice(0, 3).map((property, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {property}
                  </span>
                ))}
                {material.properties.length > 3 && (
                  <span className="text-gray-500 text-xs px-1 py-1">
                    +{material.properties.length - 3}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">颜色:</span>
                  <div className="flex space-x-1">
                    {material.colors.slice(0, 4).map((color, index) => (
                      <div 
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ 
                          backgroundColor: color === '白色' ? 'white' :
                                          color === '黑色' ? 'black' :
                                          color === '灰色' ? 'gray' :
                                          color === '红色' ? 'red' :
                                          color === '蓝色' ? 'blue' :
                                          color === '绿色' ? 'green' :
                                          color === '黄色' ? 'yellow' :
                                          color === '透明' ? 'transparent' :
                                          color === '铜色' ? '#b87333' :
                                          color === '黄铜色' ? '#D4AF37' :
                                          color === '青铜色' ? '#CD7F32' :
                                          color === '不锈钢色' ? '#A9A9A9' :
                                          color === '铁色' ? '#5C5C5C' :
                                          color === '米色' ? '#F5F5DC' :
                                          color === '浅蓝色' ? '#ADD8E6' :
                                          color === '金属银灰色' ? '#C0C0C0' :
                                          'lightgray'
                        }}
                      />
                    ))}
                    {material.colors.length > 4 && (
                      <span className="text-xs text-gray-500">+{material.colors.length - 4}</span>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-600">
                  {material.estimatedDeliveryDays}天送达
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 材料详情对话框 */}
      {selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-start p-6 border-b">
              <h2 className="text-2xl font-bold">{selectedMaterial.name}</h2>
              <button 
                onClick={closeMaterialDetails}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={selectedMaterial.image}
                      alt={selectedMaterial.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">描述</h3>
                    <p className="text-gray-600">{selectedMaterial.description}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">推荐应用</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMaterial.applications.map((app, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="font-semibold mb-2">价格</h3>
                      <p className="text-xl">¥{selectedMaterial.pricePerGram.toFixed(2)}/g</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">预计送达</h3>
                      <p className="text-xl">{selectedMaterial.estimatedDeliveryDays}天</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">最小厚度</h3>
                      <p>{selectedMaterial.minThickness}mm</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">最大厚度</h3>
                      <p>{selectedMaterial.maxThickness}mm</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">材料特性</h3>
                    <ul className="space-y-1">
                      {selectedMaterial.properties.map((property, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {property}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">可用颜色</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMaterial.colors.map((color, index) => (
                        <div key={index} className="flex items-center">
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-300 mr-1"
                            style={{ 
                              backgroundColor: color === '白色' ? 'white' :
                                              color === '黑色' ? 'black' :
                                              color === '灰色' ? 'gray' :
                                              color === '红色' ? 'red' :
                                              color === '蓝色' ? 'blue' :
                                              color === '绿色' ? 'green' :
                                              color === '黄色' ? 'yellow' :
                                              color === '透明' ? 'transparent' :
                                              color === '铜色' ? '#b87333' :
                                              color === '黄铜色' ? '#D4AF37' :
                                              color === '青铜色' ? '#CD7F32' :
                                              color === '不锈钢色' ? '#A9A9A9' :
                                              color === '铁色' ? '#5C5C5C' :
                                              color === '米色' ? '#F5F5DC' :
                                              color === '浅蓝色' ? '#ADD8E6' :
                                              color === '金属银灰色' ? '#C0C0C0' :
                                              'lightgray'
                            }}
                          />
                          <span className="text-sm">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                        selectedMaterial.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedMaterial.inStock ? '有库存' : '缺货'}
                      </span>
                    </div>
                    
                    <Link 
                      href="/3d-printing/upload"
                      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
                    >
                      使用此材料打印
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 技术指南部分 */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">材料选择指南</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">如何选择合适的材料?</h3>
            <p className="mb-4">选择3D打印材料时，请考虑以下因素:</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-black font-bold mr-2">•</span>
                <span><strong>功能需求:</strong> 您的打印品需要什么样的强度、柔韧性或耐热性?</span>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-2">•</span>
                <span><strong>视觉效果:</strong> 您是否需要特定的颜色、透明度或表面质感?</span>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-2">•</span>
                <span><strong>使用环境:</strong> 打印品将在什么环境中使用?是否需要耐候性或化学稳定性?</span>
              </li>
              <li className="flex items-start">
                <span className="text-black font-bold mr-2">•</span>
                <span><strong>预算考虑:</strong> 不同材料的价格差异较大，请根据您的预算选择合适的材料。</span>
              </li>
            </ul>
            <p>如果您不确定哪种材料最适合您的项目，请随时<Link href="/contact" className="text-black underline">联系我们的专家</Link>获取建议。</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">材料比较</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">材料</th>
                    <th className="text-left py-2">强度</th>
                    <th className="text-left py-2">柔韧性</th>
                    <th className="text-left py-2">耐热性</th>
                    <th className="text-left py-2">难度</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">PLA</td>
                    <td className="py-2">中等</td>
                    <td className="py-2">低</td>
                    <td className="py-2">低</td>
                    <td className="py-2">简单</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">ABS</td>
                    <td className="py-2">高</td>
                    <td className="py-2">中等</td>
                    <td className="py-2">高</td>
                    <td className="py-2">中等</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">PETG</td>
                    <td className="py-2">高</td>
                    <td className="py-2">中等</td>
                    <td className="py-2">中等</td>
                    <td className="py-2">简单</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">TPU</td>
                    <td className="py-2">中等</td>
                    <td className="py-2">极高</td>
                    <td className="py-2">中等</td>
                    <td className="py-2">困难</td>
                  </tr>
                  <tr>
                    <td className="py-2">尼龙</td>
                    <td className="py-2">极高</td>
                    <td className="py-2">高</td>
                    <td className="py-2">高</td>
                    <td className="py-2">困难</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="bg-black text-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h3 className="text-xl font-semibold mb-2">需要专业建议?</h3>
              <p className="mb-4">
                我们的材料专家可以帮助您为项目选择最合适的材料，并提供打印参数建议。
              </p>
              <Link 
                href="/contact"
                className="inline-block bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition"
              >
                咨询专家
              </Link>
            </div>
            <div className="w-full md:w-1/3">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="/images/material-expert.jpg"
                  alt="材料专家"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
