export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: 'designer' | 'programmer' | 'regular' | 'admin';
  membershipType: 'none' | 'regular' | 'vip';
  membershipExpiry?: string;
  points: number;
  createdAt: string;
}

export const users: User[] = [
  {
    id: '1',
    name: '张明远',
    avatar: '/images/avatars/张设计.svg',
    role: 'designer',
    membershipType: 'vip',
    membershipExpiry: '2025-12-31',
    points: 1500,
    createdAt: '2023-01-15',
  },
  {
    id: '2',
    name: '李俊杰',
    avatar: '/images/avatars/李程序.svg',
    role: 'programmer',
    membershipType: 'regular',
    membershipExpiry: '2025-06-30',
    points: 800,
    createdAt: '2023-03-22',
  },
  {
    id: '3',
    name: '王梦琪',
    avatar: '/images/avatars/王用户.svg',
    role: 'regular',
    membershipType: 'none',
    points: 200,
    createdAt: '2023-05-10',
  },
  {
    id: '4',
    name: '赵雅芝',
    avatar: '/images/avatars/赵艺术.svg',
    role: 'designer',
    membershipType: 'vip',
    membershipExpiry: '2025-09-15',
    points: 2200,
    createdAt: '2023-02-05',
  },
  {
    id: '5',
    name: '钱志远',
    avatar: '/images/avatars/钱开发.svg',
    role: 'programmer',
    membershipType: 'regular',
    membershipExpiry: '2025-08-20',
    points: 650,
    createdAt: '2023-04-12',
  },
  {
    id: '6',
    name: '孙雨晨',
    avatar: '/images/avatars/孙管理.svg',
    role: 'admin',
    membershipType: 'vip',
    membershipExpiry: '2026-01-01',
    points: 5000,
    createdAt: '2022-12-01',
  },
]
