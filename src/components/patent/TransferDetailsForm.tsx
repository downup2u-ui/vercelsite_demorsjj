import React, { useState, useEffect } from 'react';

// 转让类型
export type TransferType = 'sale' | 'license' | 'gift' | 'inheritance' | 'other';

// 转让详情接口
export interface TransferDetails {
  transferType: TransferType;
  transferDate: string;
  exclusive?: boolean;
  transferReason?: string;
  transferScope?: string;
  territoryLimitation?: string;
  otherLimitations?: string;
  additionalNotes?: string;
}

interface TransferDetailsFormProps {
  value: TransferDetails;
  onChange: (details: TransferDetails) => void;
}

const TransferDetailsForm: React.FC<TransferDetailsFormProps> = ({
  value,
  onChange
}) => {
  // 使用本地状态以便可以验证
  const [formData, setFormData] = useState<TransferDetails>(value);
  
  // 状态同步
  useEffect(() => {
    setFormData(value);
  }, [value]);
  
  // 表单字段更新处理程序
  const handleChange = (field: keyof TransferDetails, fieldValue: any) => {
    const updatedData = { ...formData, [field]: fieldValue };
    
    // 如果类型不是许可证，则exclusive应该是undefined
    if (field === 'transferType' && fieldValue !== 'license') {
      updatedData.exclusive = undefined;
    }
    
    setFormData(updatedData);
    onChange(updatedData);
  };
  
  // 转让类型选项
  const transferTypeOptions = [
    { value: 'sale', label: '全权出售' },
    { value: 'license', label: '许可使用' },
    { value: 'gift', label: '赠予' },
    { value: 'inheritance', label: '继承' },
    { value: 'other', label: '其他' }
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 转让类型 */}
        <div>
          <label htmlFor="transferType" className="block text-sm font-medium text-gray-700 mb-1">
            转让类型 <span className="text-red-500">*</span>
          </label>
          <select
            id="transferType"
            value={formData.transferType}
            onChange={(e) => handleChange('transferType', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="" disabled>请选择转让类型</option>
            {transferTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500">
            请选择专利转让的类型，不同类型可能有不同的法律要求和流程
          </p>
        </div>
        
        {/* 转让日期 */}
        <div>
          <label htmlFor="transferDate" className="block text-sm font-medium text-gray-700 mb-1">
            转让生效日期 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="transferDate"
            value={formData.transferDate}
            onChange={(e) => handleChange('transferDate', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min={new Date().toISOString().split('T')[0]} // 最小日期为今天
          />
          <p className="mt-1 text-sm text-gray-500">
            专利转让的生效日期，通常不早于当前日期
          </p>
        </div>
      </div>
      
      {/* 排他性选项 - 只在许可类型时显示 */}
      {formData.transferType === 'license' && (
        <div>
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="exclusive"
                type="checkbox"
                checked={formData.exclusive || false}
                onChange={(e) => handleChange('exclusive', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="exclusive" className="font-medium text-gray-700">排他性许可</label>
              <p className="text-gray-500">
                如果选中，表示接收方将获得对专利的排他性使用权，您不能再向其他方授予相同的许可
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* 转让原因 */}
      <div>
        <label htmlFor="transferReason" className="block text-sm font-medium text-gray-700 mb-1">
          转让原因
        </label>
        <textarea
          id="transferReason"
          value={formData.transferReason || ''}
          onChange={(e) => handleChange('transferReason', e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="请简要说明转让该专利的原因"
        />
      </div>
      
      {/* 转让范围 - 许可类型时显示 */}
      {formData.transferType === 'license' && (
        <div>
          <label htmlFor="transferScope" className="block text-sm font-medium text-gray-700 mb-1">
            许可范围 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="transferScope"
            value={formData.transferScope || ''}
            onChange={(e) => handleChange('transferScope', e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="请描述许可的具体范围，例如：制造、销售、使用等"
            required={formData.transferType === 'license'}
          />
          <p className="mt-1 text-sm text-gray-500">
            详细说明接收方可以如何使用该专利，例如仅限于特定产品、特定用途等
          </p>
        </div>
      )}
      
      {/* 区域限制 - 许可类型时显示 */}
      {formData.transferType === 'license' && (
        <div>
          <label htmlFor="territoryLimitation" className="block text-sm font-medium text-gray-700 mb-1">
            区域限制
          </label>
          <input
            type="text"
            id="territoryLimitation"
            value={formData.territoryLimitation || ''}
            onChange={(e) => handleChange('territoryLimitation', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="例如：仅限中国大陆地区"
          />
          <p className="mt-1 text-sm text-gray-500">
            如果许可仅限于特定地区，请在此指定。留空表示无地域限制
          </p>
        </div>
      )}
      
      {/* 其他限制条件 */}
      <div>
        <label htmlFor="otherLimitations" className="block text-sm font-medium text-gray-700 mb-1">
          其他限制条件
        </label>
        <textarea
          id="otherLimitations"
          value={formData.otherLimitations || ''}
          onChange={(e) => handleChange('otherLimitations', e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="请说明其他任何限制条件"
        />
      </div>
      
      {/* 附加说明 */}
      <div>
        <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
          附加说明
        </label>
        <textarea
          id="additionalNotes"
          value={formData.additionalNotes || ''}
          onChange={(e) => handleChange('additionalNotes', e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="请提供任何其他相关信息"
        />
      </div>
    </div>
  );
};

export default TransferDetailsForm; 