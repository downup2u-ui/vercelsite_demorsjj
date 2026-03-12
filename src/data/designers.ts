export interface Designer {
  id: string;
  name: string;
  bio: string;
  avatar?: string;
  location?: string;
  specialties: string[];
  artworkIds: string[];
  contactEmail?: string;
  website?: string;
  social?: {
    weibo?: string;
    wechat?: string;
    instagram?: string;
  };
  joinedAt: string;
  featured: boolean;
}

export const designers: Designer[] = [
  {
    id: '1',
    name: '张明远',
    bio: '清华大学工业设计专业毕业，专注于医疗设备和生物工程领域的3D打印设计师，拥有8年行业经验，曾获2023年中国工业设计金奖。擅长将功能性与美学相结合，为多家医疗器械公司提供创新设计解决方案。',
    avatar: '/images/high-quality/avatars/designer1.jpg',
    location: '上海',
    specialties: ['医疗设备', '生物工程', '功能性设计', '人体工学'],
    artworkIds: ['1', '5', '9'],
    contactEmail: 'zhang@example.com',
    website: 'https://zhang-design.example.com',
    social: {
      weibo: '@zhang_design',
      wechat: 'zhang_design',
      instagram: '@zhang_design_official'
    },
    joinedAt: '2023-01-15',
    featured: true
  },
  {
    id: '2',
    name: '李创新',
    bio: '中央美术学院工业设计系毕业，教育领域的创新设计师，拥有5年教育科技产品设计经验，致力于开发能够促进学习体验的3D打印教具和模型。曾参与国家教育部"未来教室"项目，设计作品被多所学校采用。',
    avatar: '/images/high-quality/avatars/designer2.jpg',
    location: '北京',
    specialties: ['教育工具', '交互式模型', '儿童友好设计', '教育科技'],
    artworkIds: ['2', '6', '10'],
    contactEmail: 'li@example.com',
    website: 'https://li-innovation.example.com',
    social: {
      weibo: '@li_innovation',
      wechat: 'li_innovation',
    },
    joinedAt: '2023-02-20',
    featured: true
  },
  {
    id: '3',
    name: '王数字',
    bio: '北京大学计算机科学专业毕业，数字艺术与参数化设计领域的先驱，擅长将算法和数学模型应用于3D打印艺术创作。曾在国际数字艺术双年展获奖，作品被多家科技博物馆收藏。',
    avatar: '/images/high-quality/avatars/designer3.jpg',
    location: '杭州',
    specialties: ['参数化设计', '算法艺术', '数字雕塑', '交互装置'],
    artworkIds: ['3', '7', '11'],
    contactEmail: 'wang@example.com',
    website: 'https://wang-digital.example.com',
    social: {
      weibo: '@wang_digital',
      wechat: 'wang_digital',
      instagram: '@wang_digital_art'
    },
    joinedAt: '2023-03-10',
    featured: true
  },
  {
    id: '4',
    name: '赵雅芝',
    bio: '伦敦艺术大学产品设计专业毕业，专注于珠宝和时尚配饰的3D打印设计师，作品融合了传统工艺与现代科技。曾为多个国际时装品牌设计定制配饰，作品在米兰时装周展出。',
    avatar: '/images/high-quality/avatars/designer4.jpg',
    location: '深圳',
    specialties: ['珠宝设计', '时尚配饰', '材料创新', '可穿戴艺术'],
    artworkIds: ['4', '8', '12'],
    contactEmail: 'zhao@example.com',
    website: 'https://zhao-art.example.com',
    social: {
      weibo: '@zhao_art',
      wechat: 'zhao_art',
      instagram: '@zhao_art_official'
    },
    joinedAt: '2023-05-20',
    featured: true
  },
  {
    id: '5',
    name: '刘量子',
    bio: '麻省理工学院材料科学专业博士，专注于先进材料与3D打印技术的融合研究。曾在多家高科技企业担任材料研发顾问，拥有多项3D打印材料专利，致力于开发具有特殊功能的新型打印材料。',
    avatar: '/images/high-quality/avatars/designer5.jpg',
    location: '西安',
    specialties: ['材料科学', '功能性材料', '生物材料', '复合材料'],
    artworkIds: ['13', '17', '21'],
    contactEmail: 'liu@example.com',
    website: 'https://liu-quantum.example.com',
    social: {
      weibo: '@liu_quantum',
      wechat: 'liu_quantum',
      instagram: '@liu_quantum_materials'
    },
    joinedAt: '2023-02-15',
    featured: false
  },
  {
    id: '6',
    name: '林创客',
    bio: '深圳大学电子工程专业毕业，资深开源硬件专家，拥有10年电子产品设计经验。曾参与多个知名开源硬件项目，致力于设计可定制、易组装的3D打印电子产品外壳和配件。在GitHub上拥有超过5000名粉丝，多个项目获得国际创客大赛奖项。',
    avatar: '/images/high-quality/avatars/designer6.jpg',
    location: '深圳',
    specialties: ['电子产品外壳', '开源硬件', '模块化设计', '智能家居'],
    artworkIds: ['14', '18', '22'],
    contactEmail: 'lin@example.com',
    website: 'https://lin-maker.example.com',
    social: {
      weibo: '@lin_maker',
      wechat: 'lin_maker',
      instagram: '@lin_maker_tech'
    },
    joinedAt: '2023-06-15',
    featured: true
  },
  {
    id: '7',
    name: '黄玩具',
    bio: '广州美术学院工业设计专业毕业，知名玩具设计师，曾在国际玩具巨头公司担任高级设计师。专注于创造富有互动性和教育意义的3D打印玩具，作品结合了STEAM教育理念和趣味性。多款设计产品已被玩具制造商量产，并获得2023年亚洲玩具设计大奖。',
    avatar: '/images/high-quality/avatars/designer7.jpg',
    location: '广州',
    specialties: ['玩具设计', '教育游戏', '角色模型', 'STEAM教育'],
    artworkIds: ['15', '19', '23'],
    contactEmail: 'huang@example.com',
    website: 'https://huang-toys.example.com',
    social: {
      weibo: '@huang_toys',
      wechat: 'huang_toys',
      instagram: '@huang_toys_design'
    },
    joinedAt: '2023-07-20',
    featured: false
  },
  {
    id: '8',
    name: '吴建筑',
    bio: '同济大学建筑学院毕业，资深建筑模型设计师，拥有12年建筑设计和模型制作经验。擅长将复杂的建筑结构转化为精确的3D打印模型，作品被多家建筑设计公司和城市规划部门采用。曾参与上海城市规划展示馆多个展项的设计和制作，获得2024年中国建筑模型设计金奖。',
    avatar: '/images/high-quality/avatars/designer8.jpg',
    location: '上海',
    specialties: ['建筑模型', '城市规划', '历史建筑复原', '景观设计'],
    artworkIds: ['16', '20', '24'],
    contactEmail: 'wu@example.com',
    website: 'https://wu-architecture.example.com',
    social: {
      weibo: '@wu_architecture',
      wechat: 'wu_architecture',
      instagram: '@wu_architecture_models'
    },
    joinedAt: '2023-04-10',
    featured: true
  },
  {
    id: '9',
    name: '钱志远',
    bio: '浙江大学计算机科学专业毕业，资深软件工程师和创客教育专家。专注于将编程与3D打印相结合的教育项目开发，设计了多套针对青少年的编程与3D打印课程。曾获教育部"创新教育"项目奖，著有《编程与3D打印入门》教材，被全国多所中小学采用。',
    avatar: '/images/high-quality/avatars/designer9.jpg',
    location: '杭州',
    specialties: ['编程教育', '创客教育', '教育工具', '交互设计'],
    artworkIds: [],
    contactEmail: 'qian@example.com',
    website: 'https://qian-code.example.com',
    social: {
      weibo: '@qian_code',
      wechat: 'qian_code',
      instagram: '@qian_code_edu'
    },
    joinedAt: '2023-08-05',
    featured: false
  },
  {
    id: '10',
    name: '孙雨晨',
    bio: '中国美术学院新媒体艺术专业毕业，新锐数字艺术家和设计师。专注于将传统文化元素与数字技术融合的艺术创作，作品多次在国内外数字艺术展览中展出。擅长使用参数化设计和生成式算法创作具有中国传统美学的现代艺术品，获得2024年"新锐设计师"称号。',
    avatar: '/images/high-quality/avatars/designer10.jpg',
    location: '杭州',
    specialties: ['数字艺术', '参数化设计', '传统文化', '生成式艺术'],
    artworkIds: [],
    contactEmail: 'sun@example.com',
    website: 'https://sun-digital.example.com',
    social: {
      weibo: '@sun_digital',
      wechat: 'sun_digital',
      instagram: '@sun_digital_art'
    },
    joinedAt: '2024-01-15',
    featured: true
  }
];
