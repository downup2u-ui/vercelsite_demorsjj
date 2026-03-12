// 打印材料数据
export interface PrintMaterial {
  id: string;
  name: string;
  description: string;
  properties: string[];
  pricePerGram: number;
  minThickness: number; // 最小厚度，单位mm
  maxThickness: number; // 最大厚度，单位mm
  colors: string[];
  applications: string[];
  image: string;
  inStock: boolean;
  estimatedDeliveryDays: number;
}

// 打印服务订单状态
export type PrintOrderStatus = 
  | 'pending_payment' // 待支付
  | 'processing' // 处理中
  | 'printing' // 打印中
  | 'post_processing' // 后处理中
  | 'quality_check' // 质量检查
  | 'packaging' // 包装中
  | 'shipped' // 已发货
  | 'delivered' // 已送达
  | 'completed' // 已完成
  | 'cancelled' // 已取消
  | 'refunded'; // 已退款

// 打印服务订单
export interface PrintOrder {
  id: string;
  userId: string;
  modelId: string;
  modelName: string;
  materialId: string;
  materialName: string;
  quantity: number;
  size: {
    width: number; // 宽度，单位mm
    height: number; // 高度，单位mm
    depth: number; // 深度，单位mm
  };
  weight: number; // 重量，单位g
  color: string;
  price: {
    materialCost: number;
    printingCost: number;
    postProcessingCost: number;
    shippingCost: number;
    discount: number;
    total: number;
  };
  status: PrintOrderStatus;
  statusHistory: {
    status: PrintOrderStatus;
    timestamp: string;
    note?: string;
  }[];
  hasRFID: boolean;
  rfidCode?: string;
  createdAt: string;
  estimatedCompletionDate: string;
  completedAt?: string;
  shippingAddress?: {
    name: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
  };
  trackingNumber?: string;
  notes?: string;
}

// 3D打印模型
export interface PrintModel {
  id: string;
  name: string;
  description: string;
  userId: string;
  userName: string;
  fileUrl: string;
  previewImage: string;
  fileFormat: string;
  fileSize: number; // 文件大小，单位KB
  dimensions: {
    width: number; // 宽度，单位mm
    height: number; // 高度，单位mm
    depth: number; // 深度，单位mm
  };
  estimatedWeight: number; // 估计重量，单位g
  estimatedPrintTime: number; // 估计打印时间，单位分钟
  recommendedMaterials: string[]; // 推荐材料ID列表
  tags: string[];
  isPublic: boolean; // 是否公开
  uploadedAt: string;
  lastModified: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewNote?: string;
}

