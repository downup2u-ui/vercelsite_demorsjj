import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="w-4 h-4 text-gray-400 mx-1" />
            )}
            {item.active ? (
              <span className="text-gray-500 font-medium">{item.label}</span>
            ) : (
              <Link 
                href={item.href} 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 