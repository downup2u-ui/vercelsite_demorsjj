"use client";

import React, { useState } from 'react';
import Link from 'next/link';
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

// Placeholder for a reusable SettingsSection component
const SettingsSection: React.FC<{ title: string; description?: string; children: React.ReactNode }> = ({ title, description, children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

// Placeholder for a FormField or similar UI component if needed for forms
const FormField: React.FC<{label: string, children: React.ReactNode, note?: string}> = ({label, children, note}) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {children}
        {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
    </div>
);

export default function DesignerSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const welcomeMessage = "管理您的账户信息、偏好设置与安全选项。";

  // 个人资料数据
  const [profileData, setProfileData] = useState({
    name: '张设计',
    email: 'designer@example.com',
    phone: '13900001234',
    title: '高级产品设计师',
    bio: '7年产品设计经验，专注于用户体验和界面设计。曾参与多个知名互联网产品的设计工作，擅长将复杂需求转化为简洁易用的界面。',
    avatar: '/images/avatars/placeholder.svg', // 假设这个路径是有效的
  });

  // 设置信息
  const [designerSettings, setDesignerSettings] = useState({
    emailNotifications: true,
    projectUpdates: false,
    portfolioVisibility: true,
    allowCollaboration: true,
    darkModeUI: false
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

  // 模拟设计师套餐数据
  const designerPlans = [
    { 
      id: 'free', 
      name: '免费版', 
      price: '¥0/月',
      description: '适合初入行的个人设计师',
      features: ['基础作品集展示', '最多5个项目', '社区支持'],
      current: false
    },
    { 
      id: 'pro', 
      name: '专业版', 
      price: '¥199/月',
      description: '适合活跃的专业设计师',
      features: ['无限作品集展示', '优先项目推荐', '合作优先匹配', '基础知识产权保护', '7×24小时支持'],
      current: true
    },
    { 
      id: 'business', 
      name: '商业版', 
      price: '¥599/月',
      description: '适合设计工作室和团队',
      features: ['所有专业版功能', '多用户账户管理', '高级数据分析', '白标展示页面', '专属客户经理'],
      current: false
    }
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">账户设置</h1>
        <p className="mt-1 text-gray-500">{welcomeMessage}</p>
      </div>
      
      {/* 标签页切换控件 */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <Tab id="profile" label="个人资料" active={activeTab === 'profile'} onClick={setActiveTab} />
          <Tab id="account" label="账户安全" active={activeTab === 'account'} onClick={setActiveTab} />
          <Tab id="billing" label="套餐与计费" active={activeTab === 'billing'} onClick={setActiveTab} />
          <Tab id="notifications" label="通知偏好" active={activeTab === 'notifications'} onClick={setActiveTab} />
          <Tab id="portfolio" label="作品集设置" active={activeTab === 'portfolio'} onClick={setActiveTab} />
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

        {/* 账户安全 */}
        {activeTab === 'account' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">账户安全</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">登录凭证</h3>

                <FormField label="当前邮箱">
                  <input 
                    type="email" 
                    readOnly 
                    value={profileData.email} 
                    className="mt-1 block w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm"
                  />
                </FormField>
                <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-800">更改邮箱地址</button>
                
                <hr className="my-6"/>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">密码</h4>
                  <button className="text-sm text-indigo-600 hover:text-indigo-800">更改密码</button>
                </div>
                
                <hr className="my-6"/>
                
                <FormField label="两步验证 (2FA)">
                  <div className="mt-1 flex items-center">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      已启用
                    </span>
                    <button className="ml-4 text-sm text-indigo-600 hover:text-indigo-800">管理2FA设置</button>
                  </div>
                </FormField>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">会话管理</h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">当前会话</p>
                      <p className="text-xs text-gray-500">MacOS · Chrome · 上海</p>
                      <p className="text-xs text-gray-500">上次活动: 刚刚</p>
                    </div>
                  </div>
                </div>
                <button className="mt-4 text-sm text-red-600 hover:text-red-800 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  登出所有其他设备
                </button>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">账户删除</h3>
                <p className="text-sm text-gray-600 mb-3">
                  删除账户将永久移除您的所有数据，包括作品集、项目历史和个人资料。此操作无法撤销。
                </p>
                <button className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition-colors">
                  删除我的账户
                </button>
              </div>
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
                {designerPlans.map((plan) => (
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
                    <p className="text-sm font-medium text-gray-700">Visa **** **** **** 5678</p>
                    <p className="text-xs text-gray-500">有效期至 09/26</p>
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
                        ¥199.00
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
                        ¥199.00
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
                        ¥199.00
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

        {/* 通知偏好 */}
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
                      <p className="text-xs text-gray-500">关于新项目邀请、合作请求等的邮件提醒</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        id="emailNotifications"
                        className="sr-only"
                        checked={designerSettings.emailNotifications}
                        onChange={() => setDesignerSettings({
                          ...designerSettings,
                          emailNotifications: !designerSettings.emailNotifications
                        })}
                      />
                      <label
                        htmlFor="emailNotifications"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                          designerSettings.emailNotifications ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                            designerSettings.emailNotifications ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">站内通知</p>
                      <p className="text-xs text-gray-500">项目更新和活动提醒</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        name="projectUpdates"
                        id="projectUpdates"
                        className="sr-only"
                        checked={designerSettings.projectUpdates}
                        onChange={() => setDesignerSettings({
                          ...designerSettings,
                          projectUpdates: !designerSettings.projectUpdates
                        })}
                      />
                      <label
                        htmlFor="projectUpdates"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                          designerSettings.projectUpdates ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                            designerSettings.projectUpdates ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        ></span>
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
                      <p className="text-sm font-medium text-gray-700">新合作邀请</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input type="checkbox" id="newCollab" className="sr-only" defaultChecked />
                      <label htmlFor="newCollab" className="block overflow-hidden h-6 rounded-full bg-indigo-600 cursor-pointer">
                        <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-4"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">项目更新提醒</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input type="checkbox" id="projectUpdate" className="sr-only" defaultChecked />
                      <label htmlFor="projectUpdate" className="block overflow-hidden h-6 rounded-full bg-indigo-600 cursor-pointer">
                        <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-4"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">作品集查看通知</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input type="checkbox" id="portfolioView" className="sr-only" />
                      <label htmlFor="portfolioView" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
                        <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-0"></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">平台更新与公告</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input type="checkbox" id="platformUpdate" className="sr-only" defaultChecked />
                      <label htmlFor="platformUpdate" className="block overflow-hidden h-6 rounded-full bg-indigo-600 cursor-pointer">
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

        {/* 作品集设置 */}
        {activeTab === 'portfolio' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">作品集设置</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">作品集可见性</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">公开作品集</p>
                      <p className="text-xs text-gray-500">允许未注册用户查看您的作品集</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        name="portfolioVisibility"
                        id="portfolioVisibility"
                        className="sr-only"
                        checked={designerSettings.portfolioVisibility}
                        onChange={() => setDesignerSettings({
                          ...designerSettings,
                          portfolioVisibility: !designerSettings.portfolioVisibility
                        })}
                      />
                      <label
                        htmlFor="portfolioVisibility"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                          designerSettings.portfolioVisibility ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                            designerSettings.portfolioVisibility ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">允许合作请求</p>
                      <p className="text-xs text-gray-500">允许其他用户通过您的作品集发送合作请求</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        name="allowCollaboration"
                        id="allowCollaboration"
                        className="sr-only"
                        checked={designerSettings.allowCollaboration}
                        onChange={() => setDesignerSettings({
                          ...designerSettings,
                          allowCollaboration: !designerSettings.allowCollaboration
                        })}
                      />
                      <label
                        htmlFor="allowCollaboration"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                          designerSettings.allowCollaboration ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                            designerSettings.allowCollaboration ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">作品集展示</h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">个性化作品集链接</p>
                    <a className="text-sm text-indigo-600 hover:text-indigo-800" href="#">预览</a>
                  </div>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      design.example.com/
                    </span>
                    <input
                      type="text"
                      className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="您的个性化URL"
                      defaultValue="zhangdesign"
                    />
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 rounded-r-md hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      保存
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">设置后，此链接将可以公开访问您的作品集。</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">外观设置</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">深色模式</p>
                      <p className="text-xs text-gray-500">为您的作品集页面使用深色主题</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        name="darkModeUI"
                        id="darkModeUI"
                        className="sr-only"
                        checked={designerSettings.darkModeUI}
                        onChange={() => setDesignerSettings({
                          ...designerSettings,
                          darkModeUI: !designerSettings.darkModeUI
                        })}
                      />
                      <label
                        htmlFor="darkModeUI"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                          designerSettings.darkModeUI ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                            designerSettings.darkModeUI ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <Link href="/dashboard/designer/portfolio">
                <span className="text-indigo-600 hover:text-indigo-800 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  管理作品集内容
                </span>
              </Link>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                保存设置
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <Link href="/dashboard/designer">
          <span className="text-indigo-600 hover:text-indigo-800">&larr; 返回仪表盘</span>
        </Link>
      </div>
    </>
  );
} 