export interface Space {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  type: 'meeting' | 'studio' | 'exhibition' | 'workshop';
  capacity: number;
  facilities: string[];
  hourlyRate: number | null;
  halfDayRate: number | null;
  fullDayRate: number | null;
  available: boolean;
  vipOnly: boolean;
  bookings?: {
    date: string;
    startTime: string;
    endTime: string;
    bookedBy: string;
  }[];
}

export const spaces: Space[] = [
  {
    id: '1',
    name: '多功能会议室A',
    description: '配备现代化会议设施的多功能会议室，适合举办小型会议、研讨会和工作坊。',
    longDescription: `
      多功能会议室A是海创共坊最受欢迎的会议空间之一，配备了全套现代化会议设施，为各类专业活动提供理想场所。

      空间特点：
      - 面积：60平方米
      - 容纳人数：最多20人
      - 灵活布置：可根据需求调整为会议式、课堂式、圆桌式等多种布局
      - 全套视听设备：4K投影仪、环绕音响系统、视频会议设备
      - 高速Wi-Fi覆盖
      - 可调节照明系统
      - 舒适座椅和会议桌
      - 白板和便签纸

      适合活动：
      - 商务会议和谈判
      - 小型研讨会和工作坊
      - 创意头脑风暴
      - 项目展示和路演
      - 小型培训课程

      预订须知：
      - 最少预订时长：2小时
      - 提前预订：建议至少提前3天
      - 取消政策：预订时间前24小时取消可全额退款
      - 提供基本茶水服务，可额外订购咖啡和小食
    `,
    image: '/images/high-quality/meeting-room.jpg',
    type: 'meeting',
    capacity: 20,
    facilities: ['4K投影仪', '视频会议设备', '高速Wi-Fi', '白板', '茶水服务'],
    hourlyRate: 200,
    halfDayRate: 800,
    fullDayRate: 1500,
    available: true,
    vipOnly: false,
    bookings: [
      {
        date: '2025-03-28',
        startTime: '09:00',
        endTime: '12:00',
        bookedBy: '张三企业咨询'
      },
      {
        date: '2025-03-28',
        startTime: '14:00',
        endTime: '17:00',
        bookedBy: '李四科技有限公司'
      }
    ]
  },
  {
    id: '2',
    name: '创意工作室B',
    description: '宽敞明亮的创意工作室，配备专业设计工具和3D打印设备，适合设计师和创客团队使用。',
    longDescription: `
      创意工作室B是为设计师和创客团队打造的专业创作空间，配备了先进的设计工具和3D打印设备。

      空间特点：
      - 面积：80平方米
      - 容纳人数：最多15人
      - 开放式布局：鼓励协作和创意交流
      - 专业设备：高性能工作站、设计软件、3D打印机、激光切割机
      - 材料库：各类创作材料供选择使用
      - 自然采光：大型落地窗提供充足自然光
      - 休息区：舒适沙发和咖啡角

      适合活动：
      - 设计团队协作
      - 产品原型开发
      - 创意项目制作
      - 小型创客马拉松
      - 设计工作坊

      预订须知：
      - 最少预订时长：4小时
      - 提前预订：建议至少提前5天
      - 取消政策：预订时间前48小时取消可全额退款
      - 设备使用需额外付费，材料费用另计
    `,
    image: '/images/high-quality/3d-printing-studio.jpg',
    type: 'studio',
    capacity: 15,
    facilities: ['高性能工作站', '3D打印机', '激光切割机', '材料库', '咖啡角'],
    hourlyRate: 300,
    halfDayRate: 1200,
    fullDayRate: 2000,
    available: true,
    vipOnly: false,
    bookings: []
  },
  {
    id: '3',
    name: 'VIP展览厅',
    description: '专业展览空间，配备先进的展示系统和灯光设备，适合艺术展览、产品发布和精品展示。',
    longDescription: `
      VIP展览厅是海创共坊的旗舰展示空间，采用专业展览标准设计，为各类高端展览和发布活动提供完美场地。

      空间特点：
      - 面积：120平方米
      - 容纳人数：最多50人
      - 专业展示系统：可调节展板、展柜和悬挂系统
      - 博物馆级灯光：可调节色温和亮度的轨道射灯
      - 环绕音响系统：提供沉浸式声音体验
      - 4K投影和大屏幕：多媒体展示支持
      - 独立温湿度控制：保护展品安全
      - 安保系统：24小时监控和报警系统

      适合活动：
      - 艺术展览和画廊展示
      - 高端产品发布会
      - 设计作品展示
      - NFT艺术展览
      - 精品拍卖预展

      预订须知：
      - 最少预订时长：1天
      - 提前预订：建议至少提前14天
      - 取消政策：预订时间前7天取消可退款80%
      - 提供专业布展服务和开幕酒会安排（需额外付费）
    `,
    image: '/images/high-quality/exhibition-hall.jpg',
    type: 'exhibition',
    capacity: 50,
    facilities: ['专业展示系统', '博物馆级灯光', '环绕音响', '4K投影', '安保系统'],
    hourlyRate: null,
    halfDayRate: null,
    fullDayRate: 5000,
    available: true,
    vipOnly: true,
    bookings: [
      {
        date: '2025-04-01',
        startTime: '09:00',
        endTime: '21:00',
        bookedBy: '当代艺术协会'
      },
      {
        date: '2025-04-02',
        startTime: '09:00',
        endTime: '21:00',
        bookedBy: '当代艺术协会'
      },
      {
        date: '2025-04-03',
        startTime: '09:00',
        endTime: '21:00',
        bookedBy: '当代艺术协会'
      }
    ]
  },
  {
    id: '4',
    name: '3D打印工作坊',
    description: '配备多种专业3D打印设备的工作空间，适合产品原型制作和小批量生产。',
    longDescription: `
      3D打印工作坊是一个专为设计师和创客打造的专业制作空间，配备了多种工业级和桌面级3D打印设备，以及完整的后处理工具，满足从概念设计到成品制作的全流程需求。

      空间特点：
      - 面积：80平方米
      - 容纳人数：最多12人
      - 设备配置：
        · 工业级SLS粉末烧结3D打印机
        · 工业级SLA光固化3D打印机
        · 多台桌面级FDM熔融沉积3D打印机
        · 高精度3D扫描仪
        · 完整的后处理工具套装
      - 材料库：提供多种3D打印材料，包括PLA、ABS、尼龙、树脂等
      - 独立通风系统
      - 工作台和储物柜
      - 高速Wi-Fi覆盖

      适合活动：
      - 产品原型快速制作
      - 小批量定制产品生产
      - 3D打印技术培训和工作坊
      - 创客项目制作
      - 学生实践项目

      预订须知：
      - 最少预订时长：4小时
      - 提前预订：建议至少提前72小时
      - 取消政策：预订时间前72小时取消可全额退款
      - 设备使用和材料费用另计，可提供技术指导服务
    `,
    image: '/images/high-quality/3d-printer-working.jpg',
    type: 'workshop',
    capacity: 12,
    facilities: ['工业级3D打印机', '桌面级3D打印机', '3D扫描仪', '后处理设备', '材料库'],
    hourlyRate: 350,
    halfDayRate: 1400,
    fullDayRate: 2500,
    available: true,
    vipOnly: false,
    bookings: [
      {
        date: '2025-03-30',
        startTime: '10:00',
        endTime: '18:00',
        bookedBy: '创新设计学院'
      }
    ]
  },
  {
    id: '5',
    name: '小型会议室C',
    description: '舒适私密的小型会议室，适合4-6人的小组讨论、面试和远程会议。',
    longDescription: `
      小型会议室C提供舒适私密的环境，适合小型团队会议和一对一交流。

      空间特点：
      - 面积：25平方米
      - 容纳人数：最多6人
      - 舒适座椅和圆桌设计
      - 视频会议设备：高清摄像头和麦克风
      - 55寸智能显示屏
      - 高速Wi-Fi
      - 隔音处理：保证私密交流
      - 智能照明和温控系统

      适合活动：
      - 小组讨论和会议
      - 远程视频会议
      - 面试和咨询
      - 一对一辅导
      - 小型路演

      预订须知：
      - 最少预订时长：1小时
      - 提前预订：建议至少提前1天
      - 取消政策：预订时间前4小时取消可全额退款
      - 提供基本茶水服务
    `,
    image: '/images/high-quality/small-meeting-room.jpg',
    type: 'meeting',
    capacity: 6,
    facilities: ['视频会议设备', '智能显示屏', '高速Wi-Fi', '茶水服务'],
    hourlyRate: 100,
    halfDayRate: 400,
    fullDayRate: 700,
    available: true,
    vipOnly: false,
    bookings: []
  }
];
