import Image from "next/image";
import Link from "next/link";
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import { artworks, Artwork } from "@/data/artworks";
import { events, Event } from "@/data/events";
import { designers, Designer } from "@/data/designers";
import { categories, CategoryInfo } from "@/data/categories";
import { serviceProcess, ServiceProcess } from "@/data/serviceProcess";

export default function Home() {
  // 获取精选作品（前4个）
  const featuredArtworks = artworks.slice(0, 4);
  
  // 获取热门设计师（前6个）
  const featuredDesigners = designers.slice(0, 6);
  
  // 获取近期活动（前3个）
  const upcomingEvents = events.slice(0, 3);
  
  return (
    <main className="bg-white">
      {/* 关于我们 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-serif mb-6">关于海创共坊</h2>
              <p className="text-lg text-gray-600 mb-6">
                海创共坊是一个连接设计师、艺术家和收藏家的创新平台，致力于通过3D打印技术推动艺术与设计的边界。
                我们提供从创意到实现的全流程服务，帮助创作者将想法转化为实体作品。
              </p>
              <p className="text-lg text-gray-600 mb-8">
                作为中国领先的艺术科技平台，我们不仅提供先进的3D打印技术，还为创作者提供展示、销售和保护作品的综合解决方案，
                建立了一个充满活力的创意社区。
              </p>
              <Link href="/about" className="inline-flex items-center text-black font-medium hover:underline">
                了解更多
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <Image
                  src="/images/high-quality/3d-printing-studio.jpg"
                  alt="3D打印工作室环境"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <Image
                  src="/images/high-quality/3d-printer-working.jpg"
                  alt="高精度3D打印机工作过程"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <Image
                  src="/images/high-quality/designer-modeling.jpg"
                  alt="设计师使用3D建模软件工作场景"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <Image
                  src="/images/high-quality/printed-artwork.jpg"
                  alt="3D打印艺术品展示"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心服务 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif mb-4">我们的核心服务</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              海创共坊提供全方位的服务，从3D打印技术到艺术品展示与销售，为创作者提供一站式解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 3D打印服务 */}
            <div className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 text-white">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">3D打印服务</h3>
              <p className="text-gray-600 mb-6">
                提供高精度3D打印服务，支持多种材料选择，从模型上传到成品交付的全流程服务，包含RFID防伪标签集成。
              </p>
              <Link href="/services/3d-printing" className="inline-flex items-center text-black font-medium hover:underline">
                了解详情
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* 展览平台 */}
            <div className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 text-white">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">展览平台</h3>
              <p className="text-gray-600 mb-6">
                提供线上线下展览空间，帮助艺术家和设计师展示作品，连接潜在买家和收藏家，提升作品曝光度。
              </p>
              <Link href="/space/exhibition" className="inline-flex items-center text-black font-medium hover:underline">
                了解详情
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* 专业服务 */}
            <div className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 text-white">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">专业服务</h3>
              <p className="text-gray-600 mb-6">
                提供知识产权保护、设计咨询、技术支持等专业服务，助力创作者专注于创意，无后顾之忧。
              </p>
              <Link href="/services" className="inline-flex items-center text-black font-medium hover:underline">
                了解详情
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 精选作品 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-baseline mb-12">
            <h2 className="text-3xl font-serif">精选作品</h2>
            <Link href="/artworks" className="text-sm text-gray-500 hover:text-black hover:underline">
              查看全部
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredArtworks.map((artwork) => (
              <article key={artwork.id} className="group">
                <Link href={`/artworks/${artwork.id}`} className="block">
                  <div className="relative aspect-square bg-gray-100 mb-4 overflow-hidden">
                    {artwork.image ? (
                      <Image
                        src={artwork.image}
                        alt={artwork.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <span className="text-gray-400">{artwork.title}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-base font-medium text-gray-900 mb-1">{artwork.title}</h3>
                  <p className="text-sm text-gray-500">{artwork.creator}</p>
                  {artwork.price && (
                    <p className="text-sm text-gray-900 mt-1">¥{artwork.price.toLocaleString()}</p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 近期展览 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-baseline mb-12">
            <h2 className="text-3xl font-serif">近期展览</h2>
            <Link href="/events" className="text-sm text-gray-500 hover:text-black hover:underline">
              查看全部
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <article key={event.id} className="bg-white group overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/events/${event.id}`} className="block">
                  <div className="relative aspect-[3/2] bg-gray-100 overflow-hidden">
                    {event.image ? (
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <span className="text-gray-400">{event.title}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{event.location}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(event.startDate).toLocaleDateString('zh-CN')} - {new Date(event.endDate).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 热门设计师 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-baseline mb-12">
            <h2 className="text-3xl font-serif">热门设计师</h2>
            <Link href="/designers" className="text-sm text-gray-500 hover:text-black hover:underline">
              查看全部
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {featuredDesigners.map((designer: Designer) => (
              <Link key={designer.id} href={`/designers/${designer.id}`} className="group">
                <div className="text-center">
                  <div className="relative w-full aspect-square bg-gray-100 rounded-full mb-4 overflow-hidden">
                    {designer.avatar ? (
                      <Image
                        src={designer.avatar}
                        alt={designer.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <span className="text-2xl font-medium text-gray-400">{designer.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:underline">{designer.name}</h3>
                  <p className="text-xs text-gray-500">{designer.location || "中国"}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 特色设计师 */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">特色设计师</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              探索来自世界各地的优秀设计师及其作品
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {designers.map((designer) => (
              <li key={designer.name}>
                <Card className="h-full flex flex-col">
                  <div className="relative h-40 w-full flex-shrink-0">
                    <Image
                      className="absolute inset-0 h-full w-full object-cover"
                      src={designer.avatar || "/images/designer-placeholder.jpg"}
                      alt=""
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">{designer.name}</h3>
                    <p className="text-base leading-7 text-gray-600">{designer.specialties.join(', ')}</p>
                    <p className="mt-4 text-sm leading-6 text-gray-500 flex-grow">{designer.bio}</p>
                    <div className="mt-6 flex gap-x-6">
                      <Button href={`/designers/${designer.id}`} variant="secondary" size="sm" className="w-full">
                        查看作品
                      </Button>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 近期活动 */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">近期活动</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              参与我们的线上线下活动，与创意社区一起交流与成长
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {events.map((event) => (
              <Card key={event.id} href={`/events/${event.id}`} interactive className="flex flex-col">
                <div className="relative h-56 w-full flex-shrink-0">
                  <Image
                    className="absolute inset-0 h-full w-full object-cover"
                    src={event.image || "/images/event-placeholder.jpg"}
                    alt=""
                    width={500}
                    height={300}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-gray-900/0"></div>
                  <div className="absolute bottom-4 left-4">
                    <Tag variant="primary" className="text-xs">
                      {event.type}
                    </Tag>
                  </div>
                </div>
                <div className="flex-grow p-6">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={event.startDate} className="text-gray-500">
                      {new Date(event.startDate).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      {event.title}
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{event.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* 服务流程 */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">服务流程</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              简单四步，轻松实现您的创意
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {serviceProcess.map((service) => (
                <Card key={service.name} className="flex flex-col items-start">
                  <div className="rounded-md bg-gray-50 p-6 mb-6">
                    <div className="h-10 w-10 flex items-center justify-center">
                      <service.icon className="h-8 w-8 text-gray-900" aria-hidden="true" />
                    </div>
                  </div>
                  <dt className="text-lg font-semibold leading-7 text-gray-900">{service.name}</dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{service.description}</dd>
                </Card>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* 加入我们 */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="text-3xl font-serif mb-6">加入海创共坊</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-xl">
                无论您是设计师、艺术家还是艺术爱好者，加入我们的社区，探索3D打印的无限可能，
                展示您的创意，与志同道合的创作者交流，获取专业支持和资源。
              </p>
              <Link href="/membership" className="inline-block px-8 py-3 bg-white text-black font-medium hover:bg-gray-100 transition-colors">
                成为会员
              </Link>
            </div>
            <div className="lg:w-1/3">
              <form className="bg-gray-900 p-8">
                <h3 className="text-xl font-medium mb-6">订阅我们的通讯</h3>
                <p className="text-gray-400 mb-6">获取最新的展览信息、设计师动态和独家优惠</p>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="您的邮箱地址"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-medium bg-white text-black hover:bg-gray-100 focus:outline-none"
                  >
                    订阅
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
