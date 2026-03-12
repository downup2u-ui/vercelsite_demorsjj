"use client";

import Link from 'next/link';
import { useState } from 'react';

/**
 * LegalServicesSettingsPage 组件提供法律服务的各种设置选项
 * 包括通知偏好、账单设置、协作配置、隐私设置和数据保留策略等
 */
export default function LegalServicesSettingsPage() {
  // 状态变量
  const [notificationSettings, setNotificationSettings] = useState({
    emailUpdates: true,
    caseStatusChanges: true,
    documentShared: true,
    weeklyDigest: false,
    clientCommunication: true
  });
  
  const [billingSettings, setBillingSettings] = useState({
    autoInvoice: true,
    paymentDueDays: 15,
    sendReminders: true,
    defaultRate: 1200,
  });

  const [privacySettings, setPrivacySettings] = useState({
    shareAnonymizedData: true,
    allowAnalytics: true,
    clientDataRetention: "3年",
    caseSensitivityLevel: "中等",
  });

  const [collaborationSettings, setCollaborationSettings] = useState({
    allowExternalSharing: true,
    requireApproval: true,
    trackDocumentChanges: true,
    defaultAccessLevel: "只读",
    showChangeHistory: true,
  });

  const [templateSettings, setTemplateSettings] = useState({
    enableVersioning: true,
    autosaveInterval: 5,
    defaultLanguage: "中文",
    requireApproval: false,
    categorizeTemplates: true,
  });

  // 处理开关类设置变更
  const handleToggleChange = (settingGroup: string, settingName: string) => {
    if (settingGroup === 'notification') {
      setNotificationSettings({
        ...notificationSettings,
        [settingName]: !notificationSettings[settingName as keyof typeof notificationSettings]
      });
    } else if (settingGroup === 'billing') {
      setBillingSettings({
        ...billingSettings,
        [settingName]: !billingSettings[settingName as keyof typeof billingSettings]
      });
    } else if (settingGroup === 'privacy') {
      setPrivacySettings({
        ...privacySettings,
        [settingName]: !privacySettings[settingName as keyof typeof privacySettings]
      });
    } else if (settingGroup === 'collaboration') {
      setCollaborationSettings({
        ...collaborationSettings,
        [settingName]: !collaborationSettings[settingName as keyof typeof collaborationSettings]
      });
    } else if (settingGroup === 'template') {
      setTemplateSettings({
        ...templateSettings,
        [settingName]: !templateSettings[settingName as keyof typeof templateSettings]
      });
    }
  };
  
  // 处理数值变更
  const handleValueChange = (settingGroup: string, settingName: string, value: string | number) => {
    if (settingGroup === 'billing') {
      setBillingSettings({
        ...billingSettings,
        [settingName]: typeof value === 'string' && settingName === 'defaultRate' ? parseInt(value) : value
      });
    } else if (settingGroup === 'privacy') {
      setPrivacySettings({
        ...privacySettings,
        [settingName]: value
      });
    } else if (settingGroup === 'collaboration') {
      setCollaborationSettings({
        ...collaborationSettings,
        [settingName]: value
      });
    } else if (settingGroup === 'template') {
      setTemplateSettings({
        ...templateSettings,
        [settingName]: settingName === 'autosaveInterval' ? parseInt(value.toString()) : value
      });
    }
  };

  // 设置变量保存状态
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  
  // 保存设置处理器
  const handleSaveSettings = () => {
    setSaveStatus('saving');
    // 模拟API调用
    setTimeout(() => {
      setSaveStatus('saved');
      // 3秒后重置状态
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1500);
  };

  // UI组件：设置卡片
  const SettingsCard = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 text-sm">{description}</p>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );

  // UI组件：开关设置项
  const ToggleSetting = ({ 
    label, 
    description,
    isEnabled,
    onChange
  }: { 
    label: string; 
    description: string;
    isEnabled: boolean;
    onChange: () => void;
  }) => (
    <div className="flex items-start justify-between">
      <div className="flex-1 pr-6">
        <h4 className="font-medium text-gray-800">{label}</h4>
        <p className="text-gray-500 text-sm mt-1">{description}</p>
      </div>
      <div className="relative inline-block w-12 align-middle select-none mt-1">
        <input 
          type="checkbox" 
          className="absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer peer checked:right-0"
          checked={isEnabled}
          onChange={onChange}
          style={{
            top: '0',
            right: '6px',
            borderColor: isEnabled ? '#4f46e5' : '#d1d5db',
            transition: 'right 0.2s ease-in-out, border-color 0.2s ease-in-out'
          }}
        />
        <label 
          className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer peer-checked:bg-indigo-600"
          style={{ transition: 'background-color 0.2s ease-in-out' }}
        ></label>
      </div>
    </div>
  );

  return (
    <>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">法律服务设置</h2>
          <p className="text-gray-500 mt-1">配置法律服务的各项设置与偏好</p>
        </div>
        <Link href="/dashboard/legal-services" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          返回法律服务仪表盘
        </Link>
      </div>
      
      {/* 设置导航 */}
      <div className="mb-10 border-b border-gray-200">
        <nav className="flex space-x-8">
          <a href="#notifications" className="border-b-2 border-indigo-500 text-indigo-600 pb-3 px-1 text-sm font-medium">
            通知设置
          </a>
          <a href="#billing" className="border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 pb-3 px-1 text-sm font-medium">
            账单与费率
          </a>
          <a href="#collaboration" className="border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 pb-3 px-1 text-sm font-medium">
            协作与共享
          </a>
          <a href="#privacy" className="border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 pb-3 px-1 text-sm font-medium">
            隐私与数据
          </a>
          <a href="#templates" className="border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 pb-3 px-1 text-sm font-medium">
            文档模板
          </a>
        </nav>
      </div>
      
      {/* 通知设置 */}
      <section id="notifications" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">通知设置</h2>
        <SettingsCard
          title="邮件与应用内通知"
          description="配置何时以及如何接收关于案例更新、文档分享和客户沟通的通知。"
        >
          <ToggleSetting
            label="电子邮件更新"
            description="接收案例和文档更新的电子邮件通知"
            isEnabled={notificationSettings.emailUpdates}
            onChange={() => handleToggleChange('notification', 'emailUpdates')}
          />
          
          <ToggleSetting
            label="案例状态变更"
            description="当案例状态发生变化时收到通知"
            isEnabled={notificationSettings.caseStatusChanges}
            onChange={() => handleToggleChange('notification', 'caseStatusChanges')}
          />
          
          <ToggleSetting
            label="文档共享通知"
            description="当有新文档与您共享或请求审核时收到通知"
            isEnabled={notificationSettings.documentShared}
            onChange={() => handleToggleChange('notification', 'documentShared')}
          />
          
          <ToggleSetting
            label="每周摘要"
            description="接收所有活跃案例的每周状态摘要"
            isEnabled={notificationSettings.weeklyDigest}
            onChange={() => handleToggleChange('notification', 'weeklyDigest')}
          />
          
          <ToggleSetting
            label="客户沟通提醒"
            description="当客户发送消息或请求时收到通知"
            isEnabled={notificationSettings.clientCommunication}
            onChange={() => handleToggleChange('notification', 'clientCommunication')}
          />
        </SettingsCard>
      </section>
      
      {/* 账单设置 */}
      <section id="billing" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">账单与费率设置</h2>
        <SettingsCard
          title="账单与付款设置"
          description="配置账单生成、付款期限和默认费率等设置。"
        >
          <ToggleSetting
            label="自动生成发票"
            description="在计费周期结束时自动生成客户发票"
            isEnabled={billingSettings.autoInvoice}
            onChange={() => handleToggleChange('billing', 'autoInvoice')}
          />
          
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-6">
              <h4 className="font-medium text-gray-800">付款期限（天）</h4>
              <p className="text-gray-500 text-sm mt-1">设置客户发票的默认付款期限天数</p>
            </div>
            <div className="w-24">
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={billingSettings.paymentDueDays}
                onChange={(e) => handleValueChange('billing', 'paymentDueDays', parseInt(e.target.value))}
                min="1"
                max="90"
              />
            </div>
          </div>
          
          <ToggleSetting
            label="发送付款提醒"
            description="在付款到期前自动发送提醒给客户"
            isEnabled={billingSettings.sendReminders}
            onChange={() => handleToggleChange('billing', 'sendReminders')}
          />
          
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-6">
              <h4 className="font-medium text-gray-800">默认小时费率（元）</h4>
              <p className="text-gray-500 text-sm mt-1">设置默认的法律服务小时费率</p>
            </div>
            <div className="w-24">
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={billingSettings.defaultRate}
                onChange={(e) => handleValueChange('billing', 'defaultRate', parseInt(e.target.value))}
                min="0"
                step="100"
              />
            </div>
          </div>
        </SettingsCard>
      </section>

      {/* 协作设置 */}
      <section id="collaboration" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">协作与共享设置</h2>
        <SettingsCard
          title="文档协作与共享权限"
          description="配置文档共享、协作权限和默认访问级别设置。"
        >
          <ToggleSetting
            label="允许外部共享"
            description="允许将文档共享给非平台用户的外部人员"
            isEnabled={collaborationSettings.allowExternalSharing}
            onChange={() => handleToggleChange('collaboration', 'allowExternalSharing')}
          />
          
          <ToggleSetting
            label="共享前需要批准"
            description="外部共享前需要管理员批准"
            isEnabled={collaborationSettings.requireApproval}
            onChange={() => handleToggleChange('collaboration', 'requireApproval')}
          />
          
          <ToggleSetting
            label="追踪文档变更历史"
            description="记录并显示文档的所有更改历史"
            isEnabled={collaborationSettings.trackDocumentChanges}
            onChange={() => handleToggleChange('collaboration', 'trackDocumentChanges')}
          />
          
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-6">
              <h4 className="font-medium text-gray-800">默认访问权限</h4>
              <p className="text-gray-500 text-sm mt-1">设置共享文档时的默认访问权限</p>
            </div>
            <div className="w-36">
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={collaborationSettings.defaultAccessLevel}
                onChange={(e) => handleValueChange('collaboration', 'defaultAccessLevel', e.target.value)}
              >
                <option value="只读">只读</option>
                <option value="添加注释">添加注释</option>
                <option value="编辑">编辑</option>
                <option value="完全控制">完全控制</option>
              </select>
            </div>
          </div>
          
          <ToggleSetting
            label="显示修改历史"
            description="在共享文档中显示修改历史和修改者信息"
            isEnabled={collaborationSettings.showChangeHistory}
            onChange={() => handleToggleChange('collaboration', 'showChangeHistory')}
          />
        </SettingsCard>
      </section>

      {/* 隐私与数据设置 */}
      <section id="privacy" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">隐私与数据设置</h2>
        <SettingsCard
          title="隐私与数据保留策略"
          description="配置隐私偏好、数据保留期限和客户信息安全等级。"
        >
          <ToggleSetting
            label="共享匿名化数据"
            description="允许共享匿名化的案例统计数据以改进服务"
            isEnabled={privacySettings.shareAnonymizedData}
            onChange={() => handleToggleChange('privacy', 'shareAnonymizedData')}
          />

          <ToggleSetting
            label="使用分析工具"
            description="允许使用分析工具跟踪应用内工作流程和效率"
            isEnabled={privacySettings.allowAnalytics}
            onChange={() => handleToggleChange('privacy', 'allowAnalytics')}
          />
          
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-6">
              <h4 className="font-medium text-gray-800">客户数据保留期限</h4>
              <p className="text-gray-500 text-sm mt-1">设置完成案例后保留客户数据的时间</p>
            </div>
            <div className="w-36">
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={privacySettings.clientDataRetention}
                onChange={(e) => handleValueChange('privacy', 'clientDataRetention', e.target.value)}
              >
                <option value="1年">1年</option>
                <option value="3年">3年</option>
                <option value="5年">5年</option>
                <option value="7年">7年</option>
                <option value="永久">永久</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-6">
              <h4 className="font-medium text-gray-800">案例敏感度级别</h4>
              <p className="text-gray-500 text-sm mt-1">设置默认的案例数据敏感度级别</p>
            </div>
            <div className="w-36">
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={privacySettings.caseSensitivityLevel}
                onChange={(e) => handleValueChange('privacy', 'caseSensitivityLevel', e.target.value)}
              >
                <option value="低">低</option>
                <option value="中等">中等</option>
                <option value="高">高</option>
                <option value="最高">最高</option>
              </select>
            </div>
          </div>
        </SettingsCard>
      </section>

      {/* 文档模板设置 */}
      <section id="templates" className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">文档模板设置</h2>
        <SettingsCard
          title="模板管理与版本控制"
          description="配置文档模板的版本控制、自动保存和语言设置。"
        >
          <ToggleSetting
            label="启用版本控制"
            description="保留文档模板的历史版本以便回溯"
            isEnabled={templateSettings.enableVersioning}
            onChange={() => handleToggleChange('template', 'enableVersioning')}
          />
          
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-6">
              <h4 className="font-medium text-gray-800">自动保存间隔（分钟）</h4>
              <p className="text-gray-500 text-sm mt-1">设置编辑文档时的自动保存间隔</p>
            </div>
            <div className="w-24">
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={templateSettings.autosaveInterval}
                onChange={(e) => handleValueChange('template', 'autosaveInterval', parseInt(e.target.value))}
                min="1"
                max="60"
              />
            </div>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-6">
              <h4 className="font-medium text-gray-800">默认模板语言</h4>
              <p className="text-gray-500 text-sm mt-1">设置模板文档的默认语言</p>
            </div>
            <div className="w-36">
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={templateSettings.defaultLanguage}
                onChange={(e) => handleValueChange('template', 'defaultLanguage', e.target.value)}
              >
                <option value="中文">中文</option>
                <option value="英文">英文</option>
                <option value="双语">双语（中英文）</option>
              </select>
            </div>
          </div>
          
          <ToggleSetting
            label="模板更新需审批"
            description="更新共享模板前需要管理员审批"
            isEnabled={templateSettings.requireApproval}
            onChange={() => handleToggleChange('template', 'requireApproval')}
          />
          
          <ToggleSetting
            label="按类别分类模板"
            description="在模板库中按类别分组显示文档模板"
            isEnabled={templateSettings.categorizeTemplates}
            onChange={() => handleToggleChange('template', 'categorizeTemplates')}
          />
        </SettingsCard>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-3">模板管理快捷操作</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/legal-services/document-templates" className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center">
              <div className="text-indigo-500 mr-3 text-xl">📄</div>
              <div>
                <p className="font-medium text-gray-800">浏览模板库</p>
                <p className="text-xs text-gray-500">查看和管理所有文档模板</p>
              </div>
            </Link>
            
            <button className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center" onClick={() => alert('创建新模板功能即将上线')}>
              <div className="text-indigo-500 mr-3 text-xl">➕</div>
              <div>
                <p className="font-medium text-gray-800">创建新模板</p>
                <p className="text-xs text-gray-500">添加新的文档模板到库中</p>
              </div>
            </button>
            
            <button className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center" onClick={() => alert('导入模板功能即将上线')}>
              <div className="text-indigo-500 mr-3 text-xl">📥</div>
              <div>
                <p className="font-medium text-gray-800">导入模板</p>
                <p className="text-xs text-gray-500">从本地或外部导入模板</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 保存按钮 */}
      <div className="sticky bottom-4 flex justify-end bg-gray-50 py-4 px-6 rounded-lg shadow-md">
        <button
          type="button"
          onClick={handleSaveSettings}
          disabled={saveStatus === 'saving'}
          className={`px-6 py-2.5 rounded-lg text-white font-medium 
            ${saveStatus === 'saving' ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
            transition-colors duration-300 flex items-center`}
        >
          {saveStatus === 'saving' && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {saveStatus === 'saving' ? '保存中...' : 
           saveStatus === 'saved' ? '已保存 ✓' : 
           saveStatus === 'error' ? '保存失败，请重试' : '保存全部设置'}
        </button>
      </div>
    </>
  );
} 