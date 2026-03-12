"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  AcademicCapIcon,
  BookOpenIcon,
  PlayCircleIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  ArrowUpCircleIcon,
  TagIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
  ChatBubbleLeftRightIcon,
  CubeIcon,
  PuzzlePieceIcon,
  TrophyIcon,
  UsersIcon,
  CalendarIcon,
  RocketLaunchIcon,
  BriefcaseIcon,
  LightBulbIcon,
  PresentationChartBarIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';

// 课程卡片组件
interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  instructor: string;
  thumbnailUrl: string;
  rating?: number;
  studentsCount: number;
  progress?: number;
  tags: string[];
  href: string;
  isFeatured?: boolean;
  isCompleted?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  category,
  level,
  duration,
  instructor,
  thumbnailUrl,
  rating,
  studentsCount,
  progress,
  tags,
  href,
  isFeatured = false,
  isCompleted = false
}) => {
  // 课程等级配置
  const levelConfig = {
    beginner: {
      label: '入门',
      color: 'bg-green-100 text-green-800'
    },
    intermediate: {
      label: '中级',
      color: 'bg-blue-100 text-blue-800'
    },
    advanced: {
      label: '高级',
      color: 'bg-purple-100 text-purple-800'
    }
  };

  const currentLevel = levelConfig[level];

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${isFeatured ? 'border-indigo-300 ring-1 ring-indigo-300' : 'border-gray-200'} overflow-hidden hover:shadow-md transition-shadow`}>
      <div className="relative">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-40 object-cover"
        />
        {isFeatured && (
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 bg-indigo-600 text-white text-xs font-medium rounded-md">
              推荐课程
            </span>
          </div>
        )}
        {isCompleted && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-green-600 text-white text-xs font-medium rounded-md flex items-center">
              <CheckCircleIcon className="h-3 w-3 mr-1" />
              已完成
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-2">
          <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${currentLevel.color}`}>
            {currentLevel.label}
          </span>
          <span className="text-white text-xs ml-2">{duration}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
            {category}
          </span>
          {rating && (
            <div className="flex items-center">
              <StarIcon className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700 ml-1">{rating}</span>
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <div className="flex items-center mr-3">
            <AcademicCapIcon className="h-4 w-4 mr-1" />
            <span>{instructor}</span>
          </div>
          <div className="flex items-center">
            <UserGroupIcon className="h-4 w-4 mr-1" />
            <span>{studentsCount} 名学员</span>
          </div>
        </div>
        
        {progress !== undefined && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">学习进度</span>
              <span className="font-medium text-gray-700">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-indigo-500'}`} 
                style={{width: `${progress}%`}}
              ></div>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag, index) => (
            <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
        
        <Link href={href}>
          <button className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition">
            {progress === undefined ? '开始学习' : isCompleted ? '查看证书' : '继续学习'}
          </button>
        </Link>
      </div>
    </div>
  );
};

// 技能卡片组件
interface SkillCardProps {
  name: string;
  level: number;
  category: string;
  icon: React.ReactNode;
  color: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, level, category, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className={`p-2 rounded-md ${color}`}>
          {icon}
        </div>
        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs">
          {category}
        </span>
      </div>
      <h3 className="text-md font-semibold text-gray-800 mb-2">{name}</h3>
      
      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-500">熟练度</span>
          <span className="font-medium text-gray-700">{level}/5</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full bg-indigo-500" 
            style={{width: `${(level / 5) * 100}%`}}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Link href={`/dashboard/designer/learning/skills/${name.toLowerCase().replace(/\s+/g, '-')}`}>
          <button className="text-indigo-600 text-xs font-medium hover:text-indigo-800">
            提升技能 →
          </button>
        </Link>
      </div>
    </div>
  );
};

