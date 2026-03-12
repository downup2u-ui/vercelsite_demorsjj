"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/TopBar';
import { NavItem } from '@/types/navigation';
import {
  designerNavGroups,
  legalServiceNavItems,
  financialServiceNavItems,
  ipServiceNavItems,
} from '@/data/dashboardNavigation';
// TODO: Import and use nav items for other roles based on pathname or user role
// import { legalServiceNavItems } from '@/data/dashboardNavigation'; 
// Import other roles' nav items and define user profiles
// Example:
// const legalUser = { name: '律师张三', imageUrl: '/images/avatars/legal_avatar.png' };
// const financialUser = { name: '财务李四', imageUrl: '/images/avatars/financial_avatar.png' };
// const ipUser = { name: 'IP顾问王五', imageUrl: '/images/avatars/ip_avatar.png' };
const defaultUser = { name: '访客用户', imageUrl: '' }; // Default or for /test-professions if it's in this group
const designerUser = { name: '设计师小创', imageUrl: '/images/avatars/赵艺术.svg' }; // Ensure this avatar path is correct

interface CurrentUser {
  name: string;
  imageUrl?: string;
}

// Placeholder user data - in a real app, this would come from an auth context or API
const users: { [key: string]: CurrentUser } = {
  designer: { name: '设计师 小创', imageUrl: '/images/avatars/赵艺术.svg' },
  legal: { name: '法务顾问 张律师', imageUrl: '/images/avatars/张设计.svg' }, // Ensure these avatar paths are valid
  financial: { name: '财务顾问 李会计', imageUrl: '/images/avatars/李程序.svg' },
  ip: { name: 'IP专家 王顾问', imageUrl: '/images/avatars/王用户.svg' },
  default: { name: '访客用户', imageUrl: '' }
};

export default function DashboardGroupLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [currentNavItems, setCurrentNavItems] = useState<NavItem[]>([]);
  const [currentNavGroups, setCurrentNavGroups] = useState<any>(undefined);
  const [currentPageTitle, setCurrentPageTitle] = useState<string>('仪表盘');
  const [currentUser, setCurrentUser] = useState<CurrentUser>(users.default);

  useEffect(() => {
    let activeNavItems: NavItem[] = [];
    let activeNavGroups: any = undefined;
    let title = '仪表盘';
    let user = users.default;
    let baseDashboardPath = '';

    if (pathname.startsWith('/dashboard/designer')) {
      // 分组结构
      activeNavGroups = designerNavGroups;
      // 扁平化所有二级菜单项
      activeNavItems = designerNavGroups.flatMap(group => group.items);
      user = users.designer;
      baseDashboardPath = '/dashboard/designer';
      title = '设计师仪表盘'; 
      const currentNavItem = activeNavItems.find(item => pathname.startsWith(item.href) && item.href !== baseDashboardPath && item.href !== '#');
      if (currentNavItem) title = currentNavItem.name;
      else if (pathname === baseDashboardPath) title = "设计师总览";
    } else if (pathname.startsWith('/dashboard/legal-services')) {
      activeNavItems = legalServiceNavItems;
      user = users.legal;
      baseDashboardPath = '/dashboard/legal-services';
      title = '法律服务仪表盘';
      const currentNavItem = activeNavItems.find(item => pathname.startsWith(item.href) && item.href !== baseDashboardPath && item.href !== '#') || 
                             activeNavItems.flatMap(item => item.children || []).find(child => pathname.startsWith(child.href));
      if (currentNavItem) title = currentNavItem.name;
      else if (pathname === baseDashboardPath) title = "法务工作台";
    } else if (pathname.startsWith('/dashboard/financial-services')) {
      activeNavItems = financialServiceNavItems;
      user = users.financial;
      baseDashboardPath = '/dashboard/financial-services';
      title = '财务服务仪表盘';
      const currentNavItem = activeNavItems.find(item => pathname.startsWith(item.href) && item.href !== baseDashboardPath && item.href !== '#') || 
                             activeNavItems.flatMap(item => item.children || []).find(child => pathname.startsWith(child.href));
      if (currentNavItem) title = currentNavItem.name;
      else if (pathname === baseDashboardPath) title = "财务工作台";
    } else if (pathname.startsWith('/dashboard/intellectual-property-services')) {
      activeNavItems = ipServiceNavItems;
      user = users.ip;
      baseDashboardPath = '/dashboard/intellectual-property-services';
      title = '知识产权仪表盘';
      const currentNavItem = activeNavItems.find(item => pathname.startsWith(item.href) && item.href !== baseDashboardPath && item.href !== '#') || 
                             activeNavItems.flatMap(item => item.children || []).find(child => pathname.startsWith(child.href));
      if (currentNavItem) title = currentNavItem.name;
      else if (pathname === baseDashboardPath) title = "IP服务工作台";
    } else if (pathname.startsWith('/kyc/designer')) { // Added case for KYC designer
      activeNavGroups = designerNavGroups;
      activeNavItems = designerNavGroups.flatMap(group => group.items);
      user = users.designer; // Assuming KYC is for the designer
      title = '设计师认证 (KYC)';
      // isTestProfessions should not apply here, so Sidebar/Topbar will show
    } else if (pathname.startsWith('/test-professions')) {
      activeNavItems = []; 
      title = '选择模拟身份';
      user = users.default; 
    }
    setCurrentNavItems(activeNavItems);
    setCurrentNavGroups(activeNavGroups);
    setCurrentPageTitle(title);
    setCurrentUser(user);
  }, [pathname]);

  const isTestProfessions = pathname.startsWith('/test-professions');
  // For KYC, we want the dashboard layout (Sidebar/Topbar)
  const hideSidebarAndTopbar = isTestProfessions; 

  return (
    <div className={`h-full flex overflow-hidden ${hideSidebarAndTopbar ? 'bg-gray-50' : 'bg-gray-100'}`}>
      {!hideSidebarAndTopbar && (
        <>
          <div className="hidden lg:flex lg:flex-shrink-0">
            <Sidebar navItems={currentNavItems} navGroups={currentNavGroups} />
          </div>
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 flex z-40">
              <div className="fixed inset-0"><div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setSidebarOpen(false)}></div></div>
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button type="button" className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => setSidebarOpen(false)}>
                    <span className="sr-only">Close sidebar</span>
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <Sidebar navItems={currentNavItems} navGroups={currentNavGroups} />
              </div>
              <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
            </div>
          )}
        </>
      )}
      <div className="flex flex-1 flex-col overflow-hidden">
        {!hideSidebarAndTopbar && 
          <TopBar pageTitle={currentPageTitle} currentUser={currentUser} onMenuButtonClick={() => setSidebarOpen(true)} />
        }
        <main className={`flex-1 overflow-y-auto overflow-x-hidden ${hideSidebarAndTopbar ? '' : 'p-4 md:p-6'} ${hideSidebarAndTopbar ? 'bg-gray-50' : 'bg-gray-100'}`}>
          {children}
        </main>
      </div>
    </div>
  );
} 