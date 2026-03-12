'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { PrintOrder, printOrders, PrintOrderStatus } from '@/data/printingServices';

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [orders, setOrders] = useState<PrintOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<PrintOrder | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  
  // 如果用户未登录，重定向到登录页面
  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/3d-printing/orders');
    } else {
      // 获取当前用户的订单
      const userOrders = printOrders.filter(order => order.userId === user.id);
      setOrders(userOrders);
    }
  }, [user, router]);

  // 根据标签筛选订单
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return !['completed', 'cancelled', 'refunded'].includes(order.status);
    if (activeTab === 'completed') return ['completed', 'cancelled', 'refunded'].includes(order.status);
    return true;
  });

  // 获取订单状态的中文名称
  const getStatusName = (status: PrintOrderStatus): string => {
    const statusMap: Record<PrintOrderStatus, string> = {
      'pending_payment': '待支付',
      'processing': '处理中',
      'printing': '打印中',
      'post_processing': '后处理中',
      'quality_check': '质量检查',
      'packaging': '包装中',
      'shipped': '已发货',
      'delivered': '已送达',
      'completed': '已完成',
      'cancelled': '已取消',
      'refunded': '已退款'
    };
    return statusMap[status] || status;
  };

  // 获取订单状态的颜色
  const getStatusColor = (status: PrintOrderStatus): string => {
    const colorMap: Record<PrintOrderStatus, string> = {
      'pending_payment': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-blue-100 text-blue-800',
      'printing': 'bg-blue-100 text-blue-800',
      'post_processing': 'bg-blue-100 text-blue-800',
      'quality_check': 'bg-blue-100 text-blue-800',
      'packaging': 'bg-blue-100 text-blue-800',
      'shipped': 'bg-purple-100 text-purple-800',
      'delivered': 'bg-purple-100 text-purple-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'refunded': 'bg-gray-100 text-gray-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  // 获取订单进度百分比
  const getOrderProgress = (status: PrintOrderStatus): number => {
    const progressMap: Record<PrintOrderStatus, number> = {
      'pending_payment': 0,
      'processing': 10,
      'printing': 30,
      'post_processing': 50,
      'quality_check': 70,
      'packaging': 80,
      'shipped': 90,
      'delivered': 95,
      'completed': 100,
      'cancelled': 100,
      'refunded': 100
    };
    return progressMap[status] || 0;
  };

  // 格式化日期
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 如果用户未登录，显示加载中
  if (!user) {
    return <div className="container mx-auto px-4 py-8 text-center">加载中...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">我的打印订单</h1>
      <p className="text-gray-600 mb-8">
        查看和管理您的3D打印订单，追踪打印进度和发货状态。
      </p>
      
      {/* 订单标签 */}
      <div className="mb-8 border-b">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-4 px-1 ${
              activeTab === 'all'
                ? 'border-b-2 border-black font-medium'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            全部订单
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-4 px-1 ${
              activeTab === 'active'
                ? 'border-b-2 border-black font-medium'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            进行中
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-4 px-1 ${
              activeTab === 'completed'
                ? 'border-b-2 border-black font-medium'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            已完成
          </button>
        </div>
      </div>
      
      {/* 订单列表 */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-4">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">没有找到订单</h3>
          <p className="text-gray-500 mb-6">您当前没有任何3D打印订单。</p>
          <Link
            href="/3d-printing/upload"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800"
          >
            创建新订单
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{order.modelName}</h2>
                    <p className="text-gray-500 text-sm">
                      订单号: {order.id} | 创建时间: {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                      {getStatusName(order.status)}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">材料</p>
                    <p>{order.materialName} ({order.color})</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">数量</p>
                    <p>{order.quantity} 件</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">尺寸</p>
                    <p>{order.size.width} × {order.size.height} × {order.size.depth} mm</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">总价</p>
                    <p className="font-medium">¥{order.price.total.toFixed(2)}</p>
                  </div>
                </div>
                
                {/* 进度条 */}
                {!['cancelled', 'refunded'].includes(order.status) && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>订单创建</span>
                      <span>打印中</span>
                      <span>质检包装</span>
                      <span>运输中</span>
                      <span>已完成</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black"
                        style={{ width: `${getOrderProgress(order.status)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {/* 预计完成日期 */}
                {!['completed', 'cancelled', 'refunded'].includes(order.status) && (
                  <p className="text-sm text-gray-500 mt-4">
                    预计完成日期: {order.estimatedCompletionDate}
                  </p>
                )}
                
                {/* 追踪信息 */}
                {order.trackingNumber && (
                  <div className="mt-4 flex items-center text-sm">
                    <svg className="h-4 w-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    <span>追踪号: {order.trackingNumber}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* 订单详情对话框 */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-start p-6 border-b">
              <h2 className="text-2xl font-bold">订单详情</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 左侧 - 订单信息 */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">订单信息</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">订单号</p>
                          <p className="font-medium">{selectedOrder.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">创建时间</p>
                          <p>{formatDate(selectedOrder.createdAt)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">状态</p>
                          <p className={`inline-block px-2 py-1 rounded text-sm ${getStatusColor(selectedOrder.status)}`}>
                            {getStatusName(selectedOrder.status)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">预计完成</p>
                          <p>{selectedOrder.estimatedCompletionDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">模型信息</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">模型名称</p>
                        <p className="font-medium">{selectedOrder.modelName}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">材料</p>
                          <p>{selectedOrder.materialName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">颜色</p>
                          <p>{selectedOrder.color}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">数量</p>
                          <p>{selectedOrder.quantity} 件</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">重量</p>
                          <p>{selectedOrder.weight} g</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">尺寸</p>
                        <p>{selectedOrder.size.width} × {selectedOrder.size.height} × {selectedOrder.size.depth} mm</p>
                      </div>
                    </div>
                  </div>
                  
                  {selectedOrder.shippingAddress && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4">配送信息</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">收件人</p>
                          <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">联系电话</p>
                          <p>{selectedOrder.shippingAddress.phone}</p>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">收货地址</p>
                          <p>
                            {selectedOrder.shippingAddress.province}
                            {selectedOrder.shippingAddress.city}
                            {selectedOrder.shippingAddress.address}
                          </p>
                          <p>{selectedOrder.shippingAddress.postalCode}</p>
                        </div>
                        {selectedOrder.trackingNumber && (
                          <div>
                            <p className="text-sm text-gray-500">追踪号</p>
                            <div className="flex items-center">
                              <p className="mr-2">{selectedOrder.trackingNumber}</p>
                              <button className="text-sm text-black underline">
                                查看物流
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* 右侧 - 价格和状态 */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">价格明细</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span>材料成本:</span>
                        <span>¥{selectedOrder.price.materialCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>打印成本:</span>
                        <span>¥{selectedOrder.price.printingCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>后处理成本:</span>
                        <span>¥{selectedOrder.price.postProcessingCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>运费:</span>
                        <span>¥{selectedOrder.price.shippingCost.toFixed(2)}</span>
                      </div>
                      {selectedOrder.price.discount > 0 && (
                        <div className="flex justify-between mb-2 text-green-600">
                          <span>折扣:</span>
                          <span>-¥{selectedOrder.price.discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-300 my-2 pt-2 flex justify-between font-bold">
                        <span>总计:</span>
                        <span>¥{selectedOrder.price.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">订单状态历史</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-4">
                        {selectedOrder.statusHistory.map((history, index) => (
                          <div key={index} className="flex">
                            <div className="mr-4 relative">
                              <div className="w-3 h-3 bg-black rounded-full"></div>
                              {index < selectedOrder.statusHistory.length - 1 && (
                                <div className="absolute top-3 bottom-0 left-1.5 -ml-px w-0.5 bg-gray-300 h-full"></div>
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex justify-between">
                                <p className="font-medium">{getStatusName(history.status)}</p>
                                <p className="text-sm text-gray-500">{formatDate(history.timestamp)}</p>
                              </div>
                              {history.note && (
                                <p className="text-sm text-gray-600 mt-1">{history.note}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {selectedOrder.hasRFID && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4">RFID防伪信息</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-3">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">RFID防伪标签</p>
                            <p className="text-sm text-gray-600">编码: {selectedOrder.rfidCode}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          该产品已集成RFID防伪标签，确保产品真实性和可追溯性。您可以通过我们的验证应用扫描标签进行验证。
                        </p>
                        <button className="text-sm text-black underline">
                          了解更多关于RFID防伪
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    {['pending_payment'].includes(selectedOrder.status) && (
                      <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                        支付订单
                      </button>
                    )}
                    
                    {['processing', 'printing', 'post_processing'].includes(selectedOrder.status) && (
                      <button className="border border-black text-black px-4 py-2 rounded-md hover:bg-gray-100 transition">
                        取消订单
                      </button>
                    )}
                    
                    {['completed', 'delivered'].includes(selectedOrder.status) && (
                      <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                        再次购买
                      </button>
                    )}
                    
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                      联系客服
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
