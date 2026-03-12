import Link from 'next/link';
import { Patent, PatentStatus, PatentType, PatentService } from '@/services/patentService';

interface PatentCardProps {
  patent: Patent;
  formatDate: (dateString?: string) => string;
}

export const PatentCard = ({ patent, formatDate }: PatentCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900 truncate">{patent.title}</h3>
            <p className="text-sm text-gray-500 mt-1">专利编号: {patent.patentNumber}</p>
          </div>
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            patent.status === 'approved' ? 'bg-green-100 text-green-800' :
            patent.status === 'rejected' ? 'bg-red-100 text-red-800' :
            patent.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            patent.status === 'examination' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {PatentService.getStatusName(patent.status as PatentStatus)}
          </span>
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div>
            <p className="text-xs text-gray-500">申请日期</p>
            <p className="text-sm">{formatDate(patent.filingDate)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">类型</p>
            <p className="text-sm">{PatentService.getTypeName(patent.type as PatentType)}</p>
          </div>
          {patent.approvalDate && (
            <div>
              <p className="text-xs text-gray-500">授权日期</p>
              <p className="text-sm">{formatDate(patent.approvalDate)}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-gray-500">发明人</p>
            <p className="text-sm truncate">{patent.inventors.join(', ')}</p>
          </div>
        </div>

        {patent.abstract && (
          <div className="mt-3">
            <p className="text-xs text-gray-500">摘要</p>
            <p className="text-sm text-gray-700 line-clamp-2">{patent.abstract}</p>
          </div>
        )}
        
        <div className="mt-4 flex justify-end">
          <Link 
            href={`/patents/${patent.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
          >
            查看详情
          </Link>
        </div>
      </div>
    </div>
  );
}; 