import React from 'react';
import { Metadata } from 'next';
import { BriefcaseIcon, BeakerIcon, BuildingOfficeIcon, CubeIcon, HeartIcon, FilmIcon } from '@heroicons/react/24/outline';
import BackToTopButton from '@/components/BackToTopButton';

export const metadata: Metadata = {
  title: '行业赋能 - 海创共坊',
  description: '海创共坊为文化艺术、创意设计、建筑设计、工程工业、医疗健康及时尚媒体等领域提供创新赋能解决方案',
};

// 定义行业数据结构
type SubCategory = {
  name: string;
};

type Category = {
  name: string;
  subcategories: SubCategory[];
};

type Industry = {
  name: string;
  description: string;
  icon: React.ElementType;
  categories: Category[];
};

// 行业数据
const industriesData: Industry[] = [
  {
    name: '文化艺术领域',
    description: '致力于文化遗产的保护与传承，艺术作品的复制与创新，为文化艺术领域提供先进技术支持。',
    icon: FilmIcon,
    categories: [
      {
        name: '文物',
        subcategories: [
          { name: '文物复制' },
          { name: '文物文创衍生品' }
        ]
      },
      {
        name: '艺术',
        subcategories: [
          { name: '艺术装置' },
          { name: '艺术衍生品' },
          { name: '艺术复制品' },
          { name: '数字艺术实体化' }
        ]
      }
    ]
  },
  {
    name: '创意设计领域',
    description: '为创意设计提供从概念到实体的全流程解决方案，赋能创意产业的快速发展与创新。',
    icon: BeakerIcon,
    categories: [
      {
        name: '潮玩',
        subcategories: [
          { name: '潮玩手办' },
          { name: '电影动漫周边' }
        ]
      },
      {
        name: '室内设计',
        subcategories: [
          { name: '异形家具' },
          { name: '艺术灯具' },
          { name: '家居装饰' }
        ]
      },
      {
        name: '生活日用',
        subcategories: [
          { name: '花器容器' },
          { name: '电子设备配件' }
        ]
      }
    ]
  },
  {
    name: '建筑设计领域',
    description: '将先进制造技术应用于建筑设计领域，实现复杂结构的高精度实体化，推动建筑创新。',
    icon: BuildingOfficeIcon,
    categories: [
      {
        name: '建筑模型',
        subcategories: [
          { name: '建筑概念模型' }
        ]
      },
      {
        name: '实验建筑',
        subcategories: [
          { name: '建筑结构化生产' },
          { name: '复杂架构实体化' },
          { name: '应急房屋制造' }
        ]
      }
    ]
  },
  {
    name: '工程工业领域',
    description: '为工业制造提供定制化解决方案，助力产业升级与技术创新，提升制造效率与产品性能。',
    icon: CubeIcon,
    categories: [
      {
        name: '汽车制造',
        subcategories: [
          { name: '汽车零部件' },
          { name: '内饰定制' }
        ]
      },
      {
        name: '电子产品',
        subcategories: [
          { name: '消费电子产品' }
        ]
      },
      {
        name: '工业设备部件',
        subcategories: []
      }
    ]
  },
  {
    name: '医疗健康领域',
    description: '应用精密制造技术于医疗健康领域，提供个性化医疗解决方案，提升医疗效果与患者体验。',
    icon: HeartIcon,
    categories: [
      {
        name: '医疗设备',
        subcategories: [
          { name: '截骨导板' },
          { name: '定制化植入物' },
          { name: '体外假体' }
        ]
      },
      {
        name: '牙科矫正',
        subcategories: [
          { name: '牙齿矫正' }
        ]
      }
    ]
  },
  {
    name: '时尚媒体领域',
    description: '将创新技术融入时尚产业，创造独特设计与功能性产品，引领时尚趋势与可持续发展。',
    icon: BriefcaseIcon,
    categories: [
      {
        name: '服装',
        subcategories: [
          { name: '实验性时装' },
          { name: '功能性服饰' },
          { name: '服装面料' }
        ]
      },
      {
        name: '配饰',
        subcategories: [
          { name: '鞋履箱包' },
          { name: '穿戴配饰' }
        ]
      }
    ]
  }
];

export default function IndustryPage() {
  return (
    <div className="bg-white">
      {/* 头部横幅 */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-blue-500 py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-center opacity-10"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">赋能生态</h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
            Industry Solutions
          </p>
        </div>
      </div>

      {/* 内容部分 */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-lg text-gray-600 mb-16">
          海创共坊通过创新技术与专业服务，为多个行业提供定制化解决方案，赋能各领域创新发展与数字化转型。
        </p>

        {/* 行业锚点导航区 */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {industriesData.map((industry, idx) => (
            <a
              key={industry.name}
              href={`#industry-${idx}`}
              className="flex items-center px-4 py-2 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium text-base transition-colors border border-indigo-100 shadow-sm gap-2"
            >
              <industry.icon className="h-6 w-6" aria-hidden="true" />
              {industry.name}
            </a>
          ))}
        </div>

        {/* 行业分类 */}
        <div className="space-y-24">
          {industriesData.map((industry, industryIndex) => (
            <div key={industryIndex} id={`industry-${industryIndex}`} className="relative">
              {/* 行业标题与描述 */}
              <div className="flex items-center mb-8">
                <div className="flex-shrink-0 h-14 w-14 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <industry.icon className="h-8 w-8 text-indigo-600" aria-hidden="true" />
                </div>
                <div className="ml-6">
                  <h2 className="text-2xl font-bold text-gray-900">{industry.name}</h2>
                  <p className="mt-2 text-gray-600">{industry.description}</p>
                </div>
              </div>

              {/* 网格布局 */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {industry.categories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900 pb-3 border-b border-gray-200">
                        {category.name}
                      </h3>
                      <ul className="mt-4 space-y-2">
                        {category.subcategories.map((subcategory, subcategoryIndex) => (
                          <li key={subcategoryIndex} className="text-gray-600 hover:text-indigo-600 transition-colors">
                            • {subcategory.name}
                          </li>
                        ))}
                        {category.subcategories.length === 0 && (
                          <li className="text-gray-500 italic">多样化解决方案</li>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 联系我们 */}
      <div className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-indigo-900">寻找您的行业解决方案</h2>
          <p className="mt-4 text-lg text-indigo-700">
            无论您所在的行业面临何种挑战，我们都能提供创新的解决方案
          </p>
          <div className="mt-8">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              联系我们
            </a>
          </div>
        </div>
      </div>

      <BackToTopButton />
    </div>
  );
} 