/**
 * 专利服务模块
 * 处理与专利相关的数据请求和操作
 */

// 专利状态类型
export type PatentStatus = 'pending' | 'examination' | 'approved' | 'rejected' | 'withdrawn';

// 专利类型
export type PatentType = 'invention' | 'utility_model' | 'design' | 'plant';

// 专利数据模型
export interface Patent {
  id: string;
  patentNumber: string;
  title: string;
  filingDate: string;
  approvalDate?: string;
  status: PatentStatus;
  description: string;
  type: PatentType;
  inventors: string[];
  owner: string;
  agents?: string[];
  expirationDate?: string;
  priority?: string;
  abstract?: string;
  images?: string[];
  appNumber: string;
  patentType: string;
  coverImage?: string;
}

// 专利筛选参数接口
export interface PatentFilterParams {
  search?: string;
  status?: PatentStatus | string;
  type?: PatentType | string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  useMockFallback?: boolean; // 内部标志，用于在API失败时回退到模拟数据
}

// 专利响应接口
export interface PatentResponse {
  patents: Patent[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 模拟延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 模拟专利数据
const mockPatents: Patent[] = [
  {
    id: 'patent-001',
    patentNumber: 'CN101234567A',
    title: '一种智能机器人控制系统及其方法',
    filingDate: '2020-05-15',
    approvalDate: '2022-08-20',
    status: 'approved',
    description: '本发明提供了一种智能机器人控制系统及其方法，该系统包括传感器模块、处理器模块和执行器模块。该系统能够根据环境变化自动调整机器人行为，提高了机器人的适应性和智能化水平。',
    type: 'invention',
    inventors: ['张三', '李四'],
    owner: '海创科技有限公司',
    agents: ['王律师'],
    expirationDate: '2040-05-15',
    abstract: '本发明提供一种智能机器人控制系统及其方法，解决了传统机器人在复杂环境中适应性不足的问题。',
    images: ['/assets/patents/patent001-1.jpg', '/assets/patents/patent001-2.jpg'],
    appNumber: 'CN101234567A',
    patentType: '发明专利',
    coverImage: '/images/patents/pat001.jpg'
  },
  {
    id: 'patent-002',
    patentNumber: 'CN202345678U',
    title: '一种可折叠式电动自行车',
    filingDate: '2021-02-10',
    approvalDate: '2021-11-05',
    status: 'approved',
    description: '本实用新型提供了一种可折叠式电动自行车，该自行车采用创新的折叠机构，可以快速折叠成小体积，方便携带和存储。同时配备高效电池系统，提供更长续航里程。',
    type: 'utility_model',
    inventors: ['李四', '王五'],
    owner: '海创科技有限公司',
    expirationDate: '2031-02-10',
    abstract: '本实用新型涉及一种可折叠式电动自行车，具有折叠简便、体积小、续航时间长等特点。',
    appNumber: 'CN202345678U',
    patentType: '实用新型',
    coverImage: '/images/patents/pat002.jpg'
  },
  {
    id: 'patent-003',
    patentNumber: 'CN303456789S',
    title: '智能手表外观设计',
    filingDate: '2022-01-20',
    approvalDate: '2022-09-15',
    status: 'approved',
    description: '本外观设计提供了一种智能手表的外观设计，采用圆形表盘配合方形表带的设计语言，兼具科技感和时尚感。表盘四周采用金属材质，中间为玻璃触摸屏，表带采用环保硅胶材质。',
    type: 'design',
    inventors: ['赵六'],
    owner: '海创科技有限公司',
    agents: ['刘律师'],
    expirationDate: '2032-01-20',
    images: ['/assets/patents/patent003-1.jpg', '/assets/patents/patent003-2.jpg', '/assets/patents/patent003-3.jpg'],
    appNumber: 'CN303456789S',
    patentType: '外观设计',
    coverImage: '/images/patents/pat003.jpg'
  },
  {
    id: 'patent-004',
    patentNumber: '申请中',
    title: '基于人工智能的农作物病虫害识别系统',
    filingDate: '2023-03-10',
    status: 'pending',
    description: '本发明提供了一种基于人工智能的农作物病虫害识别系统，该系统使用深度学习算法对农作物图像进行分析，能够快速识别常见的病虫害类型，并提供相应的治理建议。',
    type: 'invention',
    inventors: ['张三', '王五', '赵六'],
    owner: '海创科技有限公司',
    abstract: '本发明涉及农业人工智能领域，提供一种能够快速准确识别农作物病虫害的系统。',
    appNumber: '申请中',
    patentType: '发明专利',
    coverImage: '/images/patents/pat004.jpg'
  },
  {
    id: 'patent-005',
    patentNumber: '申请中',
    title: '多功能便携式太阳能充电器',
    filingDate: '2023-05-05',
    status: 'examination',
    description: '本实用新型提供了一种多功能便携式太阳能充电器，集成了太阳能电池板、储能电池和多种充电接口，可以在户外环境中为多种电子设备提供充电服务。',
    type: 'utility_model',
    inventors: ['李四'],
    owner: '海创科技有限公司',
    agents: ['王律师'],
    abstract: '本实用新型涉及一种便携式充电设备，解决了户外活动中电子设备充电难的问题。',
    appNumber: '申请中',
    patentType: '实用新型',
    coverImage: '/images/patents/pat005.jpg'
  },
  {
    id: 'patent-006',
    patentNumber: 'CN404567890S',
    title: '新型办公椅设计',
    filingDate: '2022-06-18',
    status: 'rejected',
    description: '本外观设计提供了一种符合人体工程学的办公椅设计，采用流线型靠背和可调节扶手，提高了长时间办公的舒适度。',
    type: 'design',
    inventors: ['王五'],
    owner: '海创科技有限公司',
    agents: ['刘律师'],
    appNumber: 'CN404567890S',
    patentType: '外观设计',
    coverImage: '/images/patents/pat006.jpg'
  }
];

// 定义API基础URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

// 默认情况下是否使用模拟数据
const DEFAULT_USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

// 专利服务类
export class PatentService {
  // 获取专利列表
  static async getPatents(filters: PatentFilterParams = {}): Promise<PatentResponse> {
    // 使用环境变量确定是使用模拟数据还是真实API
    const useMockData = filters.useMockFallback || DEFAULT_USE_MOCK_DATA;
    
    if (useMockData) {
      // 使用模拟数据
      await delay(1000);
      
      // 筛选逻辑实现
      let filteredPatents = [...mockPatents];
      
      // 按搜索关键字筛选
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredPatents = filteredPatents.filter(
          patent => 
            patent.title.toLowerCase().includes(searchTerm) || 
            patent.patentNumber.toLowerCase().includes(searchTerm) ||
            patent.description.toLowerCase().includes(searchTerm)
        );
      }
      
      // 按状态筛选
      if (filters.status && filters.status !== 'all') {
        filteredPatents = filteredPatents.filter(patent => patent.status === filters.status);
      }
      
      // 按类型筛选
      if (filters.type && filters.type !== 'all') {
        filteredPatents = filteredPatents.filter(patent => patent.type === filters.type);
      }
      
      // 按日期范围筛选
      if (filters.startDate) {
        const startDate = new Date(filters.startDate).getTime();
        filteredPatents = filteredPatents.filter(
          patent => new Date(patent.filingDate).getTime() >= startDate
        );
      }
      
      if (filters.endDate) {
        const endDate = new Date(filters.endDate).getTime();
        filteredPatents = filteredPatents.filter(
          patent => new Date(patent.filingDate).getTime() <= endDate
        );
      }
      
      // 计算分页
      const page = filters.page || 1;
      const limit = filters.limit || 10;
      const total = filteredPatents.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = Math.min(startIndex + limit, total);
      
      const paginatedPatents = filteredPatents.slice(startIndex, endIndex);
      
      return {
        patents: paginatedPatents,
        total,
        page,
        limit,
        totalPages
      };
    } else {
      try {
        // 构建查询参数
        const queryParams = new URLSearchParams();
        if (filters.search) queryParams.append('search', filters.search);
        if (filters.status && filters.status !== 'all') queryParams.append('status', filters.status);
        if (filters.type && filters.type !== 'all') queryParams.append('type', filters.type);
        if (filters.startDate) queryParams.append('startDate', filters.startDate);
        if (filters.endDate) queryParams.append('endDate', filters.endDate);
        if (filters.page) queryParams.append('page', filters.page.toString());
        if (filters.limit) queryParams.append('limit', (filters.limit || 10).toString());
        
        // 发起API请求
        const response = await fetch(`${API_BASE_URL}/patents?${queryParams.toString()}`);
        
        // 处理错误
        if (!response.ok) {
          console.warn(`API请求失败 (${response.status}): ${response.statusText}`);
          // 回退到模拟数据而不是抛出错误
          return this.getPatents({ ...filters, useMockFallback: true });
        }
        
        // 解析响应数据
        const data = await response.json();
        
        // 确保返回的数据符合预期格式
        return {
          patents: data.patents || [],
          total: data.total || 0,
          page: data.page || filters.page || 1,
          limit: data.limit || filters.limit || 10,
          totalPages: data.totalPages || 1
        };
      } catch (error) {
        console.error('获取专利列表失败:', error);
        
        // 如果API请求失败，回退到模拟数据
        console.warn('API请求失败，使用模拟数据');
        return this.getPatents({ ...filters, useMockFallback: true });
      }
    }
  }
  
  // 获取单个专利详情
  static async getPatentById(id: string): Promise<Patent | null> {
    // 使用环境变量确定是使用模拟数据还是真实API
    const useMockData = DEFAULT_USE_MOCK_DATA;
    
    if (useMockData) {
      // 使用模拟数据
      await delay(500);
      const patent = mockPatents.find(p => p.id === id);
      return patent || null;
    } else {
      try {
        // 发起API请求
        const response = await fetch(`${API_BASE_URL}/patents/${id}`);
        
        // 处理404错误
        if (response.status === 404) {
          return null;
        }
        
        // 处理其他错误
        if (!response.ok) {
          throw new Error(`专利详情获取失败: ${response.status} ${response.statusText}`);
        }
        
        // 解析响应数据
        return await response.json();
      } catch (error) {
        console.error('获取专利详情失败:', error);
        
        // 如果API请求失败，回退到模拟数据
        console.warn('API请求失败，使用模拟数据');
        const patent = mockPatents.find(p => p.id === id);
        return patent || null;
      }
    }
  }
  
  // 获取专利状态名称（中文）
  static getStatusName(status: PatentStatus): string {
    const statusMap: Record<PatentStatus, string> = {
      pending: '等待审查',
      examination: '审查中',
      approved: '已授权',
      rejected: '已驳回',
      withdrawn: '已撤回'
    };
    
    return statusMap[status] || status;
  }
  
  // 获取专利类型名称（中文）
  static getTypeName(type: PatentType): string {
    const typeMap: Record<PatentType, string> = {
      invention: '发明专利',
      utility_model: '实用新型',
      design: '外观设计',
      plant: '植物专利'
    };
    
    return typeMap[type] || type;
  }
}

// 专利筛选接口
export interface PatentFilters {
  search?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  type?: string;
  page?: number;
  limit?: number;
}

// 分页结果接口
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * 获取用户拥有的专利
 * @param filters 筛选条件
 * @returns 专利分页结果
 */
export async function getUserPatents(filters: PatentFilters = {}): Promise<PaginatedResult<Patent>> {
  // 在实际应用中，这里会调用API获取数据
  // 这里使用模拟数据
  
  const { 
    search = '', 
    status = 'all', 
    startDate = '', 
    endDate = '',
    type = 'all',
    page = 1,
    limit = 10
  } = filters;
  
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 根据筛选条件过滤数据
  let filteredPatents = [...mockPatents];
  
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredPatents = filteredPatents.filter(patent => 
      patent.id.toLowerCase().includes(searchTerm) || 
      patent.title.toLowerCase().includes(searchTerm) ||
      patent.appNumber.toLowerCase().includes(searchTerm) ||
      patent.description.toLowerCase().includes(searchTerm) ||
      patent.inventors.some(inventor => inventor.toLowerCase().includes(searchTerm))
    );
  }
  
