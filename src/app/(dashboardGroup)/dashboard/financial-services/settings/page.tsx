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

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: '李会计',
    email: 'li.finance@example.com',
    phone: '13912345678',
    title: '高级财务顾问',
    bio: '5年财务咨询经验，专注于创意行业财税服务，擅长企业税务筹划与财务分析。',
    avatar: '/images/avatars/李程序.svg', // 假设这个路径是有效的
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    systemNotifications: true,
    reportCompletionAlert: true,
    clientRequestAlert: true,
    taxDeadlineReminder: true,
  });
  
  const handleSaveProfile = () => {
    setIsLoading(true);
    // 模拟 API 请求延迟
    setTimeout(() => {
      setIsLoading(false);
      // 这里应该显示一个成功消息
    }, 1000);
  };
  
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">账户设置</h1>
        <p className="mt-1 text-gray-500">管理您的账户资料、安全选项和使用偏好</p>
      </div>
      
      {/* 标签页切换控件 */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <Tab id="profile" label="个人资料" active={activeTab === 'profile'} onClick={setActiveTab} />
          <Tab id="security" label="账户安全" active={activeTab === 'security'} onClick={setActiveTab} />
          <Tab id="notifications" label="通知偏好" active={activeTab === 'notifications'} onClick={setActiveTab} />
          <Tab id="appearance" label="界面设置" active={activeTab === 'appearance'} onClick={setActiveTab} />
          <Tab id="billing" label="服务与计费" active={activeTab === 'billing'} onClick={setActiveTab} />
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
        
        {/* 账户安全表单 */}
        {activeTab === 'security' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">账户安全</h2>
            
            {/* 修改密码 */}
            <div className="mb-8">
              <h3 className="text-base font-medium text-gray-800 mb-4">修改密码</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">当前密码</label>
                  <input
                    type="password"
                    id="currentPassword"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="输入当前密码"
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">新密码</label>
                  <input
                    type="password"
                    id="newPassword"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="设置新密码"
                  />
                  <p className="mt-1 text-xs text-gray-500">密码长度至少8位，并包含字母、数字和特殊字符</p>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">确认新密码</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="再次输入新密码"
                  />
                </div>
                
                <div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                    更新密码
                  </button>
                </div>
              </div>
            </div>
            
            {/* 双因素认证 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-medium text-gray-800">双因素认证</h3>
                <div className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">未启用</div>
              </div>
              
              <p className="text-gray-600 mb-4">
                双因素认证为您的账户添加额外的安全层，在登录时除了密码外还需要输入一个验证码。
              </p>
              
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                启用双因素认证
              </button>
            </div>
            
            {/* 登录历史 */}
            <div>
              <h3 className="text-base font-medium text-gray-800 mb-4">最近登录记录</h3>
              
              <div className="bg-gray-50 rounded-lg border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          登录时间
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          IP地址
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          设备
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          状态
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2024-07-25 09:45:23
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          192.168.1.105
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Chrome / macOS
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            成功
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2024-07-24 16:12:07
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          118.24.36.187
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Safari / iOS
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            成功
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2024-07-23 08:30:15
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          221.45.167.89
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Firefox / Windows
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                            失败
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 通知偏好设置 */}
        {activeTab === 'notifications' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">通知偏好</h2>
            
            <div className="space-y-6">
              {/* 通知方式 */}
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">通知方式</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-700">电子邮件通知</p>
                      <p className="text-xs text-gray-500">通过邮件接收重要的系统和业务通知</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        id="emailNotifications"
                        className="sr-only"
                        checked={notificationSettings.emailNotifications}
                        onChange={() => setNotificationSettings({
                          ...notificationSettings,
                          emailNotifications: !notificationSettings.emailNotifications
                        })}
                      />
                      <label
                        htmlFor="emailNotifications"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                          notificationSettings.emailNotifications ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                            notificationSettings.emailNotifications ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-700">短信通知</p>
                      <p className="text-xs text-gray-500">通过短信接收紧急通知和验证码</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        name="smsNotifications"
                        id="smsNotifications"
                        className="sr-only"
                        checked={notificationSettings.smsNotifications}
                        onChange={() => setNotificationSettings({
                          ...notificationSettings,
                          smsNotifications: !notificationSettings.smsNotifications
                        })}
                      />
                      <label
                        htmlFor="smsNotifications"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                          notificationSettings.smsNotifications ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                            notificationSettings.smsNotifications ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-700">系统内通知</p>
                      <p className="text-xs text-gray-500">在系统内接收通知和提醒</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        name="systemNotifications"
                        id="systemNotifications"
                        className="sr-only"
                        checked={notificationSettings.systemNotifications}
                        onChange={() => setNotificationSettings({
                          ...notificationSettings,
                          systemNotifications: !notificationSettings.systemNotifications
                        })}
                      />
                      <label
                        htmlFor="systemNotifications"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                          notificationSettings.systemNotifications ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                            notificationSettings.systemNotifications ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 通知类型 */}
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">通知类型</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-700">报表生成完成提醒</p>
                      <p className="text-xs text-gray-500">当财务报表生成完成时通知我</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        name="reportCompletionAlert"
                        id="reportCompletionAlert"
                        className="sr-only"
                        checked={notificationSettings.reportCompletionAlert}
                        onChange={() => setNotificationSettings({
                          ...notificationSettings,
                          reportCompletionAlert: !notificationSettings.reportCompletionAlert
                        })}
                      />
                      <label
                        htmlFor="reportCompletionAlert"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                          notificationSettings.reportCompletionAlert ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                            notificationSettings.reportCompletionAlert ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-700">客户请求提醒</p>
                      <p className="text-xs text-gray-500">当收到新的客户请求或咨询时通知我</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        name="clientRequestAlert"
                        id="clientRequestAlert"
                        className="sr-only"
                        checked={notificationSettings.clientRequestAlert}
                        onChange={() => setNotificationSettings({
                          ...notificationSettings,
                          clientRequestAlert: !notificationSettings.clientRequestAlert
                        })}
                      />
                      <label
                        htmlFor="clientRequestAlert"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                          notificationSettings.clientRequestAlert ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                            notificationSettings.clientRequestAlert ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-gray-700">税务截止日期提醒</p>
                      <p className="text-xs text-gray-500">在税务申报截止日期前通知我</p>
                    </div>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        name="taxDeadlineReminder"
                        id="taxDeadlineReminder"
                        className="sr-only"
                        checked={notificationSettings.taxDeadlineReminder}
                        onChange={() => setNotificationSettings({
                          ...notificationSettings,
                          taxDeadlineReminder: !notificationSettings.taxDeadlineReminder
                        })}
                      />
                      <label
                        htmlFor="taxDeadlineReminder"
                        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                          notificationSettings.taxDeadlineReminder ? 'bg-indigo-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                            notificationSettings.taxDeadlineReminder ? 'translate-x-4' : 'translate-x-0'
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
                保存偏好设置
              </button>
            </div>
          </div>
        )}
        
        {/* 界面设置 */}
        {activeTab === 'appearance' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">界面设置</h2>
            <p className="text-gray-500 mb-8">自定义应用界面外观和布局，提升您的使用体验</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 主题选择 */}
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">主题模式</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border border-indigo-600 rounded-lg p-2 text-center cursor-pointer relative">
                    <div className="h-20 bg-white rounded mb-2"></div>
                    <span className="text-sm text-gray-700">浅色模式</span>
                    <div className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full p-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-2 text-center cursor-pointer">
                    <div className="h-20 bg-gray-800 rounded mb-2"></div>
                    <span className="text-sm text-gray-700">深色模式</span>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-2 text-center cursor-pointer">
                    <div className="h-20 bg-gradient-to-b from-white to-gray-800 rounded mb-2"></div>
                    <span className="text-sm text-gray-700">跟随系统</span>
                  </div>
                </div>
              </div>
              
              {/* 语言设置 */}
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">语言设置</h3>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="zh-CN">简体中文</option>
                  <option value="en-US">English (US)</option>
                  <option value="zh-HK">繁體中文</option>
                </select>
              </div>
              
              {/* 仪表盘布局 */}
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">仪表盘布局</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-indigo-600 rounded-lg p-2 text-center cursor-pointer relative">
                    <div className="h-20 bg-gray-100 rounded mb-2 flex">
                      <div className="w-1/4 bg-gray-200 h-full"></div>
                      <div className="w-3/4 p-1">
                        <div className="h-1/3 bg-gray-200 mb-1 rounded"></div>
                        <div className="h-1/3 bg-gray-200 mb-1 rounded"></div>
                        <div className="h-1/3 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-700">标准布局</span>
                    <div className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full p-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-2 text-center cursor-pointer">
                    <div className="h-20 bg-gray-100 rounded mb-2 flex flex-col">
                      <div className="h-1/4 bg-gray-200 mb-1"></div>
                      <div className="flex flex-1">
                        <div className="w-1/4 bg-gray-200 h-full mr-1"></div>
                        <div className="flex-1 bg-gray-200"></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-700">紧凑布局</span>
                  </div>
                </div>
              </div>
              
              {/* 字体大小 */}
              <div>
                <h3 className="text-base font-medium text-gray-800 mb-4">字体大小</h3>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">小</span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    defaultValue="3"
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-base text-gray-500 ml-2">大</span>
                </div>
              </div>
            </div>
            
            {/* 保存按钮 */}
            <div className="mt-8 flex justify-end">
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors mr-3">
                恢复默认
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                应用设置
              </button>
            </div>
          </div>
        )}
        
        {/* 服务与计费 */}
        {activeTab === 'billing' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">服务与计费</h2>
            
            {/* 当前订阅 */}
            <div className="mb-8">
              <h3 className="text-base font-medium text-gray-800 mb-4">当前服务套餐</h3>
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-indigo-900">专业版会员</h4>
                    <p className="text-sm text-indigo-700 mt-1">¥299/月，自动续费</p>
                    <ul className="mt-3 space-y-1 text-sm text-gray-600">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        不限客户数量
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        高级分析报表
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        税务筹划工具
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        优先客户支持
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">有效期至 2024-12-31</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="px-3 py-1.5 bg-white text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors text-sm">
                    升级套餐
                  </button>
                </div>
              </div>
            </div>
            
            {/* 支付信息 */}
            <div className="mb-8">
              <h3 className="text-base font-medium text-gray-800 mb-4">支付信息</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded mr-3">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Visa **** **** **** 4567</p>
                    <p className="text-xs text-gray-500">有效期至 06/25</p>
                  </div>
                  <div className="ml-auto">
                    <button className="text-sm text-indigo-600 hover:text-indigo-800">编辑</button>
                  </div>
                </div>
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
                        ¥299.00
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
                        ¥299.00
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
                        ¥299.00
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
      </div>
    </>
  );
} 