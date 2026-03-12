// 商业与交易功能数据模型
export interface Exhibition {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  type: 'online' | 'offline';
  startDate: string;
  endDate: string;
  location?: string;
  artworks: string[]; // 作品ID列表
  views: number;
  likes: number;
  comments: number;
  isMembersOnly: boolean;
  creator: string; // 创建者ID
}

export interface Order {
  id: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  client: string; // 客户ID
  designer?: string; // 设计师ID
  createdAt: string;
  updatedAt: string;
  attachments: string[];
  category: string;
  skills: string[];
}

export interface Client {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  tags: string[];
  notes: string;
  status: 'lead' | 'prospect' | 'customer' | 'inactive';
  lastContact: string;
  projects: string[]; // 项目ID列表
  createdAt: string;
}

export interface Auction {
  id: string;
  title: string;
  description: string;
  artwork: string; // 作品ID
  startingPrice: number;
  currentPrice: number;
  minIncrement: number;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'active' | 'ended';
  bids: Bid[];
  winner?: string; // 中标者ID
  createdBy: string; // 创建者ID
  coverImage: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  userId: string;
  userName: string;
  amount: number;
  timestamp: string;
}

// 示例数据
export const exhibitions: Exhibition[] = [
  {
    id: '1',
    title: '数字艺术的未来',
    description: '探索数字技术如何改变艺术创作和欣赏的方式，展示最前沿的数字艺术作品。',
    coverImage: '/images/high-quality/exhibitions/digital-art.jpg',
    type: 'online',
    startDate: '2025-04-01',
    endDate: '2025-04-30',
    artworks: ['1', '3', '5', '7'],
    views: 1240,
    likes: 328,
    comments: 47,
    isMembersOnly: false,
    creator: '1'
  },
  {
    id: '2',
    title: '传统与现代的碰撞',
    description: '这个展览展示了传统工艺与现代设计理念的融合，创造出独特的艺术表达。',
    coverImage: '/images/high-quality/exhibitions/traditional-modern.jpg',
    type: 'offline',
    location: '潮创共坊展览厅A',
    startDate: '2025-04-15',
    endDate: '2025-05-15',
    artworks: ['2', '4', '6', '8'],
    views: 860,
    likes: 215,
    comments: 32,
    isMembersOnly: true,
    creator: '2'
  },
  {
    id: '3',
    title: '可持续设计展',
    description: '关注环保与可持续发展的设计作品，展示如何通过创新设计解决环境问题。',
    coverImage: '/images/high-quality/exhibitions/sustainable-design.jpg',
    type: 'online',
    startDate: '2025-05-01',
    endDate: '2025-05-31',
    artworks: ['9', '10', '11', '12'],
    views: 950,
    likes: 276,
    comments: 38,
    isMembersOnly: false,
    creator: '3'
  },
  {
    id: '4',
    title: 'VIP会员专享：前沿设计趋势',
    description: '为VIP会员提供的独家展览，展示最新的设计趋势和创新理念。',
    coverImage: '/images/high-quality/exhibitions/vip-trends.jpg',
    type: 'offline',
    location: '潮创共坊VIP展厅',
    startDate: '2025-04-10',
    endDate: '2025-04-25',
    artworks: ['13', '14', '15', '16'],
    views: 420,
    likes: 185,
    comments: 27,
    isMembersOnly: true,
    creator: '1'
  }
];

export const orders: Order[] = [
  {
    id: '1',
    title: '企业品牌标识设计',
    description: '为一家科技初创公司设计现代、简洁的品牌标识，包括logo、名片和基础VI设计。',
    budget: '5,000-10,000元',
    deadline: '2025-04-30',
    status: 'open',
    client: '1',
    createdAt: '2025-03-15',
    updatedAt: '2025-03-15',
    attachments: ['/documents/brief-1.pdf'],
    category: '品牌设计',
    skills: ['Logo设计', 'VI设计', '品牌策略']
  },
  {
    id: '2',
    title: '电商平台UI/UX设计',
    description: '为移动端电商应用设计用户界面和用户体验，需要有电商设计经验。',
    budget: '15,000-20,000元',
    deadline: '2025-05-15',
    status: 'in_progress',
    client: '2',
    designer: '1',
    createdAt: '2025-03-10',
    updatedAt: '2025-03-20',
    attachments: ['/documents/brief-2.pdf', '/documents/wireframes.pdf'],
    category: 'UI/UX设计',
    skills: ['UI设计', 'UX设计', '移动应用设计', '电商设计']
  },
  {
    id: '3',
    title: '产品包装设计',
    description: '为有机食品品牌设计环保、吸引人的产品包装，强调自然和健康理念。',
    budget: '8,000-12,000元',
    deadline: '2025-04-20',
    status: 'completed',
    client: '3',
    designer: '2',
    createdAt: '2025-02-25',
    updatedAt: '2025-03-25',
    attachments: ['/documents/brief-3.pdf', '/documents/brand-guidelines.pdf'],
    category: '包装设计',
    skills: ['包装设计', '可持续设计', '插画']
  },
  {
    id: '4',
    title: '企业宣传册设计',
    description: '为金融服务公司设计专业、高端的企业宣传册，约20页，包括内容排版和图表设计。',
    budget: '10,000-15,000元',
    deadline: '2025-05-10',
    status: 'open',
    client: '4',
    createdAt: '2025-03-20',
    updatedAt: '2025-03-20',
    attachments: ['/documents/brief-4.pdf', '/documents/company-profile.pdf'],
    category: '印刷设计',
    skills: ['排版设计', '编辑设计', '信息图表']
  }
];

