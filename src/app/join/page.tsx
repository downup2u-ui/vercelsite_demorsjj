import React from 'react';
import { Metadata } from 'next';
import { UserGroupIcon, AcademicCapIcon, BriefcaseIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata: Metadata = {
  title: '加入我们 - 海创共坊',
  description: '加入海创共坊，成为我们的合作伙伴。我们为创客、设备厂商和技术人员提供广阔的发展平台。',
};

// 定义角色数据结构
type SubRole = {
  name: string;
  subRoles?: SubRole[];
};

type Role = {
  name: string;
  subRoles: SubRole[];
};

type CareerCategory = {
  name: string;
  description: string;
  icon: React.ElementType;
  roles: Role[];
};

// 角色数据
const careerData: CareerCategory[] = [
  {
    name: '创客',
    description: '为设计师、艺术家、手工艺者和工程师提供创意实现平台，让想法变为现实。',
    icon: AcademicCapIcon,
    roles: [
      {
        name: '设计师',
        subRoles: [
          { name: '平面设计师' },
          { name: '产品设计师' },
          { name: '工业设计师' },
          { name: '建筑设计师' },
          { name: '时尚设计师' },
          { name: '医疗设备设计师' }
        ]
      },
      {
        name: '艺术家',
        subRoles: [
          { name: '艺术家' },
          { name: '数字艺术家' },
          { name: '雕塑艺术家' }
        ]
      },
      {
        name: '手工艺者',
        subRoles: [
          { name: '珠宝首饰' },
          { name: '混合媒介' }
        ]
      },
      {
        name: '研发工程师',
        subRoles: [
          { name: '机械/产品工程师' },
          { name: '生物医学工程师' },
          { name: '电子/电气工程师' },
          { name: '土木/建筑工程师' },
          { name: '材料工程师' }
        ]
      }
    ]
  },
  {
    name: '设备厂商/公司',
    description: '我们欢迎各类生产设备的厂商加入，共同打造高效的生产制造生态系统。',
    icon: WrenchScrewdriverIcon,
    roles: [
      {
        name: '设备与服务厂商',
        subRoles: [
          { name: '3D打印服务平台/厂商' },
          { name: '平面打印制作厂商/公司' },
          { name: '3D打印耗材厂商/公司' }
        ]
      }
    ]
  },
  {
    name: '专业支持',
    description: '专业技术人员是我们生态系统的重要支撑，我们期待各领域人才的加入。',
    icon: BriefcaseIcon,
    roles: [
      {
        name: '法律',
        subRoles: [
          { name: '律师事务所' }
        ]
      },
      {
        name: '知识产权',
        subRoles: [
          { 
            name: '专利代理',
            subRoles: [
              { name: '专利代理人' },
              { name: '专利工程师' },
              { name: '专利分析师' }
            ] 
          },
          { 
            name: '商标代理',
            subRoles: [
              { name: '商标代理人' },
              { name: '商标顾问' }
            ] 
          },
          { 
            name: '版权服务',
            subRoles: [
              { name: '版权登记专员' },
              { name: '版权交易顾问' },
              { name: '作品鉴定专家' }
            ] 
          },
          { 
            name: '知识产权评估',
            subRoles: [
              { name: '知识产权评估师' },
              { name: '知识产权交易专家' },
              { name: '知识产权价值分析师' }
            ] 
          },
          { 
            name: '知识产权维权',
            subRoles: [
              { name: '知识产权律师' },
              { name: '权利保护顾问' },
              { name: '诉讼代理人' }
            ] 
          }
        ]
      },
      {
        name: '财务',
        subRoles: [
          { 
            name: '会计师',
            subRoles: [
              { name: '出纳' },
              { name: '财务会计师' },
              { name: '注册会计师' }
            ]
          },
          { 
            name: '顾问',
            subRoles: [
              { name: '商业顾问' },
              { name: '管理顾问' },
              { name: '技术顾问' }
            ]
          },
          { 
            name: '金融从业者',
            subRoles: [
              { name: '金融分析师' },
              { name: '财务报告分析师' },
              { name: '业务分析师' },
              { name: '报税员' },
              { name: '财务经理' }
            ]
          }
        ]
      },
      {
        name: '技术',
        subRoles: [
          { name: '3D打印技术人员/团队' },
          { name: '相关软件专家' }
        ]
      }
    ]
  }
];

export default function JoinPage() {
  // 递归渲染子角色函数
  const renderSubRoles = (subRoles: SubRole[], level: number = 0) => {
    if (!subRoles || subRoles.length === 0) return null;
    
    return (
      <ul className={`mt-2 space-y-1 ${level > 0 ? 'ml-4' : ''}`}>
        {subRoles.map((subRole, index) => (
          <li key={index} className="text-gray-600">
            <div className="flex items-start">
              <span className="mr-2">•</span>
              <div>
                <span className="hover:text-indigo-600 transition-colors">{subRole.name}</span>
                {subRole.subRoles && renderSubRoles(subRole.subRoles, level + 1)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-white">
      {/* 头部横幅 */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-blue-500 py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-center opacity-10"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">加入我们</h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
            Careers
          </p>
        </div>
      </div>

      {/* 内容部分 */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-lg text-gray-600 mb-16">
          海创共坊欢迎各类人才与企业加入我们的生态系统，共同推动创意与技术的融合创新。无论您是创意设计者、技术专家还是设备提供商，这里都有适合您的位置。
        </p>

        {/* 角色锚点导航区 */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {careerData.map((category, idx) => (
            <a
              key={category.name}
              href={`#career-${idx}`}
              className="flex items-center px-4 py-2 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium text-base transition-colors border border-indigo-100 shadow-sm gap-2"
            >
              <category.icon className="h-6 w-6" aria-hidden="true" />
              {category.name}
            </a>
          ))}
        </div>

        {/* 角色分类 */}
        <div className="space-y-24">
          {careerData.map((category, categoryIndex) => (
            <div key={categoryIndex} id={`career-${categoryIndex}`} className="relative">
              {/* 类别标题与描述 */}
              <div className="flex items-center mb-8">
                <div className="flex-shrink-0 h-14 w-14 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <category.icon className="h-8 w-8 text-indigo-600" aria-hidden="true" />
                </div>
                <div className="ml-6">
                  <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                  <p className="mt-2 text-gray-600">{category.description}</p>
                </div>
              </div>

              {/* 网格布局 */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {category.roles.map((role, roleIndex) => (
                  <div key={roleIndex} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900 pb-3 border-b border-gray-200">
                        {role.name}
                      </h3>
                      {renderSubRoles(role.subRoles)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 联系与申请 */}
      <div className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-indigo-900">与我们合作</h2>
          <p className="mt-4 text-lg text-indigo-700 max-w-3xl mx-auto">
            无论您是想加入我们的团队，还是寻求业务合作，我们都期待与您沟通交流，共同探索未来的可能性。
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              联系我们
            </a>
            <a
              href="mailto:join@hcgf.com"
              className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50"
            >
              发送申请
            </a>
          </div>
        </div>
      </div>

      <BackToTopButton />
    </div>
  );
} 