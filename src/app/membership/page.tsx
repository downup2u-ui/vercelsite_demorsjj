"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import Tag from '@/components/ui/Tag';

// 会员套餐数据
const membershipPlans = [
  {
    id: 'regular-monthly',
    type: 'regular',
    name: '普通会员月卡',
    price: 39,
    originalPrice: 49,
    period: '月',
    features: [
      '无限次作品浏览',
      '每月3次高质量打印服务',
      '基础设计工具使用权限',
      '社区活动优先参与权',
    ],
    popular: false,
  },
  {
    id: 'regular-yearly',
    type: 'regular',
    name: '普通会员年卡',
    price: 399,
    originalPrice: 588,
    period: '年',
    features: [
      '无限次作品浏览',
      '每月3次高质量打印服务',
      '基础设计工具使用权限',
      '社区活动优先参与权',
      '年度会员专属礼包',
    ],
    popular: true,
  },
  {
    id: 'vip-monthly',
    type: 'vip',
    name: 'VIP会员月卡',
    price: 99,
    originalPrice: 129,
    period: '月',
    features: [
      '无限次作品浏览与下载',
      '每月10次高质量打印服务',
      '全部设计工具使用权限',
      '社区活动优先参与权',
      'VIP专属客服通道',
      '每月赠送100积分',
    ],
    popular: false,
  },
  {
    id: 'vip-yearly',
    type: 'vip',
    name: 'VIP会员年卡',
    price: 999,
    originalPrice: 1188,
    period: '年',
    features: [
      '无限次作品浏览与下载',
      '每月10次高质量打印服务',
      '全部设计工具使用权限',
      '社区活动优先参与权',
      'VIP专属客服通道',
      '每月赠送100积分',
      '年度VIP专属礼包',
      '免费参与平台线下活动',
    ],
    popular: false,
  },
  {
    id: 'premium-yearly',
    type: 'premium',
    name: '尊享会员年卡',
    price: 1999,
    originalPrice: 2400,
    period: '年',
    features: [
      '无限次作品浏览与下载',
      '无限次高质量打印服务',
      '全部设计工具高级使用权限',
      '所有社区活动VIP席位',
      '24小时专属客服通道',
      '每月赠送300积分',
      '尊享会员专属礼包',
      '免费参与平台所有线下活动',
      '创客中心所有服务8折优惠',
      '专属设计师一对一指导'
    ],
    popular: true,
  },
];

