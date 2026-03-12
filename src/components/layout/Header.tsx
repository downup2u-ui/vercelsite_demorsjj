"use client";

import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Disclosure, Menu, Transition, Dialog, Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

// 定义导航项的类型
type NavItem = {
  name: string;
  href: string;
  children?: NavItem[];
};

// 重构导航菜单，基于设计师视角优化结构
const navigation: NavItem[] = [
  { name: '首页', href: '/' },
  { name: '关于我们', href: '/about' },
  { name: '支持中心', href: '/services' },
  { name: '行业生态', href: '/industry' },
  { name: '成为伙伴', href: '/join' },
  { name: '商业合作', href: '/cooperation' },
  { name: '产品成果', href: '/artworks' },
  { name: '社区中心', href: '/events' },
  { 
    name: '赋能公益', 
    href: '/charity',
    children: [
      { name: '国宝回家公益项目信息', href: '/charity/national-treasures' },
      { name: '红色之旅', href: '/charity/red-journey' }
    ]
  },
  { name: '联系我们', href: '/contact' }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 检查当前路径是否匹配导航项或其子项
  const isActive = (item: any) => {
    if (item.href && pathname === item.href) return true;
    if (item.children) {
      return item.children.some((child: any) => pathname === child.href);
    }
    return false;
  };

  const handleLogout = () => {
    logout();
  };

  const renderMobileMenu = () => (
    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
      <div className="fixed inset-0 z-50" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
            <span className="sr-only">海创共坊</span>
            <Image
              className="h-8 w-auto"
              src="/logo.png"
              alt=""
              width={32}
              height={32}
            />
          </Link>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">关闭菜单</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <div key={item.name}>
                  {!item.children ? (
                    <Link
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                        pathname === item.href ? 'text-black bg-gray-50' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <Disclosure as="div" key={item.name}>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-50">
                            {item.name}
                            <svg
                              className={`ml-2 h-4 w-4 transition-transform ${
                                open ? 'rotate-180' : ''
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Disclosure.Button>
                          <Disclosure.Panel className="mt-2 space-y-2">
                            {item.children?.map((child) =>
                              !child.children ? (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className={`block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 ${
                                    pathname === child.href ? 'text-black bg-gray-50' : 'text-gray-700 hover:bg-gray-50'
                                  }`}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {child.name}
                                </Link>
                              ) : (
                                <Disclosure as="div" key={child.name}>
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-6 pr-3.5 text-sm font-semibold leading-7 text-gray-700 hover:bg-gray-50">
                                        {child.name}
                                        <svg
                                          className={`ml-2 h-4 w-4 transition-transform ${
                                            open ? 'rotate-180' : ''
                                          }`}
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </Disclosure.Button>
                                      <Disclosure.Panel className="mt-2 space-y-2">
                                        {child.children?.map((grandchild) => (
                                          <Link
                                            key={grandchild.name}
                                            href={grandchild.href}
                                            className={`block rounded-lg py-2 pl-9 pr-3 text-xs font-semibold leading-7 ${
                                              pathname === grandchild.href ? 'text-black bg-gray-50' : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                            onClick={() => setMobileMenuOpen(false)}
                                          >
                                            {grandchild.name}
                                          </Link>
                                        ))}
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              )
                            )}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )}
                </div>
              ))}
            </div>
            <div className="py-6">
              {user ? (
                <>
                  <div className="flex items-center px-3 py-2.5">
                    <Image
                      className="h-10 w-10 rounded-full mr-3"
                      src={user.avatar || "/avatars/user1.jpg"}
                      alt=""
                      width={40}
                      height={40}
                    />
                    <div>
                      <div className="text-base font-medium text-gray-800">{user.name}</div>
                      <div className="text-sm text-gray-500">积分: {user.points || 0}</div>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    个人资料
                  </Link>
                  <Link
                    href="/account"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    账户设置
                  </Link>
                  <Link
                    href="/points"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    积分系统
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-50 w-full text-left"
                  >
                    退出登录
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    登录
                  </Link>
                  <Link
                    href="/register"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    注册
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );

  return (
    <header className={`bg-white ${isScrolled ? 'shadow-sm' : ''} sticky top-0 z-50 transition-shadow duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center flex-shrink-0 group">
              <span className="sr-only">海创共坊</span>
              <Image src="/logo.svg" alt="海创共坊 Logo" width={36} height={36} className="mr-2" />
              <span className="text-xl font-extrabold text-indigo-700 group-hover:text-indigo-900 tracking-wide select-none whitespace-nowrap">海创共坊</span>
            </Link>
            
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) =>
                  !item.children ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-800 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <Popover key={item.name} className="relative">
                      {({ open, close }) => (
                        <>
                          <Popover.Button
                            className={`group inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                              open
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-800 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                          >
                            <span>{item.name}</span>
                            <svg
                              className={`ml-2 h-4 w-4 transition-transform ${
                                open ? 'rotate-180' : ''
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Popover.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-xs transform px-2 sm:px-0">
                              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative grid gap-6 bg-white p-6">
                                  {item.children?.map((child) =>
                                    !child.children ? (
                                      <Link
                                        key={child.name}
                                        href={child.href}
                                        className="flex items-center rounded-md p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none"
                                        onClick={() => close()}
                                      >
                                        <div className="ml-3">
                                          <p className="text-sm font-medium text-gray-900">
                                            {child.name}
                                          </p>
                                        </div>
                                      </Link>
                                    ) : (
                                      <Disclosure as="div" key={child.name}>
                                        {({ open }) => (
                                          <>
                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-md p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none">
                                              <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">
                                                  {child.name}
                                                </p>
                                              </div>
                                              <svg
                                                className={`ml-2 h-4 w-4 transition-transform ${
                                                  open ? 'rotate-180' : ''
                                                }`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                  clipRule="evenodd"
                                                />
                                              </svg>
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                              {child.children?.map((grandchild) => (
                                                <Link
                                                  key={grandchild.name}
                                                  href={grandchild.href}
                                                  className="flex items-center rounded-md p-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none"
                                                  onClick={() => close()}
                                                >
                                                  <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">
                                                      {grandchild.name}
                                                    </p>
                                                  </div>
                                                </Link>
                                              ))}
                                            </Disclosure.Panel>
                                          </>
                                        )}
                                      </Disclosure>
                                    )
                                  )}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  )
                )}
              </div>
            </div>
            
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* 登录/注册按钮修改 */}
            {!user ? (
              <Link
                href="/test-professions"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                加入
              </Link>
            ) : (
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">打开用户菜单</span>
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={user.avatar || "/avatars/user1.jpg"}
                      alt=""
                      width={32}
                      height={32}
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/profile"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block px-4 py-2 text-sm text-gray-700`}
                        >
                          个人资料
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/account"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block px-4 py-2 text-sm text-gray-700`}
                        >
                          账户设置
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/points"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block px-4 py-2 text-sm text-gray-700`}
                        >
                          我的积分
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                        >
                          退出登录
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>
          
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">打开主菜单</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </div>
      
      {renderMobileMenu()}
    </header>
  );
}
