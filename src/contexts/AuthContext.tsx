"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, users } from '@/data/users';

// 扩展用户类型，添加登录凭证
interface AuthUser extends User {
  email: string;
}

// 模拟用户数据库，添加邮箱和密码
const mockUserDB = users.map(user => ({
  ...user,
  email: `${user.name === '张设计' ? 'zhang' : user.name === '李程序' ? 'li' : user.name === '赵艺术' ? 'zhao' : 'wang'}@example.com`,
  password: 'password123' // 在实际应用中，密码应该是哈希存储的
}));

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 检查本地存储中是否有用户会话
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // 登录函数
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = mockUserDB.find(u => u.email === email);
      
      if (!foundUser || foundUser.password !== password) {
        throw new Error('邮箱或密码不正确');
      }
      
      // 创建不包含密码的用户对象
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // 存储用户信息到本地存储
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 注册函数
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 检查邮箱是否已被使用
      if (mockUserDB.some(u => u.email === email)) {
        throw new Error('该邮箱已被注册');
      }
      
      // 创建新用户
      const newUser: AuthUser & { password: string } = {
        id: `${mockUserDB.length + 1}`,
        name,
        email,
        password,
        avatar: `/avatars/default.jpg`,
        role: 'regular',
        membershipType: 'none',
        points: 0,
        createdAt: new Date().toISOString()
      };
      
      // 在实际应用中，这里会发送请求到后端API
      mockUserDB.push(newUser);
      
      // 创建不包含密码的用户对象
      const { password: _, ...userWithoutPassword } = newUser;
      
      // 存储用户信息到本地存储
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
    } catch (err) {
      setError(err instanceof Error ? err.message : '注册失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 登出函数
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