// 打印材料数据
export const printMaterials: PrintMaterial[] = [
  {
    id: '1',
    name: 'PLA',
    description: '聚乳酸（PLA）是一种生物可降解的热塑性塑料，由可再生资源（如玉米淀粉）制成。它是最常用的3D打印材料之一，易于打印，几乎没有翘曲，无需加热床。',
    properties: ['生物可降解', '易于打印', '低翘曲', '环保', '中等强度'],
    pricePerGram: 0.2,
    minThickness: 0.1,
    maxThickness: 0.4,
    colors: ['白色', '黑色', '灰色', '红色', '蓝色', '绿色', '黄色', '透明'],
    applications: ['原型设计', '概念模型', '艺术品', '教育用品', '低应力部件'],
    image: '/images/materials/pla.jpg',
    inStock: true,
    estimatedDeliveryDays: 3
  },
  {
    id: '2',
    name: 'ABS',
    description: '丙烯腈丁二烯苯乙烯（ABS）是一种坚固、耐用的热塑性塑料。它比PLA更坚固，更耐热，但打印时可能会有轻微的翘曲和收缩。需要加热床和良好的通风。',
    properties: ['高强度', '耐热性好', '耐冲击', '可后处理', '轻微翘曲'],
    pricePerGram: 0.25,
    minThickness: 0.1,
    maxThickness: 0.4,
    colors: ['白色', '黑色', '灰色', '红色', '蓝色', '绿色', '黄色'],
    applications: ['功能性原型', '工具', '汽车零部件', '电子设备外壳', '玩具'],
    image: '/images/materials/abs.jpg',
    inStock: true,
    estimatedDeliveryDays: 3
  },
  {
    id: '3',
    name: 'PETG',
    description: '聚对苯二甲酸乙二醇酯（PETG）结合了PLA的易用性和ABS的耐用性。它具有良好的强度、韧性和耐化学性，几乎没有翘曲和收缩。',
    properties: ['高强度', '高韧性', '耐化学性', '低翘曲', '食品安全'],
    pricePerGram: 0.3,
    minThickness: 0.1,
    maxThickness: 0.4,
    colors: ['白色', '黑色', '灰色', '透明', '半透明蓝', '半透明绿'],
    applications: ['食品容器', '机械部件', '水密容器', '医疗设备', '户外用品'],
    image: '/images/materials/petg.jpg',
    inStock: true,
    estimatedDeliveryDays: 4
  },
  {
    id: '4',
    name: 'TPU',
    description: '热塑性聚氨酯（TPU）是一种柔性材料，具有橡胶般的特性。它非常耐用，有弹性，抗冲击性强，但打印速度较慢。',
    properties: ['柔性', '高弹性', '耐磨', '抗冲击', '抗油脂'],
    pricePerGram: 0.4,
    minThickness: 0.2,
    maxThickness: 0.6,
    colors: ['白色', '黑色', '灰色', '透明', '红色', '蓝色'],
    applications: ['手机壳', '鞋底', '密封件', '减震部件', '柔性连接器'],
    image: '/images/materials/tpu.jpg',
    inStock: true,
    estimatedDeliveryDays: 5
  },
  {
    id: '5',
    name: '尼龙（Nylon）',
    description: '尼龙是一种强韧、耐用的工程塑料，具有出色的层间粘合性和耐磨性。它适合打印需要高强度和耐用性的功能部件。',
    properties: ['高强度', '高韧性', '耐磨', '低摩擦系数', '耐化学性'],
    pricePerGram: 0.5,
    minThickness: 0.15,
    maxThickness: 0.4,
    colors: ['白色', '黑色', '自然色'],
    applications: ['功能性零件', '齿轮', '轴承', '工具', '机械部件'],
    image: '/images/materials/nylon.jpg',
    inStock: true,
    estimatedDeliveryDays: 5
  },
  {
    id: '6',
    name: '树脂（Resin）',
    description: '光敏树脂用于SLA/DLP 3D打印，可以实现极高的精度和细节。打印件表面光滑，但相对脆弱，需要后固化处理。',
    properties: ['高精度', '细节表现好', '表面光滑', '相对脆弱', '需要后处理'],
    pricePerGram: 0.6,
    minThickness: 0.05,
    maxThickness: 0.2,
    colors: ['透明', '白色', '黑色', '灰色', '蓝色', '绿色', '红色'],
    applications: ['珠宝模型', '牙科模型', '高精度原型', '小型雕塑', '模型套件'],
    image: '/images/materials/resin.jpg',
    inStock: true,
    estimatedDeliveryDays: 6
  },
  {
    id: '7',
    name: '金属填充PLA',
    description: '金属填充PLA含有金属粉末（如铜、黄铜、青铜或不锈钢），打印件具有金属般的外观和重量，可以抛光以增强金属效果。',
    properties: ['金属外观', '较重', '可抛光', '易于打印', '装饰性强'],
    pricePerGram: 0.7,
    minThickness: 0.1,
    maxThickness: 0.4,
    colors: ['铜色', '黄铜色', '青铜色', '不锈钢色', '铁色'],
    applications: ['艺术品', '雕塑', '装饰品', '首饰', '展示模型'],
    image: '/images/materials/metal-filled-pla.jpg',
    inStock: true,
    estimatedDeliveryDays: 7
  },
  {
    id: '8',
    name: '碳纤维填充尼龙',
    description: '碳纤维填充尼龙结合了尼龙的韧性和碳纤维的刚性，创造出轻量但极其坚固的打印件。适合需要高强度和低重量的应用。',
    properties: ['高强度', '轻量', '刚性好', '尺寸稳定性', '耐热性'],
    pricePerGram: 0.9,
    minThickness: 0.15,
    maxThickness: 0.4,
    colors: ['黑色'],
    applications: ['无人机部件', '赛车零件', '机器人组件', '工程原型', '高性能工具'],
    image: '/images/materials/carbon-fiber-nylon.jpg',
    inStock: true,
    estimatedDeliveryDays: 7
  },
  {
    id: '9',
    name: '陶瓷填充PLA',
    description: '陶瓷填充PLA含有陶瓷粉末，打印件具有陶瓷般的外观和质感。可以用于装饰性物品和艺术作品。',
    properties: ['陶瓷外观', '装饰性强', '可上釉', '易于打印', '中等强度'],
    pricePerGram: 0.65,
    minThickness: 0.1,
    maxThickness: 0.4,
    colors: ['白色', '米色', '浅蓝色'],
    applications: ['艺术品', '花瓶', '装饰品', '雕塑', '概念模型'],
    image: '/images/materials/ceramic-pla.jpg',
    inStock: false,
    estimatedDeliveryDays: 14
  },
  {
    id: '10',
    name: '钛合金',
    description: '钛合金是一种高强度、轻量的金属材料，通过金属3D打印（如DMLS或SLM）制造。适合航空航天、医疗和高性能应用。',
    properties: ['极高强度', '轻量', '耐腐蚀', '生物相容性', '耐高温'],
    pricePerGram: 5.0,
    minThickness: 0.2,
    maxThickness: 1.0,
    colors: ['金属银灰色'],
    applications: ['航空航天部件', '医疗植入物', '高性能机械部件', '热交换器', '定制工具'],
    image: '/images/materials/titanium.jpg',
    inStock: false,
    estimatedDeliveryDays: 21
  }
];

