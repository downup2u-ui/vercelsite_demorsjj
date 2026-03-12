export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  location: string;
  type: 'release' | 'exhibition' | 'auction' | 'market' | 'training' | 'maker';
  organizer: string;
  capacity: number;
  registered: number;
  memberOnly: boolean;
  speakers?: Array<{name: string; title: string; bio?: string}>;
  agenda?: Array<{time: string; title: string; description?: string}>;
  sponsors?: string[];
  features?: string[];
}

export const events: Event[] = [
  {
    id: '1',
    title: '2025春季潮玩设计与3D打印展',
    description: '本次展览汇集来自全国各地的50余位顶尖设计师的最新潮流玩具和艺术品作品，展示3D打印技术在潮玩领域的创新应用。展会期间将举办设计师见面会、新品发布会和技术讲座，为参观者提供全方位的潮玩文化体验。特别设置"未来潮玩"主题区，展示融合AR/VR技术的新一代潮玩产品。',
    image: '/images/high-quality/artworks/character-model.jpg',
    startDate: '2025-04-15T10:00:00',
    endDate: '2025-04-20T18:00:00',
    location: '上海创意园区A馆（上海市静安区江宁路1188号）',
    type: 'exhibition',
    organizer: '海创共坊 × 中国工业设计协会',
    capacity: 500,
    registered: 320,
    memberOnly: false,
    speakers: [
      {name: '张明远', title: '清华大学工业设计系教授', bio: '国内知名工业设计专家，专注于3D打印与潮玩设计融合研究'},
      {name: '李俊杰', title: 'TOYZ潮玩品牌创始人', bio: '曾获2024亚洲设计大奖，作品被多家博物馆收藏'}
    ],
    sponsors: ['中国工业设计协会', '上海市文化创意产业促进会', '3D打印产业联盟']
  },
  {
    id: '2',
    title: '2025数字艺术品拍卖会暨NFT艺术论坛',
    description: '这是一场线上线下结合的NFT艺术品拍卖活动，展示和售卖30件精选优质数字艺术作品。拍卖会采用区块链技术确保艺术品的真实性和所有权，所有作品均附带数字证书和溯源记录。活动同期举办"数字艺术的未来"主题论坛，邀请国内外知名艺术家、收藏家和区块链专家共同探讨NFT艺术的发展趋势和投资价值。VIP会员可享专属预展和优先竞拍权。',
    image: '/images/high-quality/artworks/digital-art.jpg',
    startDate: '2025-05-10T14:00:00',
    endDate: '2025-05-10T20:00:00',
    location: '线上 + 广州海创共坊展厅（广州市天河区珠江新城冼村路11号）',
    type: 'auction',
    organizer: '海创共坊 × 元宇宙艺术联盟',
    capacity: 200,
    registered: 180,
    memberOnly: true,
    agenda: [
      {time: '14:00-14:30', title: '开幕式及展品介绍'},
      {time: '14:30-16:30', title: '数字艺术品拍卖（第一轮）'},
      {time: '16:30-17:30', title: '"数字艺术的未来"主题论坛'},
      {time: '17:30-19:30', title: '数字艺术品拍卖（第二轮）'},
      {time: '19:30-20:00', title: '闭幕式及颁证仪式'}
    ],
    sponsors: ['元宇宙艺术联盟', '广州市文化创意产业协会', '区块链艺术收藏家协会']
  },
  {
    id: '3',
    title: '海创共坊新版网站及App发布会',
    description: '见证海创共坊全新数字化平台的上线！我们将发布全新设计的官方网站和移动App，带来更便捷的社区服务和互动体验。发布会将介绍新平台的核心功能、设计理念，并有现场演示和互动环节。首批注册用户将获得特别礼品。诚邀社区成员、合作伙伴和媒体朋友共同参与。',
    image: '/images/high-quality/exhibition-hall.jpg',
    startDate: '2025-06-01T14:00:00',
    endDate: '2025-06-01T16:00:00',
    location: '广州海创共坊多功能厅（广州市天河区珠江新城冼村路11号）',
    type: 'release',
    organizer: '海创共坊技术团队',
    capacity: 150,
    registered: 95,
    memberOnly: false,
    speakers: [
      {name: '刘伟强', title: '海创共坊CEO', bio: '阐述平台发展战略与愿景'},
      {name: '陈思远', title: '海创共坊产品总监', bio: '详细介绍新版网站与App功能'}
    ],
    agenda: [
      {time: '14:00-14:15', title: '开场与嘉宾致辞'},
      {time: '14:15-15:00', title: '新平台发布与功能演示'},
      {time: '15:00-15:30', title: '用户互动与Q&A'},
      {time: '15:30-16:00', title: '自由交流与体验'}
    ]
  },
  {
    id: '4',
    title: '可持续设计实践工作坊',
    description: '行业设计师分享可持续设计理念和实践案例，探讨未来发展趋势。参与者将分组进行实际项目设计，学习如何将环保材料和循环经济原则融入产品开发。提供所有必要材料和工具。适合设计师、工程师和对可持续发展感兴趣的创客。',
    image: '/images/high-quality/artworks/sustainable-car-model.jpg',
    startDate: '2025-06-20T09:00:00',
    endDate: '2025-06-20T17:00:00',
    location: '广州海创共坊培训室（广州市天河区珠江新城冼村路11号）',
    type: 'training',
    organizer: '海创共坊设计师社区 × 绿色设计联盟',
    capacity: 30,
    registered: 18,
    memberOnly: false,
    agenda: [
      {time: '09:00-10:00', title: '可持续设计导论'},
      {time: '10:00-12:00', title: '案例分析与材料选择'},
      {time: '13:00-16:00', title: '分组设计实践'},
      {time: '16:00-17:00', title: '成果展示与讨论'}
    ]
  },
  {
    id: '5',
    title: '周末创意市集：夏日手作嘉年华',
    description: '汇集本地手工艺人、设计师和创意小店，打造充满活力的周末市集。发掘独特的原创设计、手工作品、复古好物和美食饮品。现场还有音乐表演和互动体验区，适合全家一起参与。欢迎有创意产品的摊主报名参与。',
    image: '/images/high-quality/exhibition-hall.jpg',
    startDate: '2025-07-05T11:00:00',
    endDate: '2025-07-06T19:00:00',
    location: '上海海创共坊户外广场（上海市静安区江宁路1188号）',
    type: 'market',
    organizer: '海创共坊社区运营团队',
    capacity: 1000,
    registered: 0,
    memberOnly: false,
    features: [
      '超过50个创意摊位',
      '现场音乐与街头艺术表演',
      '手作体验工作坊',
      '特色美食与饮品区'
    ]
  },
  {
    id: '8',
    title: '智能制造与3D打印技术培训',
    description: '面向制造业企业的联合创新项目，共同开发智能制造解决方案，整合3D打印技术与工业自动化。本培训将深入讲解3D打印在快速原型、定制生产、复杂结构制造等方面的应用，并结合实际案例进行分析和操作指导。',
    image: '/images/high-quality/artworks/engine-mount.jpg',
    startDate: '2025-07-15T09:00:00',
    endDate: '2025-07-16T18:00:00',
    location: '深圳湾科技园创新中心（深圳市南山区科技园路28号）',
    type: 'training',
    organizer: '海创共坊 × 智造联盟',
    capacity: 50,
    registered: 32,
    memberOnly: true
  },
  {
    id: '9',
    title: '社区文化艺术节：创客盛典',
    description: '为期一周的社区文化艺术节，集艺术展示、创意市集、手工工作坊和音乐表演于一体，特别增设创客项目展示与交流环节。我们提供活动策划、场地协调、艺术家邀请、宣传推广和活动管理的全流程服务。可根据社区特色和主题需求量身定制活动内容，创造独特的社区文化体验。适合创意社区、文化街区、艺术区域和高校园区等组织举办。',
    image: '/images/high-quality/exhibition-hall.jpg',
    startDate: '2025-08-10T10:00:00',
    endDate: '2025-08-16T22:00:00',
    location: '北京海创共坊园区（北京市朝阳区望京街10号）',
    type: 'maker',
    organizer: '海创共坊活动策划团队',
    capacity: 500,
    registered: 210,
    memberOnly: false,
    agenda: [
      {time: '8月10日', title: '开幕式与艺术展览开放'},
      {time: '8月11-12日', title: '创意市集与手工体验'},
      {time: '8月13-14日', title: '工作坊与互动装置'},
      {time: '8月15日', title: '音乐表演与社区分享会'},
      {time: '8月16日', title: '闭幕派对与成果展示'}
    ]
  },
  {
    id: '10',
    title: '企业创客马拉松：智能生活解决方案',
    description: '为企业团队量身定制的创客马拉松活动，围绕"智能生活"主题，结合3D打印、物联网、人工智能等技术，进行方案设计与原型制作。我们提供活动设计、场地准备、专业导师指导、材料工具和活动总结的一站式服务。旨在激发团队创新潜力，培养协作解决问题的能力。',
    image: '/images/high-quality/exhibition-hall.jpg',
    startDate: '2025-09-20T09:00:00',
    endDate: '2025-09-21T17:00:00',
    location: '广州海创共坊创新空间（广州市天河区珠江新城冼村路11号）',
    type: 'maker',
    organizer: '海创共坊企业服务团队',
    capacity: 30,
    registered: 22,
    memberOnly: false,
    features: [
      '团队创意挑战项目',
      '专业活动引导师',
      '全套创作材料提供',
      '团队作品展示环节',
      '专业活动照片记录'
    ]
  }
];
