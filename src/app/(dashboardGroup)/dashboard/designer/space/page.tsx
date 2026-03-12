"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  BuildingOfficeIcon, 
  HomeModernIcon, 
  UserGroupIcon,
  CalendarIcon,
  PhotoIcon,
  MusicalNoteIcon,
  ClockIcon,
  MapPinIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

// Tab组件
interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
  count?: number;
}

const Tab: React.FC<TabProps> = ({ label, active, onClick, count }) => {
  return (
    <button
      className={`px-4 py-2 font-medium text-sm rounded-md ${
        active 
          ? 'bg-indigo-100 text-indigo-700' 
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      {label}
      {count !== undefined && (
        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
          active ? 'bg-indigo-200 text-indigo-800' : 'bg-gray-200 text-gray-700'
        }`}>
          {count}
        </span>
      )}
    </button>
  );
};

// 空间/活动卡片组件
interface SpaceCardProps {
  title: string;
  type: string;
  description: string;
  image: string;
  features: string[];
  availability: string;
  href: string;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ 
  title, 
  type, 
  description, 
  image, 
  features, 
  availability, 
  href 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-indigo-500 text-white">
            {type}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">特点/设施:</h4>
          <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-gray-100 pt-3">
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>{availability}</span>
          </div>
          <Link href={href}>
            <div className="px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors">
              立即预约
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const spaceTypes = ["共享工作室", "办公室", "会议室", "我的预约"];

// 模拟空间数据
const spacesData = {
  "共享工作室": [
    {
      id: 'S001',
      name: 'A区共享工位',
      capacity: 8,
      available: true,
      location: '1号楼2层',
      features: ['高速网络', '打印复印'],
      price: 80,
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72'
    },
    {
      id: 'S002',
      name: 'B区开放空间',
      capacity: 12,
      available: false,
      location: '2号楼1层',
      features: ['投影仪', '茶歇区'],
      price: 120,
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b'
    },
  ],
  "办公室": [
    {
      id: 'O001',
      name: '201独立办公室',
      capacity: 4,
      available: true,
      location: '1号楼2层',
      features: ['白板', '独立空调'],
      price: 200,
      image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76'
    },
    {
      id: 'O002',
      name: '202独立办公室',
      capacity: 6,
      available: false,
      location: '1号楼2层',
      features: ['会议桌', '沙发'],
      price: 260,
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2'
    },
  ],
  "会议室": [
    {
      id: 'M001',
      name: '大会议室',
      capacity: 16,
      available: true,
      location: '2号楼3层',
      features: ['视频会议', '大屏幕'],
      price: 180,
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4'
    },
    {
      id: 'M002',
      name: '小会议室',
      capacity: 6,
      available: true,
      location: '2号楼3层',
      features: ['白板'],
      price: 80,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
    },
  ],
};

// 模拟我的预约数据
const myReservations = [
  {
    id: 'R001',
    spaceName: 'A区共享工位',
    type: '共享工作室',
    startTime: '2024-07-20 09:00',
    endTime: '2024-07-20 18:00',
    status: '进行中',
    orderId: 'ORD1001',
  },
  {
    id: 'R002',
    spaceName: '201独立办公室',
    type: '办公室',
    startTime: '2024-06-10 09:00',
    endTime: '2024-06-10 18:00',
    status: '已到期',
    orderId: 'ORD1002',
  },
];

// 顶部"即将到来的预约"数据（真实空间类型）
const upcomingBookings = [
  {
    id: "BK-2024-0715",
    title: "多功能会议室",
    date: "2024-07-15",
    time: "14:00-16:00",
    status: "已确认"
  },
  {
    id: "BK-2024-0720",
    title: "A区共享工位",
    date: "2024-07-20",
    time: "09:00-18:00",
    status: "待确认"
  }
];

// 设施空间卡片数据（按类型）
const facilities = [
  {
    title: "创意共享工作室",
    type: "工作室",
    description: "配备完善的设计设备和工具的共享创作空间，适合个人或小团队使用。",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    features: ["高速WiFi", "设计工作站", "3D打印机", "咖啡/茶水", "24小时空调"],
    availability: "周一至周日 08:00-22:00",
    href: "/dashboard/designer/space/booking/studio"
  },
  {
    title: "独立办公室",
    type: "办公室",
    description: "私密、安静的独立办公空间，适合需要专注工作的设计师或团队。",
    image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76",
    features: ["独立门禁", "专属家具", "会议设施", "储物空间", "可定制布置"],
    availability: "月租/季租/年租",
    href: "/dashboard/designer/space/booking/office"
  },
  {
    title: "多功能会议室",
    type: "会议室",
    description: "配备现代化会议设施的专业空间，适合项目讨论、客户会面和创意研讨。",
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4",
    features: ["投影设备", "视频会议", "白板墙", "茶水服务", "可容纳15人"],
    availability: "需提前24小时预约",
    href: "/dashboard/designer/space/booking/meeting"
  }
];

export default function SpaceReservationPage() {
  const [tab, setTab] = useState(spaceTypes[0]);
  const [showMyReservations, setShowMyReservations] = useState(false);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">空间预约</h1>
          <p className="text-gray-500">预约共享工作室、办公室、会议室等空间，灵活满足您的办公与协作需求。</p>
        </div>
        {/* 右上角"我的预约"按钮 */}
        <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors"
          onClick={() => setShowMyReservations(v => !v)}
        >
          <UserGroupIcon className="h-5 w-5 mr-2" />
          我的预约
          {showMyReservations ? <ChevronUpIcon className="h-4 w-4 ml-1" /> : <ChevronDownIcon className="h-4 w-4 ml-1" />}
        </button>
      </div>
      {/* 我的预约下拉卡片 */}
      {showMyReservations && (
        <div className="mb-6 bg-white rounded-lg shadow-lg border border-gray-200 p-6 animate-fade-in">
          <h2 className="text-lg font-semibold mb-4">我的预约</h2>
          <table className="w-full border rounded-lg bg-white shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-3">空间名称</th>
                <th className="py-2 px-3">类型</th>
                <th className="py-2 px-3">预约时间</th>
                <th className="py-2 px-3">到期时间</th>
                <th className="py-2 px-3">状态</th>
                <th className="py-2 px-3">订单</th>
                <th className="py-2 px-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {myReservations.map(r => (
                <tr key={r.id} className="border-b last:border-b-0">
                  <td className="py-2 px-3">{r.spaceName}</td>
                  <td className="py-2 px-3">{r.type}</td>
                  <td className="py-2 px-3">{r.startTime}</td>
                  <td className="py-2 px-3">{r.endTime}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-1 rounded text-xs ${r.status === '已到期' ? 'bg-gray-300 text-gray-600' : 'bg-green-100 text-green-700'}`}>{r.status}</span>
                  </td>
                  <td className="py-2 px-3">{r.orderId}</td>
                  <td className="py-2 px-3">
                    <Link href={`/dashboard/designer/space/order/${r.orderId}`} className="text-blue-600 hover:underline">查看订单</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* 即将到来的预约提醒 */}
      {upcomingBookings.length > 0 && (
        <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100 mb-6">
          <div className="flex items-center mb-3">
            <CalendarIcon className="h-5 w-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-medium text-indigo-800">即将到来的预约</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingBookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-md p-3 flex justify-between items-center shadow-sm">
                <div>
                  <p className="font-medium text-gray-800">{booking.title}</p>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>{booking.date}</span>
                    <ClockIcon className="h-4 w-4 ml-3 mr-1" />
                    <span>{booking.time}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full 
                  ${booking.status === '已确认' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* 美化后的Tab栏 */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-2">
        {spaceTypes.slice(0, 3).map(type => (
          <button
            key={type}
            className={`px-6 py-2 rounded-t-lg font-semibold transition-all duration-200 shadow-sm
              ${tab === type ? 'bg-white border border-b-0 border-blue-500 text-blue-700 font-bold -mb-px' : 'bg-gray-100 text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}
            style={{ boxShadow: tab === type ? '0 2px 8px rgba(59,130,246,0.08)' : undefined }}
            onClick={() => setTab(type)}
          >
            {type}
          </button>
        ))}
      </div>
      {/* Tab内容渲染 */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(spacesData[tab] || []).map(space => (
            <SpaceCard
              key={space.id}
              title={space.name}
              type={tab}
              description={space.location + ' · 容纳' + space.capacity + '人'}
              image={space.image || ''}
              features={space.features}
              availability={space.price ? `￥${space.price}/天` : ''}
              href={"#"}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 