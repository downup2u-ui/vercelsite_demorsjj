"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from '@/types/navigation'; // Import the NavItem type
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

interface SidebarProps {
  navItems?: NavItem[];
  navGroups?: { group: string; items: NavItem[] }[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar({ navItems = [], navGroups }: SidebarProps) {
  const pathname = usePathname();

  // 分组菜单渲染
  if (navGroups && navGroups.length > 0) {
    return (
      <div className="w-64 bg-gray-800 text-white flex flex-col min-h-screen">
        <div className="py-7 px-5 flex items-center">
          <Link href="/" className="flex items-center space-x-4">
            <img className="h-12 w-auto" src="/logo.svg" alt="海创共坊 Logo" />
            <span className="text-2xl font-extrabold text-white hover:text-gray-300 tracking-wide">海创共坊</span>
          </Link>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          {navGroups.map((group) => (
            <Disclosure as="div" key={group.group} defaultOpen>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={classNames(
                      'w-full flex items-center justify-between px-2 py-2 text-left text-base font-bold rounded-md text-gray-200 hover:bg-gray-700 hover:text-white transition-colors',
                      open ? 'bg-gray-900' : ''
                    )}
                  >
                    <span>{group.group}</span>
                    <ChevronRightIcon
                      className={classNames(
                        open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                        'ml-auto h-5 w-5 shrink-0 transform transition-colors ease-in-out duration-150 group-hover:text-gray-400'
                      )}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="space-y-1 pt-1 pl-2">
                    {group.items.map((item) => {
                      const isActive = pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            isActive
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors'
                          )}
                        >
                          {item.icon && typeof item.icon === 'function' && (
                            <item.icon className="mr-3 flex-shrink-0 h-6 w-6" aria-hidden="true" />
                          )}
                          {item.name}
                        </Link>
                      );
                    })}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </nav>
        <div className="p-4 mt-auto">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} 海创共坊</p>
        </div>
      </div>
    );
  }

  // 兼容原有 navItems 逻辑
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col min-h-screen">
      <div className="py-7 px-5 flex items-center">
        <Link href="/" className="flex items-center space-x-4">
          <img className="h-12 w-auto" src="/logo.svg" alt="海创共坊 Logo" />
          <span className="text-2xl font-extrabold text-white hover:text-gray-300 tracking-wide">海创共坊</span>
        </Link>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.href === "#" ? 
                           (item.children?.some(subItem => pathname.startsWith(subItem.href)) || false) :
                           pathname.startsWith(item.href);
          
          return !item.children ? (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors'
              )}
            >
              {item.icon && typeof item.icon === 'function' && (
                <item.icon className="mr-3 flex-shrink-0 h-6 w-6" aria-hidden="true" />
              )}
              {item.name}
            </Link>
          ) : (
            <Disclosure as="div" key={item.name} className="space-y-1" defaultOpen={isActive}>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={classNames(
                      'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group w-full flex items-center justify-between px-2 py-2 text-left text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    )}
                  >
                    <span className='flex items-center'>
                      {item.icon && typeof item.icon === 'function' && (
                        <item.icon className="mr-3 flex-shrink-0 h-6 w-6" aria-hidden="true" />
                      )}
                      {item.name}
                    </span>
                    <ChevronRightIcon
                      className={classNames(
                        open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                        'ml-auto h-5 w-5 shrink-0 transform transition-colors ease-in-out duration-150 group-hover:text-gray-400'
                      )}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="space-y-1 pt-1 pl-3">
                    {item.children?.map((subItem) => {
                      const isSubActive = pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={classNames(
                            isSubActive
                              ? 'bg-gray-700 text-white'
                              : 'text-gray-400 hover:bg-gray-700 hover:text-white',
                            'group flex items-center w-full rounded-md py-2 pl-9 pr-2 text-sm font-medium transition-colors'
                          )}
                        >
                          {/* Sub-items currently don't have icons in data, but if they did: */}
                          {/* {subItem.icon && typeof subItem.icon === 'function' && <subItem.icon className="mr-3 h-5 w-5" />} */}
                          {subItem.name}
                        </Link>
                      );
                    })}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          );
        })}
      </nav>
      <div className="p-4 mt-auto">
        <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} 海创共坊</p>
      </div>
    </div>
  );
} 
