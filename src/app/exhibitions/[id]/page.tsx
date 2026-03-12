"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  CalendarIcon, 
  MapPinIcon, 
  UserIcon, 
  ShareIcon, 
  HeartIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

// 模拟展览数据
const exhibitionData = {
  id: '1',
  title: '未来与传统的对话：当代设计中的文化元素',
  description: '本次展览探索了当代设计如何融合和重新诠释传统文化元素。展出作品涵盖产品设计、家具、时装、数字艺术等多个领域，展示了来自全球各地设计师对文化遗产的创新应用。通过这些作品，观众可以看到传统与现代、东方与西方、手工艺与科技如何在当代设计语境中碰撞与融合，创造出既有文化深度又具现代审美的设计作品。',
  longDescription: `
    <p>在全球化与数字化快速发展的今天，设计师们如何在创新中保持文化特性？传统元素如何在现代设计语境中焕发新生？本次展览通过精心策划的六个主题展区，呈现了来自全球15个国家和地区的120位设计师的200余件作品，试图回答这些问题。</p>
    
    <p>展览分为以下六个主题展区：</p>
    
    <h3>一、符号的重构</h3>
    <p>本展区聚焦设计师如何提取、解构和重组传统文化符号，赋予其新的形式和意义。从中国传统纹样到伊斯兰几何图案，从非洲部落图腾到北欧神话元素，设计师们通过现代设计语言重新诠释这些符号，使其在当代语境中焕发新的生命力。</p>
    
    <h3>二、材质的对话</h3>
    <p>传统工艺与现代技术如何在材质应用上产生对话？本展区展示了设计师们如何将传统材料（如竹、木、陶、丝等）与现代材料（如复合材料、智能材料、可持续材料等）结合，创造出既有文化温度又具现代功能的设计作品。</p>
    
    <h3>三、空间的记忆</h3>
    <p>空间是文化记忆的载体。本展区展示了建筑师和室内设计师如何在现代空间设计中融入传统空间元素和概念，创造出既能满足现代生活需求又能唤起文化共鸣的空间体验。</p>
    
    <h3>四、数字中的传统</h3>
    <p>数字技术如何成为传统文化传承和创新的新媒介？本展区展示了设计师和艺术家如何运用AR、VR、3D打印等数字技术，将传统文化元素转化为沉浸式体验和互动装置，开拓文化传承的新途径。</p>
    
    <h3>五、可持续的智慧</h3>
    <p>传统文化中蕴含着丰富的可持续智慧。本展区展示了设计师如何从传统生活方式、手工艺和哲学思想中汲取灵感，创造出符合当代可持续发展理念的设计解决方案。</p>
    
    <h3>六、跨文化的融合</h3>
    <p>在全球化背景下，不同文化元素如何碰撞、融合并创造新的设计语言？本展区展示了来自不同文化背景的设计师如何在自己的作品中融合多元文化元素，反映全球化时代的文化交流与融合。</p>
    
    <p>除了静态展示，本次展览还设有工作坊、讲座、互动装置和表演活动，邀请观众积极参与，深入体验传统文化在当代设计中的创新应用。</p>
  `,
  startDate: '2025-04-15',
  endDate: '2025-06-30',
  location: '潮创共坊展览中心 A馆',
  address: '广州市天河区潮创共坊大厦',
  curator: '张艺术',
  organizer: '潮创共坊艺术中心',
  sponsors: ['广州市文化局', '广东省设计协会', '未来设计基金会'],
  coverImage: '/images/exhibitions/traditional-modern.svg',
  galleryImages: [
    '/images/exhibitions/traditional-modern.svg',
    '/images/exhibitions/digital-art.svg',
    '/images/exhibitions/sustainable.svg',
    '/images/exhibitions/vip-trends.svg',
  ],
  artists: [
    { id: '1', name: '李明', avatar: '/profile/designer-avatar.svg', role: '主策展人' },
    { id: '2', name: '王华', avatar: '/profile/designer-avatar.svg', role: '联合策展人' },
    { id: '3', name: '张艺', avatar: '/profile/designer-avatar.svg', role: '参展设计师' },
    { id: '4', name: '赵创', avatar: '/profile/designer-avatar.svg', role: '参展设计师' },
    { id: '5', name: '刘新', avatar: '/profile/designer-avatar.svg', role: '参展设计师' },
  ],
  artworks: [
    { id: '1', title: '新山水', artist: '张艺', image: '/images/exhibitions/traditional-modern.svg' },
    { id: '2', title: '竹语', artist: '赵创', image: '/images/exhibitions/digital-art.svg' },
    { id: '3', title: '数字敦煌', artist: '刘新', image: '/images/exhibitions/sustainable.svg' },
    { id: '4', title: '丝路印象', artist: '王华', image: '/images/exhibitions/vip-trends.svg' },
  ],
  events: [
    { id: '1', title: '开幕式', date: '2025-04-15 14:00', type: '活动' },
    { id: '2', title: '策展人导览', date: '2025-04-16 10:00', type: '导览' },
    { id: '3', title: '传统与现代的碰撞：设计论坛', date: '2025-04-20 14:00', type: '讲座' },
    { id: '4', title: '文化符号工作坊', date: '2025-04-25 10:00', type: '工作坊' },
  ],
  ticketInfo: {
    regular: '¥80',
    student: '¥40',
    group: '¥60/人（10人以上团体）',
    free: '12岁以下儿童、65岁以上老人免费'
  },
  socialMedia: {
    wechat: 'chaochuanggongfang',
    weibo: '@潮创共坊'
  }
};

