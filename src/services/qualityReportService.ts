/**
 * 质量检查报告服务
 * 提供质量报告数据获取、管理的方法
 */

// 质量报告状态类型
export type ReportStatus = 'pass' | 'fail' | 'pending';

// 质量检查项目
export interface InspectionItem {
  id: string;
  name: string;
  description: string;
  standard: string;
  result: boolean;
  notes?: string;
}

// 质量报告图片
export interface ReportImage {
  id: string;
  url: string;
  caption: string;
  timestamp: string;
}

// 质量报告详情
export interface QualityReport {
  id: string;
  title: string;
  date: string;
  project: string;
  projectId: string;
  status: ReportStatus;
  inspector: string;
  description: string;
  inspectionItems?: InspectionItem[];
  images?: ReportImage[];
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

// 质量报告筛选参数
export interface ReportFilters {
  search?: string;
  project?: string;
  status?: ReportStatus | 'all';
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

// 分页结果
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 模拟数据
const mockReports: QualityReport[] = [
  {
    id: 'QR-2023-001',
    title: '设计原型初步质检',
    date: '2023-10-15',
    project: '智能家居控制面板',
    projectId: 'PRJ-2023-001',
    status: 'pass',
    inspector: '李明',
    description: '原型设计符合人机交互规范，通过初步检查',
    inspectionItems: [
      { id: 'item-001', name: '界面一致性', description: '所有界面元素风格保持一致', standard: '符合设计规范文档4.2章节', result: true },
      { id: 'item-002', name: '响应式适配', description: '在各种屏幕尺寸下正确显示', standard: '符合响应式设计标准', result: true },
      { id: 'item-003', name: '交互反馈', description: '用户操作有明确反馈', standard: '点击/触摸后200ms内有视觉反馈', result: true }
    ],
    images: [
      { id: 'img-001', url: '/images/reports/qr001-1.jpg', caption: '控制面板主界面', timestamp: '2023-10-15T09:30:00Z' },
      { id: 'img-002', url: '/images/reports/qr001-2.jpg', caption: '设置界面', timestamp: '2023-10-15T09:35:00Z' }
    ],
    createdAt: '2023-10-15T09:00:00Z',
    updatedAt: '2023-10-15T11:30:00Z'
  },
  {
    id: 'QR-2023-002',
    title: '产品结构安全测试',
    date: '2023-11-02',
    project: '便携式空气检测仪',
    projectId: 'PRJ-2023-002',
    status: 'fail',
    inspector: '张伟',
    description: '外壳强度测试未通过，需要进行材料优化',
    inspectionItems: [
      { id: 'item-004', name: '跌落测试', description: '从1米高度自由落体', standard: '无明显损坏或功能异常', result: false },
      { id: 'item-005', name: '防水测试', description: '模拟轻微溅水情况', standard: 'IPX4防水等级', result: true },
      { id: 'item-006', name: '高温测试', description: '在45°C环境下工作4小时', standard: '功能正常，无形变', result: true }
    ],
    images: [
      { id: 'img-003', url: '/images/reports/qr002-1.jpg', caption: '跌落测试后的损坏', timestamp: '2023-11-02T14:20:00Z' }
    ],
    feedback: '建议增加外壳材料厚度，或者采用更耐冲击的材料进行重新设计',
    createdAt: '2023-11-02T13:00:00Z',
    updatedAt: '2023-11-02T16:30:00Z'
  },
  {
    id: 'QR-2023-003',
    title: '用户界面一致性检查',
    date: '2023-12-10',
    project: '智能家居控制面板',
    projectId: 'PRJ-2023-001',
    status: 'pending',
    inspector: '王芳',
    description: '界面元素风格一致性检查，等待最终确认',
    inspectionItems: [
      { id: 'item-007', name: '色彩一致性', description: '按钮、标签等元素色彩一致', standard: '符合品牌色彩规范', result: true },
      { id: 'item-008', name: '字体规范', description: '检查字体家族和大小是否规范', standard: '符合设计系统规范文档', result: true },
      { id: 'item-009', name: '间距规范', description: '元素间距是否符合规范', standard: '遵循8px网格系统', result: false }
    ],
    createdAt: '2023-12-10T10:00:00Z',
    updatedAt: '2023-12-10T11:45:00Z'
  }
];

// 获取报告列表
export async function getQualityReports(filters: ReportFilters = {}): Promise<PaginatedResult<QualityReport>> {
  // 在实际场景中，这里会调用API获取数据
  // 这里使用模拟数据并根据筛选条件处理
  
  const { 
    search = '', 
    project = 'all', 
    status = 'all', 
    startDate = '', 
    endDate = '',
    page = 1,
    limit = 10
  } = filters;
  
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 根据筛选条件过滤数据
  let filteredReports = [...mockReports];
  
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredReports = filteredReports.filter(report => 
      report.id.toLowerCase().includes(searchTerm) || 
      report.title.toLowerCase().includes(searchTerm) ||
      report.project.toLowerCase().includes(searchTerm) ||
      report.description.toLowerCase().includes(searchTerm)
    );
  }
  