export default function MembershipPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  // 如果用户未登录，重定向到登录页面
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
  
  if (!user) {
    return null; // 等待重定向
  }
  
  // 处理会员购买
  const handlePurchase = () => {
    if (!selectedPlan) return;
    
    // 在实际应用中，这里会跳转到支付页面
    // 模拟购买成功后跳转到确认页面
    router.push(`/membership/confirmation?plan=${selectedPlan}`);
  };
  
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-serif mb-4">创客会籍</h1>
          <p className="max-w-xl mx-auto text-gray-500">
            加入海创共坊会员，享受更多专属权益与服务，让您的创意之旅更加顺畅
          </p>
        </div>
        
        {/* 当前会员状态 */}
        {user.membershipType !== 'none' && (
          <div className="max-w-3xl mx-auto mt-10 mb-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-medium mb-4">当前会员状态</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {user.membershipType === 'vip' ? 'VIP会员' : '普通会员'}
                </p>
                {user.membershipExpiry && (
                  <p className="text-sm text-gray-500">
                    到期时间: {new Date(user.membershipExpiry).toLocaleDateString('zh-CN')}
                  </p>
                )}
              </div>
              <Link
                href="/membership/benefits"
                className="text-sm font-medium text-gray-800 hover:text-gray-700"
              >
                查看会员权益
              </Link>
            </div>
          </div>
        )}
        
        {/* 会员套餐选择 */}
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-4">
          {membershipPlans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg shadow-sm divide-y divide-gray-200 ${
                selectedPlan === plan.id
                  ? 'border-2 border-gray-800 bg-gray-50'
                  : 'hover:border-gray-400'
              } ${plan.popular ? 'border-gray-500' : 'border-gray-200'} relative`}
            >
              {plan.popular && (
                <div className="flex justify-center transform -translate-y-1/2">
                  <Tag variant="primary" className="px-4 py-1 text-xs font-semibold tracking-wider uppercase">
                    最受欢迎
                  </Tag>
                </div>
              )}
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">{plan.name}</h2>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-3xl font-extrabold tracking-tight">¥{plan.price}</span>
                  <span className="ml-1 text-xl font-semibold">/{plan.period}</span>
                </p>
                {plan.originalPrice && (
                  <p className="mt-1 text-sm text-gray-500">
                    <span className="line-through">原价: ¥{plan.originalPrice}</span>
                    <span className="ml-2 text-gray-800">
                      省{Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)}%
                    </span>
                  </p>
                )}
                <Button
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`mt-8 block w-full py-2 px-3 border rounded-md shadow-sm text-sm font-medium transition-colors ${
                    selectedPlan === plan.id
                      ? 'bg-gray-800 text-white hover:bg-gray-700 border-gray-800'
                      : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                >
                  {selectedPlan === plan.id ? '已选择' : '选择'}
                </Button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">包含权益</h3>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        {/* 购买按钮 */}
        <div className="mt-10 text-center">
          <Button
            type="button"
            onClick={handlePurchase}
            disabled={!selectedPlan}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm ${
              selectedPlan
                ? 'text-white bg-gray-800 hover:bg-gray-700'
                : 'text-gray-400 bg-gray-200 cursor-not-allowed'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
          >
            {selectedPlan ? '立即购买' : '请选择会员套餐'}
          </Button>
        </div>
        
        {/* 会员权益说明 */}
        <div className="mt-20">
          <h2 className="text-2xl font-serif text-center mb-12">会员权益详解</h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-black">作品访问权限</h3>
              <p className="text-gray-500">
                会员可以无限次浏览平台上的优质作品，VIP会员还可以下载高清设计图纸和模型文件。
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-black">3D打印服务</h3>
              <p className="text-gray-500">
                会员每月可享受指定次数的高质量3D打印服务，包括模型优化、材料选择建议和打印后处理。
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-black">设计工具使用</h3>
              <p className="text-gray-500">
                会员可以使用平台提供的设计工具，VIP会员可以使用全部高级设计工具和插件。
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-black">社区活动</h3>
              <p className="text-gray-500">
                会员可优先参与平台组织的各类线上线下活动，包括设计分享会、工作坊和展览等。
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-black">专属客服</h3>
              <p className="text-gray-500">
                VIP会员享有专属客服通道，提供7*12小时响应服务，解决您在创作过程中遇到的各类问题。
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-black">积分奖励</h3>
              <p className="text-gray-500">
                VIP会员每月自动获得积分奖励，可用于兑换平台专属周边、优惠券或其他增值服务。
              </p>
            </div>
          </div>
        </div>
        
        {/* 常见问题 */}
        <div className="mt-20">
          <h2 className="text-2xl font-serif text-center mb-12">常见问题</h2>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">如何选择适合我的会员类型？</h3>
              <div className="mt-2 text-gray-500">
                <p>
                  如果您是偶尔使用平台的用户，建议选择普通会员；如果您是设计师或经常需要使用平台服务的用户，
                  推荐选择VIP会员以获得更全面的服务和权益。年卡相比月卡更加经济实惠。
                </p>
              </div>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">会员是否可以随时取消？</h3>
              <div className="mt-2 text-gray-500">
                <p>
                  会员服务一旦购买，在有效期内无法取消或退款。您可以选择不自动续费，
                  会员到期后将自动变为非会员状态。
                </p>
              </div>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">会员权益是否会更新？</h3>
              <div className="mt-2 text-gray-500">
                <p>
                  是的，我们会定期更新和优化会员权益，为会员提供更多价值。
                  所有权益更新都会通过站内信和邮件通知会员。
                </p>
              </div>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900">如何联系会员服务？</h3>
              <div className="mt-2 text-gray-500">
                <p>
                  您可以通过平台内的"联系我们"页面，或发送邮件至 membership@chaochuanggongfang.com 
                  联系会员服务团队，我们会在工作日24小时内回复您的问题。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
