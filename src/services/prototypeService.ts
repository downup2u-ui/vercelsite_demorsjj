import { PrototypeRequest } from '@/app/prototypes/components/PrototypeForm';

// 原型申请状态类型
export type PrototypeStatus = 'pending' | 'approved' | 'rejected' | 'in_progress' | 'completed';

// 原型申请回复数据结构
export interface PrototypeRequestResponse extends PrototypeRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: PrototypeStatus;
  comments?: string;
}

// 模拟延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟数据
let mockPrototypeRequests: PrototypeRequestResponse[] = [];

export class PrototypeService {
  // 提交原型申请
  static async submitPrototypeRequest(request: PrototypeRequest): Promise<PrototypeRequestResponse> {
    try {
      // 模拟API调用
      await delay(1000);
      
      // 在实际应用中，这里会是一个POST请求
      // const response = await fetch('/api/prototypes', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(request)
      // });
      // if (!response.ok) throw new Error('Failed to submit prototype request');
      // return await response.json();
      
      // 创建一个新的申请记录
      const newRequest: PrototypeRequestResponse = {
        ...request,
        id: `proto-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'pending',
      };
      
      // 添加到模拟数据中
      mockPrototypeRequests.push(newRequest);
      
      return newRequest;
    } catch (error) {
      console.error('Error submitting prototype request:', error);
      throw error;
    }
  }

  // 获取用户的原型申请列表
  static async getUserPrototypeRequests(): Promise<PrototypeRequestResponse[]> {
    try {
      // 模拟API调用
      await delay(500);
      
      // 在实际应用中，这里会是一个GET请求
      // const response = await fetch('/api/prototypes/user');
      // if (!response.ok) throw new Error('Failed to fetch prototype requests');
      // return await response.json();
      
      return [...mockPrototypeRequests].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      console.error('Error fetching user prototype requests:', error);
      throw error;
    }
  }

  // 获取单个原型申请详情
  static async getPrototypeRequestById(id: string): Promise<PrototypeRequestResponse | null> {
    try {
      // 模拟API调用
      await delay(300);
      
      // 在实际应用中，这里会是一个GET请求
      // const response = await fetch(`/api/prototypes/${id}`);
      // if (!response.ok) throw new Error('Failed to fetch prototype request');
      // return await response.json();
      
      const request = mockPrototypeRequests.find(r => r.id === id);
      return request || null;
    } catch (error) {
      console.error(`Error fetching prototype request with ID ${id}:`, error);
      throw error;
    }
  }

  // 取消原型申请
  static async cancelPrototypeRequest(id: string): Promise<boolean> {
    try {
      // 模拟API调用
      await delay(700);
      
      // 在实际应用中，这里会是一个DELETE请求或状态更新请求
      // const response = await fetch(`/api/prototypes/${id}/cancel`, { method: 'POST' });
      // return response.ok;
      
      const index = mockPrototypeRequests.findIndex(r => r.id === id);
      if (index === -1 || mockPrototypeRequests[index].status !== 'pending') {
        throw new Error('Cannot cancel this prototype request');
      }
      
      // 更新状态为已取消（在实际应用中可能会直接删除或标记为取消状态）
      mockPrototypeRequests[index] = {
        ...mockPrototypeRequests[index],
        status: 'rejected',
        updatedAt: new Date().toISOString(),
        comments: '用户取消申请'
      };
      
      return true;
    } catch (error) {
      console.error(`Error canceling prototype request with ID ${id}:`, error);
      throw error;
    }
  }
} 