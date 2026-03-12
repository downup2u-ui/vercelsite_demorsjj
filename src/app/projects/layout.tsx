import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '项目管理 - 海创共坊',
  description: '管理您的设计项目、跟踪项目进度并与团队协作',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      {children}
    </main>
  );
} 