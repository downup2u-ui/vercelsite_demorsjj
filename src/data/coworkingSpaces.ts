/**
 * 定义共享办公空间的数据结构。
 */
export interface CoworkingSpace {
  id: string; // 唯一标识符
  title: string; // 空间标题
  description: string; // 详细描述
  image: string; // 展示图片路径
  type: 'meeting-room' | 'creative-studio' | 'exhibition-hall' | 'dedicated-desk' | 'open-area'; // 空间类型，用于筛选
  features: string[]; // 特性列表，例如设施、服务等
  bookingLink?: string; // 预订链接 (可选)
  capacity?: string; // 容量描述，例如 "6-20人" (可选)
  size?: string; // 面积描述，例如 "200平米" (可选)
}

/**
 * 共享办公空间示例数据数组。
 * 包含不同类型的共享办公空间，如会议室、创意工作室、展厅等。
 */
export const coworkingSpaces: CoworkingSpace[] = [
  {
    id: 'meeting-room-pro',
    title: '专业会议室',
    description: '配备齐全的专业会议空间，适合团队会议、客户洽谈和小型研讨。提供多种规格选择。',
    image: '/images/events/共坊日历/专业会议室.jpg',
    type: 'meeting-room',
    features: [
      '高清投影与专业音响系统',
      '视频会议设备与高速Wi-Fi',
      '灵活的桌椅布局',
      '白板、翻页板等会议用品',
      '提供茶水与咖啡服务'
    ],
    capacity: '6-20人',
    bookingLink: '/booking?space=meeting-room-pro',
  },
  {
    id: 'creative-studio-std',
    title: '创意工作室',
    description: '为设计师、艺术家和内容创作者打造的灵感空间，配备专业软硬件设施。',
    image: '/images/high-quality/exhibition-hall.jpg',
    type: 'creative-studio',
    features: [
      '高性能设计工作站（可选Mac/PC）',
      'Adobe Creative Cloud等专业软件',
      'Wacom绘图板与色彩校准显示器',
      '3D打印与扫描设备（额外付费）',
      '独立安静的创作环境'
    ],
    capacity: '1-4人/间',
    bookingLink: '/booking?space=creative-studio-std',
  },
  {
    id: 'exhibition-hall-main',
    title: '多功能展厅',
    description: '宽敞灵活的开放空间，适合举办各类展览、发布会、大型工作坊和社区活动。',
    image: '/images/events/共坊日历/多功能展厅.jpg',
    type: 'exhibition-hall',
    features: [
      '可定制的模块化展板与展台',
      '专业级轨道射灯与氛围照明',
      '集成音响与多媒体播放系统',
      '充足的电源接口与网络覆盖',
      '可提供活动策划与执行支持'
    ],
    size: '200平米',
    capacity: '约150人（站立）',
    bookingLink: '/booking?space=exhibition-hall-main',
  },
  {
    id: 'dedicated-desk-zone-a',
    title: '独立固定工位',
    description: '拥有个人专属的办公区域，享受安静高效的工作环境，适合长期入驻的个人或小团队。',
    image: '/images/high-quality/meeting-room.jpg', // Was /images/high-quality/dedicated-desk.jpg
    type: 'dedicated-desk',
    features: [
      '符合人体工学的办公桌椅',
      '个人储物柜与电源插座',
      '高速有线/无线网络',
      '共享打印/复印/扫描设备',
      '免费使用公共休息区与茶水间'
    ],
    bookingLink: '/booking?space=dedicated-desk-zone-a',
  },
  {
    id: 'open-area-lounge',
    title: '开放式休闲协作区',
    description: '舒适自由的共享工作空间，促进交流与碰撞思想火花，适合临时办公和非正式会面。',
    image: '/images/events/共坊日历/开放式休闲协作区.jpg',
    type: 'open-area',
    features: [
      '多样化的座位选择（沙发、吧台、散座）',
      '轻松的背景音乐与氛围',
      '免费高速Wi-Fi覆盖',
      '自助咖啡与茶点吧',
      '定期举办社区交流活动'
    ],
  },
  {
    id: 'meeting-room-small',
    title: '小型洽谈间',
    description: '私密安静的小型会议空间，适合1对1会面、面试或小型电话会议。',
    image: '/images/high-quality/small-meeting-room.jpg', // 您可能需要替换为实际图片路径
    type: 'meeting-room',
    features: [
      '隔音效果良好',
      '舒适的沙发或座椅',
      '小型会议桌与电源',
      '可按小时灵活预订'
    ],
    capacity: '2-4人',
    bookingLink: '/booking?space=meeting-room-small',
  },
  {
    id: 'creative-studio-pro',
    title: '专业摄影/录音棚',
    description: '配备专业灯光、背景和隔音设施，适合摄影、摄像及音频录制需求。',
    image: '/images/high-quality/exhibition-hall.jpg',
    type: 'creative-studio',
    features: [
      '专业摄影灯光与柔光箱',
      '多种纯色背景布可选',
      '录音级隔音处理',
      '提供三脚架、反光板等辅助器材租赁',
      '可聘请专业技术人员协助'
    ],
    bookingLink: '/booking?space=creative-studio-pro',
  }
]; 