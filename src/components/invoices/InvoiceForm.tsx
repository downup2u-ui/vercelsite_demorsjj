import React, { useState, useEffect } from 'react';
import { 
  Invoice, 
  InvoiceItem, 
  CreateInvoiceRequest, 
  Client,
  invoiceService 
} from '@/services/invoiceService';
import { PlusIcon, XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';

interface InvoiceFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (invoice: CreateInvoiceRequest) => Promise<void>;
  editInvoice?: Invoice;
}

// 空的invoice项目模板
const emptyInvoiceItem: Omit<InvoiceItem, 'id'> = {
  description: '',
  quantity: 1,
  unitPrice: 0,
  taxRate: 6, // 默认增值税率
  amount: 0
};

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  open,
  onClose,
  onSubmit,
  editInvoice
}) => {
  if (!open) return null;

  // 表单状态
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 表单数据
  const [formData, setFormData] = useState<CreateInvoiceRequest>({
    clientId: editInvoice?.clientId || '',
    dueDate: editInvoice?.dueDate || '',
    items: editInvoice?.items.map(item => ({
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      taxRate: item.taxRate,
      amount: item.amount
    })) || [{ ...emptyInvoiceItem }],
    notes: editInvoice?.notes || '',
    terms: editInvoice?.terms || '',
    relatedRevenue: editInvoice?.relatedRevenue || ''
  });

  // 计算结果
  const [subtotal, setSubtotal] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [total, setTotal] = useState(0);

  // 加载客户数据
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientData = await invoiceService.getClients();
        setClients(clientData);
      } catch (err) {
        console.error('Failed to fetch clients:', err);
        setError('无法加载客户数据');
      }
    };

    fetchClients();
  }, []);

  // 更新计算结果
  useEffect(() => {
    const newSubtotal = formData.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const newTaxTotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice * item.taxRate / 100), 0);
    const newTotal = newSubtotal + newTaxTotal;

    setSubtotal(newSubtotal);
    setTaxTotal(newTaxTotal);
    setTotal(newTotal);
  }, [formData.items]);

  // 处理表单变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // 处理项目变化
  const handleItemChange = (index: number, field: keyof Omit<InvoiceItem, 'id'>, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };

    // 自动计算金额
    if (field === 'quantity' || field === 'unitPrice') {
      const quantity = field === 'quantity' ? value : newItems[index].quantity;
      const unitPrice = field === 'unitPrice' ? value : newItems[index].unitPrice;
      newItems[index].amount = quantity * unitPrice;
    }

    setFormData(prev => ({ ...prev, items: newItems }));
  };

  // 添加新项目
  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { ...emptyInvoiceItem }]
    }));
  };

  // 删除项目
  const removeItem = (index: number) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    
    // 确保至少有一个项目
    if (newItems.length === 0) {
      newItems.push({ ...emptyInvoiceItem });
    }
    
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  // 提交表单
  const handleSubmit = async () => {
    if (!formData.clientId) {
      setError('请选择客户');
      return;
    }

    if (!formData.dueDate) {
      setError('请选择到期日期');
      return;
    }

    if (formData.items.some(item => !item.description || item.quantity <= 0)) {
      setError('请完成所有项目信息');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      console.error('Failed to submit invoice:', err);
      setError('保存发票失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 格式化金额
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">{editInvoice ? '编辑发票' : '创建新发票'}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="overflow-y-auto p-6 flex-grow">
          {error && (
            <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* 客户选择 */}
            <div>
              <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
                客户 <span className="text-red-500">*</span>
              </label>
              <select
                id="clientId"
                name="clientId"
                className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                value={formData.clientId}
                onChange={handleChange}
                required
              >
                <option value="">选择客户</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 到期日期 */}
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                到期日期 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* 项目列表标题 */}
          <h3 className="text-lg font-medium mb-4">发票项目</h3>

          {/* 项目列表 */}
          <div className="border rounded-lg p-4 mb-6">
            {formData.items.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-5">
                    <label htmlFor={`item-desc-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      描述 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`item-desc-${index}`}
                      className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                      value={item.description}
                      onChange={e => handleItemChange(index, 'description', e.target.value)}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor={`item-qty-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      数量 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id={`item-qty-${index}`}
                      className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                      value={item.quantity}
                      onChange={e => handleItemChange(index, 'quantity', Number(e.target.value))}
                      min="1"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor={`item-price-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      单价 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">¥</span>
                      </div>
                      <input
                        type="number"
                        id={`item-price-${index}`}
                        className="block w-full rounded-md border-0 py-2 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                        value={item.unitPrice}
                        onChange={e => handleItemChange(index, 'unitPrice', Number(e.target.value))}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor={`item-tax-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      税率 (%)
                    </label>
                    <input
                      type="number"
                      id={`item-tax-${index}`}
                      className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                      value={item.taxRate}
                      onChange={e => handleItemChange(index, 'taxRate', Number(e.target.value))}
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <div className="md:col-span-1 flex items-end justify-center">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      disabled={formData.items.length === 1}
                      className={`p-2 rounded-full ${formData.items.length === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-red-500 hover:bg-red-50'}`}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                {index < formData.items.length - 1 && (
                  <hr className="my-4" />
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              添加项目
            </button>
          </div>

          {/* 摘要 */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-right">小计:</div>
              <div className="text-right">{formatAmount(subtotal)}</div>
              
              <div className="text-right">税额:</div>
              <div className="text-right">{formatAmount(taxTotal)}</div>
              
              <div className="text-right font-semibold text-lg">总计:</div>
              <div className="text-right font-semibold text-lg">{formatAmount(total)}</div>
            </div>
          </div>

          {/* 附加信息 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                备注
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="terms" className="block text-sm font-medium text-gray-700 mb-1">
                付款条款
              </label>
              <textarea
                id="terms"
                name="terms"
                rows={4}
                className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                value={formData.terms}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 关联的收入 */}
          <div>
            <label htmlFor="relatedRevenue" className="block text-sm font-medium text-gray-700 mb-1">
              关联收入
            </label>
            <input
              type="text"
              id="relatedRevenue"
              name="relatedRevenue"
              className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
              value={formData.relatedRevenue}
              onChange={handleChange}
              placeholder="输入相关收入ID或描述"
            />
          </div>
        </div>
        
        <div className="flex justify-end items-center gap-2 px-6 py-4 border-t bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            取消
          </button>
          <button 
            type="button"
            onClick={handleSubmit} 
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? '保存中...' : (editInvoice ? '保存更改' : '创建发票')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm; 