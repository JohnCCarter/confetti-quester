
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  defaultExpanded?: boolean;
  children?: React.ReactNode;
  userTheme?: 'pink' | 'blue';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  icon, 
  title, 
  subtitle, 
  defaultExpanded = true, 
  children,
  userTheme = 'pink'
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [isHovered, setIsHovered] = useState(false);
  const textColorClass = userTheme === 'pink' ? 'text-app-pink' : 'text-app-blue';

  return (
    <div className="mb-6 animate-fade-in">
      <div 
        className={`section-header cursor-pointer transition-colors duration-300 p-2 rounded-lg ${
          isHovered ? 'bg-gray-800/50' : ''
        }`} 
        onClick={() => setExpanded(prev => !prev)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`mr-2 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>{icon}</div>
        <h2 className={`text-lg font-medium ${textColorClass}`}>{title}</h2>
        {subtitle && <span className="ml-2 text-sm text-gray-400">({subtitle})</span>}
        <div className="ml-auto">
          {expanded 
            ? <ChevronUp size={20} className={`transition-transform duration-300 ${isHovered ? 'transform -translate-y-1' : ''}`} /> 
            : <ChevronDown size={20} className={`transition-transform duration-300 ${isHovered ? 'transform translate-y-1' : ''}`} />
          }
        </div>
      </div>
      
      {expanded && (
        <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="pt-3 animate-slide-in">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(SectionHeader);
