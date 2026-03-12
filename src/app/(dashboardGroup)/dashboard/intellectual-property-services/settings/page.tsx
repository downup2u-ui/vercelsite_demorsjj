"use client";

import { useState } from 'react';
import Image from 'next/image';

interface TabProps {
  id: string;
  label: string;
  active: boolean;
  onClick: (id: string) => void;
}

const Tab: React.FC<TabProps> = ({ id, label, active, onClick }) => {
  return (
    <button
      className={`py-3 px-5 text-sm font-medium rounded-lg transition-colors ${
        active 
          ? 'bg-indigo-100 text-indigo-700' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
      onClick={() => onClick(id)}
    >
      {label}
    </button>
  );
};

export default function IPSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: '王知产',
    email: 'wang.ip@example.com',
    phone: '13800138000',
    title: '知识产权顾问',
    bio: '8年知识产权保护经验，专注于创意行业的知识产权服务，为客户提供商标、专利和版权保护解决方案。',
    avatar: '/images/avatars/王知产.svg', // 假设这个路径是有效的
  });
  
  const [serviceSettings, setServiceSettings] = useState({
    allowAutoRenewal: true,
    renewalNotification: true,
    publicProfile: false,
    shareAnonymousData: true,
    autoTagPortfolio: true
  });
  
  // 处理保存个人资料
  const handleSaveProfile = () => {
    setIsLoading(true);
    // 模拟 API 请求延迟
    setTimeout(() => {
      setIsLoading(false);
      // 这里应该显示一个成功消息
    }, 1000);
  };
  
  // 模拟服务套餐数据
  const servicePlans = [
    { 
      id: 'basic', 
      name: '基础版', 
      price: '¥299/月',
      description: '适合个人设计师的基础知识产权服务',
      features: ['商标注册申请', '版权登记(5个/月)', '基础侵权监测', '邮件支持'],
      current: false
    },
    { 
      id: 'pro', 
      name: '专业版', 
      price: '¥699/月',
      description: '适合设计工作室和中小企业的全面服务',
      features: ['商标注册申请', '版权登记(不限量)', '专利申请咨询', '高级侵权监测', '优先电话与邮件支持'],
      current: true
    },
    { 
      id: 'enterprise', 
      name: '企业版', 
      price: '¥1499/月',
      description: '为大型企业和设计机构提供的定制化解决方案',
      features: ['全方位知识产权保护', '定制化侵权监测与维权', '专属知识产权顾问', '优先处理所有请求', '无限制的登记与申请'],
      current: false
    }
  ];
  
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">账户设置</h1>
        <p className="mt-1 text-gray-500">管理您的账户信息与知识产权服务偏好</p>
      </div>
      
      {/* 标签页切换控件 */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <Tab id="profile" label="个人资料" active={activeTab === 'profile'} onClick={setActiveTab} />
          <Tab id="services" label="服务设置" active={activeTab === 'services'} onClick={setActiveTab} />
          <Tab id="billing" label="套餐与计费" active={activeTab === 'billing'} onClick={setActiveTab} />
          <Tab id="notifications" label="通知偏好" active={activeTab === 'notifications'} onClick={setActiveTab} />
          <Tab id="api" label="API访问" active={activeTab === 'api'} onClick={setActiveTab} />
        </div>
      </div>
      
      {/* 标签页内容 */}
      <div className="bg-white rounded-lg shadow">
        {/* 个人资料表单 */}
        {activeTab === 'profile' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">个人资料</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 头像上传部分 */}
              <div className="lg:col-span-1">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-100">
                      <Image 
                        src={profileData.avatar} 
                        alt="用户头像" 
                        className="object-cover"
                        width={128}
                        height={128}
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="text-sm text-gray-500 text-center">
                    <p>允许的格式: JPG, PNG</p>
                    <p>最大文件大小: 2MB</p>
                  </div>
                </div>
              </div>
              
              {/* 个人信息表单 */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">职务</label>
                      <input
                        type="text"
                        id="title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={profileData.title}
                        onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">电子邮箱</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">手机号码</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">个人简介</label>
                    <textarea
                      id="bio"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* 保存按钮 */}
            <div className="mt-8 flex justify-end">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors mr-3"
                onClick={() => {
                  // 重置为原始数据的逻辑
                }}
              >
                取消
              </button>
              <button 
                className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center ${isLoading ? 'opacity-75 cursor-wait' : ''}`}
                onClick={handleSaveProfile}
                disabled={isLoading}
              >
                {isLoading && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                保存修改
              </button>
            </div>
          </div>
        )}
        
        {/* 服务设置 */}
        {activeTab === 'services' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">服务设置</h2>
            
            <div className="space-y-6">
              {/* 服务项偏好设置 */}
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">IP服务偏好</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">自动续展提醒</p>
                      <p className="text-xs text-gray-500">在知识产权将要到期前30天自动发送提醒</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        name="allowAutoRenewal"
                        id="allowAutoRenewal"
                        className="sr-only"
                        checked={serviceSettings.allowAutoRenewal}
                        onChange={() => setServiceSettings({
                          ...serviceSettings,
                          allowAutoRenewal: !serviceSettings.allowAutoRenewal
                        })}
                      />
                      <label
                        htmlFor="allowAutoRenewal"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                          serviceSettings.allowAutoRenewal ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                            serviceSettings.allowAutoRenewal ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">公开顾问资料</p>
                      <p className="text-xs text-gray-500">允许设计师在平台上查看您的专业资料</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        name="publicProfile"
                        id="publicProfile"
                        className="sr-only"
                        checked={serviceSettings.publicProfile}
                        onChange={() => setServiceSettings({
                          ...serviceSettings,
                          publicProfile: !serviceSettings.publicProfile
                        })}
                      />
                      <label
                        htmlFor="publicProfile"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                          serviceSettings.publicProfile ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                            serviceSettings.publicProfile ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">自动标记作品集</p>
                      <p className="text-xs text-gray-500">自动为已受保护的作品添加版权/商标标记</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        name="autoTagPortfolio"
                        id="autoTagPortfolio"
                        className="sr-only"
                        checked={serviceSettings.autoTagPortfolio}
                        onChange={() => setServiceSettings({
                          ...serviceSettings,
                          autoTagPortfolio: !serviceSettings.autoTagPortfolio
                        })}
                      />
                      <label
                        htmlFor="autoTagPortfolio"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                          serviceSettings.autoTagPortfolio ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                            serviceSettings.autoTagPortfolio ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 数据共享设置 */}
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">数据共享</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">共享匿名数据</p>
                      <p className="text-xs text-gray-500">允许共享匿名化数据以改进平台服务</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        name="shareAnonymousData"
                        id="shareAnonymousData"
                        className="sr-only"
                        checked={serviceSettings.shareAnonymousData}
                        onChange={() => setServiceSettings({
                          ...serviceSettings,
                          shareAnonymousData: !serviceSettings.shareAnonymousData
                        })}
                      />
                      <label
                        htmlFor="shareAnonymousData"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                          serviceSettings.shareAnonymousData ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                            serviceSettings.shareAnonymousData ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 保存按钮 */}
            <div className="mt-8 flex justify-end">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                保存设置
              </button>
            </div>
          </div>
        )}
        
        {/* 套餐与计费 */}
        {activeTab === 'billing' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">套餐与计费</h2>
            
            {/* 当前套餐 */}
            <div className="mb-8">
              <h3 className="text-base font-medium text-gray-800 mb-4">当前服务套餐</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {servicePlans.map((plan) => (
                  <div 
                    key={plan.id} 
                    className={`border rounded-lg p-5 ${
                      plan.current 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{plan.name}</h4>
                        <p className="text-indigo-600 font-medium">{plan.price}</p>
                      </div>
                      {plan.current && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          当前套餐
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-700">
                          <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    {plan.current ? (
                      <button className="w-full py-2 bg-white border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">
                        管理套餐
                      </button>
                    ) : (
                      <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                        切换套餐
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* 支付方式 */}
            <div className="mb-8">
              <h3 className="text-base font-medium text-gray-800 mb-4">支付方式</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded mr-3">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Visa **** **** **** 4567</p>
                    <p className="text-xs text-gray-500">有效期至 08/25</p>
                  </div>
                  <div className="ml-auto">
                    <button className="text-sm text-indigo-600 hover:text-indigo-800">编辑</button>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  添加新支付方式
                </button>
              </div>
            </div>
            
            {/* 账单历史 */}
            <div>
              <h3 className="text-base font-medium text-gray-800 mb-4">账单历史</h3>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        账单日期
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        账单金额
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        状态
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2024年7月1日
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ¥699.00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          已支付
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900">
                        <a href="#">查看发票</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2024年6月1日
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ¥699.00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          已支付
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900">
                        <a href="#">查看发票</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2024年5月1日
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ¥699.00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          已支付
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900">
                        <a href="#">查看发票</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* 简单实现的另外两个标签页，实际环境中应该有更多内容 */}
        {activeTab === 'notifications' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">通知偏好</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">通知方式</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">电子邮件通知</p>
                      <p className="text-xs text-gray-500">关于知识产权状态变更、截止日期等的邮件提醒</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input type="checkbox" id="emailNotif" className="sr-only" defaultChecked />
                      <label htmlFor="emailNotif" className="block overflow-hidden h-6 rounded-full bg-indigo-600 cursor-pointer">
                        <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-4"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">短信通知</p>
                      <p className="text-xs text-gray-500">重要事项的短信提醒</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input type="checkbox" id="smsNotif" className="sr-only" />
                      <label htmlFor="smsNotif" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
                        <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-0"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">通知类型</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">知识产权到期提醒</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input type="checkbox" id="expiryNotif" className="sr-only" defaultChecked />
                      <label htmlFor="expiryNotif" className="block overflow-hidden h-6 rounded-full bg-indigo-600 cursor-pointer">
                        <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-4"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">新设计师请求提醒</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input type="checkbox" id="requestNotif" className="sr-only" defaultChecked />
                      <label htmlFor="requestNotif" className="block overflow-hidden h-6 rounded-full bg-indigo-600 cursor-pointer">
                        <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-4"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">服务更新提醒</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input type="checkbox" id="updateNotif" className="sr-only" defaultChecked />
                      <label htmlFor="updateNotif" className="block overflow-hidden h-6 rounded-full bg-indigo-600 cursor-pointer">
                        <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-4"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                保存偏好
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'api' && (
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900">API访问</h2>
                <p className="text-sm text-gray-500 mt-1">管理您的API密钥以集成知识产权服务</p>
              </div>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm">
                生成新API密钥
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
              <h3 className="text-base font-medium text-gray-800 mb-2">您的API密钥</h3>
              <div className="flex">
                <input
                  type="text"
                  value="sk_ip_••••••••••••••••••••••••••"
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-l-md text-gray-500"
                />
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 transition-colors">
                  显示
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">此密钥允许对您的知识产权数据进行API访问。请妥善保管，不要分享给他人。</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">API使用限制</h3>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-700">每日请求限制</span>
                    <span className="text-sm font-medium text-gray-900">1,000次</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full w-1/4"></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500 text-right">
                    已使用: 250 / 1,000 请求
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">API文档</h3>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 mb-4">访问我们的开发者文档了解如何集成我们的知识产权API：</p>
                  <a href="#" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    开发者文档中心
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 