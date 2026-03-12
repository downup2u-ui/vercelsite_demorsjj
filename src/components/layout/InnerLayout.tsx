"use client"; // This component uses client-side hooks

import { usePathname } from 'next/navigation';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppArea = pathname.startsWith('/dashboard') || pathname.startsWith('/test-professions');

  if (isAppArea) {
    // For dashboard and test-professions, render children directly without common Header/Footer
    // The respective group layouts (e.g., (dashboardGroup)/layout.tsx) will provide their own structure.
    return <>{children}</>;
  }

  // For other pages, include Header and Footer
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
} 