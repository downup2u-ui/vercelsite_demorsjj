import React, { useState, useEffect, useRef } from 'react';

// 条款类型接口
export interface TermsAndDocuments {
  // 条款
  confidentiality: boolean;
  nonCompete: boolean;
  customTerms: string;
  transferFee: string;
  paymentMethod: string;
  paymentTerms: string;
  
  // 文档
  documents: DocumentFile[];
}

// 文档文件接口
export interface DocumentFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  uploadProgress?: number;
  preview?: string;
  uploadedAt: Date;
}

interface TermsAndDocumentsFormProps {
  value: TermsAndDocuments;
  onChange: (terms: TermsAndDocuments) => void;
}

const TermsAndDocumentsForm: React.FC<TermsAndDocumentsFormProps> = ({
  value,
  onChange
}) => {
  // 本地状态
  const [formData, setFormData] = useState<TermsAndDocuments>(value);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 同步外部值
  useEffect(() => {
    setFormData(value);
  }, [value]);
  
  // 处理表单字段更改
  const handleChange = (field: keyof TermsAndDocuments, fieldValue: any) => {
    const updatedData = { ...formData, [field]: fieldValue };
    setFormData(updatedData);
    onChange(updatedData);
  };
  
  // 处理多个文档上传
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    handleFiles(Array.from(e.target.files));
  };
  
  // 处理拖放
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  // 处理拖放放置
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };
  
  // 文件处理和验证
  const handleFiles = (files: File[]) => {
    // 验证文件类型
    const allowedTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png'
    ];
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    
    const validFiles = files.filter(file => {
      const isValidType = allowedTypes.includes(file.type);
      const isValidSize = file.size <= maxFileSize;
      
      if (!isValidType) {
        alert(`不支持的文件类型: ${file.name}. 请上传PDF、Word或图片文件。`);
      }
      if (!isValidSize) {
        alert(`文件过大: ${file.name}. 文件大小不能超过5MB。`);
      }
      
      return isValidType && isValidSize;
    });
    
    if (validFiles.length === 0) return;
    
    // 添加到已有文档
    const newDocuments = [...formData.documents];
    
    validFiles.forEach(file => {
      // 为文件创建预览URL（如果是图片）
      let preview: string | undefined = undefined;
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }
      
      newDocuments.push({
        id: Math.random().toString(36).substring(2, 11),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadProgress: 100, // 模拟已上传状态
        preview,
        uploadedAt: new Date()
      });
    });
    
    handleChange('documents', newDocuments);
    
    // 重置文件输入
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // 移除文档
  const handleRemoveDocument = (id: string) => {
    const updatedDocuments = formData.documents.filter(doc => doc.id !== id);
    handleChange('documents', updatedDocuments);
    
    // 如果有预览URL，释放它
    const docToRemove = formData.documents.find(doc => doc.id === id);
    if (docToRemove?.preview) {
      URL.revokeObjectURL(docToRemove.preview);
    }
  };
  
  // 格式化文件大小
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  // 获取文件图标
  const getFileIcon = (type: string): JSX.Element => {
    if (type.startsWith('image/')) {
      return (
        <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }
    if (type === 'application/pdf') {
      return (
        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    }
    if (type.includes('word')) {
      return (
        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    }
    
    return (
      <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    );
  };
  
  return (
    <div className="space-y-8">
      {/* 转让条款部分 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">转让条款</h3>
        
        <div className="space-y-4">
          {/* 转让费用 */}
          <div>
            <label htmlFor="transferFee" className="block text-sm font-medium text-gray-700 mb-1">
              转让费用
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">¥</span>
              </div>
              <input
                type="text"
                id="transferFee"
                value={formData.transferFee}
                onChange={(e) => handleChange('transferFee', e.target.value)}
                className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">CNY</span>
              </div>
            </div>
          </div>
          
          {/* 付款方式 */}
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
              付款方式
            </label>
            <select
              id="paymentMethod"
              value={formData.paymentMethod}
              onChange={(e) => handleChange('paymentMethod', e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">请选择付款方式</option>
              <option value="bank">银行转账</option>
              <option value="alipay">支付宝</option>
              <option value="wechat">微信支付</option>
              <option value="other">其他</option>
            </select>
          </div>
          
          {/* 付款条款 */}
          <div>
            <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700 mb-1">
              付款条款
            </label>
            <textarea
              id="paymentTerms"
              value={formData.paymentTerms}
              onChange={(e) => handleChange('paymentTerms', e.target.value)}
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="例如：合同签署后5个工作日内支付50%，剩余50%在专利转让登记完成后支付"
            />
          </div>
          
          {/* 保密条款 */}
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="confidentiality"
                type="checkbox"
                checked={formData.confidentiality}
                onChange={(e) => handleChange('confidentiality', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="confidentiality" className="font-medium text-gray-700">保密条款</label>
              <p className="text-gray-500">双方同意对转让协议的内容和条款保密，未经对方同意不得向第三方披露</p>
            </div>
          </div>
          
          {/* 竞业限制 */}
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="nonCompete"
                type="checkbox"
                checked={formData.nonCompete}
                onChange={(e) => handleChange('nonCompete', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="nonCompete" className="font-medium text-gray-700">竞业限制</label>
              <p className="text-gray-500">转让方同意在规定的期限和地域范围内不从事与转让专利相关的竞争活动</p>
            </div>
          </div>
          
          {/* 自定义条款 */}
          <div>
            <label htmlFor="customTerms" className="block text-sm font-medium text-gray-700 mb-1">
              自定义条款
            </label>
            <textarea
              id="customTerms"
              value={formData.customTerms}
              onChange={(e) => handleChange('customTerms', e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="请输入任何其他自定义条款"
            />
          </div>
        </div>
      </div>
      
      {/* 文档上传部分 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">相关文档</h3>
        
        {/* 拖放区域 */}
        <div 
          className={`p-6 border-2 border-dashed rounded-lg text-center ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              拖拽文件到此处，或者 {' '}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-500 focus:outline-none"
                onClick={() => fileInputRef.current?.click()}
              >
                点击浏览
              </button>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              支持PDF、Word文档和图片文件，单个文件不超过5MB
            </p>
          </div>
        </div>
        
        {/* 已上传文档列表 */}
        {formData.documents.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">已上传文档</h4>
            <ul className="divide-y divide-gray-200">
              {formData.documents.map(doc => (
                <li key={doc.id} className="py-3 flex items-center">
                  <div className="flex-shrink-0">
                    {getFileIcon(doc.type)}
                  </div>
                  
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(doc.size)} • {new Date(doc.uploadedAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {/* 预览按钮 - 如果是图片 */}
                        {doc.preview && (
                          <button
                            type="button"
                            onClick={() => window.open(doc.preview, '_blank')}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        )}
                        
                        {/* 删除按钮 */}
                        <button
                          type="button"
                          onClick={() => handleRemoveDocument(doc.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* 上传进度条 */}
                    {typeof doc.uploadProgress === 'number' && doc.uploadProgress < 100 && (
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full" 
                          style={{ width: `${doc.uploadProgress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TermsAndDocumentsForm; 