export default function ExhibitionDetailPage() {
  const params = useParams();
  const exhibitionId = params.id;
  
  // 在实际应用中，这里会根据exhibitionId从API获取展览数据
  // 这里使用模拟数据
  const exhibition = exhibitionData;
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  const handlePrevImage = () => {
    setActiveImageIndex((prev) => 
      prev === 0 ? exhibition.galleryImages.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setActiveImageIndex((prev) => 
      prev === exhibition.galleryImages.length - 1 ? 0 : prev + 1
    );
  };
  
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };
  
  return (
    <div className="bg-white">
      {/* 展览头部信息 */}
      <div className="relative">
        <div className="h-96 w-full overflow-hidden">
          <div className="relative h-full w-full">
            <Image
              src={exhibition.galleryImages[activeImageIndex] || exhibition.coverImage}
              alt={exhibition.title}
              className="object-cover"
              fill
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            
            {/* 图片导航按钮 */}
            <button 
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white bg-opacity-50 p-2 text-gray-800 hover:bg-opacity-75"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white bg-opacity-50 p-2 text-gray-800 hover:bg-opacity-75"
            >
              <ArrowRightIcon className="h-6 w-6" />
            </button>
            
            {/* 图片指示器 */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
              {exhibition.galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`h-2 w-2 rounded-full ${
                    activeImageIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent px-6 py-6 text-white sm:px-12">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold sm:text-4xl">{exhibition.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm sm:text-base">
              <div className="flex items-center">
                <CalendarIcon className="mr-1 h-5 w-5" />
                <span>{exhibition.startDate} - {exhibition.endDate}</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="mr-1 h-5 w-5" />
                <span>{exhibition.location}</span>
              </div>
              <div className="flex items-center">
                <UserIcon className="mr-1 h-5 w-5" />
                <span>策展人: {exhibition.curator}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 展览内容 */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="lg:flex lg:gap-x-12">
          {/* 主要内容 */}
          <div className="lg:w-2/3">
            {/* 展览介绍 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">展览介绍</h2>
              <div className="mt-6 text-gray-600">
                <p className="mb-4">{exhibition.description}</p>
                <div dangerouslySetInnerHTML={{ __html: exhibition.longDescription }} className="prose max-w-none" />
              </div>
            </section>
            
            {/* 参展艺术家 */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">参展艺术家</h2>
              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {exhibition.artists.map((artist) => (
                  <div key={artist.id} className="text-center">
                    <div className="mx-auto h-20 w-20 overflow-hidden rounded-full">
                      <Image
                        src={artist.avatar}
                        alt={artist.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="mt-2 font-medium text-gray-900">{artist.name}</h3>
                    <p className="text-sm text-gray-500">{artist.role}</p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* 展出作品 */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">展出作品</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {exhibition.artworks.map((artwork) => (
                  <Link key={artwork.id} href={`/artworks/${artwork.id}`} className="group">
                    <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg">
                      <Image
                        src={artwork.image}
                        alt={artwork.title}
                        width={400}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-2 font-medium text-gray-900 group-hover:text-indigo-600">{artwork.title}</h3>
                    <p className="text-sm text-gray-500">{artwork.artist}</p>
                  </Link>
                ))}
              </div>
            </section>
            
            {/* 相关活动 */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">相关活动</h2>
              <div className="mt-6 divide-y divide-gray-200">
                {exhibition.events.map((event) => (
                  <div key={event.id} className="py-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          {/* 侧边栏 */}
          <div className="mt-12 lg:mt-0 lg:w-1/3">
            {/* 操作按钮 */}
            <div className="flex space-x-4">
              <button
                onClick={toggleLike}
                className={`flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                  isLiked
                    ? 'bg-pink-100 text-pink-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <HeartIcon
                  className={`mr-2 h-5 w-5 ${isLiked ? 'fill-pink-700' : ''}`}
                />
                {isLiked ? '已收藏' : '收藏'}
              </button>
              <button className="flex items-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                <ShareIcon className="mr-2 h-5 w-5" />
                分享
              </button>
            </div>
            
            {/* 票务信息 */}
            <div className="mt-8 rounded-lg bg-gray-50 p-6">
              <h3 className="text-lg font-medium text-gray-900">票务信息</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt>普通票</dt>
                  <dd className="font-medium">{exhibition.ticketInfo.regular}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>学生票</dt>
                  <dd className="font-medium">{exhibition.ticketInfo.student}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>团体票</dt>
                  <dd className="font-medium">{exhibition.ticketInfo.group}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>免费政策</dt>
                  <dd className="font-medium">{exhibition.ticketInfo.free}</dd>
                </div>
              </dl>
              <button className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                立即购票
              </button>
            </div>
            
            {/* 展览信息 */}
            <div className="mt-8 rounded-lg bg-gray-50 p-6">
              <h3 className="text-lg font-medium text-gray-900">展览信息</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-medium text-gray-900">地址</dt>
                  <dd className="mt-1 text-gray-600">{exhibition.address}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">开放时间</dt>
                  <dd className="mt-1 text-gray-600">周二至周日 10:00-18:00（周一闭馆）</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">主办方</dt>
                  <dd className="mt-1 text-gray-600">{exhibition.organizer}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">赞助方</dt>
                  <dd className="mt-1 text-gray-600">
                    {exhibition.sponsors.join('、')}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">社交媒体</dt>
                  <dd className="mt-1 flex space-x-4 text-gray-600">
                    <span>微信: {exhibition.socialMedia.wechat}</span>
                    <span>微博: {exhibition.socialMedia.weibo}</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
