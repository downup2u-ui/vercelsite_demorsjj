export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'professional' | 'lifestyle';
  subcategory: string;
  provider: string;
  contactInfo: string;
  price?: string;
  vipDiscount?: number;
  available: boolean;
}

export const services: Service[] = [
  {
    id: '1',
    name: '知识产权咨询',
    description: '提供作品版权保护、专利申请和商标注册等知识产权相关咨询服务。',
    image: '/images/high-quality/designer-modeling.jpg',
    category: 'professional',
    subcategory: '法律咨询',
    provider: '智法知识产权事务所',
    contactInfo: 'legal@example.com',
    price: '500元/小时起',
    vipDiscount: 15,
    available: true
  },
  {
    id: '2',
    name: '3D模型优化',
    description: '专业3D模型优化服务，提高模型质量和打印适应性，减少打印失败率。',
    image: '/images/high-quality/3d-printer-working.jpg',
    category: 'professional',
    subcategory: '技术咨询',
    provider: '李程序工作室',
    contactInfo: 'tech@example.com',
    price: '根据项目复杂度定价',
    vipDiscount: 20,
    available: true
  },
  {
    id: '3',
    name: '创业融资指导',
    description: '为创意项目和创业团队提供商业计划书编写、融资渠道对接和投资人沟通等指导服务。',
    image: '/images/high-quality/printed-artwork.jpg',
    category: 'professional',
    subcategory: '商业咨询',
    provider: '创投顾问团队',
    contactInfo: 'venture@example.com',
    price: '2000元/次起',
    vipDiscount: 10,
    available: true
  },
  {
    id: '4',
    name: '创意咖啡厅',
    description: '提供特色咖啡和轻食的休闲空间，是创意交流和放松的理想场所。',
    image: '/services/creative-cafe.jpg',
    category: 'lifestyle',
    subcategory: '餐饮服务',
    provider: '灵感咖啡',
    contactInfo: 'cafe@example.com',
    vipDiscount: 15,
    available: true
  },
  {
    id: '5',
    name: '艺术疗愈工作坊',
    description: '通过艺术创作缓解压力，提升心理健康的专业工作坊，定期举办。',
    image: '/services/art-therapy.jpg',
    category: 'lifestyle',
    subcategory: '健康服务',
    provider: '心灵艺术工作室',
    contactInfo: 'therapy@example.com',
    price: '200元/人/次',
    vipDiscount: 20,
    available: true
  },
  {
    id: '6',
    name: '国际展会对接',
    description: '帮助创作者对接国际知名展会和市场，提供翻译、展位申请和市场推广等一站式服务。',
    image: '/services/international-expo.jpg',
    category: 'professional',
    subcategory: '国际市场',
    provider: '全球创意连接',
    contactInfo: 'global@example.com',
    price: '根据展会和服务内容定价',
    vipDiscount: 10,
    available: true
  }
];
