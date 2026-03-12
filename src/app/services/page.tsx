"use client";

import { useState } from 'react';
import ServiceHeader from '@/components/services/ServiceHeader';
import ServiceCategory from '@/components/services/ServiceCategory';
import ServiceList from '@/components/services/ServiceList';
import { ServiceItem } from '@/components/services/ServiceList';

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  // 定义服务类别
  const categories = [
    { id: 'all', name: '全部' },
    { id: 'member', name: '创客服务工具包' },
    { id: 'virtual_company', name: '虚拟公司' },
    { id: 'virtual_account', name: '虚拟账户' },
    { id: 'legal', name: '法律' },
    { id: 'financial', name: '财务' },
    { id: 'ip', name: '知识产权' },
    { id: 'equipment', name: '加工中心' },
    { id: 'technical', name: '技术支持' },
    { id: 'community', name: '社区服务' }
  ];

  // 定义服务列表
  const services = [
    {
      id: '1',
      title: '3D打印服务',
      category: 'equipment',
      description: '提供专业的3D打印服务，从模型优化到成品制作，多种材料可选。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      features: [
        '高精度3D打印',
        '3D扫描仪使用',
        '3D打印设备使用',
        '模型优化与修复',
        '小批量生产',
        '快速交付'
      ]
    },
    {
      id: '2',
      title: '平面打印服务',
      category: 'equipment',
      description: '提供高精度平面打印服务，满足各类平面设计与印刷需求。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
      ),
      features: [
        '高精度扫描仪使用',
        '平面打印设备使用',
        '海报与宣传品打印',
        '名片与文具印制',
        '大幅面打印服务'
      ]
    },
    {
      id: '3',
      title: '设计管理系统',
      category: 'member',
      description: '为创客提供全面的设计管理工具，帮助您高效管理设计资产和项目进度。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      features: [
        '设计资产库管理',
        '项目进度追踪',
        '版本控制系统',
        '团队协作功能',
        '设计审批流程',
        '数据分析报表'
      ]
    },
    {
      id: '4',
      title: '设计制样评估系统',
      category: 'member',
      description: '专业的设计制样评估平台，帮助创客评估设计可行性和生产成本。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      features: [
        '材料成本计算',
        '生产工艺评估',
        '制样时间预估',
        '设计可行性分析',
        '样品质量评估',
        '优化建议生成'
      ]
    },
    {
      id: '6',
      title: '商务合约服务',
      category: 'legal',
      description: '提供专业的商务合约起草、审核和咨询服务，确保您的商业活动合法合规。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      features: [
        '合约起草与定制',
        '合约审查与修订',
        '合约风险评估',
        '商业条款谈判建议',
        '合约履行监督'
      ]
    },
    {
      id: '7',
      title: '订单管理系统',
      category: 'member',
      description: '高效的订单管理工具，帮助创客跟踪订单状态、管理客户需求和优化生产流程。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      features: [
        '订单跟踪系统',
        '客户需求管理',
        '生产进度监控',
        '交付时间预估',
        '订单历史记录',
        '数据统计分析'
      ]
    },
    {
      id: '8',
      title: '制样附加系统',
      category: 'member',
      description: '专为创客设计的制样辅助工具，提供从设计到生产的全流程支持。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      features: [
        '制样工艺指导',
        '材料选择建议',
        '生产流程优化',
        '质量控制检查',
        '成本控制工具',
        '样品追踪系统'
      ]
    },
    {
      id: '9',
      title: '法律纠纷解决',
      category: 'legal',
      description: '提供专业的法律纠纷解决方案，包括调解、仲裁和诉讼支持等服务。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      features: [
        '纠纷调解服务',
        '仲裁支持',
        '诉讼代理',
        '证据收集与分析',
        '和解协商援助'
      ]
    },
    {
      id: '10',
      title: '结算与支付服务',
      category: 'financial',
      description: '提供安全高效的结算与支付解决方案，满足各类交易场景需求。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      features: [
        '多渠道支付接入',
        '跨境支付解决方案',
        '实时结算服务',
        '交易安全保障',
        '对账与资金管理'
      ]
    },
    {
      id: '11',
      title: '发票与税务申报',
      category: 'financial',
      description: '提供专业的发票开具、税务申报和税务筹划服务，确保合规节税。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        '发票开具服务',
        '增值税申报',
        '企业所得税申报',
        '个人所得税申报',
        '税收优惠政策咨询'
      ]
    },
    {
      id: '12',
      title: '自动分润系统',
      category: 'financial',
      description: '提供智能化的收入分配和利润分成解决方案，适用于多方合作的创意项目。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        '自动化收入分配',
        '多级分润设置',
        '实时结算与报表',
        '智能合约支持',
        '定制化分润规则'
      ]
    },
    {
      id: '13',
      title: 'PTA与FTO分析',
      category: 'ip',
      description: '提供专利技术分析(PTA)和自由实施分析(FTO)服务，评估技术创新的专利风险。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      features: [
        '专利技术分析',
        '自由实施调查',
        '专利地图绘制',
        '竞争对手专利监测',
        '专利风险评估'
      ]
    },
    {
      id: '14',
      title: '知识产权申请服务',
      category: 'ip',
      description: '提供全流程的知识产权申请服务，从检索、撰写到申请提交和答复，全程专业指导。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      features: [
        '专利检索与分析',
        '专利申请文件撰写',
        '专利申请提交',
        '专利审查答复',
        '专利申请后续管理'
      ]
    },
    {
      id: '15',
      title: '知识产权价值评估',
      category: 'ip',
      description: '对知识产权资产进行专业的价值评估，为知识产品的商业化提供依据。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      features: [
        '知识产权价值评估',
        '市场潜力分析',
        '商业化可行性研究',
        '投资回报预测',
        '收益模型构建'
      ]
    },
    {
      id: '16',
      title: '知识产权确权与维权',
      category: 'ip',
      description: '提供专利确权和维权服务，保护您的知识产权免受侵害，维护合法权益。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      features: [
        '专利确权服务',
        '专利侵权调查',
        '专利维权策略',
        '专利诉讼支持',
        '专利权保护方案'
      ]
    },
    {
      id: '17',
      title: '技术支持服务',
      category: 'technical',
      description: '提供全方位的技术支持服务，包括软硬件问题解决、系统维护、技术培训等，确保您的创作过程顺利进行。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      features: [
        '设备故障排除',
        '软件使用指导',
        '系统维护与优化',
        '技术培训与工作坊',
        '远程技术支持'
      ]
    },
    {
      id: '30',
      title: '虚拟公司支持',
      category: 'virtual_company',
      description: '为创业者和小型企业提供虚拟化运营支持，降低创业门槛和运营成本。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      features: [
        '个人工作室注册',
        '初创公司注册',
        '小型企业运营支持',
        '中型企业解决方案',
        '企业地址服务',
        '商务秘书服务'
      ]
    },
    {
      id: '31',
      title: '共享办公服务',
      category: 'virtual_company',
      description: '提供灵活多样的共享办公空间和设施，满足不同规模企业的办公需求。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        '办公室租赁',
        '会议室预约',
        '专业工作室',
        '制作工坊使用',
        '多功能展厅',
        '活动空间租赁'
      ]
    },
    {
      id: '32',
      title: '数字支付解决方案',
      category: 'virtual_account',
      description: '提供多元化的数字支付方式，满足现代商业交易的需求。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      features: [
        '电子钱包服务',
        '加密货币支付',
        '第三方支付集成',
        '跨境支付解决方案',
        '安全交易保障',
        '多币种结算'
      ]
    },
    {
      id: '33',
      title: '财务管理服务',
      category: 'virtual_account',
      description: '提供专业的财务管理工具和服务，帮助创业者和企业高效管理资金。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        '资金结算服务',
        '收支管理工具',
        '发票服务',
        '财务报表生成',
        '资金流动分析',
        '预算规划工具'
      ]
    },
    {
      id: '40',
      title: '社区餐厅服务',
      category: 'community',
      description: '为创客和企业提供高品质的餐饮服务，营造舒适的社交环境，促进社区内交流与合作。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      features: [
        '高品质餐饮服务',
        '多样化菜单选择',
        '健康营养定制餐',
        '会员专享优惠',
        '社区活动餐饮支持',
        '企业订餐服务'
      ]
    },
    {
      id: '41',
      title: '社区酒吧空间',
      category: 'community',
      description: '提供轻松愉快的社交环境，是创意人士交流灵感、建立人脉的理想场所。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        '精选酒水与鸡尾酒',
        '舒适休闲环境',
        '创意社交活动',
        '现场音乐表演',
        '会员专属活动',
        '跨界合作空间'
      ]
    },
    {
      id: '42',
      title: '社区咖啡馆',
      category: 'community',
      description: '提供优质咖啡和轻食，创造适合工作、学习和社交的多功能空间。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M3 21h18a2 2 0 002-2v-8a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        '精品咖啡体验',
        '安静工作区域',
        '高速Wi-Fi覆盖',
        '新鲜烘焙甜点',
        '创意简餐服务',
        '社区读书会空间'
      ]
    },
    {
      id: '43',
      title: '健身与休闲中心',
      category: 'community',
      description: '为社区成员提供全面的健身设施和休闲活动，促进身心健康与社交交流。',
      icon: (
        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      ),
      features: [
        '专业健身设备',
        '团体健身课程',
        '瑜伽与冥想空间',
        '桑拿与蒸汽浴',
        '休闲游戏区',
        '定制健身计划'
      ]
    }
  ];

  // 根据选中的类别筛选服务
  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  // 将服务数据转换为ServiceItem[]类型
  const serviceItems: ServiceItem[] = filteredServices.map(service => ({
    id: service.id,
    title: service.title,
    description: service.description,
    category: service.category,
    icon: service.icon,
    features: service.features.map(feature => ({
      title: feature,
      description: ''
    }))
  }));

  return (
    <div className="bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* 页面标题 */}
        <ServiceHeader 
          title="我们的服务" 
          description="海创共坊提供全方位的优质服务，助力您的创意从概念到实现" 
        />
        
        {/* 服务类别筛选 */}
        <ServiceCategory 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          className="mt-10"
        />
        
        {/* 服务列表 */}
        <ServiceList 
          services={serviceItems}
          className="mt-16"
        />
        
        {/* 服务承诺 */}
        <div className="mt-20 border-t border-gray-200 pt-12">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">我们的服务承诺</h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto my-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 mx-auto bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">专业高效</h3>
              <p className="mt-2 text-gray-600">由行业资深专家提供服务，确保高质量、高效率完成您的需求</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 mx-auto bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">安全可靠</h3>
              <p className="mt-2 text-gray-600">保障您的知识产权和数据安全，提供安全可靠的服务保障</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 mx-auto bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">贴心支持</h3>
              <p className="mt-2 text-gray-600">提供7*12小时在线客服支持，及时响应您的需求和问题</p>
            </div>
          </div>
        </div>
        
        {/* 联系咨询 */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">还没找到您需要的服务？请联系我们的客服团队，获取定制化解决方案</p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            联系我们
          </a>
        </div>
      </div>
    </div>
  );
}
