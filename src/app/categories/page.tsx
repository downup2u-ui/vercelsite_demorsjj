import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/data/categories';

export default function CategoriesPage() {
  return (
    <div className="bg-white">
      {/* 页面标题 */}
      <div className="relative bg-gray-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white/30" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            行业分类
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-700">
            探索不同行业的3D打印应用，发现创新设计与解决方案
          </p>
        </div>
      </div>

      {/* 分类列表 */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/categories/${category.id}`}
              className="group"
            >
              <div className="overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* 分类图片 */}
                <div className="relative aspect-[16/9] w-full bg-gray-100">
                  {category.heroImage ? (
                    <Image
                      src={category.heroImage}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-200">
                      <span className="text-2xl font-medium text-gray-400">{category.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-xl font-bold text-white">{category.name}</h2>
                    <p className="text-sm text-white/80 mt-1">
                      {category.designers && category.designers.length > 0 
                        ? `${category.designers.length} 位设计师` 
                        : '探索创新设计'}
                    </p>
                  </div>
                </div>
                
                {/* 分类描述 */}
                <div className="p-6">
                  <p className="text-sm text-gray-600 line-clamp-3">{category.description}</p>
                  <div className="mt-4 flex items-center">
                    <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                      查看详情
                    </span>
                    <svg className="ml-1 h-4 w-4 text-indigo-600 group-hover:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 行业统计 */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">行业数据</h2>
            <p className="mt-4 text-lg text-gray-600">潮创共坊覆盖多个行业，为设计师提供全方位支持</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-indigo-600 mb-2">{categories.length}</div>
              <div className="text-sm text-gray-600">行业覆盖</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {categories.reduce((total, cat) => total + (cat.designers?.length || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">活跃设计师</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {categories.reduce((total, cat) => total + (cat.artworks || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">作品总数</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {categories.reduce((total, cat) => total + (cat.events || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">相关活动</div>
            </div>
          </div>
        </div>
      </div>

      {/* 热门行业 */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">热门行业</h2>
            <p className="mt-4 text-lg text-gray-600">这些行业在3D打印领域有着广泛的应用</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.slice(0, 3).map((category) => (
              <div key={category.id} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.name}</h3>
                <p className="text-gray-600 mb-6 line-clamp-3">{category.introduction}</p>
                
                <h4 className="text-sm font-medium text-gray-900 mb-2">热门技术</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {category.keyTechnologies?.slice(0, 3).map((tech, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Link 
                  href={`/categories/${category.id}`}
                  className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  查看详情
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
