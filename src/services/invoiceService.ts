import axios from 'axios';

// 发票状态类型
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

// 发票项目接口
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  amount: number;
}

// 发票接口
export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  createdAt: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  taxTotal: number;
  total: number;
  status: InvoiceStatus;
  notes?: string;
  terms?: string;
  relatedRevenue?: string;
}

// 筛选选项接口
export interface InvoiceFilters {
  status?: InvoiceStatus;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  searchQuery?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// 分页数据接口
export interface PaginatedInvoices {
  invoices: Invoice[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 创建发票请求接口
export interface CreateInvoiceRequest {
  clientId: string;
  dueDate: string;
  items: Omit<InvoiceItem, 'id'>[];
  notes?: string;
  terms?: string;
  relatedRevenue?: string;
}

// 模拟数据
const MOCK_INVOICES: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2023-001',
    clientId: 'client1',
    clientName: '北京科技有限公司',
    createdAt: '2023-01-15',
    dueDate: '2023-02-15',
    items: [
      {
        id: 'item1',
        description: '专利申请服务',
        quantity: 1,
        unitPrice: 5000,
        taxRate: 6,
        amount: 5000
      }
    ],
    subtotal: 5000,
    taxTotal: 300,
    total: 5300,
    status: 'paid'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2023-002',
    clientId: 'client2',
    clientName: '上海创新科技有限公司',
    createdAt: '2023-02-20',
    dueDate: '2023-03-20',
    items: [
      {
        id: 'item2',
        description: '商标注册服务',
        quantity: 2,
        unitPrice: 2500,
        taxRate: 6,
        amount: 5000
      }
    ],
    subtotal: 5000,
    taxTotal: 300,
    total: 5300,
    status: 'sent'
  },
  {
    id: '3',
    invoiceNumber: 'INV-2023-003',
    clientId: 'client3',
    clientName: '广州设计有限公司',
    createdAt: '2023-03-10',
    dueDate: '2023-04-10',
    items: [
      {
        id: 'item3',
        description: '知识产权保护服务',
        quantity: 1,
        unitPrice: 8000,
        taxRate: 6,
        amount: 8000
      }
    ],
    subtotal: 8000,
    taxTotal: 480,
    total: 8480,
    status: 'overdue'
  },
  {
    id: '4',
    invoiceNumber: 'INV-2023-004',
    clientId: 'client4',
    clientName: '深圳电子科技有限公司',
    createdAt: '2023-04-05',
    dueDate: '2023-05-05',
    items: [
      {
        id: 'item4',
        description: '专利检索服务',
        quantity: 1,
        unitPrice: 3000,
        taxRate: 6,
        amount: 3000
      }
    ],
    subtotal: 3000,
    taxTotal: 180,
    total: 3180,
    status: 'draft'
  },
  {
    id: '5',
    invoiceNumber: 'INV-2023-005',
    clientId: 'client5',
    clientName: '杭州互联网有限公司',
    createdAt: '2023-05-12',
    dueDate: '2023-06-12',
    items: [
      {
        id: 'item5',
        description: '专利分析服务',
        quantity: 1,
        unitPrice: 6000,
        taxRate: 6,
        amount: 6000
      }
    ],
    subtotal: 6000,
    taxTotal: 360,
    total: 6360,
    status: 'paid'
  }
];

// 客户数据
export interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
  contactPerson: string;
  phone: string;
}

const MOCK_CLIENTS: Client[] = [
  {
    id: 'client1',
    name: '北京科技有限公司',
    email: 'contact@bjtech.com',
    address: '北京市海淀区中关村南大街5号',
    contactPerson: '张经理',
    phone: '010-12345678'
  },
  {
    id: 'client2',
    name: '上海创新科技有限公司',
    email: 'info@shtech.com',
    address: '上海市浦东新区张江高科技园区',
    contactPerson: '李总监',
    phone: '021-87654321'
  },
  {
    id: 'client3',
    name: '广州设计有限公司',
    email: 'design@gzdesign.com',
    address: '广州市天河区珠江新城',
    contactPerson: '王设计师',
    phone: '020-56781234'
  },
  {
    id: 'client4',
    name: '深圳电子科技有限公司',
    email: 'info@szelectronics.com',
    address: '深圳市南山区科技园',
    contactPerson: '刘工程师',
    phone: '0755-43218765'
  },
  {
    id: 'client5',
    name: '杭州互联网有限公司',
    email: 'contact@hznet.com',
    address: '杭州市西湖区西溪路',
    contactPerson: '陈经理',
    phone: '0571-98765432'
  }
];

class InvoiceService {
  // 获取发票列表
  async getInvoices(filters: InvoiceFilters = {}): Promise<PaginatedInvoices> {
    try {
      // 实际项目中应该调用API
      // const response = await axios.get('/api/invoices', { params: filters });
      // return response.data;

      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 500));

      // 筛选发票
      let filteredInvoices = [...MOCK_INVOICES];

      if (filters.status) {
        filteredInvoices = filteredInvoices.filter(invoice => invoice.status === filters.status);
      }

      if (filters.startDate) {
        filteredInvoices = filteredInvoices.filter(
          invoice => new Date(invoice.createdAt) >= new Date(filters.startDate!)
        );
      }

      if (filters.endDate) {
        filteredInvoices = filteredInvoices.filter(
          invoice => new Date(invoice.createdAt) <= new Date(filters.endDate!)
        );
      }

      if (filters.minAmount !== undefined) {
        filteredInvoices = filteredInvoices.filter(
          invoice => invoice.total >= filters.minAmount!
        );
      }

