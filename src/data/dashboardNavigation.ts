import { NavItem } from '@/types/navigation';
import {
  HomeIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  UsersIcon,
  ShieldCheckIcon,
  Cog6ToothIcon as CogIcon,
  BuildingLibraryIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  WrenchScrewdriverIcon,
  EyeIcon,
  CalendarIcon,
  ShoppingCartIcon,
  ClipboardDocumentIcon,
  PlusCircleIcon,
  TruckIcon,
  GiftIcon,
  BanknotesIcon,
  InboxIcon,
  ServerIcon,
  BookOpenIcon,
  ShieldExclamationIcon,
  Cog8ToothIcon,
  MagnifyingGlassIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
  UserIcon,
  BellIcon,
  DocumentDuplicateIcon,
  BuildingOfficeIcon,
  CreditCardIcon,
  IdentificationIcon,
  ComputerDesktopIcon,
  WrenchIcon,
  CommandLineIcon,
  ClipboardDocumentListIcon,
  ScaleIcon,
  CurrencyDollarIcon,
  ClockIcon,
  DocumentCheckIcon,
  AcademicCapIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

export const designerNavGroups = [
  {
    group: '仪表盘与统计',
    items: [
      { name: '卡片仪表盘', href: '/dashboard/designer/card-dashboard', icon: ChartPieIcon },
      { name: '仪表盘总览', href: '/dashboard/designer/overview', icon: HomeIcon },
    ],
  },
  {
    group: '收益与财务',
    items: [
      { name: 'IP收益分润', href: '/dashboard/designer/profit-sharing', icon: CurrencyDollarIcon },
      { name: '财务服务协同', href: '/dashboard/designer/financial-collaboration', icon: BanknotesIcon },
    ],
  },
  {
    group: '项目管理',
    items: [
      { name: '项目管理', href: '/dashboard/designer/project', icon: BriefcaseIcon },
      { name: '跟单管理', href: '/dashboard/designer/follow', icon: MagnifyingGlassIcon },
      { name: '制样定单系统', href: '/dashboard/designer/sample-order', icon: ShoppingBagIcon },
      { name: '制样附加服务', href: '/dashboard/designer/sample-service', icon: WrenchScrewdriverIcon },
      { name: '附加服务项目', href: '/dashboard/designer/additional-service', icon: PlusCircleIcon },
    ],
  },
  {
    group: '产品交付与物流',
    items: [
      { name: '产品物流', href: '/dashboard/designer/logistics', icon: TruckIcon },
      { name: '产品交付', href: '/dashboard/designer/delivery', icon: GiftIcon },
      { name: '产品结算', href: '/dashboard/designer/settlement', icon: BanknotesIcon },
    ],
  },
  {
    group: '展示与销售',
    items: [
      { name: '展示系统', href: '/dashboard/designer/showcase', icon: EyeIcon },
      { name: '销售系统', href: '/dashboard/designer/sales', icon: ShoppingCartIcon },
    ],
  },
  {
    group: '订单与客户',
    items: [
      { name: '定单系统', href: '/dashboard/designer/customer-order', icon: ClipboardDocumentIcon },
    ],
  },
  {
    group: '空间与设施',
    items: [
      { name: '空间预约', href: '/dashboard/designer/space', icon: BuildingOffice2Icon },
      { name: '公共活动', href: '/dashboard/designer/event-creation', icon: CalendarDaysIcon },
    ],
  },
  {
    group: '创作与作品集',
    items: [
      { name: '我的作品集', href: '/dashboard/designer/portfolio', icon: EyeIcon },
      { name: '作品集发布', href: '/dashboard/designer/portfolio-publishing', icon: DocumentTextIcon },
    ],
  },
  {
    group: '活动与成长',
    items: [
      { name: '活动发起', href: '/dashboard/designer/event-creation', icon: CalendarIcon },
      { name: '学习与成长', href: '/dashboard/designer/learning', icon: BookOpenIcon },
    ],
  },
  {
    group: '设计与资源',
    items: [
      { name: '设计资源库', href: '/dashboard/designer/resource', icon: ServerIcon },
    ],
  },
  {
    group: '法律与知识产权',
    items: [
      { name: '法律服务协同', href: '/dashboard/designer/legal-collaboration', icon: ScaleIcon },
      { name: '知识产权协同', href: '/dashboard/designer/ip-collaboration', icon: ShieldCheckIcon },
    ],
  },
  {
    group: '仓储与后台管理',
    items: [
      { name: 'WWS库存管理', href: '/dashboard/designer/inventory', icon: InboxIcon },
      { name: '协议管理', href: '/dashboard/designer/agreement', icon: ShieldExclamationIcon },
      { name: '账户设置', href: '/dashboard/designer/settings', icon: CogIcon },
    ],
  },
];

export const legalServiceNavItems: NavItem[] = [
  {
    name: '仪表盘总览',
    href: '/dashboard/legal-services',
    icon: HomeIcon,
  },
  {
    name: '案件管理',
    href: '/dashboard/legal-services/case-management',
    icon: BriefcaseIcon,
  },
  {
    name: '客户档案',
    href: '/dashboard/legal-services/client-profiles',
    icon: UsersIcon,
  },
  {
    name: '法律咨询服务',
    href: '/dashboard/legal-services/consultation',
    icon: ScaleIcon,
  },
  {
    name: '法律文书与合同',
    href: '/dashboard/legal-services/documents',
    icon: DocumentTextIcon,
  },
  {
    name: '文书模板中心',
    href: '/dashboard/legal-services/template-center',
    icon: DocumentDuplicateIcon,
  },
  {
    name: '账单与收款管理',
    href: '/dashboard/legal-services/billing',
    icon: CurrencyDollarIcon,
  },
  {
    name: '法规更新与研究',
    href: '/dashboard/legal-services/regulations',
    icon: BookOpenIcon,
  },
  {
    name: '设计师协作请求',
    href: '/dashboard/legal-services/designer-requests',
    icon: UserGroupIcon,
  },
  {
    name: '账户设置',
    href: '/dashboard/legal-services/settings',
    icon: CogIcon,
  },
];

export const financialServiceNavItems: NavItem[] = [
  {
    name: '仪表盘总览',
    href: '/dashboard/financial-services',
    icon: HomeIcon,
  },
  {
    name: '账务处理',
    href: '/dashboard/financial-services/accounting',
    icon: BanknotesIcon,
  },
  {
    name: '税务管理',
    href: '/dashboard/financial-services/taxation',
    icon: DocumentTextIcon,
  },
  {
    name: '财务报表',
    href: '/dashboard/financial-services/financial-reports',
    icon: ChartPieIcon,
  },
  {
    name: '设计师协作请求',
    href: '/dashboard/financial-services/designer-requests',
    icon: UserGroupIcon, 
  },
  {
    name: '账户设置',
    href: '/dashboard/financial-services/settings',
    icon: CogIcon,
  },
];

export const ipServiceNavItems: NavItem[] = [
  {
    name: '仪表盘总览',
    href: '/dashboard/intellectual-property-services',
    icon: HomeIcon,
  },
  {
    name: '商标管理',
    href: '/dashboard/intellectual-property-services/trademark-management',
    icon: ShieldCheckIcon,
  },
  {
    name: '专利服务',
    href: '/dashboard/intellectual-property-services/patent-services',
    icon: ShieldExclamationIcon,
  },
  {
    name: '版权登记',
    href: '/dashboard/intellectual-property-services/copyright-registration',
    icon: DocumentTextIcon,
  },
  {
    name: '设计师协作请求',
    href: '/dashboard/intellectual-property-services/designer-requests',
    icon: UserGroupIcon,
  },
  {
    name: '账户设置',
    href: '/dashboard/intellectual-property-services/settings',
    icon: CogIcon,
  },
];

// TODO: Define nav items for other roles (legal, financial, ip_services) 
// The line above can be removed now or updated to reflect completeness for these roles. 