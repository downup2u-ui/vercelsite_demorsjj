import React, { useState } from 'react';
import Placeholder from '../Placeholder';

interface SpaceBookingPlaceholderProps {
  bookingCount?: number; // 显示的预约记录数量
  withFilters?: boolean; // 是否显示筛选选项
  spaceType?: 'all' | 'studio' | 'office' | 'meeting'; // 空间类型
  showAvailabilityCalendar?: boolean; // 是否显示可用时间日历
  showBookingRecords?: boolean; // 是否显示预约记录
  isHistoryView?: boolean; // 是否为历史记录视图
}

// 空间类型数据
const spaceTypeData = {
  studio: {
    name: '共享工作室',
    description: '适合个人设计师或小团队使用的创意工作空间，提供基础设计工具和设备。',
    priceRange: '¥150-300/小时',
    capacity: '1-8人',
    features: ['创意环境', '共享设备', '24小时出入', '高速WiFi', '咖啡供应']
  },
  office: {
    name: '办公室',
    description: '独立办公空间，提供安静专注的工作环境，适合需要私密性的设计项目和团队。',
    priceRange: '¥400-800/小时',
    capacity: '4-12人',
    features: ['私密空间', '会议设备', '前台服务', '打印/扫描', '茶水间']
  },
  meeting: {
    name: '会议室',
    description: '配备投影、白板等会议设施的专业空间，适合项目讨论、客户会谈和创意头脑风暴。',
    priceRange: '¥300-600/小时',
    capacity: '6-20人',
    features: ['投影设备', '白板', '视频会议系统', '音响设备', '茶点服务']
  }
};

// 城市数据
const cityOptions = ['全部城市', '上海', '北京', '深圳', '广州', '杭州', '南京', '成都', '重庆'];

// 预订模态框类型
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  spaceInfo: {
    id: number;
    name: string;
    location: string;
    type: string;
    price: string;
    size: string;
    timeSlots: string;
    features?: string[];
    image?: string;
  };
}

// 空间详情模态框类型
interface SpaceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBook: () => void;
  spaceInfo: {
    id: number;
    name: string;
    location: string;
    type: string;
    price: string;
    size: string;
    timeSlots: string;
    features?: string[];
    image?: string;
    description?: string;
  };
}

// 预订详情查看模态框类型
interface BookingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    id: number;
    spaceName: string;
    location: string;
    dateTime: string;
    duration: string;
    status: string;
    price: string;
    bookingCode?: string;
    contactPerson?: string;
    notes?: string;
  };
  onCancel?: () => void;
  onRate?: () => void;
}

