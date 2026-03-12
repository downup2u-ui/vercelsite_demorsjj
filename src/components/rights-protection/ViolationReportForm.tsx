import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// 表单数据接口
export interface ViolationReportFormData {
  // 举报人信息
  reporterName: string;
  reporterEmail: string;
  reporterPhone: string;
  
  // 侵权类型和详情
  violationType: 'patent' | 'trademark' | 'copyright' | 'other';
  violationTypeOther?: string;
  violationDescription: string;
  affectedContent: string;
  locationOfViolation: string;
  
  // 侵权者信息
  violatorName?: string;
  violatorContact?: string;
  violatorWebsite?: string;
  
  // 附加信息
  additionalInfo?: string;
  
  // 文件证据
  evidenceFiles: File[];
}

// 组件属性
interface ViolationReportFormProps {
  onSubmit: (data: ViolationReportFormData) => Promise<void>;
}

const ViolationReportForm: React.FC<ViolationReportFormProps> = ({ onSubmit }) => {
  // 表单状态管理
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<ViolationReportFormData>();
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  // 监听侵权类型
  const violationType = watch('violationType');
  
  // 文件上传处理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    
    // 验证文件类型和大小
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    let newFiles: File[] = [];
    let hasError = false;
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      
      if (!validTypes.includes(file.type)) {
        setUploadError('不支持的文件类型。请上传图片(JPG, PNG, GIF)、PDF或Word文档。');
        hasError = true;
        break;
      }
      
      if (file.size > maxSize) {
        setUploadError('文件太大。每个文件大小不能超过10MB。');
        hasError = true;
        break;
      }
      
      newFiles.push(file);
    }
    
    if (!hasError) {
      setUploadError(null);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  // 移除已上传的文件
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  
  // 处理表单提交
  const handleFormSubmit = async (data: ViolationReportFormData) => {
    setSubmitting(true);
    try {
      // 添加文件到表单数据
      data.evidenceFiles = files;
      await onSubmit(data);
      // 重置表单
      reset();
      setFiles([]);
    } catch (error) {
      console.error('提交表单时出错:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  // 取消提交
  const handleCancel = () => {
    if (confirm('确定要取消吗？所有已填写的信息将丢失。')) {
      reset();
      setFiles([]);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* 举报人信息 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">举报人信息</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="reporterName" className="block text-sm font-medium text-gray-700">
              姓名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="reporterName"
              {...register('reporterName', { required: '请填写您的姓名' })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.reporterName ? 'border-red-300' : ''}`}
            />
            {errors.reporterName && (
              <p className="mt-1 text-sm text-red-600">{errors.reporterName.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="reporterEmail" className="block text-sm font-medium text-gray-700">
              电子邮箱 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="reporterEmail"
              {...register('reporterEmail', { 
                required: '请填写您的电子邮箱',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '请输入有效的电子邮箱地址'
                }
              })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.reporterEmail ? 'border-red-300' : ''}`}
            />
            {errors.reporterEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.reporterEmail.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="reporterPhone" className="block text-sm font-medium text-gray-700">
              联系电话 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="reporterPhone"
              {...register('reporterPhone', { 
                required: '请填写您的联系电话',
                pattern: {
                  value: /^[0-9\-\+\s]+$/,
                  message: '请输入有效的电话号码'
                }
              })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.reporterPhone ? 'border-red-300' : ''}`}
            />
            {errors.reporterPhone && (
              <p className="mt-1 text-sm text-red-600">{errors.reporterPhone.message}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* 侵权详情 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">侵权详情</h3>
        <div className="space-y-6">
          <div>
            <label htmlFor="violationType" className="block text-sm font-medium text-gray-700">
              侵权类型 <span className="text-red-500">*</span>
            </label>
            <select
              id="violationType"
              {...register('violationType', { required: '请选择侵权类型' })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.violationType ? 'border-red-300' : ''}`}
            >
              <option value="">请选择...</option>
              <option value="patent">专利侵权</option>
              <option value="trademark">商标侵权</option>
              <option value="copyright">版权侵权</option>
              <option value="other">其他</option>
            </select>
            {errors.violationType && (
              <p className="mt-1 text-sm text-red-600">{errors.violationType.message}</p>
            )}
          </div>
          
          {violationType === 'other' && (
            <div>
              <label htmlFor="violationTypeOther" className="block text-sm font-medium text-gray-700">
                请说明其他侵权类型 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="violationTypeOther"
                {...register('violationTypeOther', { 
                  required: violationType === 'other' ? '请说明侵权类型' : false 
                })}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.violationTypeOther ? 'border-red-300' : ''}`}
              />
              {errors.violationTypeOther && (
                <p className="mt-1 text-sm text-red-600">{errors.violationTypeOther.message}</p>
              )}
            </div>
          )}
          
          <div>
            <label htmlFor="violationDescription" className="block text-sm font-medium text-gray-700">
              侵权行为描述 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="violationDescription"
              rows={4}
              {...register('violationDescription', { 
                required: '请描述侵权行为',
                minLength: { value: 20, message: '请至少输入20个字符的描述' }
              })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.violationDescription ? 'border-red-300' : ''}`}
              placeholder="请详细描述侵权行为，包括您如何发现侵权、发生的时间等信息"
            ></textarea>
            {errors.violationDescription && (
              <p className="mt-1 text-sm text-red-600">{errors.violationDescription.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="affectedContent" className="block text-sm font-medium text-gray-700">
              被侵权的内容 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="affectedContent"
              rows={3}
              {...register('affectedContent', { required: '请描述被侵权的内容' })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.affectedContent ? 'border-red-300' : ''}`}
              placeholder="请描述您的哪些知识产权受到了侵犯，例如专利号、商标注册号、版权作品等"
            ></textarea>
            {errors.affectedContent && (
              <p className="mt-1 text-sm text-red-600">{errors.affectedContent.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="locationOfViolation" className="block text-sm font-medium text-gray-700">
              侵权发生的位置/平台 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="locationOfViolation"
              {...register('locationOfViolation', { required: '请填写侵权发生的位置或平台' })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.locationOfViolation ? 'border-red-300' : ''}`}
              placeholder="例如：网站URL、实体店地址、应用商店名称等"
            />
            {errors.locationOfViolation && (
              <p className="mt-1 text-sm text-red-600">{errors.locationOfViolation.message}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* 侵权者信息 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">侵权者信息（如已知）</h3>
        <div className="space-y-6">
          <div>
            <label htmlFor="violatorName" className="block text-sm font-medium text-gray-700">
              侵权者姓名/企业名称
            </label>
            <input
              type="text"
              id="violatorName"
              {...register('violatorName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="violatorContact" className="block text-sm font-medium text-gray-700">
                侵权者联系方式
              </label>
              <input
                type="text"
                id="violatorContact"
                {...register('violatorContact')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="violatorWebsite" className="block text-sm font-medium text-gray-700">
                侵权者网站/社交媒体
              </label>
              <input
                type="text"
                id="violatorWebsite"
                {...register('violatorWebsite')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* 证据上传 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">证据上传</h3>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="mt-4 flex text-sm text-gray-600 justify-center">
                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                  <span>上传文件</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                </label>
                <p className="pl-1">或拖放文件到此处</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                支持JPG、PNG、GIF、PDF、DOC、DOCX格式，每个文件不超过10MB
              </p>
            </div>
          </div>
          
          {uploadError && (
            <p className="text-sm text-red-600">{uploadError}</p>
          )}
          
          {files.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">已上传文件</h4>
              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                {files.map((file, index) => (
                  <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        删除
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* 附加信息 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">附加信息</h3>
        <div>
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
            其他相关信息
          </label>
          <textarea
            id="additionalInfo"
            rows={3}
            {...register('additionalInfo')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="请提供任何其他可能有助于我们处理您举报的信息"
          ></textarea>
        </div>
      </div>
      
      {/* 提交按钮 */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={handleCancel}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          取消
        </button>
        <button
          type="submit"
          disabled={submitting}
          className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            submitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {submitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              提交中...
            </>
          ) : '提交举报'}
        </button>
      </div>
    </form>
  );
};

export default ViolationReportForm; 