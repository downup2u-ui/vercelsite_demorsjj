import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '提供服务 - 海创共坊',
  description: '海创共坊提供创意设计、技术支持、法律合规、财务税务和咨询顾问等全方位服务，助力创意从概念到实现。',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 