      if (filters.maxAmount !== undefined) {
        filteredInvoices = filteredInvoices.filter(
          invoice => invoice.total <= filters.maxAmount!
        );
      }

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filteredInvoices = filteredInvoices.filter(
          invoice => 
            invoice.invoiceNumber.toLowerCase().includes(query) || 
            invoice.clientName.toLowerCase().includes(query)
        );
      }

      // 排序
      if (filters.sortBy) {
        const sortOrder = filters.sortOrder === 'desc' ? -1 : 1;
        filteredInvoices.sort((a: any, b: any) => {
          if (a[filters.sortBy!] < b[filters.sortBy!]) return -1 * sortOrder;
          if (a[filters.sortBy!] > b[filters.sortBy!]) return 1 * sortOrder;
          return 0;
        });
      }

      // 分页
      const page = filters.page || 1;
      const limit = filters.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedInvoices = filteredInvoices.slice(startIndex, endIndex);

      return {
        invoices: paginatedInvoices,
        total: filteredInvoices.length,
        page,
        limit,
        totalPages: Math.ceil(filteredInvoices.length / limit)
      };
    } catch (error) {
      console.error('Error fetching invoices:', error);
      throw error;
    }
  }

  // 获取单个发票详情
  async getInvoice(id: string): Promise<Invoice> {
    try {
      // 实际项目中应该调用API
      // const response = await axios.get(`/api/invoices/${id}`);
      // return response.data;

      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      const invoice = MOCK_INVOICES.find(inv => inv.id === id);
      if (!invoice) {
        throw new Error('发票未找到');
      }
      return invoice;
    } catch (error) {
      console.error(`Error fetching invoice ${id}:`, error);
      throw error;
    }
  }

  // 创建新发票
  async createInvoice(invoiceData: CreateInvoiceRequest): Promise<Invoice> {
    try {
      // 实际项目中应该调用API
      // const response = await axios.post('/api/invoices', invoiceData);
      // return response.data;

      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 800));

      // 查找客户信息
      const client = MOCK_CLIENTS.find(c => c.id === invoiceData.clientId);
      if (!client) {
        throw new Error('客户未找到');
      }

      // 计算金额
      const items = invoiceData.items.map((item, index) => ({
        ...item,
        id: `new-item-${index + 1}`,
        amount: item.quantity * item.unitPrice
      }));

      const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
      const taxTotal = items.reduce((sum, item) => sum + (item.amount * item.taxRate / 100), 0);
      const total = subtotal + taxTotal;

      // 创建新发票
      const newInvoice: Invoice = {
        id: `${MOCK_INVOICES.length + 1}`,
        invoiceNumber: `INV-${new Date().getFullYear()}-${String(MOCK_INVOICES.length + 1).padStart(3, '0')}`,
        clientId: client.id,
        clientName: client.name,
        createdAt: new Date().toISOString().split('T')[0],
        dueDate: invoiceData.dueDate,
        items,
        subtotal,
        taxTotal,
        total,
        status: 'draft',
        notes: invoiceData.notes,
        terms: invoiceData.terms,
        relatedRevenue: invoiceData.relatedRevenue
      };

      // 将新发票添加到模拟数据中
      MOCK_INVOICES.push(newInvoice);

      return newInvoice;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  }

  // 更新发票
  async updateInvoice(id: string, invoiceData: Partial<Invoice>): Promise<Invoice> {
    try {
      // 实际项目中应该调用API
      // const response = await axios.put(`/api/invoices/${id}`, invoiceData);
      // return response.data;

      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 500));

      const invoiceIndex = MOCK_INVOICES.findIndex(inv => inv.id === id);
      if (invoiceIndex === -1) {
        throw new Error('发票未找到');
      }

      // 更新发票
      const updatedInvoice = {
        ...MOCK_INVOICES[invoiceIndex],
        ...invoiceData
      };

      MOCK_INVOICES[invoiceIndex] = updatedInvoice;
      return updatedInvoice;
    } catch (error) {
      console.error(`Error updating invoice ${id}:`, error);
      throw error;
    }
  }

  // 删除发票
  async deleteInvoice(id: string): Promise<boolean> {
    try {
      // 实际项目中应该调用API
      // await axios.delete(`/api/invoices/${id}`);

      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 400));

      const invoiceIndex = MOCK_INVOICES.findIndex(inv => inv.id === id);
      if (invoiceIndex === -1) {
        throw new Error('发票未找到');
      }

      // 删除发票
      MOCK_INVOICES.splice(invoiceIndex, 1);
      return true;
    } catch (error) {
      console.error(`Error deleting invoice ${id}:`, error);
      throw error;
    }
  }

  // 更新发票状态
  async updateInvoiceStatus(id: string, status: InvoiceStatus): Promise<Invoice> {
    try {
      // 实际项目中应该调用API
      // const response = await axios.patch(`/api/invoices/${id}/status`, { status });
      // return response.data;

      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 300));

      const invoiceIndex = MOCK_INVOICES.findIndex(inv => inv.id === id);
      if (invoiceIndex === -1) {
        throw new Error('发票未找到');
      }

      // 更新发票状态
      const updatedInvoice = {
        ...MOCK_INVOICES[invoiceIndex],
        status
      };

      MOCK_INVOICES[invoiceIndex] = updatedInvoice;
      return updatedInvoice;
    } catch (error) {
      console.error(`Error updating invoice ${id} status:`, error);
      throw error;
    }
  }

  // 获取客户列表
  async getClients(): Promise<Client[]> {
    try {
      // 实际项目中应该调用API
      // const response = await axios.get('/api/clients');
      // return response.data;

      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 300));
      return MOCK_CLIENTS;
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw error;
    }
  }
}

export const invoiceService = new InvoiceService();
export default invoiceService; 