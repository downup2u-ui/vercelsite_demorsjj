"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  CalendarIcon, 
  ClockIcon,
  CreditCardIcon,
  TruckIcon,
  DocumentTextIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// 模拟订单数据
const orderData = {
  id: 'ORD-20250615-001',
  status: '已完成',
  date: '2025-06-15',
  time: '14:30',
  customer: {
    id: 'CUS-001',
    name: '张先生',
    email: 'zhang@example.com',
    phone: '138****1234',
    address: '广州市天河区珠江新城88号',
  },
  items: [
    {
      id: 'ITEM-001',
      name: '《山水新境》版画',
      artist: '李明',
      type: '限量版画',
      price: 2800,
      quantity: 1,
      image: '/artworks/traditional-modern.svg',
    },
    {
      id: 'ITEM-002',
      name: '《城市记忆》摄影作品',
      artist: '王华',
      type: '摄影',
      price: 3500,
      quantity: 1,
      image: '/artworks/digital-art.svg',
    }
  ],
  payment: {
    method: '微信支付',
    total: 6300,
    subtotal: 6300,
    shipping: 0,
    tax: 0,
    discount: 0,
    transactionId: 'TXN-20250615-001',
    date: '2025-06-15',
  },
  shipping: {
    method: '顺丰速运',
    trackingNumber: 'SF1234567890',
    estimatedDelivery: '2025-06-18',
    actualDelivery: '2025-06-17',
    address: '广州市天河区珠江新城88号',
    status: '已送达',
    history: [
      { date: '2025-06-15', time: '16:30', status: '订单已确认', location: '广州市' },
      { date: '2025-06-16', time: '09:15', status: '包裹已发出', location: '广州市' },
      { date: '2025-06-16', time: '18:40', status: '运输中', location: '广州市' },
      { date: '2025-06-17', time: '10:25', status: '派送中', location: '广州市' },
      { date: '2025-06-17', time: '14:30', status: '已送达', location: '广州市' },
    ]
  },
  invoice: {
    number: 'INV-20250615-001',
    date: '2025-06-15',
    dueDate: '2025-06-15',
    status: '已支付',
  }
};

