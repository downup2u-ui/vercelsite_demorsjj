"use client";

import { useState, useEffect } from 'react';

// 定义评论类型
interface Comment {
  id: string;
  projectId: string;
  content: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  replies?: Comment[];
}

interface ProjectCommentsProps {
  projectId: string;
}

export default function ProjectComments({ projectId }: ProjectCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // 在实际应用中，这里会从API获取项目评论数据
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 模拟评论数据
        const mockComments: Comment[] = [
          {
            id: '1',
            projectId,
            content: '这个项目的初步设计方案看起来不错，但我建议在用户界面上做一些调整，让它更加直观易用。',
            user: {
              id: '101',
              name: '张三',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            },
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3天前
            replies: [
              {
                id: '1-1',
                projectId,
                content: '同意你的看法，我们可以在下次会议上讨论具体的调整方案。',
                user: {
                  id: '102',
                  name: '李四',
                  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                },
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2天前
              }
            ]
          },
          {
            id: '2',
            projectId,
            content: '关于项目进度，我们需要加快开发速度，否则可能无法按时交付。建议增加一名前端开发人员。',
            user: {
              id: '103',
              name: '王五',
              avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
            },
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1天前
          }
        ];
        
        setComments(mockComments);
      } catch (error) {
        console.error('获取项目评论失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [projectId]);

  // 提交新评论
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setSubmitting(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 创建新评论
      const newCommentObj: Comment = {
        id: `comment-${Date.now()}`,
        projectId,
        content: newComment,
        user: {
          id: '999', // 当前用户ID，实际应用中应该从用户会话中获取
          name: '当前用户',
          avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
        },
        createdAt: new Date().toISOString(),
      };
      
      // 更新评论列表
      setComments(prevComments => [newCommentObj, ...prevComments]);
      
      // 清空输入框
      setNewComment('');
    } catch (error) {
      console.error('提交评论失败:', error);
      alert('提交评论失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  // 格式化时间
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return '今天';
    } else if (diffDays === 1) {
      return '昨天';
    } else if (diffDays < 7) {
      return `${diffDays}天前`;
    } else {
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };

  // 渲染评论
  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-12 mt-4' : 'mb-6 pb-6 border-b border-gray-200'}`}>
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          <img 
            className="h-10 w-10 rounded-full" 
            src={comment.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user.name)}&background=random`} 
            alt={comment.user.name} 
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900">{comment.user.name}</p>
              <p className="text-xs text-gray-500">{formatTime(comment.createdAt)}</p>
            </div>
          </div>
          <div className="mt-1 text-gray-700">
            {comment.content}
          </div>
          {!isReply && (
            <div className="mt-2">
              <button className="text-sm text-blue-600 hover:text-blue-800">回复</button>
            </div>
          )}
        </div>
      </div>
      
      {comment.replies?.map(reply => renderComment(reply, true))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center my-6">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* 评论输入框 */}
      <div className="mb-8">
        <form onSubmit={handleSubmitComment}>
          <div className="flex">
            <div className="flex-shrink-0 mr-3">
              <img 
                className="h-10 w-10 rounded-full" 
                src="https://randomuser.me/api/portraits/men/99.jpg" 
                alt="当前用户" 
              />
            </div>
            <div className="flex-grow">
              <textarea
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="添加评论..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={submitting}
              ></textarea>
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                  disabled={submitting || !newComment.trim()}
                >
                  {submitting ? '提交中...' : '发表评论'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* 评论列表 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-6">评论 ({comments.length})</h3>
        
        {comments.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="mt-2 text-gray-600">暂无评论</p>
            <p className="mt-1 text-sm text-gray-500">成为第一个发表评论的人</p>
          </div>
        ) : (
          <div>
            {comments.map(comment => renderComment(comment))}
          </div>
        )}
      </div>
    </div>
  );
} 