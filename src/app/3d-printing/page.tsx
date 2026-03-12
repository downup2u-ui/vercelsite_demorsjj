'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function PrintingServicePage() {
  const router = useRouter();
  const { user } = useAuth();

  const features = [
    {
      title: '模型上传',
      description: '上传您的3D模型文件，支持STL、OBJ、3MF等多种格式',
      icon: '/icons/upload.svg',
      link: '/3d-printing/upload'
    },
    {
      title: '材料选择',
      description: '多种高质量打印材料可选，包括PLA、ABS、PETG、尼龙、树脂等',
      icon: '/icons/material.svg',
      link: '/3d-printing/materials'
    },
    {
      title: '价格计算',
      description: '基于模型尺寸、材料和打印参数的智能价格计算系统',
      icon: '/icons/calculator.svg',
      link: '/3d-printing/pricing'
    },
    {
      title: '进度追踪',
      description: '实时跟踪您的打印订单状态，从处理到发货的全过程',
      icon: '/icons/tracking.svg',
      link: '/3d-printing/orders'
    },
    {
      title: 'RFID防伪',
      description: '高价值打印品集成RFID防伪标签，确保真实性和可追溯性',
      icon: '/icons/rfid.svg',
      link: '/3d-printing/rfid'
    },
    {
      title: '我的模型',
      description: '管理您上传的所有3D模型，查看打印历史',
      icon: '/icons/models.svg',
      link: '/3d-printing/my-models'
    }
  ];

  const applications = [
    {
      title: '医疗与生物工程',
      image: '/images/high-quality/applications/medical.jpg',
      description: '定制化医疗器械、解剖模型、假肢组件'
    },
    {
      title: '教育与研究',
      image: '/images/high-quality/applications/education.jpg',
      description: '教学模型、科学演示工具、研究原型'
    },
    {
      title: '产品设计',
      image: '/images/high-quality/applications/product.jpg',
      description: '功能性原型、概念验证模型、产品外观设计'
    },
    {
      title: '艺术与创意',
      image: '/images/high-quality/applications/art.jpg',
      description: '雕塑、装饰品、艺术装置、珠宝设计'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 服务特点 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">我们的服务</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link href={feature.link} key={index}>
              <div className="border border-gray-200 p-6 rounded-lg h-full hover:shadow-md transition cursor-pointer flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 mr-4 flex items-center justify-center rounded-full bg-gray-100">
                    <Image src={feature.icon} alt={feature.title} width={24} height={24} />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-700 flex-grow">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 打印流程 */}
      <section className="mb-16 bg-gray-50 py-12 px-4 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">打印流程</h2>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between relative">
            {/* 连接线 */}
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-1 bg-gray-300 z-0"></div>
            
            {/* 步骤 */}
            {['上传模型', '选择材料', '确认订单', '生产制作', '质量检查', '配送到您'].map((step, index) => (
              <div key={index} className="flex flex-col items-center mb-8 md:mb-0 z-10 w-full md:w-auto">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white border-2 border-black mb-4">
                  <span className="text-2xl font-bold">{index + 1}</span>
                </div>
                <p className="text-center font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 应用领域 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">应用领域</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {applications.map((app, index) => (
            <div key={index} className="relative h-64 group overflow-hidden rounded-lg">
              <Image
                src={app.image}
                alt={app.title}
                fill
                style={{ objectFit: 'cover' }}
                className="group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">{app.title}</h3>
                <p className="text-white text-sm md:text-base">{app.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 客户评价 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">客户评价</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "潮创共坊的3D打印服务质量非常高，我的医学教学模型精确度超出预期。",
              author: "王医生",
              role: "医学教授"
            },
            {
              quote: "RFID防伪标签功能为我的艺术作品增加了独特的价值和真实性保证。",
              author: "赵艺术",
              role: "艺术家"
            },
            {
              quote: "从上传模型到收到成品，整个过程透明且高效。材料选择丰富，价格合理。",
              author: "李程序",
              role: "产品设计师"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="text-2xl font-serif mb-4">"</div>
              <p className="mb-4 italic text-gray-700">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-gray-700">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 行动召唤 */}
      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">准备开始您的3D打印项目?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
          无论您是需要功能性原型还是艺术作品，我们都能帮助您将创意变为现实
        </p>
        <button 
          onClick={() => user ? router.push('/3d-printing/upload') : router.push('/login')}
          className="bg-black text-white px-8 py-4 rounded-md font-medium hover:bg-gray-800 transition"
        >
          {user ? '立即上传模型' : '登录并开始'}
        </button>
      </section>

      {/* 常见问题 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">常见问题</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              question: "支持哪些3D模型文件格式?",
              answer: "我们支持多种常见的3D模型格式，包括STL、OBJ、3MF、STEP和FBX。如果您有其他格式的文件，请联系我们的客服团队。"
            },
            {
              question: "打印周期需要多长时间?",
              answer: "打印时间取决于模型的复杂度、尺寸和选择的材料。一般小型模型可在1-3个工作日内完成，大型或复杂模型可能需要5-7个工作日。您可以在订单页面查看实时进度。"
            },
            {
              question: "RFID防伪标签如何工作?",
              answer: "我们的RFID标签内置于打印品中或附着于表面，包含唯一标识码和产品信息。通过我们的验证应用程序或网站，您可以扫描标签验证产品的真实性和来源。"
            },
            {
              question: "如何选择最适合我项目的材料?",
              answer: "我们提供材料选择指南和推荐系统，基于您的模型用途、强度需求和美观要求。您也可以联系我们的技术顾问获取个性化建议。"
            }
          ].map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
