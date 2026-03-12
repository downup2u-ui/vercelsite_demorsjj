'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { auctions, Bid } from '@/data/commerceData';

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const [auction, setAuction] = useState(auctions.find(a => a.id === params.id));
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 计算剩余时间
  useEffect(() => {
    if (!auction) return;

    const calculateTimeLeft = () => {
      if (auction.status !== 'active') {
        setTimeLeft(auction.status === 'upcoming' ? '拍卖尚未开始' : '拍卖已结束');
        return;
      }

      const endTime = new Date(auction.endTime).getTime();
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference <= 0) {
        setTimeLeft('拍卖已结束');
        setAuction(prev => prev ? { ...prev, status: 'ended' } : prev);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`${days > 0 ? `${days}天 ` : ''}${hours}小时 ${minutes}分钟 ${seconds}秒`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [auction]);

  // 如果拍卖不存在，返回404
  if (!auction) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">拍卖不存在</h1>
        <p className="mb-8">您查找的拍卖可能已被删除或不存在。</p>
        <Link href="/auctions" className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition">
          返回拍卖列表
        </Link>
      </div>
    );
  }

  // 处理出价
  const handleBid = () => {
    setError('');
    setSuccess('');
    
    // 验证用户是否登录
    if (!user) {
      setError('请先登录后再参与竞拍');
      return;
    }

    // 验证拍卖是否处于活跃状态
    if (auction.status !== 'active') {
      setError('此拍卖当前不可竞拍');
      return;
    }

    // 验证出价金额
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('请输入有效的出价金额');
      return;
    }

    // 验证出价是否高于当前价格和最小加价
    if (amount < auction.currentPrice + auction.minIncrement) {
      setError(`出价必须至少为当前价格加上最小加价幅度: ¥${(auction.currentPrice + auction.minIncrement).toLocaleString()}`);
      return;
    }

    // 模拟出价过程
    setIsLoading(true);
    setTimeout(() => {
      const newBid: Bid = {
        id: `bid-${Date.now()}`,
        auctionId: auction.id,
        bidderId: user.id,
        bidderName: user.name,
        amount: amount,
        timestamp: new Date().toISOString()
      };

      // 更新拍卖信息
      const updatedAuction = {
        ...auction,
        currentPrice: amount,
        bids: [...auction.bids, newBid]
      };

      // 如果拍卖即将结束，延长拍卖时间（模拟）
      const endTime = new Date(auction.endTime).getTime();
      const now = new Date().getTime();
      if (endTime - now < 5 * 60 * 1000) { // 5分钟内
        const newEndTime = new Date(endTime + 5 * 60 * 1000); // 延长5分钟
        updatedAuction.endTime = newEndTime.toISOString();
      }

      setAuction(updatedAuction);
      setBidAmount('');
      setSuccess('出价成功！');
      setIsLoading(false);
    }, 1000);
  };

  // 获取竞拍历史
  const bidHistory = [...auction.bids].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/auctions" className="text-indigo-600 hover:text-indigo-800 transition flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回拍卖列表
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 左侧 - 拍品图片和描述 */}
        <div>
          <div className="relative h-[400px] w-full mb-6 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={auction.coverImage}
              alt={auction.title}
              fill
              style={{ objectFit: 'contain' }}
              className="p-4"
            />
          </div>

          <h1 className="text-3xl font-bold mb-4">{auction.title}</h1>
          <p className="text-gray-600 mb-6">{auction.description}</p>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-4">拍品详情</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">拍卖ID</p>
                <p className="font-medium">{auction.id}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">创建者</p>
                <p className="font-medium">{auction.createdBy}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">开始时间</p>
                <p className="font-medium">{new Date(auction.startTime).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">结束时间</p>
                <p className="font-medium">{new Date(auction.endTime).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">起拍价</p>
                <p className="font-medium">¥{auction.startingPrice.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">最小加价</p>
                <p className="font-medium">¥{auction.minIncrement.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧 - 竞拍信息和出价区域 */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">当前价格</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                auction.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                auction.status === 'active' ? 'bg-green-100 text-green-800' : 
                'bg-gray-100 text-gray-800'
              }`}>
                {auction.status === 'upcoming' ? '即将开始' : 
                 auction.status === 'active' ? '正在进行' : 
                 '已结束'}
              </span>
            </div>

            <div className="text-4xl font-bold mb-4">¥{auction.currentPrice.toLocaleString()}</div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">起拍价</span>
                <span>¥{auction.startingPrice.toLocaleString()}</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-indigo-600 rounded-full" 
                  style={{ width: `${Math.min(100, (auction.currentPrice - auction.startingPrice) / auction.startingPrice * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-indigo-50 p-4 rounded-md mb-6">
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">剩余时间</span>
              </div>
              <p className="text-xl font-bold text-indigo-800">{timeLeft}</p>
            </div>

            {auction.status === 'active' && (
              <div className="mb-6">
                <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  您的出价 (最低 ¥{(auction.currentPrice + auction.minIncrement).toLocaleString()})
                </label>
                <div className="flex">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">¥</span>
                    </div>
                    <input
                      type="number"
                      id="bidAmount"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
                      placeholder={(auction.currentPrice + auction.minIncrement).toString()}
                      min={auction.currentPrice + auction.minIncrement}
                      step={auction.minIncrement}
                    />
                  </div>
                  <button
                    onClick={handleBid}
                    disabled={isLoading || !user}
                    className="ml-3 inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isLoading ? '处理中...' : '出价'}
                  </button>
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
                {!user && <p className="mt-2 text-sm text-gray-500">请先登录后再参与竞拍</p>}
              </div>
            )}

            {auction.status === 'upcoming' && (
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <p className="text-blue-800">此拍卖尚未开始，请在开始时间后再来参与竞拍。</p>
              </div>
            )}

            {auction.status === 'ended' && (
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <p className="text-gray-800">此拍卖已结束。
                  {auction.winner ? ` 中标者: ${auction.winner}` : ' 没有人中标。'}
                </p>
              </div>
            )}

            <div>
              <h3 className="font-medium mb-3">竞拍历史 ({bidHistory.length})</h3>
              {bidHistory.length > 0 ? (
                <div className="max-h-64 overflow-y-auto">
                  {bidHistory.map((bid) => (
                    <div key={bid.id} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                        <div>
                          <p className="font-medium">{bid.bidderName}</p>
                          <p className="text-xs text-gray-500">{new Date(bid.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                      <p className="font-bold">¥{bid.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">暂无竞拍记录</p>
              )}
            </div>
          </div>

          {/* 拍卖规则提示 */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">拍卖规则提示</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-600">每次出价必须高于当前价格至少 ¥{auction.minIncrement.toLocaleString()}</p>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-600">拍卖结束前5分钟内有新出价，拍卖时间将自动延长5分钟</p>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-600">中标后需在7天内完成支付，否则将被取消资格</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 相关拍卖推荐 */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">您可能感兴趣的拍卖</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {auctions
            .filter(a => a.id !== auction.id)
            .slice(0, 4)
            .map((relatedAuction) => (
              <Link href={`/auctions/${relatedAuction.id}`} key={relatedAuction.id}>
                <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition group">
                  <div className="relative h-48 w-full">
                    <Image
                      src={relatedAuction.coverImage}
                      alt={relatedAuction.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium 
                      ${relatedAuction.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                        relatedAuction.status === 'active' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'}">
                      {relatedAuction.status === 'upcoming' ? '即将开始' : 
                       relatedAuction.status === 'active' ? '正在进行' : 
                       '已结束'}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{relatedAuction.title}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{relatedAuction.description}</p>
                    <p className="font-bold">¥{relatedAuction.currentPrice.toLocaleString()}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