// 活动卡片组件
interface EventCardProps {
  title: string;
  date: string;
  location: string;
  type: string;
  description: string;
  imageUrl?: string;
  href: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  location,
  type,
  description,
  imageUrl,
  href
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {imageUrl && (
        <div className="h-32 bg-indigo-100">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md mb-2 inline-block">
          {type}
        </span>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <div className="flex items-center mr-3">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <RocketLaunchIcon className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>
        </div>
        
        <Link href={href}>
          <button className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition">
            了解详情
          </button>
        </Link>
      </div>
    </div>
  );
};

// 筛选按钮组件
interface FilterButtonProps {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, count, active, onClick }) => {
  return (
    <button
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        active
          ? 'bg-indigo-100 text-indigo-700'
          : 'bg-white text-gray-700 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      {label}
      {count !== undefined && (
        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
          active ? 'bg-indigo-200 text-indigo-800' : 'bg-gray-200 text-gray-700'
        }`}>
          {count}
        </span>
      )}
    </button>
  );
};

export default function LearningPage() {
  // 课程类型筛选
  const [courseTypeFilter, setCourseTypeFilter] = useState<'all' | 'my' | 'recommended' | 'completed'>('all');
  
  // 课程类别筛选
  const [courseCategoryFilter, setCourseCategoryFilter] = useState<'all' | 'design' | 'technical' | 'business' | 'software'>('all');
  
  // 课程数据
  const courses: CourseCardProps[] = [
    {
      id: "COURSE-001",
      title: "可持续家具设计入门",
      description: "学习环保材料选择、可持续设计原则和实践方法，帮助您创建对环境友好的家具设计",
      category: "设计原理",
      level: "beginner",
      duration: "10小时",
      instructor: "李教授",
      thumbnailUrl: "https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      studentsCount: 562,
      progress: 75,
      tags: ["可持续设计", "家具", "环保材料"],
      href: "/dashboard/designer/learning/course/course-001",
      isFeatured: true
    },
    {
      id: "COURSE-002",
      title: "高级照明设计技术",
      description: "深入学习照明设计的技术细节、光线控制和空间氛围营造，提升您的照明方案质量",
      category: "技术专题",
      level: "advanced",
      duration: "15小时",
      instructor: "王设计师",
      thumbnailUrl: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      studentsCount: 324,
      tags: ["照明", "设计技术", "光线控制"],
      href: "/dashboard/designer/learning/course/course-002"
    },
    {
      id: "COURSE-003",
      title: "3D建模与渲染基础",
      description: "从零开始学习3D建模软件，掌握建模、材质设置和渲染技术，创建逼真的设计展示",
      category: "软件技能",
      level: "beginner",
      duration: "12小时",
      instructor: "张讲师",
      thumbnailUrl: "https://images.unsplash.com/photo-1545670723-196ed0954986?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      studentsCount: 895,
      progress: 100,
      tags: ["3D建模", "渲染", "软件技能"],
      href: "/dashboard/designer/learning/course/course-003",
      isCompleted: true
    },
    {
      id: "COURSE-004",
      title: "设计师商业理财",
      description: "学习项目预算管理、成本控制和定价策略，帮助设计师更好地处理业务和财务事宜",
      category: "商业技能",
      level: "intermediate",
      duration: "8小时",
      instructor: "陈财务顾问",
      thumbnailUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      studentsCount: 412,
      progress: 30,
      tags: ["商业", "财务", "项目管理"],
      href: "/dashboard/designer/learning/course/course-004"
    },
    {
      id: "COURSE-005",
      title: "空间规划与人体工程学",
      description: "探索空间设计的核心原则，了解人体工程学如何影响家具和室内设计的舒适度与功能性",
      category: "设计原理",
      level: "intermediate",
      duration: "10小时",
      instructor: "林教授",
      thumbnailUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      studentsCount: 523,
      tags: ["空间设计", "人体工程学", "家具设计"],
      href: "/dashboard/designer/learning/course/course-005",
      isFeatured: true
    },
    {
      id: "COURSE-006",
      title: "创意思维与设计创新",
      description: "培养创意思维能力，学习设计创新方法论，突破传统思维限制，创造独特设计方案",
      category: "设计原理",
      level: "beginner",
      duration: "6小时",
      instructor: "黄创意总监",
      thumbnailUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      studentsCount: 756,
      tags: ["创意思维", "设计创新", "方法论"],
      href: "/dashboard/designer/learning/course/course-006"
    }
  ];
  
  // 技能数据
  const skills: SkillCardProps[] = [
    {
      name: "3D建模",
      level: 4,
      category: "软件技能",
      icon: <CubeIcon className="h-5 w-5 text-indigo-500" />,
      color: "bg-indigo-50"
    },
    {
      name: "材料工艺",
      level: 3,
      category: "工艺技术",
      icon: <PuzzlePieceIcon className="h-5 w-5 text-green-500" />,
      color: "bg-green-50"
    },
    {
      name: "项目管理",
      level: 2,
      category: "管理技能",
      icon: <BriefcaseIcon className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      name: "创意思维",
      level: 5,
      category: "思维能力",
      icon: <LightBulbIcon className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-50"
    },
    {
      name: "交互设计",
      level: 3,
      category: "设计技能",
      icon: <UsersIcon className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-50"
    },
    {
      name: "数据分析",
      level: 1,
      category: "技术能力",
      icon: <PresentationChartBarIcon className="h-5 w-5 text-red-500" />,
      color: "bg-red-50"
    }
  ];
  
  // 活动数据
  const events: EventCardProps[] = [
    {
      title: "可持续设计工作坊",
      date: "2024年1月15日",
      location: "线上直播",
      type: "工作坊",
      description: "与行业专家一起探讨可持续设计的最新趋势和实践方法",
      imageUrl: "https://images.unsplash.com/photo-1611448747042-a96546c9ae0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      href: "/dashboard/designer/learning/events/sustainable-design-workshop"
    },
    {
      title: "创意设计思维培训",
      date: "2024年1月22日",
      location: "创客空间",
      type: "培训",
      description: "一天密集培训，帮助设计师培养创新思维和解决问题的能力",
      imageUrl: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      href: "/dashboard/designer/learning/events/creative-thinking-training"
    },
    {
      title: "设计师职业发展论坛",
      date: "2024年2月5日",
      location: "线上直播",
      type: "论坛",
      description: "探讨设计师职业规划和未来发展方向，分享成功经验",
      href: "/dashboard/designer/learning/events/career-development-forum"
    }
  ];
  
  // 根据筛选条件过滤课程
  const filteredCourses = courses.filter(course => {
    if (courseTypeFilter === 'my' && course.progress === undefined) return false;
    if (courseTypeFilter === 'recommended' && !course.isFeatured) return false;
    if (courseTypeFilter === 'completed' && !course.isCompleted) return false;
    
    if (courseCategoryFilter !== 'all') {
      const categoryMap: Record<string, string> = {
        'design': '设计原理',
        'technical': '技术专题',
        'business': '商业技能',
        'software': '软件技能'
      };
      if (course.category !== categoryMap[courseCategoryFilter]) return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">学习与成长</h1>
        <p className="mt-2 text-sm text-gray-600">
          提升您的设计技能、学习新知识和参与社区活动
        </p>
      </div>

      {/* 我的学习概览 */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">我的学习概览</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 bg-indigo-100 rounded-md">
                <BookOpenIcon className="h-5 w-5 text-indigo-600" />
              </div>
              <span className="text-2xl font-bold text-indigo-600">3</span>
            </div>
            <h3 className="font-medium text-gray-800 mb-1">进行中的课程</h3>
            <p className="text-sm text-gray-600">
              您有3门课程正在学习中
            </p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 bg-green-100 rounded-md">
                <TrophyIcon className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">1</span>
            </div>
            <h3 className="font-medium text-gray-800 mb-1">完成的课程</h3>
            <p className="text-sm text-gray-600">
              您已成功完成1门课程
            </p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 bg-blue-100 rounded-md">
                <ArrowUpCircleIcon className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">68%</span>
            </div>
            <h3 className="font-medium text-gray-800 mb-1">平均完成度</h3>
            <p className="text-sm text-gray-600">
              您的课程平均完成度为68%
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <h3 className="font-medium text-gray-800 mb-3">最近学习</h3>
          <div className="space-y-4">
            {courses.filter(course => course.progress !== undefined)
              .sort((a, b) => (b.progress || 0) - (a.progress || 0))
              .slice(0, 2)
              .map(course => (
                <div key={course.id} className="flex gap-3 items-center">
                  <img 
                    src={course.thumbnailUrl} 
                    alt={course.title} 
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-800">{course.title}</h4>
                    <div className="flex justify-between text-xs mb-1 mt-1">
                      <span className="text-gray-500">进度</span>
                      <span className="font-medium text-gray-700">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${course.isCompleted ? 'bg-green-500' : 'bg-indigo-500'}`} 
                        style={{width: `${course.progress}%`}}
                      ></div>
                    </div>
                  </div>
                  <Link href={course.href}>
                    <button className="px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700 transition">
                      {course.isCompleted ? '回顾' : '继续'}
                    </button>
                  </Link>
                </div>
              ))
            }
          </div>
          
          <div className="mt-4 text-center">
            <Link href="/dashboard/designer/learning/my-courses">
              <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
                查看所有我的课程 →
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 课程列表 */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-800">设计课程</h2>
          <Link href="/dashboard/designer/learning/all-courses">
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
              查看全部课程 →
            </button>
          </Link>
        </div>
        
        {/* 课程类型筛选 */}
        <div className="flex items-center space-x-2 mb-4">
          <FunnelIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">类型:</span>
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              label="全部课程" 
              active={courseTypeFilter === 'all'} 
              onClick={() => setCourseTypeFilter('all')} 
            />
            <FilterButton 
              label="我的课程" 
              count={courses.filter(c => c.progress !== undefined).length}
              active={courseTypeFilter === 'my'} 
              onClick={() => setCourseTypeFilter('my')} 
            />
            <FilterButton 
              label="推荐课程" 
              count={courses.filter(c => c.isFeatured).length}
              active={courseTypeFilter === 'recommended'} 
              onClick={() => setCourseTypeFilter('recommended')} 
            />
            <FilterButton 
              label="已完成" 
              count={courses.filter(c => c.isCompleted).length}
              active={courseTypeFilter === 'completed'} 
              onClick={() => setCourseTypeFilter('completed')} 
            />
          </div>
        </div>
        
        {/* 课程类别筛选 */}
        <div className="flex items-center space-x-2 mb-4">
          <TagIcon className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">类别:</span>
          <div className="flex flex-wrap gap-2">
            <FilterButton 
              label="全部类别" 
              active={courseCategoryFilter === 'all'} 
              onClick={() => setCourseCategoryFilter('all')} 
            />
            <FilterButton 
              label="设计原理" 
              count={courses.filter(c => c.category === '设计原理').length}
              active={courseCategoryFilter === 'design'} 
              onClick={() => setCourseCategoryFilter('design')} 
            />
            <FilterButton 
              label="技术专题" 
              count={courses.filter(c => c.category === '技术专题').length}
              active={courseCategoryFilter === 'technical'} 
              onClick={() => setCourseCategoryFilter('technical')} 
            />
            <FilterButton 
              label="商业技能" 
              count={courses.filter(c => c.category === '商业技能').length}
              active={courseCategoryFilter === 'business'} 
              onClick={() => setCourseCategoryFilter('business')} 
            />
            <FilterButton 
              label="软件技能" 
              count={courses.filter(c => c.category === '软件技能').length}
              active={courseCategoryFilter === 'software'} 
              onClick={() => setCourseCategoryFilter('software')} 
            />
          </div>
        </div>
        
        {/* 搜索框 */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="搜索课程名称、讲师或关键词..."
            className="pl-10 w-full h-10 bg-white border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        {/* 课程卡片列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                category={course.category}
                level={course.level}
                duration={course.duration}
                instructor={course.instructor}
                thumbnailUrl={course.thumbnailUrl}
                rating={course.rating}
                studentsCount={course.studentsCount}
                progress={course.progress}
                tags={course.tags}
                href={course.href}
                isFeatured={course.isFeatured}
                isCompleted={course.isCompleted}
              />
            ))
          ) : (
            <div className="col-span-3 flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-lg border border-gray-200">
              <BookOpenIcon className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到课程</h3>
              <p className="text-gray-500 mb-4">尝试调整筛选条件</p>
              <button 
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                onClick={() => {
                  setCourseTypeFilter('all');
                  setCourseCategoryFilter('all');
                }}
              >
                重置筛选条件
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 技能发展 */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-800">设计技能提升</h2>
          <Link href="/dashboard/designer/learning/skills">
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
              查看全部技能 →
            </button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {skills.map((skill) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              level={skill.level}
              category={skill.category}
              icon={skill.icon}
              color={skill.color}
            />
          ))}
        </div>
        
        <div className="mt-5 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 mr-3">
              <RocketLaunchIcon className="h-5 w-5" />
            </div>
            <h3 className="font-medium text-gray-800">个性化学习建议</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            基于您的技能评估，我们推荐您提升以下能力以平衡您的设计技能组合:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <ArrowUpCircleIcon className="h-4 w-4 text-indigo-500 mr-2" />
              </div>
              <span className="text-gray-700">
                <span className="font-medium">数据分析 (当前等级: 1/5)</span> - 参加《设计数据分析基础》课程，提升数据驱动设计能力
              </span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <ArrowUpCircleIcon className="h-4 w-4 text-indigo-500 mr-2" />
              </div>
              <span className="text-gray-700">
                <span className="font-medium">项目管理 (当前等级: 2/5)</span> - 学习《设计师项目管理》课程，增强项目组织和时间管理能力
              </span>
            </li>
          </ul>
          <div className="mt-3">
            <Link href="/dashboard/designer/learning/personal-development-plan">
              <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
                查看完整学习计划 →
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 学习活动和社区 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold text-gray-800">即将开始的活动</h2>
            <Link href="/dashboard/designer/learning/events">
              <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
                查看全部活动 →
              </button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {events.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                date={event.date}
                location={event.location}
                type={event.type}
                description={event.description}
                imageUrl={event.imageUrl}
                href={event.href}
              />
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center mb-5">
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">学习社区</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <h3 className="font-medium text-gray-800 mb-2">设计师讨论组</h3>
              <p className="text-sm text-gray-600 mb-2">与其他设计师讨论创意和挑战，分享您的见解</p>
              <Link href="/dashboard/designer/learning/community/discussions">
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
                  加入讨论 →
                </button>
              </Link>
            </div>
            
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <h3 className="font-medium text-gray-800 mb-2">设计作品点评</h3>
              <p className="text-sm text-gray-600 mb-2">上传您的设计作品获取专业点评和建议</p>
              <Link href="/dashboard/designer/learning/community/critiques">
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
                  参与点评 →
                </button>
              </Link>
            </div>
            
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <h3 className="font-medium text-gray-800 mb-2">直播讲座</h3>
              <div className="flex items-center text-sm text-red-600 mb-2">
                <VideoCameraIcon className="h-4 w-4 mr-1" />
                <span>即将直播</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">《2024设计趋势展望》, 今天 19:00</p>
              <Link href="/dashboard/designer/learning/community/live">
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
                  预约直播 →
                </button>
              </Link>
            </div>
          </div>
          
          <div className="mt-5 pt-4 border-t border-gray-200">
            <h3 className="font-medium text-gray-800 mb-3">学习伙伴</h3>
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 mr-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">王设计师</p>
                <p className="text-xs text-gray-500">正在学习: 可持续设计课程</p>
              </div>
              <button className="ml-auto text-indigo-600 text-xs font-medium hover:text-indigo-800">
                联系
              </button>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 mr-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">李工程师</p>
                <p className="text-xs text-gray-500">正在学习: 3D建模课程</p>
              </div>
              <button className="ml-auto text-indigo-600 text-xs font-medium hover:text-indigo-800">
                联系
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 