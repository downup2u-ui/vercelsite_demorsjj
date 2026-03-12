"use client";

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon, Cog8ToothIcon, ArrowLeftOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

interface CurrentUser {
  name: string;
  imageUrl?: string; // imageUrl is optional
}

interface TopBarProps {
  pageTitle: string;
  currentUser?: CurrentUser; // Made currentUser optional to handle potential undefined state gracefully
  onMenuButtonClick?: () => void; // For mobile sidebar toggle
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function TopBar({ pageTitle, currentUser, onMenuButtonClick }: TopBarProps) {
  // Provide a default user object if currentUser is undefined or null
  const userToDisplay: CurrentUser = currentUser || { name: '用户', imageUrl: '' };

  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white shadow-sm">
      {onMenuButtonClick && (
        <button
          type="button"
          className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
          onClick={onMenuButtonClick}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      )}
      <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center">
          <h1 className="text-xl font-semibold text-gray-700">{pageTitle}</h1>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          {/* 退出登录按钮 */}
          <Link 
            href="/test-professions" 
            className="inline-flex items-center justify-center py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ease-in-out duration-150"
            title="退出登录"
          >
            <ArrowLeftOnRectangleIcon className="h-4 w-4 md:mr-1.5" />
            <span className="hidden md:inline px-2 md:px-1">退出登录</span>
            <span className="inline md:hidden px-2">&nbsp;</span>
          </Link>
          
          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="sr-only">Open user menu</span>
                {userToDisplay.imageUrl && userToDisplay.imageUrl !== '' ? (
                    <Image className="h-8 w-8 rounded-full object-cover" src={userToDisplay.imageUrl} alt="User avatar" width={32} height={32} />
                ) : (
                    <UserCircleIcon className="h-8 w-8 rounded-full text-gray-400" />
                )}
                <span className="hidden ml-2 text-sm font-medium text-gray-700 lg:block">
                  {userToDisplay.name}
                </span>
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
                      href="/test-professions"
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      <UserCircleIcon className="mr-2 h-5 w-5 inline-block text-gray-500" /> 切换身份
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#" // Replace with actual settings link
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                     <Cog8ToothIcon className="mr-2 h-5 w-5 inline-block text-gray-500" /> 账户设置
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/test-professions"
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                    >
                      <ArrowLeftOnRectangleIcon className="mr-2 h-5 w-5 inline-block text-gray-500" /> 退出登录
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
} 
