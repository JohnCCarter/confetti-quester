
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
  const textColorClass = userTheme === 'pink' ? 'text-app-pink' : 'text-app-blue';

  return (
    <div className="mb-6 animate-fade-in">
      <div 
        className="section-header cursor-pointer" 
        onClick={() => setExpanded(prev => !prev)}
      >
        <div className="mr-2">{icon}</div>
        <h2 className={`text-lg font-medium ${textColorClass}`}>{title}</h2>
        {subtitle && <span className="ml-2 text-sm text-gray-400">({subtitle})</span>}
        <div className="ml-auto">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>
      
      {expanded && (
        <div className="animate-slide-in">
          {children}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
