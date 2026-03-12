"use client";
import React from 'react';
import { Metadata } from 'next';
import { 
  HandRaisedIcon, 
  PrinterIcon, 
  WrenchScrewdriverIcon, 
  BuildingStorefrontIcon, 
  AcademicCapIcon, 
  UserGroupIcon, 
  BuildingLibraryIcon, 
  GlobeAltIcon,
  CubeIcon,
  DocumentTextIcon,
  UsersIcon,
  BeakerIcon,
  AcademicCapIcon as CapIcon,
  CheckIcon,
  FilmIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

// 定义伙伴类型
type PartnerFeature = {
  title: string;
  description: string;
};

type PartnerType = {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
  features: PartnerFeature[];
};

// 伙伴数据
const partnerTypes: PartnerType[] = [
  {
    id: 'printing-service',
    name: '平面打印服务商',
    icon: PrinterIcon,
    color: 'bg-purple-100 text-purple-700',
    description: '提供专业平面印刷、大幅面打印、超精艺术品级平面打印、纹理复制等服务的企业与团队，致力于高品质视觉呈现。',
    features: [
      { title: '超精艺术品级打印', description: '采用顶尖设备和工艺，实现媲美原作的艺术品复制效果' },
      { title: '多样化印刷', description: '提供多种材质和尺寸的平面打印服务，满足各类创意需求' },
      { title: '工艺创新', description: '特殊纹理、材质与效果的印刷工艺，实现独特视觉体验' },
      { title: '设备共享', description: '共享高端印刷设备资源，提高生产效率和成本效益' },
      { title: '联合服务', description: '结合3D与平面打印的综合解决方案，打造全方位创意实现平台' }
    ]
  },
  {
    id: '3d-printing',
    name: '3D打印商',
    icon: PrinterIcon,
    color: 'bg-amber-100 text-amber-700',
    description: '提供专业3D打印生产服务的企业与团队，拥有多种打印工艺与设备。',
    features: [
      { title: '设备共享', description: '共享高端3D打印设备，实现资源优化配置' },
      { title: '产能互补', description: '高峰期产能共享，提高整体生产效率' },
      { title: '技术交流', description: '分享最新打印工艺和技术创新成果' },
      { title: '联合投标', description: '合作承接大型项目，共同分担风险与收益' }
    ]
  },
  {
    id: '3d-scanning',
    name: '3D扫描商',
    icon: PrinterIcon,
    color: 'bg-blue-100 text-blue-700',
    description: '提供精密3D扫描与逆向工程服务的专业机构，帮助将实体转化为数字模型。',
    features: [
      { title: '扫描技术', description: '共享高精度扫描设备与技术' },
      { title: '数据处理', description: '提供点云数据处理与优化服务' },
      { title: '资源共享', description: '共同承接大型扫描项目' },
      { title: '技术研发', description: '联合开发新型扫描应用场景' }
    ]
  },
  {
    id: 'post-processing',
    name: '后处理设备',
    icon: WrenchScrewdriverIcon,
    color: 'bg-yellow-100 text-yellow-700',
    description: '专注于3D打印后处理工艺与设备的企业，提供表面处理、着色、强化等服务。',
    features: [
      { title: '工艺共享', description: '专业后处理工艺与设备资源共享' },
      { title: '质量标准', description: '共同建立后处理质量标准与规范' },
      { title: '技术创新', description: '联合研发新型后处理技术与材料' },
      { title: '培训交流', description: '组织后处理技术培训与经验分享' }
    ]
  },
  {
    id: 'material-supplier',
    name: '材料供应商',
    icon: BuildingStorefrontIcon,
    color: 'bg-green-100 text-green-700',
    description: '提供各类3D打印材料的生产商与供应商，包括塑料、金属、陶瓷等多种材料。',
    features: [
      { title: '优惠供应', description: '建立长期稳定的材料供应合作关系' },
      { title: '定制材料', description: '根据项目需求开发专用材料' },
      { title: '质量保障', description: '提供高质量、稳定性好的打印材料' },
      { title: '技术支持', description: '材料使用培训与技术指导' }
    ]
  },
  {
    id: 'expert-group',
    name: '专家智库组',
    icon: AcademicCapIcon,
    color: 'bg-indigo-100 text-indigo-700',
    description: '由各领域专家组成的顾问团队，为项目提供专业指导与创新思路。',
    features: [
      { title: '技术指导', description: '项目关键技术难点攻关与指导' },
      { title: '方案评审', description: '重大项目方案设计与评审' },
      { title: '趋势洞察', description: '行业发展趋势与前沿技术分析' },
      { title: '学术交流', description: '组织学术研讨与交流活动' }
    ]
  },
  {
    id: 'training-center',
    name: '培训中心组',
    icon: UserGroupIcon,
    color: 'bg-rose-100 text-rose-700',
    description: '专注于3D打印相关技术培训的机构，提供专业技能培训与认证。',
    features: [
      { title: '技术培训', description: '设计与打印技术专业培训课程' },
      { title: '认证服务', description: '行业技能认证与评定' },
      { title: '资源共享', description: '共享培训资源与教学材料' },
      { title: '人才输送', description: '为企业培养专业技术人才' }
    ]
  },
  {
    id: 'museum',
    name: '博物馆',
    icon: BuildingLibraryIcon,
    color: 'bg-teal-100 text-teal-700',
    description: '历史、科技、艺术等各类博物馆，通过数字化技术焕发传统文物新活力，创造沉浸式体验。',
    features: [
      { title: '文物数字化', description: '利用3D扫描技术实现珍贵文物的数字化保存与研究' },
      { title: '交互式展览', description: '创建基于3D打印复制品的可触摸互动展项' },
      { title: '损毁文物修复', description: '通过逆向工程与3D打印技术修复损毁文物' },
      { title: '教育推广', description: '开发3D数字模型教学资源与可手持的文物复制品' },
      { title: '文创产品开发', description: '基于馆藏资源共同开发高品质文创衍生品' }
    ]
  },
  {
    id: 'art-gallery',
    name: '艺术机构',
    icon: BuildingLibraryIcon,
    color: 'bg-pink-100 text-pink-700',
    description: '美术馆、艺术中心、创意空间等艺术展示与创作机构，通过数字制造技术拓展艺术创作与展示边界。',
    features: [
      { title: '艺术家合作', description: '为艺术家提供3D创作技术支持与制作服务' },
      { title: '艺术作品修复', description: '通过先进扫描与打印技术协助修复艺术品' },
      { title: '跨媒介展览', description: '策划结合数字制造的创新型展览项目' },
      { title: '艺术教育', description: '开展3D艺术创作工作坊与体验活动' },
      { title: '限量艺术品', description: '合作生产高品质限量版艺术复制品' }
    ]
  },
  {
    id: 'tourism',
    name: '旅游景区',
    icon: GlobeAltIcon,
    color: 'bg-orange-100 text-orange-700',
    description: '各类旅游景点与旅游区域管理机构，通过创新技术提升游客体验与文化传播。',
    features: [
      { title: '景点微缩模型', description: '制作精确的景区微缩3D模型用于展示与规划' },
      { title: '特色文创纪念品', description: '定制开发基于景区特色的3D打印文创商品' },
      { title: '互动体验设施', description: '设计制作景区特色互动科技体验设施' },
      { title: '文化遗产复制', description: '对不可移动文化遗产进行数字化与复制展示' },
      { title: '导览系统升级', description: '开发整合AR与3D模型的智能导览展示系统' }
    ]
  },
  {
    id: 'foundation',
    name: '基金会',
    icon: HandRaisedIcon,
    color: 'bg-cyan-100 text-cyan-700',
    description: '专注于支持和投资文化创意IP的基金会与投资机构，通过资金、资源对接助力IP的孵化、成长与价值实现。',
    features: [
      { title: 'IP项目投资', description: '对具有潜力的原创IP项目进行早期投资与孵化支持' },
      { title: '创作激励基金', description: '设立专项基金，奖励优秀设计师与创意团队的IP创作' },
      { title: 'IP市场推广', description: '协助优质IP进行市场推广、品牌建设与商业模式探索' },
      { title: '产业资源对接', description: '链接产业链上下游资源，促进IP成果转化与应用' },
      { title: 'IP价值评估与研究', description: '提供IP价值评估、行业趋势分析与发展策略咨询' }
    ]
  },
  {
    id: 'media',
    name: '影视动漫',
    icon: FilmIcon,
    color: 'bg-red-100 text-red-700',
    description: '电影、电视、动画、游戏等内容制作方，寻求通过3D技术创新表现形式与制作方法的合作伙伴。',
    features: [
      { title: '特效制作', description: '利用3D打印技术制作高精度影视道具与模型' },
      { title: '场景构建', description: '快速打造微缩场景与建筑模型' },
      { title: '动漫角色', description: '将二维角色转化为三维实体模型' },
      { title: '教育节目', description: '合作制作科普教育内容与展示' },
      { title: '宣传推广', description: '跨界联合宣传与品牌推广活动' }
    ]
  },
  {
    id: 'toy-entertainment',
    name: '娱乐潮玩',
    icon: SparklesIcon,
    color: 'bg-violet-100 text-violet-700',
    description: '潮流玩具、盲盒、手办、收藏品等领域的设计与制造企业，探索IP衍生品与创新消费体验。',
    features: [
      { title: 'IP合作', description: '授权IP形象的3D模型开发与定制生产' },
      { title: '限量款设计', description: '合作开发独特限量版潮玩产品' },
      { title: '快速原型', description: '利用3D打印技术快速迭代产品设计' },
      { title: '粉丝定制', description: '提供基于用户喜好的个性化定制服务' },
      { title: '展示体验', description: '创新型潮玩展示与互动体验空间' }
    ]
  },
  {
    id: 'publishing',
    name: '出版发行',
    icon: DocumentTextIcon,
    color: 'bg-emerald-100 text-emerald-700',
    description: '图书、期刊、数字出版等行业的内容创作与发行机构，探索新型出版形式与用户体验。',
    features: [
      { title: '增强型图书', description: '结合3D打印组件的创新型互动读物' },
      { title: '触感教育', description: '为教育类图书提供可触摸的3D模型配件' },
      { title: '数字资产', description: '出版物相关的3D数字模型开发与授权' },
      { title: '艺术限量版', description: '结合传统出版与3D打印的艺术收藏品' },
      { title: '特殊人群出版', description: '为视障等特殊人群开发触感型阅读材料' }
    ]
  }
];

export default function CooperationPage() {
  return (
    <div className="bg-white">
      {/* 头部横幅 */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-blue-500 py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-center opacity-10"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">成为伙伴</h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
            携手共创，合作共赢
          </p>
        </div>
      </div>

      {/* 介绍部分 */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">海创共坊伙伴生态</p>
          <p className="max-w-3xl mt-5 mx-auto text-xl text-gray-500">
            我们致力于建立开放、共赢的伙伴生态系统，欢迎各类伙伴加入，共同推动创新与发展
          </p>
        </div>

        {/* 伙伴锚点目录 */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {partnerTypes.map((type) => (
            <a
              key={type.id}
              href={`#${type.id}`}
              className="inline-block px-4 py-2 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium text-sm transition-colors duration-150 border border-indigo-100"
            >
              {type.name}
            </a>
          ))}
        </div>

        {/* 分类图示 */}
        <div className="mt-16 flex justify-center">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
            {partnerTypes.map((type, index) => (
              <a
                key={index}
                href={`#${type.id}`}
                className="col-span-1 flex flex-col items-center group focus:outline-none focus:ring-2 focus:ring-indigo-500"
                tabIndex={0}
              >
                <div className={`w-full h-32 ${type.color.split(' ')[0]} rounded-lg flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow duration-150`}>
                  <div className="text-center p-4">
                    <type.icon className="mx-auto h-10 w-10" aria-hidden="true" />
                    <div className="mt-2 text-lg font-medium">{type.name}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 伙伴详情 */}
        <div className="mt-20 space-y-20">
          {partnerTypes.map((partner) => (
            <div id={partner.id} key={partner.id} className="relative">
              <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                <div>
                  <div className={`flex items-center justify-center h-16 w-16 rounded-md ${partner.color} mb-4`}>
                    <partner.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900" id={partner.id}>{partner.name}</h2>
                  <p className="mt-4 text-lg text-gray-500">{partner.description}</p>
                  <div className="mt-6">
                    <a
                      href="/contact"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      合作咨询
                    </a>
                  </div>
                </div>
                <div className="mt-12 lg:mt-0 lg:col-span-2">
                  <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10">
                    {partner.features.map((feature) => (
                      <div key={feature.title} className="relative">
                        <dt>
                          <div className="absolute flex items-center justify-center h-8 w-8 rounded-md bg-indigo-500 text-white">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <p className="ml-12 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                        </dt>
                        <dd className="mt-2 ml-12 text-base text-gray-500">{feature.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 合作流程 */}
      <div className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">合作流程</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">成为我们的伙伴</p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">简单四步，开启合作</p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-4 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <span className="text-lg font-bold">1</span>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">提交申请</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">填写合作申请表，告诉我们您的专业领域与合作意向</dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <span className="text-lg font-bold">2</span>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">需求对接</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">我们的团队将与您沟通，明确双方需求与合作模式</dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">签署协议</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">确定合作内容，签署正式合作协议</dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <span className="text-lg font-bold">4</span>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">开始合作</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">正式启动合作项目，共创价值</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* 联系部分 */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-indigo-900">加入我们的伙伴网络</h2>
          <p className="mt-4 text-lg text-indigo-700 max-w-3xl mx-auto">
            无论您是哪类型的伙伴，我们都期待与您建立长期、互利的合作关系
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              联系我们
            </a>
            <a
              href="mailto:cooperation@hcgf.com"
              className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50"
            >
              合作咨询
            </a>
          </div>
        </div>
      </div>

      {/* 返回顶部浮动按钮 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="返回顶部"
        style={{ boxShadow: '0 4px 16px rgba(79,70,229,0.15)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
} 