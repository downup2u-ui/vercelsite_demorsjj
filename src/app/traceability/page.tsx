"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// 模拟交易记录数据
interface Transaction {
  id: string;
  date: string;
  seller: string;
  buyer: string;
  price: number;
  location: string;
  certificateUrl: string;
}

interface ArtworkInfo {
  id: string;
  title: string;
  artist: string;
  creationDate: string;
  medium: string;
  dimensions: string;
  description: string;
  imageUrl: string;
  transactions: Transaction[];
}

// 模拟防伪码查询结果
const mockArtworkData: Record<string, ArtworkInfo> = {
  'ABC123456': {
    id: '001',
    title: '山水云间',
    artist: '张艺术',
    creationDate: '2023-05-15',
    medium: '丙烯画',
    dimensions: '60cm x 80cm',
    description: '这幅作品展现了中国传统山水画与现代艺术的融合，通过独特的色彩和构图表达了艺术家对自然的理解和情感。',
    imageUrl: '/images/artworks/artwork1.svg',
    transactions: [
      {
        id: 'T001',
        date: '2023-06-10',
        seller: '艺术家工作室',
        buyer: '私人收藏家',
        price: 15000,
        location: '上海',
        certificateUrl: '/certificates/cert001.pdf'
      },
      {
        id: 'T002',
        date: '2024-02-18',
        seller: '私人收藏家',
        buyer: '艺术画廊',
        price: 22000,
        location: '北京',
        certificateUrl: '/certificates/cert002.pdf'
      }
    ]
  },
  'DEF789012': {
    id: '002',
    title: '城市记忆',
    artist: '李创新',
    creationDate: '2022-11-03',
    medium: '混合媒材',
    dimensions: '100cm x 120cm',
    description: '这件作品通过拼贴和混合媒材技术，记录了城市发展的变迁和人们的生活记忆，展现了艺术家对城市化进程的思考。',
    imageUrl: '/images/artworks/artwork2.svg',
    transactions: [
      {
        id: 'T003',
        date: '2022-12-15',
        seller: '艺术家工作室',
        buyer: '艺术博物馆',
        price: 35000,
        location: '广州',
        certificateUrl: '/certificates/cert003.pdf'
      }
    ]
  },
  'GHI345678': {
    id: '003',
    title: '数字未来',
    artist: '王科技',
    creationDate: '2024-01-20',
    medium: '数字艺术',
    dimensions: '虚拟尺寸',
    description: '这是一件NFT数字艺术作品，探索了人工智能与艺术创作的边界，通过算法生成的视觉效果表达了艺术家对未来科技的想象。',
    imageUrl: '/images/artworks/artwork3.svg',
    transactions: [
      {
        id: 'T004',
        date: '2024-02-05',
        seller: '艺术家',
        buyer: '数字艺术平台',
        price: 5000,
        location: '线上',
        certificateUrl: '/certificates/cert004.pdf'
      },
      {
        id: 'T005',
        date: '2024-03-10',
        seller: '数字艺术平台',
        buyer: '科技公司',
        price: 8500,
        location: '线上',
        certificateUrl: '/certificates/cert005.pdf'
      },
      {
        id: 'T006',
        date: '2024-04-22',
        seller: '科技公司',
        buyer: '私人收藏家',
        price: 12000,
        location: '线上',
        certificateUrl: '/certificates/cert006.pdf'
      }
    ]
  }
};