// 空间详情模态框组件
const SpaceDetailModal: React.FC<SpaceDetailModalProps> = ({ isOpen, onClose, onBook, spaceInfo }) => {
  if (!isOpen) return null;
  
  const features = spaceInfo.features || [
    '高速WiFi', 
    '空调', 
    '饮水机', 
    '清洁服务',
    spaceInfo.type === '共享工作室' ? '设计工具' : 
    spaceInfo.type === '办公室' ? '办公家具' : 
    '会议设备'
  ];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{spaceInfo.name}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {spaceInfo.type}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {spaceInfo.size}
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  {spaceInfo.price}
                </span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                  {spaceInfo.timeSlots}
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">空间信息</h4>
              <p className="text-gray-600 mb-4">{spaceInfo.description || `位于${spaceInfo.location}的${spaceInfo.type}，提供专业的创意工作环境。`}</p>
              
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">位置</h5>
                <p className="text-gray-600">{spaceInfo.location}</p>
              </div>
              
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">配套设施</h5>
                <div className="flex flex-wrap gap-2">
                  {features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mb-4">
            <h4 className="text-lg font-medium text-gray-800 mb-2">空间可用性</h4>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {Array.from({ length: 7 }).map((_, index) => {
                const date = new Date();
                date.setDate(date.getDate() + index);
                const isAvailable = Math.random() > 0.3;
                return (
                  <div key={index} className="text-center">
                    <div className="text-xs font-medium text-gray-500">
                      {['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]}
                    </div>
                    <div className="text-sm">{`${date.getMonth() + 1}/${date.getDate()}`}</div>
                    <div className={`mt-1 text-xs py-1 rounded-full ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {isAvailable ? '可预约' : '已满'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mb-4">
            <h4 className="text-lg font-medium text-gray-800 mb-2">预订政策</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>可提前30天预约，最晚提前24小时</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>预约成功后可在24小时内免费取消</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>超过预约人数限制将收取额外费用</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>如需额外服务（茶点、设备租赁等），请在备注中说明</span>
              </li>
            </ul>
          </div>
          
          <div className="flex justify-end space-x-4 mt-6">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              关闭
            </button>
            <button 
              onClick={onBook}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              立即预约
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 预订模态框组件
const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, spaceInfo }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [peopleCount, setPeopleCount] = useState('1');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState(1); // 1: 选择时间, 2: 填写信息, 3: 确认预订
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 计算预约时长和价格
  const calculateDuration = () => {
    if (!startTime || !endTime) return '0小时';
    const start = parseInt(startTime.split(':')[0]);
    const end = parseInt(endTime.split(':')[0]);
    return `${end - start}小时`;
  };
  
  const calculatePrice = () => {
    if (!startTime || !endTime) return '¥0';
    const start = parseInt(startTime.split(':')[0]);
    const end = parseInt(endTime.split(':')[0]);
    const hours = end - start;
    // 从价格字符串提取基础价格
    const basePrice = parseInt(spaceInfo.price.replace(/[^\d]/g, ''));
    return `¥${basePrice * hours}`;
  };
  
  const handleNextStep = () => {
    if (step === 1) {
      // 验证第一步所需的所有信息
      if (!selectedDate || !startTime || !endTime) {
        alert('请选择预约日期和时间');
        return;
      }
      
      // 验证结束时间是否晚于开始时间
      const start = parseInt(startTime.split(':')[0]);
      const end = parseInt(endTime.split(':')[0]);
      if (end <= start) {
        alert('结束时间必须晚于开始时间');
        return;
      }
    } else if (step === 2) {
      // 验证第二步所需的信息
      if (!contactName || !contactPhone) {
        alert('请填写联系人信息');
        return;
      }
    }
    
    setStep(step + 1);
  };
  
  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    // 模拟提交
    setTimeout(() => {
      setIsSubmitting(false);
      alert('预约成功！');
      onClose();
    }, 1500);
  };
  
  const resetForm = () => {
    setSelectedDate('');
    setStartTime('');
    setEndTime('');
    setPeopleCount('1');
    setContactName('');
    setContactPhone('');
    setNotes('');
    setStep(1);
  };
  
  // 当模态框关闭时重置表单
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">预约空间</h3>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* 步骤指示器 */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
                <span className="text-xs mt-1">选择时间</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              <div className="flex flex-col items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
                <span className="text-xs mt-1">填写信息</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
              <div className="flex flex-col items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>3</div>
                <span className="text-xs mt-1">确认预订</span>
              </div>
            </div>
          </div>
          
          {/* 步骤1：选择时间 */}
          {step === 1 && (
            <>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">{spaceInfo.name}</h4>
                <p className="text-gray-600 text-sm mb-1">位置: {spaceInfo.location}</p>
                <p className="text-gray-600 text-sm mb-1">类型: {spaceInfo.type}</p>
                <p className="text-gray-600 text-sm">价格: {spaceInfo.price}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">预约日期</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">开始时间</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    >
                      <option value="">请选择</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">结束时间</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    >
                      <option value="">请选择</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                      <option value="19:00">19:00</option>
                      <option value="20:00">20:00</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">人数</label>
                  <select 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(e.target.value)}
                  >
                    <option value="1">1人</option>
                    <option value="2">2人</option>
                    <option value="3">3人</option>
                    <option value="4">4人</option>
                    <option value="5">5人</option>
                    <option value="6">6人</option>
                    <option value="8">8人</option>
                    <option value="10">10人</option>
                    <option value="15">15人</option>
                    <option value="20">20人以上</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  下一步
                </button>
              </div>
            </>
          )}
          
          {/* 步骤2：填写信息 */}
          {step === 2 && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">联系人姓名</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="请输入姓名"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
                  <input 
                    type="tel" 
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="请输入手机号码"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
                  <textarea 
                    className="w-full border border-gray-300 rounded-md px-3 py-2 h-20"
                    placeholder="请填写额外需求或注意事项..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button 
                  onClick={handlePrevStep}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  上一步
                </button>
                <button 
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  下一步
                </button>
              </div>
            </>
          )}
          
          {/* 步骤3：确认预订 */}
          {step === 3 && (
            <>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium text-gray-900 mb-3">预订详情</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">空间:</span>
                    <span className="font-medium">{spaceInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">位置:</span>
                    <span>{spaceInfo.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">日期:</span>
                    <span>{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">时间:</span>
                    <span>{`${startTime} - ${endTime}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">时长:</span>
                    <span>{calculateDuration()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">人数:</span>
                    <span>{`${peopleCount}人`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">联系人:</span>
                    <span>{contactName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">联系电话:</span>
                    <span>{contactPhone}</span>
                  </div>
                  {notes && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">备注:</span>
                      <span className="max-w-[70%] text-right">{notes}</span>
                    </div>
                  )}
                  <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between font-medium">
                    <span>总价:</span>
                    <span className="text-indigo-600">{calculatePrice()}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                <p className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>请确认以上信息准确无误，提交后可在"我的预约"中查看</span>
                </p>
                <p className="flex items-start mt-1">
                  <span className="mr-2">•</span>
                  <span>预约成功后可在24小时内免费取消</span>
                </p>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button 
                  onClick={handlePrevStep}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  disabled={isSubmitting}
                >
                  上一步
                </button>
                <button 
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      处理中...
                    </>
                  ) : '确认预订'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// 预订详情查看模态框组件
const BookingDetailModal: React.FC<BookingDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  booking,
  onCancel,
  onRate
}) => {
  if (!isOpen) return null;
  
  const canCancel = ['已确认', '待审核', '已支付'].includes(booking.status);
  const canRate = ['已使用', '已完成'].includes(booking.status);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">预约详情</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900">{booking.spaceName}</h4>
              <span className={`px-2 py-1 text-xs rounded-full font-medium 
                ${booking.status === '已确认' || booking.status === '已完成' ? 'bg-green-100 text-green-800' : 
                  booking.status === '待审核' ? 'bg-yellow-100 text-yellow-800' : 
                  booking.status === '已支付' ? 'bg-blue-100 text-blue-800' : 
                  'bg-gray-100 text-gray-800'}
              `}>
                {booking.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">预订编号:</span>
                <span>{booking.bookingCode || `BK${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">位置:</span>
                <span>{booking.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">时间:</span>
                <span>{booking.dateTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">时长:</span>
                <span>{booking.duration}</span>
              </div>
              {booking.contactPerson && (
                <div className="flex justify-between">
                  <span className="text-gray-600">联系人:</span>
                  <span>{booking.contactPerson}</span>
                </div>
              )}
              {booking.notes && (
                <div className="flex justify-between">
                  <span className="text-gray-600">备注:</span>
                  <span className="max-w-[70%] text-right">{booking.notes}</span>
                </div>
              )}
              <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between font-medium">
                <span>费用:</span>
                <span className="text-indigo-600">{booking.price}</span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mb-4">
            {canCancel && (
              <p className="flex items-start">
                <span className="mr-2">•</span>
                <span>您可以在使用前24小时取消预约并获得全额退款</span>
              </p>
            )}
            {canRate && (
              <p className="flex items-start mt-1">
                <span className="mr-2">•</span>
                <span>欢迎对使用过的空间进行评价，帮助改进服务</span>
              </p>
            )}
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              关闭
            </button>
            
            {canCancel && onCancel && (
              <button 
                onClick={onCancel}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                取消预约
              </button>
            )}
            
            {canRate && onRate && (
              <button 
                onClick={onRate}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                评价
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 空间预约占位符组件
 * 用于展示空间预约功能、可用空间列表和预约记录
 */
const SpaceBookingPlaceholder: React.FC<SpaceBookingPlaceholderProps> = ({
  bookingCount = 3,
  withFilters = true,
  spaceType = 'all',
  showAvailabilityCalendar = true,
  showBookingRecords = true,
  isHistoryView = false
}) => {
  // 状态管理
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isBookingDetailModalOpen, setIsBookingDetailModalOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState({
    id: 0,
    name: '',
    location: '',
    type: '',
    price: '',
    size: '',
    timeSlots: ''
  });
  const [selectedBooking, setSelectedBooking] = useState({
    id: 0,
    spaceName: '',
    location: '',
    dateTime: '',
    duration: '',
    status: '',
    price: '',
  });
  
  // 筛选条件状态
  const [cityFilter, setCityFilter] = useState('全部城市');
  const [priceSort, setPriceSort] = useState('default'); // default, asc, desc
  const [searchQuery, setSearchQuery] = useState('');
  const [facilityFilters, setFacilityFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // 打开预订模态框
  const openBookingModal = (space: any) => {
    setSelectedSpace(space);
    setIsModalOpen(true);
  };
  
  // 打开空间详情模态框
  const openDetailModal = (space: any) => {
    setSelectedSpace(space);
    setIsDetailModalOpen(true);
  };
  
  // 从详情页打开预订模态框
  const handleBookFromDetail = () => {
    setIsDetailModalOpen(false);
    setIsModalOpen(true);
  };
  
  // 打开预约详情模态框
  const openBookingDetailModal = (booking: any) => {
    setSelectedBooking(booking);
    setIsBookingDetailModalOpen(true);
  };
  
  // 处理预约取消
  const handleCancelBooking = () => {
    // 模拟取消预约操作
    alert(`预约 ${selectedBooking.spaceName} 已取消`);
    setIsBookingDetailModalOpen(false);
  };
  
  // 处理评价
  const handleRateBooking = () => {
    // 模拟打开评价界面
    alert(`请为 ${selectedBooking.spaceName} 评分`);
    setIsBookingDetailModalOpen(false);
  };
  
  // 空间数据
  const spaces = [
    { id: 1, name: '创意工作室A', location: '上海市静安区', type: '共享工作室', size: '50㎡', price: '¥200/小时', timeSlots: '9:00-22:00', image: '', facilities: ['高速WiFi', '白板', '投影仪'] },
    { id: 2, name: '摄影棚B', location: '北京市朝阳区', type: '共享工作室', size: '80㎡', price: '¥350/小时', timeSlots: '8:00-20:00', image: '', facilities: ['摄影设备', '灯光', '背景布'] },
    { id: 3, name: '展览空间C', location: '深圳市南山区', type: '共享工作室', size: '120㎡', price: '¥500/小时', timeSlots: '10:00-21:00', image: '', facilities: ['高速WiFi', '展示墙', '灯光系统'] },
    { id: 4, name: '独立办公室A', location: '上海市浦东新区', type: '办公室', size: '40㎡', price: '¥450/小时', timeSlots: '全天候', image: '', facilities: ['独立空调', '会议桌', '保密环境'] },
    { id: 5, name: '团队办公室B', location: '广州市天河区', type: '办公室', size: '100㎡', price: '¥800/小时', timeSlots: '8:00-21:00', image: '', facilities: ['投影仪', '白板', '茶水间'] },
    { id: 6, name: '小型会议室A', location: '上海市黄浦区', type: '会议室', size: '30㎡', price: '¥300/小时', timeSlots: '9:00-18:00', image: '', facilities: ['投影仪', '白板', '视频会议'] },
    { id: 7, name: '多功能会议室B', location: '北京市海淀区', type: '会议室', size: '60㎡', price: '¥400/小时', timeSlots: '8:30-20:30', image: '', facilities: ['投影仪', '音响', 'LED大屏'] },
    { id: 8, name: '大型会议厅C', location: '深圳市福田区', type: '会议室', size: '150㎡', price: '¥600/小时', timeSlots: '9:00-19:00', image: '', facilities: ['音响系统', '舞台', '多媒体'] },
  ];
  
  // 预约记录数据
  const currentBookings = [
    { id: 1, spaceName: '创意工作室A', location: '上海市静安区', dateTime: '2024/08/15 14:00-18:00', duration: '4小时', status: '已确认', price: '¥800', bookingCode: 'BK102435' },
    { id: 2, spaceName: '高级会议室B', location: '上海市徐汇区', dateTime: '2024/08/20 09:00-12:00', duration: '3小时', status: '待审核', price: '¥1,200', bookingCode: 'BK102436' },
    { id: 3, spaceName: '独立办公室C', location: '上海市浦东新区', dateTime: '2024/09/05 10:00-17:00', duration: '7小时', status: '已支付', price: '¥3,500', bookingCode: 'BK102437' },
  ];
  
  const historyBookings = [
    { id: 4, spaceName: '摄影棚B', location: '北京市朝阳区', dateTime: '2024/07/20 09:00-12:00', duration: '3小时', status: '已使用', price: '¥1,050', bookingCode: 'BK102438' },
    { id: 5, spaceName: '小型会议室A', location: '上海市黄浦区', dateTime: '2024/07/10 13:00-15:00', duration: '2小时', status: '已使用', price: '¥600', bookingCode: 'BK102439' },
    { id: 6, spaceName: '共享工作桌A', location: '上海市长宁区', dateTime: '2024/06/25 09:00-18:00', duration: '9小时', status: '已完成', price: '¥450', bookingCode: 'BK102440' },
  ];
  
  // 根据条件筛选空间
  const filteredSpaces = spaces
    .filter(space => {
      // 根据空间类型筛选
      if (spaceType !== 'all') {
        if (spaceType === 'studio' && space.type !== '共享工作室') return false;
        if (spaceType === 'office' && space.type !== '办公室') return false;
        if (spaceType === 'meeting' && space.type !== '会议室') return false;
      }
      
      // 根据城市筛选
      if (cityFilter !== '全部城市' && !space.location.includes(cityFilter)) return false;
      
      // 根据搜索词筛选
      if (searchQuery && !space.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !space.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      // 根据设施筛选
      if (facilityFilters.length > 0 && !facilityFilters.some(filter => space.facilities.includes(filter))) return false;
      
      return true;
    })
    .sort((a, b) => {
      // 根据价格排序
      if (priceSort === 'asc') {
        return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
      } else if (priceSort === 'desc') {
        return parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''));
      }
      return 0;
    });

  // 设施选项
  const facilityOptions = [
    '高速WiFi', '投影仪', '白板', '音响系统', '视频会议', '茶水服务', '舒适座椅', '独立空调'
  ];

  return (
    <Placeholder 
      title={spaceType !== 'all' ? `[${spaceTypeData[spaceType].name}占位符]` : "[空间预约功能占位符]"}
      description={spaceType !== 'all' ? spaceTypeData[spaceType].description : "例如：创意空间预约、工作室租赁、会议室查询等。"}
      height="min-h-[600px]"
      className="p-0 overflow-hidden"
    >
      <div className="p-6">
        {/* 顶部卡片指标 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">进行中预约</div>
                <div className="text-2xl font-semibold text-gray-800">{currentBookings.length}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-green-500 font-medium flex items-center">
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                1
              </span>
              <span className="ml-2">本周新增</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">可用空间</div>
                <div className="text-2xl font-semibold text-gray-800">{filteredSpaces.length}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-gray-500 font-medium flex items-center">
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                5个城市
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-gray-500 text-sm mb-1">历史预约</div>
                <div className="text-2xl font-semibold text-gray-800">{historyBookings.length}</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-gray-500 font-medium">
                总使用时长: 14小时
              </span>
            </div>
          </div>
        </div>
        
        {/* 筛选选项 */}
        {withFilters && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-4 md:justify-between items-center">
              <div className="flex space-x-1">
                <button 
                  className={`px-4 py-2 rounded-l-lg text-sm ${spaceType === 'all' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
                >
                  全部空间
                </button>
                <button 
                  className={`px-4 py-2 text-sm ${spaceType === 'studio' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
                >
                  共享工作室
                </button>
                <button 
                  className={`px-4 py-2 text-sm ${spaceType === 'office' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
                >
                  办公室
                </button>
                <button 
                  className={`px-4 py-2 rounded-r-lg text-sm ${spaceType === 'meeting' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-300 text-gray-700'}`}
                >
                  会议室
                </button>
              </div>
              
              <div className="flex space-x-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    placeholder="搜索空间..." 
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <button 
                  className={`px-4 py-2 border rounded-lg text-sm flex items-center ${showFilters ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'bg-white border-gray-300 text-gray-700'}`}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  筛选
                </button>
              </div>
            </div>
            
            {/* 展开的筛选面板 */}
            {showFilters && (
              <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">城市</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                    >
                      {cityOptions.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">价格排序</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      value={priceSort}
                      onChange={(e) => setPriceSort(e.target.value)}
                    >
                      <option value="default">默认排序</option>
                      <option value="asc">价格从低到高</option>
                      <option value="desc">价格从高到低</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">设施条件</label>
                    <div className="flex flex-wrap gap-2">
                      {facilityOptions.slice(0, 4).map((facility) => (
                        <button
                          key={facility}
                          className={`px-3 py-1 text-xs rounded-full ${facilityFilters.includes(facility) ? 'bg-indigo-100 text-indigo-700 border border-indigo-300' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}
                          onClick={() => {
                            if (facilityFilters.includes(facility)) {
                              setFacilityFilters(facilityFilters.filter(f => f !== facility));
                            } else {
                              setFacilityFilters([...facilityFilters, facility]);
                            }
                          }}
                        >
                          {facility}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* 空间类型信息 */}
        {spaceType !== 'all' && (
          <div className="mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
              <h3 className="text-base font-medium text-gray-800 mb-3">{spaceTypeData[spaceType].name}概览</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">价格区间</div>
                    <div className="font-medium">{spaceTypeData[spaceType].priceRange}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">容纳人数</div>
                    <div className="font-medium">{spaceTypeData[spaceType].capacity}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-2">特色设施</div>
                  <div className="flex flex-wrap gap-2">
                    {spaceTypeData[spaceType].features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 推荐空间 */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            {filteredSpaces.length > 0 ? '推荐空间' : '没有找到符合条件的空间'}
          </h3>
          
          {filteredSpaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredSpaces.slice(0, 3).map((space) => (
                <div key={`recommend-${space.id}`} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-lg text-gray-800">
                      {space.name}
                    </h4>
                    <p className="text-gray-500 text-sm mb-2">
                      {space.location}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {space.type}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        {space.size}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                        {space.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">可用时段: {space.timeSlots}</div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => openDetailModal(space)}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                        >
                          详情
                        </button>
                        <button 
                          onClick={() => openBookingModal(space)}
                          className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
                        >
                          预约
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <svg className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-gray-500 text-lg mb-2">没有找到符合条件的空间</h4>
              <p className="text-gray-400 mb-4">请尝试调整筛选条件或搜索关键词</p>
              <button 
                onClick={() => {
                  setCityFilter('全部城市');
                  setPriceSort('default');
                  setSearchQuery('');
                  setFacilityFilters([]);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm"
              >
                重置筛选条件
              </button>
            </div>
          )}
        </div>
        
        {/* 可用时间日历 */}
        {showAvailabilityCalendar && filteredSpaces.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">空间可用时间</h3>
            
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      空间名称
                    </th>
                    {Array.from({ length: 7 }).map((_, index) => {
                      const date = new Date();
                      date.setDate(date.getDate() + index);
                      return (
                        <th key={index} className="px-4 py-2 border-b-2 border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {date.getMonth() + 1}/{date.getDate()}<br/>
                          {['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {filteredSpaces.slice(0, 5).map((space, index) => (
                    <tr key={`time-${space.id}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 border-b border-gray-200 text-sm text-gray-900">
                        <div className="flex items-center">
                          <span className="font-medium">{space.name}</span>
                          <span className="ml-2 text-xs text-gray-500">({space.location})</span>
                        </div>
                      </td>
                      {Array.from({ length: 7 }).map((_, dayIndex) => {
                        // 随机生成可用状态
                        const availability = Math.random() > 0.3;
                        return (
                          <td key={`${space.id}-${dayIndex}`} className="px-4 py-3 border-b border-gray-200 text-center">
                            {availability ? (
                              <button 
                                onClick={() => openBookingModal(space)}
                                className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 hover:bg-green-200"
                              >
                                可预约
                              </button>
                            ) : (
                              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                已预约
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* 我的预约记录 */}
        {showBookingRecords && (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              {isHistoryView ? '历史预约' : '我的预约'}
            </h3>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">空间名称</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">预约时间</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时长</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">费用</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(isHistoryView ? historyBookings : currentBookings).slice(0, bookingCount).map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{booking.spaceName}</div>
                          <div className="text-xs text-gray-500 ml-2">({booking.location})</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.dateTime}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.duration}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${booking.status === '已确认' || booking.status === '已完成' ? 'bg-green-100 text-green-800' : 
                            booking.status === '待审核' ? 'bg-yellow-100 text-yellow-800' : 
                            booking.status === '已支付' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'}
                        `}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => openBookingDetailModal(booking)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            查看
                          </button>
                          {!isHistoryView && ['已确认', '待审核', '已支付'].includes(booking.status) && (
                            <button 
                              onClick={() => {
                                setSelectedBooking(booking);
                                handleCancelBooking();
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              取消
                            </button>
                          )}
                          {isHistoryView && ['已使用', '已完成'].includes(booking.status) && !booking.status.includes('已评价') && (
                            <button 
                              onClick={() => {
                                setSelectedBooking(booking);
                                handleRateBooking();
                              }}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              评价
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* 模态框组件 */}
        <BookingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          spaceInfo={selectedSpace}
        />
        
        <SpaceDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          onBook={handleBookFromDetail}
          spaceInfo={selectedSpace}
        />
        
        <BookingDetailModal
          isOpen={isBookingDetailModalOpen}
          onClose={() => setIsBookingDetailModalOpen(false)}
          booking={selectedBooking}
          onCancel={!isHistoryView && ['已确认', '待审核', '已支付'].includes(selectedBooking.status) ? handleCancelBooking : undefined}
          onRate={isHistoryView && ['已使用', '已完成'].includes(selectedBooking.status) ? handleRateBooking : undefined}
        />
      </div>
    </Placeholder>
  );
};

export default SpaceBookingPlaceholder; 