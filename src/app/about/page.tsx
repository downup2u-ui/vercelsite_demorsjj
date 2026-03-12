import CompanyInfo from '@/components/about/CompanyInfo';
import MissionVision from '@/components/about/MissionVision';
import TeamGrid from '@/components/about/TeamMembers';
import Image from 'next/image';

export const metadata = {
  title: '关于我们 - 海创共坊',
  description: '了解海创共坊的使命、愿景、团队和价值观，我们致力于创新设计、3D打印、NFT艺术和社区交流。',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* 页面顶部横幅 */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 opacity-90" />
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">关于我们</h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
            依托"3DP+IoT+DAO+AI"四位一体，整合产业链功能节点以及从知识产权到商务、法务、财务以及结算等相关配套一体化，构建一个去中心化、智能自治的创意制造生态共坊，为从个人创客到企业级用户提供全链路、无边界的一站式创新解决方案。
          </p>
        </div>
      </div>

      {/* 公司信息部分 */}
      <CompanyInfo />

      {/* 使命和愿景部分 */}
      <MissionVision />

      {/* 我们的价值观 */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">我们的价值观</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto my-6"></div>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">创新</h3>
            <p className="mt-2 text-base text-gray-600">不断探索新的技术和设计方法，推动潮玩文化的创新发展。</p>
          </div>
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">协作</h3>
            <p className="mt-2 text-base text-gray-600">促进设计师、开发者和爱好者之间的交流与合作，共同创造价值。</p>
          </div>
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">诚信</h3>
            <p className="mt-2 text-base text-gray-600">尊重知识产权，保护创作者权益，诚实透明地开展业务。</p>
          </div>
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65M12 12a6 6 0 01-6-6h12a6 6 0 01-6 6z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">可持续发展</h3>
            <p className="mt-2 text-base text-gray-600">注重环保材料的使用和废品回收，促进潮玩产业的可持续发展。</p>
          </div>
        </div>
      </div>

      {/* 我们的故事 */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">我们的故事</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto my-6"></div>
          </div>
          <div className="mx-auto max-w-3xl mt-12 text-lg leading-8 text-gray-600 space-y-6">
            <p>
              海创共坊成立于2025年，依托"3DP+IoT+DAO+AI"四位一体，整合产业链功能节点以及从知识产权到商务、法务、财务以及结算等相关配套一体化，构建一个去中心化、智能自治的创意制造生态共坊，为从个人创客到企业级用户提供全链路、无边界的一站式创新解决方案。由一群热爱创意设计和技术的年轻人共同创立。我们注意到，虽然中国的潮玩市场正在快速增长，但创作者们常常面临设计工具不足、制作成本高、销售渠道有限等问题。
            </p>
            <p>
              为了解决这些问题，我们打造了这个集创意设计、3D打印、NFT艺术和社区交流于一体的综合服务平台，希望能够降低创作门槛，提高创作效率，拓宽销售渠道，让更多有才华的创作者能够实现他们的创意梦想。
            </p>
            <p>
              经过两年的发展，我们已经聚集了超过5000名活跃的创作者和10万名潮玩爱好者，共同打造了一个充满活力的创意社区。未来，我们将继续完善平台功能，拓展国际市场，为中国的潮玩文化在全球舞台上赢得更多的关注和认可。
            </p>
          </div>
        </div>
      </div>

      {/* 团队部分 */}
      <TeamGrid />

      {/* 联系我们 */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">联系我们</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto my-6"></div>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 p-8 shadow-sm">
            <h3 className="text-xl font-semibold leading-7 text-gray-900">商务合作</h3>
            <dl className="mt-4 space-y-4 text-base leading-7 text-gray-600">
              <div className="flex gap-x-4 items-center">
                <dt className="flex-none">
                  <span className="sr-only">邮箱</span>
                  <svg className="h-7 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </dt>
                <dd>business@haicreator.com</dd>
              </div>
              <div className="flex gap-x-4 items-center">
                <dt className="flex-none">
                  <span className="sr-only">电话</span>
                  <svg className="h-7 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </dt>
                <dd>+86 123-4567-8910</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 p-8 shadow-sm">
            <h3 className="text-xl font-semibold leading-7 text-gray-900">技术支持</h3>
            <dl className="mt-4 space-y-4 text-base leading-7 text-gray-600">
              <div className="flex gap-x-4 items-center">
                <dt className="flex-none">
                  <span className="sr-only">邮箱</span>
                  <svg className="h-7 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </dt>
                <dd>support@haicreator.com</dd>
              </div>
              <div className="flex gap-x-4 items-center">
                <dt className="flex-none">
                  <span className="sr-only">工作时间</span>
                  <svg className="h-7 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </dt>
                <dd>周一至周五 9:00-18:00</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