// 订单状态标签颜色
const statusColors: { [key: string]: string } = {
  '待付款': 'bg-yellow-100 text-yellow-800',
  '处理中': 'bg-blue-100 text-blue-800',
  '已发货': 'bg-indigo-100 text-indigo-800',
  '已完成': 'bg-green-100 text-green-800',
  '已取消': 'bg-red-100 text-red-800',
};

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id;
  
  // 在实际应用中，这里会根据orderId从API获取订单数据
  // 这里使用模拟数据
  const order = orderData;
  
  const [activeTab, setActiveTab] = useState('details');
  
  // 计算订单总金额
  const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 订单头部信息 */}
        <div className="border-b border-gray-200 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                订单详情
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                订单号: {order.id}
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center text-sm text-gray-500">
              <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              下单日期: {order.date}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <ClockIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              下单时间: {order.time}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <CreditCardIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
              支付方式: {order.payment.method}
            </div>
          </div>
        </div>
        
        {/* 标签页导航 */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === 'details'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              订单详情
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === 'shipping'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              物流信息
            </button>
            <button
              onClick={() => setActiveTab('invoice')}
              className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === 'invoice'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              发票信息
            </button>
          </nav>
        </div>
        
        {/* 订单详情 */}
        {activeTab === 'details' && (
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">订单商品</h2>
            <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      商品
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      艺术家
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      类型
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      单价
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      数量
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      小计
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="h-16 w-16 rounded-md object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {item.artist}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {item.type}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        ¥{item.price.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900">
                        ¥{(item.price * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <th scope="row" colSpan={5} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                      商品小计
                    </th>
                    <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-gray-900">
                      ¥{order.payment.subtotal.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" colSpan={5} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                      运费
                    </th>
                    <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-gray-900">
                      {order.payment.shipping === 0 ? '免运费' : `¥${order.payment.shipping.toLocaleString()}`}
                    </td>
                  </tr>
                  {order.payment.discount > 0 && (
                    <tr>
                      <th scope="row" colSpan={5} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                        优惠
                      </th>
                      <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-red-600">
                        -¥{order.payment.discount.toLocaleString()}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <th scope="row" colSpan={5} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                      总计
                    </th>
                    <td className="whitespace-nowrap px-6 py-3 text-right text-base font-medium text-indigo-600">
                      ¥{order.payment.total.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            {/* 客户信息和支付信息 */}
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900">客户信息</h3>
                <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-500">姓名</dt>
                      <dd className="text-gray-900">{order.customer.name}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-500">电子邮件</dt>
                      <dd className="text-gray-900">{order.customer.email}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-500">电话</dt>
                      <dd className="text-gray-900">{order.customer.phone}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-500">收货地址</dt>
                      <dd className="text-gray-900">{order.customer.address}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">支付信息</h3>
                <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-500">支付方式</dt>
                      <dd className="text-gray-900">{order.payment.method}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-500">交易编号</dt>
                      <dd className="text-gray-900">{order.payment.transactionId}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-500">支付日期</dt>
                      <dd className="text-gray-900">{order.payment.date}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-500">支付状态</dt>
                      <dd className="text-green-600">已支付</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 物流信息 */}
        {activeTab === 'shipping' && (
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">物流信息</h2>
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">物流公司</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.shipping.method}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">运单号</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.shipping.trackingNumber}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">预计送达日期</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.shipping.estimatedDelivery}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">实际送达日期</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.shipping.actualDelivery || '暂无'}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">收货地址</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.shipping.address}</dd>
                </div>
              </dl>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">物流跟踪</h3>
                <div className="mt-2">
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <ul className="divide-y divide-gray-200">
                      {order.shipping.history.map((event, index) => (
                        <li key={index} className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                index === 0 ? 'bg-green-100' : 'bg-gray-100'
                              }`}>
                                {index === 0 ? (
                                  <TruckIcon className="h-5 w-5 text-green-600" />
                                ) : (
                                  <ArrowPathIcon className="h-5 w-5 text-gray-500" />
                                )}
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">{event.status}</p>
                                <p className="text-sm text-gray-500">{event.location}</p>
                              </div>
                            </div>
                            <div className="text-right text-sm text-gray-500">
                              <p>{event.date}</p>
                              <p>{event.time}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 发票信息 */}
        {activeTab === 'invoice' && (
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">发票信息</h2>
              <button className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                <DocumentTextIcon className="mr-2 h-5 w-5" />
                下载发票
              </button>
            </div>
            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">发票编号</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.invoice.number}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">发票日期</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.invoice.date}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">付款日期</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.invoice.dueDate}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">发票状态</dt>
                  <dd className="mt-1 text-sm text-green-600">{order.invoice.status}</dd>
                </div>
              </dl>
              
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-900">发票明细</h3>
                <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          商品
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                          单价
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                          数量
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                          小计
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {order.items.map((item) => (
                        <tr key={item.id}>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                            ¥{item.price.toLocaleString()}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900">
                            ¥{(item.price * item.quantity).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <th scope="row" colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                          商品小计
                        </th>
                        <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-gray-900">
                          ¥{order.payment.subtotal.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                          运费
                        </th>
                        <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-gray-900">
                          {order.payment.shipping === 0 ? '免运费' : `¥${order.payment.shipping.toLocaleString()}`}
                        </td>
                      </tr>
                      {order.payment.discount > 0 && (
                        <tr>
                          <th scope="row" colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                            优惠
                          </th>
                          <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-medium text-red-600">
                            -¥{order.payment.discount.toLocaleString()}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <th scope="row" colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                          总计
                        </th>
                        <td className="whitespace-nowrap px-6 py-3 text-right text-base font-medium text-indigo-600">
                          ¥{order.payment.total.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 底部操作按钮 */}
        <div className="mt-8 flex justify-end space-x-4">
          <Link href="/orders" className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            返回订单列表
          </Link>
          <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
            联系客服
          </button>
        </div>
      </div>
    </div>
  );
}