  if (project !== 'all') {
    filteredReports = filteredReports.filter(report => report.project === project);
  }
  
  if (status !== 'all') {
    filteredReports = filteredReports.filter(report => report.status === status);
  }
  
  if (startDate) {
    filteredReports = filteredReports.filter(report => new Date(report.date) >= new Date(startDate));
  }
  
  if (endDate) {
    filteredReports = filteredReports.filter(report => new Date(report.date) <= new Date(endDate));
  }
  
  // 计算分页信息
  const total = filteredReports.length;
  const totalPages = Math.ceil(total / limit);
  
  // 应用分页
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredReports.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    total,
    page,
    limit,
    totalPages
  };
}

// 获取报告详情
export async function getQualityReportById(id: string): Promise<QualityReport | null> {
  // 在实际场景中，这里会调用API获取数据
  // 这里使用模拟数据
  
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const report = mockReports.find(report => report.id === id);
  return report || null;
}

// 创建新报告
export async function createQualityReport(data: Partial<QualityReport>): Promise<QualityReport> {
  // 在实际场景中，这里会调用API创建数据
  // 这里使用模拟数据
  
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // 模拟创建新报告
  const newReport: QualityReport = {
    id: `QR-${new Date().getFullYear()}-${(mockReports.length + 1).toString().padStart(3, '0')}`,
    title: data.title || '新质检报告',
    date: data.date || new Date().toISOString().split('T')[0],
    project: data.project || '',
    projectId: data.projectId || '',
    status: data.status || 'pending',
    inspector: data.inspector || '当前用户',
    description: data.description || '',
    inspectionItems: data.inspectionItems || [],
    images: data.images || [],
    feedback: data.feedback,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // 注意：这里仅作演示，并没有真正将数据添加到mockReports中
  // 真实场景会将数据保存到后端
  
  return newReport;
}

// 更新报告
export async function updateQualityReport(id: string, data: Partial<QualityReport>): Promise<QualityReport | null> {
  // 在实际场景中，这里会调用API更新数据
  // 这里使用模拟数据
  
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const reportIndex = mockReports.findIndex(report => report.id === id);
  if (reportIndex === -1) {
    return null;
  }
  
  // 模拟更新报告
  // 注意：这里仅作演示，并没有真正更新mockReports中的数据
  // 真实场景会将数据更新到后端
  
  const updatedReport = {
    ...mockReports[reportIndex],
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  return updatedReport;
}

// 获取可用项目列表（用于筛选）
export async function getProjectsForFilter(): Promise<{id: string, name: string}[]> {
  // 在实际场景中，这里会调用项目服务获取项目列表
  // 这里使用从模拟数据提取的项目列表
  
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 从报告数据中提取不重复的项目
  const projects = Array.from(
    new Set(mockReports.map(report => report.project))
  ).map(projectName => {
    const report = mockReports.find(r => r.project === projectName);
    return {
      id: report?.projectId || '',
      name: projectName
    };
  });
  
  return projects;
}

// 导出报告为PDF（模拟）
export async function exportReportToPDF(id: string): Promise<{ url: string }> {
  // 在实际场景中，这里会调用API生成报告PDF
  // 这里仅模拟返回一个成功结果
  
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // 模拟返回PDF下载链接
  return {
    url: `/api/reports/${id}/download`
  };
}

// 删除报告
export const deleteReport = async (reportId: string): Promise<boolean> => {
  // 模拟API调用
  return new Promise((resolve) => {
    setTimeout(() => {
      // 这里假设成功
      resolve(true);
    }, 800);
  });
};

// 共享报告
export const shareReport = async (reportId: string, emails: string[]): Promise<boolean> => {
  // 模拟API调用
  return new Promise((resolve) => {
    setTimeout(() => {
      // 这里假设成功
      resolve(true);
    }, 800);
  });
}; 