export const clients: Client[] = [
  {
    id: '1',
    name: '张技术',
    company: '未来科技有限公司',
    email: 'zhang@future-tech.com',
    phone: '13800138001',
    address: '北京市海淀区科技园路88号',
    avatar: '/avatars/client1.jpg',
    tags: ['科技', '初创', 'A轮融资'],
    notes: '对设计要求高，喜欢现代简约风格，决策快速。',
    status: 'customer',
    lastContact: '2025-03-20',
    projects: ['1', '5'],
    createdAt: '2024-10-15'
  },
  {
    id: '2',
    name: '李电商',
    company: '全球购物网络科技有限公司',
    email: 'li@globalshop.com',
    phone: '13900139001',
    address: '上海市浦东新区张江高科技园区',
    avatar: '/avatars/client2.jpg',
    tags: ['电商', '大型企业', '国际业务'],
    notes: '需要长期合作伙伴，项目规模大，流程规范。',
    status: 'customer',
    lastContact: '2025-03-18',
    projects: ['2', '6'],
    createdAt: '2024-09-20'
  },
  {
    id: '3',
    name: '王有机',
    company: '自然食品有限公司',
    email: 'wang@organic-food.com',
    phone: '13700137001',
    address: '成都市高新区天府大道',
    avatar: '/avatars/client3.jpg',
    tags: ['食品', '环保', '中型企业'],
    notes: '注重环保理念，产品定位高端有机市场。',
    status: 'customer',
    lastContact: '2025-03-15',
    projects: ['3'],
    createdAt: '2024-11-05'
  },
  {
    id: '4',
    name: '赵金融',
    company: '诚信金融服务集团',
    email: 'zhao@trustfinance.com',
    phone: '13600136001',
    avatar: '/avatars/client4.jpg',
    tags: ['金融', '大型企业', '传统行业'],
    notes: '保守稳健，决策流程长，注重专业形象。',
    status: 'prospect',
    lastContact: '2025-03-22',
    projects: ['4'],
    createdAt: '2025-01-10'
  }
];

export const auctions: Auction[] = [
  {
    id: '1',
    title: '《数字星空》限量版画',
    description: '著名数字艺术家张设计的代表作品，限量发行50份，此为第1号。',
    artwork: '1',
    startingPrice: 5000,
    currentPrice: 8500,
    minIncrement: 500,
    startTime: '2025-04-01T10:00:00',
    endTime: '2025-04-05T20:00:00',
    status: 'upcoming',
    bids: [],
    createdBy: '1',
    coverImage: '/images/auctions/digital-sky.svg'
  },
  {
    id: '2',
    title: '《融合》雕塑作品',
    description: '结合传统工艺和3D打印技术创作的现代雕塑，作者李艺术的获奖作品。',
    artwork: '2',
    startingPrice: 12000,
    currentPrice: 18500,
    minIncrement: 1000,
    startTime: '2025-03-25T10:00:00',
    endTime: '2025-03-30T20:00:00',
    status: 'active',
    bids: [
      {
        id: 'b1',
        auctionId: '2',
        userId: '3',
        userName: '王收藏',
        amount: 15000,
        timestamp: '2025-03-26T14:30:00'
      },
      {
        id: 'b2',
        auctionId: '2',
        userId: '4',
        userName: '赵艺术',
        amount: 16500,
        timestamp: '2025-03-27T09:15:00'
      },
      {
        id: 'b3',
        auctionId: '2',
        userId: '3',
        userName: '王收藏',
        amount: 18500,
        timestamp: '2025-03-27T16:45:00'
      }
    ],
    createdBy: '2',
    coverImage: '/images/auctions/fusion-sculpture.svg'
  },
  {
    id: '3',
    title: '《可持续未来》设计概念',
    description: '获奖环保设计方案，包含完整设计图纸和原型模型。',
    artwork: '3',
    startingPrice: 8000,
    currentPrice: 15000,
    minIncrement: 500,
    startTime: '2025-03-20T10:00:00',
    endTime: '2025-03-25T20:00:00',
    status: 'ended',
    bids: [
      {
        id: 'b4',
        auctionId: '3',
        userId: '5',
        userName: '孙环保',
        amount: 10000,
        timestamp: '2025-03-21T11:20:00'
      },
      {
        id: 'b5',
        auctionId: '3',
        userId: '6',
        userName: '钱设计',
        amount: 12500,
        timestamp: '2025-03-22T15:10:00'
      },
      {
        id: 'b6',
        auctionId: '3',
        userId: '5',
        userName: '孙环保',
        amount: 15000,
        timestamp: '2025-03-24T19:30:00'
      }
    ],
    winner: '5',
    createdBy: '3',
    coverImage: '/images/auctions/sustainable-future.svg'
  },
  {
    id: '4',
    title: 'VIP专享：《创新思维》艺术装置',
    description: '结合互动技术的艺术装置，VIP会员专享拍卖品。',
    artwork: '4',
    startingPrice: 20000,
    currentPrice: 20000,
    minIncrement: 2000,
    startTime: '2025-04-10T10:00:00',
    endTime: '2025-04-15T20:00:00',
    status: 'upcoming',
    bids: [],
    createdBy: '1',
    coverImage: '/images/auctions/innovative-thinking.svg'
  }
];
