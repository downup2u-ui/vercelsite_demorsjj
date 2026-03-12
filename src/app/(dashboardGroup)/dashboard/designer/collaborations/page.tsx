"use client";

import Link from 'next/link';
import { CollaborationListPlaceholder } from '@/components/ui/placeholders';

export default function DesignerCollaborationsPage() {
  const pageFeatureTitle = "合作与邀约";
  const welcomeMessage = `查看和管理您的合作项目邀请，与品牌和其他创作者建立联系。`;

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">{pageFeatureTitle}</h2>
          <p className="text-gray-500 mt-1">{welcomeMessage}</p>
        </div>
        <Link href="/dashboard/designer" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          返回设计师仪表盘
        </Link>
      </div>

      <div className="text-gray-600 mb-6">
        此区域将列出向您发出的所有合作邀请，以及您已参与的合作项目。您可以接受或拒绝邀请，并与合作方进行沟通。
      </div>

      <CollaborationListPlaceholder itemCount={4} withTabs={true} />
    </>
  );
} 
