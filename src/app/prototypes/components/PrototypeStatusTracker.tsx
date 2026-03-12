"use client";

import { useState, useEffect } from 'react';
import { PrototypeRequestResponse, PrototypeStatus } from '@/services/prototypeService';

// 状态阶段定义，按照处理流程顺序
const STAGES: PrototypeStatus[] = ['pending', 'approved', 'in_progress', 'completed'];

// 状态中文名称映射
const statusNameMap: Record<PrototypeStatus, string> = {
  pending: '审核中',
  approved: '已批准',
  rejected: '已拒绝',
  in_progress: '制作中',
  completed: '已完成'
};

// 状态描述映射
const statusDescriptionMap: Record<PrototypeStatus, string> = {
  pending: '您的申请正在等待审核，我们将尽快处理。',
  approved: '申请已被批准，即将开始制作。',
  rejected: '很抱歉，您的申请未通过审核。',
  in_progress: '原型正在制作中，我们将保持更新进度。',
  completed: '原型已完成制作，请前往领取或等待送达。'
};

interface PrototypeStatusTrackerProps {
  prototype: PrototypeRequestResponse;
}

export default function PrototypeStatusTracker({ prototype }: PrototypeStatusTrackerProps) {
  // 计算当前进度百分比
  const getProgressPercentage = () => {
    if (prototype.status === 'rejected') {
      return 0;
    }
    
    const currentStageIndex = STAGES.indexOf(prototype.status);
    if (currentStageIndex === -1) return 0;
    
    return (currentStageIndex / (STAGES.length - 1)) * 100;
  };

  // 判断状态是否已完成
  const isStageComplete = (stage: PrototypeStatus) => {
    if (prototype.status === 'rejected') {
      return false;
    }
    
    const currentStageIndex = STAGES.indexOf(prototype.status);
    const stageIndex = STAGES.indexOf(stage);
    
    return stageIndex <= currentStageIndex;
  };

  // 判断状态是否为当前状态
  const isCurrentStage = (stage: PrototypeStatus) => {
    return prototype.status === stage;
  };

  // 获取状态图标
  const getStageIcon = (stage: PrototypeStatus) => {
    if (stage === 'rejected') {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    }
    
    if (isStageComplete(stage)) {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  // 如果是拒绝状态，显示拒绝信息
  if (prototype.status === 'rejected') {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">申请被拒绝</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{statusDescriptionMap.rejected}</p>
              {prototype.comments && (
                <p className="mt-2">
                  <strong>原因：</strong> {prototype.comments}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">申请进度</h3>
      
      {/* 进度条 */}
      <div className="relative pt-1 mb-6">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              当前状态: {statusNameMap[prototype.status]}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {getProgressPercentage()}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
          <div 
            style={{ width: `${getProgressPercentage()}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
          ></div>
        </div>
      </div>
      
      {/* 状态步骤 */}
      <div className="space-y-4">
        {STAGES.map((stage) => (
          <div 
            key={stage}
            className={`flex items-start ${
              isCurrentStage(stage) 
                ? 'text-blue-600' 
                : isStageComplete(stage)
                ? 'text-green-600'
                : 'text-gray-400'
            }`}
          >
            <div className={`flex-shrink-0 h-6 w-6 mt-0.5 ${
              isCurrentStage(stage) 
                ? 'text-blue-600' 
                : isStageComplete(stage)
                ? 'text-green-600'
                : 'text-gray-400'
            }`}>
              {getStageIcon(stage)}
            </div>
            <div className="ml-3">
              <h4 className={`text-sm font-medium ${
                isCurrentStage(stage) 
                  ? 'text-blue-900' 
                  : isStageComplete(stage)
                  ? 'text-green-900'
                  : 'text-gray-500'
              }`}>
                {statusNameMap[stage]}
              </h4>
              {isCurrentStage(stage) && (
                <p className="mt-1 text-sm text-gray-600">{statusDescriptionMap[stage]}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* 更新时间 */}
      <div className="mt-6 text-sm text-gray-500">
        最后更新: {new Date(prototype.updatedAt).toLocaleString('zh-CN')}
      </div>
    </div>
  );
} 