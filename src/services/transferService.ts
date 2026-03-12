import { Patent } from './patentService';
import { TransferDetails } from '@/components/patent/TransferDetailsForm';
import { RecipientInfo } from '@/components/patent/RecipientInfoForm';
import { TermsAndDocuments } from '@/components/patent/TermsAndDocumentsForm';

// 专利转让申请状态
export type TransferApplicationStatus = 'draft' | 'pending' | 'reviewing' | 'approved' | 'rejected' | 'completed';

// 转让申请接口
export interface TransferApplication {
  id: string;
  referenceNumber: string;
  createdAt: string;
  updatedAt: string;
  status: TransferApplicationStatus;
  selectedPatents: Patent[];
  transferDetails: TransferDetails;
  recipientInfo: RecipientInfo;
  termsAndDocuments: Omit<TermsAndDocuments, 'documents'> & { documents: string[] };
  userId: string;
  notes?: string;
}

// 提交转让申请请求参数
export interface SubmitTransferRequest {
  selectedPatents: Patent[];
  transferDetails: TransferDetails;
  recipientInfo: RecipientInfo;
  termsAndDocuments: TermsAndDocuments;
}

// 提交转让申请响应
export interface SubmitTransferResponse {
  success: boolean;
  referenceNumber?: string;
  message?: string;
  applicationId?: string;
}

// 模拟API调用延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 提交专利转让申请
 */
export const submitTransferApplication = async (
  request: SubmitTransferRequest
): Promise<SubmitTransferResponse> => {
  try {
    // 模拟API调用
    await delay(1500);
    
    // 模拟成功响应
    const referenceNumber = 'TR-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + 
      Math.floor(1000 + Math.random() * 9000).toString();
    
    const response: SubmitTransferResponse = {
      success: true,
      referenceNumber,
      applicationId: Math.random().toString(36).substring(2, 15)
    };
    
    // 将申请存储到本地存储以便后续检索
    saveApplicationToLocalStorage(referenceNumber, request);
    
    return response;
  } catch (error) {
    console.error('提交转让申请失败', error);
    return {
      success: false,
      message: '服务暂时不可用，请稍后再试'
    };
  }
};

/**
 * 获取转让申请状态
 */
export const getTransferApplicationStatus = async (
  referenceNumber: string
): Promise<TransferApplication | null> => {
  try {
    // 模拟API调用
    await delay(500);
    
    // 从本地存储获取申请
    const application = getApplicationFromLocalStorage(referenceNumber);
    
    if (!application) {
      return null;
    }
    
    return application;
  } catch (error) {
    console.error('获取转让申请状态失败', error);
    return null;
  }
};

/**
 * 获取用户的所有转让申请
 */
export const getUserTransferApplications = async (): Promise<TransferApplication[]> => {
  try {
    // 模拟API调用
    await delay(800);
    
    // 从本地存储获取所有申请
    const applications = getAllApplicationsFromLocalStorage();
    
    return applications;
  } catch (error) {
    console.error('获取用户转让申请列表失败', error);
    return [];
  }
};

/**
 * 取消转让申请
 */
export const cancelTransferApplication = async (
  referenceNumber: string
): Promise<boolean> => {
  try {
    // 模拟API调用
    await delay(500);
    
    const application = getApplicationFromLocalStorage(referenceNumber);
    
    if (!application) {
      return false;
    }
    
    // 只有pending状态的申请可以取消
    if (application.status !== 'pending' && application.status !== 'draft') {
      return false;
    }
    
    // 更新状态为取消
    application.status = 'rejected';
    application.updatedAt = new Date().toISOString();
    application.notes = '申请已由用户取消';
    
    // 保存更新后的申请
    updateApplicationInLocalStorage(application);
    
    return true;
  } catch (error) {
    console.error('取消转让申请失败', error);
    return false;
  }
};

// 辅助函数 - 将申请保存到本地存储
const saveApplicationToLocalStorage = (
  referenceNumber: string, 
  request: SubmitTransferRequest
) => {
  const now = new Date().toISOString();
  
  // 构造申请对象
  const application: TransferApplication = {
    id: Math.random().toString(36).substring(2, 15),
    referenceNumber,
    createdAt: now,
    updatedAt: now,
    status: 'pending',
    selectedPatents: request.selectedPatents,
    transferDetails: request.transferDetails,
    recipientInfo: request.recipientInfo,
    termsAndDocuments: {
      ...request.termsAndDocuments,
      documents: request.termsAndDocuments.documents.map(doc => doc.name) // 只存储文件名
    },
    userId: 'current-user-id' // 实际应用中应从认证系统获取
  };
  
  // 获取现有申请
  let applications: TransferApplication[] = [];
  const existingData = localStorage.getItem('transfer-applications');
  
  if (existingData) {
    try {
      applications = JSON.parse(existingData);
    } catch (e) {
      console.error('解析本地存储的申请数据失败', e);
    }
  }
  
  // 添加新申请
  applications.push(application);
  
  // 保存回本地存储
  localStorage.setItem('transfer-applications', JSON.stringify(applications));
};

// 辅助函数 - 从本地存储获取申请
const getApplicationFromLocalStorage = (referenceNumber: string): TransferApplication | null => {
  const existingData = localStorage.getItem('transfer-applications');
  
  if (!existingData) {
    return null;
  }
  
  try {
    const applications: TransferApplication[] = JSON.parse(existingData);
    return applications.find(app => app.referenceNumber === referenceNumber) || null;
  } catch (e) {
    console.error('解析本地存储的申请数据失败', e);
    return null;
  }
};

// 辅助函数 - 从本地存储获取所有申请
const getAllApplicationsFromLocalStorage = (): TransferApplication[] => {
  const existingData = localStorage.getItem('transfer-applications');
  
  if (!existingData) {
    return [];
  }
  
  try {
    return JSON.parse(existingData);
  } catch (e) {
    console.error('解析本地存储的申请数据失败', e);
    return [];
  }
};

// 辅助函数 - 更新本地存储中的申请
const updateApplicationInLocalStorage = (updatedApplication: TransferApplication): void => {
  const existingData = localStorage.getItem('transfer-applications');
  
  if (!existingData) {
    localStorage.setItem('transfer-applications', JSON.stringify([updatedApplication]));
    return;
  }
  
  try {
    const applications: TransferApplication[] = JSON.parse(existingData);
    const index = applications.findIndex(app => app.referenceNumber === updatedApplication.referenceNumber);
    
    if (index >= 0) {
      applications[index] = updatedApplication;
      localStorage.setItem('transfer-applications', JSON.stringify(applications));
    }
  } catch (e) {
    console.error('更新本地存储的申请数据失败', e);
  }
}; 