// Removed "use client"; - this is now a Server Component
import type { Metadata } from "next";
import "./globals.css";
// Removed: import Header from "@/components/layout/Header";
// Removed: import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/components/providers/ToastProvider";
// Removed: import { usePathname } from 'next/navigation'; 
import InnerLayout from "@/components/layout/InnerLayout"; // Import the new client component

export const metadata: Metadata = {
  title: "海创共坊 - 创意设计与3D打印服务",
  description: "海创共坊是一个集创意设计、3D打印、NFT艺术和社区交流于一体的综合服务平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Removed: const pathname = usePathname();
  // Removed: const isAppArea = pathname.startsWith('/dashboard') || pathname.startsWith('/test-professions');

  return (
    <html lang="zh-CN" className="h-full">
      <body className="h-full font-sans">
        <AuthProvider>
          <InnerLayout>{children}</InnerLayout> {/* Use InnerLayout to wrap children */}
          <ToastProvider />
        </AuthProvider>
      </body>
    </html>
  );
}