  if (status !== 'all') {
    filteredPatents = filteredPatents.filter(patent => patent.status === status);
  }
  
  if (type !== 'all') {
    filteredPatents = filteredPatents.filter(patent => patent.patentType === type);
  }
  
  if (startDate) {
    filteredPatents = filteredPatents.filter(patent => new Date(patent.filingDate) >= new Date(startDate));
  }
  
  if (endDate) {
    filteredPatents = filteredPatents.filter(patent => new Date(patent.filingDate) <= new Date(endDate));
  }
  
  // 计算分页信息
  const total = filteredPatents.length;
  const totalPages = Math.ceil(total / limit);
  
  // 应用分页
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredPatents.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    total,
    page,
    limit,
    totalPages
  };
}

/**
 * 获取专利类型列表
 * @returns 专利类型列表
 */
export async function getPatentTypes(): Promise<{id: string, name: string}[]> {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    { id: 'invention', name: '发明专利' },
    { id: 'utility', name: '实用新型' },
    { id: 'design', name: '外观设计' }
  ];
}

/**
 * 获取专利状态列表
 * @returns 专利状态列表
 */
export async function getPatentStatuses(): Promise<{id: string, name: string}[]> {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    { id: 'pending', name: '审查中' },
    { id: 'granted', name: '已授权' },
    { id: 'rejected', name: '已驳回' }
  ];
}

/**
 * 获取可以转让的专利列表（已授权的专利）
 * @returns 可转让的专利列表
 */
export async function getTransferablePatents(): Promise<Patent[]> {
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 只返回已授权的专利
  return mockPatents.filter(patent => patent.status === 'approved');
} 