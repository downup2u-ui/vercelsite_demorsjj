import React from 'react';
import { Invoice, InvoiceStatus } from '@/services/invoiceService';
import { 
  PrinterIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// 状态标签的颜色映射
const statusColors: Record<InvoiceStatus, string> = {
  draft: 'bg-gray-100 text-gray-800',
  sent: 'bg-blue-100 text-blue-800',
  paid: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800',
  cancelled: 'bg-yellow-100 text-yellow-800'
};

// 状态显示文本
const statusLabels: Record<InvoiceStatus, string> = {
  draft: '草稿',
  sent: '已发送',
  paid: '已付款',
  overdue: '逾期',
  cancelled: '已取消'
};

interface InvoiceDetailProps {
  invoice: Invoice;
  open: boolean;
  onClose: () => void;
  onDownload?: () => void;
  onSendEmail?: () => void;
  onPrint?: () => void;
}

const InvoiceDetail: React.FC<InvoiceDetailProps> = ({
  invoice,
  open,
  onClose,
  onDownload,
  onSendEmail,
  onPrint
}) => {
  if (!open) return null;

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
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
          <h2 className="text-xl font-semibold">发票详情</h2>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[invoice.status]}`}>
            {statusLabels[invoice.status]}
          </span>
        </div>
        
        <div className="overflow-y-auto p-6 flex-grow">
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 发票基本信息 */}
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-500">发票编号</p>
                <p className="mb-3">{invoice.invoiceNumber}</p>
                
                <p className="text-sm text-gray-500 mt-3">创建日期</p>
                <p className="mb-3">{formatDate(invoice.createdAt)}</p>
                
                <p className="text-sm text-gray-500 mt-3">到期日期</p>
                <p>{formatDate(invoice.dueDate)}</p>
              </div>
              
              {/* 客户信息 */}
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-500">客户</p>
                <p className="mb-3">{invoice.clientName}</p>
                
                <p className="text-sm text-gray-500 mt-3">客户ID</p>
                <p className="mb-3">{invoice.clientId}</p>
                
                {invoice.relatedRevenue && (
                  <>
                    <p className="text-sm text-gray-500 mt-3">关联收入</p>
                    <p>{invoice.relatedRevenue}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* 发票项目 */}
          <h3 className="text-lg font-semibold mb-3">发票项目</h3>
          <div className="border rounded-lg overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      描述
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      数量
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      单价
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      税率
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      金额
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatAmount(item.unitPrice)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{item.taxRate}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatAmount(item.amount)}</td>
                    </tr>
                  ))}
                  
                  <tr className="bg-gray-50">
                    <td colSpan={3} className="px-6 py-4"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 text-right">小计</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatAmount(invoice.subtotal)}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td colSpan={3} className="px-6 py-4"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 text-right">税额</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatAmount(invoice.taxTotal)}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td colSpan={3} className="px-6 py-4"></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">总计</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                      {formatAmount(invoice.total)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* 备注和条款 */}
          {(invoice.notes || invoice.terms) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {invoice.notes && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">备注</h4>
                  <div className="border rounded p-3 text-sm">
                    {invoice.notes}
                  </div>
                </div>
              )}
              
              {invoice.terms && (
                <div>
                  <h4 className="text-sm font-semibold mb-2">付款条款</h4>
                  <div className="border rounded p-3 text-sm">
                    {invoice.terms}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            关闭
          </button>
          
          <div className="flex space-x-2">
            {onPrint && (
              <button 
                className="inline-flex items-center px-4 py-2 text-gray-700 hover:text-gray-900"
                onClick={onPrint}
              >
                <PrinterIcon className="h-5 w-5 mr-1" />
                打印
              </button>
            )}
            {onSendEmail && (
              <button 
                className="inline-flex items-center px-4 py-2 text-gray-700 hover:text-gray-900"
                onClick={onSendEmail}
              >
                <EnvelopeIcon className="h-5 w-5 mr-1" />
                发送邮件
              </button>
            )}
            {onDownload && (
              <button 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={onDownload}
              >
                <ArrowDownTrayIcon className="h-5 w-5 mr-1" />
                下载PDF
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail; 