export default function TraceabilityPage() {
  const [code, setCode] = useState('');
  const [artwork, setArtwork] = useState<ArtworkInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('请输入防伪码');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // 模拟API请求延迟
    setTimeout(() => {
      const result = mockArtworkData[code];
      
      if (result) {
        setArtwork(result);
        setError('');
      } else {
        setArtwork(null);
        setError('未找到匹配的作品信息，请检查防伪码是否正确');
      }
      
      setIsLoading(false);
      setSearched(true);
    }, 1000);
  };
  
  return (
    <div className="bg-white">
      {/* 页面标题 - 使用设计师专业风格 */}
      <div className="relative bg-[#F5F5F5] border-b border-[#D9D9D9]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold mb-4 text-[#2B5AED]">作品溯源查询</h1>
            <p className="max-w-xl mx-auto text-[#595959]">
              通过区块链技术追溯作品历史，查询作品的创作信息和历史交易记录，确保作品的真实性和价值
            </p>
          </div>
        </div>
      </div>
      
      {/* 查询表单 - 使用设计师专业风格 */}
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-8 shadow-sm border border-[#D9D9D9] border-l-4 border-l-[#2B5AED]">
          <h2 className="text-xl font-serif font-medium mb-6 text-[#262626]">防伪码查询</h2>
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-[#262626]">
                作品防伪码
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#8C8C8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="code"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="pl-10 block w-full rounded-md border-[#D9D9D9] shadow-sm focus:border-[#2B5AED] focus:ring-[#2B5AED] sm:text-sm"
                  placeholder="请输入作品防伪码，例如：ABC123456"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center rounded-r-md border border-[#2B5AED] bg-[#2B5AED] px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#1A49DC] focus:outline-none focus:ring-2 focus:ring-[#4D73F0] focus:ring-offset-2 min-w-[100px] justify-center h-full"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        查询中
                      </span>
                    ) : '查询'}
                  </button>
                </div>
              </div>
              {error && <p className="mt-2 text-sm text-[#F5222D]">{error}</p>}
            </div>
          </form>
          
          <div className="mt-6 pt-6 border-t border-[#F0F0F0]">
            <h3 className="text-sm font-medium text-[#8C8C8C] mb-2">示例防伪码</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setCode('ABC123456')} 
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F0F5FF] text-[#2B5AED] border border-[#2B5AED] hover:bg-[#2B5AED] hover:text-white transition-colors"
              >
                ABC123456
              </button>
              <button 
                onClick={() => setCode('DEF789012')} 
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F0F5FF] text-[#2B5AED] border border-[#2B5AED] hover:bg-[#2B5AED] hover:text-white transition-colors"
              >
                DEF789012
              </button>
              <button 
                onClick={() => setCode('GHI345678')} 
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F0F5FF] text-[#2B5AED] border border-[#2B5AED] hover:bg-[#2B5AED] hover:text-white transition-colors"
              >
                GHI345678
              </button>
            </div>
          </div>
        </div>
        
        {/* 查询结果 */}
        {searched && (
          <div className="mt-8">
            {artwork ? (
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-[#D9D9D9]">
                {/* 作品信息 */}
                <div className="p-8 border-b border-[#F0F0F0]">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                      <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border border-[#F0F0F0] shadow-sm">
                        <Image
                          src={artwork.imageUrl}
                          alt={artwork.title}
                          className="object-cover"
                          width={300}
                          height={300}
                        />
                      </div>
                      <div className="mt-4 flex items-center justify-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F0F5FF] text-[#2B5AED] border border-[#2B5AED]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          区块链验证正品
                        </span>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-2xl font-serif font-bold text-[#262626]">{artwork.title}</h2>
                          <p className="mt-1 text-sm text-[#8C8C8C]">防伪码: <span className="font-medium text-[#2B5AED]">{code}</span></p>
                        </div>
                        <div className="hidden md:block">
                          <button className="inline-flex items-center px-3 py-1 border border-[#D9D9D9] rounded-md text-sm text-[#595959] hover:bg-[#F5F5F5] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            分享
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="bg-[#F5F5F5] p-3 rounded-md">
                          <h3 className="text-sm font-medium text-[#8C8C8C]">艺术家</h3>
                          <p className="mt-1 text-sm font-medium text-[#262626]">{artwork.artist}</p>
                        </div>
                        <div className="bg-[#F5F5F5] p-3 rounded-md">
                          <h3 className="text-sm font-medium text-[#8C8C8C]">创作日期</h3>
                          <p className="mt-1 text-sm font-medium text-[#262626]">{artwork.creationDate}</p>
                        </div>
                        <div className="bg-[#F5F5F5] p-3 rounded-md">
                          <h3 className="text-sm font-medium text-[#8C8C8C]">媒介材料</h3>
                          <p className="mt-1 text-sm font-medium text-[#262626]">{artwork.medium}</p>
                        </div>
                        <div className="bg-[#F5F5F5] p-3 rounded-md">
                          <h3 className="text-sm font-medium text-[#8C8C8C]">尺寸</h3>
                          <p className="mt-1 text-sm font-medium text-[#262626]">{artwork.dimensions}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 bg-white p-4 rounded-md border border-[#F0F0F0]">
                        <h3 className="text-sm font-medium text-[#262626]">作品描述</h3>
                        <p className="mt-2 text-sm text-[#595959] leading-relaxed">{artwork.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 交易历史 */}
                <div className="p-8">
                  <h3 className="text-xl font-serif font-medium text-[#2B5AED] mb-6 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    交易历史记录
                  </h3>
                  <div className="mt-4 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden border border-[#F0F0F0] rounded-lg">
                          <table className="min-w-full divide-y divide-[#F0F0F0]">
                            <thead className="bg-[#F5F5F5]">
                              <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-[#262626] sm:pl-6">日期</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-medium text-[#262626]">卖方</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-medium text-[#262626]">买方</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-medium text-[#262626]">价格</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-medium text-[#262626]">交易地点</th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                  <span className="sr-only">证书</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F0F0F0] bg-white">
                              {artwork.transactions.map((transaction) => (
                                <tr key={transaction.id}>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-[#262626] sm:pl-6">{transaction.date}</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-[#595959]">{transaction.seller}</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-[#595959]">{transaction.buyer}</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-[#262626] font-medium">¥{transaction.price.toLocaleString()}</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-[#595959]">{transaction.location}</td>
                                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <a href={transaction.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-[#2B5AED] hover:underline">
                                      查看证书
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 shadow-sm border border-[#D9D9D9] text-center">
                <svg className="h-16 w-16 text-[#F5222D] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="mt-4 text-xl font-medium text-[#262626]">未找到作品</h3>
                <p className="mt-2 text-[#595959]">您输入的防伪码无法找到匹配的作品信息</p>
                <p className="mt-4 text-sm text-[#8C8C8C]">请尝试使用以下示例防伪码：</p>
                <div className="mt-2 flex flex-wrap gap-2 justify-center">
                  <button 
                    onClick={() => setCode('ABC123456')} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F0F5FF] text-[#2B5AED] border border-[#2B5AED] hover:bg-[#2B5AED] hover:text-white transition-colors"
                  >
                    ABC123456
                  </button>
                  <button 
                    onClick={() => setCode('DEF789012')} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F0F5FF] text-[#2B5AED] border border-[#2B5AED] hover:bg-[#2B5AED] hover:text-white transition-colors"
                  >
                    DEF789012
                  </button>
                  <button 
                    onClick={() => setCode('GHI345678')} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#F0F5FF] text-[#2B5AED] border border-[#2B5AED] hover:bg-[#2B5AED] hover:text-white transition-colors"
                  >
                    GHI345678
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}