"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // 如果用户未登录，重定向到登录页面
  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [user, router]);
  
  if (!user || isLoading) {
    return null; // 等待重定向或数据加载
  }
  
  // 计算会员到期日期
  const formatExpiryDate = () => {
    if (!user.membershipExpiry) return '无会员';
    
    const expiryDate = new Date(user.membershipExpiry);
    const now = new Date();
    
    // 计算剩余天数
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return '已过期';
    
    return `${expiryDate.toLocaleDateString('zh-CN')} (剩余${diffDays}天)`;
  };
  
  // 获取会员类型显示文本
  const getMembershipTypeText = () => {
    switch (user.membershipType) {
      case 'vip':
        return 'VIP会员';
      case 'regular':
        return '普通会员';
      default:
        return '非会员';
    }
  };
  
  // 获取用户角色显示文本
  const getRoleText = () => {
    switch (user.role) {
      case 'designer':
        return '设计师';
      case 'programmer':
        return '程序员';
      default:
        return '普通用户';
    }
  };

  const getDefaultAvatarByRole = (role: string) => {
    switch (role) {
      case 'designer':
        return 'https://api.dicebear.com/7.x/avataaars/svg?seed=designer';
      case 'programmer':
        return 'https://api.dicebear.com/7.x/avataaars/svg?seed=programmer';
      case 'admin':
        return 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin';
      default:
        return 'https://api.dicebear.com/7.x/avataaars/svg?seed=user';
    }
  };
  
  // 确保用户头像始终有值
  const userAvatar = user.avatar || getDefaultAvatarByRole(user.role);
  
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-serif mb-8">个人资料</h1>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
            <div className="flex items-start">
              <div className="mr-6">
                <Image
                  src={userAvatar}
                  alt={user.name || '用户头像'}
                  width={100}
                  height={100}
                  className="rounded-full"
                  onError={() => console.error('Failed to load user avatar')}
                  onLoad={() => console.log('User avatar loaded successfully')}
                />
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-medium mb-2">{user.name}</h2>
                <p className="text-gray-500 mb-4">{user.email}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">用户角色</p>
                    <p className="font-medium">{getRoleText()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">注册时间</p>
                    <p className="font-medium">{new Date(user.createdAt).toLocaleDateString('zh-CN')}</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Link 
                    href="/account" 
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    编辑资料
                  </Link>
                  <Link 
                    href="/account/security" 
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    安全设置
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* 会员信息 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-medium mb-4">会员信息</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">会员类型</p>
                <div className="flex items-center">
                  {user.membershipType === 'vip' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                      VIP
                    </span>
                  ) : user.membershipType === 'regular' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                      普通会员
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2">
                      非会员
                    </span>
                  )}
                  <span className="font-medium">{getMembershipTypeText()}</span>
                </div>
              </div>
              
              {user.membershipType !== 'none' && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">到期时间</p>
                  <p className="font-medium">{formatExpiryDate()}</p>
                </div>
              )}
            </div>
            
            {user.membershipType === 'none' ? (
              <div className="mt-6">
                <Link 
                  href="/membership" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  购买会员
                </Link>
              </div>
            ) : (
              <div className="mt-6">
                <Link 
                  href="/membership/renew" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  续费会员
                </Link>
              </div>
            )}
          </div>
          
          {/* 积分信息 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">积分信息</h2>
              <Link 
                href="/points/history" 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                查看明细
              </Link>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">当前积分</p>
                <p className="text-2xl font-medium">{user.points}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Link 
                href="/points/recharge" 
                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                积分充值
              </Link>
              <Link 
                href="/points/exchange" 
                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                积分兑换
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