// 示例3D打印模型数据
export const printModels: PrintModel[] = [
  {
    id: '1',
    name: '机械齿轮组',
    description: '一组互锁的机械齿轮，可用于教育演示或机械原型设计。',
    userId: '1',
    userName: '张设计',
    fileUrl: '/models/mechanical-gears.stl',
    previewImage: '/images/models/mechanical-gears.jpg',
    fileFormat: 'STL',
    fileSize: 2560,
    dimensions: {
      width: 100,
      height: 30,
      depth: 100
    },
    estimatedWeight: 120,
    estimatedPrintTime: 180,
    recommendedMaterials: ['1', '2', '3', '5', '8'],
    tags: ['机械', '齿轮', '教育', '工程'],
    isPublic: true,
    uploadedAt: '2024-01-15',
    lastModified: '2024-01-15',
    status: 'approved'
  },
  {
    id: '2',
    name: '建筑模型 - 现代住宅',
    description: '现代风格住宅的精细建筑模型，适合建筑展示和教育用途。',
    userId: '1',
    userName: '张设计',
    fileUrl: '/models/modern-house.stl',
    previewImage: '/images/models/modern-house.jpg',
    fileFormat: 'STL',
    fileSize: 4280,
    dimensions: {
      width: 150,
      height: 80,
      depth: 120
    },
    estimatedWeight: 230,
    estimatedPrintTime: 360,
    recommendedMaterials: ['1', '6', '9'],
    tags: ['建筑', '住宅', '模型', '设计'],
    isPublic: true,
    uploadedAt: '2024-02-05',
    lastModified: '2024-02-10',
    status: 'approved'
  },
  {
    id: '3',
    name: '医疗教学模型 - 心脏',
    description: '详细的人体心脏解剖模型，适合医学教育和演示。',
    userId: '6',
    userName: '王医生',
    fileUrl: '/models/heart-anatomy.stl',
    previewImage: '/images/models/heart-anatomy.jpg',
    fileFormat: 'STL',
    fileSize: 5120,
    dimensions: {
      width: 120,
      height: 120,
      depth: 120
    },
    estimatedWeight: 280,
    estimatedPrintTime: 420,
    recommendedMaterials: ['1', '3', '6'],
    tags: ['医疗', '解剖', '心脏', '教育'],
    isPublic: true,
    uploadedAt: '2024-01-20',
    lastModified: '2024-01-20',
    status: 'approved'
  },
  {
    id: '4',
    name: '无人机框架',
    description: '轻量化无人机框架，优化设计用于提高飞行性能和减轻重量。',
    userId: '8',
    userName: '林设计',
    fileUrl: '/models/drone-frame.stl',
    previewImage: '/images/models/drone-frame.jpg',
    fileFormat: 'STL',
    fileSize: 3450,
    dimensions: {
      width: 250,
      height: 60,
      depth: 250
    },
    estimatedWeight: 180,
    estimatedPrintTime: 300,
    recommendedMaterials: ['5', '8'],
    tags: ['无人机', '航空', '轻量化', '框架'],
    isPublic: true,
    uploadedAt: '2024-02-15',
    lastModified: '2024-02-15',
    status: 'approved'
  },
  {
    id: '5',
    name: '定制化手机支架',
    description: '可调节角度的手机支架，适合桌面使用。',
    userId: '3',
    userName: '王用户',
    fileUrl: '/models/phone-stand.stl',
    previewImage: '/images/models/phone-stand.jpg',
    fileFormat: 'STL',
    fileSize: 1280,
    dimensions: {
      width: 80,
      height: 100,
      depth: 120
    },
    estimatedWeight: 90,
    estimatedPrintTime: 150,
    recommendedMaterials: ['1', '2', '3', '4'],
    tags: ['手机', '支架', '办公', '实用'],
    isPublic: true,
    uploadedAt: '2024-03-01',
    lastModified: '2024-03-01',
    status: 'approved'
  },
  {
    id: '6',
    name: '艺术雕塑 - 抽象形态',
    description: '现代抽象艺术雕塑，具有流动的曲线和复杂的几何形状。',
    userId: '4',
    userName: '赵艺术',
    fileUrl: '/models/abstract-sculpture.stl',
    previewImage: '/images/models/abstract-sculpture.jpg',
    fileFormat: 'STL',
    fileSize: 3840,
    dimensions: {
      width: 150,
      height: 200,
      depth: 150
    },
    estimatedWeight: 320,
    estimatedPrintTime: 480,
    recommendedMaterials: ['1', '6', '7', '9'],
    tags: ['艺术', '雕塑', '抽象', '装饰'],
    isPublic: true,
    uploadedAt: '2024-02-20',
    lastModified: '2024-02-20',
    status: 'approved'
  },
  {
    id: '7',
    name: '定制化假肢组件',
    description: '定制化假肢接口组件，设计用于提高舒适度和功能性。',
    userId: '6',
    userName: '王医生',
    fileUrl: '/models/prosthetic-component.stl',
    previewImage: '/images/models/prosthetic-component.jpg',
    fileFormat: 'STL',
    fileSize: 2890,
    dimensions: {
      width: 100,
      height: 150,
      depth: 100
    },
    estimatedWeight: 160,
    estimatedPrintTime: 240,
    recommendedMaterials: ['3', '5', '8'],
    tags: ['医疗', '假肢', '辅助设备', '定制化'],
    isPublic: false,
    uploadedAt: '2024-01-25',
    lastModified: '2024-01-30',
    status: 'approved'
  },
  {
    id: '8',
    name: '教育用天文模型 - 太阳系',
    description: '太阳系行星模型套装，适合教育和展示用途。',
    userId: '2',
    userName: '李程序',
    fileUrl: '/models/solar-system.stl',
    previewImage: '/images/models/solar-system.jpg',
    fileFormat: 'STL',
    fileSize: 6400,
    dimensions: {
      width: 300,
      height: 300,
      depth: 300
    },
    estimatedWeight: 450,
    estimatedPrintTime: 720,
    recommendedMaterials: ['1', '6', '7'],
    tags: ['教育', '天文', '太阳系', '科学'],
    isPublic: true,
    uploadedAt: '2024-02-10',
    lastModified: '2024-02-10',
    status: 'pending'
  }
];

