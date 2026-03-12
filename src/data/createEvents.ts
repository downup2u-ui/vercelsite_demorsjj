export interface CreateEventSuggestion {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'exhibition' | 'workshop' | 'meetup' | 'market' | 'roadshow' | 'other';
  ctaText: string;
  ctaLink: string;
}

export const createEventSuggestions: CreateEventSuggestion[] = [
  {
    id: 'create-exhibition',
    title: '发起展览',
    description: '展示你的艺术作品、设计成果或收藏品，与观众分享你的创作故事。',
    image: '/images/high-quality/artworks/character-model.jpg',
    type: 'exhibition',
    ctaText: '提交展览方案',
    ctaLink: '/submit-proposal?type=exhibition',
  },
  {
    id: 'create-workshop',
    title: '举办工作坊/培训',
    description: '分享你的专业技能或知识，带领参与者动手实践，共同学习成长。',
    image: '/images/high-quality/artworks/sustainable-car-model.jpg',
    type: 'workshop',
    ctaText: '提交工作坊计划',
    ctaLink: '/submit-proposal?type=workshop',
  },
  {
    id: 'create-meetup',
    title: '组织交流/分享会',
    description: '围绕特定主题召集同好，进行深入探讨、经验分享或项目路演。',
    image: '/images/high-quality/exhibition-hall.jpg',
    type: 'meetup',
    ctaText: '提交活动方案',
    ctaLink: '/submit-proposal?type=meetup',
  },
  {
    id: 'create-market-stall',
    title: '申请市集摊位',
    description: '在我们的创意市集展示和销售你的手工作品、设计产品或特色商品。',
    image: '/images/high-quality/exhibition-hall.jpg',
    type: 'market',
    ctaText: '申请摊位',
    ctaLink: '/submit-proposal?type=market_stall',
  },
  {
    id: 'create-roadshow',
    title: '举办项目路演',
    description: '展示你的创新项目、初创企业或商业计划，寻求合作与投资机会。',
    image: '/images/high-quality/exhibition-hall.jpg',
    type: 'roadshow',
    ctaText: '提交路演申请',
    ctaLink: '/submit-proposal?type=roadshow',
  },
  {
    id: 'create-other',
    title: '其他创意活动',
    description: '有独特的活动想法？告诉我们你的创意，我们乐于支持各类新奇有趣的社区活动。',
    image: '/images/high-quality/artworks/digital-art.jpg',
    type: 'other',
    ctaText: '提交你的创意',
    ctaLink: '/submit-proposal?type=other',
  },
  {
    id: 'venue-cooperation',
    title: '场地合作/预订',
    description: '需要空间来实现你的创意活动吗？我们提供多种场地选择，并乐于与您共同策划。',
    image: '/images/high-quality/exhibition-hall.jpg',
    type: 'other', // Could also be a general type or handled separately
    ctaText: '联系场地合作',
    ctaLink: '/contact-us?topic=venue-cooperation',
  },
]; 