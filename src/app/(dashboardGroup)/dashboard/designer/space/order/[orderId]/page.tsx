"use client";

import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

// 模拟订单数据
const orderData = {
  ORD1001: {
    orderId: 'ORD1001',
    spaceName: 'A区共享工位',
    type: '共享工作室',
    startTime: '2024-07-20 09:00',
    endTime: '2024-07-20 18:00',
    status: '进行中',
    price: 80,
    total: 80,
    payStatus: '已支付',
  },
  ORD1002: {
    orderId: 'ORD1002',
    spaceName: '201独立办公室',
    type: '办公室',
    startTime: '2024-06-10 09:00',
    endTime: '2024-06-10 18:00',
    status: '已到期',
    price: 200,
    total: 200,
    payStatus: '未支付',
  },
};

export default function SpaceOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { orderId } = params;
  const order = orderData[orderId as string];

  if (!order) {
    return <div className="p-8">未找到该订单</div>;
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">空间预约订单详情</h1>
        <Link href="/dashboard/designer/space" className="text-blue-600 hover:underline">返回我的预约</Link>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="mb-4">
          <span className="text-gray-500">订单编号：</span>
          <span className="font-mono text-base">{order.orderId}</span>
        </div>
        <div className="mb-2">
          <span className="text-gray-500">空间名称：</span>{order.spaceName}
        </div>
        <div className="mb-2">
          <span className="text-gray-500">类型：</span>{order.type}
        </div>
        <div className="mb-2">
          <span className="text-gray-500">预约时间：</span>{order.startTime}
        </div>
        <div className="mb-2">
          <span className="text-gray-500">到期时间：</span>{order.endTime}
        </div>
        <div className="mb-2">
          <span className="text-gray-500">状态：</span>
          <span className={`px-2 py-1 rounded text-xs ${order.status === '已到期' ? 'bg-gray-300 text-gray-600' : 'bg-green-100 text-green-700'}`}>{order.status}</span>
        </div>
        <div className="mb-2">
          <span className="text-gray-500">单价：</span>￥{order.price}/天
        </div>
        <div className="mb-2">
          <span className="text-gray-500">总费用：</span>￥{order.total}
        </div>
        <div className="mb-2">
          <span className="text-gray-500">支付状态：</span>
          <span className={order.payStatus === '已支付' ? 'text-green-600' : 'text-red-600'}>{order.payStatus}</span>
        </div>
      </div>
    </div>
  );
} 