// 示例打印订单数据
export const printOrders: PrintOrder[] = [
  {
    id: '1',
    userId: '1',
    modelId: '1',
    modelName: '机械齿轮组',
    materialId: '2',
    materialName: 'ABS',
    quantity: 1,
    size: {
      width: 100,
      height: 30,
      depth: 100
    },
    weight: 120,
    color: '黑色',
    price: {
      materialCost: 120 * 0.25,
      printingCost: 80,
      postProcessingCost: 20,
      shippingCost: 15,
      discount: 0,
      total: 120 * 0.25 + 80 + 20 + 15
    },
    status: 'completed',
    statusHistory: [
      {
        status: 'pending_payment',
        timestamp: '2024-01-20T10:00:00Z'
      },
      {
        status: 'processing',
        timestamp: '2024-01-20T10:30:00Z'
      },
      {
        status: 'printing',
        timestamp: '2024-01-21T09:00:00Z'
      },
      {
        status: 'post_processing',
        timestamp: '2024-01-21T12:30:00Z'
      },
      {
        status: 'quality_check',
        timestamp: '2024-01-21T14:00:00Z'
      },
      {
        status: 'packaging',
        timestamp: '2024-01-21T15:00:00Z'
      },
      {
        status: 'shipped',
        timestamp: '2024-01-22T10:00:00Z',
        note: '已通过顺丰快递发出'
      },
      {
        status: 'delivered',
        timestamp: '2024-01-23T14:30:00Z'
      },
      {
        status: 'completed',
        timestamp: '2024-01-24T09:00:00Z'
      }
    ],
    hasRFID: true,
    rfidCode: 'RF2401200001',
    createdAt: '2024-01-20T10:00:00Z',
    estimatedCompletionDate: '2024-01-23',
    completedAt: '2024-01-24T09:00:00Z',
    shippingAddress: {
      name: '张设计',
      phone: '13800138000',
      address: '科技园路88号创意大厦A座1001室',
      city: '深圳市',
      province: '广东省',
      postalCode: '518000'
    },
    trackingNumber: 'SF1234567890'
  },
  {
    id: '2',
    userId: '3',
    modelId: '5',
    modelName: '定制化手机支架',
    materialId: '1',
    materialName: 'PLA',
    quantity: 2,
    size: {
      width: 80,
      height: 100,
      depth: 120
    },
    weight: 90,
    color: '蓝色',
    price: {
      materialCost: 90 * 0.2 * 2,
      printingCost: 60 * 2,
      postProcessingCost: 10 * 2,
      shippingCost: 15,
      discount: 20,
      total: 90 * 0.2 * 2 + 60 * 2 + 10 * 2 + 15 - 20
    },
    status: 'shipped',
    statusHistory: [
      {
        status: 'pending_payment',
        timestamp: '2024-03-05T14:00:00Z'
      },
      {
        status: 'processing',
        timestamp: '2024-03-05T14:30:00Z'
      },
      {
        status: 'printing',
        timestamp: '2024-03-06T09:00:00Z'
      },
      {
        status: 'post_processing',
        timestamp: '2024-03-06T11:00:00Z'
      },
      {
        status: 'quality_check',
        timestamp: '2024-03-06T12:00:00Z'
      },
      {
        status: 'packaging',
        timestamp: '2024-03-06T13:30:00Z'
      },
      {
        status: 'shipped',
        timestamp: '2024-03-07T10:00:00Z',
        note: '已通过中通快递发出'
      }
    ],
    hasRFID: false,
    createdAt: '2024-03-05T14:00:00Z',
    estimatedCompletionDate: '2024-03-09',
    shippingAddress: {
      name: '王用户',
      phone: '13900139000',
      address: '中山路123号阳光小区B栋502室',
      city: '广州市',
      province: '广东省',
      postalCode: '510000'
    },
    trackingNumber: 'ZT9876543210'
  },
  {
    id: '3',
    userId: '6',
    modelId: '7',
    modelName: '定制化假肢组件',
    materialId: '5',
    materialName: '尼龙（Nylon）',
    quantity: 1,
    size: {
      width: 100,
      height: 150,
      depth: 100
    },
    weight: 160,
    color: '白色',
    price: {
      materialCost: 160 * 0.5,
      printingCost: 120,
      postProcessingCost: 50,
      shippingCost: 20,
      discount: 0,
      total: 160 * 0.5 + 120 + 50 + 20
    },
    status: 'printing',
    statusHistory: [
      {
        status: 'pending_payment',
        timestamp: '2024-03-20T09:00:00Z'
      },
      {
        status: 'processing',
        timestamp: '2024-03-20T09:30:00Z'
      },
      {
        status: 'printing',
        timestamp: '2024-03-21T10:00:00Z',
        note: '使用高精度设备打印中'
      }
    ],
    hasRFID: true,
    rfidCode: 'RF2403200001',
    createdAt: '2024-03-20T09:00:00Z',
    estimatedCompletionDate: '2024-03-25',
    shippingAddress: {
      name: '王医生',
      phone: '13700137000',
      address: '医院路56号康复中心',
      city: '上海市',
      province: '上海市',
      postalCode: '200000'
    }
  },
  {
    id: '4',
    userId: '4',
    modelId: '6',
    modelName: '艺术雕塑 - 抽象形态',
    materialId: '7',
    materialName: '金属填充PLA',
    quantity: 1,
    size: {
      width: 150,
      height: 200,
      depth: 150
    },
    weight: 320,
    color: '铜色',
    price: {
      materialCost: 320 * 0.7,
      printingCost: 180,
      postProcessingCost: 80,
      shippingCost: 30,
      discount: 50,
      total: 320 * 0.7 + 180 + 80 + 30 - 50
    },
    status: 'pending_payment',
    statusHistory: [
      {
        status: 'pending_payment',
        timestamp: '2024-03-25T16:00:00Z'
      }
    ],
    hasRFID: false,
    createdAt: '2024-03-25T16:00:00Z',
    estimatedCompletionDate: '2024-03-31',
    shippingAddress: {
      name: '赵艺术',
      phone: '13600136000',
      address: '艺术区创意园C区3号楼',
      city: '杭州市',
      province: '浙江省',
      postalCode: '310000'
    }
  }
];
