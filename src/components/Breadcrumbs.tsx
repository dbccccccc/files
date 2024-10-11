import React from 'react';
import { Breadcrumb } from '../types';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface BreadcrumbsProps {
  items: Breadcrumb[];
  onBreadcrumbClick: (path: string) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onBreadcrumbClick }) => {
  const { darkMode } = useTheme();

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={item.path} className="inline-flex items-center">
            {index > 0 && <ChevronRight className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />}
            <button
              onClick={() => onBreadcrumbClick(item.path)}
              className={`inline-flex items-center text-sm font-medium ${
                darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;