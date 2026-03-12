"use client";

import React, { useState, useEffect } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import Link from 'next/link';
import ViolationReportForm, { ViolationReportFormData } from '@/components/rights-protection/ViolationReportForm';
import CaseTrackingForm from '@/components/rights-protection/CaseTrackingForm';
import FAQSection from '@/components/rights-protection/FAQSection';
import { submitViolationReport, trackCaseByReferenceNumber, getFAQs, simulateCaseUpdate } from '@/services/rightsProtectionService';
import { toast } from 'react-hot-toast';

// 页面组件
export default function RightsProtectionPage() {
  // 跟踪当前活跃的标签页
  const [activeTab, setActiveTab] = useState('report');
  const [faqs, setFaqs] = useState([]);
  const [submissionSuccess, setSubmissionSuccess] = useState<{referenceNumber: string} | null>(null);
  const [loading, setLoading] = useState(false);
  
  // 面包屑导航
  const breadcrumbItems = [
    { label: '首页', href: '/' },
    { label: '知识产权', href: '#' },
    { label: '权益保护', href: '/rights-protection' },
  ];
  
  // 处理标签页切换
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSubmissionSuccess(null); // 清除成功提交信息
  };
  
  // 加载FAQ数据
  useEffect(() => {
    const loadFaqs = async () => {
      try {
        const faqData = await getFAQs();
        setFaqs(faqData);
      } catch (error) {
        console.error('加载FAQ数据失败:', error);
      }
    };
    
    loadFaqs();
  }, []);
  
  // 处理侵权举报表单提交
  const handleReportSubmit = async (data: ViolationReportFormData) => {
    setLoading(true);
    try {
      const result = await submitViolationReport(data);
      setSubmissionSuccess(result);
      toast.success('举报提交成功！');
    } catch (error) {
      console.error('提交举报失败:', error);
      toast.error('提交失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };
  
  // 处理案件跟踪查询
  const handleCaseTrack = async (referenceNumber: string) => {
    try {
      const caseData = await trackCaseByReferenceNumber(referenceNumber);
      return caseData;
    } catch (error) {
      console.error('查询案件状态失败:', error);
      return null;
    }
  };
  
  // 模拟更新案件状态（仅用于演示）
  const handleSimulateUpdate = async () => {
    if (submissionSuccess) {
      const updated = await simulateCaseUpdate(submissionSuccess.referenceNumber);
      if (updated) {
        toast.success('案件状态已更新！查看案件跟踪标签页以了解详情。');
        // 自动切换到案件跟踪标签页
        setActiveTab('track');
      }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面头部 */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-gray-900">知识产权保护</h1>
          <p className="mt-2 text-gray-600">
            通过我们的知识产权保护服务，您可以举报侵权行为并获得专业的权益保护支持。
          </p>
        </div>
      </div>
      
      {/* 页面导航标签 */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => handleTabChange('report')}
            className={`${
              activeTab === 'report'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            侵权举报
          </button>
          <button
            onClick={() => handleTabChange('track')}
            className={`${
              activeTab === 'track'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            案件跟踪
          </button>
          <button
            onClick={() => handleTabChange('faq')}
            className={`${
              activeTab === 'faq'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            常见问题
          </button>
        </nav>
      </div>
      
      {/* 主要内容区域 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* 侵权举报表单 */}
        {activeTab === 'report' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">侵权举报</h2>
            <p className="mb-6 text-gray-600">
              如果您发现您的知识产权（包括专利、商标或版权）被侵犯，请通过以下表单提交详细信息，我们的团队将对您的情况进行评估并提供适当的支持。
            </p>
            
            {/* 提示信息 */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    请确保提交真实准确的信息。提供充分的证据有助于我们更好地处理您的举报。
                  </p>
                </div>
              </div>
            </div>
            
            {submissionSuccess ? (
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">举报提交成功</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>感谢您的举报。您的案件编号是: <strong>{submissionSuccess.referenceNumber}</strong></p>
                      <p className="mt-1">请保存此编号以便后续查询案件进展。</p>
                      <div className="mt-4">
                        <button
                          onClick={() => handleTabChange('track')}
                          className="mr-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          跟踪案件状态
                        </button>
                        <button
                          onClick={handleSimulateUpdate}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          模拟更新案件状态
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <ViolationReportForm onSubmit={handleReportSubmit} />
            )}
          </div>
        )}
        
        {/* 案件跟踪 */}
        {activeTab === 'track' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">案件跟踪</h2>
            <p className="mb-6 text-gray-600">
              在此处查询您已提交的知识产权侵权举报的处理状态和进度。请输入您的案件编号进行查询。
            </p>
            <CaseTrackingForm onTrack={handleCaseTrack} />
          </div>
        )}
        
        {/* 常见问题 */}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">常见问题</h2>
            <p className="mb-6 text-gray-600">
              了解有关知识产权保护的常见问题和解答，帮助您更好地保护自己的权益。
            </p>
            <FAQSection faqs={faqs} />
          </div>
        )}
      </div>
      
      {/* 联系信息 */}
      <div className="mt-8 bg-gray-50 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">需要帮助？</h3>
        <p className="text-gray-600 mb-4">
          如果您有关于知识产权保护的紧急问题，可以通过以下方式联系我们的专业团队：
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center">
            <svg className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700">ip-protection@example.com</span>
          </div>
          <div className="flex items-center">
            <svg className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-gray-700">+86 400-123-4567</span>
          </div>
        </div>
      </div>
    </div>
  );
} 